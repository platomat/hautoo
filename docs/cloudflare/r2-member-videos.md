# Geschützte Member-Videos (privates R2 + Zugangscode)

Öffentliche R2-Videos (`VideoEmbed` / `provider="file"`) bleiben unverändert. Für Inhalte nur mit persönlichem Code brauchst du drei Cloudflare-Bausteine:

1. **Privater R2-Bucket** (MP4s, keine öffentliche Domain)
2. **D1-Datenbank** `hautoo` (Tabelle `member_media_access`: Code-Hash + Content-Muster)
3. **Worker** `hautoo-member-media-access` (prüft Code, liefert Stream)

Wer die öffentliche Doku und den Worker-Code liest, kann **ohne gültigen Code weder Token noch Stream** bekommen. Klartext-Codes und `SIGNING_SECRET` gehören nicht ins Repo.

## Überblick

```text
Privates R2  ←  Worker (unlock / sign / play)  ←  MemberVideo im Browser
                     ↑
              D1 hautoo.member_media_access
              (code_hash, content, label, active)
```

| Was | Wo |
| --- | --- |
| Worker-Name | `hautoo-member-media-access` (Cloudflare) |
| Worker-Code | `workers/media-access/` (gleiches Repo, eigenes Deploy) |
| D1 | Datenbank `hautoo`, Tabelle `member_media_access` |
| Komponente | `src/components/MemberVideo.astro` |
| Embed | `{{member-video src="datei.mp4" title="…" }}` |
| CMS | Toolbar / Einfügen-Menü **Member-Video (Code)** |
| Worker-URL | Content → Medien → `videoAccessWorkerUrl` |
| Session | `localStorage`: `hautuu-member-video-token` |

Ein Session-Token gilt site-weit im Browser. Beim Abspielen prüft der Worker zusätzlich die Spalte `content` (darf dieser Code dieses Objekt?).

## D1 und Tabelle `member_media_access`

**D1** ist SQLite bei Cloudflare. Die DB heißt allgemein **`hautoo`** (später ggf. weitere Tabellen). Zugangscodes liegen in **`member_media_access`**.

| Spalte | Bedeutung |
| --- | --- |
| `code_hash` | SHA-256 des normalisierten Codes (nie Klartext) |
| `content` | Was der Code freischaltet (Muster, siehe unten) |
| `label` | Interne Notiz (z. B. Name), nicht an den Browser |
| `active` | `1` = gültig, `0` = gesperrt |
| `created_at` | Datum |

### Spalte `content` (Muster)

Kommagetrennt, Reihenfolge egal. Mindestens ein Muster muss zum Objekt-Key passen:

| `content` | Bedeutung |
| --- | --- |
| `*` | alles im privaten Bucket |
| `*.mp4` | nur Dateien mit Endung `.mp4` |
| `*.pdf` | nur PDFs |
| `videos/folge-001-intro.mp4` | genau dieses Objekt |
| `*.mp4,*.pdf` | MP4 oder PDF |
| `videos/a.mp4,videos/b.mp4` | diese beiden Keys |

Beim Freischalten (`/unlock`) reicht ein aktiver Code. Beim Signieren (`/sign`) für ein konkretes Video greift `content`. Passt nichts: HTTP 403, Meldung „Kein Zugriff auf dieses Video…“.

Schema: `workers/media-access/migrations/0001_member_media_access.sql`.

## Wer hat welchen Code?

Klartext-Code nicht in der DB. `label` z. B. `Anna Müller` ist nur für dich im Dashboard sichtbar, nicht im Browser.

| Person / Kanal | Klartext (nur Empfänger) | `label` in D1 | `content` | ausgegeben am |
| --- | --- | --- | --- | --- |

## Setup: Reihenfolge im Überblick

