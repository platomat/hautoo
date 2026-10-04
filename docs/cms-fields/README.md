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

## Seitenhintergrund (`backgroundImage` / `backgroundOverlay`)

| Seite | Ort |
| --- | --- |
| Sveltia | Anchors `&field_background_image` / `&field_background_overlay` in `public/admin/config.yml` |
| Astro | Pfad als String (`backgroundImageSchema`); Auflösung `src/lib/cms-image.ts` |
| UI | `PageBackground.astro` — fixed, full viewport; schwarzes Overlay 0–100 % |

Pfade:

- Shared Library: `/assets/datei.webp` → Datei unter `src/assets/` (globaler CMS-`media_folder`)
- Eintragsrelativ: `datei.webp` neben `index.md` (Variante B)

Nicht Astro-`image()` im Schema — das scheitert an `/assets/…`. Genutzt bei `pages` und `articles`.

**Hinweis:** YAML-Anchors gelten nur **innerhalb derselben** `config.yml` (Sveltia-Limit). Zod und YAML bei Feldänderungen gemeinsam pflegen.
