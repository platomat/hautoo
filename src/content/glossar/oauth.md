---
title: OAuth
status: published
modifiedDate: 2026-10-04
relatedTags:
- cloudflare
definition: Anmeldung über GitHub statt Copy-Paste-Token, oft mit Cloudflare Worker als Mittler.
seo:
  seo_title: OAuth · Glossar
  seo_description: Anmeldung über GitHub statt Copy-Paste-Token, oft mit Cloudflare Worker als Mittler. Client ID und Secret liegen als Umgebungsvariablen im Cloudflare Worker
---

Client ID und Secret liegen als [Umgebungsvariablen](/glossar/env/) im [Cloudflare Worker](/glossar/cloudflare-worker/); die Callback-URL muss exakt passen. Login läuft über [GitHub](/glossar/github/), Redaktion danach im [CMS](/glossar/cms/).
