---
title: Route
status: published
modifiedDate: 2026-10-06
relatedTags:
- astro
definition: Die Adresse eines Seitenpfads in der URL, bei Astro meist aus Dateien unter src/pages und aus Content Collections abgeleitet.
relatedArticles:
- folge-004-collection-pages
- folge-016-artikel-pull-request
- folge-019-impressum-komponenten
seo:
  seo_title: Route (URL-Pfad) · Glossar
  seo_description: Was eine Route in Astro ist, wie sie zur sichtbaren URL passt und wie hautuu Startseite, Artikel, Glossar und CMS-Seiten unter src/pages verbindet.
---

Eine **Route** ist der **Pfad in der Adresszeile**, unter dem eine Seite erreichbar ist, z. B. `/artikel/` oder `/glossar/astro/`. Besucher sehen das im [**Frontend**](/glossar/frontend/) als normale URL, technisch steckt dahinter die **Routing**-Logik von [**Astro**](/glossar/astro/).

Bei **hautuu** legen Dateien unter `src/pages/` fest, welche Pfade es gibt: die Startseite (`index.astro` → `/`), Artikel unter `/artikel/<slug>/`, Glossar unter `/glossar/<slug>/`, Tags unter `/tags/<slug>/`, das [CMS](/glossar/cms/) unter `/admin/`. CMS-**Seiten** aus der [Collection](/glossar/collection/) `pages` hängen am Catch-All `src/pages/[...slug].astro`, die URL kommt aus dem Seiten-Slug und optional `parent` im [Frontmatter](/glossar/frontmatter/) (z. B. `/faq/`). Der **Slug** im Ordner `src/content/articles/<slug>/` bestimmt den Artikelpfad.

Eine **[Preview-URL](/glossar/preview-url/)** ist dieselbe Site auf einem anderen [Branch](/glossar/branch/), oft mit gleichen Routen, aber anderer [Build](/glossar/build/). Redaktionell entscheidest du, **welche Route** welchen Inhalt zeigt, z. B. Listing auf der Route **Artikel** ([Folge 016](/artikel/folge-016-artikel-pull-request/), [Folge 019](/artikel/folge-019-impressum-komponenten/)). Überblick: [Folge 004](/artikel/folge-004-collection-pages/).
