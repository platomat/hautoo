---
title: 'Folge 001: Leeres Repo, voller Plan, so startet hautuu'
summary: Du legst GitHub an, holst das Projekt auf den Rechner und sagst Cursor in normaler Sprache, worum es geht. Kein Zauber, nur der Ablauf, den du danach immer wieder brauchst.
pubDate: 2026-10-03 01:04:26+00:00
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
  seo_title: 'Folge 001: Leeres Repo, voller Plan, so startet hautuu'
  seo_description: Du legst GitHub an, holst das Projekt lokal und erklärst Cursor dein Ziel in normaler Sprache. Folge 001 zeigt den Einstiegsablauf für hautuu.
---

Willkommen in Folge eins. Hier musst du noch nicht alles verstehen, du brauchst nur ein Bild im Kopf: **Wo liegt die Wahrheit**, und **wo bastelst du dran rum**?

Die Wahrheit liegt bei [**GitHub**](/glossar/github/) (Server in der Cloud). Bei dir auf der Platte ist eine Kopie, an der du mit [**Cursor**](/glossar/cursor/) arbeitest. Später baut [**Astro**](/glossar/astro/) daraus statische HTML-Seiten ([**Frontend**](/glossar/frontend/)), und [**Cloudflare**](/glossar/cloudflare-pages/) stellt sie ins Netz. Mehr Details kommen Stück für Stück, heute die grobe **Richtung**.

{{block id="stack-uebersicht"}}

## GitHub: dein Projekt in der Cloud

Du legst ein [**Repository**](/glossar/repository/) an, so heißt der Projektordner bei GitHub.

- **Name:** klein, Bindestriche, keine Leerzeichen (z. B. `hautuu`).
- **Public:** Bei hautuu ist das Repo öffentlich, andere dürfen mitlesen und lernen. Alles Geheime bleibt draußen.
- Nach dem Anlegen zeigt GitHub oft [CLI](/glossar/cli/)-Befehle (`git init`, erste Commit-Message, **remote** setzen, **push**). Einfach kopieren, [Terminal](/glossar/terminal/) auf, Enter — geht auch.

Kurz die Wörter:

{{repodoc path="docs/github/README.md" title="GitHub" description="Repository, Remote und Zusammenarbeit im Überblick der Doku."}}

[**Git**](/glossar/git/) versioniert Dateien. Ein [**Commit**](/glossar/commit/) ist ein gespeicherter Stand. [**Push**](/glossar/push/) schiebt deine Commits zu GitHub. [**Origin**](/glossar/origin/) heißt das Remote-Repo, [**main**](/glossar/main/) ist der Hauptzweig (deine „Live-Linie“ im Code).

## Lokal holen

1. Terminal öffnen.
2. Mit `cd` in den Ordner, wo das Projekt liegen soll.
3. [`git clone`](/glossar/clone/) + URL aus GitHub, fertig, Ordner da.

Bei einem **privaten** Repo verweigert GitHub oft den Zugriff, bis SSH-Keys eingerichtet sind ([Folge 017](/artikel/folge-017-github-ssh/)).

Der versteckte Ordner `.git` (unter Linux oft mit Strg+H sichtbar) ist das Tagebuch des Projekts, inklusive Adresse von **origin**.

## Cursor: Ordner auf, Agent an

{{repodoc path="docs/cursor/README.md" title="Cursor (KI)" description="IDE, Agenten und typische Workflows im Projekt."}}


**Open Folder**, dein geklonter Ordner. Typischer Start:

- `docs/` für Dokumentation.
- Dem [**Agenten**](/glossar/cursor-modi/) erzählen, was das Projekt ist (Ask, Agent, Plan: [Folge 008](/artikel/folge-008-cursor-modi/)): Lern-Website mit **KI**, **GitHub**, **Cloudflare**; statische Astro-Seiten; Artikel mit Bildern und eingebetteten Videos (YouTube/Vimeo); Glossar; später [**CMS**](/glossar/cms/) ([**Sveltia**](/glossar/sveltia/). Redaktion im Browser, speichert trotzdem in Git; Setup in [Folge 013](/artikel/folge-013-sveltia-pat/)).
- Regeln aufschreiben: Texte/Doku auf Deutsch, Code auf Englisch, Commits/Issues auf Deutsch, **keine Secrets** ins öffentliche Repo (auch gelöschte Dateien bleiben in der [**History**](/glossar/git-history/)). Wie du mit [Issues](/artikel/folge-002-github-issues/) arbeitest, kommt in Folge 002.

Repo umbenannt? URL auf GitHub ändert sich — lokal Remote in `.git/config` anpassen. **Save Project As** speichert deinen Cursor-Workspace, damit Chats nicht jedes Mal weg sind.

## Commit, Push, gitignore

In **Source Control** siehst du Änderungen. **Commit** = Stand lokal festhalten. **Push** = hoch zu GitHub. Wenn Push blockiert oder zwei Ordner im Spiel sind: [Folge 006](/artikel/folge-006-git-push-pull/).

Nur für dich: z. B. `.code-workspace` in **`.gitignore`**, dann wandert die Datei nicht mit ins Repo.

## Merksatz

**GitHub** = zentrale Wahrheit. **Lokal** = Werkstatt. **Astro** = Bäckerei für HTML. **Cloudflare** = Schaufenster im Internet ([Folge 011](/artikel/folge-011-cloudflare-setup/) zeigt die Einrichtung). Den Rest füllen wir in den nächsten Schritten auf.

<!-- Quelle: 2026-10-03--01-04-26--obs-screencast - hautoo - intro.txt -->
