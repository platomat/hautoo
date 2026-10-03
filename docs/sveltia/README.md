# Sveltia CMS

Sveltia ist das geplante CMS, mit dem Redaktion Inhalte im Browser pflegen kann. Änderungen landen als Dateien im GitHub-Repository.

## Entscheidungen (Stand)

| Thema | Entscheidung |
| --- | --- |
| Auth | Zuerst **Personal Access Token (PAT)**; später GitHub App + Cloudflare Worker |
| Speichern | Direkt auf Branch **`main`** |
| Medien | **Neben dem Content** (Variante B) — siehe unten |

Tracking: GitHub [#2](https://github.com/platomat/hautoo/issues/2) und Sub-Issues #3–#6.

## Medienablage (Variante B)

Bilder liegen **neben dem jeweiligen Content-Eintrag**, nicht unter `public/media`.

Beispiel (Artikel):

```text
src/content/articles/mein-artikel/
  index.md          # Frontmatter + Text
  hero.jpg          # Bild zum Eintrag
```

**Warum:** Astro kann solche Bilder mit dem Schema-Helfer `image()` optimieren (Größe, Format). Eintrag und Medien gehören zusammen im Repo.

**Abgrenzung:** How-to-Videos bleiben **Embeds** (Vimeo/YouTube), keine Videodateien im Repo. Siehe [Inhalte](../inhalte/README.md).

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

- PAT-Workflow und später OAuth (GitHub App + Cloudflare Worker) dokumentieren
- Konkrete `config.yml` und Astro-Schemas (Sub-Issues #3–#6)
- Dev-Vorschau für Bilder unter `src/content/` (falls nötig)
