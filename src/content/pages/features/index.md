---
title: Features
description: Überblick über die umgesetzten Funktionen von hautuu auf der Website und im Repo.
status: published
modifiedDate: 2026-10-06
showToc: true
tocTitle: Inhalt
tocLevels:
  - h2
seo:
  index_visibility: index
  follow_visibility: follow
  noarchive: false
  noimageindex: false
  nosnippet: false
  max_snippet_enabled: true
  max_snippet: -1
  max_video_preview_enabled: true
  max_video_preview: -1
  max_image_preview_enabled: true
  max_image_preview: large
  seo_title: Features von hautuu
  seo_description: "Was auf hautoo.storyofai.net und im GitHub-Repo schon steht: Collections, CMS, Glossar, Embeds, SEO und Deployment. Überblick für Einsteiger und Forker."
---

Hier siehst du, **was im Projekt schon gebaut ist** (Stand: öffentliches Repo auf `main`). Details zu Begriffen im [**Glossar**](/glossar/), Antworten in der [**FAQ**](/faq/), Schritt-für-Schritt in den [**Artikeln**](/artikel/).

## Inhalte und Redaktion

- **Screencast-Folgen als Artikel** (001 bis 020): How-tos zu GitHub, Cursor, Cloudflare, Sveltia und Redaktion, mit Teaser, Tags und Querverweisen.
- **Statische Seiten** (Collection `pages`): Startseite, Artikelübersicht, Tags, Glossar, FAQ, Über uns, Impressum, Datenschutz und diese Features-Seite.
- **Redaktionsregeln** im Repo (`docs/redaktion/`) und als Cursor-Regel: Schema, Stil, SEO, Bausteine, Querverlinkung, PR-Checkliste.
- **Transkript-basierte Folgen**: Speech-to-Text korrigieren, nichts erfinden, Quellkommentar im Artikel (siehe [Folge 015](/artikel/folge-015-transkript-artikel/)).

## CMS und Collections

- **Sveltia CMS** unter `/admin/`: Inhalte im Browser bearbeiten, Speichern landet als Dateien in Git ([Glossar CMS](/glossar/cms/), [Folge 013](/artikel/folge-013-sveltia-pat/)).
- **Collections** für Pages, Articles, Tags, Glossar, Menüs und Bausteine (`blocks`) ohne eigene URL.
- **Menüs** als eigene Collection (`main`, `footer-legal`) statt Flags an einzelnen Seiten.
- **Entwurfsstatus** (`draft`, `published`, `future`, `trash`) für Pages, Artikel und Glossar.
- **Optionales Inhaltsverzeichnis** pro Seite oder Artikel (`showToc`, Ebenen wählbar).
- **Seiten-Header und Footer-Code** für kleine HTML- oder CSS-Snippets nur auf einer Seite.

## Glossar, FAQ und Tags

- **Glossar** mit Kurzdefinition, längerer Erklärung, `relatedArticles` und `relatedTags`.
- **Verwandte Tags** und **verwandte Artikel** auf Glossar-Einträgen.
- **FAQ** als eine lange Seite mit Themengruppen (H2), durchsuchbar per Strg+F ([FAQ](/faq/)).
- **Tag-Seiten** mit Artikel-Grid und Link zum passenden Glossar-Eintrag, wenn der Slug passt.
- **Tag-Wolke** und **Listing-Embeds** für Glossar und Tags im Seiten- oder Artikeltext.

## Bausteine und Embeds

- **Wiederverwendbare Bausteine** (`{{block id="…"}}`): z. B. Stack-Grafik auf Startseite und in passenden Folgen ([Folge 020](/artikel/folge-020-bausteine-fork/)).
- **Artikel-Listing** im Content: Anzahl, Sortierung, Grid oder Liste, wählbare Kartenfelder inkl. Lesezeit.
- **Trennlinie** und **Kontakt-E-Mail** als Embed (`{{contact-email}}` aus Build-Variable, nicht im Klartext).
- **Markdown-Embeds** über die Sveltia-Toolbar; Rendering zentral in `CmsContent.astro`.
- **Repo-Docs-Box** (`{{repodoc path="docs/…"}}`): Verlinkung zu Handbuch-Dateien auf GitHub, Toolbar **Repo-Dokument** in Sveltia ([Folge 001](/artikel/folge-001-hautuu-intro/) als Beispiel).

## SEO und Auffindbarkeit

- **SEO-Objekt** pro Page und Artikel: eigener Tab-Titel, Meta-Description, Robots-Optionen ([Folge 004](/artikel/folge-004-collection-pages/)).
- **Glossar-SEO** und Tag-Beschreibungen für Suchvorschauen.
- **Open Graph und Twitter Cards**: Titel, Beschreibung, Canonical, optional OG-Bild aus dem Seitenhintergrund (1200×630).
- **Lesezeit** in Artikel-Meta und auf der Karte im Listing.
- **Sitemap** ohne Impressum, Datenschutz und `/admin`; Legal-Seiten mit **noindex**.
- **Artikel-Übersicht** (`/artikel/`): Listing-Embed mit SEO-Feldern und konfigurierbaren Kartenfeldern (Titel, Teaser, Datum, Tags, Lesezeit).

## Design und Nutzung

- **Suche im Header** (MiniSearch): statischer Suchindex beim Build, Treffer zu Artikeln, Glossar und Seiten ([docs/cursor](https://github.com/platomat/hautoo/blob/main/docs/cursor/README.md)).

- **Dark Theme** mit Design-Tokens, Ubuntu-Schrift, responsive Header mit Mobile-Menü.
- **Breakpoints** und gemeinsame Layout-Hilfsklassen ([docs/design](https://github.com/platomat/hautoo/blob/main/docs/design/README.md)).
- **Vollbild-Hintergrund** optional pro Seite oder Artikel, mit Overlay und Bildnachweis auf dem Impressum.
- **Bilder neben dem Content** (Variante B), Astro-Optimierung inklusive CMS-Pfade unter `/assets/`.
- **Externe Links** öffnen in neuem Tab; interne bleiben in der Site.
- **Artikel-Navigation** (älter/neuer) und breitere Spalte bei Listing-Embeds.

## Deployment und Workflow

- **Statische Site** mit Astro, Auslieferung über **Cloudflare Pages** aus GitHub `main` ([Folge 011](/artikel/folge-011-cloudflare-setup/)).
- **Preview-Branches** und Rollback über Cloudflare ([Folge 012](/artikel/folge-012-cloudflare-branches/)).
- **Build-ID** für Favicons und Cache-Busting; `_headers` für langes Caching von Assets.
- **Öffentliches Repo** `platomat/hautoo`, Issues und Pull Requests auf Deutsch.

## Dokumentation und Agenten

- **Projekt-Doku** unter `docs/` (GitHub, Cloudflare, Sveltia, Astro, Redaktion, Sicherheit).
- **Cursor-Regeln** in `.cursor/rules/` (Konventionen, Redaktion, CSS, Deutsch).
- **Hilfsskripte** z. B. für Glossar-Querverweise und SEO-Bulk-Pflege im Repo.

Neue Funktionen bitte hier und in der [README auf GitHub](https://github.com/platomat/hautoo#features) nachpflegen (siehe Redaktions-Doku).
