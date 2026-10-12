# Worker: hautoo-member-media-access

Geschützte Medien aus einem **privaten** R2-Bucket (zuerst Videos; später ggf. andere Formate). Zugang nur mit persönlichem Code (Hash in KV). Die Website (Astro/Pages) bleibt öffentlich; ohne gültigen Code gibt es keinen Stream.

Gehört in **dieses Repo** unter `workers/media-access/` (kein zweites Repo nötig). Cloudflare-Script-Name: **`hautoo-member-media-access`**. Secrets liegen nur bei Cloudflare, nicht in Git.

## Ablauf

1. Besucher gibt Code ein → `POST /unlock` → Session-Token (HMAC, TTL ca. 30 Tage)
2. Browser speichert Token in `localStorage` (ein Token für alle Member-Videos)
3. Vor dem Abspielen → `POST /sign` mit Token + Objekt-Key → kurzlebige `/play`-URL (ca. 2 h)
4. `<video>` lädt von `GET /play?...` (Range/Seek, privates R2)

Codes: **pro Person ein eigener Code**. KV speichert nur den **SHA-256-Hash**, nie Klartext. Wer welchen Code hat, steht nicht automatisch im System: sinnvolles `label` in KV plus eigene interne Liste (siehe [r2-member-videos.md](../../docs/cloudflare/r2-member-videos.md)).

## Cloudflare einrichten

1. **R2-Bucket** (privat, ohne öffentliche Domain), z. B. `hautoo-videos-private`
2. **KV-Namespace**, z. B. `hautoo-member-media-codes`
3. In `wrangler.toml` Bindings aktivieren:

```toml
[[r2_buckets]]
binding = "VIDEOS"
bucket_name = "hautoo-videos-private"

[[kv_namespaces]]
binding = "ACCESS_CODES"
id = "<deine-kv-namespace-id>"
```

4. `ALLOWED_ORIGINS` auf die Site-Origins setzen (inkl. lokales Dev bei Bedarf)
5. Secret: `npx wrangler secret put SIGNING_SECRET` (langer Zufallsstring)
6. Deploy: `npm install && npm run deploy` aus diesem Ordner

Worker-URL z. B. `https://hautoo-member-media-access.<account>.workers.dev` oder eigene Route. In Site-Config: `media.videoAccessWorkerUrl`.

## Code anlegen

```bash
npm run hash-code -- --generate
```

- Klartext nur an die Person weitergeben (nicht committen)
- KV: Key = Hex-Hash, Value z. B. `{"active":true,"label":"anna-mueller","createdAt":"2026-04-09"}`
- `label` = deine Zuordnung (Name, Ticket, Kanal); ohne Label und ohne eigene Liste ist der Empfänger später nicht rekonstruierbar

Sperren: Value auf `{"active":false}` setzen oder Key löschen. Bestehende Sessions scheitern beim nächsten `/sign`.

## Lokal

```bash
cp .dev.vars.example .dev.vars
# SIGNING_SECRET setzen; Bindings in wrangler.toml
npm install
npm run dev
```

Astro: `videoAccessWorkerUrl` auf `http://127.0.0.1:8787` (oder Wrangler-Port).

## Sicherheit (öffentlich lesbares Repo)

| Öffentlich sichtbar | Nicht öffentlich |
| --- | --- |
| Worker-Quellcode, Doku, Embed-Markup | Klartext-Codes, `SIGNING_SECRET`, `.dev.vars` |
| Worker-URL in Site-Config | Private R2-Objekte ohne gültige Signatur |

Wer die Doku kennt, kann den Worker aufrufen, aber **ohne gültigen Code** weder Token noch Stream bekommen. Kurze `/play`-URLs sind absichtlich teilbar bis Ablauf; Session-Token nicht in die URL legen.

Öffentliche R2-Videos (`VideoEmbed` / `provider: file`) nutzen weiter `videoBaseUrl`. Member-Videos nutzen **nur** diesen Worker und den privaten Bucket.
