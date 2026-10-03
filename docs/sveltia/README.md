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

## Admin-Zugang

- UI: `/admin/` bzw. lokal `http://localhost:4321/admin/index.html`
- Config: `public/admin/config.yml`
- Auth vorerst: **GitHub PAT** (im Login-Dialog); später GitHub App + Cloudflare Worker
- Speichern: Branch **`main`**

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

CMS-Zugangsdaten und Backend-Tokens sind Secrets — nicht ins öffentliche Repo. Siehe [Sicherheit](../sicherheit/README.md).

## Noch auszuarbeiten

- PAT-Workflow Schritt für Schritt dokumentieren; später OAuth (GitHub App + Cloudflare Worker)
- Collections #4–#6
- Dev-Vorschau für Bilder unter `src/content/` (falls nötig)
