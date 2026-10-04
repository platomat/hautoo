# Collections (Sveltia)

Zurück zur [Sveltia-Übersicht](./README.md). Shared Field-Partials: [CMS Fields](../cms-fields/README.md).

## Überblick

| Collection | Schlüssel | Status |
| --- | --- | --- |
| Seiten | `pages` | umgesetzt (#3) |
| Menüs | `menus` | umgesetzt (#13) |
| Tags | `tags` | umgesetzt (#5) |
| Artikel | `articles` | umgesetzt (#4) |
| Glossar | `glossar` | umgesetzt (#6) |

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
| System | Eintrag-ID `artikel` → nach dem CMS-Text automatisch Artikelliste + Tag-Sidebar; `impressum` → Bildnachweise |

### Felder

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `title` | ja | Seitentitel |
| `description` | nein | Meta-Beschreibung |
| `parent` | nein | ID/Slug der übergeordneten Seite → URL `/parent/child/` |
| `backgroundImage` | nein | Vollflächiger Viewport-Hintergrund (Variante B) |
| `backgroundOverlay` | nein | Abdunkelung 0–100 % (schwarzes Overlay) |
| `status` | ja | `draft` / `published` / `future` / `trash` |
| `publishDate` | nein | Termin für Status `future` |
| `backgroundAttribution` | nein | Bildnachweis (Text, reine URL oder HTML von Stock-Plattformen) → Impressum |
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

## Collection `articles` (umgesetzt)

| | |
| --- | --- |
| Ordner | `src/content/articles/<slug>/index.md` |
| Schema | `src/content.config.ts` (`image()` für Titelbild) |
| Sveltia | Collection `articles` |
| Routen | Einzelartikel `/artikel/<slug>/`; Übersicht = CMS-Seite `pages/artikel` (fest verdrahtet: Liste + Sidebar) |
| Medien | Variante B (`media_folder: ""`) — [Medien](./medien-variante-b.md) |

### Felder

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `title` | ja | Titel |
| `summary` | nein | Kurztext / Meta |
| `pubDate` | ja | Publikationsdatum |
| `status` | ja | `draft` / `published` / `future` / `trash` |
| `heroImage` | nein | Titelbild neben dem Eintrag |
| `backgroundImage` | nein | Vollflächiger Viewport-Hintergrund |
| `backgroundOverlay` | nein | Abdunkelung 0–100 % |
| `backgroundAttribution` | nein | Bildnachweis (Text, reine URL oder HTML von Stock-Plattformen) → Impressum |
| `tags` | nein | Relation zu `tags` (mehrere) |
| `videoProvider` | nein | `youtube` / `vimeo` |
| `videoId` | nein | ID oder URL |
| `seo` | ja (CMS) | SEO-Partial |
| Body | ja | Markdown |

## Collection `glossar` (umgesetzt)

| | |
| --- | --- |
| Ordner | `src/content/glossar/<slug>.md` |
| Schema | `src/content.config.ts` |
| Sveltia | Collection `glossar` (Issue-Titel „glossary“, Schlüssel im Projekt: `glossar`) |
| Routen | `/glossar/`, `/glossar/<slug>/` |

### Felder

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `title` | ja | Begriff |
| `status` | ja | `draft` / `published` / `future` / `trash` |
| `publishDate` | nein | Termin für Status `future` |
| `definition` | ja | Kurzdefinition |
| `relatedArticles` | nein | Relation zu `articles` |
| Body | nein | Längere Erklärung (Markdown) |
