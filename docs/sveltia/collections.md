# Collections (Sveltia)

Zurück zur [Sveltia-Übersicht](./README.md). Shared Field-Partials: [CMS Fields](../cms-fields/README.md).

## Überblick

| Collection | Schlüssel | Status |
| --- | --- | --- |
| Einstellungen | `settings` | umgesetzt (#45), JSON-Dateien (General / Design / Content) |
| Seiten | `pages` | umgesetzt (#3) |
| Artikel | `articles` | umgesetzt (#4) |
| Kategorien | `categories` | umgesetzt (#64) |
| Tags | `tags` | umgesetzt (#5) |
| Autoren | `authors` | umgesetzt (#77) |
| Glossar | `glossar` | umgesetzt (#6) |
| Bausteine | `blocks` | umgesetzt |
| Menüs | `menus` | umgesetzt (#13) |
| Weiterleitungen | `redirects` | umgesetzt (#76) |

## Slug bearbeiten

Bei Ordner-Collections (`pages`, `articles`, `categories`, `tags`, `authors`, `glossar`, `blocks`, `menus`, `redirects`) legt `slug` in `public/admin/config.yml` den Datei-/Ordnernamen fest (Template `{{slug}}` = slugifizierter Titel bzw. Identifier).

| | |
| --- | --- |
| Neu | Slug folgt dem Titel, bis er im **Slug**-Panel der Editor-Sidebar (Stift) überschrieben wird. |
| Gespeichert | Titel ändern lässt den Slug unverändert. Umbenennen nur über das Slug-Panel; beim Speichern verschiebt Sveltia die Datei und passt Verweise an. |
| Config | `slug: { template: "{{slug}}", editable: true, hint: "…" }` |

Hinweis: Geänderte öffentliche URLs brauchen ggf. Redirects (siehe [Redaktion](../redaktion/README.md)).

## Collection `settings` (umgesetzt)

Globale Site-Einstellungen als **JSON-Dateien** (wie cdr-legal), kein Markdown-Body. Pro Bereich ein eigener CMS-Eintrag.

| | |
| --- | --- |
| Dateien | `src/content/settings/general.json`, `design.json`, `content.json` |
| Schema | `src/cms/fields/site-config.ts` |
| Sveltia | File-Collection `settings` → Einträge **General**, **Design**, **Content** |
| Lesen | Direkter JSON-Import in `src/lib/site-config.ts` (keine Astro-Content-Collection) |

### Einstellungen → General

| Feld | Bedeutung |
| --- | --- |
| `websiteTitle` | Markenname: Header-Wortmarke, Footer-Zeile, Browser-Titel-Suffix (`Seite · …`), `og:site_name` |
| `websiteDescription` | Optional kurze Beschreibung / Slogan (#75); Speichern für spätere Anzeige |
| `footerCopyright.claim` | Optionaler Footer-Zusatz nach dem Website-Titel (Text/URL/HTML mit `<a href>`, wie Bildnachweis) |
| `footerCopyright.separator` | Trenner Titel↔Claim: `•` / `-` / `—` / `/` (Default `•`) |
| `githubRepo` | Optional `owner/name` für Footer-Mitte (GitHub-Icon). Leer = Site-Logo → Startseite (Forks) |
| `logos.header` | Optional Header-Logo aus Mediathek; leer = `/assets/logo-mark.svg`. SVG wird inline eingebettet (#79) |
| `logos.headerSticky` | Optional Logo im sticky Header; leer = Header-Logo |
| `logos.footer` | Optional Footer-Logo (ohne GitHub-Repo); leer = Header-Logo |
| `favicons.default` | Optional Favicon aus Mediathek; leer = `/assets/favicon.svg` (#80) |
| `favicons.dark` | Optional Favicon für `prefers-color-scheme: dark`; leer = gleiches wie default |
| `contactEmail` | Optional für `{{contact-email}}`. Überschreibt `CONTACT_EMAIL` beim Build; leer = ENV. Wert ist öffentlich in Git. |

### Einstellungen → Design → Farbpalette (#70)

| Feld | CSS-Variable | Bedeutung |
| --- | --- | --- |
| `design.colors.bg` | `--color-bg` | Seitenhintergrund |
| `design.colors.surface` | `--color-surface` | Solide Flächen |
| `design.colors.surfaceGlass` | `--color-surface-glass` | Glas-Fläche (Alpha) |
| `design.colors.surfaceRaised` | `--color-surface-raised` | Angehobene Flächen |
| `design.colors.border` | `--color-border` | Rahmen / Trenner |
| `design.colors.text` | `--color-text` | Haupttext |
| `design.colors.textMuted` | `--color-text-muted` | Nebentext |
| `design.colors.action` | `--color-action` | Primär / Links / Fokus |
| `design.colors.actionHover` | `--color-action-hover` | Hover der Aktion |
| `design.colors.actionMuted` | `--color-action-muted` | Gedämpfter Aktions-Hintergrund |
| `design.colors.danger` | `--color-danger` | Fehler / destruktiv |

Umsetzung: `src/lib/site-colors.ts`, Inline-`:root` in `BaseLayout.astro`. Defaults wie bisher in `global.css`.

### Einstellungen → Design → Schrift (#71)

| Feld | Bedeutung | Default |
| --- | --- | --- |
| `design.typography.bodyFont` | Basis-Schriftart (Fontsource-ID) | `ubuntu` |
| `design.typography.baseSize` | Basisgröße: `html` font-size in px (12–24) | `16` |
| `design.typography.bodyWeight` | Fließtext-Stärke (300–700) | `300` |
| `design.typography.headingFont` | Überschriften-Schriftart (Fontsource-ID) | `ubuntu` |
| `design.typography.headings.h1`–`h6` | Je `size` (rem), `weight`, `transform` (`none` / `capitalize` / `uppercase` / `lowercase`) | Browser-ähnliche Größen, Weight 500, Transform none |

Katalog: `src/cms/fields/site-fonts.json`. Sync: `scripts/sync-site-fonts.mjs` → `public/fonts/` + `src/styles/fonts.generated.css`. CSS-Variablen: `src/lib/site-typography.ts`.

### Einstellungen → Design → Header (#44)

| Feld | Bedeutung |
| --- | --- |
| `design.header.minHeightDesktop` / `Tablet` / `Mobile` | Ruhehöhe am Seitenanfang; ohne Sticky Mindesthöhe (40–600 px; Default 64 / 64 / 56) |
| `design.header.stickyDesktop` | Sticky ab Desktop (≥ 1024px) |
| `design.header.stickyTablet` | Sticky auf Tablet (680–1023px) |
| `design.header.stickyMobile` | Sticky auf Mobile (< 680px) |
| `design.header.heightDesktop` / `Tablet` / `Mobile` | Kompakte Höhe, sobald Sticky durch Scrollen greift (40–600 px) |

Umsetzung in `SiteHeader.astro` (CSS-Klassen + Custom Properties).

### Einstellungen → Design → Hero (#63)

Pro Collection eigene Defaults (Reihenfolge wie in der CMS-Leiste: Seiten, Artikel, Kategorien, Tags, Glossar). Felder jeweils:

| Feld | Bedeutung | Default |
| --- | --- | --- |
| `hero.<collection>.textAlign` | `left` / `center` / `right` für Brotkrumen, Titel, Beschreibung | `left` |
| `hero.<collection>.showBreadcrumbs` | Brotkrumen über dem Titel | `true` |
| `hero.<collection>.breadcrumbSeparator` | Trenner zwischen Elementen: `/` · `•` · `→` · `-` | `/` |
| `hero.<collection>.borderBottom` | 1px Linie unter dem Hero | `false` |

Lokale Überschreibung an **Seiten** und **Artikeln**: Objekt `hero` mit `textAlign`, `showBreadcrumbs`, `borderBottom` (Feld leer/omit = Default der jeweiligen Collection). Umsetzung: `PageHero.astro` (`hero`-Prop), Pfade in `src/lib/breadcrumbs.ts`.

### Einstellungen → Content → TOC (#51)

| Feld | Bedeutung |
| --- | --- |
| `content.toc.pages.enabled` | TOC standardmäßig auf Seiten |
| `content.toc.pages.levels` / `title` | Default-Ebenen und Titel |
| `content.toc.articles.*` | dasselbe für Artikel |

Eintrag ohne `toc.show` nutzt den globalen Default. Lokales `toc.show: true` / `false` überschreibt. Fehlende `toc.levels` / `toc.title` fallen auf die globalen Werte zurück (`resolveTocForCollection` in `site-config.ts`).

### Einstellungen → Content → Breite (#59)

| Feld | Bedeutung |
| --- | --- |
| `content.width.pages` | Default-Inhaltsbreite für Seiten (`default` / `wide` / `full`) |
| `content.width.articles` | dasselbe für Artikel |

Pro Eintrag optional `layout.contentWidth` (gleiche Werte). Leer = globaler Default; ohne Feld und mit Listing-Embed → automatisch `wide` (`resolveContentWidth`). CSS: Lesespalte 42rem, breit 64rem, vollbreit 80rem.

### Einstellungen → Content → Abstand (#73)

| Feld | Bedeutung |
| --- | --- |
| `content.spacing.<collection>.afterHero` | Abstand unter dem Hero (rem), Default 2.5 |
| `content.spacing.<collection>.beforeFooter` | Unterer Seitenabstand vor Footer (rem), Default 4 |

Collections: `pages`, `articles`, `categories`, `tags`, `glossar`. Pro Seite/Artikel optional `layout.afterHero` / `layout.beforeFooter` (Gruppe Inhaltsbreite). Resolve: `resolveContentSpacing` → CSS-Variablen am `.page`.

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
| System | Eintrag-ID `artikel` → Seitenleiste (Kategorie-Tree + Tags) + `{{article-listing …}}`; `kategorien` → CMS-Seite + `{{category-listing …}}`; `tags` → CMS-Seite + `{{tag-listing …}}`; `glossar` → CMS-Seite + `{{glossar-listing …}}`; `impressum` → Bildnachweise |

### Felder

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `title` | ja | Seitentitel |
| `description` | nein | Meta-Beschreibung |
| `parent` | nein | ID/Slug der übergeordneten Seite → URL `/parent/child/` |
| `background.image` | nein | Vollflächiger Viewport-Hintergrund (Variante B) |
| `background.overlay` | nein | Abdunkelung 0–100 % (schwarzes Overlay) |
| `status` | ja | `draft` / `published` / `future` / `trash` |
| `publishDate` | nein | Termin für Status `future` |
| `modifiedDate` | nein | Letzte Änderung → SEO-Meta im `<head>` |
| `background.attribution` | nein | Bildnachweis (Text, reine URL oder HTML von Stock-Plattformen) → Impressum |
| `seo` | ja (CMS) | SEO-Objekt (Titel, Description, Robots) — Partial `&field_seo` |
| `toc.show` | nein | TOC an/aus; leer = globaler Default (`content.toc.pages`) |
| `toc.levels` | nein | `h2` / `h3` / `h4`; leer = global |
| `toc.title` | nein | TOC-Überschrift; leer = global |
| `layout.contentWidth` | nein | `default` / `wide` / `full`; leer = global (`content.width.pages`) |
| `layout.afterHero` | nein | Abstand unter Hero (rem); leer = `content.spacing.pages` |
| `layout.beforeFooter` | nein | Abstand vor Footer (rem); leer = `content.spacing.pages` |
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

## Collection `redirects` (Weiterleitungen, #76)

Manuelle URL-Umleitungen, wenn Inhalte gelöscht oder verschoben wurden. Keine eigene Website-URL.

| | |
| --- | --- |
| Ordner | `src/content/redirects/<slug>.md` |
| Schema | `src/content.config.ts` |
| Sveltia | Collection `redirects` (Label „Weiterleitungen“) |
| Build | `scripts/build-redirects.mjs` → `public/_redirects` (Cloudflare Pages); zusätzlich Astro `redirects` in `astro.config.mjs` |

### Felder

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `title` | ja | Name nur im CMS |
| `sources` | ja | Eine oder mehrere Quell-Pfade (Liste); alle zeigen auf `target` |
| `target` | ja | Ein Ziel-Pfad oder absolute `https`-URL |
| `code` | nein | `301` (Default) oder `302` |
| `modifiedDate` | nein | Letzte Änderung |

Beispiel: Quellen `/alter-slug/` und `/noch-alter/` → Ziel `/neuer-slug/` mit 301.


## Collection `categories` (umgesetzt)

| | |
| --- | --- |
| Ordner | `src/content/categories/<slug>.md` |
| Schema | `src/content.config.ts` |
| Sveltia | Collection `categories` (zwischen Artikel und Tags) |
| Nutzung | Relation von `articles`; Übersicht = CMS-Seite `pages/kategorien` mit `{{category-listing …}}`; Einzelansicht `/kategorien/<slug>/` |

### Felder

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `title` | ja | Anzeigename |
| `description` | nein | Kurze Erklärung (auch Meta-Description) |
| `parent` | nein | Slug einer übergeordneten Kategorie (Hierarchie) |
| `modifiedDate` | nein | Letzte Änderung → SEO-Meta im `<head>` |
| Dateiname | — | Slug (z. B. `cursor.md` → `cursor`) |

Öffentliche URLs bleiben flach (`/kategorien/<slug>/`). Parent steuert Brotkrumen und Unterkategorien-Liste.

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

## Collection `authors` (umgesetzt, #77)

| | |
| --- | --- |
| Ordner | `src/content/authors/<slug>.md` |
| Schema | `src/content.config.ts` |
| Sveltia | Collection `Autoren` |
| Nutzung | Relation von `articles` (0..n); Übersicht `/autoren/` mit `{{author-listing}}`; Profil `/autoren/<slug>/` |
| Build | `scripts/sync-author-avatars.mjs` lädt `gravatarUrl` nach `src/assets/authors/gravatar/` |

### Felder

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `title` | ja | Name |
| `description` | nein | Kurzbeschreibung (Meta/Listing) |
| `avatar` | nein | Lokales Bild (`/assets/…`), Vorrang vor Gravatar |
| `gravatarUrl` | nein | E-Mail oder https-URL; Download beim Build |
| `body` | nein | Bio (Markdown) auf der Profilseite |
| `modifiedDate` | nein | Letzte Änderung |

### Anzeige

| Ort | Steuerung |
| --- | --- |
| Artikel-Karten | Embed `show` inkl. `authors` (opt-in) |
| Artikel-Einzelseite | Content → Autoren: `articlePlacement` (`none` / `hero` / `after` / `both`), `avatarShape` (`round` / `square`) |
| Profil | immer runder Avatar, Name, Bio, dann „Artikel (N)“ |

## Collection `articles` (umgesetzt)

| | |
| --- | --- |
| Ordner | `src/content/articles/<slug>/index.md` |
| Schema | `src/content.config.ts` (Titelbild als CMS-Pfad, Auflösung via `resolveCmsImage`) |
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
| `heroImage` | nein | Titelbild: eintragsrelativ (Variante B) oder `/assets/…` aus der Mediathek |
| `background.image` | nein | Vollflächiger Viewport-Hintergrund |
| `background.overlay` | nein | Abdunkelung 0–100 % |
| `background.attribution` | nein | Bildnachweis (Text, reine URL oder HTML von Stock-Plattformen) → Impressum |
| `categories` | nein | Relation zu `categories` (mehrere; Hierarchie über Parent); Anzeige immer im Hero unter der Beschreibung |
| `tags` | nein | Relation zu `tags` (mehrere) |
| `tagPlacement` | nein | Wo Tags erscheinen: `hero` (neben Kategorien), `after` (nach Inhalt, vor Navigation), `both` (Default: `hero`) |
| `videoProvider` | nein | `youtube` / `vimeo` / `file` (Facade mit Consent bzw. HTML5) |
| `videoId` | nein | ID oder URL; alternativ Body-Embed `{{video …}}` |
| `videoPlacement` | nein | Frontmatter-Video: `before` (nach Hero, Default) oder `after` (nach Inhalt, vor Tags/Autoren) |
| `toc.show` | nein | TOC an/aus; leer = globaler Default (`content.toc.articles`) |
| `toc.levels` | nein | `h2` / `h3` / `h4`; leer = global |
| `toc.title` | nein | TOC-Überschrift; leer = global |
| `layout.contentWidth` | nein | `default` / `wide` / `full`; leer = global (`content.width.articles`) |
| `layout.afterHero` | nein | Abstand unter Hero (rem); leer = `content.spacing.articles` |
| `layout.beforeFooter` | nein | Abstand vor Footer (rem); leer = `content.spacing.articles` |
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
