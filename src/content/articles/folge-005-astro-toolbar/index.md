---
title: 'Folge 005: Die Astro-Leiste nervt? Breakpoints retten den Tag'
summary: Lokal siehst du Werkzeugkram, den Besucher nie sehen. Und du kannst der KI sagen „mehr Luft im Footer“, ohne CSS-Professor zu sein.
pubDate: 2026-10-03 23:23:55+00:00
modifiedDate: 2026-10-04
status: published
tags:
- astro
- css
- cursor
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 005: Die Astro-Leiste nervt? Breakpoints retten den Tag'
  seo_description: 'Die Astro Dev Toolbar lokal verstehen und mit Breakpoints Layout Probleme finden. Folge 005: Footer Abstand und Feintuning ohne CSS Profi zu sein.'
---

Kurze Folge, viel Praxis.

## Die Astro-Dev-Leiste

Mit [`npm run dev`](/glossar/npm/) klebt oft die **Astro-Dev-Toolbar**

{{repodoc path="docs/astro/README.md" title="Astro" description="Build, Dev-Server und Projektstruktur in der Doku."}}
 am Rand, nur bei dir, nicht live. Installation von Node/npm: [Folge 018](/artikel/folge-018-node-npm/). [**Astro**](/glossar/astro/) ist das Framework, das Markdown und Komponenten zu fertigem HTML für dein [**Frontend**](/glossar/frontend/) backt.

Stört sie? Einklappen, oder den Agenten fragen, wie du sie dauerhaft ausblendest. Besucher sehen sie nie.

## Breakpoints: einmal festlegen, überall nutzen
{{repodoc path="docs/design/README.md" title="Design & Erscheinungsbild" description="Breakpoints und Flex-Hilfsklassen nachschlagen."}}



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

Der Agent soll bestehende Klassen im Projekt nutzen, nicht bei jedem Prompt neues Inline-CSS erfinden. Deine **Page Speed** dankt’s dir. Fonts, Tokens und erster Look: [Folge 003](/artikel/folge-003-erstes-design/).

<!-- Quelle: 2026-10-03--23-23-55--obs-screencast - hautoo - astro bar, breakpoints, css fachchinesisch.txt -->
