# Inhalte der Website

Die Website publiziert thematische Inhalte. Technisch stecken sie in den Sveltia-/Astro-Collections.

## Überblick

| Art | Collection | Typischer Inhalt |
| --- | --- | --- |
| Seiten | `pages` | Startseite, Über uns, rechtliche Seiten |
| Menüs | `menus` | Hauptmenü, Footer-Rechtliches, später weitere |
| Artikel | `articles` | Text, Bilder, eingebettetes How-to-Video |
| Tags | `tags` | Themen-Labels für Artikel |
| Glossar | `glossar` | Begriffserklärungen |

## Seiten (`pages`)

Umgesetzt: Content unter `src/content/pages/<slug>/index.md`, CMS-Collection in Sveltia. Navigation über Collection `menus` (nicht über Seiten-Flags).

- Start → `/`
- Weitere Seiten → `/<slug>/`
- Mit `parent` → `/<eltern-slug>/<slug>/` (auch mehrstufig)
- Details: [Sveltia — Collections](../sveltia/collections.md)

## Menüs (`menus`)

Umgesetzt (#13): eigene Collection statt Flags an Seiten. Slots `main` (Header) und `footer-legal` (Copyright-Zeile); Einträge mit Seite oder URL, optional eine Untermenü-Ebene. Details: [Collections — menus](../sveltia/collections.md#collection-menus-umgesetzt).

## Artikel (`articles`)

Umgesetzt (#4): Collection unter `src/content/articles/<slug>/index.md`, Liste unter `/artikel/`, Einzelansicht `/artikel/<slug>/`.

Ein Artikel soll typischerweise enthalten:

1. **Text** — verständlich, auf Deutsch
2. **Bilder** — zur Veranschaulichung; Ablage **neben dem Content-Eintrag** (siehe unten)
3. **How-to-Video** — Einbettung von **Vimeo** oder **YouTube** (nicht als Datei im Repo)

Videos werden eingebettet (Embed), nicht als große Videodateien versioniert. Details: [Collections — articles](../sveltia/collections.md#collection-articles-umgesetzt).

## Bilder (Medienablage)

Entscheidung: **Variante B — neben dem Content** (nicht `public/media`).

- Pro Eintrag ein Ordner unter `src/content/...`; Bilder liegen dort neben `index.md`
- Astro kann die Dateien beim Build optimieren (`image()` im Schema)
- Geteilte Assets optional unter `src/assets/`
- **Schritte zum Einrichten in Sveltia/Astro:** [Medien — Variante B](../sveltia/medien-variante-b.md)

## Glossar (`glossar`)

Umgesetzt (#6): Collection unter `src/content/glossar/<slug>.md`, Übersicht `/glossar/`, Eintrag `/glossar/<slug>/`. Optional Verweise auf Artikel. Ziel: Einsteiger verstehen GitHub, Cloudflare, Astro usw. — siehe auch [Glossar der Doku](../glossar.md). Details: [Collections — glossar](../sveltia/collections.md#collection-glossar-umgesetzt).

## Tags (`tags`)

Umgesetzt (#5): Collection unter `src/content/tags/<slug>.md` (Name + optionale Beschreibung). Artikel referenzieren Tags per Relation. Details: [Collections — tags](../sveltia/collections.md#collection-tags-umgesetzt).

## Redaktioneller Ablauf (Entwurf)

1. Inhalt in Sveltia anlegen oder Markdown bearbeiten
2. Bilder hinzufügen, Video-URL/ID eintragen
3. Speichern → Änderung im Git-Repo
4. Nach Deploy auf Cloudflare unter `hautoo.storyofai.net` sichtbar

## Noch auszuarbeiten

- Redaktionsrichtlinien (Ton, Bildrechte, Barrierefreiheit)
- Pflichtfelder und Entwurfsstatus
- Wie Glossar-Links in Artikeln gesetzt werden
