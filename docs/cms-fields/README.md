# CMS field partials (DRY)

Wiederverwendbare Feldgruppen für Sveltia und Astro.

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
| **Artikel-Listing** | `{{article-listing count="3" sort="newest" layout="grid" columns="3"}}` | Anzahl, Sortierung (`newest` / `oldest` / `title-asc` / `title-desc`), Layout (`grid` / `list`), Spalten 1–4 (nur Grid) |
| **Tagwolke** | `{{tag-cloud}}` | — |

Registrierung: `public/admin/editor-components.js`. Rendering: `ArticleListing.astro` / `TagCloud.astro`.
