# Cloudflare

Cloudflare hostet die gebaute statische Website und liefert sie über die Domain aus.

## Domain

- **Produktions-Domain:** `hautoo.storyofai.net`
- Die Domain ist öffentlich und kein Secret.

## Typische Rolle im Stack

1. GitHub enthält den Stand des Projekts
2. Bei Push (z. B. auf `main`) startet Cloudflare einen Build
3. Astro erzeugt statische Dateien
4. Cloudflare Pages liefert die Site unter der Domain aus

```text
Cursor → Git Commit (lokal) → erst nach Anweisung: Push → GitHub → Cloudflare Build (Astro) → hautoo.storyofai.net
```

## Push = Deploy

Ein **Push** auf den verbundenen Branch (typisch `main`) startet bei Cloudflare einen Build der Website.

- **Lokal committen** ist ok und ändert die Live-Site nicht.
- **Pushen nur bewusst** — Agenten dürfen **niemals von allein** pushen, nur auf ausdrückliche Anweisung.
- Details: [Sprachen und Konventionen](../sprachen-und-konventionen.md), Regel `.cursor/rules/projekt-konventionen.mdc`.

## Was hier dokumentiert werden soll

- Cloudflare-Account und Projekt anlegen
- Verbindung zum GitHub-Repo
- Build-Einstellungen (Framework Astro, Build-Befehl, Ausgabeordner)
- Custom Domain `hautoo.storyofai.net` anbinden (DNS)
- Umgebungsvariablen / Secrets **nur** im Cloudflare-Dashboard — nie im Repo
- Preview-Deployments für Branches (optional)

## Secrets

API-Tokens und sensible Build-Variablen gehören ausschließlich in die Cloudflare-Projekt-Einstellungen bzw. lokale, gitignorierte Dateien. Siehe [Sicherheit](../sicherheit/README.md).

## Noch auszuarbeiten

- DNS-Details zur Subdomain unter `storyofai.net`
- Ob Workers, Redirects oder Headers benötigt werden
- Critical/non-critical CSS und Caching-Header feinjustieren
