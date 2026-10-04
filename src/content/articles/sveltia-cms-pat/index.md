---
title: "Sveltia CMS lokal und online — Variante mit PAT"
summary: /admin im Browser, Collections bearbeiten und dich mit einem GitHub Personal Access Token anmelden.
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

Das **CMS** (Content-Management-System) ist bei hautuu **Sveltia** — Git-basiert, keine WordPress-Datenbank.

## Lokal: `npm run dev` + `/admin`

- URL: `http://localhost:…/admin/` (Port steht im Terminal).
- **Nur Chromium/Chrome** — Firefox geht für das Backend oft nicht.
- Modus **„local“**: Ordner des Repos auswählen, fertig — **keine Anmeldung**, weil die Dateien schon bei dir liegen.

Links Felder aus `config.yml`, rechts eine einfache Preview. Markdown, Bilder (z. B. Platzhalter von Lorem Picsum), SEO-Block (Titel im **Browser-Tab** vs. sichtbare Überschrift, Meta Description für Telegram/Facebook-Vorschau).

Speichern = Markdown-Datei ändert sich lokal — noch **nicht** live.

## Online: Warum Auth?

Öffentliches Repo = jeder darf **lesen**, niemand darf **schreiben**. Für `/admin` auf der echten Domain brauchst du einen Schlüssel.

### Variante A — Personal Access Token (PAT)

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** (fine-grained empfohlen).
2. Beschreibung z. B. „Sveltia CMS hautuu“.
3. **Nur** das hautuu-Repository, Permission **Contents: Read and write**.
4. Ablaufdatum setzen (z. B. 90 Tage) — Token rotieren, nicht ewig.
5. Token **einmal** kopieren — danach nicht mehr sichtbar. Verloren = neuen erstellen, alte Integrationen sterben.

Im Sveltia-Login: Token einfügen → **Sign in**. Änderung an einer Seite → **Commit** auf GitHub → Cloudflare baut (weil `main`).

**Sicherheit:** Token wie ein Passwort behandeln. Nicht ins Repo committen, nicht im Screencast zeigen. Besser Umgebungsvariable oder Cloudflare Secret (in der Worker-Variante).

## Was passiert beim Speichern?

Beispiel: „Beispiel-Unterseite“ im Menü sichtbar schalten → Commit „Update page …“ → Build → Menüpunkt live. Parent/Child an Seiten allein erzeugt nicht automatisch die Navigation — dafür gibt es die **menus**-Collection (nächste Folge).

## Variante B (Ausblick)

**Sign in with GitHub** ohne PAT — braucht einen **Cloudflare Worker** als OAuth-Brücke. Kommt in der Folge „Worker & GitHub OAuth“.

<!-- Quelle: 2026-10-04--01-09-23--obs-screencast - hautoo - sveltia - variante PAT.txt -->
