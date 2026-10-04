---
title: "Folge 011: Von GitHub ins Netz: Cloudflare Pages in echten Schritten"
summary: "Repo verbinden, Astro bauen lassen, eigene Subdomain drauf. An der Commit-ID erkennst du, was wirklich live ist."
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

Bisher: lokal und GitHub. Jetzt wird’s öffentlich: [**Cloudflare Pages**](/glossar/cloudflare-pages/) baut und hostet die fertige Site.

## Begriffe ohne Panik

- **Workers & Pages** unter „Compute“. **Pages** = statische Sites aus Git, passt zu **Astro**. [**Workers**](/glossar/cloudflare-worker/) = Extra-Logik am Edge (später z. B. CMS-Login).
- **R2 / Databases**: für hautuu erst mal egal, aber gut zu wissen.
- **Ask AI** in Cloudflare. Deutsch geht, hilft bei DNS und Regeln.

## Die Pipeline (Merksatz)

```
Cursor → commit → push → GitHub → Cloudflare Build → Live
```

Push auf **[`main`](/glossar/main/)** = Production (wenn so eingestellt).

## Projekt anlegen

1. **Workers & Pages** → Create → **Pages** → **GitHub** verbinden. Nur das **eine** Repo freigeben, nicht „all repositories“.
2. Repo wählen (z. B. hautuu).
3. **Production branch:** `main`.
4. **Framework:** Astro.
5. **Build command:** [`npm run build`](/glossar/build/)
6. **Output:** `dist` (fertiges HTML).
7. **Save and Deploy**

Erst **Build**, dann [**Deploy**](/glossar/deploy/). Unter **Deployments** jeder Lauf; Erfolg = `*.pages.dev`-URL.

## Eigene Domain

**Custom domains** → z. B. `hautuu.storyofai.net`. Cloudflare legt oft **CNAME** und **TLS** automatisch an, wenn die Zone schon dort liegt.

## Welche Version ist live?

Kurze **Commit-ID** in Pages (z. B. endet auf `9a0`) = dieselbe auf GitHub. Burger-Menü nur lokal? Live zeigt’s noch nicht, bis du pushst.

GitHub-App checken: Unter Applications nur das hautuu-Repo erlauben.

<!-- Quelle: 2026-10-04--00-22-44--obs-screencast - hautoo - cloudflare - setup.txt -->
