---
title: Weiterleitung
status: published
modifiedDate: 2026-10-12
relatedTags:
- github
- route
definition: Alte URL dauerhaft auf eine neue Adresse umleiten, z. B. nach Umbenennung einer Seite.
relatedArticles:
- folge-023-neue-features-demo-cms
seo:
  seo_title: Weiterleitung · Glossar
  seo_description: URL-Weiterleitungen in Sveltia, Build erzeugt Cloudflare _redirects. Mehrere Quellpfade, ein Ziel, z. B. 301 von /ueber-uns/ zum Autorenprofil.
---

Eine **Weiterleitung** leitet Besucher von einer **alten** URL auf ein **neues** Ziel um (z. B. nach Umbenennung oder Löschen einer Seite).

Bei hautuu pflegst du das in [Sveltia](/glossar/sveltia/) unter Collection **Weiterleitungen** (`src/content/redirects/`): mehrere **Quellpfade** (vom Root `/` an), ein **Ziel**, Status **301** (dauerhaft) oder **302**. Beim [Build](/glossar/build/) landet das in `public/_redirects` für [Cloudflare Pages](/glossar/cloudflare-pages/). Beispiel im Repo: `/ueber-uns/` → `/autoren/wasilij/`. Anleitung: [Folge 023](/artikel/folge-023-neue-features-demo-cms/).
