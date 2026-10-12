---
title: localStorage
status: published
modifiedDate: 2026-10-12
relatedTags:
- cms
definition: Kleiner Speicher im Browser für Einstellungen einer Website, nur auf diesem Gerät.
relatedArticles:
- folge-023-neue-features-demo-cms
seo:
  seo_title: localStorage · Glossar
  seo_description: localStorage speichert Daten im Browser. hautuu nutzt es für die site-weite Video-Einwilligung nach dem ersten Klick.
---

**localStorage** ist ein **Speicher im Browser** auf dem Gerät des Besuchers. Die Website kann dort kleine Textwerte ablegen, die beim nächsten Besuch **derselben Domain** noch da sind ([MDN: Window.localStorage](https://developer.mozilla.org/de/docs/Web/API/Window/localStorage)).

Auf hautuu merkt sich `localStorage` unter dem Schlüssel `hautuu-video-consent`, ob YouTube/Vimeo-Videos **site-weit** freigeschaltet wurden, damit nicht jedes Embed neu bestätigt werden muss. Das ist keine [Datenbank](/glossar/datenbank/) auf dem Server. Widerruf über das Embed **Video-Freischaltung widerrufen**. Mehr: [Consent](/glossar/consent/), [Folge 023](/artikel/folge-023-neue-features-demo-cms/).