| Schritt | Wo | Kurz |
| --- | --- | --- |
| 1 | Cloudflare Dashboard | Privaten R2-Bucket anlegen |
| 2 | Terminal | D1 `hautoo` anlegen, Migration anwenden, ID in `wrangler.toml` |
| 3 | Editor | R2- + D1-Bindings, `ALLOWED_ORIGINS` |
| 4 | Terminal | `npm install` → `wrangler login` → Secret |
| 5 | Terminal | Worker deployen |
| 6 | CMS / `content.json` | Worker-URL |
| 7 | Terminal + D1 SQL | Code hashen, Zeile einfügen |
| 8 | R2 + CMS | Video hochladen, Embed, testen |

## Voraussetzungen

- Cloudflare-Account (wie Pages für `hautoo`)
- Repo lokal, Node.js
- MP4s bereit (nicht in Git)

`wrangler login` erst in **Schritt 4** (bzw. vor Schritt 2, wenn du D1 per CLI anlegst).

## Schritt 1: Privaten R2-Bucket anlegen

**Wo:** Cloudflare Dashboard.

Nicht der öffentliche `media.hautoo…`-Bucket. Keine Custom Domain / kein Public Access.

1. [dash.cloudflare.com](https://dash.cloudflare.com/) → **R2** → **Create bucket**.
2. Name z. B. `hautoo-member-media`.
3. Optional Test-Upload: `videos/folge-001.mp4`.

## Schritt 2: D1-Datenbank `hautoo` anlegen

**Wo:** lokal im Terminal, Ordner `workers/media-access/` (nach `npm install` / Login, siehe 4a/4b).

### 2a. Datenbank erzeugen

```bash
cd /pfad/zu/hautoo/workers/media-access
npx wrangler d1 create hautoo
```

Ausgabe enthält die **database_id** (UUID). Kopieren.

### 2b. In `wrangler.toml` eintragen

```toml
[[d1_databases]]
binding = "DB"
database_name = "hautoo"
database_id = "DEINE_D1_DATABASE_ID"
migrations_dir = "migrations"
```

### 2c. Schema anwenden (remote = Produktion)

```bash
npx wrangler d1 migrations apply hautoo --remote
```

Fertig, wenn die Tabelle `member_media_access` existiert (Dashboard → **D1** → `hautoo` → Tables).

Die D1-`database_id` darf ins öffentliche Repo (wie Bucket-Name). Kein Zugangsschlüssel.

## Schritt 3: Worker binden (`wrangler.toml`)

**Wo:** `workers/media-access/wrangler.toml`.

```toml
name = "hautoo-member-media-access"
main = "src/index.ts"
compatibility_date = "2024-11-01"

[[r2_buckets]]
binding = "MEDIA"
bucket_name = "hautoo-member-media"

[[d1_databases]]
binding = "DB"
database_name = "hautoo"
database_id = "DEINE_D1_DATABASE_ID"
migrations_dir = "migrations"

[vars]
ALLOWED_ORIGINS = "https://hautoo.storyofai.net,http://localhost:4321"
MEDIA_KEY_PREFIX = ""
```

| Einstellung | Was |
| --- | --- |
| `binding = "MEDIA"` / `"DB"` | Nicht umbenennen (Worker-Code) |
| `bucket_name` | R2 aus Schritt 1 |
| `database_id` | D1 aus Schritt 2 |
| `MEDIA_KEY_PREFIX` | meist `""` (voller Key im Embed, z. B. `videos/….mp4`) |

### `MEDIA_KEY_PREFIX`

Bei Ordnern `videos/` und später `pdfs/`: Prefix leer, Embed mit vollem Key:

```markdown
{{member-video src="videos/folge-001.mp4" title="Folge 001"}}
```

| Ins Repo ok | Nie ins Repo |
| --- | --- |
| D1-ID, Bucket-Name, Worker-Name, `ALLOWED_ORIGINS` | Klartext-Codes, `SIGNING_SECRET`, `.dev.vars`, API-Tokens |

## Schritt 4: Signing-Secret setzen

**Wo:** lokal Terminal, `workers/media-access/`.

### 4a. Abhängigkeiten

```bash
cd /pfad/zu/hautoo/workers/media-access
npm install
```

### 4b. Einloggen (einmal)

```bash
npx wrangler login
```

### 4c. Secret

```bash
openssl rand -hex 32
npx wrangler secret put SIGNING_SECRET
```

Wert einfügen, Enter. Nur bei Cloudflare, nicht in Git.

Optional lokal: `.dev.vars` aus `.dev.vars.example` für `npm run dev`.

## Schritt 5: Worker deployen

```bash
cd /pfad/zu/hautoo/workers/media-access
npm run deploy
```

URL notieren, z. B. `https://hautoo-member-media-access.<…>.workers.dev` oder Custom Domain.

Prüfen: `…/health` → `{"ok":true,…}`.

## Schritt 6: Worker-URL in der Site-Config

CMS: **Content → Medien → Video-Access-Worker-URL** oder `content.json` → `media.videoAccessWorkerUrl` (ohne Slash am Ende). Site neu deployen.

## Schritt 7: Zugangscode in D1 legen

### 7a. Code erzeugen und in D1 legen

Empfohlen (ein Befehl: Hash + INSERT remote):

```bash
cd /pfad/zu/hautoo/workers/media-access
npm run hash-code -- --generate --content "*" --label "Anna Müller" --insert
```

Andere `content`-Beispiele: `--content "*.mp4"` oder `--content "videos/folge-001-intro.mp4"`.

Ausgabe: Klartext (nur an die Person notieren/weitergeben) + `code_hash`. Mit `--insert` schreibt Wrangler die Zeile direkt in D1 `hautoo` (Standard: `--remote`). Lokal testen: zusätzlich `--local`.

Ohne `--insert` zeigt das Script nur das SQL (zum manuellen Ausführen im Dashboard).

### Code sperren

```sql
UPDATE member_media_access SET active = 0 WHERE code_hash = '…';
```

Sessions scheitern beim nächsten `/sign`.

## Schritt 8: Video hochladen und einbinden

1. MP4 in privaten Bucket, Key z. B. `videos/folge-001.mp4`.
2. Embed: `{{member-video src="videos/folge-001.mp4" title="…" }}`
3. Code eingeben → spielen; zweites Member-Video ohne neuen Code (gleicher Browser), sofern `content` das Key erlaubt.

## Lokal entwickeln (optional)

1. `cd workers/media-access`
2. `.dev.vars` mit `SIGNING_SECRET`
3. `npx wrangler d1 migrations apply hautoo --local` bei Bedarf
4. `npm run dev`
5. Site: `videoAccessWorkerUrl` → `http://127.0.0.1:8787`

## Abgrenzung

| | Öffentlich (`file`) | Member |
| --- | --- | --- |
| Bucket | öffentlich / Custom Domain | privat |
| Embed | `{{video provider="file" …}}` | `{{member-video …}}` |
| Config | `videoBaseUrl` | `videoAccessWorkerUrl` |
| Zugang | URL | Code in D1 + `content`-Muster |

## Datenschutz

Session-Token in **localStorage**; Abruf über Worker/Cloudflare/D1. Absatz unter `/datenschutz/`.

## Checkliste

- [ ] Privater R2-Bucket, Test-MP4
- [ ] D1 `hautoo` + Migration `member_media_access`, ID in `wrangler.toml`
- [ ] Bindings + `ALLOWED_ORIGINS`
- [ ] `SIGNING_SECRET`
- [ ] Worker deployed, `/health` ok
- [ ] `videoAccessWorkerUrl` gesetzt
- [ ] Code mit `hash-code --generate … --insert` angelegt (`label` + `content`)
- [ ] Embed getestet (inkl. `content`-Einschränkung falls gesetzt)

## Referenzen

- Worker: [workers/media-access/README.md](../../workers/media-access/README.md)
- Öffentliche Videos: [r2-videos.md](./r2-videos.md)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
