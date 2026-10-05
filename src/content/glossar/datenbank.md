---
title: Datenbank
status: published
modifiedDate: 2026-10-06
relatedTags:
- astro
- github
definition: Strukturierter Speicher für viele Datensätze (oft DB genannt); bei hautuu ersetzt Git die klassische Site-Datenbank.
relatedArticles:
- folge-002-github-issues
- folge-004-collection-pages
seo:
  seo_title: Datenbank (DB) · Glossar
  seo_description: Was eine Datenbank (DB) ist, wie WordPress sie nutzt und warum hautuu Inhalte in Git statt in einer Server-Datenbank hält.
---

Eine **Datenbank** (**DB**) speichert Daten **strukturiert** (Tabellen, Abfragen). Klassische [CMS](/glossar/cms/) wie [**WordPress**](/glossar/wordpress/) halten Texte und Einstellungen oft in einer DB auf dem Server; jeder Seitenaufruf kann die DB anfragen.

Bei **hautuu** liegt die „Wahrheit“ in **[Git](/glossar/git/)** auf [GitHub](/glossar/github/): [Markdown](/glossar/markdown/)-Dateien, kein MySQL für die öffentliche Site. [**Astro**](/glossar/astro/) erzeugt beim [**Build**](/glossar/build/) fertiges HTML ([**Frontend**](/glossar/frontend/)); Besucher bekommen **statische** Dateien von [Cloudflare Pages](/glossar/cloudflare-pages/), nicht dynamisch aus einer DB zusammengebaut. Das [**CMS**](/glossar/cms/) schreibt ebenfalls in Dateien ([Commit](/glossar/commit/)), siehe [Folge 004](/artikel/folge-004-collection-pages/) und [Backend](/glossar/backend/).
