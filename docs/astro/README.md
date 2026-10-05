# Astro

Astro erzeugt aus Inhalten und Komponenten eine **statische** Website. Das passt zu Git-basiertem CMS und Hosting auf Cloudflare Pages.

## Warum Astro

- Schnelle, statische Ausgabe
- Inhalte als Markdown/MDX oder aus Content Collections
- Wenig JavaScript für Besucher, wenn nicht nötig
- Gute Passung zu Sveltia (Dateien im Repo)

## Geplante Content-Collections / CMS-Collections

Entsprechen den Sveltia-Sammlungen:

| Collection | Zweck |
| --- | --- |
| `pages` | Allgemeine Seiten |
| `menus` | Hauptmenü, Footer-Links (Slots per Dateiname) |
| `articles` | Artikel inkl. Medien und Video-Embed |
| `tags` | Tags für Artikel |
| `glossar` | Begriffserklärungen |

## Was hier dokumentiert werden soll

- Projektstruktur (`src/`, `public/`, Content-Ordner)
- Content Collections Schema
- Layouts für Artikel (Text, Bilder, Video-Embed)
- Glossar-Darstellung und Verlinkung aus Artikeln
- Build lokal und auf Cloudflare

## Sprache im Code

Komponenten, Props und Kommentare im Code: **Englisch**. Sichtbare Texte und Doku: **Deutsch**.

## Erscheinungsbild

Vorgaben zu dunklem Theme, Farbpalette (Aktionsgrün), Ubuntu und Links: **[Design & Erscheinungsbild](../design/README.md)**.

## Aktueller Stand

- Astro 7 (statisch), Site-URL: `https://hautoo.storyofai.net`
- Integrationen: `@astrojs/mdx`, `@astrojs/sitemap` (Filter: kein `/admin/`, kein `noindex` laut SEO-Feld; Link im `<head>` auf `sitemap-index.xml`)
- **Suche:** MiniSearch (wie storyofai.net); Index `public/search/de.json` wird bei `predev` / `prebuild` / `npm run build:search` erzeugt (Build-Artefakt, nicht im Git); UI im Header (`SiteSearch.astro`, Ctrl/⌘K)
- Installation und Scripts: [Lokale Entwicklung](../entwicklung/README.md)
- **Medien:** Bilder neben Content-Einträgen (`src/content/...`), damit Astro sie optimieren kann — siehe [Medien — Variante B](../sveltia/medien-variante-b.md) und [Inhalte](../inhalte/README.md)
- **Design:** dunkles Theme und Ubuntu lokal (`public/fonts/ubuntu/`) — siehe [Design](../design/README.md)

## Noch auszuarbeiten

- Layouts und Seiten-Templates laut [Design](../design/README.md) ausbauen
- Layouts und `image()`-Pipeline für Eintrags-Medien
- Content Collections: `pages`, `menus`, `tags`, `articles`, `glossar`

