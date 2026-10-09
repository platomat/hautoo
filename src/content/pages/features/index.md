---
title: Features
description: Überblick über die umgesetzten Funktionen von hautuu auf der Website und im Repo.
status: published
modifiedDate: 2026-10-07
backgroundImage: olga-kovalski-eAmNjd0Zbts-unsplash.cleaned.webp
backgroundOverlay: 73
backgroundAttribution: Photo by <a href="https://unsplash.com/@kovalskihelga?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Olga Kovalski</a> on <a href="https://unsplash.com/photos/an-old-brick-building-with-a-tree-in-the-foreground-eAmNjd0Zbts?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
showToc: true
tocTitle: Inhalt
tocLevels:
  - h2
contentWidth: wide
seo:
  seo_title: Features von hautuu
  seo_description: 'Was auf hautoo.storyofai.net steht: 22 Folgen, Sveltia CMS mit Config, Inhaltsbreite, Sticky Header, Glossar, Embeds, SEO und Cloudflare Deploy.'
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
---

Hier siehst du, **was im Projekt schon gebaut ist** (Stand: öffentliches [Repo](/glossar/repository/) auf `main`). Details zu Begriffen im [**Glossar**](/glossar/), Antworten in der [**FAQ**](/faq/), Schritt für Schritt in den [**Artikeln**](/artikel/).

## Inhalte und Redaktion

- **Screencast-Folgen als Artikel** (001 bis 022): How-tos zu [GitHub](/glossar/github/), [Cursor](/glossar/cursor/), [Cloudflare](/glossar/cloudflare-pages/), [Sveltia](/glossar/sveltia/) und Redaktion, mit Teaser, Tags und Querverweisen. Agenten-Output prüfen: [Folge 022](/artikel/folge-022-ki-aenderungen-pruefen-pr/).
- **Statische Seiten** ([Collection](/glossar/collection/) `pages`): Startseite, Artikelübersicht, Tags, Glossar, FAQ, Über uns, Impressum, Datenschutz und diese Features-Seite.
- **Redaktionsregeln** im Repo (`docs/redaktion/`) und als [Cursor](/glossar/cursor/)-Regel: Schema, Stil, SEO-Felder, [Bausteine](/glossar/baustein/), Querverlinkung, PR-Checkliste.
- **Transkript-basierte Folgen**: Speech-to-Text korrigieren, nichts erfinden, Quellkommentar im Artikel ([Folge 015](/artikel/folge-015-transkript-artikel/)).

## CMS und Collections

- **[Sveltia CMS](/glossar/sveltia/)** unter `/admin/`: Inhalte im Browser bearbeiten, Speichern landet als Dateien in [Git](/glossar/git/) ([Glossar CMS](/glossar/cms/), [Folge 013](/artikel/folge-013-sveltia-pat/)).
- **[Collections](/glossar/collection/)** für Pages, Articles, Tags, Glossar, Menüs und **Bausteine** (`blocks`) ohne eigene URL.
- **Config-Collection** (`config`): globale Site-Einstellungen als YAML (`site.yaml`), kein [Markdown](/glossar/markdown/). Gruppen **Design** und „Content“ (Inhalt) in der Collection **Konfiguration** (`public/admin/config.yml`).
- **Menüs** als eigene Collection (`main`, `footer-legal`) statt Flags an einzelnen Seiten.
- **Entwurfsstatus** (`draft`, `published`, `future`, `trash`) für Pages, Artikel und Glossar.
- **Inhaltsverzeichnis** global unter **Konfiguration** → „Content“ → **Inhaltsverzeichnis (TOC)** (Seiten/Artikel: an/aus, Ebenen, Titel) und optional pro Eintrag überschreibbar.
- **Inhaltsbreite** in drei Stufen (Standard, breit, vollbreit): global unter Content → Breite und pro Seite/Artikel per `contentWidth`.
- **Seiten-Header und Footer-Code** für kleine HTML- oder [CSS](/glossar/css/)-Snippets nur auf einer Seite.
- **Zugang über [Cloudflare Worker](/glossar/cloudflare-worker/)** mit [OAuth](/glossar/oauth/) statt nur [PAT](/glossar/pat/) ([Folge 014](/artikel/folge-014-sveltia-worker/)).

## Glossar, FAQ und Tags

- **Glossar** mit Kurzdefinition, längerer Erklärung, **verwandte Artikel** (`relatedArticles`) und **verwandte Tags** (`relatedTags`).
- **Viele Begriffe** ([Git](/glossar/git/), [Deploy](/glossar/deploy/), [CI/CD](/glossar/ci-cd/), [Route](/glossar/route/), [Bildnachweis](/glossar/bildnachweis/) und mehr), jeweils eigene URL unter `/glossar/<slug>/`.
- **Erstes sinnvolles Glossar-Vorkommen** pro Seite verlinkt; Hilfsskript `link-glossar-crosslinks.py` und **Erstlink-Warnung** im [Build](/glossar/build/) (`check-glossar-first-links.py`, nicht blockierend).
- **FAQ** als eine lange Seite mit Themengruppen (H2), alles offen sichtbar, durchsuchbar per Strg+F (kein Accordion).
- **Tag-Seiten** mit Artikel-Grid und Link zum passenden Glossar-Eintrag, wenn der Slug passt.
- **Tag-Wolke** und **Listing-Embeds** für Glossar und Tags im Seiten- oder Artikeltext.

