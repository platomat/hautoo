---
title: 'Folge 019: Impressum, Datenschutz, ENV und CMS-Komponenten'
summary: Rechtstexte per Agent, Kontakt-E-Mail als Secret, Bildnachweise auf dem Impressum, Separator und Artikel-Listing redaktionell.
pubDate: 2026-10-04 20:57:40+00:00
modifiedDate: 2026-10-06
status: published
tags:
- astro
- sveltia
- cloudflare
- design
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 019: Impressum, Datenschutz, ENV und CMS-Komponenten'
  seo_description: Rechtstexte mit dem Agenten, Kontakt per Secret, Bildnachweise für Hintergründe auf dem Impressum, Separator und Listing im CMS. Folge 019 zu Legal und Komponenten.
---

Impressum und Datenschutz für einen in **Deutschland** betriebenen Auftritt, gehostet auf [**Cloudflare**](/glossar/cloudflare-pages/), mit den Tools aus dem Projekt: das kann der Agent ausformulieren, du prüfst Inhalt und Ton. Footer-Platzierung und erste Seiten: [Folge 003](/artikel/folge-003-erstes-design/). **Kontakt-E-Mail** gehört nicht als Klartext ins öffentliche [Repo](/glossar/repository/) (Baustein `{{contact-email}}`, siehe [Folge 020](/artikel/folge-020-bausteine-fork/)).

{{repodoc path="docs/cms-fields/README.md" title="CMS field partials (DRY)" description="Embeds, Kontakt-E-Mail und SEO-Felder."}}

## E-Mail schützen

{{repodoc path="docs/sicherheit/README.md" title="Sicherheit & Secrets" description="Kontakt per ENV statt Klartext im Repo."}}


Öffentliches [GitHub](/glossar/github/) bedeutet: jede Adresse im Code ist scrapebar. Stattdessen:

- [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → dein Pages-Projekt → **Settings** → **Variables and Secrets** (im Screencast „Secrets Variables“): z. B. `CONTACT_EMAIL` als Secret ([Cloudflare Environment variables](https://developers.cloudflare.com/pages/configuration/build-configuration/#environment-variables)).
- **Lokal** dieselbe Variable in [`.env`](/glossar/env/) (liegt in `.gitignore`), z. B. `CONTACT_EMAIL=du@example.de`.
- [Build](/glossar/build/) (`npm run build`; [Node](/glossar/nodejs/)/[npm](/glossar/npm/): [Folge 018](/artikel/folge-018-node-npm/)) und Dev-Server lesen die Variable; lokal testest du mit dem gleichen Befehl wie in Production. die Impressums-Komponente rendert einen `mailto:`-Link ohne die Adresse im [Markdown](/glossar/markdown/) zu [committen](/glossar/commit/).

Kurz: ENV = [Umgebungsvariablen](/glossar/env/), getrennt für lokal und [Production](/glossar/production/).

## Bildnachweise im Impressum

Nutzt du für **Seiten** oder **Artikel** ein **Hintergrundbild**, brauchst du oft einen [**Bildnachweis**](/glossar/bildnachweis/) (Urheber, Quelle, Lizenztext). Im [**CMS**](/glossar/cms/) ([Sveltia](/glossar/sveltia/)) liegt dazu das Feld **Bildnachweis** (`backgroundAttribution`) neben **Seitenhintergrund** und **Abdunkelung** bei **Seiten** und **Artikel**.

Du trägst reinen Text ein, eine alleinstehende `https://…`-URL (die Site verlinkt sie) oder HTML von Stock-Plattformen (z. B. Unsplash „Copy attribution“). Erlaubt sind nur sichere Links im HTML.

Beim Build sammelt die Site alle ausgefüllten Werte aus veröffentlichten Seiten und Artikeln. Auf [**Impressum**](/impressum/) erscheint am **Ende** der Seite der Block **Bildnachweise**: pro Hintergrund der **Titel** der Seite oder des Artikels (verlinkt) und darunter der Nachweis. Leere Felder tauchen nicht auf. Die Mediathek speichert am Bild selbst keinen Credit, du pflegst ihn am Eintrag mit dem Hintergrund. Motive und Upload: [Folge 021](/artikel/folge-021-bilder-suchen-nutzen/).

## Separator im CMS

Neue [**Komponente**](/glossar/komponente/) im Seiten-/Artikel-Editor (`/admin/` → **Seiten** oder **Artikel** → **Inhalt**): in der Toolbar **Trennlinie** mit **Höhe** (1 dezent, 10 kräftig) und **Breite** in Prozent (z. B. 50 % zentriert). Optional später: Farbe aus der Design-Palette, Standard ein dezentes Grau. Einfügen, verschieben, löschen wie bei Bildern.

## Artikel-Listing gezielt einsetzen

Statt fest verdrahteter Listen auf der [Route](/glossar/route/) **Artikel**: Block **Artikel-Listing** im Inhalt. Beispiele:

- **Startseite:** letzte drei, neueste zuerst, **Grid**, drei Spalten.
- **Seite „Artikel“:** alle Einträge (`limit` null), neueste oder älteste zuerst, **eine Spalte**, Kartenstil ähnlich Startseite oder Liste ohne Karte.

Sag dem [**Cloud Agent**](/glossar/cloud-agent/) explizit, in welcher [**Collection**](/glossar/collection/) (Seiten, Artikel oder Glossar) der Block verfügbar sein soll. Er verdrahtet ihn dann passend im CMS ([Folge 004](/artikel/folge-004-collection-pages/) erklärt das Modell).

## Glossar und Bilder

Glossar-Begriffe können vom Agenten vorbefüllt werden; **Glossar-Listing** auf einer eigenen Seite (Menüpunkt „Glossar“) war noch To-do. Hintergrundbilder lieber **lokal** im Repo statt Hotlink (z. B. Platzhalter-Dienste): weniger Ladezeit, weniger Drittanfragen, **datenschutzfreundlicher**.

## Text-Stil nachziehen

Nach dem großen Artikel-Import ([Folge 016](/artikel/folge-016-artikel-pull-request/)): [Issue](/glossar/issue/) an den Agenten, **Gedankenstriche** in der Prosa zu reduzieren, Ziel grob von sehr vielen auf wenige siteweit. Rechtstexte: unnötige Standard-Abschnitte raus, wenn sie nicht zum Setup passen.

<!-- Quelle: 2026-10-04--20-57-40--obs-screencast - hautoo - 019 - inhalt, impressum, datenschutz, [komponenten](/glossar/komponente/).txt -->
