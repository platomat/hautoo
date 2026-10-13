# Geschützte Member-Videos (privates R2 + Zugangscode)

Öffentliche R2-Videos (`VideoEmbed` / `provider="file"`) bleiben unverändert. Für Inhalte nur mit persönlichem Code brauchst du drei Cloudflare-Bausteine:

1. **Privater R2-Bucket** (MP4s, keine öffentliche Domain)
2. **KV-Namespace** (Liste erlaubter Codes als Hash, nicht Klartext)
3. **Worker** `hautoo-member-media-access` (prüft Code, liefert Stream)

Wer die öffentliche Doku und den Worker-Code liest, kann **ohne gültigen Code weder Token noch Stream** bekommen. Klartext-Codes und `SIGNING_SECRET` gehören nicht ins Repo.

## Überblick

```text
Privates R2  ←  Worker (unlock / sign / play)  ←  MemberVideo im Browser
                     ↑
              KV: sha256(code) → { active, label }
```


| Was         | Wo                                                                                              |
| ----------- | ----------------------------------------------------------------------------------------------- |
| Worker-Name | `hautoo-member-media-access` (Cloudflare)                                                       |
| Worker-Code | `workers/media-access/` (gleiches Repo, eigenes Deploy)                                         |
| Komponente  | `src/components/MemberVideo.astro`                                                              |
| Embed       | `{{member-video src="datei.mp4" title="…" }}`                                                   |
| CMS         | Toolbar / Einfügen-Menü **Member-Video (Code)** (Whitelist `editor_components` in `config.yml`) |
| Worker-URL  | Content → Medien → `videoAccessWorkerUrl`                                                       |
| Session     | `localStorage`: `hautuu-member-video-token` (Session-Token, nicht der Klartext-Code)            |


Ein Token gilt **site-weit für alle Member-Videos** im Browser. Jede Person bekommt einen **eigenen** Code (Hash in KV).

## Was ist KV hier?

**Workers KV** ist ein einfacher Key-Value-Speicher bei Cloudflare (kein SQL). Der Worker fragt beim Freischalten: „Gibt es diesen Hash?“


|               | Bedeutung                                                         |
| ------------- | ----------------------------------------------------------------- |
| **Namespace** | Eine benannte „Schublade“ für alle Zugangscodes (einmal anlegen)  |
| **Key**       | SHA-256-Hash des Codes (64 Hex-Zeichen), **nicht** der Klartext   |
| **Value**     | JSON-Metadaten, z. B. ob der Code aktiv ist und für wen (`label`) |


Beispiel-Eintrag:


| Feld  | Beispiel                                                          |
| ----- | ----------------------------------------------------------------- |
| Key   | `a3f2…` (Ausgabe von `npm run hash-code`)                         |
| Value | `{"active":true,"label":"anna-mueller","createdAt":"2026-04-09"}` |


Ohne Eintrag in KV ist jeder Code ungültig. Du legst Einträge manuell an (Dashboard oder CLI), nachdem du einen Code generiert hast.

## Wer hat welchen Code?

Der Worker speichert **keine** Personenliste und **keinen** Klartext-Code. In KV liegt nur Hash + JSON.

`label` ist frei wählbar (interne Notiz, Kundenkürzel). Darüber kannst du später sperren oder zuordnen, **ohne** den Klartext in KV zu halten.

Zusätzlich brauchst du intern eine eigene Übersicht (Tabelle, Passwortmanager-Notiz), mindestens:


| Person / Kanal | Klartext-Code (nur bei dir / beim Empfänger) | KV-label | ausgegeben am |
| -------------- | -------------------------------------------- | -------- | ------------- |


Den Klartext nach dem Versand idealerweise nur noch beim Empfänger belassen und bei dir nur Hash + Label + Person notieren. Ohne solche Liste und ohne sinnvolles `label` kannst du aus KV allein nicht rekonstruieren, wem welcher Code gehört.

