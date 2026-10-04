---
title: "Folge 012: Test-Zweig, geheime URL, Rollback (ohne die Live-Seite zu grillen)"
summary: "Am Branch experimentieren, Preview-Link verschicken, mergen wenn’s passt. Oder mit einem Klick in die Vergangenheit springen."
pubDate: 2026-10-04T00:44:03Z
modifiedDate: 2026-10-04
status: published
tags:
  - cloudflare
  - github
seo:
  index_visibility: index
  follow_visibility: follow
---

[**main**](/glossar/main/) ist, was die Welt sieht. Trotzdem willst du rumprobieren, ohne die Startseite live zu verbiegen. Pages an GitHub koppeln ging in [Folge 011](/artikel/folge-011-cloudflare-setup/).

{{block id="stack-uebersicht"}}

## Branch lokal

```text
git branch test
git checkout test    # oder: git switch test
```

Alles, was du jetzt commitest, liegt auf **test**, nicht auf **main**. Zurück zu `main` wechseln → Test-Änderungen „weg“ (sie leben nur auf dem anderen [**Branch**](/glossar/branch/)).

Der Agent kann den Branch auch anlegen und z. B. die Startseite umschreiben.

## Push = Preview, nicht Production

Push vom **Test-Branch** → Cloudflare baut eine [**Preview**](/glossar/preview-url/) unter **All deployments**, eigene `pages.dev`-URL, die niemand errät.

Link an jemanden: „Gefällt dir das?“. Live bleibt unangetastet.

## Wenn’s gut ist: Merge

In der Git-UI: **test** → [**Merge**](/glossar/merge/) into main, dann [**push**](/glossar/push/) `main`. Cloudflare baut **Production**, jetzt ist’s öffentlich.

Parallel kann auf `main` ein Bugfix laufen, während du auf `test` wochenlang Features stapelst. Klassisches Team-Spiel, auch solo sinnvoll.

## Rollback

[**Rollback**](/glossar/rollback/) to this deployment — in Sekunden wieder alter Stand (im Video eine Startseiten-Variante von Commit `7.8…`). Danach wieder vorwärts deployen, wenn du die neue Version zurückwillst.

Kein FTP. [**CI/CD**](/glossar/ci-cd/) heißt: Push, Build, Preview, Merge, Live, und rückwärts geht auch. Merge vs. Rebase in der Historie: [Folge 007](/artikel/folge-007-merge-rebase/).

<!-- Quelle: 2026-10-04--00-44-03--obs-screencast - hautoo - cloudflare - branches, rollbacks.txt -->
