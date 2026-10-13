# Worker: hautoo-member-media-access

Geschützte Medien aus einem **privaten** R2-Bucket. Zugang mit persönlichem Code (Hash in **D1** `hautoo.member_media_access`). Die Website bleibt öffentlich; ohne gültigen Code kein Stream.

Ordner: `workers/media-access/`. Cloudflare-Script: **`hautoo-member-media-access`**.

## Ablauf

1. `POST /unlock` `{ code }` → Session-Token (HMAC, ~30 Tage)
2. Token in `localStorage` (site-weit)
3. `POST /sign` `{ token, key }` → kurzlebige `/play`-URL, nur wenn Spalte `content` den Objekt-Key erlaubt
4. `GET /play` → Range-Stream aus privatem R2

## Content-Muster (`content`)

| Wert | Wirkung |
| --- | --- |
| `*` | alles |
| `*.mp4` / `*.pdf` | nach Dateiendung |
| `videos/foo.mp4` | genau ein Key |
| `*.mp4,videos/a.pdf` | kommagetrennt, ODER |

## Einrichtung

Ausführlich: [docs/cloudflare/r2-member-videos.md](../../docs/cloudflare/r2-member-videos.md)

Kurz:

1. Privates R2 + `npx wrangler d1 create hautoo` → ID in `wrangler.toml`
2. `npx wrangler d1 migrations apply hautoo --remote`
3. `npx wrangler secret put SIGNING_SECRET` → `npm run deploy`
4. Site: `media.videoAccessWorkerUrl`
5. `npm run hash-code -- --generate --content "*" --label "Name" --insert` (legt Zeile in D1 an)

## Lokal

```bash
cp .dev.vars.example .dev.vars
npm install
npx wrangler d1 migrations apply hautoo --local
npm run dev
```

## Sicherheit

| Öffentlich | Nicht öffentlich |
| --- | --- |
| Worker-Code, Doku, D1-ID, Bucket-Name | Klartext-Codes, `SIGNING_SECRET`, `.dev.vars` |

`label` in D1 geht nicht an den Browser.
