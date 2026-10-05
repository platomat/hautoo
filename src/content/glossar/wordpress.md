---
title: WordPress
status: published
modifiedDate: 2026-10-06
relatedTags:
- astro
- sveltia
definition: Verbreitetes CMS mit Themes und Plugins, meist mit PHP und einer Datenbank auf dem Server.
relatedArticles:
- folge-002-github-issues
- folge-004-collection-pages
seo:
  seo_title: WordPress · Glossar
  seo_description: Was WordPress ist und warum hautuu stattdessen auf statische Astro-Seiten, Git und Sveltia setzt, ohne WordPress-Datenbank auf dem Server.
---

**WordPress** ist ein weit verbreitetes **[CMS](/glossar/cms/)**: Inhalte pflegst du im Browser, auf dem Server laufen meist **PHP** und eine [**Datenbank**](/glossar/datenbank/) (oft MySQL). Themes und Plugins erweitern die Site.

**hautuu** nutzt das **nicht** als Live-Stack. Inhalte liegen als Dateien in [Git](/glossar/git/), [**Astro**](/glossar/astro/) baut beim [**Build**](/glossar/build/) statisches HTML, [Cloudflare Pages](/glossar/cloudflare-pages/) liefert es aus. Redaktion optional über [Sveltia](/glossar/sveltia/) im Browser, Speichern = [Commit](/glossar/commit/) ([**Backend**](/glossar/backend/) ist [GitHub](/glossar/github/), kein WordPress-MySQL). Bausteine fühlen sich **WordPress-ähnlich** an, landen aber in [Git](/glossar/git/) ([Glossar Baustein](/glossar/baustein/), [Folge 020](/artikel/folge-020-bausteine-fork/)). Einstieg: [Folge 002](/artikel/folge-002-github-issues/), [FAQ](/faq/).
