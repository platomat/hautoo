# Worker: hautoo-member-media-access

Geschützte Medien aus einem **privaten** R2-Bucket (zuerst Videos; später ggf. andere Formate). Zugang nur mit persönlichem Code (Hash in KV). Die Website (Astro/Pages) bleibt öffentlich; ohne gültigen Code gibt es keinen Stream.

Gehört in **dieses Repo** unter `workers/media-access/` (kein zweites Repo nötig). Cloudflare-Script-Name: **`hautoo-member-media-access`**. Secrets liegen nur bei Cloudflare, nicht in Git.

## Ablauf

1. Besucher gibt Code ein → `POST /unlock` → Session-Token (HMAC, TTL ca. 30 Tage)
2. Browser speichert Token in `localStorage` (ein Token für alle Member-Videos)
3. Vor dem Abspielen → `POST /sign` mit Token + Objekt-Key → kurzlebige `/play`-URL (ca. 2 h)
4. `<video>` lädt von `GET /play?...` (Range/Seek, privates R2)

Codes: **pro Person ein eigener Code**. KV speichert nur den **SHA-256-Hash**, nie Klartext. Wer welchen Code hat, steht nicht automatisch im System: sinnvolles `label` in KV plus eigene interne Liste (siehe [r2-member-videos.md](../../docs/cloudflare/r2-member-videos.md)).

## Einrichtung (ausführlich)

Schritt-für-Schritt inkl. **was KV ist**, Namespace anlegen, Einträge setzen, Secret und Deploy:

→ [docs/cloudflare/r2-member-videos.md](../../docs/cloudflare/r2-member-videos.md)

Kurz:

1. Privates R2 (ohne Public Domain) + KV-Namespace
2. Bindings in `wrangler.toml` (`MEDIA`, `ACCESS_CODES` + Namespace-ID)
3. `npx wrangler secret put SIGNING_SECRET` → `npm run deploy`
4. Site-Config: `media.videoAccessWorkerUrl`
5. `npm run hash-code -- --generate` → Hash + JSON mit `label` in KV (Klartext nur an die Person)

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
