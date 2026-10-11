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
  seo_description: 'Was auf hautoo.storyofai.net steht: 22 Folgen, Sveltia CMS mit Hero und Tag-Einstellungen, Inhaltsbreite, Sticky Header, Glossar, Embeds, SEO und Cloudflare Deploy.'
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
- **Statische Seiten** ([Collection](/glossar/collection/) `pages`): Startseite, Artikelübersicht, Tags, Autoren, Glossar, FAQ, Über uns, Impressum, Datenschutz und diese Features-Seite.
- **Redaktionsregeln** im Repo (`docs/redaktion/`) und als [Cursor](/glossar/cursor/)-Regel: Schema, Stil, SEO-Felder, [Bausteine](/glossar/baustein/), Querverlinkung, PR-Checkliste.
- **Transkript-basierte Folgen**: Speech-to-Text korrigieren, nichts erfinden, Quellkommentar im Artikel ([Folge 015](/artikel/folge-015-transkript-artikel/)).

## CMS und Collections

- **[Sveltia CMS](/glossar/sveltia/)** unter `/admin/`: Inhalte im Browser bearbeiten, Speichern landet als Dateien in [Git](/glossar/git/) ([Glossar CMS](/glossar/cms/), [Folge 013](/artikel/folge-013-sveltia-pat/)).
- **[Collections](/glossar/collection/)** für Pages, Articles, **Kategorien** (hierarchisch), Tags, **Autoren**, Glossar, Menüs und **Bausteine** (`blocks`) ohne eigene URL.
- **Autoren-Collection**: Name, Bio (Markdown), lokaler Avatar oder Gravatar-URL (Download beim Build nach `src/assets/authors/gravatar/`). An Artikel 0..n zuweisbar. Byline mit Avatar im Hero und/oder am Artikelende (Einstellungen → Content → Autoren: Platzierung und Form rund/eckig). Übersicht `/autoren/`, Profil `/autoren/<slug>/` mit runden Foto, Bio und Artikelliste („Artikel (N)“).
- **Settings-Collection** (`settings`): globale Site-Einstellungen als JSON unter `src/content/settings/` (wie cdr-legal). Eigene CMS-Einträge **General**, **Design** und **Content**.
- **Website-Titel** unter **Einstellungen** → **General** → **Website title**: Markenname für Header-Wortmarke, Footer-Zeile, Browser-Titel-Suffix (`Seite · …`) und `og:site_name`.
- **Website-Beschreibung** unter **Einstellungen** → **General** → **Description**: optionale Kurzbeschreibung oder Slogan (`websiteDescription`); Speichern für spätere Anzeige.
- **Footer-Copyright** unter **Einstellungen** → **General** → **Footer copyright**: optionaler Claim nach © und Website-Titel (Text oder HTML-Link wie beim Bildnachweis) plus wählbarer Trenner (`•`, `-`, `—`, `/`).
- **Kontakt-E-Mail** unter **Einstellungen** → **General** → **Contact email** (optional): überschreibt `CONTACT_EMAIL` beim Build; Anzeige über `{{contact-email}}` mit Spam-Schutz. Leer = weiter ENV (empfohlen für öffentliche Repos).
- **Menüs** als eigene Collection (`main`, `footer-legal`) statt Flags an einzelnen Seiten.
- **Entwurfsstatus** (`draft`, `published`, `future`, `trash`) für Pages, Artikel und Glossar.
- **Inhaltsverzeichnis** global unter **Einstellungen** → **Content** → **Inhaltsverzeichnis (TOC)** (Seiten/Artikel: an/aus, Ebenen, Titel) und optional pro Eintrag überschreibbar.
- **Inhaltsbreite** in drei Stufen (Standard, breit, vollbreit): global unter Content → Breite und pro Seite/Artikel unter **Inhaltsbreite** (`layout.contentWidth`).
- **Inhaltsabstand** zum Hero und Footer (rem): global unter Content → Abstand pro Collection (Seiten, Artikel, Kategorien, Tags, Autoren, Glossar); lokal unter Inhaltsbreite überschreibbar (`layout.afterHero` / `layout.beforeFooter`).
- **Seiten-Header und Footer-Code** für kleine HTML- oder [CSS](/glossar/css/)-Snippets nur auf einer Seite.
- **Zugang über [Cloudflare Worker](/glossar/cloudflare-worker/)** mit [OAuth](/glossar/oauth/) statt nur [PAT](/glossar/pat/) ([Folge 014](/artikel/folge-014-sveltia-worker/)).

## Glossar, FAQ und Tags

- **Glossar** mit Kurzdefinition, längerer Erklärung, **verwandte Artikel** (`relatedArticles`) und **verwandte Tags** (`relatedTags`).
- **Viele Begriffe** ([Git](/glossar/git/), [Deploy](/glossar/deploy/), [CI/CD](/glossar/ci-cd/), [Route](/glossar/route/), [Bildnachweis](/glossar/bildnachweis/) und mehr), jeweils eigene URL unter `/glossar/<slug>/`.
- **Erstes sinnvolles Glossar-Vorkommen** pro Seite verlinkt; Hilfsskript `link-glossar-crosslinks.py` und **Erstlink-Warnung** im [Build](/glossar/build/) (`check-glossar-first-links.py`, nicht blockierend).
- **FAQ** als eine lange Seite mit Themengruppen (H2), alles offen sichtbar, durchsuchbar per Strg+F (kein Accordion).
- **Kategorie-Seiten** unter `/kategorien/<slug>/` mit Parent-Brotkrumen, Unterkategorien und Artikel-Grid.
- **Tag-Position pro Artikel** (`tagPlacement`): Tags im Hero (rechts neben den Kategorien), nach dem Inhalt (vor der Artikel-Navigation) oder beides. Kategorien stehen immer im Hero unter der Beschreibung.
- **Tag-Seiten** mit Artikel-Grid und Link zum passenden Glossar-Eintrag, wenn der Slug passt.
- **Autoren-Seiten** unter `/autoren/<slug>/` (runder Avatar, Name, Bio, Artikel mit Anzahl in der Überschrift) und Übersicht mit `{{author-listing}}`.
- **Tag-Wolke** und **Listing-Embeds** für Glossar, Tags, Kategorien und Autoren im Seiten- oder Artikeltext.

