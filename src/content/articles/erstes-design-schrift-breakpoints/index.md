---
title: "Erstes Design: Ubuntu, dunkles Theme und responsive Footer"
summary: Schriften lokal einbinden, Farben festlegen, Footer und Breakpoints — und warum der Agent nicht von selbst pushen soll.
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

Jetzt wird’s sichtbar: **Design** ist keine Magie, sondern Regeln + Dateien, die der Agent pflegt — und die du in `npm run dev` live mitbekommst.

## Ubuntu von Google Fonts ins Projekt

1. Gewünschte Schnitte auf [fonts.google.com](https://fonts.google.com) wählen (hier: **300** Light für Fließtext, **500** Medium für Überschriften — 600 gab’s in der gewählten Familie nicht).
2. ZIP laden, nur die benötigten `.ttf` nehmen.
3. Mit [transfonter.org](https://transfonter.org) nach **woff/woff2** konvertieren (Web-Format).
4. Dem Agenten die Dateien geben: „Bitte einbinden und committen.“

In der **Design-Doku** siehst du die Palette in der Markdown-Preview: dunkler Hintergrund, heller Text (nicht reines Schwarz/Weiß), **grüne Action-Farbe**, gedämpfte Muted-Töne.

## Dev-Server und Terminal-Kniffe

- `npm run dev` startet die Vorschau.
- **Strg+C** bricht ab (im Terminal ist Strg+C nicht „Kopieren“ — dafür oft Strg+Shift+C).
- Pfeil **hoch** = letzter Befehl wiederholen.

Wenn der Agent während des Dev-Servers umbaut, kann die Vorschau kurz zicken — dann Server stoppen, Änderungen fertig machen, neu starten.

## Wichtige Agenten-Regeln

Zwei Dinge unbedingt in Doku und `.cursor/rules` festhalten:

1. **Niemals von allein pushen** — Commits lokal ja, Push nur wenn du es sagst. Sonst baut Cloudflare einen Zwischenstand live.
2. **CSS nicht ständig neu erfinden** — vorhandene Tokens/Klassen nutzen, gemeinsame Utilities pflegen.
3. **Page Speed:** Critical CSS (Header, Hero, Menü) früh laden; seltener Kram als **non-critical** nachladen — sonst „springt“ das Layout und Suchmaschinen meckern.

## Pages, Menü, Footer

Per Issue wurden **Pages** angelegt (Start, Über uns, Impressum, …). Der **Footer** bekommt eine Copyright-Zeile (Jahr dynamisch: `2026` oder `2026–2027`, …), Domain und Signatur.

**Impressum** und **Datenschutz** nicht ins Hauptmenü — die gehören unten rechts, Copyright links; auf Mobil untereinander und zentriert.

## GitHub-Issues als Projektmanagement

- Neues Issue „Logo erstellen“, Label **Design**, Meilenstein „Phase 2“.
- Folge-Issue „Favicon“ mit **blocked by** Logo — klassisches PM.
- **Views** in GitHub: z. B. nur offene Design-Issues anpinnen.

## Breakpoints (global)

| Name   | Grenze        | Typisch |
|--------|---------------|---------|
| Tablet | unter 1024 px | Layout-Umschaltungen |
| Mobil  | unter 680 px  | Footer stapelt, Menü wird Burger (später) |

Im Browser: **Entwicklertools** → responsives Design, Breiten testen (z. B. 360 px iPhone).

Statische Astro-Seite = wenig Angriffsfläche, keine DB — schnell und robust. „This is the way.“

<!-- Quelle: 2026-10-03--02-16-51--obs-screencast - hautoo - webseite - erstes design.txt -->
