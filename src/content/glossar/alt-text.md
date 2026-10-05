---
title: Alt-Text
status: published
modifiedDate: 2026-10-06
relatedTags:
- design
definition: Kurzbeschreibung eines Bildes für Screenreader und wenn das Bild nicht lädt.
relatedArticles:
- folge-021-bilder-suchen-nutzen
seo:
  seo_title: Alt-Text · Glossar
  seo_description: Kurzbeschreibung eines Bildes für Screenreader und wenn das Bild nicht lädt. Informativ beschreiben, dekorativ oft leer lassen. Mehr im Glossar auf hautuu.
---

Der **Alt-Text** (Alternativtext) steht im HTML-Attribut `alt`. **Screenreader** lesen ihn vor; er hilft auch, wenn das Bild fehlt.

- **Informativ:** Was siehst du, was der Text nicht schon sagt? („Screenshot des [CMS](/glossar/cms/)-Feldes Hintergrundbild“).
- **Dekorativ:** Nur Stimmung, kein Extra-Inhalt → oft `alt=""`, damit Leserhilfen nichts Unnötiges vorlesen. So machen wir reine Vollbild-Hintergründe in `PageBackground.astro`.

Im [**CMS**](/glossar/cms/) bei Bildern im Artikeltext Alt-Text setzen, wenn das Bild Inhalt trägt. Mehr Kontext: [Folge 021](/artikel/folge-021-bilder-suchen-nutzen/).
