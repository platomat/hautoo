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

**Hinweis:** YAML-Anchors gelten nur **innerhalb derselben** `config.yml` (Sveltia-Limit). Zod und YAML bei Feldänderungen gemeinsam pflegen.
