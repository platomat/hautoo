---
title: "Cloudflare Pages: Build, Deploy und Custom Domain"
summary: GitHub verbinden, Astro bauen lassen und hautuu unter deiner Subdomain erreichbar machen.
pubDate: 2026-10-04T00:22:44Z
modifiedDate: 2026-10-04
status: published
tags:
  - cloudflare
  - github
  - astro
seo:
  index_visibility: index
  follow_visibility: follow
---

Bis hier war alles lokal oder auf GitHub. **Cloudflare Pages** baut und hostet die fertige Website.

## Begriffe bei Cloudflare

- **Workers & Pages** — unter „Compute“. **Pages** = statische Sites aus Git (passt zu Astro). **Workers** = mehr Logik am Edge (später z. B. CMS-Auth).
- **R2 / Databases** — für hautuu erst mal irrelevant, aber gut zu wissen, dass es da ist.
- **Ask AI** in der Cloudflare-Oberfläche — hilft bei DNS, Redirects etc. (Deutsch geht).

## Pipeline im Kopf

```
Cursor → commit → push → GitHub → Cloudflare Build → Live
```

Push auf **`main`** = Production-Deploy (wenn so konfiguriert).

## Projekt anlegen

1. Dashboard → **Workers & Pages** → Create → **Pages** → Mit **GitHub** verbinden (OAuth — nur das **ausgewählte** Repo freigeben, nicht „all repositories“).
2. Repository wählen (z. B. hautuu).
3. **Production branch:** `main`.
4. **Framework preset:** Astro.
5. **Build command:** `npm run build`
6. **Output directory:** `dist` (da landet das fertige HTML).
7. **Save and Deploy**

Erst **Build**, dann **Deploy**. Unter **Deployments** siehst du jeden Lauf; bei Erfolg gibt’s eine `*.pages.dev`-URL.

## Custom Domain

**Custom domains** → Subdomain eintragen (z. B. `hautuu.storyofai.net`). Cloudflare legt meist **CNAME** und **TLS-Zertifikat** automatisch an, wenn die Zone schon bei Cloudflare liegt.

## Commit auf Production erkennen

In der Pages-Übersicht steht oft die **kurze Commit-ID** (z. B. endet auf `9a0`) — passt zu GitHub. So siehst du: Live entspricht noch nicht deinem lokalen Burger-Menü, bis du pushst.

GitHub-App-Berechtigung checken: Unter GitHub → Settings → Applications nur das How-to/hautuu-Repo erlauben, sonst meckert die Verbindung.

<!-- Quelle: 2026-10-04--00-22-44--obs-screencast - hautoo - cloudflare - setup.txt -->
