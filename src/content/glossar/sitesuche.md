---
title: Sitesuche (MiniSearch)
status: published
modifiedDate: 2026-10-12
relatedTags:
- astro
definition: Volltextsuche im Header; der Index wird beim Build erzeugt, Suche läuft im Browser.
relatedArticles:
- folge-023-neue-features-demo-cms
seo:
  seo_title: Sitesuche (MiniSearch) · Glossar
  seo_description: 'Suche im Header auf hautuu: MiniSearch, statischer Index bei npm run build, Tastenkürzel Strg+K.'
---

Die **Sitesuche** im **Header** findet Texte auf der fertigen Website (Artikel, Seiten, Glossar, …). Technisch nutzt hautuu **MiniSearch**: beim [Build](/glossar/build/) erzeugt `scripts/build-search-index.mjs` die Datei `public/search/de.json` (Artefakt, nicht im Git). Im Browser durchsucht die Komponente `SiteSearch.astro` diesen Index; oft erreichbar mit **Strg+K** (Mac: **⌘+K**). Siehe [Astro-Doku im Repo](https://github.com/platomat/hautoo/blob/main/docs/astro/README.md#suche). Überblick: [Features](/features/#design-und-nutzung), [Folge 023](/artikel/folge-023-neue-features-demo-cms/).
