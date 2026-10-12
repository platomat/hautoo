---
title: Mediathek
status: published
modifiedDate: 2026-10-12
relatedTags:
- cms
- sveltia
definition: Bild- und Datei-Auswahl im CMS; Uploads landen im Projekt unter src/assets, nicht als riesige Videos im Git-Repo.
relatedArticles:
- folge-023-neue-features-demo-cms
seo:
  seo_title: Mediathek · Glossar
  seo_description: 'Mediathek in Sveltia: Bilder für Logo, Favicon, Avatar und Inhalte. Große Videos gehören nach R2, nicht in die Mediathek fürs Repo.'
---

Die **Mediathek** ist die **Datei-Galerie** im [CMS](/glossar/cms/) ([Sveltia](/glossar/sveltia/)): du lädst Bilder hoch oder wählst vorhandene Dateien für Felder wie **Avatar**, **Logo**, **Favicon** oder Hero-Bilder. Bei hautuu liegen die Dateien im Projekt unter `src/assets/` (siehe `media_folder` in `public/admin/config.yml` und [Medien Variante B](https://github.com/platomat/hautoo/blob/main/docs/sveltia/medien-variante-b.md) im Repo).

**Nicht alles in die Mediathek:** sehr große **Videos** sollen **nicht** ins [GitHub](/glossar/github/)-[Repo](/glossar/repository/). Dafür nutzt du [Cloudflare R2](/glossar/cloudflare-r2/) und die **Video-Basis-URL**. Kleine Poster-Bilder können in der Mediathek bleiben. [Folge 023](/artikel/folge-023-neue-features-demo-cms/).
