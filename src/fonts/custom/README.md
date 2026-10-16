# Eigene Schriften

Pro Schrift einen Ordner unter `src/fonts/custom/<id>/` (Slug, z. B. `acme-display`). Die ID darf nicht schon im Fontsource-Katalog stehen.

## Pflicht

- `stylesheet.css` (oder `fonts.css` / eine `*.css`) mit `@font-face` und **lokalen** `url(...)` zu Dateien im selben Ordner. Ausgabe von Transfonter ist ok: Der dort eingetragene Zielpfad dient nur dem Auslesen der Dateinamen; der Sync schreibt die URLs fest auf `/fonts/<id>/…`.
- Die in der CSS referenzierten Font-Dateien (am besten `.woff2`).

## Optional: `meta.json`

```json
{
  "label": "Acme Display",
  "family": "Acme Display",
  "fallback": "system-ui, sans-serif"
}
```

## Sync

`npm run sync:fonts` (oder `npm run dev` / `build`):

1. Schrift optional im CMS unter Design → Schrift (Site-weit)
2. Katalog `site-fonts.generated.json`
3. **Immer** Auslieferung nach `public/fonts/<id>/` inkl. generierter `stylesheet.css`
4. Wenn als Design-Schrift gewählt: zusätzlich in `src/styles/fonts.generated.css`

### Nur für einzelne Elemente (Head-Code)

Design kann Ubuntu bleiben. Im CMS z. B. Seiten-`headCode` oder globaler Head-HTML:

```html
<link rel="stylesheet" href="/fonts/acme-display/stylesheet.css" />
<style>
  .hero-title {
    font-family: "Acme Display", system-ui, sans-serif;
  }
</style>
```

Der Browser lädt die WOFF2 erst, wenn die `font-family` wirklich genutzt wird.

Danach Ordner plus generierten Katalog und die Font-Optionen in `config.yml` committen.
