---
title: Backend
status: published
modifiedDate: 2026-10-04
definition: "Alles hinter der sichtbaren Website: Speicher, Schnittstellen und kleine Server-Logik, nicht die HTML-Seiten selbst."
---

hautuu hat **kein klassisches PHP/MySQL-Backend**. Inhalte liegen in **Git** auf GitHub. **Sveltia** unter `/admin/` ist die Redaktions-Oberfläche; in der Config heißt das Speicher-**backend** oft „GitHub“. Für Login ohne PAT läuft ein [**Cloudflare Worker**](/glossar/cloudflare-worker/) als kleines Backend-Stück (OAuth). Das öffentliche [**Frontend**](/glossar/frontend/) bleibt statisch.
