---
title: "Merge vs. Rebase: Historie im Git-Graph"
summary: Warum nach einem Merge plötzlich weniger Commits sichtbar wirken — und wann Rebase hübscher wäre.
pubDate: 2026-10-03T23:44:04Z
modifiedDate: 2026-10-04
status: published
tags:
  - github
seo:
  index_visibility: index
  follow_visibility: follow
---

Kurzer Nachtrag zum Git-Experiment mit zwei Ordnern.

## Was du im Tool siehst

Nach einem **Merge** kann die lokale Graph-Ansicht so aussehen, als hättest du nur noch wenige Commits — die vielen Feature-Commits stecken **im Merge-Commit** drin. Auf **GitHub** unter „Commits“ siehst du weiterhin die einzelnen Schritte (z. B. 21 Stück).

## Merge (Standard)

```
main:     A --- B ------- M
               \         /
feature:        C - D - E
```

`M` fasst alles zusammen. Nachvollziehbar, sicher für Teams.

## Rebase (alternative)

Deine Commits `C D E` würden **hinten an** `main` angehängt, als wären sie nacheinander passiert — schön lineär, aber man darf nicht rebasen, was andere schon gezogen haben (sonst Chaos).

## Praxis für hautuu

Hauptsache: Stand ist festgehalten, du kannst alte Versionen von Dateien ansehen („Copyright früher vs. jetzt“). Ob Merge oder Rebase ist Geschmack — für Laien mit KI-Agent reicht **Merge + Pull vor Push**.

<!-- Quelle: 2026-10-03--23-44-04--obs-screencast - hautoo - github - merge, rebase.txt -->
