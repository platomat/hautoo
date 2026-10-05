---
title: Production
status: published
modifiedDate: 2026-10-06
relatedTags:
- cloudflare
definition: Live-Umgebung (Produktion), die Besucher im Browser sehen; bei hautuu meist der main-Branch auf Cloudflare Pages.
relatedArticles:
- folge-011-cloudflare-setup
- folge-012-cloudflare-branches
seo:
  seo_title: Production · Glossar
  seo_description: Live-Umgebung auf Cloudflare Pages, meist main-Branch. Unterschied zu Preview-URL und Test-Zweigen. Was nach Push auf main für Besucher sichtbar wird.
---

**Production** (Produktion) ist die **Live**-Version deiner Site: die Adresse, die normale Besucher öffnen, nicht eine temporäre Test-URL.

Bei hautuu ist Production in [Cloudflare Pages](/glossar/cloudflare-pages/) oft an den [Branch](/glossar/branch/) **[`main`](/glossar/main/)** gekoppelt (**Production branch** in den Pages-Einstellungen). Ein [Push](/glossar/push/) dorthin startet [Build](/glossar/build/) und [Deploy](/glossar/deploy/) auf die Production-Umgebung. Experimente laufen besser auf anderen Zweigen mit [Preview-URL](/glossar/preview-url/), bevor du auf `main` [mergst](/glossar/merge/).
