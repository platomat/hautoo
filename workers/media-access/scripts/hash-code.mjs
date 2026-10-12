#!/usr/bin/env node
/**
 * Hash an access code for KV storage (SHA-256 hex of normalized code).
 *
 * Usage:
 *   npm run hash-code -- "MEIN-CODE-123"
 *   npm run hash-code -- --generate
 *
 * Put in KV (Workers dashboard or wrangler):
 *   Key:   <hex from this script>
 *   Value: {"active":true,"label":"anna-mueller","createdAt":"2026-04-09"}
 *   (`label` = deine interne Zuordnung Person/Kanal; Klartext nicht in KV)
 *
 * Never commit plaintext codes. Give the plaintext only to the recipient.
 */

import { createHash, randomBytes } from 'node:crypto';

function normalize(code) {
  return String(code).trim().replace(/\s+/g, '').toUpperCase();
}

function hash(code) {
  return createHash('sha256').update(normalize(code), 'utf8').digest('hex');
}

function generateCode() {
  // Crockford-ish: no I/L/O/U to reduce confusion; 4 groups of 4
  const alphabet = 'ABCDEFGHJKMNPQRSTVWXYZ23456789';
  const bytes = randomBytes(16);
  let out = '';
  for (let i = 0; i < 16; i++) {
    out += alphabet[bytes[i] % alphabet.length];
    if (i % 4 === 3 && i < 15) out += '-';
  }
  return out;
}

const args = process.argv.slice(2);
if (args.length === 0 || args[0] === '-h' || args[0] === '--help') {
  console.log(`Usage:
  node scripts/hash-code.mjs <code>
  node scripts/hash-code.mjs --generate

KV key  = SHA-256 hex (normalized uppercase, whitespace stripped)
KV value example:
  {"active":true,"label":"optional-note","createdAt":"${new Date().toISOString().slice(0, 10)}"}
`);
  process.exit(args.length === 0 ? 1 : 0);
}

if (args[0] === '--generate' || args[0] === '-g') {
  const code = generateCode();
  const h = hash(code);
  console.log(`Plaintext (give to user, do not commit):\n  ${code}\n`);
  console.log(`KV key:\n  ${h}\n`);
  console.log(
    `KV value:\n  ${JSON.stringify({
      active: true,
      label: '',
      createdAt: new Date().toISOString().slice(0, 10),
    })}\n`,
  );
  process.exit(0);
}

const code = args.join(' ');
const h = hash(code);
console.log(`Normalized: ${normalize(code)}`);
console.log(`KV key:     ${h}`);
