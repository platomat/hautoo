---
title: 'Folge 012: Test-Zweig, geheime URL, Rollback (ohne die Live-Seite zu grillen)'
summary: Am Branch experimentieren, Preview-Link verschicken, mergen wenn’s passt. Oder mit einem Klick in die Vergangenheit springen.
pubDate: 2026-10-04 00:44:03+00:00
modifiedDate: 2026-10-05
status: published
tags:
- cloudflare
- github
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 012: Test-Zweig, geheime URL, Rollback (ohne die Live-Seite zu grillen)'
  seo_description: 'Am Branch testen, Preview Link teilen, mergen wenn es passt oder per Rollback zurück. Folge 012: sicher experimentieren ohne die Live Seite zu riskieren.'
---

[**main**](/glossar/main/) ist, was die Welt sieht. Trotzdem willst du rumprobieren, ohne die Startseite live zu verbiegen. Pages an [GitHub](/glossar/github/) koppeln ging in [Folge 011](/artikel/folge-011-cloudflare-setup/).

## Branch lokal

```text
git branch test
git checkout test    # oder: git switch test
```

Alles, was du jetzt [commit](/glossar/commit/)est, liegt auf **test**, nicht auf **[main](/glossar/main/)**. Zurück zu `main` wechseln → Test-Änderungen „weg“ (sie leben nur auf dem anderen [**Branch**](/glossar/branch/)).

Der Agent kann den [Branch](/glossar/branch/) auch anlegen und z. B. die Startseite umschreiben.

## Push = Preview, nicht Production

[Push](/glossar/push/) vom **Test-Branch** → Cloudflare baut eine [**Preview**](/glossar/preview-url/) unter **All deployments**, eigene `pages.dev`-URL, die niemand errät.

Link an jemanden: „Gefällt dir das?“. Live bleibt unangetastet.

## Wenn’s gut ist: Merge

In der [Git](/glossar/git/)-UI: **test** → [**Merge**](/glossar/merge/) into main, dann [**push**](/glossar/push/) `main`. Cloudflare baut **[Production](/glossar/production/)**, jetzt ist’s öffentlich.

Parallel kann auf `main` ein Bugfix laufen, während du auf `test` wochenlang Features stapelst. Klassisches Team-Spiel, auch solo sinnvoll.

## Rollback

[**Rollback**](/glossar/rollback/) to this [deployment](/glossar/deploy/): In Sekunden ist der alte Stand wieder live. Danach wieder vorwärts deployen, wenn du die neue Version zurückwillst.

Kein FTP. [**CI/CD**](/glossar/ci-cd/) heißt: Push, [Build](/glossar/build/), Preview, [Merge](/glossar/merge/), Live, und rückwärts geht auch. Merge vs. [Rebase](/glossar/rebase/) in der Historie: [Folge 007](/artikel/folge-007-merge-rebase/).

{{repodoc path="docs/cloudflare/README.md" title="Cloudflare — Website online bringen" description="Preview-Deployments und Production im Repo nachlesen."}}

<!-- Quelle: 2026-10-04--00-44-03--obs-screencast - hautoo - cloudflare - branches, rollbacks.txt -->
