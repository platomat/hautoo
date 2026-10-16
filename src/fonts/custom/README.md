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

1. Schrift im CMS unter Design → Schrift
2. Katalog `site-fonts.generated.json`
3. Bei Auswahl in Design: Kopie nach `public/fonts/<id>/`
4. Neu: `src/styles/fonts.generated.css`

Danach Ordner plus generierten Katalog und die Font-Optionen in `config.yml` committen.
