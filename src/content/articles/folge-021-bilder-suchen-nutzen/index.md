---
title: 'Folge 021: Bilder finden, schlank machen und auf der Site einbinden'
summary: Kostenlose Quellen mit Lizenz im Blick, WebP und sinnvolle Breite vor dem Upload, Ablage in Assets oder am Artikel und was Astro beim Build noch optimiert.
pubDate: 2026-10-05 00:28:15+00:00
modifiedDate: 2026-10-07
status: published
tags:
- design
- astro
- sveltia
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 021: Bilder finden, schlank machen und einbinden'
  seo_description: Stock-Bilder mit Lizenz, WebP und Größe vor dem Upload, Medien in Sveltia und Astro-Optimierung. Folge 021 für schnelle Seiten mit schönen Hintergründen.
---

Schöne Fotos machen eine Site lebendig. Gleichzeitig sind **schwere Dateien** der häufigste Bremsklotz bei **Page Speed** (Ladezeit und mobile Nutzung). In dieser Folge: **wo** du legale Bilder findest, **wie** du sie vor dem Upload verkleinerst und **wo** sie in hautuu landen. Hintergründe und Nachweise kennst du schon aus [Folge 003](/artikel/folge-003-erstes-design/) und [Folge 019](/artikel/folge-019-impressum-komponenten/). Bausteine und Medienordner: [Folge 020](/artikel/folge-020-bausteine-fork/).

## Kostenlose Bildquellen (und die Fallen)

Beliebte **Stock**-Seiten mit gratis Downloads (Stand der Plattform-Regeln, immer die aktuelle **Lizenz** auf der Seite lesen):

| Quelle | Kurz |
| --- | --- |
| [Pixabay](https://pixabay.com/service/license/) | Kostenlose Nutzung laut [Pixabay License](https://pixabay.com/service/license/); **gesponserte** Treffer oben/unten sind oft **kostenpflichtig** (Filter nutzen, nicht blind klicken). |
| [Unsplash](https://unsplash.com/license) | [Unsplash License](https://unsplash.com/license): frei für viele private und kommerzielle Nutzungen; **Unsplash+** (Schloss-Symbol) ist **nicht** der gratis Download. Namensnennung ist **erwünscht**, aber laut [Hilfe](https://help.unsplash.com/en/articles/2612337-do-i-have-to-give-credit-to-a-contributor-when-i-use-their-image) nicht zwingend. |
| [Pexels](https://www.pexels.com/license/) | [Pexels License](https://www.pexels.com/license/): ähnlich Stock-Nutzung ohne Account-Pflicht für viele Motive. |
| [Freepik](https://www.freepik.com/legal/terms-of-use) | Viele Motive nur mit „Attribution“ (Namensnennung) oder im „Premium“-Abo; Filter „Free“ (Kostenlos) / „License“ (Lizenz) und „AI generated“ (KI-generiert) bewusst setzen. |

**Praxis:** Motiv gefällt dem Kunden, du merkst erst beim Download: kostet. Deshalb vorher Lizenz und Preislabel checken. KI-generierte Bilder kannst du oft per Filter ausblenden, wenn du echte Fotos willst.

## Größe und Format vor dem Upload

Startseiten-Hintergrund zuerst **1920 px** breit als JPEG (~470 KB), für ein dekoratives Vollbild ohne Details reicht oft weniger.

**Faustregeln:**

- **Breite:** Für Hintergründe und Hero oft **1280 px** (manchmal 1024 px), nicht immer volle 4K-Datei hochladen.
- **Format:** [**WebP**](/glossar/webp/) statt JPEG/PNG für Fotos im Web (kleinere Datei bei ähnlicher Optik). In **gThumb**: „Resize“ (Größe ändern, z. B. 1280 px), dann **Speichern unter** (**Strg+Shift+S**), Format WebP, Qualität oft **80 %**. In **GIMP**: „Image“ (Bild) → „Scale Image“ (Bild skalieren), Export **Strg+Shift+E**, Metadaten im Dialog weglassen wenn möglich.
- **Ziel:** Unter **~100 KB** pro dekoratives Hintergrundbild anpeilen, wenn es geht (Motiv und Qualität entscheiden mit).

Beispiel aus der Session: 1920 px JPEG ~470 KB → 1280 px **WebP** ~91 KB. Weitere Motive ähnlich geschnitten. Tools wie [**MAT2**](https://0xacab.org/jvoisin/mat2) (Metadata Anonymisation Toolkit) können **Metadaten** entfernen; die Dateigröße ändert sich manchmal nur wenig, trotzdem sinnvoll vor Veröffentlichung.

## In Sveltia einbinden und ersetzen

Geteilte Motive (Startseite, FAQ, Glossar): in `/admin/` die Medienbibliothek („Media“ / „Library“) → Upload landet unter `src/assets/`. Nur für **einen** Artikel: **Variante B**, Bild neben `index.md` ([Folge 004](/artikel/folge-004-collection-pages/)).

{{repodoc path="docs/sveltia/medien-variante-b.md" title="Medien — Variante B" description="Bilder neben dem Content-Eintrag und Astro image()."}}

Im [CMS](/glossar/cms/): **Seiten** oder **Artikel** → Hintergrundbild in der Medienbibliothek wählen; optimierte Datei per „Replace“ (Ersetzen) nachlegen (Bild öffnen, „Replace“, Datei reinziehen). **Abdunkelung (%)** und **Bildnachweis** nicht vergessen ([Folge 019](/artikel/folge-019-impressum-komponenten/)).

## Was Astro noch macht

hautuu wandelt Hintergründe beim [Build](/glossar/build/) in **WebP** um und liefert mehrere Breiten per `srcset` (640 bis 1920 px), siehe `PageBackground.astro`. Trotzdem lohnt **kleine Quelldateien**: der Build spart Bytes, aber eine 2‑MB-Rohdatei bleibt unnötig schwer in [Git](/glossar/git/).

In PageSpeed Insights ([Google](https://pagespeed.web.dev/)) kann unter „Bildübermittlung“ noch Optimierungspotenzial auftauchen (z. B. angezeigte Breite kleiner als ausgelieferte Datei). Dann Quelle schlanker wählen oder prüfen, ob das richtige `sizes`-/`srcset`-Setup greift. Die Site war in der Session schon **grün** mobil; Bilder sind ein Hebel für die letzten Prozent.

**Alt-Text:** Dekorative Vollbild-Hintergründe nutzen bei uns `alt=""` (rein visuell). Informatives Bild im Artikeltext braucht einen [**Alt-Text**](/glossar/alt-text/), wenn es Inhalt transportiert.

## Kurz merken

- Lizenz und **bezahlte** Treffer auf Stock-Seiten prüfen.
- Vor Upload: **schneiden**, **skalieren**, **WebP**, Metadaten optional strippen.
- **Assets** global oder **neben dem Artikel**; Nachweis im CMS-Feld.
- [Astro](/glossar/astro/) optimiert weiter, ersetzt aber kein schlankes Original.

Nächster Schritt im Projektalltag: Meilensteine und offene [Issues](/glossar/issue/) (SEO, Performance) wie gewohnt über [GitHub](/glossar/github/) pflegen ([Folge 002](/artikel/folge-002-github-issues/)). PR-Konflikte kann der Agent oft allein lösen, wenn du die Nummer nennst ([Folge 016](/artikel/folge-016-artikel-pull-request/)).

<!-- Quelle: transkript-021_6a6c.txt (Screencast hautoo - 021 - bilder suchen, anpassen, verwenden) -->
