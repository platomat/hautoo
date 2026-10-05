---
title: 'Folge 007: Merge oder Rebase: Warum die Historie manchmal lügt'
summary: Nach dem Zusammenführen sieht’s im Tool oft leer aus. Auf GitHub steckt trotzdem alles drin. Kurz erklärt, ohne Git-Guru-Werbung.
pubDate: 2026-10-03 23:44:04+00:00
modifiedDate: 2026-10-04
status: published
tags:
- github
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 007: Merge oder Rebase: Warum die Historie manchmal lügt'
  seo_description: Nach Merge oder Rebase wirkt die Historie im Tool oft leer, auf GitHub liegt trotzdem alles. Folge 007 erklärt den Unterschied ohne Git Guru Werbung.
---

Kurzer Nachtrag zum Experiment mit zwei Projektordnern ([Folge 006](/artikel/folge-006-git-push-pull/)).

## Was dich im Tool verwirrt

Nach einem [**Merge**](/glossar/merge/) kann der Graph so aussehen, als hättest du nur noch ein paar [Commits](/glossar/commit/). Die vielen Schritte davor stecken **im Merge-Commit** drin. Auf [**GitHub**](/glossar/github/) unter „Commits“ siehst du die Einzelteile weiter, oft ein langer Stapel.

## Merge (dein Freund fürs Team)

```
main:     A --- B ------- M
               \         /
feature:        C - D - E
```

`M` fasst zusammen. Nachvollziehbar, robust.

## Rebase (die lineare Alternative)

[**Rebase**](/glossar/rebase/): Commits `C D E` würden **hinten an** [`main`](/glossar/main/) hängen, als wäre alles nacheinander passiert. Hübsch, aber: nicht [rebase](/glossar/rebase/)n, was andere schon gezogen haben.

## Was du wirklich brauchst

Stand ist gespeichert. Du kannst alte Dateiversionen ansehen („Copyright früher vs. jetzt“). Ob [Merge](/glossar/merge/) oder Rebase. Geschmackssache. Mit KI-Agent reicht Merge + [**Pull**](/glossar/pull/) vor [**Push**](/glossar/push/). [Branches](/glossar/branch/) und Preview vor dem Merge auf `main`: [Folge 012](/artikel/folge-012-cloudflare-branches/).

{{repodoc path="docs/github/README.md" title="GitHub" description="Merge, Historie und Zusammenarbeit auf GitHub."}}

<!-- Quelle: 2026-10-03--23-44-04--obs-screencast - hautoo - github - merge, rebase.txt -->
