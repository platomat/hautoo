---
title: 'Folge 009: Cursor-Abo: Balken, Tokens und warum On-Demand bösartig teuer ist'
summary: Du siehst, was die KI frisst. Und wann Auto reicht oder du lieber kurz upgradest, statt die Kreditkarte heiß laufen zu lassen.
pubDate: 2026-10-04 00:05:52+00:00
modifiedDate: 2026-10-04
status: published
tags:
- cursor
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 009: Cursor-Abo: Balken, Tokens und warum On-Demand bösartig teuer ist'
  seo_description: 'Cursor Usage verstehen: Token Verbrauch, Auto Modus und wann ein Upgrade sinnvoller ist als On Demand. Folge 009 zu Kosten und Kontrolle beim KI Coding.'
---

KI frisst Rechenzeit. Bei **[Cursor](/glossar/cursor/)** siehst du das unter Account → **Usage**.

## Die Balken verstehen

- Verschiedene Pläne (im Video z. B. 20 $/60 $, check aktuelle Preise auf cursor.com).
- **Composer / Auto:** Alltag, frisst ein Kontingent pro Periode.
- **Stärkere Modelle** („Thinking“, großes **Kontextfenster**): extra Budget, wenn Auto zu lasch ist.
- **Kontextfenster** = wie viel Text/Code das Modell auf einmal „im Kopf“ hat. Größer = mehr **Tokens** = teurer.

## Cloud Agents vs. lokal

[**Cloud Agents**](/glossar/cloud-agent/) laufen nicht auf deiner CPU. Du startest eine Aufgabe, am Ende oft ein [**Pull Request**](/glossar/pull-request/) auf [GitHub](/glossar/github/). Workflow mit Transkripten und PR: [Folge 015](/artikel/folge-015-transkript-artikel/) und [Folge 016](/artikel/folge-016-artikel-pull-request/). Praktisch, aber **deutlich mehr Tokens** als lokal ein kleines Skript laufen lassen.

## On-Demand: Finger weg, wenn’s geht

{{repodoc path="docs/cursor/README.md" title="Cursor (KI)" description="Abo, Usage und Kosten im Überblick."}}


Paket leer? **On-Demand** nachkaufen geht, im Video: drei Mini-Aufgaben, schon übler Preis. Besser: kurz **upgraden** oder bis zur neuen Periode warten.

Im Dashboard siehst du Tokens pro Anfrage — 40-Millionen-Monster sind möglich, wenn du halb das [Repo](/glossar/repository/) reinwirfst.

## VM & Grok (optional)

Wasilij nutzt manchmal eine **[virtuelle Maschine](/glossar/vm/)**, abgeschottet vom Haupt-PC. Spezial-Agenten (Audit, Bugfix, nochmal Audit) erzeugen [Issues](/glossar/issue/). Geht auch mit **zwei normalen Chats** und klaren Rollen, ohne Extra-Hardware ([Folge 010](/artikel/folge-010-cursor-chats/)).

**Grok** in Cursor kann ab höheren Plänen relevant sein, im Account nachsehen, ob du’s brauchst.

<!-- Quelle: 2026-10-04--00-05-52--obs-screencast - hautoo - cursor - account, usage, grok-bot.txt -->
