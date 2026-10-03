# Sicherheit & Secrets

Dieses Repository ist **öffentlich** auf GitHub. Alles, was committed wird, kann von jeder Person gelesen werden.

## Niemals committen

- API-Keys, Tokens, Passwörter
- Private SSH- oder TLS-Schlüssel
- Cloudflare API-Tokens, GitHub Personal Access Tokens
- Webhook-Secrets, OAuth Client Secrets
- `.env`-Dateien mit echten Werten
- Zugangsdaten für Vimeo, YouTube, E-Mail-Dienste usw.

## Erlaubt und sinnvoll

| Datei / Ort | Zweck |
| --- | --- |
| `.env.example` | Platzhalter ohne echte Werte, als Vorlage |
| Cloudflare Dashboard / GitHub Secrets | Echte Secrets zur Laufzeit |
| Lokale `.env` (gitignored) | Nur auf dem eigenen Rechner |
| Browser Local Storage (Sveltia PAT) | GitHub-Token nur lokal im Browser — nie committen |

## Domain

Die Domain `hautoo.storyofai.net` ist **kein Secret**. Sie darf in Doku und Code vorkommen.

## Checkliste vor jedem Push

1. Enthält der Diff Keys, Tokens oder Passwörter?
2. Wurden neue `.env*`-Dateien versehentlich gestaged?
3. Stehen sensible Dateien in `.gitignore`?

Wenn etwas Sensibles versehentlich gepusht wurde: Token **sofort rotieren** und den Vorfall dokumentieren — nur Löschen im Git reicht nicht (History bleibt sichtbar).

## Für KI-Assistenten

Cursor und andere Assistenten sollen Secrets **nicht** in Dateien schreiben, die ins Repo gelangen. Bei Bedarf immer auf Umgebungsvariablen und Plattform-Secrets verweisen.
