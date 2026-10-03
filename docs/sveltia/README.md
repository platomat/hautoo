# Sveltia CMS

Sveltia ist das geplante CMS, mit dem Redaktion Inhalte im Browser pflegen kann. Änderungen landen als Dateien im GitHub-Repository.

## Entscheidungen (Stand)

| Thema | Entscheidung |
| --- | --- |
| Auth | Zuerst **Personal Access Token (PAT)**; später GitHub App + Cloudflare Worker |
| Speichern | Direkt auf Branch **`main`** |
| Medien | **Neben dem Content** (Variante B) — siehe unten |

Tracking: GitHub [#2](https://github.com/platomat/hautoo/issues/2) und Sub-Issues #3–#6.

## Medienablage (Variante B)

Bilder liegen **neben dem jeweiligen Content-Eintrag**, nicht unter `public/media`.

Beispiel (Artikel):

```text
src/content/articles/mein-artikel/
  index.md          # Frontmatter + Text
  hero.jpg          # Bild zum Eintrag
```

**Warum:** Astro kann solche Bilder mit dem Schema-Helfer `image()` optimieren (Größe, Format). Eintrag und Medien gehören zusammen im Repo.

**Abgrenzung:** How-to-Videos bleiben **Embeds** (Vimeo/YouTube), keine Videodateien im Repo. Siehe [Inhalte](../inhalte/README.md).

## Admin-Zugang (Kurz)

| | |
| --- | --- |
| UI (Produktion) | `https://hautoo.storyofai.net/admin/` |
| UI (lokal) | `http://localhost:4321/admin/` |
| Admin-Shell | `src/pages/admin.html` (Astro-Route — nötig, weil `/admin/` sonst vom Catch-All `404` wird) |
| Config | `public/admin/config.yml` (landet beim Build in `dist/admin/`) |
| Auth jetzt | **GitHub Personal Access Token (PAT)** im Login-Dialog |
| Auth später | GitHub OAuth-App + Cloudflare Worker ([Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-authenticator)) |
| Speichern | Branch **`main`** → Cloudflare Pages baut neu |

---

## Sveltia auf Cloudflare zum Laufen bringen

Voraussetzung: Die Website ist über **Cloudflare Pages** deployed (siehe [Cloudflare](../cloudflare/README.md)). Das CMS ist keine Extra-App — es sind die statischen Dateien unter `/admin/`, die Astro aus `public/admin/` mit ausliefert.

```text
Browser → https://hautoo.storyofai.net/admin/
       → Sveltia (JS) + config.yml
       → Login mit GitHub-PAT
       → schreibt Dateien ins Repo platomat/hautoo (Branch main)
       → Cloudflare Pages Build → Live-Site aktualisiert
```

### Schritt 1 — Site online (Pages)

1. Cloudflare Pages mit Repo `platomat/hautoo` verbinden und bauen ([Anleitung](../cloudflare/README.md)).
2. Prüfen, dass die Admin-UI erreichbar ist:

   - `https://hautoo.storyofai.net/admin/`  
   - oder vor der Custom Domain: `https://<project>.pages.dev/admin/`

3. Erwartet: Login-Bildschirm von Sveltia (noch ohne Inhaltspflege).  
   Fehlt `/admin/`: Build prüfen — Route `src/pages/admin.html` und `public/admin/config.yml` müssen ausgeliefert werden.

Keine Cloudflare-Sonderkonfiguration für Sveltia nötig (kein Worker, kein `base_url` in der Config — solange PAT genutzt wird).

### Schritt 2 — GitHub-Rechte

Dein GitHub-Konto braucht **Schreibzugriff** auf [`platomat/hautoo`](https://github.com/platomat/hautoo/) (Rolle Write, Maintain oder Admin). Nur Lesen → Login/Speichern scheitert.

### Schritt 3 — Personal Access Token (PAT) erzeugen

1. Admin öffnen: `https://hautoo.storyofai.net/admin/`
2. **Sign In with Token** / „Mit Token anmelden“ wählen.
3. Dem Link im Dialog folgen (GitHub öffnet die Token-Seite mit passenden Voreinstellungen), **oder** manuell:

   - GitHub → **Settings** → **Developer settings** → **Personal access tokens**
   - Empfohlen: **Fine-grained token**
   - Repository access: nur **`platomat/hautoo`**
   - Permissions:

     | Permission | Zugriff | Wofür |
     | --- | --- | --- |
     | **Contents** | Read and write | Inhalte lesen und committen |
     | **Pull requests** | Read and write | nur nötig, falls später Editorial Workflow |

   - Classic-Token-Alternative: Scope **`repo`** (umfasst das Nötige; breiter als fine-grained)

4. Token erzeugen, **einmalig kopieren** (wird nicht erneut angezeigt).
5. Token in den Sveltia-Dialog einfügen → anmelden.

Das Token liegt nur im **Local Storage des Browsers** — nicht im Repo, nicht in Cloudflare-Umgebungsvariablen.

> **Secret:** PAT niemals committen, nicht in Issues/Chats posten, nicht in `config.yml` eintragen. Siehe [Sicherheit](../sicherheit/README.md).

### Schritt 4 — Ersten Inhalt speichern und Deploy prüfen

1. Im CMS z. B. Collection **Seiten** öffnen, kleinen Text ändern, speichern.
2. Auf GitHub erscheint ein Commit auf **`main`** (Autor: dein GitHub-Konto).
3. Cloudflare Pages startet einen Build (Push auf `main`).
4. Nach erfolgreichem Deploy die Live-Seite prüfen.

Lokal zum Vergleich: `npm run dev` → `http://localhost:4321/admin/` — gleicher PAT-Login, schreibt ebenfalls gegen GitHub `main` (nicht gegen uncommittete lokale Dateien, solange der GitHub-Backend-Modus aktiv ist).

### Schritt 5 — Alltag & Token-Pflege

| Thema | Hinweis |
| --- | --- |
| Token abgelaufen | Neu erzeugen, im Admin erneut „Sign In with Token“ |
| Anderer Rechner / Browser | Erneut mit PAT anmelden |
| Mehrere Redakteure | Jede Person braucht Schreibrecht am Repo + eigenen PAT — oder später OAuth |
| `/admin/` öffentlich | Die UI-URL ist öffentlich; **ohne gültigen Token** keine Schreibzugriffe. Trotzdem: nur Vertrauenspersonen bekommen Tokens/Rechte |
| Site-Deploy | Speichern im CMS = Commit auf `main` = neuer Cloudflare-Build |

### Später: OAuth statt PAT (Ausblick)

Für „Login with GitHub“ ohne Token-Paste:

1. GitHub OAuth App anlegen  
2. [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-authenticator) als **Cloudflare Worker** deployen  
3. In `public/admin/config.yml` unter `backend` z. B. `base_url: https://<dein-authenticator>.workers.dev` setzen  

Das ist **nicht** Teil des aktuellen Go-Live (PAT zuerst). Worker hier nur für Auth-Proxy — die Website selbst bleibt statisches Pages-Hosting.

### Checkliste CMS live

- [ ] Cloudflare Pages Deploy läuft, Site unter `hautoo.storyofai.net` erreichbar
- [ ] `https://hautoo.storyofai.net/admin/` zeigt Sveltia-Login
- [ ] GitHub-Konto hat Schreibrecht auf `platomat/hautoo`
- [ ] PAT mit Contents Read/Write (fine-grained) erzeugt
- [ ] Login im Admin erfolgreich
- [ ] Test-Änderung speichert → Commit auf `main` → Cloudflare-Build → Inhalt live

Offizielle Referenzen: [Sveltia Getting Started](https://sveltiacms.app/en/docs/start), [GitHub Backend](https://sveltiacms.app/en/docs/backends/github).

---

## Collection `pages` (umgesetzt)

| | |
| --- | --- |
| Ordner | `src/content/pages/<slug>/index.md` |
| Schema | `src/content.config.ts` |
| Sveltia | Collection `pages` in `public/admin/config.yml` |
| Routen | `/` ← Eintrag `index`; weitere `/<slug>/` oder `/<parent>/…/<slug>/` |
| Hierarchie | Feld `parent` (Relation) → verschachtelte URL |
| Menü | Felder `showInMenu`, `menuOrder`, `menuLabel` → `SiteHeader` |
| Footer-Rechtliches | `showInFooterLegal`, `footerLegalOrder` → rechts neben Copyright |
| SEO | Shared-Objekt `seo` (`&field_seo` / `src/cms/fields/seo.ts`) |

### Felder

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `title` | ja | Seitentitel |
| `description` | nein | Meta-Beschreibung |
| `parent` | nein | ID/Slug der übergeordneten Seite → URL `/parent/child/` |
| `menuLabel` | nein | Text im Menü/Footer-Link (sonst `title`) |
| `menuOrder` | nein | Sortierung Hauptmenü (klein = vorne) |
| `showInMenu` | nein | Standard `true` |
| `showInFooterLegal` | nein | Standard `false` — Impressum/Datenschutz o. ä. |
| `footerLegalOrder` | nein | Sortierung in der Footer-Rechtszeile |
| `seo` | ja (CMS) | SEO-Objekt (Titel, Description, Robots) — Partial `&field_seo` |
| Body | ja | Markdown-Inhalt |

Seiten bleiben flach unter `src/content/pages/<slug>/index.md`. Die URL-Hierarchie kommt aus `parent` (Kette möglich). Beispiel: `beispiel-unterseite` mit `parent: ueber-uns` → `/ueber-uns/beispiel-unterseite/`.

Shared Field-Partials (DRY): [CMS Fields](../cms-fields/README.md).

## Collections (Sammlungen)

| Collection | Schlüssel | Status |
| --- | --- | --- |
| Seiten | `pages` | umgesetzt (#3) |
| Artikel | `articles` | geplant (#4) |
| Tags | `tags` | geplant (#5) |
| Glossar | `glossar` | geplant (#6) |

## Erwartete Felder (weitere Collections)

### articles

- Titel, Slug, Zusammenfassung
- Fließtext (Markdown)
- Bilder
- Tags (Relation zu `tags`)
- Video: Anbieter (YouTube/Vimeo) + Embed-ID oder URL
- Publikationsdatum, optional Entwurf/Veröffentlicht

### glossar

- Begriff
- Kurzdefinition
- Optional längere Erklärung / Links zu Artikeln

### tags

- Name, Slug, optionale Beschreibung

## Sicherheit

- **PAT** und spätere OAuth-Secrets: nie ins Repo, nie in die öffentliche `config.yml`
- Token nur im Browser (Local Storage) bzw. später im Worker-Dashboard
- Details: [Sicherheit](../sicherheit/README.md)

## Noch auszuarbeiten

- OAuth mit Sveltia CMS Authenticator (Cloudflare Worker) Schritt für Schritt
- Collections #4–#6
- Dev-Vorschau für Bilder unter `src/content/` (falls nötig)
