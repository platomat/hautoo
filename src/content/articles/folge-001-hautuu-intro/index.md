---
title: "Folge 001: Leeres Repo, voller Plan, so startet hautuu"
summary: "Du legst GitHub an, holst das Projekt auf den Rechner und sagst Cursor in normaler Sprache, worum es geht. Kein Zauber, nur der Ablauf, den du danach immer wieder brauchst."
pubDate: 2026-10-03T01:04:26Z
modifiedDate: 2026-10-04
status: published
tags:
  - github
  - cursor
  - astro
  - cloudflare
seo:
  index_visibility: index
  follow_visibility: follow
---

Willkommen in Folge eins. Hier musst du noch nicht alles verstehen, du brauchst nur ein Bild im Kopf: **Wo liegt die Wahrheit**, und **wo bastelst du dran rum**?

Die Wahrheit liegt bei **GitHub** (Server in der Cloud). Bei dir auf der Platte ist eine Kopie, an der du mit **Cursor** arbeitest. Später baut **Astro** daraus statische HTML-Seiten, und **Cloudflare** stellt sie ins Netz. Mehr Details kommen Stück für Stück, heute die grobe **Richtung**.

## GitHub: dein Projekt in der Cloud

Du legst ein **Repository** an, so heißt der Projektordner bei GitHub.

- **Name:** klein, Bindestriche, keine Leerzeichen (z. B. `hautuu`).
- **Public:** Bei hautuu ist das Repo öffentlich, andere dürfen mitlesen und lernen. Alles Geheime bleibt draußen.
- Nach dem Anlegen zeigt GitHub oft einen Block mit Befehlen (`git init`, erste **Commit**-Message, **remote** setzen, **push**). Einfach kopieren, Terminal auf, Enter — geht auch.

Kurz die Wörter: **Git** versioniert Dateien. Ein **Commit** ist ein gespeicherter Stand. **Push** schiebt deine Commits zu GitHub. **Origin** heißt das Remote-Repo, **main** ist der Hauptzweig (deine „Live-Linie“ im Code).

## Lokal holen

1. Terminal öffnen.
2. Mit `cd` in den Ordner, wo das Projekt liegen soll.
3. `git clone` + URL aus GitHub, fertig, Ordner da.

Der versteckte Ordner `.git` (unter Linux oft mit Strg+H sichtbar) ist das Tagebuch des Projekts, inklusive Adresse von **origin**.

## Cursor: Ordner auf, Agent an

**Open Folder**, dein geklonter Ordner. Typischer Start:

- `docs/` für Dokumentation.
- Dem **Agenten** erzählen, was das Projekt ist: Lern-Website mit **KI**, **GitHub**, **Cloudflare**; statische **Astro**-Seiten; Artikel mit Bildern und eingebetteten Videos (YouTube/Vimeo); Glossar; später **CMS** (**Sveltia**. Redaktion im Browser, speichert trotzdem in Git).
- Regeln aufschreiben: Texte/Doku auf Deutsch, Code auf Englisch, Commits/Issues auf Deutsch, **keine Secrets** ins öffentliche Repo (auch gelöschte Dateien bleiben in der **History**).

Repo umbenannt? URL auf GitHub ändert sich — lokal Remote in `.git/config` anpassen. **Save Project As** speichert deinen Cursor-Workspace, damit Chats nicht jedes Mal weg sind.

## Commit, Push, gitignore

In **Source Control** siehst du Änderungen. **Commit** = Stand lokal festhalten. **Push** = hoch zu GitHub.

Nur für dich: z. B. `.code-workspace` in **`.gitignore`**, dann wandert die Datei nicht mit ins Repo.

## Merksatz

**GitHub** = zentrale Wahrheit. **Lokal** = Werkstatt. **Astro** = Bäckerei für HTML. **Cloudflare** = Schaufenster im Internet. Den Rest füllen wir in den nächsten Schritten auf.

<!-- Quelle: 2026-10-03--01-04-26--obs-screencast - hautoo - intro.txt -->
