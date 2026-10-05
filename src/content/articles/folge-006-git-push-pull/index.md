---
title: 'Folge 006: Zwei Ordner, ein GitHub: Pull, Push und kein Datenmüll'
summary: Warum der Server manchmal „nein“ sagt, bevor du pushen darfst. Und wie Klonen und Merge dich wieder einen Stand bringen.
pubDate: 2026-10-03 23:28:46+00:00
modifiedDate: 2026-10-04
status: published
tags:
- github
- cursor
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 006: Zwei Ordner, ein GitHub: Pull, Push und kein Datenmüll'
  seo_description: Warum Push manchmal abgelehnt wird und wie Pull, Clone und Merge dich wieder auf einen Stand bringen. Git Alltag mit zwei Projektordnern in Folge 006.
---

[Git](/glossar/git/) klingt erst nach Kauderwelsch. Wird aber easy, wenn du eine Idee akzeptierst: [**GitHub**](/glossar/github/) ist der Boss, dein Rechner ist die Werkstatt.

## Nochmal klonen

Der Ordnername auf der Festplatte ist [Git](/glossar/git/) egal, zählt nur `.git` drin.

Die `git …`-Beispiele unten tippst du im [Terminal](/glossar/terminal/). [**Git**](/glossar/git/) ist die [CLI](/glossar/cli/) dafür.

- [`git clone`](/glossar/clone/) `<url>`, neuer Unterordner. Private [Repos](/glossar/repository/) und [SSH](/glossar/ssh-key/): [Folge 017](/artikel/folge-017-github-ssh/).
- `git clone <url> .`. **in den aktuellen Ordner** (Punkt = hier).

Praktisch, wenn du einen frischen Stand willst, während du in einem anderen Ordner experimentiert hast.

## Zwei Ordner, eine Wahrheit

{{repodoc path="docs/github/README.md" title="GitHub" description="Push, Pull und Branch-Logik im Projekt."}}



Aus dem Video:

1. **Ordner A:** Du arbeitest, [pushst](/glossar/push/) nicht.
2. **Ordner B:** Frischer [Clone](/glossar/clone/) vom Server.
3. [**Push**](/glossar/push/) aus A. [GitHub](/glossar/github/) ist aktuell.
4. In B legst du `test.txt` an, willst pushen → **Geht nicht.** Server ist neuer. Erst **[`git pull`](/glossar/pull/)**.

**[Pull](/glossar/pull/)** holt Remote-Änderungen. Oft kommt ein [**Merge**](/glossar/merge/) — Git klebt Historien zusammen. Verschiedene Dateien? Meist kein Stress. Dieselbe Datei an beiden Enden? Du entscheidest, welche Zeilen bleiben.

In [Cursor](/glossar/cursor/) kannst du Änderungen verwerfen oder Dateien **revert**en, musst nicht jeden Git-Befehl auswendig kennen.

## Merge vs. Rebase (Teaser)

- **[Merge](/glossar/merge/):** sichtbarer [Merge](/glossar/merge/)-[Commit](/glossar/commit/), ehrliche Verzweigung.
- **[Rebase](/glossar/rebase/):** lineare Historie, etwas fummeliger.

Für den Start: **Merge** reicht. [**Rebase**](/glossar/rebase/) macht die Historie linear, ist aber kniffeliger, nur anfassen, wenn du weißt, warum. Vertiefung mit Grafiken: [Folge 007](/artikel/folge-007-merge-rebase/).

## Keine Geheimnisse in Git

Gelöschte Dateien? Bleiben in der [**History**](/glossar/git-history/). Öffentliches [Repo](/glossar/repository/)? Jeder kann lesen. Also: keine Passwörter, keine Keys.

<!-- Quelle: 2026-10-03--23-28-46--obs-screencast - hautoo - github - repository, pushes, pulls.txt -->
