<a href="https://hautoo.storyofai.net"><img src="public/img/logo-mark.svg" alt="hautuu Logo" width="120" /></a>

# hautuu

Dokumentation und (geplante) Website-Grundlage, um mit **Cursor**, **GitHub** und **Cloudflare** eine thematische Astro-Website zu erstellen und zu pflegen.

**Domain:** [hautoo.storyofai.net](https://hautoo.storyofai.net)

## Was hier entsteht

- Statische Website mit **Astro**
- Inhalte über **Sveltia** (`pages`, `articles`, `tags`, `glossar`, `menus`, `blocks`)
- Artikel mit Text, Bildern und eingebetteten How-to-Videos (Vimeo/YouTube)
- Glossar für Begriffe
- Anleitungen für Menschen, die das nachbauen oder mitarbeiten wollen

Live-Überblick: **[Features auf der Site](https://hautoo.storyofai.net/features/)**

## Features

Kurzliste dessen, was auf `main` schon umgesetzt ist (Details und Erläuterungen auf der [Features-Seite](https://hautoo.storyofai.net/features/)):

| Bereich | Punkte |
| --- | --- |
| **Inhalte** | 21 Screencast-Folgen als Artikel, statische Pages, Features-Seite, Redaktionsregeln in `docs/redaktion/` |
| **CMS** | Sveltia `/admin/`, Collections inkl. Bausteine (`blocks`), Menüs, **Config** (`site.yaml`: Design/Content), Entwurfsstatus, globales TOC und **Inhaltsbreite** (3 Stufen) mit lokaler Überschreibung, Head/Footer-Code, Worker-OAuth-Zugang |
| **Glossar & FAQ** | Glossar mit verwandten Artikeln/Tags, Querverlink-Skript und Erstlink-Check, FAQ offen (kein Accordion), Tag-Seiten |
| **Embeds** | Bausteine, Artikel-/Glossar-/Tag-Listings, Tagwolke, Trennlinie, Kontakt-E-Mail aus ENV, Repo-Docs-Box; Embed-Check (auch Listen-Regel) |
| **SEO** | `seo`-Felder, Open Graph/Twitter inkl. OG-Bild (1200×630), Canonical, Sitemap, Lesezeit, noindex für Impressum/Datenschutz |
| **Suche & UI** | MiniSearch im Header, Artikel-Übersicht mit Listing-Embed und Kartenfeldern |
| **Design** | Dark Theme mit CSS-Variablen, Breakpoints, **Sticky Header** (pro Gerät, Höhen aus Config), Inhaltsbreite Standard/breit/vollbreit, Vollbild-Hintergrund, **Bildnachweise** gesammelt auf dem Impressum |
| **Deploy** | Astro-Build, Cloudflare Pages aus GitHub, Preview/Rollback, Cache-Header und Build-ID |
| **Qualität & Doku** | `check-content-links.py` (inkl. Embeds), `docs/`, Cursor-Regeln, Glossar-/SEO-Hilfsskripte |

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

Astro-Site mit Sveltia-CMS, Glossar, FAQ, 21 Folgen-Artikeln und Cloudflare-Deploy ist live unter [hautoo.storyofai.net](https://hautoo.storyofai.net). Details: [Features](https://hautoo.storyofai.net/features/).
