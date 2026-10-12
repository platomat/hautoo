<a href="https://hautoo.storyofai.net"><img src="src/assets/logo-mark.svg" alt="hautuu Logo" width="120" /></a>

# hautuu

Dokumentation und (geplante) Website-Grundlage, um mit **Cursor**, **GitHub** und **Cloudflare** eine thematische Astro-Website zu erstellen und zu pflegen.

**Domain:** [hautoo.storyofai.net](https://hautoo.storyofai.net)

## Was hier entsteht

- Statische Website mit **Astro**
- Inhalte über **Sveltia** (`pages`, `articles`, `categories`, `tags`, `authors`, `glossar`, `menus`, `blocks`)
- Artikel mit Text, Bildern und eingebetteten How-to-Videos (Vimeo/YouTube oder Dateien über Cloudflare R2)
- Glossar für Begriffe
- Anleitungen für Menschen, die das nachbauen oder mitarbeiten wollen

Live-Überblick: **[Features auf der Site](https://hautoo.storyofai.net/features/)**

## Features

Kurzliste dessen, was auf `main` schon umgesetzt ist (Details und Erläuterungen auf der [Features-Seite](https://hautoo.storyofai.net/features/)):

| Bereich | Punkte |
| --- | --- |
| **Inhalte** | 23 Screencast-Folgen als Artikel, statische Pages, Features-Seite inkl. [Demo](https://hautoo.storyofai.net/features/demo/), Redaktionsregeln in `docs/redaktion/` |
| **CMS / Collections** | Sveltia `/admin/`; Pages, Articles (+ Kategorien/Tags/Autoren), Glossar, Menüs, Bausteine, Weiterleitungen, Settings (General/Design/Content inkl. Logos, Favicons, Hero, Schrift, Breite, Abstand); Entwurfsstatus; Worker-OAuth |
| **Glossar & FAQ** | Glossar mit verwandten Artikeln/Tags, Querverlink-Skript und Erstlink-Check, FAQ offen (kein Accordion), Tag- und Autoren-Seiten |
| **Content-Komponenten** | Bausteine, Listings (Filter UND/ODER), Tagwolke, Logo-Embed, Video (YT/Vimeo oder R2), Trennlinie, Abstandshalter, Button, Button-Gruppe, Kontakt-E-Mail, Repo-Docs; Embed-Check |
| **SEO** | `seo`-Felder, Open Graph/Twitter inkl. OG-Bild (1200×630), Canonical, Sitemap, Lesezeit, noindex für Impressum/Datenschutz |
| **Suche & UI** | MiniSearch im Header, Artikel-Übersicht mit Listing-Embed und Kartenfeldern, Seitenleiste mit Kategorie-Tree und Tags |
| **Design** | Dark Theme mit CSS-Variablen, Breakpoints, **Sticky Header**, **Hero**, **Schrift** (Fließtext/Überschriften, Basisgröße, H1–H6; Build lädt von Fontsource/jsDelivr, Auslieferung lokal), Inhaltsbreite 3 Stufen, Abstand Hero/Footer pro Collection, UI-Icons (Brotkrumen-Haus, Kategorie, Permalink), externe Links mit Pfeil-Indikator (nicht Header/Footer), Vollbild-Hintergrund, **Bildnachweise** auf dem Impressum |
| **Deploy** | Astro-Build, Cloudflare Pages aus GitHub, Preview/Rollback, Cache-Header, Build-ID, CMS-Redirects → `_redirects` |
| **Qualität & Doku** | `check-content-links.py` (inkl. Embeds), `check-content-no-video-hints.py`, `docs/`, Cursor-Regeln, Glossar-/SEO-Hilfsskripte |

Die genaue Liste aller Features findest du auf der Website: [Features](https://hautoo.storyofai.net/features/).

## Dokumentation

👉 Start: **[docs/README.md](./docs/README.md)**

| Thema | Link |
| --- | --- |
| Konzept | [docs/konzept](./docs/konzept/README.md) |
| Design | [docs/design](./docs/design/README.md) |
| Cursor | [docs/cursor](./docs/cursor/README.md) |
| GitHub | [docs/github](./docs/github/README.md) |
| Cloudflare | [docs/cloudflare](./docs/cloudflare/README.md) |
| Astro | [docs/astro](./docs/astro/README.md) |
| Sveltia | [docs/sveltia](./docs/sveltia/README.md) |
| Inhalte | [docs/inhalte](./docs/inhalte/README.md) |
| Redaktion | [docs/redaktion](./docs/redaktion/README.md) |
| Sicherheit | [docs/sicherheit](./docs/sicherheit/README.md) |

## Sprachen

| Bereich | Sprache |
| --- | --- |
| Dokumentation & Projektkommunikation | Deutsch |
| Quellcode | Englisch |
| Commits, Issues, Pull Requests | Deutsch |

Details: [docs/sprachen-und-konventionen.md](./docs/sprachen-und-konventionen.md)

## Sicherheit

Öffentliches Repository — **keine Secrets** committen. Siehe [docs/sicherheit](./docs/sicherheit/README.md).

## Lokal starten

Voraussetzung: Node.js **22.12+**

```bash
npm install
npm run dev
```

Details: [docs/entwicklung](./docs/entwicklung/README.md)

## Status

Astro-Site mit Sveltia-CMS, Glossar, FAQ, 22 Folgen-Artikeln und Cloudflare-Deploy ist live unter [hautoo.storyofai.net](https://hautoo.storyofai.net). Details: [Features](https://hautoo.storyofai.net/features/).
