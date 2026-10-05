---
title: CSS-Variable
status: published
modifiedDate: 2026-10-06
relatedTags:
- css
- design
relatedArticles:
- folge-003-erstes-design
- folge-008-cursor-modi
definition: Benannte Werte im CSS (Farben, Abstände, Schrift), einmal zentral definiert und überall wiederverwendet.
seo:
  seo_title: CSS-Variable · Glossar
  seo_description: Benannte Werte im CSS für Farben, Abstände und Schrift. hautuu legt sie in global.css ab, z. B. --color-action oder --bp-mobile. Mehr im Glossar auf hautuu.
---

**[CSS](/glossar/css/)-Variablen** (im Fachjargon auch *custom properties*) sind Platzhalter im Stylesheet: Du gibst einem Wert einen Namen wie `--color-action` oder `--shell-padding-inline` und nutzt ihn später mit `var(--color-action)` an vielen Stellen.

Bei hautuu stehen die zentralen Variablen in `src/styles/global.css` unter `:root`. So bleiben Farben, Abstände und Schrift **einheitlich**, auch wenn das Menü auf dem Handy anders aufgebaut ist als auf dem Desktop (siehe [CSS](/glossar/css/) und [Breakpoints](/glossar/breakpoint/)). Grenzwerte wie `--bp-mobile` liegen dort mit; in `@media`-Regeln werden die passenden Pixelwerte direkt gesetzt.
