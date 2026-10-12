---
title: 'Folge 023: Neue Features: Demo-Seite, Einstellungen und CMS-Bausteine'
summary: Features-Übersicht und Demo zum Anklicken, globale Einstellungen in General, Design und Content, Kategorien, Autoren und Weiterleitungen. Lokal mit npm run dev testen.
pubDate: 2026-10-11 23:55:51+00:00
modifiedDate: 2026-10-12
status: published
categories:
- screencasts
tags:
- sveltia
- design
- cms
- astro
authors:
- wasilij
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 023: Demo, Einstellungen und CMS-Features'
  seo_description: hautuu Features-Seite und Demo, Sveltia-Einstellungen General Design Content, Kategorien, Autoren, Weiterleitungen. Folge 023 für Laien im CMS.
---

Viel passiert in [GitHub](/glossar/github/)-[Issues](/glossar/issue/) und [Milestones](/glossar/issue/): bei hautuu sind in einem Meilenstein dutzende Tickets erledigt. Wichtiger für dich als Besucher: **was die Site heute kann**. Dafür gibt es die [**Features-Seite**](/features/) (`src/content/pages/features/index.md`) und zum **Anfassen** die [**Demo**](/features/demo/) unter `/features/demo/` (Parent: Features). Agenten-Änderungen prüfst du wie in [Folge 022](/artikel/folge-022-ki-aenderungen-pruefen-pr/).

## Demo: alles auf einen Blick

Die Demo ist eine normale **Seite** in der Collection `pages`. Dort siehst du **Markdown** (Listen, Codeblock, Tabelle) und die **Toolbar-Komponenten** aus [Sveltia](/glossar/sveltia/): Button, Button-Gruppe, Logo, Trennlinie, Abstandshalter, Listings, Tagwolke, Video-Embed und mehr.

**Tabellen** gibt es keinen eigenen Button: Seite **Demo** öffnen → im Editor **Markdown** wählen und die Tabelle im Text pflegen. **Überschriften:** `h1` blendet das CMS aus (die Seitentitel-Zeile oben reicht); im Inhalt startest du mit `h2` bis `h6`, Größen und Schrift steuerst du global unter **Design** (siehe unten).

Buttons: Stil „solid“ (ausgefüllt) oder „outline“ (Kontur), Farbe z. B. primär oder „danger“. Auf schmalen Viewports können Buttons **volle Breite** nutzen.

## Collections im `/admin/`

Neben **Seiten**, **Artikel**, **Tags** und **Glossar** (optional für Lern-Sites) u. a.:

| Bereich | Wofür |
| --- | --- |
| **Kategorien** | Hierarchische Themen für Artikel, eigene URLs unter `/kategorien/` ([Glossar Kategorie](/glossar/kategorie/)) |
| **Autoren** | Profil, Kurztext, Bio, Avatar (rund/eckig), Social Links |
| **Bausteine** | Wiederverwendbare Snippets ([Folge 020](/artikel/folge-020-bausteine-fork/)), z. B. Kontaktanschrift für Impressum und Datenschutz |
| **Menüs** | `main`, Footer-Brand, `footer-legal` |
| **Weiterleitungen** | Alte Pfade → neues Ziel, Build → `_redirects` ([Glossar Weiterleitung](/glossar/weiterleitung/)) |

**Artikel-Listing** in der Toolbar: Sortierung, Anzahl, **Filter** nach [Kategorie](/glossar/kategorie/), Tag oder Autor, Verknüpfung **UND** (alle Bedingungen) oder **ODER** (eine reicht). Relative Links wie `/kategorien/werkzeuge/` funktionieren lokal und live.

## Einstellungen: General, Design, Content

Im CMS **Einstellungen** (Dateien unter `src/content/settings/`):

### General (Allgemein)

