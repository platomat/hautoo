---
title: 'Folge 014: Lieber mit GitHub einloggen: Der Worker als Türsteher fürs CMS'
summary: 'Schluss mit Token-Zettel am Monitor: OAuth, Secrets in Cloudflare und Menüs, die du selbst zusammenklickst.'
pubDate: 2026-10-04 01:38:06+00:00
modifiedDate: 2026-10-06
status: published
tags:
- sveltia
- cloudflare
- github
- cursor
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 014: Lieber mit GitHub einloggen: Der Worker als Türsteher fürs CMS'
  seo_description: 'OAuth statt PAT Zettel: Cloudflare Worker als CMS Login, Secrets in Variables und Menüs im CMS. Folge 014 richtet GitHub Anmeldung für Sveltia ein.'
---

[**PAT**](/glossar/pat/) funktioniert, aber kopieren, ablaufen, verlegen nervt (Einrichtung: [Folge 013](/artikel/folge-013-sveltia-pat/)). **Variante B:** normal bei [GitHub](/glossar/github/) anmelden. Dazwischen sitzt ein [**Cloudflare Worker**](/glossar/cloudflare-worker/) (kleines Programm auf [Cloudflare](/glossar/cloudflare-pages/)s Servern).

## Wer macht was?

```text
Du → /admin → Sveltia → Worker (Auth) → GitHub API
                ↓
         Commits → GitHub → Cloudflare Pages Build
```

Der Worker ist **nicht** deine Website, nur die **Tür** fürs [CMS](/glossar/cms/).

{{repodoc path="docs/sveltia/zugang-worker.md" title="Sveltia-Zugang über Cloudflare Worker" description="OAuth, Callback und Secrets Schritt für Schritt."}}

## Umsetzung (grober Ablauf)

Per [**Issue**](/glossar/issue/) (z. B. Menüs + GitHub-Login) lässt du den Agenten den Worker vorbereiten, oft mit **[Deploy](/glossar/deploy/) to Cloudflare**. Worker-URL notieren.

Parallel [**GitHub OAuth App**](/glossar/oauth/):

- GitHub **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**.
- **Homepage URL:** deine Site (z. B. `https://hautoo.storyofai.net`).
- **Callback URL:** `https://<worker-url>/callback` (z. B. `https://hautoo-sveltia-cms-auth.platomat.workers.dev/callback`), exakt wie in der Doku.

**Client ID** und **Client Secret** im [Cloudflare Dashboard](https://dash.cloudflare.com) unter **Workers & Pages** → dein Worker → **Settings** → **Variables and Secrets** — Secret wirklich als **Encrypt** / Secret, nicht als Klartext-Variable.

**Allowed domains:** deine CMS-Domain.

In `public/admin/config.yml`: GitHub-[**backend**](/glossar/backend/) mit Worker-URL, [Branch](/glossar/branch/) [`main`](/glossar/main/), committen, pushen.

## PAT wegwerfen

OAuth läuft? Alten Token bei GitHub **revoken**, weniger Schlüssel im Umlauf.

## Menüs selbst bauen

[Collection](/glossar/collection/) **menus**: z. B. `main`, Footer legal. Einträge mit Label, Link zur **Seite** oder freie **URL**, optional **Untermenü** (eine Ebene).

Speichern im CMS → [Commit](/glossar/commit/) „Update menu …“ → Cloudflare baut. Manchmal dauert der Hook einen Moment, unter Pages nach dem Deployment schauen (**Retry** baut denselben Commit nochmal, ersetzt keinen fehlenden [Build](/glossar/build/)).

## Wenn’s knallt: Rebase-Konflikt

Lokal und im Live-CMS dieselbe Datei? [**Pull**](/glossar/pull/)/[Rebase](/glossar/rebase/) kann stolpern. Dann Konflikt lösen. Remote-Stand behalten oder manuell [merge](/glossar/merge/)n. Dem Agenten die Situation beschreiben hilft.

## CI/CD in einem Satz

Code in [Cursor](/glossar/cursor/) → [Push](/glossar/push/) → Build. Text im CMS → Commit → Build. Kein [FTP](/glossar/ftp/). Preview-Branches und [Rollback](/glossar/rollback/) von Cloudflare gelten weiter ([Folge 012](/artikel/folge-012-cloudflare-branches/)).

Untermenü-Aussehen (Aufklappen vs. Klick) ist Feintuning. Pipeline und Zugang stehen.

<!-- Quelle: 2026-10-04--01-38-06--obs-screencast - hautoo - [sveltia](/glossar/sveltia/) - worker.txt -->
