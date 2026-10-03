# Collections (Sveltia)

Zurück zur [Sveltia-Übersicht](./README.md). Shared Field-Partials: [CMS Fields](../cms-fields/README.md).

## Überblick

| Collection | Schlüssel | Status |
| --- | --- | --- |
| Seiten | `pages` | umgesetzt (#3) |
| Artikel | `articles` | geplant (#4) |
| Tags | `tags` | geplant (#5) |
| Glossar | `glossar` | geplant (#6) |

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
| Medien | Variante B vorbereitet (`path` + leere `media_*`) — siehe [Medien](./medien-variante-b.md) |

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

## Erwartete Felder (weitere Collections)

### articles

- Titel, Slug, Zusammenfassung
- Fließtext (Markdown)
- Bilder (Variante B — [Medien](./medien-variante-b.md))
- Tags (Relation zu `tags`)
- Video: Anbieter (YouTube/Vimeo) + Embed-ID oder URL
- Publikationsdatum, optional Entwurf/Veröffentlicht

### glossar

- Begriff
- Kurzdefinition
- Optional längere Erklärung / Links zu Artikeln

### tags

- Name, Slug, optionale Beschreibung
