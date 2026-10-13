#!/usr/bin/env node
/**
 * Hash an access code for D1 table member_media_access (SHA-256 hex of normalized code).
 *
 * Usage:
 *   npm run hash-code -- "MEIN-CODE-123"
 *   npm run hash-code -- --generate
 *   npm run hash-code -- --generate --content "*.mp4" --label "Anna"
 *
 * Insert into D1 (Dashboard SQL or wrangler d1 execute). Never commit plaintext codes.
 */

import { createHash, randomBytes } from 'node:crypto';

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
  const out = { content: '*', label: '', positional: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--content' || a === '-c') {
      out.content = argv[++i] ?? '*';
    } else if (a === '--label' || a === '-l') {
      out.label = argv[++i] ?? '';
    } else if (a === '--generate' || a === '-g') {
      out.generate = true;
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

function printInsert(h, content, label) {
  const created = new Date().toISOString().slice(0, 10);
  console.log(`SQL (D1 database hautoo, table member_media_access):
  INSERT INTO member_media_access (code_hash, content, label, active, created_at)
  VALUES ('${h}', '${sqlEscape(content)}', '${sqlEscape(label)}', 1, '${created}');
`);
  console.log(`content patterns: * | *.mp4 | videos/foo.mp4 | comma-separated
`);
}

const flags = parseFlags(process.argv.slice(2));
if (flags.help || (flags.positional.length === 0 && !flags.generate)) {
  console.log(`Usage:
  node scripts/hash-code.mjs <code> [--content "*"] [--label "Name"]
  node scripts/hash-code.mjs --generate [--content "*.mp4"] [--label "Name"]

D1: code_hash = SHA-256 hex (normalized uppercase, whitespace stripped)
content examples:
  *                         all private media
  *.mp4                     only mp4 files
  videos/folge-001.mp4      one object key
  *.mp4,*.pdf               several patterns (comma-separated)
`);
  process.exit(flags.help ? 0 : 1);
}

if (flags.generate) {
  const code = generateCode();
  const h = hash(code);
  console.log(`Plaintext (give to user, do not commit):\n  ${code}\n`);
  console.log(`code_hash:\n  ${h}\n`);
  printInsert(h, flags.content, flags.label);
  process.exit(0);
}

const code = flags.positional.join(' ');
const h = hash(code);
console.log(`Normalized: ${normalize(code)}`);
console.log(`code_hash:  ${h}`);
printInsert(h, flags.content, flags.label);
