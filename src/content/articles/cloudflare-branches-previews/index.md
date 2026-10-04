---
title: "Branches, Preview-URLs und Rollbacks bei Cloudflare"
summary: Am Test-Branch basteln, live schauen ohne Production zu berühren — und notfalls eine Version zurückdrehen.
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

**main** = was Besucher sehen. Trotzdem willst du experimentieren — ohne die Startseite live zu zerschießen.

## Branch lokal

```text
git branch test        # Zweig anlegen / wechseln
git checkout test      # oder: git switch test
```

Alles, was du jetzt commitest, liegt auf **test**, nicht auf **main**. In der IDE siehst du den aktiven Branch; wechselst du zurück zu `main`, sind die Test-Änderungen „weg“ (nur auf dem anderen Zweig).

Der Agent kann auch einen Branch anlegen und z. B. die Startseite umformulieren.

## Push → Preview-Deployment

Push des **Test-Branches** zu GitHub → Cloudflare baut **nicht** automatisch Production um, sondern legt unter **All deployments** eine **Preview** an — eigene URL auf `pages.dev`, die niemand errät.

Link an Freundin/Freund: „Gefällt dir die neue Startseite?“ — Live bleibt unberührt.

## Merge nach main

Wenn’s passt:

- In der Git-UI: Branch **test** → **Merge into main** (oder Agenten-Befehl).
- Dann **push** `main` → Cloudflare baut **Production** — jetzt ist die getestete Version live.

Parallel kann auf `main` ein Bugfix laufen, während du wochenlang auf `test` Features stapelst — klassisches Team-Szenario.

## Rollback

Unter Deployments: **Rollback to this deployment** — innerhalb weniger Sekunden wieder der alte Stand (im Video: Startseiten-Variante von Commit `7.8…`). Danach wieder vorwärts deployen, wenn du die neue Version zurückwillst.

Das ist kein FTP-Hickhack — **CI/CD** (Continuous Integration / Delivery): Push, Build, Preview, Merge, Production.

<!-- Quelle: 2026-10-04--00-44-03--obs-screencast - hautoo - cloudflare - branches, rollbacks.txt -->
