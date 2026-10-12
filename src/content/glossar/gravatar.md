---
title: Gravatar
status: published
modifiedDate: 2026-10-12
relatedTags:
- cms
definition: 'Zentraler Avatar-Dienst: ein Profilbild pro E-Mail, das viele Websites nachladen.'
relatedArticles:
- folge-023-neue-features-demo-cms
seo:
  seo_title: Gravatar · Glossar
  seo_description: Gravatar verknüpft ein Bild mit deiner E-Mail. Auf hautuu optional im Autor-Feld Gravatar (E-Mail oder URL) statt lokalem Avatar.
---

**Gravatar** (Global Recognized Avatar) ist ein Dienst von Automattic. Du legst unter [gravatar.com](https://gravatar.com/) **ein Bild** zu **deiner E-Mail** an. Viele Blogs und [CMS](/glossar/cms/)-Systeme (z. B. WordPress-Kommentare) fragen bei derselben E-Mail automatisch dieses Bild ab.

Auf hautuu trägst du in **Autoren** optional **Gravatar (E-Mail oder URL)** ein (`gravatarUrl` in `public/admin/config.yml`): E-Mail (Hash für Gravatar) oder direkte `https`-Bild-URL. **Avatar** aus der Mediathek hat **Vorrang**. Beim [Build](/glossar/build/) kann Gravatar nach `src/assets/authors/gravatar/` geladen werden.

**Datenschutz:** Die E-Mail (oder ihr Hash) kann an Gravatar-Server gehen; für maximale Kontrolle lieber ein **lokales Avatar**-Bild. Mehr Kontext: [Folge 023](/artikel/folge-023-neue-features-demo-cms/).
