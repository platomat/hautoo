---
title: "Sveltia mit GitHub-Login: Cloudflare Worker als Brücke"
summary: OAuth-App, Worker deployen, Secrets setzen — und Menüs als eigene Collection pflegen.
pubDate: 2026-10-04T01:38:06Z
modifiedDate: 2026-10-04
status: published
tags:
  - sveltia
  - cloudflare
  - github
  - cursor
seo:
  index_visibility: index
  follow_visibility: follow
---

Der **PAT** funktioniert, ist aber umständlich (kopieren, rotieren, vergessen). **Variante B:** normal bei GitHub anmelden — dafür sitzt ein **Worker** zwischen Browser, Sveltia und GitHub.

## Architektur (vereinfacht)

```text
Du → /admin → Sveltia → Worker (Auth) → GitHub API
                ↓
         Content-Commits → GitHub → Cloudflare Pages Build
```

Der Worker ist **nicht** die Hauptwebsite — er ist die **Tür** fürs CMS.

## Issue & Umsetzung

Per Issue (z. B. Menüs als Collection, GitHub-Login) lässt du den Agenten den Worker vorbereiten — oft inkl. **Deploy to Cloudflare**-Button im Repo. Worker-URL notieren (`….workers.dev` o. ä.).

Parallel: **GitHub OAuth App**

- Developer settings → **OAuth Apps** → New.
- **Homepage URL:** deine Site (z. B. `https://hautuu.storyofai.net`).
- **Authorization callback URL:** `https://<worker-url>/callback` (exakt wie in der Doku).

**Client ID** und **Client Secret** in Cloudflare Worker → **Settings** → **Variables** (Secret wirklich als Secret, nicht plain).

**Allowed domains** / erlaubte Origins: deine CMS-Domain.

`public/admin/config.yml`: `backend` auf GitHub mit Worker-URL (ohne Platzhalter), Branch `main`, committen und pushen.

## PAT löschen

Wenn OAuth läuft: alten **fine-grained Token** unter GitHub revoken — weniger Schlüssel, weniger Risiko.

## Menüs-Collection

Statt Menü aus Seiten-Flags:

- Collection **menus** — z. B. `main`, Footer legal.
- Einträge: Label, Link zu **Seite** oder freie **URL**, optional **Untermenü** (eine Ebene).

Im CMS speichern → Commit „Update menu …“ → Cloudflare baut. Manchmal dauert der Hook einen Moment — bei Zweifel kleine Änderung nochmal speichern oder Deployment in Pages prüfen (**Retry** baut denselben Commit neu, ersetzt nicht „fehlenden“ Build).

## Rebase-Konflikt (Realität)

Wer parallel lokal und im Live-CMS editiert, kann bei **pull/rebase** an derselben Datei hängen. Dann: Konflikt lösen (oft „Server-/Remote-Stand behalten“ oder manuell mergen) — der Agent kann helfen, wenn du die Situation beschreibst.

## CI/CD zum Abschluss

Code in Cursor → Push → Build. Text im CMS → Commit → Build. Kein manuelles FTP. Preview-Branches und Rollbacks aus der Cloudflare-Folge bleiben gültig.

Untermenü-Darstellung (Aufklappen vs. Klick) ist Feintuning — Inhalt und Pipeline stehen.

<!-- Quelle: 2026-10-04--01-38-06--obs-screencast - hautoo - sveltia - worker.txt -->
