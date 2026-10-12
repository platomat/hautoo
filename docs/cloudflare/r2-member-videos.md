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

| Was | Wo |
| --- | --- |
| Worker-Name | `hautoo-member-media-access` (Cloudflare) |
| Worker-Code | `workers/media-access/` (gleiches Repo, eigenes Deploy) |
| Komponente | `src/components/MemberVideo.astro` |
| Embed | `{{member-video src="datei.mp4" title="…" }}` |
| CMS | Toolbar **Member-Video (Code)** |
| Worker-URL | Content → Medien → `videoAccessWorkerUrl` |
| Session | `localStorage`: `hautuu-member-video-token` (Session-Token, nicht der Klartext-Code) |

Ein Token gilt **site-weit für alle Member-Videos** im Browser. Jede Person bekommt einen **eigenen** Code (Hash in KV).

## Was ist KV hier?

**Workers KV** ist ein einfacher Key-Value-Speicher bei Cloudflare (kein SQL). Der Worker fragt beim Freischalten: „Gibt es diesen Hash?“

| | Bedeutung |
| --- | --- |
| **Namespace** | Eine benannte „Schublade“ für alle Zugangscodes (einmal anlegen) |
| **Key** | SHA-256-Hash des Codes (64 Hex-Zeichen), **nicht** der Klartext |
| **Value** | JSON-Metadaten, z. B. ob der Code aktiv ist und für wen (`label`) |

Beispiel-Eintrag:

| Feld | Beispiel |
| --- | --- |
| Key | `a3f2…` (Ausgabe von `npm run hash-code`) |
| Value | `{"active":true,"label":"anna-mueller","createdAt":"2026-04-09"}` |

Ohne Eintrag in KV ist jeder Code ungültig. Du legst Einträge manuell an (Dashboard oder CLI), nachdem du einen Code generiert hast.

## Wer hat welchen Code?

Der Worker speichert **keine** Personenliste und **keinen** Klartext-Code. In KV liegt nur Hash + JSON.

`label` ist frei wählbar (interne Notiz, Kundenkürzel). Darüber kannst du später sperren oder zuordnen, **ohne** den Klartext in KV zu halten.

Zusätzlich brauchst du intern eine eigene Übersicht (Tabelle, Passwortmanager-Notiz), mindestens:

| Person / Kanal | Klartext-Code (nur bei dir / beim Empfänger) | KV-label | ausgegeben am |
| --- | --- | --- | --- |

Den Klartext nach dem Versand idealerweise nur noch beim Empfänger belassen und bei dir nur Hash + Label + Person notieren. Ohne solche Liste und ohne sinnvolles `label` kannst du aus KV allein nicht rekonstruieren, wem welcher Code gehört.

## Warum Worker im gleichen Repo?

Ein Ordner `workers/media-access/` reicht: gemeinsames Git, getrennte Deployments (Pages vs. Worker). Zweites Repo nur nötig, wenn andere Rechte/Teams den Worker getrennt versionieren sollen. Standard hier: **ein Repo**.

## Voraussetzungen

1. Cloudflare-Account (gleiche Umgebung wie Pages für `hautoo`).
2. Lokal: Node.js, Repo ausgecheckt, im Ordner `workers/media-access/` arbeiten können.
3. Einmalig: bei Cloudflare eingeloggt (`npx wrangler login`) oder API-Token mit Rechten für Workers, KV und R2.
4. MP4s für den privaten Bucket (nicht in Git committen).

## Schritt 1: Privaten R2-Bucket anlegen

Das ist **nicht** derselbe Bucket wie die öffentlichen Videos unter `media.hautoo…`. Member-Dateien dürfen **keine** öffentliche Custom Domain haben.

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **R2** → **Create bucket**.
2. Name z. B. `hautoo-member-media` (nur intern).
3. **Keine** Custom Domain / kein Public Access für diesen Bucket.
4. Optional: Test-Datei hochladen, z. B. Objekt-Key `mitglieder/test.mp4`.

Der Objekt-Key (Pfad im Bucket) ist später genau der `src` im Embed `{{member-video src="mitglieder/test.mp4" …}}`.

## Schritt 2: KV-Namespace anlegen

Hier liegen die erlaubten Codes (als Hash).

### Im Dashboard

