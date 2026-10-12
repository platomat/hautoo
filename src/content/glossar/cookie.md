---
title: Cookie
status: published
modifiedDate: 2026-10-12
relatedTags:
- cms
definition: 'Kleine Textdatei, die eine Website über den Browser speichern kann; wird bei passenden Anfragen oft an den Server mitgeschickt.'
relatedArticles:
- folge-023-neue-features-demo-cms
seo:
  seo_title: Cookie · Glossar
  seo_description: 'Cookie erklärt: Speicher im Browser, oft mit Ablaufdatum, wird mit HTTP-Anfragen mitgesendet. Unterschied zu localStorage auf hautuu bei Video-Consent.'
---

Ein **Cookie** (HTTP-Cookie) ist ein **kleiner Texteintrag**, den eine Website über den Browser auf dem Gerät des Besuchers ablegen kann. Beim nächsten Besuch **derselben Domain** sendet der Browser das Cookie bei vielen Anfragen **automatisch mit** an den Server ([MDN: HTTP-Cookies](https://developer.mozilla.org/de/docs/Web/HTTP/Guides/Cookies)).

Typisch sind **Name**, **Wert**, optional **Ablaufdatum** und Flags wie **Secure** oder **HttpOnly**. Cookies eignen sich z. B. für Login-Sessions oder Statistik; in der **Datenschutzerklärung** erwähnst du sie, wenn du sie nutzt.

**hautuu und Video-Consent:** Die site-weite YouTube/Vimeo-Freigabe liegt **nicht** in einem Cookie, sondern in [`localStorage`](/glossar/localstorage/) (Schlüssel `hautuu-video-consent`, siehe `src/lib/video-consent.ts`). Mehr: [Consent](/glossar/consent/), [Folge 023](/artikel/folge-023-neue-features-demo-cms/).
