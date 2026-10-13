---
title: Demo
description: Übersicht aller Markdown-Elemente und Content-Komponenten von hautuu.
status: published
publishDate: 2026-10-04
modifiedDate: 2026-10-11
parent: features
hero:
  borderBottom: false
toc:
  show: true
  title: Inhalt
  levels:
    - h2
    - h3
background:
  image: /assets/brayden-law-kTQ1m-vTOsg-unsplash.webp
  overlay: 88
  attribution: Photo by <a href="https://unsplash.com/@braydenlaw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Brayden Law</a> on <a href="https://unsplash.com/photos/people-dining-at-neon-city-restaurant-kTQ1m-vTOsg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
layout:
  contentWidth: wide
seo:
  seo_title: Demo · Markdown und Komponenten
  seo_description: Demo-Seite mit Überschriften, Text, Links, Bildern und allen CMS-Content-Komponenten von hautuu.
  index_visibility: index
  follow_visibility: follow
  noarchive: false
  noimageindex: false
  nosnippet: false
  max_snippet_enabled: true
  max_snippet: -1
  max_video_preview_enabled: true
  max_video_preview: -1
  max_image_preview_enabled: true
  max_image_preview: large
---

Diese Seite zeigt **Markdown** und die **Content-Komponenten** aus der Sveltia-Toolbar. Parent ist [Features](/features/); URL: `/features/demo/`.

## Markdown: Text und Inline

Normaler Absatz mit **fett**, _kursiv_, **_beidem_** und `inline code`. Interner Link zum [Glossar](/glossar/), externer Link zu [GitHub](https://github.com/platomat/hautoo/).

> Blockzitat: so sieht ein Zitat im Fließtext aus.

### Aufzählungen

- Ungeordnet Punkt eins
- Punkt zwei mit [Link](/artikel/)
- Punkt drei

1. Geordnet erster Schritt
2. Zweiter Schritt
3. Dritter Schritt

### Codeblock

```js
const greeting = "Hallo hautuu";
console.log(greeting);
```

### Tabelle (Markdown)

| Spalte A | Spalte B |
| --- | --- |
| Zeile 1 | Wert |
| Zeile 2 | Wert |

## Überschriften H2 bis H6

### H3 Unterabschnitt

#### H4 Unterabschnitt

##### H5 Unterabschnitt

###### H6 Unterabschnitt

Text unter H6.

## Bild

![Stack-Übersicht - Bausteine im Überblick](/assets/stack-uebersicht-invert.webp)

## Buttons

{{button label="Solid Aktion" href="/features/"}}

{{button label="Outline" href="/artikel/" style="outline"}}

{{button label="Extern" href="https://github.com/platomat/hautoo/" target="_blank"}}

### Button-Gruppe

Nebeneinander, auf schmalen Viewports untereinander (`layout="stack-mobile"`):

{{button-group items="Mehr erfahren|/features/|solid|action|_self||Artikel|/artikel/|outline|action|_self||GitHub|https://github.com/platomat/hautoo/|outline|border|_blank"}}

Immer untereinander, zentriert:

{{button-group items="Primär|/features/|solid|action|_self||Sekundär|/faq/|outline|action|_self" layout="stack" align="center"}}

Mit voller Breite auf Mobile (`fullWidthMobile="true"`):

{{button-group items="Primär|/features/|solid|action|_self||Sekundär|/faq/|outline|action|_self" fullWidthMobile="true"}}

## Logo

{{logo variant="header" width="120" unit="px" align="left"}}

## Trennlinie und Abstand

{{separator height="1" width="100"}}

{{spacer height="24"}}

## Trennlinie mit Logo (links)

{{separator height="1" width="100" mark="logo" markAlign="left" markSize="42"}}

## Trennlinie mit Logo (mittig)

{{separator height="1" width="100" mark="logo" markSize="42"}}

## Trennlinie mit Logo (mittig, kurz & dick)

{{separator height="3" width="66" mark="logo" markSize="42"}}

## Trennlinie mit Logo (rechts)

{{separator height="1" width="100" mark="logo" markAlign="right" markSize="42"}}

## Trennlinie mit Favicon (links)

{{separator height="1" width="100" mark="favicon" markAlign="left"}}

## Trennlinie mit Favicon (mittig)

{{separator height="1" width="100" mark="favicon"}}

## Trennlinie mit Favicon (rechts)

{{separator height="1" width="100" mark="favicon" markAlign="right"}}

## Kontakt-E-Mail

{{contact-email}}

## Repo-Dokument

{{repodoc path="docs/github/README.md" title="GitHub" description="Kurzüberblick zur Doku im Repo."}}

## Baustein

{{block id="stack-uebersicht"}}

## Listings

### Artikel-Listing

{{article-listing count="2" sort="newest" layout="grid" columns="2" gap="1.25" show="displayTitle,displayIntro,displayCategories,displayTags,displayDate,displayReadingTime"}}

### Kategorie-Listing

{{category-listing count="4" sort="title-asc" layout="grid" columns="2" gap="1.25"}}

### Tag-Listing

{{tag-listing count="6" sort="title-asc" layout="grid" columns="3" gap="1"}}

### Tagwolke

{{tag-cloud}}

### Autoren-Listing

{{author-listing}}

### Glossar-Listing

{{glossar-listing count="4" sort="title-asc" layout="grid" columns="2" gap="1.25"}}

## Video

Consent-Facade (YouTube-Beispiel, Big Buck Bunny):

{{video provider="youtube" id="aqz-KE-bpKQ" title="Demo-Video"}}

### Video-Freischaltung widerrufen

Nach dem Abspielen speichert der Browser die Einwilligung lokal (`localStorage`). Mit dem Button darunter kannst du sie wieder löschen; danach erscheint die Consent-Facade erneut.
