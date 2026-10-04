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
| Ausgabe | SEO-Meta im `<head>`: `article:modified_time`, `og:updated_time` (noch keine sichtbare Anzeige) |

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
  - *field_seo
  - { name: body, label: Inhalt, widget: markdown }
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
| UI | `PageBackground.astro` — fixed, full viewport; schwarzes Overlay 0–100 % |
| Nachweis | `backgroundAttribution` (Text oder reine URL) → Liste auf `/impressum/` via `BackgroundAttributions.astro` |

Pfade:

- Shared Library: `/assets/datei.webp` → Datei unter `src/assets/` (globaler CMS-`media_folder`)
- Eintragsrelativ: `datei.webp` neben `index.md` (Variante B)

Nicht Astro-`image()` im Schema — das scheitert an `/assets/…`. Genutzt bei `pages` und `articles`.

**Bildnachweis:** Ein Feld reicht — Freitext, alleinstehende `http(s)`-URL (dann verlinkt) oder HTML 1:1 von Stock-Plattformen (z. B. Unsplash „Copy attribution“ mit `<a href>`). HTML wird auf erlaubte Links sanitisiert (`sanitizeAttributionHtml`). Sammlung: `src/lib/background-attributions.ts` (alle Pages + veröffentlichte Articles). Am Asset selbst speichert Sveltia keine Beschreibung; der Nachweis hängt am Eintrag.

**Hinweis:** YAML-Anchors gelten nur **innerhalb derselben** `config.yml` (Sveltia-Limit). Zod und YAML bei Feldänderungen gemeinsam pflegen.

## Inhalts-Blöcke (Seiten-/Artikel-Body)

Im CMS über die Markdown-Toolbar einfügen (wie Bilder):

| CMS-Block | Gespeicherter Marker | Optionen |
| --- | --- | --- |
| **Artikel-Listing** | `{{article-listing count="3" sort="newest" layout="grid" columns="3" gap="1.25"}}` | Anzahl (`0` = alle), Sortierung (`newest` / `oldest` / `title-asc` / `title-desc`), Layout (`grid` / `list`), Spalten 1–4 (nur Grid), Abstand in rem |
| **Tagwolke** | `{{tag-cloud}}` | — |
| **Trennlinie** | `{{separator height="1" width="100"}}` | Höhe in px (Default 1), Breite in % (Default 100), zentriert, Abstand oben/unten |

Registrierung: `public/admin/editor-components.js`. Rendering: `ArticleListing.astro` / `TagCloud.astro` / `Separator.astro`.

**Externe Links** im Markdown-Inhalt (Seiten, Artikel, Glossar, Embed-Markdown) öffnen in einem neuen Tab (`target="_blank"` + `rel="noopener noreferrer"`). Intern (`/…`, Anker, gleiche Domain) bleiben im selben Tab. Plugin: `src/lib/hast-external-links.ts`.
