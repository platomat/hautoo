---
title: CI/CD
status: published
modifiedDate: 2026-10-06
relatedTags:
- cloudflare
definition: Automatisches Bauen und Ausliefern nach jedem Push, inklusive Checks im Pull Request.
relatedArticles:
- folge-012-cloudflare-branches
- folge-014-sveltia-worker
- folge-016-artikel-pull-request
seo:
  seo_title: CI/CD · Glossar
  seo_description: Automatisches Bauen und Ausliefern nach jedem Push, inklusive Checks im Pull Request. Continuous Integration testet den Build; Continuous Deployment bringt main
---

**CI/CD** verbindet **[CI](/glossar/ci/)** (*Continuous Integration*) und **[CD](/glossar/cd/)** (*Continuous Deployment*): Nach jedem [Push](/glossar/push/) läuft der [Build](/glossar/build/), im [Pull Request](/glossar/pull-request/) siehst du Checks und Preview; nach [Merge](/glossar/merge/) auf [main](/glossar/main/) geht die Site live ([Deploy](/glossar/deploy/), [Cloudflare Pages](/glossar/cloudflare-pages/)). Statt Dateien per [FTP](/glossar/ftp/) hochzuladen, holt der Hoster den Stand aus [Git](/glossar/git/).

Die Abkürzungen **CI** und **CD** haben in Design-Kreisen andere Bedeutungen (*Corporate Identity*, *Corporate Design*) — siehe die eigenen Glossar-Einträge.

Kurz im Kontext CMS und Worker: [Folge 014](/artikel/folge-014-sveltia-worker/), Branches und Rollback: [Folge 012](/artikel/folge-012-cloudflare-branches/).
