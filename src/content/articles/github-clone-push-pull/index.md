---
title: "Git lokal: Klonen, Push, Pull und Merge"
summary: Zwei Ordner, ein Repository — warum Pull vor Push Pflicht ist und was bei Konflikten passiert.
pubDate: 2026-10-03T23:28:46Z
modifiedDate: 2026-10-04
status: published
tags:
  - github
  - cursor
seo:
  index_visibility: index
  follow_visibility: follow
---

Git klingt erst wie Kauderwelsch — wird aber logisch, sobald du **eine** Quelle der Wahrheit akzeptierst: **GitHub** (Server) vs. **lokal** (dein Rechner).

## Nochmal klonen

Der Ordnername auf der Festplatte ist egal für Git — entscheidend ist der Inhalt von `.git`. Du kannst:

- `git clone <url>` — legt einen neuen Unterordner an.
- `git clone <url> .` — klont in den **aktuellen** Ordner (Punkt = hier).

Praktisch, wenn du einen frischen Stand vom Server willst, während du in einem anderen Ordner experimentiert hast.

## Zwei Entwickler, eine Wahrheit

Szenario aus dem Video:

1. **Ordner A:** Du arbeitest, pushst nicht.
2. **Ordner B:** Frischer Clone vom Server.
3. Du pushst aus A — GitHub ist aktuell.
4. In B erstellst du `test.txt`, willst pushen → **Fehler**: Server ist neuer. Erst **`git pull`**.

**Pull** holt die Remote-Änderungen. Oft endet das in einem **Merge** — Git fügt Historien zusammen. Kein Konflikt, wenn ihr verschiedene Dateien touched habt; bei derselben Datei musst du entscheiden, welche Zeilen bleiben.

In Cursor/Source Control: Änderungen verwerfen, einzelne Dateien „revert“ — geht auch per UI statt nur per Kommandozeile.

## Merge vs. Rebase (Teaser)

- **Merge:** Erzeugt einen Merge-Commit — Historie zeigt die Verzweigung.
- **Rebase:** Reiht Commits neu an — lineare Historie, etwas fiddeliger.

Für den Einstieg reicht **Merge**. Rebase kommt in der nächsten Mini-Folge.

## Sicherheit

Alles in Git bleibt in der **History** — auch gelöschte Dateien. Keine Passwörter, keine API-Keys. Öffentliches Repo = jeder kann lesen.

<!-- Quelle: 2026-10-03--23-28-46--obs-screencast - hautoo - github - repository, pushes, pulls.txt -->