## Warum Worker im gleichen Repo?

Ein Ordner `workers/media-access/` reicht: gemeinsames Git, getrennte Deployments (Pages vs. Worker). Zweites Repo nur nötig, wenn andere Rechte/Teams den Worker getrennt versionieren sollen. Standard hier: **ein Repo**.

## Setup: Reihenfolge im Überblick


| Schritt | Wo                      | Kurz                                             |
| ------- | ----------------------- | ------------------------------------------------ |
| 1       | Cloudflare Dashboard    | Privaten R2-Bucket anlegen                       |
| 2       | Cloudflare Dashboard    | KV-Namespace anlegen, ID kopieren                |
| 3       | Lokal: Editor           | `wrangler.toml` mit Bucket-Name + KV-ID füllen   |
| 4       | Lokal: Terminal         | `npm install` → `wrangler login` → Secret setzen |
| 5       | Lokal: Terminal         | Worker deployen                                  |
| 6       | CMS oder `content.json` | Worker-URL eintragen                             |
| 7       | Terminal + Dashboard    | Code erzeugen, Hash in KV legen                  |
| 8       | Dashboard R2 + CMS      | Video hochladen, Embed setzen, testen            |


## Voraussetzungen

- Cloudflare-Account (gleiche Umgebung wie Pages für `hautoo`)
- Repo lokal ausgecheckt, Node.js installiert
- MP4s bereit (nicht in Git committen)

`wrangler login` machst du erst in **Schritt 4**, nicht vorher.

## Schritt 1: Privaten R2-Bucket anlegen

**Wo:** Cloudflare Dashboard (Browser), nicht im Terminal.

Das ist **nicht** derselbe Bucket wie die öffentlichen Videos unter `media.hautoo…`. Member-Dateien dürfen **keine** öffentliche Custom Domain haben.

