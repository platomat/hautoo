---
title: Lokales Repository (CMS)
status: published
modifiedDate: 2026-10-12
relatedTags:
- sveltia
- cms
definition: 'Sveltia-Login-Modus: CMS arbeitet direkt mit dem Projektordner auf deinem Rechner statt nur über GitHub online.'
relatedArticles:
- folge-024-github-template-privat
- folge-013-sveltia-pat
seo:
  seo_title: Lokales Repository (CMS) · Glossar
  seo_description: 'Lokales Repository bei Sveltia: Projektordner wählen, /admin/ mit Chromium. Vor Cloudflare-Worker oder für schnelles Testen.'
---

**Lokales Repository** (englisch im Login: **local repository**) ist eine **Anmeldungs-Option** in [Sveltia](/glossar/sveltia/) `/admin/`: du gibst den **Projektordner** auf deinem Rechner an, den du mit [`git clone`](/glossar/clone/) geholt hast. Speichern schreibt Dateien lokal; danach [Commit](/glossar/commit/) und [Push](/glossar/push/) wie gewohnt.

Nutze **Chromium** oder **Chrome** (nicht Firefox) für das lokale CMS, wie in [Folge 013](/artikel/folge-013-sveltia-pat/). Praktisch, wenn der [Cloudflare Worker](/glossar/cloudflare-worker/) für dein neues Repo noch fehlt oder du **Einstellungen** live ausprobieren willst ([`npm run dev`](/glossar/npm/)). [Folge 024](/artikel/folge-024-github-template-privat/), [Folge 018](/artikel/folge-018-node-npm/).