1. Dashboard → **Workers & Pages** → links **KV** (manchmal unter **Storage & databases** → **KV**).
2. **Create a namespace**.
3. Name z. B. `hautoo-member-media-codes` → anlegen.
4. Den Namespace öffnen. Oben oder unter Settings die **Namespace ID** kopieren (lange Hex-ID). Die brauchst du in `wrangler.toml`.

Noch **keine** Keys anlegen. Codes kommen in Schritt 7.

### Alternativ per CLI (im Ordner `workers/media-access/`)

```bash
npx wrangler kv namespace create hautoo-member-media-codes
```

Die Ausgabe enthält die `id`. Diese ID in `wrangler.toml` eintragen (siehe Schritt 3).

## Schritt 3: Worker binden (`wrangler.toml`)

Datei: `workers/media-access/wrangler.toml`.

Die Bindings sind zunächst auskommentiert. Aktiviere sie und setze echte Namen/IDs:

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

| Einstellung | Bedeutung |
| --- | --- |
| `binding = "MEDIA"` | Name im Worker-Code (`env.MEDIA`). Nicht ändern, außer du änderst auch den Code. |
| `bucket_name` | Exakter R2-Bucket-Name aus Schritt 1. |
| `binding = "ACCESS_CODES"` | Name im Worker-Code (`env.ACCESS_CODES`). Nicht ändern. |
| `id` | KV-Namespace-ID aus Schritt 2 (nicht der Anzeigename). |
| `ALLOWED_ORIGINS` | Kommagetrennt: Origins, die `/unlock` und `/sign` aufrufen dürfen. Site-URL und lokales Astro. |
| `MEDIA_KEY_PREFIX` | Optional. Wenn alle Member-Objekte unter z. B. `members/` liegen, hier `members` setzen; sonst leer lassen. |

`binding`-Namen (`MEDIA`, `ACCESS_CODES`) müssen so bleiben, wie der Worker sie erwartet. Bucket-Name und KV-`id` sind deine echten Cloudflare-Ressourcen.

### Darf die KV-ID ins öffentliche Repo?

**Ja.** Die Namespace-ID in `wrangler.toml` zu committen ist üblich und unkritisch. Sie ist nur ein Zeiger („welcher Namespace“), kein Zugangsschlüssel.

| Ins Repo ok | Nie ins Repo |
| --- | --- |
| KV-Namespace-ID, Bucket-Name, Worker-Name, `ALLOWED_ORIGINS` | Klartext-Codes, `SIGNING_SECRET`, `.dev.vars`, API-Tokens |

Wer die ID kennt, kann KV **nicht** lesen oder ändern. Dafür braucht man deine Cloudflare-Login-Session bzw. ein API-Token mit Rechten. Die eigentlichen Codes stehen nur als Hash hinter der Authentifizierung bei Cloudflare; ohne Account-Zugriff bleibt die Schublade zu.

`SIGNING_SECRET` kommt separat (Schritt 4) und landet **nicht** in Git.

## Schritt 4: Signing-Secret setzen

Der Worker signiert Session-Tokens und kurzlebige Play-URLs. Ohne Secret startet er nicht sinnvoll.

Im Ordner `workers/media-access/`:

```bash
npm install
npx wrangler secret put SIGNING_SECRET
```

Wenn Wrangler nach dem Wert fragt: langen Zufallsstring einfügen (z. B. Ausgabe von `openssl rand -hex 32`), Enter. Der Wert landet **nur** bei Cloudflare, nicht in Git.

Lokal zum Testen: `.dev.vars.example` nach `.dev.vars` kopieren und dort `SIGNING_SECRET=…` setzen (Datei ist gitignored).

## Schritt 5: Worker deployen

Im Ordner `workers/media-access/`:

```bash
npm run deploy
```

Erwartete URL in etwa:

```text
https://hautoo-member-media-access.<dein-subdomain>.workers.dev
```

Kurz prüfen (Browser oder curl):

```text
https://hautoo-member-media-access.<…>.workers.dev/health
```

Antwort sollte JSON mit `"ok": true` sein.

Optional später: eigene Route/Custom Domain für den Worker. Für den Start reicht `*.workers.dev`.

## Schritt 6: Worker-URL in der Site-Config

CMS: **Konfiguration → Content → Medien → Video-Access-Worker-URL**

