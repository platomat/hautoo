/**
 * Gated member media access Worker (videos now; other private R2 objects later).
 *
 * POST /unlock  { code } → { token, expiresAt }
 * POST /sign    { token, key } → { url, expiresAt }  (short-lived /play URL)
 * GET  /play?key=&exp=&sig=  → Range-capable stream from private R2
 *
 * Access codes live in D1 (`hautoo`.member_media_access): SHA-256 hash + content patterns.
 * Never store plaintext codes in D1 or this repo.
 */

export interface Env {
  MEDIA: R2Bucket;
  DB: D1Database;
  SIGNING_SECRET: string;
  ALLOWED_ORIGINS: string;
  /** Optional prefix prepended to object keys (e.g. "members/") */
  MEDIA_KEY_PREFIX?: string;
  /** Session TTL seconds (default 30 days) */
  SESSION_TTL_SECONDS?: string;
  /** Play URL TTL seconds (default 2 hours) */
  PLAY_TTL_SECONDS?: string;
}

interface AccessRow {
  code_hash: string;
  content: string;
  label: string;
  active: number;
}

interface SessionPayload {
  /** SHA-256 hex of the access code */
  h: string;
  /** Unix expiry (seconds) */
  exp: number;
}

const SESSION_DEFAULT_TTL = 30 * 24 * 60 * 60;
const PLAY_DEFAULT_TTL = 2 * 60 * 60;
const MAX_KEY_LEN = 512;
const KEY_RE = /^[a-zA-Z0-9._/-]+$/;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');
    const cors = corsHeaders(env, origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    try {
      if (url.pathname === '/unlock' && request.method === 'POST') {
        return withCors(await handleUnlock(request, env), cors);
      }
      if (url.pathname === '/sign' && request.method === 'POST') {
        return withCors(await handleSign(request, env), cors);
      }
      if (url.pathname === '/play' && request.method === 'GET') {
        return withCors(await handlePlay(request, env, url), cors);
      }
      if (url.pathname === '/' || url.pathname === '/health') {
        return withCors(json({ ok: true, service: 'hautoo-member-media-access' }), cors);
      }
      return withCors(json({ error: 'not_found' }, 404), cors);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('unhandled', url.pathname, message, err);
      return withCors(json({ error: 'server_error', stage: url.pathname }, 500), cors);
    }
  },
};

