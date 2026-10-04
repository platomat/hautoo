---
title: "Folge 003: Erstes Outfit: Ubuntu, Dark Mode und ein Footer, der nicht nervt"
summary: "Schrift rein, Farben festlegen, Breakpoints setzen. Plus die goldene Regel: committen ja, pushen nur, wenn du es wirklich willst."
pubDate: 2026-10-03T02:16:51Z
modifiedDate: 2026-10-04
status: published
tags:
  - design
  - css
  - cursor
  - astro
seo:
  index_visibility: index
  follow_visibility: follow
---

Jetzt wird’s hübsch. **Design** heißt hier: Dateien und Regeln, die der Agent pflegt, und du siehst das mit [`npm run dev`](/glossar/npm/) quasi live mit.

## Ubuntu einbinden (ohne Font-Drama)

1. Auf [fonts.google.com](https://fonts.google.com) **Ubuntu** wählen, hier **300** (Light) für Text, **500** (Medium) für Überschriften (600 gab’s in der Familie nicht).
2. ZIP laden, nur die `.ttf`, die du brauchst.
3. [transfonter.org](https://transfonter.org) → **woff/woff2** fürs Web.
4. Dem Agenten die Dateien geben: „Bitte einbinden und committen.“

In der Design-Doku siehst du die Palette: dunkler Hintergrund, heller Text (nicht Knallweiß), **grüne Action-Farbe**, gedämpfte Muted-Töne.

## Terminal-Kniffe

- `npm run dev`. Vorschau an.
- **Strg+C**: stoppen (im Terminal ist Strg+C nicht Kopieren!).
- Pfeil **hoch**, letzter Befehl nochmal.

Baut der Agent während der Server läuft, kann die Vorschau hüpfen — kurz stoppen, warten, neu starten.

## Regeln, die du wirklich willst

Schreib sie in Doku und `.cursor/rules`:

1. **Niemals von allein pushen.** Commits lokal sind okay. [**Push**](/glossar/push/) nur auf Anweisung, sonst baut [**Cloudflare**](/glossar/cloudflare-pages/) einen Zwischenstand live.
2. **CSS nicht jedes Mal neu erfinden**: bestehende Klassen und Tokens nutzen.
3. **Page Speed:** Wichtiges [**CSS**](/glossar/css/) früh (critical: Menü, Kopf der Seite); Rest später (non-critical), sonst springt das Layout und Google schmunzelt nicht.

## Seiten, Menü, Footer

Per Issue kamen **Pages** (Start, Über uns, Impressum …). Der **Footer** kriegt Copyright mit dynamischem Jahr (`2026` oder `2026 bis 2027`), Domain, Signatur.

**Impressum** und **Datenschutz** nicht ins Hauptmenü, unten rechts. Copyright links. Auf dem Handy: untereinander, zentriert.

## Issues = dein Projekt-Trello

Logo-Issue mit Label **Design**, Favicon **blocked by** Logo, GitHub-**Views** nur für Design-Tickets. Projektmanagement ohne Extra-Tool.

## Breakpoints (global merken)

| Name   | Grenze         |
|--------|----------------|
| Tablet | unter 1024 px  |
| Mobil  | unter 680 px   |

Im Browser: Entwicklertools, Breite schieben (360 px = grobes iPhone-Feeling).

Statische Astro-Seite: wenig Angriffsfläche, keine DB, schnell. „This is the way.“

<!-- Quelle: 2026-10-03--02-16-51--obs-screencast - hautoo - webseite - erstes design.txt -->
