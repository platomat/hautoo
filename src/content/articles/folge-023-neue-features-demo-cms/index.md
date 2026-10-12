---
title: 'Folge 023: Neue Features: Demo-Seite, Einstellungen und CMS-Bausteine'
summary: Features-Übersicht und Demo zum Anklicken, Video-Consent, Autoren mit Gravatar, General/Design/Content inkl. Header, Footer, Hero, TOC und Abstände. Lokal mit npm run dev testen.
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
  seo_description: hautuu Features und Demo, Video-Consent, Autoren Gravatar, Einstellungen General Design Content, Breadcrumb, Sticky Header, Footer Drag-and-Drop. Folge 023.
---

Viel passiert in [GitHub](/glossar/github/)-[Issues](/glossar/issue/) und [Milestones](/glossar/issue/): bei hautuu sind in einem Meilenstein dutzende Tickets erledigt (ein Meilenstein mit rund 39 abgeschlossenen Issues). Wichtiger für dich: **was die Site heute kann**. Dafür gibt es die [**Features-Seite**](/features/) und zum Anklicken die [**Demo**](/features/demo/) (Parent: Features). Agenten-Output prüfst du wie in [Folge 022](/artikel/folge-022-ki-aenderungen-pruefen-pr/).

## Demo: Markdown und Toolbar

Die Demo ist eine normale **Seite** (`pages`). Du siehst **Markdown** (Listen, Codeblock, Tabelle) und die Toolbar-Komponenten:

| Element | Kurz |
| --- | --- |
| **Button** / **Button-Gruppe** | Stil ausgefüllt oder Kontur, Farbe z. B. primär oder „danger“, Ziel-URL, optional volle Breite auf Mobile |
| **Logo** | Site-Logo mit Breite und Ausrichtung |
| **Trennlinie** | Höhe, Breite, Farbe (Standard-Randfarbe) |
| **Abstandshalter** | Höhe in Pixel |
| **Kontakt-E-Mail** | `{{contact-email}}` für Impressum/README-Links ohne Klartext im [Repo](/glossar/repository/) |
| **Repo-Dokument** | Hinweisbox zu Dateien unter `docs/` |
| **Baustein** | Wiederverwendbarer Text ([Folge 020](/artikel/folge-020-bausteine-fork/)) |
| **Listings** | Artikel, Kategorien, Tags, Autoren, Glossar; Tagwolke |
| **Video** / **Video-Freischaltung widerrufen** | siehe Abschnitt Video unten |

**Tabellen:** kein eigener Button. Seite **Demo** → Editor **Markdown** → Tabelle im Text pflegen.

**Überschriften:** `h1` blendet das CMS aus (Titel steht im Hero); im Inhalt nur `h2`–`h6`. Größen und Schrift unter **Einstellungen** → **Design** → **Schrift**.

## Video: Consent, Widerruf, selbst gehostete Dateien

**YouTube / Vimeo** im Embed `{{video …}}`: Zuerst nur eine **Facade** (Platzhalter), **kein** Player und **keine** Verbindung zu Google/Vimeo. Besucher klicken **„Video von YouTube laden“** bzw. **„Video von Vimeo laden“** (Text in `VideoEmbed.astro`). Die Einwilligung gilt **site-weit** im Browser (`localStorage`, Schlüssel `hautuu-video-consent`): beim nächsten Video musst du nicht jedes Mal neu zustimmen.

- **Privacy page** unter **Einstellungen** → **General**: Relation zur Datenschutz-Seite. Der Hinweis im Player verlinkt dorthin (Anker `eingebettete-videos`), auch wenn deine Seite anders heißt als „Datenschutz“.
- **Widerruf:** Embed **Video-Freischaltung widerrufen** (`{{video-consent-reset}}`) auf der Datenschutz-Seite oder wo du willst. Danach sind Player wieder gesperrt, bis erneut geladen wird.

**Selbst gehostete MP4** (`provider="file"`): kein YouTube/Vimeo-Consent-Schalter; Auslieferung z. B. über Cloudflare R2. In **Einstellungen** → **Content** → **Medien** → **Video-Basis-URL** (`videoBaseUrl`) die öffentliche Basis-URL setzen, damit große Dateien **nicht** in die Mediathek / ins [Git](/glossar/git/)-Repo wandern. Details: `docs/cloudflare/r2-videos.md`.

**Kommt noch:** Screencast-Videos sollen noch über R2 eingebunden werden; **Video-Basis-URL** und File-Provider sind vorbereitet, die Medien im Projekt können noch nachziehen.

## Collections im `/admin/`

