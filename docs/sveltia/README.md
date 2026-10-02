# Sveltia CMS

Sveltia ist das geplante CMS, mit dem Redaktion Inhalte im Browser pflegen kann. Änderungen landen als Dateien im GitHub-Repository.

## Collections (Sammlungen)

| Collection | Schlüssel | Inhalt |
| --- | --- | --- |
| Seiten | `pages` | Statische Seiten |
| Artikel | `articles` | Text, Bilder, How-to-Video (Vimeo/YouTube) |
| Tags | `tags` | Verschlagwortung für Artikel |
| Glossar | `glossar` | Begriffe und Erklärungen |

## Erwartete Felder (Entwurf)

### articles

- Titel, Slug, Zusammenfassung
- Fließtext (Markdown)
- Bilder
- Tags (Relation zu `tags`)
- Video: Anbieter (YouTube/Vimeo) + Embed-ID oder URL
- Publikationsdatum, optional Entwurf/Veröffentlicht

### glossar

- Begriff
- Kurzdefinition
- Optional längere Erklärung / Links zu Artikeln

### tags

- Name, Slug, optionale Beschreibung

### pages

- Titel, Slug, Body
- Optional Navigation/Menü-Reihenfolge

## Was hier dokumentiert werden soll

- `admin`-Zugang und Auth (noch festzulegen)
- Konfigurationsdatei für Sveltia
- Workflow: Inhalt speichern → Commit/PR → Deploy
- Rechte: wer darf publizieren?

## Sicherheit

CMS-Zugangsdaten und Backend-Tokens sind Secrets — nicht ins öffentliche Repo. Siehe [Sicherheit](../sicherheit/README.md).

## Noch auszuarbeiten

- Auth-Variante (z. B. GitHub OAuth / Backend)
- Ob Speichern direkt auf `main` oder über Pull Requests erfolgt
- Medien-Upload (Ordner im Repo vs. externer Speicher)
