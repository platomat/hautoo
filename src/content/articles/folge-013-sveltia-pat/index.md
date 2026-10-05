---
title: 'Folge 013: /admin aufmachen: lokal ohne Passwort, online mit GitHub-Schlüssel'
summary: Sveltia fühlt sich wie ein Mini-CMS an, speichert aber nur Dateien. So loggst du dich ein, ohne dass jeder Hans deine Startseite umschreibt.
pubDate: 2026-10-04 01:09:23+00:00
modifiedDate: 2026-10-05
status: published
tags:
- sveltia
- github
- cloudflare
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 013: /admin aufmachen: lokal ohne Passwort, online mit GitHub-Schlüssel'
  seo_description: Sveltia CMS lokal ohne Login und online mit GitHub Token. Folge 013 zeigt /admin, Speichern als Commit und warum dein Schlüssel wie ein Passwort ist.
---

[**CMS**](/glossar/cms/) = Content-Management, bei hautuu **[Sveltia](/glossar/sveltia/)**: Redaktion im Browser, Inhalt landet als Dateien in [Git](/glossar/git/). Keine [WordPress](/glossar/wordpress/)-Datenbank.

## Lokal: `/admin` ohne Login

- `npm run dev`, dann `http://localhost:…/admin/` (Port im [Terminal](/glossar/terminal/)).
- **Chrome/Chromium**: Firefox klappt fürs [**Backend**](/glossar/backend/) oft nicht.
- Modus **„local“**: Projektordner wählen. **kein Passwort**, die Dateien liegen ja schon bei dir.

Links die Felder aus der Config, rechts eine simple Preview. [Markdown](/glossar/markdown/), Bilder (z. B. Platzhalter), **SEO**: was im **Browser-Tab** steht vs. Überschrift auf der Seite, **Meta Description** für Link-Vorschau in Telegram & Co.

Speichern = Datei lokal geändert, noch **nicht** live.

## Online: Warum ein Schlüssel?

Öffentliches [Repo](/glossar/repository/) = alle dürfen **lesen**, niemand **schreiben**. Für `/admin` auf der echten Domain brauchst du Zugang. Cloudflare muss die Site schon bauen ([Folge 011](/artikel/folge-011-cloudflare-setup/)).

### Variante A: Personal Access Token (PAT)

Ein [**PAT**](/glossar/pat/) ist ein persönlicher **Zugangsschlüssel** für [GitHub](/glossar/github/):

1. GitHub → **Settings** → **Developer settings** → **[Personal access tokens](/glossar/pat/)** (fine-grained).
2. Beschreibung z. B. „Sveltia [CMS](/glossar/cms/) hautuu“.
3. Nur das hautuu-Repo, **Contents: Read and write**.
4. Ablauf setzen (z. B. 90 Tage). Schlüssel rotieren.
5. Token **einmal** kopieren — danach unsichtbar. Weg = neuen erstellen.

In Sveltia: Token einfügen → **Sign in**. Speichern → [**Commit**](/glossar/commit/) auf GitHub → [Cloudflare](/glossar/cloudflare-pages/) baut (`main`).

**Token = Passwort.** Nicht ins Repo, nicht im Video zeigen.

{{repodoc path="docs/sicherheit/README.md" title="Sicherheit & Secrets" description="PAT, ENV und was nicht ins Repo gehört."}}

{{block id="stack-uebersicht"}}

## Was beim Speichern passiert

{{repodoc path="docs/sveltia/README.md" title="Sveltia CMS" description="Collections, /admin und Git als Speicher."}}



Beispiel: Beispiel-Unterseite im Menü sichtbar → [Commit](/glossar/commit/) „Update page …“ → [Build](/glossar/build/) → Menüpunkt live. Parent/Child an der Seite allein baut nicht automatisch die Navigation, dafür gibt’s die **menus**-[Collection](/glossar/collection/).

## Variante B

**Sign in with GitHub** ohne PAT, braucht einen [**Cloudflare Worker**](/glossar/cloudflare-worker/) als Brücke ([Folge 014](/artikel/folge-014-sveltia-worker/)). Eigenes Thema, gleiche Idee: weniger Copy-Paste mit Tokens.

<!-- Quelle: 2026-10-04--01-09-23--obs-screencast - hautoo - sveltia - variante PAT.txt -->