## Bausteine und Embeds

- **Wiederverwendbare Bausteine** (`{{block id="…"}}`): z. B. Stack-Grafik (`stack-uebersicht`) auf Startseite und in passenden Folgen ([Folge 020](/artikel/folge-020-bausteine-fork/)).
- **Artikel-Listing** im Content: Anzahl, Sortierung, Grid oder Liste, wählbare Kartenfelder inkl. Lesezeit ([Folge 019](/artikel/folge-019-impressum-komponenten/)).
- **Trennlinie** und **Kontakt-E-Mail** als Embed (`{{contact-email}}` aus Build-Variable, nicht im Klartext).
- **Markdown-Embeds** über die Sveltia-Toolbar; Rendering zentral in `CmsContent.astro`.
- **Repo-Docs-Box** (`{{repodoc path="docs/…"}}`): Verlinkung zu Handbuch-Dateien auf [GitHub](/glossar/github/), Toolbar **Repo-Dokument** ([Folge 001](/artikel/folge-001-hautuu-intro/) als Beispiel).
- **Embed-Check** vor dem Build: `{{repodoc}}` und `{{block}}` nur allein in einer Zeile, nicht mitten im Satz und **nicht zwischen Listenpunkten** (`check-content-embeds.py`).

## SEO und Auffindbarkeit

- **SEO-Objekt** pro Page und Artikel: eigener Tab-Titel, Meta-Description, Robots-Optionen ([Folge 004](/artikel/folge-004-collection-pages/)).
- **Glossar-SEO** und Tag-Beschreibungen für Suchvorschauen.
- **Open Graph und Twitter Cards**: Titel, Beschreibung, Canonical, optional OG-Bild aus dem Seitenhintergrund (1200×630).
- **Lesezeit** in Artikel-Meta und auf der Karte im Listing.
- **Sitemap** ohne Impressum, Datenschutz und `/admin`; Legal-Seiten mit **noindex**.
- **Artikel-Übersicht** (`/artikel/`): Listing-Embed mit SEO-Feldern und konfigurierbaren Kartenfeldern (Titel, Teaser, Datum, Tags, Lesezeit).

## Design und Nutzung

- **Suche im Header** (MiniSearch): statischer Suchindex beim Build, Treffer zu Artikeln, Glossar und Seiten.
- **Dark Theme** mit [CSS-Variablen](/glossar/css-variable/), Ubuntu-Schrift, responsive Header mit Mobile-Menü.
- **Sticky Header** pro [Breakpoint](/glossar/breakpoint/) ein/aus und Leistenhöhe in px, gesteuert über **Konfiguration** → **Design** → **Header**.
- **Breakpoints** und gemeinsame Layout-Hilfsklassen ([docs/design](https://github.com/platomat/hautoo/blob/main/docs/design/README.md)).
- **Vollbild-Hintergrund** optional pro Seite oder Artikel, mit Overlay und **Bildnachweis**-Feld (`backgroundAttribution`).
- **Bildnachweise gesammelt** am Ende des **Impressums** (automatisch aus Pages und Artikeln, [Folge 019](/artikel/folge-019-impressum-komponenten/#bildnachweise-im-impressum)).
- **Bilder neben dem Content** (Variante B), [Astro](/glossar/astro/)-Optimierung inklusive [CMS](/glossar/cms/)-Pfade unter `/assets/` ([Folge 021](/artikel/folge-021-bilder-suchen-nutzen/)).
- **Externe Links** öffnen in neuem Tab und zeigen im Inhalt einen kleinen Pfeil (`↗`); im Header und Footer ohne Indikator.
- **Artikel-Navigation** (älter/neuer); Listing-Seiten nutzen die Breite **breit** (oder vollbreit), wählbar im CMS.

## Deployment und Workflow

- **Statische Site** mit [Astro](/glossar/astro/), Auslieferung über **[Cloudflare Pages](/glossar/cloudflare-pages/)** aus GitHub `main` ([Folge 011](/artikel/folge-011-cloudflare-setup/)).
- **Preview-[Branches](/glossar/branch/)** und [Rollback](/glossar/rollback/) über Cloudflare ([Folge 012](/artikel/folge-012-cloudflare-branches/)).
- **Build-ID** für Favicons und Cache-Busting; `_headers` für langes Caching von Assets.
- **Öffentliches Repo** `platomat/hautoo`, [Issues](/glossar/issue/) und [Pull Requests](/glossar/pull-request/) auf Deutsch.

## Dokumentation, Qualität und Agenten

- **Projekt-Doku** unter `docs/` (GitHub, Cloudflare, Sveltia, Astro, Redaktion, Sicherheit).
- **Cursor-Regeln** in `.cursor/rules/` (Konventionen, Redaktion, CSS, Deutsch).
- **Link-Check** im `prebuild`: kaputte Markdown-Links in `src/content` (`check-content-links.py`, ruft Embed-Check mit auf).
- **Hilfsskripte** z. B. Glossar-Querverweise (`link-glossar-crosslinks.py`) und SEO-Bulk-Pflege (`fill-seo-fields.py`, manuell).

Neue Funktionen bitte hier und in der [README auf GitHub](https://github.com/platomat/hautoo#features) nachpflegen (siehe Redaktions-Doku).