| Collection | Wofür |
| --- | --- |
| **Seiten** / **Artikel** | Inhalt, Hero/TOC/Breite überschreiben, Hintergrund, Bildnachweis |
| **Kategorien** | Hierarchisch (Parent wie bei WordPress), URLs `/kategorien/…`, Tree in der Artikel-Sidebar ([Glossar Kategorie](/glossar/kategorie/)) |
| **Tags** | Schlagworte; am Artikel **Tags anzeigen** (Im Hero / Nach dem Inhalt / Hero und nach dem Inhalt) |
| **Autoren** | Mehrere pro Artikel; Profil unter `/autoren/<slug>/` |
| **Glossar** | optional (Lern-Site) |
| **Bausteine** | z. B. Kontaktanschrift für Impressum + Datenschutz |
| **Menüs** | `main`, `footer` (Brand), `footer-legal` (Copyright-Zeile) |
| **Weiterleitungen** | Quellpfade → Ziel, **301** ([Glossar Weiterleitung](/glossar/weiterleitung/)) |
| **Einstellungen** | `general.json`, `design.json`, `content.json` |

**Artikel-Listing:** Sortierung, Kartenfelder, **Filter** nach Autor/Kategorie/Tag, **UND** oder **ODER**. Relative Pfade (`/kategorien/werkzeuge/`) funktionieren lokal und live.

## Autoren: Profil, Avatar, Gravatar, Social

Collection **Autoren** (`public/admin/config.yml`):

| Feld | Bedeutung |
| --- | --- |
| **Name** | Anzeigename |
| **Kurzbeschreibung** | Kurztext; erscheint im Hero der Profilseite |
| **Bio** | Längerer Markdown-Text unter dem Hero |
| **Avatar** | Bild aus der Mediathek (**hat Vorrang** vor Gravatar) |
| **Gravatar (E-Mail oder URL)** | E-Mail für [Gravatar](/glossar/gravatar/) oder direkte `https`-URL; Build kann nach `src/assets/authors/gravatar/` laden |
| **Social / Web** | Plattform (Webseite, YouTube, …) + **URL** + optional **Anzeigename** |
| **Social-Links im Hero** | An: Icons nach der Kurzbeschreibung. Aus: nur per Embed **Autor Social-Links** im Inhalt |
| **Inhalt** | Freier Body auf der Profilseite (Embeds erlaubt) |

