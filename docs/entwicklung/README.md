# Lokale Entwicklung

Hier entsteht die Anleitung, das Projekt auf dem eigenen Rechner zu starten — zum Testen von Layout, Inhalten und Builds vor dem Push.

## Voraussetzungen (geplant)

- Git
- Node.js (LTS — genaue Version folgt mit dem Astro-Setup)
- Editor: empfohlen **Cursor**
- Optional: Zugang zu GitHub für Push und CMS

## Grober Ablauf

```text
git clone <repo-url>
cd hautuu
npm install          # sobald package.json existiert
npm run dev          # lokaler Astro-Dev-Server
```

## Wichtige Hinweise

- Lokale Secrets nur in gitignorierter `.env`, Vorlage in `.env.example`
- Commits und Issues auf **Deutsch**, Code auf **Englisch**
- Vor dem Push: [Sicherheits-Checkliste](../sicherheit/README.md)

## Noch auszuarbeiten

- Exakte Node-/npm-Versionen
- Scripts (`dev`, `build`, `preview`)
- CMS lokal testen
- Häufige Fehler und Lösungen
