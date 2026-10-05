# Collections (Sveltia)

Zurück zur [Sveltia-Übersicht](./README.md). Shared Field-Partials: [CMS Fields](../cms-fields/README.md).

## Überblick

| Collection | Schlüssel | Status |
| --- | --- | --- |
| Konfiguration | `config` | umgesetzt (#45), YAML ohne Markdown |
| Seiten | `pages` | umgesetzt (#3) |
| Artikel | `articles` | umgesetzt (#4) |
| Tags | `tags` | umgesetzt (#5) |
| Glossar | `glossar` | umgesetzt (#6) |
| Bausteine | `blocks` | umgesetzt |
| Menüs | `menus` | umgesetzt (#13) |

## Collection `config` (umgesetzt)

Globale Site-Einstellungen als **YAML-Datei**, kein Markdown-Body. Erweiterbar um weitere Dateien unter `files:`.

| | |
| --- | --- |
| Datei | `src/content/config/site.yaml` |
| Schema | `src/cms/fields/site-config.ts` → Collection `config` in `src/content.config.ts` |
| Sveltia | File-Collection `config` → Eintrag „Site“ |
| Lesen | `src/lib/site-config.ts` (`getSiteConfig` / `getSiteHeaderConfig`) |

### Site → Header (#44)

| Feld | Bedeutung |
| --- | --- |
| `header.stickyDesktop` | Sticky ab Desktop (≥ 1024px) |
| `header.stickyTablet` | Sticky auf Tablet (680–1023px) |
| `header.stickyMobile` | Sticky auf Mobile (< 680px) |
| `header.heightDesktop` / `Tablet` / `Mobile` | Min. Leistenhöhe in px (40–160) |

Umsetzung in `SiteHeader.astro` (CSS-Klassen + Custom Properties).

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
| `modifiedDate` | Letzte Änderung (gespeichert; Menüs haben keine eigene SEO-Seite) |
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
| System | Eintrag-ID `artikel` → Tag-Sidebar + `{{article-listing …}}`; `tags` → CMS-Seite + `{{tag-listing …}}`; `glossar` → CMS-Seite + `{{glossar-listing …}}`; `impressum` → Bildnachweise |

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
| `modifiedDate` | nein | Letzte Änderung → SEO-Meta im `<head>` |
| `backgroundAttribution` | nein | Bildnachweis (Text, reine URL oder HTML von Stock-Plattformen) → Impressum |
| `seo` | ja (CMS) | SEO-Objekt (Titel, Description, Robots) — Partial `&field_seo` |
| `showToc` | nein | Inhaltsverzeichnis nach Hero (Default aus) |
| `tocLevels` | nein | `h2` / `h3` / `h4` (Default nur `h2`) |
| `tocTitle` | nein | Überschrift über dem TOC (Default „Inhalt“) |
| `headCode` | nein | Roh-HTML vor `</head>` (`<style>` / `<script>`) |
| `footerCode` | nein | Roh-HTML vor `</body>` |
| Body | ja | Markdown-Inhalt |

Seiten bleiben flach unter `src/content/pages/<slug>/index.md`. Die URL-Hierarchie kommt aus `parent` (Kette möglich). Beispiel: Seite `team` mit `parent: ueber-uns` → `/ueber-uns/team/`.

## Collection `blocks` (Bausteine)

Wiederverwendbare Inhaltsstücke (ähnlich WordPress-Reusable-Blocks). Keine eigene Website-URL.

| | |
| --- | --- |
| Ordner | `src/content/blocks/<slug>.md` |
| Schema | `src/content.config.ts` |
| Sveltia | Collection `blocks` (Label „Bausteine“) |
| Einbinden | `{{block id="<slug>"}}` in Seiten-/Artikel-/Baustein-Body |
| Resolve | `src/lib/blocks.ts` + Expand in `src/lib/content-embeds.ts` |

### Felder

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `title` | ja | Name im CMS |
| `status` | ja | `draft` / `published` / `future` / `trash` |
| `publishDate` | nein | Termin für Status `future` |
| `modifiedDate` | nein | Letzte Änderung |
| Body | ja | Markdown inkl. anderer Embeds; verschachtelte Bausteine mit Zyklusschutz |

Beispiel: Baustein `stack-uebersicht` → auf der Startseite `{{block id="stack-uebersicht"}}`. Änderung am Baustein gilt überall.

## Collection `tags` (umgesetzt)

| | |
| --- | --- |
| Ordner | `src/content/tags/<slug>.md` |
| Schema | `src/content.config.ts` |
| Sveltia | Collection `tags` |
| Nutzung | Relation von `articles`; Übersicht = CMS-Seite `pages/tags` mit `{{tag-listing …}}`; Einzelansicht `/tags/<slug>/` |

### Felder

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `title` | ja | Anzeigename |
| `description` | nein | Kurze Erklärung |
| `modifiedDate` | nein | Letzte Änderung → SEO-Meta im `<head>` |
| Dateiname | — | Slug (z. B. `astro.md` → `astro`) |

## Collection `articles` (umgesetzt)

| | |
| --- | --- |
| Ordner | `src/content/articles/<slug>/index.md` |
| Schema | `src/content.config.ts` (`image()` für Titelbild) |
| Sveltia | Collection `articles` |
| Routen | Einzelartikel `/artikel/<slug>/`; Übersicht = CMS-Seite `pages/artikel` (Sidebar fest; Listing per Embed) |
| Medien | Variante B (`media_folder: ""`) — [Medien](./medien-variante-b.md) |

### Felder

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `title` | ja | Titel |
| `summary` | nein | Kurztext / Meta |
| `pubDate` | ja | Publikationsdatum |
| `status` | ja | `draft` / `published` / `future` / `trash` |
| `modifiedDate` | nein | Letzte Änderung → SEO-Meta im `<head>` |
| `heroImage` | nein | Titelbild neben dem Eintrag |
| `backgroundImage` | nein | Vollflächiger Viewport-Hintergrund |
| `backgroundOverlay` | nein | Abdunkelung 0–100 % |
| `backgroundAttribution` | nein | Bildnachweis (Text, reine URL oder HTML von Stock-Plattformen) → Impressum |
| `tags` | nein | Relation zu `tags` (mehrere) |
| `videoProvider` | nein | `youtube` / `vimeo` (Hero-Video; Facade mit Consent) |
| `videoId` | nein | ID oder URL; alternativ Body-Embed `{{video …}}` |
| `showToc` | nein | Inhaltsverzeichnis nach Hero (Default aus) |
| `tocLevels` | nein | `h2` / `h3` / `h4` (Default nur `h2`) |
| `tocTitle` | nein | Überschrift über dem TOC (Default „Inhalt“) |
| `seo` | ja (CMS) | SEO-Partial |
| Body | ja | Markdown |

## Collection `glossar` (umgesetzt)

| | |
| --- | --- |
| Ordner | `src/content/glossar/<slug>.md` |
| Schema | `src/content.config.ts` |
| Sveltia | Collection `glossar` (Issue-Titel „glossary“, Schlüssel im Projekt: `glossar`) |
| Routen | Übersicht = CMS-Seite `pages/glossar` mit Embed; Eintrag `/glossar/<slug>/` |

### Felder

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `title` | ja | Begriff |
| `status` | ja | `draft` / `published` / `future` / `trash` |
| `publishDate` | nein | Termin für Status `future` |
| `modifiedDate` | nein | Letzte Änderung → SEO-Meta im `<head>` |
| `definition` | ja | Kurzdefinition |
| `relatedArticles` | nein | Relation zu `articles` |
| `relatedTags` | nein | Relation zu `tags`; zusätzlich automatisch Tag mit gleichem Slug, falls vorhanden |
| Body | nein | Längere Erklärung (Markdown) |

Auf der Glossar-Detailseite erscheinen **Verwandte Tags** (mit Artikelanzahl). Auf Tag-Seiten verlinkt ein Glossar-Hinweis den passenden Begriff, wenn der Slug gleich ist oder genau ein Glossar den Tag über `relatedTags` zugeordnet hat.
