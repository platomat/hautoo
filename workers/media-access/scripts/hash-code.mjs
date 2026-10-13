#!/usr/bin/env node
/**
 * Hash an access code for D1 table member_media_access (SHA-256 hex of normalized code).
 *
 * Usage:
 *   npm run hash-code -- --generate --label "Anna" --insert
 *   npm run hash-code -- --generate --content "*.mp4" --label "Anna" --insert
 *   npm run hash-code -- "MEIN-CODE" --label "Anna" --insert --local
 *
 * --insert runs: npx wrangler d1 execute hautoo --remote|--local --command "INSERT…"
 * Never commit plaintext codes.
 */

import { createHash, randomBytes } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const workerRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

function normalize(code) {
  return String(code).trim().replace(/\s+/g, '').toUpperCase();
}

function hash(code) {
  return createHash('sha256').update(normalize(code), 'utf8').digest('hex');
}

function generateCode() {
  const alphabet = 'ABCDEFGHJKMNPQRSTVWXYZ23456789';
  const bytes = randomBytes(16);
  let out = '';
  for (let i = 0; i < 16; i++) {
    out += alphabet[bytes[i] % alphabet.length];
    if (i % 4 === 3 && i < 15) out += '-';
  }
  return out;
}

function parseFlags(argv) {
  const out = {
    content: '*',
    label: '',
    generate: false,
    insert: false,
    local: false,
    help: false,
    positional: [],
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--content' || a === '-c') {
      out.content = argv[++i] ?? '*';
    } else if (a === '--label' || a === '-l') {
      out.label = argv[++i] ?? '';
    } else if (a === '--generate' || a === '-g') {
      out.generate = true;
    } else if (a === '--insert' || a === '-i') {
      out.insert = true;
    } else if (a === '--local') {
      out.local = true;
    } else if (a === '--remote') {
      out.local = false;
    } else if (a === '-h' || a === '--help') {
      out.help = true;
    } else {
      out.positional.push(a);
    }
  }
  return out;
}

function sqlEscape(s) {
  return String(s).replace(/'/g, "''");
}

function buildInsertSql(h, content, label) {
  const created = new Date().toISOString().slice(0, 10);
  return (
    `INSERT INTO member_media_access (code_hash, content, label, active, created_at) ` +
    `VALUES ('${h}', '${sqlEscape(content)}', '${sqlEscape(label)}', 1, '${created}');`
  );
}

function printInsert(sql) {
  console.log(`SQL (D1 database hautoo, table member_media_access):\n  ${sql}\n`);
  console.log(`content patterns: * | *.mp4 | videos/foo.mp4 | comma-separated\n`);
}

function runInsert(sql, local) {
  const target = local ? '--local' : '--remote';
  console.log(`Inserting into D1 hautoo (${local ? 'local' : 'remote'})…\n`);
  const result = spawnSync(
    'npx',
    ['wrangler', 'd1', 'execute', 'hautoo', target, '--command', sql],
    {
      cwd: workerRoot,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    },
  );
  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
  console.log('\nInsert OK.');
}

const flags = parseFlags(process.argv.slice(2));
if (flags.help || (flags.positional.length === 0 && !flags.generate)) {
  console.log(`Usage:
  npm run hash-code -- --generate [--content "*"] [--label "Name"] [--insert] [--local]
  npm run hash-code -- <code> [--content "*"] [--label "Name"] [--insert] [--local]

  --insert   execute INSERT via wrangler d1 (default: --remote)
  --local    with --insert: write to local D1 instead of remote
  --remote   with --insert: production D1 (default)

D1: code_hash = SHA-256 hex (normalized uppercase, whitespace stripped)
content examples:
  *                         all private media
  *.mp4                     only mp4 files
  videos/folge-001.mp4      one object key
  *.mp4,*.pdf               several patterns (comma-separated)
`);
  process.exit(flags.help ? 0 : 1);
}

let plaintext = '';
let codeHash = '';

if (flags.generate) {
  plaintext = generateCode();
  codeHash = hash(plaintext);
  console.log(`Plaintext (give to user, do not commit):\n  ${plaintext}\n`);
  console.log(`code_hash:\n  ${codeHash}\n`);
} else {
  plaintext = flags.positional.join(' ');
  codeHash = hash(plaintext);
  console.log(`Normalized: ${normalize(plaintext)}`);
  console.log(`code_hash:  ${codeHash}\n`);
}

const sql = buildInsertSql(codeHash, flags.content, flags.label);
printInsert(sql);

if (flags.insert) {
  runInsert(sql, flags.local);
} else {
  console.log(`Tipp: mit --insert legt das Script die Zeile direkt in D1 an, z. B.:
  npm run hash-code -- --generate --label "Anna" --insert
`);
}
