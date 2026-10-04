---
title: "Folge 007: Merge oder Rebase: Warum die Historie manchmal lügt"
summary: "Nach dem Zusammenführen sieht’s im Tool oft leer aus. Auf GitHub steckt trotzdem alles drin. Kurz erklärt, ohne Git-Guru-Werbung."
pubDate: 2026-10-03T23:44:04Z
modifiedDate: 2026-10-04
status: published
tags:
  - github
seo:
  index_visibility: index
  follow_visibility: follow
---

Kurzer Nachtrag zum Experiment mit zwei Projektordnern ([Folge 006](/artikel/folge-006-git-push-pull/)).

## Was dich im Tool verwirrt

Nach einem [**Merge**](/glossar/merge/) kann der Graph so aussehen, als hättest du nur noch ein paar Commits. Die vielen Schritte davor stecken **im Merge-Commit** drin. Auf [**GitHub**](/glossar/github/) unter „Commits“ siehst du die Einzelteile weiter (im Video z. B. 21 Stück).

## Merge (dein Freund fürs Team)

```
main:     A --- B ------- M
               \         /
feature:        C - D - E
```

`M` fasst zusammen. Nachvollziehbar, robust.

## Rebase (die lineare Alternative)

[**Rebase**](/glossar/rebase/): Commits `C D E` würden **hinten an** `main` hängen, als wäre alles nacheinander passiert. Hübsch, aber: nicht rebasen, was andere schon gezogen haben.

## Was du wirklich brauchst

Stand ist gespeichert. Du kannst alte Dateiversionen ansehen („Copyright früher vs. jetzt“). Ob Merge oder Rebase. Geschmackssache. Mit KI-Agent reicht Merge + [**Pull**](/glossar/pull/) vor [**Push**](/glossar/push/). Branches und Preview vor dem Merge auf main: [Folge 012](/artikel/folge-012-cloudflare-branches/).

<!-- Quelle: 2026-10-03--23-44-04--obs-screencast - hautoo - github - merge, rebase.txt -->
