---
title: Repo-Dokument
status: published
modifiedDate: 2026-10-12
relatedTags:
- cms
definition: Toolbar-Embed mit Link zu einer Markdown-Datei unter docs/ im GitHub-Repo.
relatedArticles:
- folge-023-neue-features-demo-cms
seo:
  seo_title: Repo-Dokument · Glossar
  seo_description: 'Repo-Dokument (repodoc): Hinweisbox im Inhalt mit Link zu Projekt-Doku auf GitHub, z. B. docs/astro/README.md.'
---

Ein **Repo-Dokument** ist ein **Embed** in Seiten oder Artikeln: `{{repodoc path="docs/…" title="…" description="…"}}`. Es zeigt eine **Hinweisbox** mit Link zur Datei im [Repository](/glossar/repository/) auf GitHub (Branch `main`), z. B. README-Dateien unter `docs/` für How-tos neben der Website.

In [Sveltia](/glossar/sveltia/) heißt der Toolbar-Button **Repo-Dokument** (`public/admin/editor-components.js`). Sinnvoll für Leser, die tiefer in die **Projekt-Doku** springen wollen, ohne den Pfad zu kennen. Demo: [Features/Demo](/features/demo/). [Folge 023](/artikel/folge-023-neue-features-demo-cms/).
