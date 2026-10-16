#!/usr/bin/env node
/**
 * Build hosting helper files from CMS redirects + `public/_headers`:
 * - `public/_redirects` for Cloudflare Pages
 * - `public/.htaccess` for Apache (redirects + Cache-Control; ignored by CF/Nginx)
 * - `public/nginx-redirects.conf` for Nginx (include in server{}; ignored by CF/Apache)
 * Also exports `loadAstroRedirects()` for `astro.config`.
 *
 * Run from predev/prebuild. `_headers` stays hand-edited (Cloudflare source of truth).
 */
import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const redirectsDir = path.join(root, "src/content/redirects");
const headersFile = path.join(root, "public/_headers");
const outRedirects = path.join(root, "public/_redirects");
const outHtaccess = path.join(root, "public/.htaccess");
const outNginx = path.join(root, "public/nginx-redirects.conf");

/**
 * @param {string} raw
 * @param {"source" | "target"} kind
 */
function normalizePath(raw, kind) {
	const value = String(raw ?? "").trim();
	if (!value) return undefined;
	if (/^https?:\/\//i.test(value)) {
		if (kind === "source") {
			console.warn(
				`[build-redirects] skip absolute source URL (use a path): ${value}`,
			);
			return undefined;
		}
		return value;
	}
	return value.startsWith("/") ? value : `/${value}`;
}

/**
 * @param {unknown} raw
 * @returns {string[]}
 */
function coerceSources(raw) {
	if (Array.isArray(raw)) {
		return raw
			.map((item) => {
				if (item && typeof item === "object") {
					const obj = /** @type {Record<string, unknown>} */ (item);
					return String(
						obj.source ?? obj.path ?? Object.values(obj)[0] ?? "",
					).trim();
				}
				return String(item ?? "").trim();
			})
			.filter(Boolean);
	}
	if (typeof raw === "string") {
		return raw
			.split(/\r?\n/)
			.map((line) => line.replace(/^\s*[-*]\s+/, "").trim())
			.filter(Boolean);
	}
	return [];
}

/**
 * @returns {{ source: string; destination: string; code: 301 | 302; entry: string }[]}
 */
export function collectRedirectRules() {
	let names = [];
	try {
		names = readdirSync(redirectsDir).filter((name) => name.endsWith(".md"));
	} catch {
		return [];
	}

	/** @type {{ source: string; destination: string; code: 301 | 302; entry: string }[]} */
	const rules = [];
	const seen = new Set();

	for (const name of names.sort()) {
		const filePath = path.join(redirectsDir, name);
		const { data } = matter(readFileSync(filePath, "utf8"));
		const target = normalizePath(data.target, "target");
		if (!target) {
			console.warn(`[build-redirects] ${name}: missing target, skipped`);
			continue;
		}
		const code = data.code === 302 || data.code === "302" ? 302 : 301;
		const sources = coerceSources(data.sources)
			.map((src) => normalizePath(src, "source"))
			.filter(Boolean);
		if (sources.length === 0) {
			console.warn(`[build-redirects] ${name}: no sources, skipped`);
			continue;
		}
		for (const source of sources) {
			if (seen.has(source)) {
				console.warn(
					`[build-redirects] duplicate source ${source} (keeping first; skip ${name})`,
				);
				continue;
			}
			seen.add(source);
			rules.push({ source, destination: target, code, entry: name });
		}
	}

	return rules;
}

/** Astro `redirects` map for local preview / static output. */
export function loadAstroRedirects() {
	/** @type {Record<string, string | { status: number; destination: string }>} */
	const map = {};
	for (const rule of collectRedirectRules()) {
		map[rule.source] =
			rule.code === 301
				? { status: 301, destination: rule.destination }
				: rule.destination;
	}
	return map;
}

/**
 * Parse Cloudflare Pages `public/_headers` into path → Cache-Control (and other headers).
 * @returns {{ path: string; headers: Record<string, string> }[]}
 */
export function parseCfHeadersFile() {
	if (!existsSync(headersFile)) {
		console.warn(`[build-redirects] missing ${headersFile}, no cache rules`);
		return [];
	}
	const lines = readFileSync(headersFile, "utf8").split(/\r?\n/);
	/** @type {{ path: string; headers: Record<string, string> }[]} */
	const blocks = [];
	/** @type {{ path: string; headers: Record<string, string> } | null} */
	let current = null;

	for (const line of lines) {
		if (!line.trim() || line.trimStart().startsWith("#")) {
			continue;
		}
		if (!/^\s/.test(line) && line.startsWith("/")) {
			current = { path: line.trim(), headers: {} };
			blocks.push(current);
			continue;
		}
		if (current && /^\s+\S/.test(line)) {
			const m = line.trim().match(/^([^:]+):\s*(.*)$/);
			if (m) {
				current.headers[m[1].trim()] = m[2].trim();
			}
		}
	}
	return blocks;
}

/**
 * @param {string} source
 */
function sourcePattern(source) {
	const escaped = source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	if (escaped.endsWith("/")) {
		return `^${escaped.slice(0, -1)}/?$`;
	}
	return `^${escaped}/?$`;
}

/**
 * CF path pattern → regex for Request_URI / nginx (without delimiters).
 * `/_astro/*` → `^/_astro/`, `/` → `^/$`, `/*` → `^/`
 * @param {string} cfPath
 */
function cfPathToRegex(cfPath) {
	if (cfPath === "/*") return "^/";
	if (cfPath === "/") return "^/$";
	if (cfPath.endsWith("/*")) {
		const base = cfPath.slice(0, -1); // keep trailing /
		return `^${base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`;
	}
	return `^${cfPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`;
}

