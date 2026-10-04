---
title: "hautuu starten: GitHub, Cursor und die grobe Ritmi"
summary: Vom leeren Repository bis zum ersten Push — so legst du das Projekt an und gibst der KI den richtigen Kontext.
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

Willkommen in Folge eins. Hier geht’s nicht um Programmieren im Kopf, sondern um den **Ablauf**: Wo liegt die „Quelle der Wahrheit“, wie holst du sie auf deinen Rechner und wie redet Cursor mit dem Rest der Welt?

## Neues Repository auf GitHub

Auf GitHub legst du ein **Repository** an — sozusagen der Ordner in der Cloud, in dem später alles versioniert liegt.

- **Name:** klein schreiben, Wörter mit Bindestrich (z. B. `hautuu`), keine Leerzeichen.
- **Public vs. private:** Bei hautuu ist das Repo **öffentlich**, damit andere mitlesen und lernen können. Geheimes bleibt draußen — nur du entscheidest, was rein darf.
- **README:** GitHub schlägt dir nach dem Anlegen erste Befehle vor (`git init`, erste Commit-Message, `remote` setzen, `push`). Du kannst den Block auch einfach kopieren und im Terminal ausführen.

**Git** ist das Versionswerkzeug: Jeder **Commit** ist ein festgehaltener Stand. **Push** schiebt deine Commits zu GitHub; **Origin** ist der Name für dieses Remote-Repository, **main** der Hauptzweig (früher oft `master`).

## Lokal klonen und arbeiten

1. Terminal öffnen (unter Linux z. B. mit der Tastenkombination für „Run“ + Terminal suchen).
2. Mit `cd` in den Ordner gehen, in dem das Projekt liegen soll (Rechtsklick → Pfad kopieren hilft).
3. `git clone` mit der Repository-URL — dann liegt ein Projektordner bei dir.

Der versteckte Ordner `.git` (unter Linux oft mit Strg+H sichtbar) enthält die Konfiguration — darin steht auch, wohin **origin** zeigt.

## Erste Schritte in Cursor

In **Cursor** öffnest du den Projektordner (**Open Folder**). Typischer Start:

- Ordner `docs/` für Dokumentation anlegen.
- Dem **Agenten** in normaler Sprache erklären, worum es geht: Dokumentation für Menschen, die mit **KI**, **GitHub** und **Cloudflare** eine statische **Astro**-Website bauen; Artikel mit Text, Bildern und eingebetteten Videos (YouTube/Vimeo); Glossar; später ein **CMS** (Sveltia).
- **Regeln** festhalten: UI/Doku auf Deutsch, Code-Kommentare und Identifier auf Englisch, Commits und GitHub-Issues auf Deutsch, **keine Secrets** ins öffentliche Repo (auch gelöschte Dateien bleiben in der History).

Wenn du das Repository umbenennst, ändert sich die GitHub-URL — lokal musst du ggf. die Remote-URL in `.git/config` anpassen und den Ordner umbenennen. **Workspace speichern** (`Save Project As`) hilft, Chats und Einstellungen beim nächsten Öffnen wiederzufinden.

## Commit, Source Control und Push

Cursor zeigt geänderte Dateien in der **Source-Control**-Ansicht (ähnlich wie Git in der IDE). **Commit** = Stand lokal festhalten; **Push** = zu GitHub hochladen.

Wichtig für später: Dateien, die nur auf deinem Rechner leben sollen (z. B. `.code-workspace`), kommen in **`.gitignore`** — dann werden sie beim Push nicht mitgeschickt.

## Was als Nächstes passiert

In den nächsten Folgen gehen wir Issues, Design, Cloudflare und das CMS durch. Hier reicht der Überblick: **GitHub** = zentrale Wahrheit, **lokal** = wo du mit Cursor bastelst, **Astro** = baut statische Seiten, **Cloudflare** = hostet später das Ergebnis.

<!-- Quelle: 2026-10-03--01-04-26--obs-screencast - hautoo - intro.txt -->
