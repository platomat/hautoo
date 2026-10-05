---
title: 'Folge 011: Von GitHub ins Netz: Cloudflare Pages in echten Schritten'
summary: Repo verbinden, Astro bauen lassen, eigene Subdomain drauf. An der Commit-ID erkennst du, was wirklich live ist.
pubDate: 2026-10-04 00:22:44+00:00
modifiedDate: 2026-10-06
status: published
tags:
- cloudflare
- github
- astro
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 011: Von GitHub ins Netz: Cloudflare Pages in echten Schritten'
  seo_description: Cloudflare Pages mit GitHub verbinden, Astro bauen lassen und an der Commit ID sehen, was live ist. Folge 011 führt dich Schritt für Schritt ins Netz.
---

Bisher: lokal und [GitHub](/glossar/github/). Jetzt wird’s öffentlich: [**Cloudflare Pages**](/glossar/cloudflare-pages/) baut und hostet die fertige Site.

## Begriffe ohne Panik

- **Workers & Pages** unter „Compute“. **Pages** = statische Sites aus [Git](/glossar/git/) (dein [**Frontend**](/glossar/frontend/)), passt zu [**Astro**](/glossar/astro/). [**Workers**](/glossar/cloudflare-worker/) = Extra-Logik am Edge (später z. B. [CMS](/glossar/cms/)-Login; [OAuth](/glossar/oauth/)-Brücke: [Folge 014](/artikel/folge-014-sveltia-worker/)).
- **R2 / Databases**: für hautuu erst mal egal, aber gut zu wissen.
- **Ask AI** in Cloudflare. Deutsch geht, hilft bei DNS und Regeln.

{{block id="stack-uebersicht"}}

**Merksatz:**

```
Cursor → commit → push → GitHub → Cloudflare Build → Live
```

[Push](/glossar/push/) auf **[`main`](/glossar/main/)** = [Production](/glossar/production/) (wenn so eingestellt).

{{repodoc path="docs/cloudflare/README.md" title="Cloudflare — Website online bringen" description="Pages, Deployments und Domain in der Doku."}}

## Projekt anlegen

1. **Workers & Pages** → Create → **Pages** → **GitHub** verbinden. Nur das **eine** [Repo](/glossar/repository/) freigeben, nicht „all repositories“.
2. Repo wählen (z. B. hautuu).
3. **Production branch:** `main` (siehe [Production](/glossar/production/) und [Branch](/glossar/branch/)).
4. **Framework:** [Astro](/glossar/astro/).
5. **[Build](/glossar/build/) command:** [`npm run build`](/glossar/build/)
6. **Output:** `dist` (fertiges HTML).
7. **Save and [Deploy](/glossar/deploy/)**

Erst **Build**, dann [**Deploy**](/glossar/deploy/). Unter **Deployments** jeder Lauf; Erfolg = `*.pages.dev`-URL. `npm run build` lokal braucht [Node](/glossar/nodejs/) ([Folge 018](/artikel/folge-018-node-npm/)).

{{repodoc path="docs/sveltia/zugang-cloudflare.md" title="Sveltia auf Cloudflare" description="CMS-Zugang nach dem Livegang einrichten."}}

## Eigene Domain

**Custom domains** → z. B. `hautuu.storyofai.net`. [Cloudflare](/glossar/cloudflare-pages/) legt oft **CNAME** und **TLS** automatisch an, wenn die Zone schon dort liegt.

## Welche Version ist live?

Vergleich die ersten paar Zeichen der [Commit](/glossar/commit/)-ID (des Hashs) in Cloudflare Pages mit denen auf GitHub. Cloudflare, GitHub und die meisten Git-Tools zeigen nur die **kurze** Form, oft die ersten sieben Zeichen (im Video z. B. in Sublime Merge). Stimmen sie überein, ist es derselbe Stand.

Burger-Menü nur lokal? Live zeigt’s noch nicht, bis du pushst. Test-Zweige und [Preview-URLs](/glossar/preview-url/): [Folge 012](/artikel/folge-012-cloudflare-branches/).

GitHub-App checken: Unter Applications nur das hautuu-Repo erlauben.

<!-- Quelle: 2026-10-04--00-22-44--obs-screencast - hautoo - cloudflare - setup.txt -->
