# Lokale Entwicklung

Anleitung, das Projekt auf dem eigenen Rechner zu starten — zum Testen von Layout, Inhalten und Builds vor dem Push.

## Voraussetzungen

- Git
- **Node.js 22.12+** (LTS empfohlen; Astro 7 erfordert mindestens 22.12)
- npm (kommt mit Node)
- Editor: empfohlen **Cursor**
- Optional: Zugang zu GitHub für Push und CMS

## Installation

```text
git clone <repo-url>
cd hautoo
npm install
```

## Scripts

| Befehl | Zweck |
| --- | --- |
| `npm run dev` | Astro-Dev-Server (lokal, Hot Reload) |
| `npm run build` | Statische Site nach `dist/` bauen |
| `npm run preview` | Gebauten Stand lokal ansehen |
| `npm run astro` | Astro-CLI (z. B. `npm run astro check`) |

## Grober Ablauf

```text
npm install
npm run dev          # http://localhost:4321
# … ändern, prüfen …
npm run build        # vor dem Push optional
git commit && git push   # → Cloudflare baut und veröffentlicht
```

## Wichtige Hinweise

- Lokale Secrets nur in gitignorierter `.env`, Vorlage in `.env.example`
- Commits und Issues auf **Deutsch**, Code auf **Englisch**
- Vor dem Push: [Sicherheits-Checkliste](../sicherheit/README.md)

## CMS lokal

`npm run dev` → [http://localhost:4321/admin/](http://localhost:4321/admin/) (Route `src/pages/admin.html`) — Login wie in Produktion per GitHub-PAT. Live-Setup: [Sveltia auf Cloudflare](../sveltia/README.md#sveltia-auf-cloudflare-zum-laufen-bringen).

## Noch auszuarbeiten

- Häufige Fehler und Lösungen