Oder Datei `src/content/settings/content.json`:

```json
"media": {
  "videoBaseUrl": "https://media.hautoo.storyofai.net/videos/",
  "videoAccessWorkerUrl": "https://hautoo-member-media-access.<…>.workers.dev"
}
```

Ohne Slash am Ende. Leer lassen: Member-Video-Embeds zeigen nur einen Konfigurationshinweis.

Nach Deploy der Site (Pages) ist die URL für Besucher aktiv.

## Schritt 7: Zugangscode erzeugen und in KV legen

### 7a. Code generieren

Im Ordner `workers/media-access/`:

```bash
npm run hash-code -- --generate
```

Beispielausgabe (Werte sind erfunden):

```text
Plaintext (give to user, do not commit):
  ABCD-EFGH-IJKL-MNOP

KV key:
  9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08

KV value:
  {"active":true,"label":"","createdAt":"2026-04-09"}
```

- **Plaintext:** nur an die Person (E-Mail, DM). Nicht committen, nicht in öffentliche Issues.
- **KV key:** in den Namespace eintragen.
- **KV value:** `label` vorher setzen, z. B. `"label":"anna-mueller"`.

### 7b. Eintrag im Dashboard anlegen

1. Dashboard → **KV** → Namespace `hautoo-member-media-codes`.
2. **Add entry** (oder Equivalent).
3. **Key:** den Hex-Hash aus der Script-Ausgabe komplett einfügen (kein Leerzeichen, alles klein wie ausgegeben).
4. **Value:** JSON, z. B.:

```json
{"active":true,"label":"anna-mueller","createdAt":"2026-04-09"}
```

5. Speichern.

### 7c. Alternativ per CLI

```bash
npx wrangler kv key put \
  --namespace-id=DEINE_KV_NAMESPACE_ID_HIER \
  "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08" \
  '{"active":true,"label":"anna-mueller","createdAt":"2026-04-09"}'
```

(`wrangler kv key put` / Namespace-Flags können je nach Wrangler-Version leicht abweichen; Hilfe: `npx wrangler kv key put --help`.)

### Code sperren

- Value auf `{"active":false,"label":"anna-mueller","createdAt":"2026-04-09"}` setzen, oder
- den Key löschen.

Bestehende Browser-Sessions scheitern beim nächsten `/sign` (nächstes Video laden).

## Schritt 8: Video hochladen und einbinden

1. MP4 in den **privaten** Bucket legen (Dashboard R2 → Upload). Objekt-Key notieren, z. B. `mitglieder/folge-010.mp4`.
2. Im Artikel (CMS-Toolbar **Member-Video (Code)** oder Markdown):

```markdown
{{member-video src="mitglieder/folge-010.mp4" title="Folge 010" poster="/assets/poster.webp"}}
```

`src` = Objekt-Key im privaten Bucket, **nicht** die öffentliche `media.`-URL.

3. Seite öffnen → Zugangscode eingeben → Video sollte spielen.
4. Zweites Member-Video auf einer anderen Seite: ohne erneute Code-Eingabe (gleicher Browser, Token in `localStorage`).

## Lokal entwickeln (optional)

```bash
cd workers/media-access
cp .dev.vars.example .dev.vars
# SIGNING_SECRET in .dev.vars setzen; Bindings in wrangler.toml wie oben
npm install
npm run dev
```

In der lokalen Site-Config `videoAccessWorkerUrl` auf `http://127.0.0.1:8787` (oder den von Wrangler angezeigten Port) setzen. `ALLOWED_ORIGINS` muss `http://localhost:4321` enthalten.

Für lokales KV/R2: Wrangler kann Remote-Bindings nutzen oder lokale Simulation; siehe aktuelle Wrangler-Doku. Für den ersten produktiven Test reicht oft Deploy + Dashboard-KV.

## Abgrenzung zu öffentlichen Videos

| | Öffentlich (`file`) | Member |
| --- | --- | --- |
| Bucket | öffentlich / Custom Domain | privat, kein Public Access |
| Embed | `{{video provider="file" …}}` | `{{member-video …}}` |
| Config | `videoBaseUrl` | `videoAccessWorkerUrl` |
| Zugang | jeder mit URL | persönlicher Code in KV |

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