**Gravatar kurz:** Unter [gravatar.com](https://gravatar.com/) meldest du dich an und hinterlegst **ein Bild pro E-Mail**. Andere Sites (oft WordPress) holen dasselbe Bild, wenn dieselbe E-Mail sichtbar ist. **Nicht besonders datenschutzfreundlich**, weil die E-Mail bzw. der Hash den Dienst erreichen kann. Lieber **Avatar** lokal, wenn du das vermeiden willst.

**Global auf Artikeln** (**Einstellungen** → **Content** → **Autoren**):

- **Autoren auf Artikeln:** Nicht anzeigen / **Im Hero** / **Am Ende des Artikels** / **Hero und am Ende**
- **Avatar-Form (Artikel):** **Rund** oder **Eckig** (Profilseiten bleiben rund)

**Über mich** = Autorenprofil (`/autoren/wasilij/`): gleicher Link wie „Über mich“ im Menü nach Umbau von der alten Seite **Über uns**.

## Brotkrumen, Suche, Artikel-Meta

- **Suche** im Header (MiniSearch, siehe [Features](/features/#design-und-nutzung)).
- [**Breadcrumb**](/glossar/breadcrumb/) im Hero: Pfad z. B. Features → Demo oder Kategorien → Werkzeuge → Deploy & Hosting.
- Global pro Collection unter **Einstellungen** → **Design** → **Hero**: **Brotkrumen anzeigen**, **Brotkrumen-Trenner** (`/`, `•`, `→`, `-`).
- Pro Seite/Artikel: **Hero überschreiben** → **Brotkrumen anzeigen** (leer = Default). **Trennlinie unten** global oder überschrieben; bei manchen Overrides wirkt die Linie erst nach Speichern/Deploy wie erwartet (Restore-Default-Kante).
- Artikel: **Kategorien** immer im Hero; **Tags anzeigen** wählbar; **Autoren**-Relation.

## Einstellungen → General

Datei `src/content/settings/general.json`. CMS-Labels (Auszug):

- **Website title** (Seitentitel im Header, Titel-Suffix, Footer)
- **Description** (Slogan; HTML erlaubt, z. B. fett oder Links)
- **Footer copyright** → **Claim**, **Separator** (Trenner zwischen Titel und Claim), **Show center mark** (Mitte: GitHub-Icon wenn **GitHub repository** gesetzt, sonst Site-Logo zur Startseite)
- **Contact email** (optional; steht im öffentlichen Repo, wenn gesetzt → besser **CONTACT_EMAIL** als [Umgebungsvariable](/glossar/env/), [Folge 019](/artikel/folge-019-impressum-komponenten/))
- **Privacy page** (Datenschutz-Seite für Video-Hinweis)
- **GitHub repository** (`owner/name`, nur mit Show center mark)
- **Logos** → **Header** (oben, „Ruhe“), **Sticky Header** (nach Scrollen, kompaktere Leiste), **Footer** (Mitte/Brand; leer = Fallback wie Header)
- **Favicons** → **Favicon** und **Favicon (dunkel)** für helles/dunkles Browser-Theme (nicht dasselbe wie die drei Logo-Slots, aber gleiche Idee: hell vs. dunkel sichtbar)

## Einstellungen → Design

Datei `src/content/settings/design.json`.

**Farbpalette:** CSS-Farben inkl. Submenü-Hintergrund und -Text (Lesbarkeit bei transparenten Flächen).

**Schrift:** Webfonts (z. B. Roboto, Open Sans, Merriweather, Ubuntu), Basisgröße, Gewicht, **H1–H6** (Familie, Größe, Stärke, **text-transform**: uppercase/lowercase/capitalize).

**Header:**

- **Logo-Position:** Links / Rechts / **Mittig** (Menü darunter)
- **Inhaltsbreite:** Standard (Lesespalte) / Breit / **Vollbreit** für die Header-Zeile
- **Ruhehöhe Desktop/Tablet/Mobile (px)** am Seitenanfang
- **Sticky auf Desktop/Tablet/Mobile** ein/aus
- **Höhe sticky Desktop/Tablet/Mobile (px)** nach dem Festkleben (schmaler beim Scrollen)

**Footer** → **Brand** (oberhalb der Copyright-Zeile):

- **Brand-Bereich anzeigen** oder nur Copyright-Zeile
- **Layout** nebeneinander/untereinander, **Ausrichtung**, **Menü-Einträge** nebeneinander/untereinander
- **Inhaltsbreite** Brand-Zeile (Standard/Breit/Vollbreit)
- **Logo-Größe (px)**, **Menü-Slug** (z. B. `footer`)
- **Bausteine (Reihenfolge):** Liste **Logo**, **Beschreibung**, **Menü** per **Drag-and-Drop** sortieren; Logo z. B. in die Mitte ziehen

**Copyright-Zeile** → **Bar:** **Inhaltsbreite**, **Border-Breite** (volle Browserbreite vs. wie Zeile)

**Hero** (pro Collection: Seiten, Artikel, Kategorien, Tags, Autoren, Glossar): **Textausrichtung**, **Brotkrumen anzeigen**, **Brotkrumen-Trenner**, **Trennlinie unten**.

**Inhaltsbreite** und **Abstand** je Collection:

- Breite: Standard / Breit / Vollbreit (Artikel einzeln unter **Inhaltsbreite** am Eintrag)
- **Unter Hero (rem)** und **Vor Footer (rem)** (z. B. 6 rem vor Footer für Luft); pro Seite/Artikel unter Layout-Felder **Abstand unter Hero (rem)** / **Abstand vor Footer (rem)** überschreibbar

## Einstellungen → Content

Datei `src/content/settings/content.json`.

**Inhaltsverzeichnis (TOC):** für **Seiten** und **Artikel** jeweils **Standardmäßig anzeigen**, **Ebenen** (`h2`, `h3`, `h4`), **TOC-Titel**. Pro Seite **TOC überschreiben** (wie bei Features/Demo/FAQ oft nur `h2`). Leer = globale Defaults.

**Medien:** **Video-Basis-URL** (siehe Video oben).

**Autoren:** **Autoren auf Artikeln**, **Avatar-Form (Artikel)** (siehe oben).

{{repodoc path="docs/sveltia/collections.md" title="Collections (Sveltia)" description="Alle CMS-Collections und Felder."}}

## Weiterleitung

Beispiel im Repo: Quelle `/ueber-uns/` → Ziel `/autoren/wasilij/`, Status **301**, mehrere Quell-URLs möglich. Pfade vom Root (`/…`), nicht `localhost`. Online nach [Deploy](/glossar/deploy/); lokal kann es abweichen.

## Seiten und Startseite

An jeder **Seite**: Status, Datum, Parent, **Hero überschreiben**, **TOC überschreiben**, **Seitenhintergrund einstellen**, Bildnachweis, **Inhaltsbreite**, Inhalt mit Buttons, Bausteinen, Logo-Element usw. Die **Startseite** nutzt dieselben Felder (Titel, Beschreibung, Listing-Filter UND/ODER für News-Kategorien usw.).

## Lokal testen

Im Projektordner [`npm run dev`](/glossar/npm/) ([Folge 018](/artikel/folge-018-node-npm/)). Nur **ein** Dev-Server (Port-Konflikt, wenn Cursor schon einen startet). **Einstellungen** → **Design** live im Browser prüfen, dann speichern und optional [pushen](/glossar/push/).

Eigenes Projekt ohne MIT-Inhalte: [Folge 024](/artikel/folge-024-github-template-privat/) (**Template** statt [Fork](/glossar/fork/), privat).

## Kurz merken

- **Demo** zeigt Toolbar + Markdown; **Features** erklärt.
- **Video:** Consent für YouTube/Vimeo, **Privacy page**, Widerruf-Embed; R2 über **Video-Basis-URL**.
- **General / Design / Content** steuern fast alles Sichtbare; Footer-Brand per **Drag-and-Drop**.
- **Autoren** + optional [Gravatar](/glossar/gravatar/); Geheimnisse in **ENV**.

<!-- Quelle: 2026-10-12--01-55-51--obs-screencast - hautoo - 023 - neue features.txt -->
