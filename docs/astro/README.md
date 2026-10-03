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

## Aktueller Stand

- Astro 7 (statisch), Site-URL: `https://hautoo.storyofai.net`
- Integrationen: `@astrojs/mdx`, `@astrojs/sitemap`
- Installation und Scripts: [Lokale Entwicklung](../entwicklung/README.md)
- **Medien:** Bilder neben Content-Einträgen (`src/content/...`), damit Astro sie optimieren kann — siehe [Sveltia](../sveltia/README.md) und [Inhalte](../inhalte/README.md)

## Noch auszuarbeiten

- Design-/Layout-Grundlagen
- Content Collections Schema (`pages`, `articles`, `tags`, `glossar`)
- Layouts und `image()`-Pipeline für Eintrags-Medien

