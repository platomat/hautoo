---
title: "GitHub Issues: Tickets, Meilensteine und die große Grafik"
summary: So hältst du mit Issues den Überblick, lässt die KI abarbeiten und verstehst, wie GitHub, Cursor und Cloudflare zusammenhängen.
pubDate: 2026-10-03T01:35:20Z
modifiedDate: 2026-10-04
status: published
tags:
  - github
  - cursor
  - cloudflare
  - astro
seo:
  index_visibility: index
  follow_visibility: follow
---

GitHub ist nicht nur Speicher für Code — es ist auch dein **Projektbüro**. **Issues** sind Tickets: Bugs, Ideen, Features. **Meilensteine** gruppieren sie (z. B. „Version 1 – Setup“). **Labels** helfen beim Filtern (Documentation, Design, …).

## Zusammenarbeit und Pull Requests

Du kannst fremde Projekte **forken** (Kopie unter deinem Account), ändern und einen **Pull Request** (PR) an den Originalautor schicken — der entscheidet, ob er deine Änderungen übernimmt. Oder du arbeitest allein im eigenen Repo. Issues funktionieren in beiden Welten gleich.

## Workflow mit Cursor

Statt jedes Mal alles neu zu erklären, sagst du z. B.:

> Bitte Issue #1 umsetzen.

Der Agent liest Titel und Kommentare (bei **öffentlichen** Repos auch ohne extra Login — aber Vorsicht: Jeder kann den Code und die History lesen, also **nie Passwörter oder Tokens** committen).

In Commit-Messages kannst du Issues verknüpfen (`Fixes #1`, `Closes #1`, `Refs #2`). GitHub schließt das Ticket dann automatisch oder verlinkt die Commits — praktisch für die Nachvollziehbarkeit.

## Die Bausteine-Grafik (sinngemäß)

Kurz die Kette:

1. **Cursor** — du bearbeitest lokal, commit & push.
2. **GitHub** — zentrale Quelle der Wahrheit.
3. **Cloudflare** — merkt Änderungen und **baut** die Site mit Astro.
4. **Sveltia CMS** — später: manuelle Textkorrekturen im Browser, landen wieder in Git.
5. **Astro** — erzeugt schnelle statische HTML-Seiten (kein WordPress, keine Datenbank auf dem Server).

## Issues anlegen und zerlegen

Beispiel: „Astro Collections erstellen“. Die KI kann **Sub-Issues** vorschlagen (Pages, Articles, Tags, …). So siehst du Fortschritt („0 von 4“) statt eines monolithischen Monsters.

Vor der Umsetzung klärt der Agent oft Fragen — z. B.:

- **CMS-Zugang:** später PAT oder GitHub-Login (kommt in eigenen Folgen).
- **Direkt auf `main` speichern** vs. Pull Request — beim einfachen Setup: Speichern geht direkt auf `main` → Cloudflare baut sofort neu (Vorteil: simpel; Nachteil: jeder Klick kann live gehen).
- **Medien:** „Variante B“ — Bilder liegen neben dem Content-Eintrag, Astro kann optimieren (Page Speed).

## Lokal testen vor dem großen Push

- `npm install` — holt Abhängigkeiten (passiert auch auf Cloudflare beim Build).
- `npm run dev` — Vorschau auf dem Rechner, ohne die Live-Seite zu berühren.

Wenn Cloudflare schon verbunden ist: **Push = Build**. Deshalb pusht der Agent bei euch nur **auf Anweisung** (siehe Projektregeln).

## Ausblick Design & Cloudflare

In derselben Session ging es schon um dunkles Theme, grüne Action-Farbe, Ubuntu-Schrift — und dass man Features lieber als Issues festhält als nur im Chat. Cloudflare-Doku kommt in einer eigenen Folge.

<!-- Quelle: 2026-10-03--01-35-20--obs-screencast - hautoo - github - issues.txt -->
