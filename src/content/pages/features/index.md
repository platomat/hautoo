---
title: Features
description: Überblick über die umgesetzten Funktionen von hautuu auf der Website und im Repo.
status: published
modifiedDate: 2026-10-11
toc:
  show: true
  title: Inhalt
  levels:
  - h2
background:
  image: olga-kovalski-eAmNjd0Zbts-unsplash.cleaned.webp
  overlay: 73
  attribution: |-
    Photo by <a href="https://unsplash.com/@kovalskihelga?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Olga Kovalski</a> on <a href="https://unsplash.com/photos/an-old-brick-building-with-a-tree-in-the-foreground-eAmNjd0Zbts?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
seo:
  seo_title: Features von hautuu
  seo_description: 'Was auf hautoo.storyofai.net steht: 22 Folgen, Sveltia CMS mit Collections und Content-Komponenten, Hero, Inhaltsbreite, Sticky Header, Glossar, SEO und Cloudflare Deploy.'
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
layout:
  contentWidth: wide

---

Hier siehst du, **was im Projekt schon gebaut ist** (Stand: öffentliches [Repo](/glossar/repository/) auf `main`). Details zu Begriffen im [**Glossar**](/glossar/), Antworten in der [**FAQ**](/faq/), Schritt für Schritt in den [**Artikeln**](/artikel/).

## Inhalte und Redaktion

- **Screencast-Folgen als Artikel** (001 bis 022): How-tos zu [GitHub](/glossar/github/), [Cursor](/glossar/cursor/), [Cloudflare](/glossar/cloudflare-pages/), [Sveltia](/glossar/sveltia/) und Redaktion, mit Teaser, Tags und Querverweisen. Agenten-Output prüfen: [Folge 022](/artikel/folge-022-ki-aenderungen-pruefen-pr/).
- **Statische Seiten** (Collection `pages`): Startseite, Artikelübersicht, Tags, Autoren, Glossar, FAQ, Über uns, Impressum, Datenschutz und diese Features-Seite.
- **Redaktionsregeln** im Repo (`docs/redaktion/`) und als [Cursor](/glossar/cursor/)-Regel: Schema, Stil, SEO-Felder, [Bausteine](/glossar/baustein/), Querverlinkung, PR-Checkliste.
- **Transkript-basierte Folgen**: Speech-to-Text korrigieren, nichts erfinden, Quellkommentar im Artikel ([Folge 015](/artikel/folge-015-transkript-artikel/)).

## CMS und Collections

- **[Sveltia CMS](/glossar/sveltia/)** unter `/admin/`: Inhalte im Browser bearbeiten; Speichern landet als Dateien in [Git](/glossar/git/) ([Glossar CMS](/glossar/cms/), [Folge 013](/artikel/folge-013-sveltia-pat/)).
- **Zugang** über [Cloudflare Worker](/glossar/cloudflare-worker/) mit [OAuth](/glossar/oauth/) statt nur [PAT](/glossar/pat/) ([Folge 014](/artikel/folge-014-sveltia-worker/)).
- **Entwurfsstatus** (`draft`, `published`, `future`, `trash`) für Pages, Artikel und Glossar.

### Collections und Relationen

