# Inhalte der Website

Die Website publiziert thematische Inhalte. Technisch stecken sie in den Sveltia-/Astro-Collections.

## Überblick

| Art | Collection | Typischer Inhalt |
| --- | --- | --- |
| Seiten | `pages` | Startseite, Über uns, rechtliche Seiten |
| Artikel | `articles` | Text, Bilder, eingebettetes How-to-Video |
| Tags | `tags` | Themen-Labels für Artikel |
| Glossar | `glossar` | Begriffserklärungen |

## Artikel

Ein Artikel soll typischerweise enthalten:

1. **Text** — verständlich, auf Deutsch
2. **Bilder** — zur Veranschaulichung
3. **How-to-Video** — Einbettung von **Vimeo** oder **YouTube** (nicht als Datei im Repo)

Videos werden eingebettet (Embed), nicht als große Videodateien versioniert.

## Glossar

Fachbegriffe werden im Glossar erklärt und können aus Artikeln verlinkt werden. Ziel: Einsteiger verstehen die Sprache von GitHub, Cloudflare, Astro usw. — sowohl auf der Website als auch in dieser Doku (siehe [Glossar der Doku](../glossar.md)).

## Tags

Tags gruppieren Artikel. Ein Artikel kann mehrere Tags haben.

## Redaktioneller Ablauf (Entwurf)

1. Inhalt in Sveltia anlegen oder Markdown bearbeiten
2. Bilder hinzufügen, Video-URL/ID eintragen
3. Speichern → Änderung im Git-Repo
4. Nach Deploy auf Cloudflare unter `hautoo.storyofai.net` sichtbar

## Noch auszuarbeiten

- Redaktionsrichtlinien (Ton, Bildrechte, Barrierefreiheit)
- Pflichtfelder und Entwurfsstatus
- Wie Glossar-Links in Artikeln gesetzt werden
