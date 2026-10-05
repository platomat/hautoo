---
title: Breakpoint
status: published
modifiedDate: 2026-10-06
relatedTags:
- design
- css
definition: Bildschirmbreite, ab der das Layout umschaltet, z. B. Handy-Ansicht unter 680 px.
seo:
  seo_title: Breakpoint · Glossar
  seo_description: Bildschirmbreite, ab der das Layout umschaltet. hautuu nutzt Mobil unter 680 px (max-width 679 px) und Tablet unter 1024 px. CSS-Variablen --bp-mobile und --bp-tablet in global.css.
---

Ein **Breakpoint** ist die Schwelle, an der sich das Layout ändert, z. B. vom breiten Desktop-Menü zum Burger-Menü.

Bei hautuu gilt für Mobil: **679 Pixel Breite und weniger** (`max-width: 679px` im CSS). Der Kommentar zur [CSS-Variable](/glossar/css-variable/) `--bp-mobile: 680px` bedeutet: Viewport **schmaler als 680 px** → Handy-Regeln. Für Tablet: schmaler als 1024 px (`--bp-tablet`, Media Query `max-width: 1023px`). [CSS](/glossar/css/) Media Queries reagieren auf diese Grenzen.
