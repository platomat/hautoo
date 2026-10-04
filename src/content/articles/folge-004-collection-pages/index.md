---
title: 'Folge 004: Seiten sind nur Dateien und trotzdem schlau strukturiert'
summary: Was in der CMS-Config steckt, warum Unterseiten wie Ordner funktionieren und SEO lieber einmal definiert wird statt zwanzigmal copy-paste.
pubDate: 2026-10-03 23:00:06+00:00
modifiedDate: 2026-10-04
status: published
tags:
- astro
- sveltia
- github
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 004: Seiten sind nur Dateien und trotzdem schlau strukturiert'
  seo_description: Pages als Markdown, Collections in Astro und SEO Felder einmal zentral pflegen. Folge 004 erklärt die CMS Struktur von hautuu für Einsteiger.
---

Keine Datenbank, kein WordPress-Monster: **Pages** sind normale Markdown-Dateien unter `src/content/pages/`. [**Collections**](/glossar/collection/) sind die Typen: Pages, Articles, Menüs, Tags, Glossar, **Bausteine** (`blocks`). Warum Issues dafür sinnvoll sind: [Folge 002](/artikel/folge-002-github-issues/). Bausteine im Alltag: [Folge 020](/artikel/folge-020-bausteine-fork/).

## Was `config.yml` macht

In `public/admin/config.yml` steht in **YAML** (strukturierte Textdatei), was Redakteure im CMS sehen: Titel, Beschreibung, Body, …

Früher hing das Menü an jeder Seite, bei hautuu gibt’s eine eigene **menus**-Collection. Für Pages kam hinzu:

- **`parent`**: Verweis auf eine übergeordnete Seite → URL wie `/ueber-uns/preise/` statt flach `/preise/`.

## Eine Seite angucken

`src/content/pages/index/index.md` = Startseite.

- Oben [**Frontmatter**](/glossar/frontmatter/) = ausgefüllte Felder.
- Darunter **Body** = [**Markdown**](/glossar/markdown/).

Du speicherst → Datei ändert sich → beim Build wird HTML. In der IDE-**Preview** siehst du ungefähr, was GitHub auch rendert.

## Articles & Tags (kurz)

**Articles** kriegen **Tags** wie Hashtags, keine Kategorien-Wüste. Verwandte Artikel per Extra-Feld wäre möglich; Tags reichen oft.

## SEO: einmal definieren

Statt überall lose Felder zu kopieren: ein **SEO-Objekt** für mehrere Collections (**DRY** = don’t repeat yourself).

Praktisch:

- **index / noindex**: Impressum & Datenschutz oft **noindex**, damit Google nicht den Legal-Text als Hauptinhalt feiert.
- Tab-Titel und Meta-Beschreibung getrennt vom sichtbaren Seitentitel.

Backlog-Idee aus dem Video: optionales **Inhaltsverzeichnis** oben bei langen Texten.

## Editor heute, CMS morgen

Jetzt tippst du Markdown oder lässt Cursor schreiben, später [**Sveltia**](/glossar/sveltia/) unter `/admin/` ([Folge 013](/artikel/folge-013-sveltia-pat/) zeigt PAT und ersten Login). Gleiche Felder, gleiche Dateien, gleiche Git-**History**.

<!-- Quelle: 2026-10-03--23-00-06--obs-screencast - hautoo - collection-pages.txt -->
