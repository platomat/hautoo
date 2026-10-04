---
title: "Folge 006: Zwei Ordner, ein GitHub: Pull, Push und kein Datenmüll"
summary: "Warum der Server manchmal „nein“ sagt, bevor du pushen darfst. Und wie Klonen und Merge dich wieder einen Stand bringen."
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

Git klingt erst nach Kauderwelsch. Wird aber easy, wenn du eine Idee akzeptierst: **GitHub** ist der Boss, dein Rechner ist die Werkstatt.

## Nochmal klonen

Der Ordnername auf der Festplatte ist Git egal, zählt nur `.git` drin.

- `git clone <url>`, neuer Unterordner.
- `git clone <url> .`. **in den aktuellen Ordner** (Punkt = hier).

Praktisch, wenn du einen frischen Stand willst, während du in einem anderen Ordner experimentiert hast.

## Zwei Ordner, eine Wahrheit

Aus dem Video:

1. **Ordner A:** Du arbeitest, pushst nicht.
2. **Ordner B:** Frischer Clone vom Server.
3. Push aus A. GitHub ist aktuell.
4. In B legst du `test.txt` an, willst pushen → **Geht nicht.** Server ist neuer. Erst **`git pull`**.

**Pull** holt Remote-Änderungen. Oft kommt ein **Merge** — Git klebt Historien zusammen. Verschiedene Dateien? Meist kein Stress. Dieselbe Datei an beiden Enden? Du entscheidest, welche Zeilen bleiben.

In Cursor kannst du Änderungen verwerfen oder Dateien **revert**en, musst nicht jeden Git-Befehl auswendig kennen.

## Merge vs. Rebase (Teaser)

- **Merge:** sichtbarer Merge-Commit, ehrliche Verzweigung.
- **Rebase:** lineare Historie, etwas fummeliger.

Für den Start: **Merge** reicht. **Rebase** macht die Historie linear, ist aber kniffeliger, nur anfassen, wenn du weißt, warum.

## Keine Geheimnisse in Git

Gelöschte Dateien? Bleiben in der **History**. Öffentliches Repo? Jeder kann lesen. Also: keine Passwörter, keine Keys.

<!-- Quelle: 2026-10-03--23-28-46--obs-screencast - hautoo - github - repository, pushes, pulls.txt -->