- **Seitentitel** und **Beschreibung** (auch im Footer, HTML erlaubt)
- **Copyright**-Zeile inkl. optionalem Trenner
- **Show center mark** (Logo-Mitte im Footer): bei hautuu oft aus, stattdessen Logo-Link wie im Header
- **Kontakt-E-Mail:** nicht ins öffentliche [Repo](/glossar/repository/) schreiben, nutze [Umgebungsvariable](/glossar/env/) (`CONTACT_EMAIL`, siehe [Folge 019](/artikel/folge-019-impressum-komponenten/))
- **Datenschutz-Seite** auswählen (für Video-Einwilligung und Widerruf)
- **Logos** pro Kontext: Header normal/sticky, Footer, hell/dunkel, Fallback

### Design

- **Farben** (inkl. Submenü-Hintergrund für Lesbarkeit)
- **Schrift:** Auswahl aus eingebundenen Webfonts, Basisgröße, **H1–H6** (Familie, Stärke, `text-transform`)
- **Header:** Logo links/rechts/zentriert, volle Breite, **Sticky** pro Desktop/Tablet/Mobil, Ruhe- und Sticky-Höhe in px
- **Footer:** Brand-Zeile vs. Copyright, volle Breite, Menü-Anordnung
- **Hero:** Textausrichtung, [**Breadcrumb**](/glossar/breadcrumb/), Trennlinie unten; pro Collection (Seiten, Artikel, Kategorien, Autoren, …) voreinstellbar, pro Eintrag überschreibbar („Restore default“ wo vorgesehen)
- **Inhaltsbreite** und **Abstand** (Hero ↔ Inhalt, Inhalt ↔ Footer) je Collection

### Content (Inhalt)

- Globales **Inhaltsverzeichnis** (TOC) für Seiten/Artikel
- **Autoren**-Anzeige (Position Header/Footer)
- **Medien:** Video-Basis-URL für selbst gehostete Dateien (z. B. Cloudflare R2), keine großen Dateien im [Repository](/glossar/repository/). Siehe `docs/cloudflare/r2-videos.md`.

{{repodoc path="docs/sveltia/collections.md" title="Collections (Sveltia)" description="Alle CMS-Collections und Felder."}}

## Weiterleitung und Autorenprofil

Beispiel **Weiterleitung:** Quelle `/ueber-uns/` → Ziel `/autoren/wasilij/`, Code **301**, mehrere Quell-URLs möglich. Pfad immer vom Root (`/…`), nicht `localhost`. Online greift das nach dem [Deploy](/glossar/deploy/); lokal kann es abweichen.

**Über mich** ist das **Autorenprofil** (`/autoren/wasilij/`): Klick auf den Autor in Artikeln landet dort. Social Links optional im Hero oder im Body (Embed **Author Social Links**).

## Lokal testen

Im Projektordner: [`npm run dev`](/glossar/npm/) ([Folge 018](/artikel/folge-018-node-npm/)). Nur **ein** Dev-Server gleichzeitig (sonst Port-Konflikt). Änderungen in **Einstellungen** oder Design siehst du sofort im Browser, bevor du [pushst](/glossar/push/).

**Suche** im Header ([Features](/features/#design-und-nutzung)), **Brotkrumen** in der Demo, Kategorie-Bäume in der Sidebar: alles zusammen macht aus der statischen Site ein kleines **CMS**-Projekt.

Eigenes Projekt ohne alles MIT-Content: [Folge 024](/artikel/folge-024-github-template-privat/) (**Template** statt [Fork](/glossar/fork/), privat starten).

## Kurz merken

- **Features** lesen, **Demo** klicken, **Einstellungen** für Look & Feel.
- **Kategorien**, **Autoren**, **Weiterleitungen** sind eigene Collections.
- Geheimnisse in **ENV**, nicht in JSON committen.
- **npm run dev** zum Ausprobieren.

<!-- Quelle: 2026-10-12--01-55-51--obs-screencast - hautoo - 023 - neue features.txt -->
