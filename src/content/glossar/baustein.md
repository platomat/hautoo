---
title: Baustein (Block)
status: published
modifiedDate: 2026-10-04
definition: Wiederverwendbarer CMS-Inhalt ohne eigene URL, eingebunden per {{block id="slug"}} in Seiten, Artikeln oder anderen Bausteinen.
relatedArticles:
  - folge-020-bausteine-fork
---

Bausteine liegen unter `src/content/blocks/` und heißen in Sveltia **Bausteine**. Ein Eintrag kann Markdown, Bilder und weitere Embeds enthalten. Änderst du den Baustein einmal, gilt das überall, wo `{{block id="…"}}` steht. Beispiele: [Stack-Übersicht](/assets/stack-uebersicht-invert.webp) als `stack-uebersicht`, Kontakt über `{{contact-email}}` auf Impressum und Datenschutz. Einführung: [Folge 020](/artikel/folge-020-bausteine-fork/).