- **pages:** Statische Seiten inkl. Start, Legal, Übersichten. Optional Parent-Seite; eigene URL.
- **articles:** Screencast-Folgen und Beiträge. Relationen: 0..n **Kategorien**, **Tags**, **Autoren**; Video-Felder; URL `/artikel/<slug>/`.
- **categories:** Hierarchische Kategorien. Optional Parent; Relation von Artikeln; URL `/kategorien/<slug>/`.
- **tags:** Schlagworte. Relation von Artikeln; optional passender Glossar-Slug; URL `/tags/<slug>/`.
- **authors:** Autorenprofile (Name, Bio, Avatar/Gravatar). Relation von Artikeln; URL `/autoren/<slug>/`.
- **glossar:** Begriffsseiten. Relationen: `relatedArticles`, `relatedTags`; URL `/glossar/<slug>/`.
- **menus:** Navigation (`main`, `footer-legal`, …) mit Label und Ziel.
- **blocks:** Wiederverwendbare Bausteine ohne eigene URL; Einbinden per Content-Komponente `{{block}}`.
- **redirects:** Weiterleitungen (#76). Mehrere Quellen → ein Ziel (301/302); Build erzeugt `_redirects`.
- **settings:** Globale JSON-Einstellungen (**General**, **Design**, **Content**); keine Relationen.

### Settings (General / Design / Content)

- **Website-Titel**, optionale **Beschreibung**, **Footer-Copyright**, optional **Kontakt-E-Mail** und **GitHub-Repo** (General).
- **Logos** (Header, optional Sticky, Footer) und **Favicons** (Standard, optional dunkel) aus der Mediathek (#79, #80).
- **Design:** Farbpalette, Schrift, Sticky Header, Hero-Defaults pro Collection.
- **Content:** TOC, Inhaltsbreite, Abstand Hero/Footer, Autoren-Anzeige (Platzierung, Avatar-Form).
- Pro Seite/Artikel: lokale Überschreibung von Hero, TOC, Inhaltsbreite/Abstand; optional Head-/Footer-Code.

## Glossar, Taxonomien und Autoren (Seiten)

- **Glossar** mit Kurzdefinition, längerer Erklärung und Querverweisen; viele Begriffe unter `/glossar/<slug>/`.
- **Erstes sinnvolles Glossar-Vorkommen** pro Seite verlinkt; Hilfsskript und Erstlink-Warnung im [Build](/glossar/build/).
- **FAQ** als eine lange Seite mit Themengruppen (H2), offen durchsuchbar (kein Accordion).
- **Kategorie-Seiten** mit Parent-Brotkrumen, Unterkategorien und Artikel-Grid.
- **Tag-Seiten** mit Artikel-Grid; Link zum Glossar, wenn der Slug passt. Am Artikel: `tagPlacement` (Hero, nach Inhalt oder beides); Kategorien immer im Hero.
- **Autoren-Seiten** (Avatar, Bio, Artikelliste) und Übersicht `/autoren/`.
- **Artikel-Übersicht** `/artikel/` mit Seitenleiste (Kategorie-Tree, genutzte Tags); auf Desktop sticky, wenn die Leiste in den Viewport passt.

## Content-Komponenten (Embeds)

Im Markdown über die Sveltia-Toolbar; Rendering in `CmsContent.astro`.

- **Baustein** (`{{block id="…"}}`): Inhalt aus Collection `blocks` ([Folge 020](/artikel/folge-020-bausteine-fork/)).
- **Logo** (`{{logo variant="header" width="120" unit="px" align="center"}}`): Site-Logo aus General → Logos mit Breite und Ausrichtung (#79).
- **Artikel-Listing**: Anzahl, Sortierung, Grid/Liste, Kartenfelder; Filter nach Autoren, Kategorien und Tags (UND/ODER) (#78).
- **Kategorie-Listing**, **Tag-Listing**, **Tagwolke**, **Autoren-Listing**, **Glossar-Listing**.
- **Trennlinie**, **Abstandshalter**, **Button**, **Kontakt-E-Mail** (`{{contact-email}}` aus CMS oder ENV).
- **Video:** YouTube/Vimeo (Consent) oder selbst gehostete MP4 über R2.
- **Repo-Dokument** (`{{repodoc path="docs/…"}}`): Link zu Handbuch-Dateien auf [GitHub](/glossar/github/).
- **Embed-Check** vor dem Build: Embeds nur allein in einer Zeile (`check-content-embeds.py`).

## SEO und Auffindbarkeit

- **SEO-Objekt** pro Page und Artikel: Tab-Titel, Meta-Description, Robots ([Folge 004](/artikel/folge-004-collection-pages/)).
- **Open Graph und Twitter Cards**: Titel, Beschreibung, Canonical, optional OG-Bild aus dem Seitenhintergrund (1200×630).
- **Lesezeit** in Artikel-Meta und auf Listing-Karten.
- **Sitemap** ohne Impressum, Datenschutz und `/admin`; Legal-Seiten mit **noindex**.

## Design und Nutzung

- **Suche im Header** (MiniSearch): statischer Suchindex beim Build.
- **Dark Theme** mit [CSS-Variablen](/glossar/css-variable/), responsive Header mit Mobile-Menü.
- **Farbpalette**, **Schrift**, **Sticky Header**, **Hero-Defaults** redaktionell unter Einstellungen → Design.
- **Brotkrumen** mit wählbarem Trenner; Start als Haus-Icon; UI-Icons für Permalink und Kategorie.
- **Breakpoints** und gemeinsame Layout-Hilfsklassen ([docs/design](https://github.com/platomat/hautoo/blob/main/docs/design/README.md)).
- **Vollbild-Hintergrund** optional mit Overlay und **Bildnachweis**; Nachweise gesammelt im Impressum.
- **Bilder** neben dem Content (Variante B), Astro-Optimierung inkl. CMS-Pfade unter `/assets/` ([Folge 021](/artikel/folge-021-bilder-suchen-nutzen/)).
- **Externe Links** öffnen in neuem Tab mit Pfeil-Indikator (nicht Header/Footer).
- **Artikel-Navigation** (älter/neuer); Listing-Seiten oft Breite **breit**.

## Deployment und Workflow

- **Statische Site** mit [Astro](/glossar/astro/), Auslieferung über **[Cloudflare Pages](/glossar/cloudflare-pages/)** aus GitHub `main` ([Folge 011](/artikel/folge-011-cloudflare-setup/)).
- **Preview-[Branches](/glossar/branch/)** und [Rollback](/glossar/rollback/) ([Folge 012](/artikel/folge-012-cloudflare-branches/)).
- **Build-ID** für Cache-Busting; `_headers`; CMS-Redirects → `_redirects`.
- **Öffentliches Repo** `platomat/hautoo`, [Issues](/glossar/issue/) und [Pull Requests](/glossar/pull-request/) auf Deutsch.

## Dokumentation, Qualität und Agenten

- **Projekt-Doku** unter `docs/` (GitHub, Cloudflare, Sveltia, Astro, Redaktion, Sicherheit).
- **Cursor-Regeln** in `.cursor/rules/`.
- **Link-Check** im `prebuild` (`check-content-links.py`, inkl. Embed-Check).
- **Hilfsskripte** z. B. Glossar-Querverweise und SEO-Bulk-Pflege.

Neue Funktionen bitte hier und in der [README auf GitHub](https://github.com/platomat/hautoo#features) nachpflegen (siehe Redaktions-Doku).
