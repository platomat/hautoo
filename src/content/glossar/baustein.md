---
title: Baustein (Block)
status: published
modifiedDate: 2026-10-04
definition: Wiederverwendbarer CMS-Inhalt ohne eigene URL, eingebunden per {{block id="slug"}} in Seiten, Artikeln oder anderen Bausteinen.
relatedArticles:
- folge-020-bausteine-fork
seo:
  seo_title: Baustein (Block) · Glossar
  seo_description: Wiederverwendbarer CMS-Inhalt ohne eigene URL, eingebunden per {{block id="slug"}} in Seiten, Artikeln oder anderen Bausteinen. Bausteine liegen unter
---

Bausteine liegen unter `src/content/blocks/` und heißen in [Sveltia](/glossar/sveltia/) **Bausteine**. Ein Eintrag kann [Markdown](/glossar/markdown/), Bilder und weitere Embeds enthalten. Änderst du den Baustein einmal, gilt das überall, wo `{{block id="…"}}` steht. Beispiele: [Stack-Übersicht](/assets/stack-uebersicht-invert.webp) als `stack-uebersicht`, Kontakt über `{{contact-email}}` auf Impressum und Datenschutz. Einführung: [Folge 020](/artikel/folge-020-bausteine-fork/).
