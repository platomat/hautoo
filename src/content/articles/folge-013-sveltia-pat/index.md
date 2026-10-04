---
title: "Folge 013: /admin aufmachen: lokal ohne Passwort, online mit GitHub-Schlüssel"
summary: "Sveltia fühlt sich wie ein Mini-CMS an, speichert aber nur Dateien. So loggst du dich ein, ohne dass jeder Hans deine Startseite umschreibt."
pubDate: 2026-10-04T01:09:23Z
modifiedDate: 2026-10-04
status: published
tags:
  - sveltia
  - github
  - cloudflare
seo:
  index_visibility: index
  follow_visibility: follow
---

[**CMS**](/glossar/cms/) = Content-Management, bei hautuu **Sveltia**: Redaktion im Browser, Inhalt landet als Dateien in Git. Keine WordPress-Datenbank.

## Lokal: `/admin` ohne Login

- `npm run dev`, dann `http://localhost:…/admin/` (Port im Terminal).
- **Chrome/Chromium**: Firefox klappt fürs [**Backend**](/glossar/backend/) oft nicht.
- Modus **„local“**: Projektordner wählen. **kein Passwort**, die Dateien liegen ja schon bei dir.

Links die Felder aus der Config, rechts eine simple Preview. Markdown, Bilder (z. B. Platzhalter), **SEO**: was im **Browser-Tab** steht vs. Überschrift auf der Seite, **Meta Description** für Link-Vorschau in Telegram & Co.

Speichern = Datei lokal geändert, noch **nicht** live.

## Online: Warum ein Schlüssel?

Öffentliches Repo = alle dürfen **lesen**, niemand **schreiben**. Für `/admin` auf der echten Domain brauchst du Zugang. Cloudflare muss die Site schon bauen ([Folge 011](/artikel/folge-011-cloudflare-setup/)).

### Variante A: Personal Access Token (PAT)

Ein [**PAT**](/glossar/pat/) ist ein persönlicher **Zugangsschlüssel** für GitHub:

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** (fine-grained).
2. Beschreibung z. B. „Sveltia CMS hautuu“.
3. Nur das hautuu-Repo, **Contents: Read and write**.
4. Ablauf setzen (z. B. 90 Tage). Schlüssel rotieren.
5. Token **einmal** kopieren — danach unsichtbar. Weg = neuen erstellen.

In Sveltia: Token einfügen → **Sign in**. Speichern → [**Commit**](/glossar/commit/) auf GitHub → Cloudflare baut (`main`).

**Token = Passwort.** Nicht ins Repo, nicht im Video zeigen.

## Was beim Speichern passiert

Beispiel: Beispiel-Unterseite im Menü sichtbar → Commit „Update page …“ → Build → Menüpunkt live. Parent/Child an der Seite allein baut nicht automatisch die Navigation, dafür gibt’s die **menus**-Collection.

## Variante B

**Sign in with GitHub** ohne PAT, braucht einen [**Cloudflare Worker**](/glossar/cloudflare-worker/) als Brücke ([Folge 014](/artikel/folge-014-sveltia-worker/)). Eigenes Thema, gleiche Idee: weniger Copy-Paste mit Tokens.

<!-- Quelle: 2026-10-04--01-09-23--obs-screencast - hautoo - sveltia - variante PAT.txt -->
