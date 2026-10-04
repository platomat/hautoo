---
title: Backend
status: published
modifiedDate: 2026-10-04
relatedTags:
- cloudflare
- sveltia
definition: 'Alles hinter der sichtbaren Website: Speicher, Schnittstellen und kleine Server-Logik, nicht die HTML-Seiten selbst.'
seo:
  seo_title: Backend · Glossar
  seo_description: 'Alles hinter der sichtbaren Website: Speicher, Schnittstellen und kleine Server-Logik, nicht die HTML-Seiten selbst. hautuu hat kein klassisches'
---

hautuu hat **kein klassisches PHP/MySQL-Backend**. Inhalte liegen in **[Git](/glossar/git/)** auf [GitHub](/glossar/github/). **[Sveltia](/glossar/sveltia/)** unter `/admin/` ist die Redaktions-Oberfläche; in der Config heißt das Speicher-**backend** oft „GitHub“. Für Login ohne [PAT](/glossar/pat/) läuft ein [**Cloudflare Worker**](/glossar/cloudflare-worker/) als kleines Backend-Stück ([OAuth](/glossar/oauth/)). Das öffentliche [**Frontend**](/glossar/frontend/) bleibt statisch.