## Bausteine und Embeds

- **Wiederverwendbare Bausteine** (`{{block id="…"}}`): z. B. Stack-Grafik (`stack-uebersicht`) auf Startseite und in passenden Folgen ([Folge 020](/artikel/folge-020-bausteine-fork/)).
- **Artikel-Listing** im Content: Anzahl, Sortierung, Grid oder Liste, wählbare Kartenfelder inkl. Kategorien, Tags, optional **Autoren**, Datum und Lesezeit ([Folge 019](/artikel/folge-019-impressum-komponenten/)).
- **Autoren-Listing** (`{{author-listing}}`): alle Autoren mit Avatar und Artikelanzahl.
- **Trennlinie**, **Abstandshalter** (`{{spacer}}` bzw. `{{spacer height="…"}}`, Default 32 px), **Button** (`{{button label="…" href="…"}}`, solid/outline, Palette, Ausrichtung) und **Kontakt-E-Mail** als Embed (`{{contact-email}}` aus CMS oder Build-Variable, nicht im Markdown).
- **Markdown-Embeds** über die Sveltia-Toolbar; Rendering zentral in `CmsContent.astro`.
- **Video-Embed:** YouTube/Vimeo (Consent-Facade) oder **selbst gehostete MP4** über Cloudflare R2 (`provider="file"`, Dateien nicht im Repo).
- **Repo-Docs-Box** (`{{repodoc path="docs/…"}}`): Verlinkung zu Handbuch-Dateien auf [GitHub](/glossar/github/), Toolbar **Repo-Dokument** ([Folge 001](/artikel/folge-001-hautuu-intro/) als Beispiel).
- **Embed-Check** vor dem Build: `{{repodoc}}` und `{{block}}` nur allein in einer Zeile, nicht mitten im Satz und **nicht zwischen Listenpunkten** (`check-content-embeds.py`).

## SEO und Auffindbarkeit

- **SEO-Objekt** pro Page und Artikel: eigener Tab-Titel, Meta-Description, Robots-Optionen ([Folge 004](/artikel/folge-004-collection-pages/)).
- **Glossar-SEO** und Tag-Beschreibungen für Suchvorschauen.
- **Open Graph und Twitter Cards**: Titel, Beschreibung, Canonical, optional OG-Bild aus dem Seitenhintergrund (1200×630).
- **Lesezeit** in Artikel-Meta und auf der Karte im Listing.
- **Sitemap** ohne Impressum, Datenschutz und `/admin`; Legal-Seiten mit **noindex**.
- **Artikel-Übersicht** (`/artikel/`): Listing-Embed mit SEO-Feldern und konfigurierbaren Kartenfeldern (Titel, Teaser, Kategorien, Tags, Datum, Lesezeit); **Seitenleiste** mit hierarchischem Kategorie-Tree (`CategoriesTree`) und genutzten Tags; auf Desktop sticky, wenn die Leiste in den Viewport passt.

## Design und Nutzung

- **Suche im Header** (MiniSearch): statischer Suchindex beim Build, Treffer zu Artikeln, Glossar und Seiten.
- **Dark Theme** mit [CSS-Variablen](/glossar/css-variable/), responsive Header mit Mobile-Menü; Logo färbt sich bei Hover in der Aktionsfarbe.
- **Farbpalette** unter **Einstellungen** → **Design** → **Farbpalette**: alle Site-Farben (`--color-*`) redaktionell wählbar, jeweils mit Kurzhinweis zur Verwendung; gelten nach Deploy siteweit.
- **Schrift** unter **Einstellungen** → **Design** → **Schrift**: eigene Schrift für Text und Überschriften, Textgröße und Überschriften-Stil (Größe, Stärke, Groß-/Kleinschreibung). Beim Build lokal eingebettet, keine externe Schrift-Anfrage beim Besuch.
- **Sticky Header** pro [Breakpoint](/glossar/breakpoint/) ein/aus; feste Leistenhöhe bei Sticky und Mindesthöhe ohne Sticky (jeweils Desktop / Tablet / Mobile), gesteuert über **Einstellungen** → **Design** → **Header**.
- **Hero-Defaults pro Collection** unter **Einstellungen** → **Design** → **Hero** (Reihenfolge wie CMS-Leiste: Seiten, Artikel, Kategorien, Tags, Glossar): Textausrichtung, Brotkrumen an/aus, Brotkrumen-Trenner, Trennlinie unten. Einzelne Seiten/Artikel überschreiben im Objekt `hero` (`textAlign`, `showBreadcrumbs`, `borderBottom`).
- **Brotkrumen-Trenner** pro Collection wählbar (`/`, `•`, `→`, `-`; Default `/`); Brotkrumen-Links in der Linkfarbe; Start als Haus-Icon.
- **UI-Icons** für Permalink (Artikel/Glossar) und Kategorie vor dem Kategorienamen im Artikel-Hero.
- **Breakpoints** und gemeinsame Layout-Hilfsklassen ([docs/design](https://github.com/platomat/hautoo/blob/main/docs/design/README.md)).
- **Vollbild-Hintergrund** optional pro Seite oder Artikel, mit Overlay und **Bildnachweis**-Feld (`background.attribution`).
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