/**
 * Sort so specific prefixes win over `/*` / `/`.
 * @param {{ path: string; headers: Record<string, string> }[]} blocks
 */
function sortHeaderBlocks(blocks) {
	return [...blocks].sort((a, b) => {
		const score = (p) => {
			if (p === "/*") return 0;
			if (p === "/") return 1;
			return 100 + p.length;
		};
		return score(b.path) - score(a.path);
	});
}

/**
 * @param {{ path: string; headers: Record<string, string> }[]} blocks
 * @returns {string[]}
 */
function apacheCacheLines(blocks) {
	const withCache = sortHeaderBlocks(
		blocks.filter((b) => b.headers["Cache-Control"]),
	);
	if (withCache.length === 0) return [];

	/** @type {string[]} */
	const lines = [
		"<IfModule mod_headers.c>",
		"<IfModule mod_setenvif.c>",
	];

	withCache.forEach((block, i) => {
		if (block.path === "/*" || block.path === "/") {
			return; // default Header below
		}
		const env = `CACHE_RULE_${i}`;
		lines.push(
			`SetEnvIf Request_URI "${cfPathToRegex(block.path)}" ${env}`,
		);
	});

	const fallback =
		withCache.find((b) => b.path === "/*" || b.path === "/")?.headers[
			"Cache-Control"
		] || "public, max-age=0, must-revalidate";
	lines.push(`Header set Cache-Control "${fallback}"`);

	withCache.forEach((block, i) => {
		if (block.path === "/*" || block.path === "/") return;
		const env = `CACHE_RULE_${i}`;
		const value = block.headers["Cache-Control"];
		lines.push(`Header set Cache-Control "${value}" env=${env}`);
	});

	lines.push("</IfModule>", "</IfModule>");
	return lines;
}

/**
 * Nginx: dedicated locations for cache (try_files) + redirects. Catch-all last.
 * @param {{ path: string; headers: Record<string, string> }[]} blocks
 * @returns {string[]}
 */
function nginxCacheLines(blocks) {
	const withCache = sortHeaderBlocks(
		blocks.filter((b) => b.headers["Cache-Control"]),
	);
	if (withCache.length === 0) return [];

	/** @type {string[]} */
	const lines = ["# Cache-Control (from public/_headers)"];

	for (const block of withCache) {
		const value = block.headers["Cache-Control"];
		if (block.path === "/*") {
			lines.push(
				"location / {",
				`\tadd_header Cache-Control "${value}" always;`,
				"\ttry_files $uri $uri/ =404;",
				"}",
			);
			continue;
		}
		if (block.path === "/") {
			lines.push(
				"location = / {",
				`\tadd_header Cache-Control "${value}" always;`,
				"\ttry_files /index.html =404;",
				"}",
			);
			continue;
		}
		if (block.path.endsWith("/*")) {
			const prefix = block.path.slice(0, -1); // /_astro/
			lines.push(
				`location ^~ ${prefix} {`,
				`\tadd_header Cache-Control "${value}" always;`,
				"\ttry_files $uri =404;",
				"}",
			);
			continue;
		}
		lines.push(
			`location = ${block.path} {`,
			`\tadd_header Cache-Control "${value}" always;`,
			"\ttry_files $uri =404;",
			"}",
		);
	}
	return lines;
}

export function writeRedirectsFile() {
	const rules = collectRedirectRules();
	const headerBlocks = parseCfHeadersFile();
	mkdirSync(path.dirname(outRedirects), { recursive: true });

	const cfLines = [
		"# Generated by scripts/build-redirects.mjs — do not edit.",
		...rules.map(
			(rule) => `${rule.source} ${rule.destination} ${rule.code}`,
		),
		"",
	];
	writeFileSync(outRedirects, cfLines.join("\n"), "utf8");

	const htLines = [
		"# Generated by scripts/build-redirects.mjs — do not edit.",
		"# Cloudflare Pages ignores this file; Apache (AllowOverride) uses it.",
		"# Redirects from CMS; Cache-Control from public/_headers.",
		"<IfModule mod_alias.c>",
		...rules.map(
			(rule) =>
				`RedirectMatch ${rule.code} ${sourcePattern(rule.source)} ${rule.destination}`,
		),
		"</IfModule>",
		...apacheCacheLines(headerBlocks),
		"",
	];
	writeFileSync(outHtaccess, htLines.join("\n"), "utf8");

	const ngxLines = [
		"# Generated by scripts/build-redirects.mjs — do not edit.",
		"# Cloudflare Pages and Apache ignore this file.",
		"# Include inside an nginx `server { ... }` block, e.g.:",
		"#   include /path/to/dist/nginx-redirects.conf;",
		"# Redirects from CMS; Cache-Control from public/_headers.",
		...rules.flatMap((rule) => [
			`location ~ ${sourcePattern(rule.source)} {`,
			`\treturn ${rule.code} ${rule.destination};`,
			`}`,
		]),
		...nginxCacheLines(headerBlocks),
		"",
	];
	writeFileSync(outNginx, ngxLines.join("\n"), "utf8");

	const cacheCount = headerBlocks.filter((b) => b.headers["Cache-Control"])
		.length;
	console.log(
		`[build-redirects] ${rules.length} redirect(s), ${cacheCount} cache path(s) → public/_redirects, public/.htaccess, public/nginx-redirects.conf`,
	);
}

const isMain =
	process.argv[1] &&
	path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
	writeRedirectsFile();
}
