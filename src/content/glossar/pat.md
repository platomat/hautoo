---
title: Personal Access Token (PAT)
status: published
modifiedDate: 2026-10-04
relatedTags:
  - github
definition: Persönlicher Zugangsschlüssel für die GitHub-API, z. B. fürs CMS ohne Browser-Login.
---

Ein PAT verhält sich wie ein Passwort auf [GitHub](/glossar/github/): nur einmal sichtbar beim Erzeugen, minimal nötige Rechte, bei Leak sofort widerrufen. [Sveltia](/glossar/sveltia/) nutzt ihn fürs [CMS](/glossar/cms/); alternativ [OAuth](/glossar/oauth/) über einen [Cloudflare Worker](/glossar/cloudflare-worker/).
