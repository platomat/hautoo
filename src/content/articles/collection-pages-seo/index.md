---
title: "Collection Pages: Felder, Parent-URLs und SEO-Objekt"
summary: Was in config.yml und index.md steckt, wie verschachtelte URLs funktionieren und warum SEO nicht lose im Frontmatter hängen soll.
pubDate: 2026-10-03T23:00:06Z
modifiedDate: 2026-10-04
status: published
tags:
  - astro
  - sveltia
  - github
seo:
  index_visibility: index
  follow_visibility: follow
---

**Collections** sind Sammelbecken für Content-Typen. **Pages** sind statische Seiten wie Start, Über uns oder Impressum — keine Datenbank, nur Markdown-Dateien unter `src/content/pages/`.

## Sveltia-Config (`public/admin/config.yml`)

YAML beschreibt, was Redakteure im CMS sehen:

- Ordner, Slug, Felder (Titel, Beschreibung, Body, …).
- Früher: Menü-Flags an jeder Seite — im Projekt jetzt eigene **menus**-Collection (später ausgebaut).

Für Pages kam dazu:

- **`parent`** — Relation zu einer anderen Seite → URL wie `/ueber-uns/preise/` statt nur `/preise/`.

## Eine konkrete Seite

`src/content/pages/index/index.md` (Startseite):

- **Frontmatter** = ausgefüllte Felder aus dem Schema.
- **Body** = Markdown (Überschriften, Listen, Links).

Änderung speichern → Datei ändert sich → beim nächsten Build wird HTML daraus. Preview in der IDE zeigt ungefähr, was GitHub auch rendert.

## Articles & Tags (Ausblick)

**Articles** bekommen Tags (Hashtags), keine WordPress-Kategorien-Orgie. Verwandte Artikel könntest du per Relation verknüpfen — mit Tags reicht oft die thematische Nähe.

## SEO als wiederverwendbares Objekt

Statt überall lose `seo_title` zu kopieren: ein **SEO-Partial** (DRY = don’t repeat yourself) für Pages, Articles und später andere Collections.

Typische Schalter:

- **index / noindex** — z. B. Impressum und Datenschutz lieber **noindex**, damit Suchmaschinen den Legal-Kram nicht prominent listen.
- Meta-Titel und -Beschreibung getrennt vom sichtbaren Seitentitel.

Ideen fürs Backlog (im Video erwähnt): **Table of Contents** optional pro Seite/Artikel für lange Texte.

## Lokal vs. CMS

Jetzt noch Editor oder Markdown — später **Sveltia** unter `/admin/`. Die Regeln bleiben: gleiche Felder, gleiche Dateien, gleicher Git-Verlauf.

<!-- Quelle: 2026-10-03--23-00-06--obs-screencast - hautoo - collection-pages.txt -->