1. [dash.cloudflare.com](https://dash.cloudflare.com/) → **R2** → **Create bucket**.
2. Name z. B. `hautoo-member-media` (nur intern; exakt so später in `wrangler.toml`).
3. **Keine** Custom Domain / kein Public Access für diesen Bucket.
4. Optional schon jetzt eine Test-Datei hochladen: Ordner `videos/`, Datei z. B. `folge-001.mp4` → Objekt-Key `videos/folge-001.mp4`.

Fertig mit Schritt 1, wenn der Bucket existiert und du den Namen notiert hast.

## Schritt 2: KV-Namespace anlegen

**Wo:** Cloudflare Dashboard (Browser). Hier liegen später die erlaubten Codes als Hash.

1. Dashboard → **Workers & Pages** → links **KV** (manchmal **Storage & databases** → **KV**).
2. **Create a namespace**.
3. Name z. B. `hautoo-member-media-codes` → anlegen.
4. Namespace öffnen → **Namespace ID** kopieren (lange Hex-ID, nicht der Anzeigename).

Noch **keine** Keys/Einträge anlegen. Codes kommen in Schritt 7.

Fertig mit Schritt 2, wenn du die Namespace-ID in der Zwischenablage oder Notiz hast.

## Schritt 3: Worker binden (`wrangler.toml`)

**Wo:** lokal im Editor, Datei `workers/media-access/wrangler.toml`.

### 3a. Werte eintragen

Bucket-Name aus Schritt 1 und KV-ID aus Schritt 2 einsetzen. Die `binding`-Namen (`MEDIA`, `ACCESS_CODES`) nicht umbenennen.

```toml
name = "hautoo-member-media-access"
main = "src/index.ts"
compatibility_date = "2024-11-01"

[[r2_buckets]]
binding = "MEDIA"
bucket_name = "hautoo-member-media"

[[kv_namespaces]]
binding = "ACCESS_CODES"
id = "DEINE_KV_NAMESPACE_ID_HIER"

[vars]
ALLOWED_ORIGINS = "https://hautoo.storyofai.net,http://localhost:4321"
MEDIA_KEY_PREFIX = ""
```


| Einstellung        | Was du einträgst                                          |
| ------------------ | --------------------------------------------------------- |
| `bucket_name`      | Exakter R2-Name aus Schritt 1                             |
| `id`               | KV-Namespace-ID aus Schritt 2                             |
| `ALLOWED_ORIGINS`  | Site-URL und lokal `http://localhost:4321`, kommagetrennt |
| `MEDIA_KEY_PREFIX` | **leer lassen** (`""`), siehe 3b                          |


### 3b. `MEDIA_KEY_PREFIX`: leer lassen

Bei Ordnern wie `videos/` und später `pdfs/` bleibt das Prefix leer. Im Embed steht der **volle** Objekt-Key:

```markdown
{{member-video src="videos/folge-001.mp4" title="Folge 001"}}
```


| Bucket-Objekt          | Embed `src`                      | Prefix |
| ---------------------- | -------------------------------- | ------ |
| `videos/folge-001.mp4` | `videos/folge-001.mp4`           | leer   |
| `pdfs/handout.pdf`     | (später; Key `pdfs/handout.pdf`) | leer   |


Nur wenn wirklich alles unter einem einzigen Ordner liegt und du den Ordner im Embed weglassen willst, wäre z. B. `MEDIA_KEY_PREFIX = "videos"` sinnvoll. Bei gemischten Ordnern: Prefix leer.

### 3c. Darf die KV-ID ins öffentliche Repo?

**Ja.** Namespace-ID und Bucket-Name in `wrangler.toml` zu committen ist üblich. Das ist kein Zugangsschlüssel.


| Ins Repo ok                                        | Nie ins Repo                                              |
| -------------------------------------------------- | --------------------------------------------------------- |
| KV-ID, Bucket-Name, Worker-Name, `ALLOWED_ORIGINS` | Klartext-Codes, `SIGNING_SECRET`, `.dev.vars`, API-Tokens |


Wer die ID kennt, kann KV nicht lesen. Dafür braucht man deinen Cloudflare-Login bzw. ein API-Token. `SIGNING_SECRET` kommt in Schritt 4 und landet nicht in Git.

Fertig mit Schritt 3, wenn `wrangler.toml` gespeichert ist und die echten IDs/Namen enthält.

## Schritt 4: Signing-Secret setzen

Der Worker signiert Session-Tokens und kurzlebige Play-URLs. Ohne Secret startet er nicht sinnvoll.

Alles läuft **lokal in deinem Terminal** (nicht im Cloudflare-Dashboard). Reihenfolge:

### 4a. In den Worker-Ordner wechseln und Abhängigkeiten installieren

```bash
cd /pfad/zu/hautoo/workers/media-access
npm install
```

(`npm install` holt u. a. Wrangler. Einmal reicht, bis sich `package.json` ändert.)

### 4b. Bei Cloudflare einloggen (nur einmal nötig)

```bash
npx wrangler login
```

Es öffnet sich der Browser. Mit dem Cloudflare-Account anmelden, der den R2-/KV-Account hat, und den Zugriff erlauben. Danach bist du auf diesem Rechner für Wrangler angemeldet (Session lokal gespeichert). Bei späteren Befehlen brauchst du `login` nicht jedes Mal neu.

### 4c. Secret erzeugen und hochladen

Zufallsstring erzeugen (beliebiges Terminal):

```bash
openssl rand -hex 32
```

Die ausgegebene Hex-Zeile kopieren. Dann im Worker-Ordner:

```bash
npx wrangler secret put SIGNING_SECRET
```

Wrangler fragt nach dem Wert: kopierten String einfügen, Enter. Das Secret liegt danach **nur bei Cloudflare** für den Worker `hautoo-member-media-access`, nicht in Git und nicht dauerhaft in einer Repo-Datei.

### Optional: lokaler Worker-Dev

Nur wenn du später `npm run dev` lokal nutzt: `.dev.vars.example` nach `.dev.vars` kopieren und dort ein Secret eintragen (gitignored). Für den produktiven Deploy reicht Schritt 4c.

## Schritt 5: Worker deployen

**Wo:** lokal im Terminal, Ordner `workers/media-access/` (du bist nach Schritt 4 schon eingeloggt).

### 5a. Deploy

```bash
cd /pfad/zu/hautoo/workers/media-access
npm run deploy
```

Wrangler baut den Worker und lädt ihn zu Cloudflare hoch. Am Ende erscheint die Worker-URL, etwa:

```text
https://hautoo-member-media-access.<dein-subdomain>.workers.dev
```

Diese URL kopieren (brauchst du in Schritt 6).

### 5b. Kurz prüfen

Im Browser oder per curl die Health-URL öffnen:

```text
https://hautoo-member-media-access.<…>.workers.dev/health
```

Erwartung: JSON mit `"ok": true`.

Für den Start reicht `*.workers.dev`. Eigene Domain für den Worker ist optional und später möglich.

## Schritt 6: Worker-URL in der Site-Config

**Wo:** CMS oder Datei im Repo. Die Site muss die Worker-URL kennen, sonst können Member-Videos nicht freischalten.

### 6a. Eintragen

Entweder CMS: **Konfiguration → Content → Medien → Video-Access-Worker-URL**

Oder Datei `src/content/settings/content.json`:

```json
"media": {
  "videoBaseUrl": "https://media.hautoo.storyofai.net/videos/",
  "videoAccessWorkerUrl": "https://hautoo-member-media-access.<…>.workers.dev"
}
```

Ohne Slash am Ende. Wert = URL aus Schritt 5a.

### 6b. Site deployen

Damit Besucher die Config sehen: Änderung committen/pushen bzw. Pages-Build auslösen (wie üblich bei hautoo). Lokal zum Testen reicht die lokale Config + `astro dev`.

Leer lassen: Member-Video-Embeds zeigen nur einen Hinweis „nicht konfiguriert“.

## Schritt 7: Zugangscode erzeugen und in KV legen

**Wo:** zuerst Terminal (Code erzeugen), dann Dashboard (Eintrag speichern).

### 7a. Code generieren (Terminal)

```bash
cd /pfad/zu/hautoo/workers/media-access
npm run hash-code -- --generate
```

Beispielausgabe (Werte erfunden):

```text
Plaintext (give to user, do not commit):
  ABCD-EFGH-IJKL-MNOP

KV key:
  9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08

KV value:
  {"active":true,"label":"","createdAt":"2026-04-09"}
```

- **Plaintext:** nur an die Person. Nicht committen, nicht in öffentliche Issues.
- **KV key** und **KV value:** als Nächstes ins Dashboard (7b). Bei Value vorher `"label":"anna-mueller"` o. Ä. setzen.

### 7b. Eintrag im KV-Dashboard anlegen

1. Dashboard → **KV** → Namespace aus Schritt 2 → KV Pairs.
2. **Add entry**.
3. **Key:** Hex-Hash aus 7a komplett (keine Leerzeichen).
4. **Value:** JSON, z. B. `{"active":true,"label":"anna-mueller","createdAt":"2026-04-09"}`.
5. Speichern.

### 7c. Optional: per CLI statt Dashboard

```bash
npx wrangler kv key put \
  --namespace-id=DEINE_KV_NAMESPACE_ID_HIER \
  "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08" \
  '{"active":true,"label":"anna-mueller","createdAt":"2026-04-09"}'
```

Flags können je nach Wrangler-Version leicht abweichen: `npx wrangler kv key put --help`.

### Code sperren

Value auf `"active":false` setzen oder den Key löschen. Bestehende Browser-Sessions scheitern beim nächsten Video-Laden (`/sign`).

## Schritt 8: Video hochladen und einbinden

**Wo:** R2-Dashboard (Upload), dann CMS/Markdown (Embed), dann Browser (Test).

### 8a. MP4 in den privaten Bucket

Dashboard → **R2** → Bucket aus Schritt 1 → Upload. Ziel z. B. Ordner `videos/`, Dateiname `folge-001.mp4`. Objekt-Key notieren: `videos/folge-001.mp4`.

### 8b. Embed im Artikel

CMS-Toolbar **Member-Video (Code)** oder Markdown (`MEDIA_KEY_PREFIX` leer):

```markdown
{{member-video src="videos/folge-001.mp4" title="Folge 001" poster="/assets/poster.webp"}}
```

`src` = voller Objekt-Key im privaten Bucket (inkl. Ordner), nicht die öffentliche `media.`-URL.

### 8c. Testen

1. Seite öffnen → Zugangscode aus Schritt 7 eingeben → Video spielt.
2. Zweites Member-Video (andere Seite): ohne erneute Code-Eingabe im gleichen Browser.

## Lokal entwickeln (optional, nicht für den ersten Live-Test nötig)

Nur wenn du den Worker lokal debuggen willst:

1. `cd workers/media-access`
2. `.dev.vars.example` → `.dev.vars`, darin `SIGNING_SECRET=…`
3. `npm run dev` (Port oft `8787`)
4. In der lokalen Site-Config `videoAccessWorkerUrl` auf `http://127.0.0.1:8787` setzen; `ALLOWED_ORIGINS` enthält `http://localhost:4321`

Für den ersten produktiven Durchlauf reichen Schritte 1–8 mit Deploy + Dashboard-KV.

## Abgrenzung zu öffentlichen Videos


|        | Öffentlich (`file`)           | Member                     |
| ------ | ----------------------------- | -------------------------- |
| Bucket | öffentlich / Custom Domain    | privat, kein Public Access |
| Embed  | `{{video provider="file" …}}` | `{{member-video …}}`       |
| Config | `videoBaseUrl`                | `videoAccessWorkerUrl`     |
| Zugang | jeder mit URL                 | persönlicher Code in KV    |


## Datenschutz

Kurz auf der Datenschutzerklärung: Freischaltung speichert ein Session-Token in **localStorage**; Abruf läuft über den eigenen Worker/Cloudflare. Kein YouTube/Vimeo-Consent nötig. Absatz ist unter `/datenschutz/` bereits skizziert.

## Checkliste

- [ ] Privater R2-Bucket angelegt, **ohne** öffentliche Domain; Test-MP4 hochgeladen
- [ ] KV-Namespace angelegt, Namespace-ID notiert
- [ ] `wrangler.toml`: R2- und KV-Bindings aktiv, `ALLOWED_ORIGINS` gesetzt
- [ ] `SIGNING_SECRET` per `wrangler secret put` gesetzt
- [ ] Worker `hautoo-member-media-access` deployed, `/health` ok
- [ ] `videoAccessWorkerUrl` in Content → Medien gesetzt, Site neu gebaut/deployed
- [ ] Code mit `hash-code --generate` erzeugt, Hash + JSON mit `label` in KV
- [ ] Interne Zuordnung Person ↔ Label geführt, Klartext nicht im Repo
- [ ] Embed im Artikel getestet (Freischaltung + zweites Video ohne neuen Code)
- [ ] Datenschutz-Absatz geprüft

## Referenzen

- Worker-Details: [workers/media-access/README.md](../../workers/media-access/README.md)
- Öffentliche R2-Videos: [r2-videos.md](./r2-videos.md)
- Cloudflare KV: [developers.cloudflare.com/kv](https://developers.cloudflare.com/kv/)
- Wrangler: [developers.cloudflare.com/workers/wrangler](https://developers.cloudflare.com/workers/wrangler/)

