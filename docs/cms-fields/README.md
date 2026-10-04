# CMS field partials (DRY)

Wiederverwendbare Feldgruppen für Sveltia und Astro.

## Status (`status`)

| Seite | Ort |
| --- | --- |
| Sveltia | Anchor `&field_status` (+ `&field_publish_date` für pages/glossar) |
| Astro | `src/cms/fields/status.ts` — `isEntryPublic()` |
| Collections | `pages`, `articles`, `glossar` (nicht `tags` / `menus`) |

Werte: `draft` · `published` · `future` · `trash`.

- Öffentlich: `published`, sowie `future` sobald das Datum erreicht ist (`pubDate` bei Artikeln, `publishDate` bei Seiten/Glossar).
- CMS-Default für neue Einträge: `draft`. Fehlendes Feld im Repo → beim Build wie `published` (Migration).

## Änderungsdatum (`modifiedDate`)

| Seite | Ort |
| --- | --- |
| Sveltia | Anchor `&field_modified_date` / Alias `*field_modified_date` |
| Astro (Zod) | `src/cms/fields/dates.ts` → in allen Collections |
| Collections | `pages`, `menus`, `tags`, `articles`, `glossar` |
| Ausgabe | SEO-Meta im `<head>`: `description`, `og:title` / `og:description` / `og:url`, Twitter-Card, Canonical, Sitemap-Link; bei `modifiedDate` auch `article:modified_time` / `og:updated_time` |

Optional. Bei inhaltlichen Änderungen im CMS setzen.

## SEO (`seo`)

| Seite | Ort |
| --- | --- |
| Sveltia | YAML-Anchor `&field_seo` / Alias `*field_seo` in `public/admin/config.yml` |
| Astro (Zod) | `src/cms/fields/seo.ts` → in `src/content.config.ts` einbinden |

In weiteren Collections (z. B. `articles`) nur injizieren:

```yaml
fields:
  - { name: title, label: Titel, widget: string }
  - { name: body, label: Inhalt, widget: markdown }
  - *field_seo
```

Und im Astro-Schema:

```ts
import { seoSchema } from "./cms/fields/seo";

schema: z.object({
  title: z.string(),
  seo: seoSchema.optional(),
  // …
}),
```

## Seitenhintergrund (`backgroundImage` / `backgroundOverlay` / `backgroundAttribution`)

| Seite | Ort |
| --- | --- |
| Sveltia | Anchors `&field_background_image` / `&field_background_overlay` / `&field_background_attribution` in `public/admin/config.yml` |
| Astro | Pfad als String (`backgroundImageSchema`); Auflösung `src/lib/cms-image.ts` |
| UI | `PageBackground.astro` — fixed, full viewport; `srcset` 640–1920 px WebP; schwarzes Overlay 0–100 % |
| Nachweis | `backgroundAttribution` (Text oder reine URL) → Liste auf `/impressum/` via `BackgroundAttributions.astro` |

Pfade:

- Shared Library: `/assets/datei.webp` → Datei unter `src/assets/` (globaler CMS-`media_folder`)
- Eintragsrelativ: `datei.webp` neben `index.md` (Variante B)

Nicht Astro-`image()` im Schema — das scheitert an `/assets/…`. Genutzt bei `pages` und `articles`.

**Markdown-Bilder im Body** mit `/assets/…` werden beim Render über `hast-cms-assets` auf die gebauten Asset-URLs umgeschrieben (gleiche Auflösung wie Background). Ohne Embeds/`CmsContent` greift das nicht; Seiten mit Bildern im Text brauchen also Embeds oder diesen Pfad.

**Bildnachweis:** Ein Feld reicht — Freitext, alleinstehende `http(s)`-URL (dann verlinkt) oder HTML 1:1 von Stock-Plattformen (z. B. Unsplash „Copy attribution“ mit `<a href>`). HTML wird auf erlaubte Links sanitisiert (`sanitizeAttributionHtml`). Sammlung: `src/lib/background-attributions.ts` (alle Pages + veröffentlichte Articles). Am Asset selbst speichert Sveltia keine Beschreibung; der Nachweis hängt am Eintrag.