async function handleUnlock(request: Request, env: Env): Promise<Response> {
  if (!requireOrigin(env, request)) {
    return json({ error: 'origin_not_allowed' }, 403);
  }
  if (!env.SIGNING_SECRET || !env.DB) {
    return json({ error: 'misconfigured' }, 500);
  }

  let body: { code?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const code = normalizeCode(body.code ?? '');
  if (code.length < 6 || code.length > 128) {
    return json({ error: 'invalid_code' }, 400);
  }

  const hash = await sha256Hex(code);
  const row = await getActiveAccess(env.DB, hash);
  if (!row) {
    return json({ error: 'invalid_code' }, 401);
  }

  const ttl = Number(env.SESSION_TTL_SECONDS) || SESSION_DEFAULT_TTL;
  const exp = Math.floor(Date.now() / 1000) + ttl;
  const token = await sealSession(env.SIGNING_SECRET, { h: hash, exp });

  return json({ token, expiresAt: exp });
}

async function handleSign(request: Request, env: Env): Promise<Response> {
  if (!requireOrigin(env, request)) {
    return json({ error: 'origin_not_allowed' }, 403);
  }
  if (!env.SIGNING_SECRET || !env.DB || !env.MEDIA) {
    return json({ error: 'misconfigured' }, 500);
  }

  let body: { token?: string; key?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const session = await openSession(env.SIGNING_SECRET, body.token ?? '');
  if (!session) {
    return json({ error: 'unauthorized' }, 401);
  }

  const row = await getActiveAccess(env.DB, session.h);
  if (!row) {
    return json({ error: 'unauthorized' }, 401);
  }

  const objectKey = resolveObjectKey(env, body.key ?? '');
  if (!objectKey) {
    return json({ error: 'invalid_key' }, 400);
  }

  if (!contentAllowsKey(row.content ?? '', objectKey)) {
    return json({ error: 'forbidden' }, 403);
  }

  // Existence check: missing → 404; R2 binding/API failures must not become opaque server_error.
  try {
    const head = await env.MEDIA.head(objectKey);
    if (!head) {
      return json({ error: 'not_found' }, 404);
    }
  } catch (err) {
    console.error('MEDIA.head failed', objectKey, err);
    return json({ error: 'storage_unavailable' }, 503);
  }

  const playTtl = Number(env.PLAY_TTL_SECONDS) || PLAY_DEFAULT_TTL;
  const exp = Math.floor(Date.now() / 1000) + playTtl;
  const sig = await signPlay(env.SIGNING_SECRET, objectKey, exp);
  const playUrl = new URL('/play', request.url);
  playUrl.searchParams.set('key', objectKey);
  playUrl.searchParams.set('exp', String(exp));
  playUrl.searchParams.set('sig', sig);

  return json({ url: playUrl.toString(), expiresAt: exp });
}

async function handlePlay(request: Request, env: Env, url: URL): Promise<Response> {
  if (!env.SIGNING_SECRET || !env.MEDIA) {
    return new Response('misconfigured', { status: 500 });
  }

  const key = url.searchParams.get('key') ?? '';
  const expStr = url.searchParams.get('exp') ?? '';
  const sig = url.searchParams.get('sig') ?? '';
  const exp = Number(expStr);

  if (!key || !sig || !Number.isFinite(exp)) {
    return new Response('bad request', { status: 400 });
  }
  if (exp < Math.floor(Date.now() / 1000)) {
    return new Response('expired', { status: 403 });
  }
  if (!isSafeKey(key)) {
    return new Response('bad key', { status: 400 });
  }

  const expected = await signPlay(env.SIGNING_SECRET, key, exp);
  if (!timingSafeEqual(sig, expected)) {
    return new Response('forbidden', { status: 403 });
  }

  const range = request.headers.get('Range') ?? undefined;
  const object = await env.MEDIA.get(key, range ? { range: parseRangeHeader(range) } : undefined);
  if (!object) {
    return new Response('not found', { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('Accept-Ranges', 'bytes');
  headers.set('Cache-Control', 'private, no-store');
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', guessContentType(key));
  }

  if (range && object.range) {
    const r = object.range as { offset: number; length: number };
    const size = object.size;
    const start = r.offset;
    const end = r.offset + r.length - 1;
    headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
    headers.set('Content-Length', String(r.length));
    return new Response(object.body, { status: 206, headers });
  }

  headers.set('Content-Length', String(object.size));
  return new Response(object.body, { status: 200, headers });
}

async function getActiveAccess(db: D1Database, codeHash: string): Promise<AccessRow | null> {
  const row = await db
    .prepare(
      `SELECT code_hash, content, label, active
       FROM member_media_access
       WHERE code_hash = ? AND active = 1
       LIMIT 1`,
    )
    .bind(codeHash)
    .first<AccessRow>();
  return row ?? null;
}

/**
 * content column: comma-separated patterns.
 * - `*` → all keys
 * - `*.mp4` / `*.pdf` → extension match (case-insensitive)
 * - `videos/folge-001.mp4` → exact object key
 */
export function contentAllowsKey(contentSpec: string, objectKey: string): boolean {
  const key = objectKey.trim();
  if (!key) return false;
  const patterns = String(contentSpec ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (patterns.length === 0) return false;

  const keyLower = key.toLowerCase();
  for (const pattern of patterns) {
    if (pattern === '*') return true;
    if (pattern.startsWith('*.') && pattern.length > 2) {
      const suffix = pattern.slice(1).toLowerCase(); // ".mp4"
      if (keyLower.endsWith(suffix)) return true;
      continue;
    }
    if (pattern === key || pattern.toLowerCase() === keyLower) return true;
  }
  return false;
}

function resolveObjectKey(env: Env, raw: string): string | null {
  const trimmed = raw.trim().replace(/^\/+/, '');
  if (!trimmed || trimmed.length > MAX_KEY_LEN || trimmed.includes('..')) return null;
  if (!KEY_RE.test(trimmed)) return null;
  const prefix = (env.MEDIA_KEY_PREFIX ?? '').replace(/^\/+|\/+$/g, '');
  if (!prefix) return trimmed;
  if (trimmed.startsWith(`${prefix}/`)) return trimmed;
  return `${prefix}/${trimmed}`;
}

function isSafeKey(key: string): boolean {
  return Boolean(key) && key.length <= MAX_KEY_LEN && !key.includes('..') && KEY_RE.test(key);
}

function normalizeCode(code: string): string {
  return code.trim().replace(/\s+/g, '').toUpperCase();
}

async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function sealSession(secret: string, payload: SessionPayload): Promise<string> {
  const body = btoaUrl(JSON.stringify(payload));
  const sig = await hmacHex(secret, `session:${body}`);
  return `${body}.${sig}`;
}

async function openSession(secret: string, token: string): Promise<SessionPayload | null> {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  const expected = await hmacHex(secret, `session:${body}`);
  if (!timingSafeEqual(sig, expected)) return null;
  try {
    const payload = JSON.parse(atobUrl(body)) as SessionPayload;
    if (!payload?.h || !payload?.exp) return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    if (!/^[a-f0-9]{64}$/.test(payload.h)) return null;
    return payload;
  } catch {
    return null;
  }
}

async function signPlay(secret: string, key: string, exp: number): Promise<string> {
  return hmacHex(secret, `play:${key}:${exp}`);
}

function parseRangeHeader(range: string): R2Range | undefined {
  const m = /^bytes=(\d+)-(\d+)?$/.exec(range.trim());
  if (!m) return undefined;
  const start = Number(m[1]);
  if (m[2] !== undefined) {
    const end = Number(m[2]);
    return { offset: start, length: end - start + 1 };
  }
  return { offset: start };
}

function guessContentType(key: string): string {
  const lower = key.toLowerCase();
  if (lower.endsWith('.webm')) return 'video/webm';
  if (lower.endsWith('.ogg') || lower.endsWith('.ogv')) return 'video/ogg';
  if (lower.endsWith('.pdf')) return 'application/pdf';
  return 'video/mp4';
}

function corsHeaders(env: Env, origin: string | null): Headers {
  const headers = new Headers();
  const allowed = parseOrigins(env.ALLOWED_ORIGINS);
  if (origin && allowed.includes(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Vary', 'Origin');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Range');
    headers.set(
      'Access-Control-Expose-Headers',
      'Accept-Ranges, Content-Range, Content-Length, Content-Type, ETag',
    );
    headers.set('Access-Control-Max-Age', '86400');
  }
  return headers;
}

function requireOrigin(env: Env, request: Request): boolean {
  const origin = request.headers.get('Origin');
  if (!origin) return false;
  return parseOrigins(env.ALLOWED_ORIGINS).includes(origin);
}

function parseOrigins(raw: string | undefined): string[] {
  return (raw ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function withCors(response: Response, cors: Headers): Response {
  const headers = new Headers(response.headers);
  cors.forEach((v, k) => headers.set(k, v));
  return new Response(response.body, { status: response.status, headers });
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function btoaUrl(s: string): string {
  const b64 = btoa(s);
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function atobUrl(s: string): string {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4));
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + pad;
  return atob(b64);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}
