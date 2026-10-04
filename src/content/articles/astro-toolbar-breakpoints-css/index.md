---
title: "Astro-Dev-Leiste, Breakpoints und CSS in Klartext"
summary: Die Astro-Toolbar nur lokal, globale Breakpoints und warum du Margin nicht auswendig lernen musst.
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

Kurze Folge, viele praktische Häkchen.

## Die Astro-Leiste (Dev Toolbar)

Während `npm run dev` siehst du oft die **Astro-Dev-Toolbar** am Rand — nur lokal, nicht auf der Live-Seite. Sie hilft beim Debuggen (Astro ist das Framework, das deine Dateien zu HTML „backt“).

- Stört sie? Einklappen oder den Agenten fragen, wie du sie dauerhaft ausblendest.
- Live-Besucher sehen das nie.

## Breakpoints global nutzen

Im Projekt gelten u. a.:

- **Tablet:** unter 1024 px  
- **Mobil:** unter 680 px  

Einmal definiert, kannst du überall sagen: „Ab Tablet soll das Menü zum Burger werden“ — nicht nur im Footer, sondern sitewide.

Testen: Browser-Entwicklertools, Breite schieben (679 px vs. 680 px macht den Unterschied).

## Mit der KI ohne Fachchinesisch

Du musst nicht „margin“ oder „padding“ sagen. **„Innenabstand zum Browserrand links und rechts im Footer größer“** reicht oft. Trotzdem: Je klarer die Beschreibung, desto weniger Runden.

Wenn du es präzise willst:

- **Padding** — Innenabstand innerhalb eines Elements.
- **Margin** — Abstand nach außen zum Nachbarn.
- **Border-Radius** — abgerundete Ecken.

Der Agent mappt Klartext auf die bestehenden CSS-Klassen und Tokens im Projekt — bitte nicht jedes Mal neues Inline-Zeug erfinden (Page Speed!).

<!-- Quelle: 2026-10-03--23-23-55--obs-screencast - hautoo - astro bar, breakpoints, css fachchinesisch.txt -->
