# Collections (Sveltia)

Zurück zur [Sveltia-Übersicht](./README.md). Shared Field-Partials: [CMS Fields](../cms-fields/README.md).

## Überblick

| Collection | Schlüssel | Status |
| --- | --- | --- |
| Seiten | `pages` | umgesetzt (#3) |
| Menüs | `menus` | umgesetzt (#13) |
| Tags | `tags` | umgesetzt (#5) |
| Artikel | `articles` | geplant (#4) |
| Glossar | `glossar` | geplant (#6) |

## Collection `menus` (umgesetzt)

Navigation und Footer-Links werden **nicht** mehr über Flags an Seiten gesteuert, sondern über eigene Menü-Dateien.

| | |
| --- | --- |
| Ordner | `src/content/menus/<slug>.md` |
| Schema | `src/cms/fields/menu.ts` → `src/content.config.ts` |
| Sveltia | Collection `menus` in `public/admin/config.yml` |
| Resolve | `src/lib/menus.ts` → `SiteHeader` / `SiteFooter` |

### Bekannte Slugs (Slots)

| Dateiname / id | Verwendung |
| --- | --- |
| `main` | Hauptnavigation im Header |
| `footer-legal` | Rechts neben dem Copyright im Footer |

Weitere Menüs (z. B. zusätzliche Footer-Zeilen) = neue Datei mit eigenem Slug; Template dann anbinden.

### Felder

| Feld | Bedeutung |
| --- | --- |
| `title` | Name im CMS |
| `items[]` | Einträge (Reihenfolge = Anzeige) |
| `items[].label` | Linktext |
| `items[].linkType` | `page` oder `url` |
| `items[].page` | Relation zur Collection `pages` (Slug) |
| `items[].url` | Externe/interne URL bei `linkType: url` |
| `items[].cssClass` | Optionale CSS-Klasse(n) am `<a>` (Leerzeichen-getrennt, wie WordPress) |
| `items[].children[]` | Optionales Untermenü (eine Ebene, gleiche Link-Felder ohne weitere Kinder) |

## Collection `pages` (umgesetzt)

| | |
| --- | --- |
| Ordner | `src/content/pages/<slug>/index.md` |
| Schema | `src/content.config.ts` |
| Sveltia | Collection `pages` in `public/admin/config.yml` |
| Routen | `/` ← Eintrag `index`; weitere `/<slug>/` oder `/<parent>/…/<slug>/` |
| Hierarchie | Feld `parent` (Relation) → verschachtelte URL |
| SEO | Shared-Objekt `seo` (`&field_seo` / `src/cms/fields/seo.ts`) |
| Medien | Variante B vorbereitet (`path` + leere `media_*`) — siehe [Medien](./medien-variante-b.md) |

### Felder

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `title` | ja | Seitentitel |
| `description` | nein | Meta-Beschreibung |
| `parent` | nein | ID/Slug der übergeordneten Seite → URL `/parent/child/` |
| `seo` | ja (CMS) | SEO-Objekt (Titel, Description, Robots) — Partial `&field_seo` |
| Body | ja | Markdown-Inhalt |

Seiten bleiben flach unter `src/content/pages/<slug>/index.md`. Die URL-Hierarchie kommt aus `parent` (Kette möglich). Beispiel: `beispiel-unterseite` mit `parent: ueber-uns` → `/ueber-uns/beispiel-unterseite/`.

## Collection `tags` (umgesetzt)

| | |
| --- | --- |
| Ordner | `src/content/tags/<slug>.md` |
| Schema | `src/content.config.ts` |
| Sveltia | Collection `tags` |
| Nutzung | Relation von `articles` |

### Felder

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `title` | ja | Anzeigename |
| `description` | nein | Kurze Erklärung |
| Dateiname | — | Slug (z. B. `astro.md` → `astro`) |

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
