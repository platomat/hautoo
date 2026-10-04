---
title: "Folge 005: Die Astro-Leiste nervt? Breakpoints retten den Tag"
summary: "Lokal siehst du Werkzeugkram, den Besucher nie sehen. Und du kannst der KI sagen „mehr Luft im Footer“, ohne CSS-Professor zu sein."
pubDate: 2026-10-03T23:23:55Z
modifiedDate: 2026-10-04
status: published
tags:
  - astro
  - css
  - cursor
seo:
  index_visibility: index
  follow_visibility: follow
---

Kurze Folge, viel Praxis.

## Die Astro-Dev-Leiste

Mit [`npm run dev`](/glossar/npm/) klebt oft die **Astro-Dev-Toolbar** am Rand, nur bei dir, nicht live. [**Astro**](/glossar/astro/) ist das Framework, das Markdown und Komponenten zu fertigem HTML backt.

Stört sie? Einklappen, oder den Agenten fragen, wie du sie dauerhaft ausblendest. Besucher sehen sie nie.

## Breakpoints: einmal festlegen, überall nutzen

Im Projekt:

- **Tablet:** unter 1024 px  
- **Mobil:** unter 680 px  

Einmal gesagt, gilt’s fürs Menü, den Footer, was auch immer. Test: Entwicklertools, Breite ziehen. Unter [**680 px**](/glossar/breakpoint/) fühlt sich das Layout anders an.

## Klartext statt Fachchinesisch

Du musst nicht „padding“ sagen. **„Im Footer bitte mehr Abstand links und rechts zum Browserrand“** reicht oft. Klarer formuliert = weniger Korrekturrunden.

Wenn du’s genau willst:

- [**Padding**](/glossar/css/): Innenabstand.
- **Margin**: Abstand nach außen.
- **Border-Radius**: runde Ecken.

Der Agent soll bestehende Klassen im Projekt nutzen, nicht bei jedem Prompt neues Inline-CSS erfinden. Deine **Page Speed** dankt’s dir.

<!-- Quelle: 2026-10-03--23-23-55--obs-screencast - hautoo - astro bar, breakpoints, css fachchinesisch.txt -->