**Hinweis:** YAML-Anchors gelten nur **innerhalb derselben** `config.yml` (Sveltia-Limit). Zod und YAML bei Feldänderungen gemeinsam pflegen.

## Inhaltsverzeichnis (`showToc` / `tocLevels` / `tocTitle`)

| Seite | Ort |
| --- | --- |
| Sveltia | Anchors `&field_show_toc`, `&field_toc_levels`, `&field_toc_title` (pages, articles) |
| Astro | `showToc` (Default `false`), `tocLevels` (Default `["h2"]`), `tocTitle` (Default `Inhalt`) |
| UI | `TableOfContents.astro` nach dem Hero; Einträge aus `src/lib/toc.ts` |

- **An:** `showToc: true`
- **Ebenen:** Multi-Select `h2` / `h3` / `h4` (leer oder fehlend → nur `h2`)
- **Titel:** Überschrift über der Liste (leer → „Inhalt“)

Anker-IDs entsprechen den gerenderten Heading-IDs (`github-slugger`).

## Header-/Footer-Code (`headCode` / `footerCode`)

| Seite | Ort |
| --- | --- |
| Sveltia | Collection `pages`, Felder „Header-Code“ / „Footer-Code“ (`widget: code`, `output_code_only: true`) |
| Astro | `pages` Schema → Props an `BaseLayout.astro` |
| Injection | `headCode` vor `</head>`, `footerCode` vor `</body>` (nach Site-Footer), per `set:html` |

Optional. Für seitenspezifisches `<style>` / `<script>`. Nur für vertrauenswürdige Redaktion (kein Sanitizing). Nicht nötig für FAQ-Abstände — die kommen aus generischem Heading-CSS.

## Inhalts-Blöcke (Seiten-/Artikel-Body)

Im CMS über die Markdown-Toolbar einfügen (wie Bilder):

| CMS-Block | Gespeicherter Marker | Optionen |
| --- | --- | --- |
| **Artikel-Listing** | `{{article-listing count="3" sort="newest" layout="grid" columns="3" gap="1.25"}}` | Anzahl (`0` = alle), Sortierung (`newest` / `oldest` / `title-asc` / `title-desc`), Layout (`grid` / `list`), Spalten 1–4 (nur Grid), Abstand in rem |
| **Glossar-Listing** | `{{glossar-listing count="0" sort="title-asc" layout="list" columns="2" gap="1.5"}}` | Anzahl (`0` = alle), Sortierung (`title-asc` / `title-desc` / `newest` / `oldest`), Layout (`list` / `grid`), Spalten 1–4 (nur Grid), Abstand in rem |
| **Tag-Listing** | `{{tag-listing count="0" sort="title-asc" layout="cloud" columns="3" gap="1.25"}}` | Anzahl (`0` = alle genutzten), Sortierung (`title-asc` / `title-desc` / `most-used`), Layout (`cloud` / `list` / `grid`), Spalten 1–4 (nur Grid), Abstand in rem |
| **Baustein** | `{{block id="stack-uebersicht"}}` | `id` = Slug aus Collection `blocks` (Bausteine); Inhalt wird an Ort und Stelle injiziert |
| **Tagwolke** | `{{tag-cloud}}` | Kurzform für Tag-Listing mit Layout Wolke |
| **Trennlinie** | `{{separator height="1" width="100"}}` | Höhe in px (Default 1), Breite in % (Default 100), zentriert, Abstand oben/unten |
| **Kontakt-E-Mail** | `{{contact-email}}` | Adresse aus Build-Variable `CONTACT_EMAIL` (nicht im Markdown speichern) |

Registrierung: `public/admin/editor-components.js`. Rendering: `ArticleListing.astro` / `GlossarListing.astro` / `TagListing.astro` / `Separator.astro` / `ContactEmail.astro`; Bausteine werden in `content-embeds.ts` expandiert.

**Externe Links** im Markdown-Inhalt (Seiten, Artikel, Glossar, Embed-Markdown) öffnen in einem neuen Tab (`target="_blank"` + `rel="noopener noreferrer"`). Intern (`/…`, Anker, gleiche Domain) bleiben im selben Tab. Plugin: `src/lib/hast-external-links.ts`.
