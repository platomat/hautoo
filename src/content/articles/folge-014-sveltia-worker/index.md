---
title: "Folge 014: Lieber mit GitHub einloggen: Der Worker als Türsteher fürs CMS"
summary: "Schluss mit Token-Zettel am Monitor: OAuth, Secrets in Cloudflare und Menüs, die du selbst zusammenklickst."
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

[**PAT**](/glossar/pat/) funktioniert, aber kopieren, ablaufen, verlegen nervt (Einrichtung: [Folge 013](/artikel/folge-013-sveltia-pat/)). **Variante B:** normal bei GitHub anmelden. Dazwischen sitzt ein [**Cloudflare Worker**](/glossar/cloudflare-worker/) (kleines Programm auf Cloudflares Servern).

## Wer macht was?

```text
Du → /admin → Sveltia → Worker (Auth) → GitHub API
                ↓
         Commits → GitHub → Cloudflare Pages Build
```

Der Worker ist **nicht** deine Website, nur die **Tür** fürs CMS.

## Umsetzung (grober Ablauf)

Per [**Issue**](/glossar/issue/) (z. B. Menüs + GitHub-Login) lässt du den Agenten den Worker vorbereiten, oft mit **Deploy to Cloudflare**. Worker-URL notieren.

Parallel [**GitHub OAuth App**](/glossar/oauth/):

- **OAuth Apps** → New.
- **Homepage URL:** deine Site (z. B. `https://hautuu.storyofai.net`).
- **Callback URL:** `https://<worker-url>/callback`, exakt wie in der Doku.

**Client ID** und **Client Secret** im Worker unter **Settings** → **Variables** — Secret wirklich als **Secret**, nicht als Klartext.

**Allowed domains:** deine CMS-Domain.

In `public/admin/config.yml`: GitHub-[**backend**](/glossar/backend/) mit Worker-URL, Branch [`main`](/glossar/main/), committen, pushen.

## PAT wegwerfen

OAuth läuft? Alten Token bei GitHub **revoken**, weniger Schlüssel im Umlauf.

## Menüs selbst bauen

Collection **menus**: z. B. `main`, Footer legal. Einträge mit Label, Link zur **Seite** oder freie **URL**, optional **Untermenü** (eine Ebene).

Speichern im CMS → Commit „Update menu …“ → Cloudflare baut. Manchmal dauert der Hook einen Moment, unter Pages nach dem Deployment schauen (**Retry** baut denselben Commit nochmal, ersetzt keinen fehlenden Build).

## Wenn’s knallt: Rebase-Konflikt

Lokal und im Live-CMS dieselbe Datei? [**Pull**](/glossar/pull/)/Rebase kann stolpern. Dann Konflikt lösen. Remote-Stand behalten oder manuell mergen. Dem Agenten die Situation beschreiben hilft.

## CI/CD in einem Satz

Code in Cursor → Push → Build. Text im CMS → Commit → Build. Kein FTP. Preview-Branches und Rollback von Cloudflare gelten weiter ([Folge 012](/artikel/folge-012-cloudflare-branches/)).

Untermenü-Aussehen (Aufklappen vs. Klick) ist Feintuning. Pipeline und Zugang stehen.

<!-- Quelle: 2026-10-04--01-38-06--obs-screencast - hautoo - sveltia - worker.txt -->
