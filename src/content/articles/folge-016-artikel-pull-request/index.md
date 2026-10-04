---
title: 'Folge 016: Vierzehn Artikel im PR: Preview, Merge und Listing-Kontrolle'
summary: Branch statt main, Cloudflare-Preview in der Mail, grüne Checks und Merge. Warum die Artikel-Seite lieber ein CMS-Listing will.
pubDate: 2026-10-04 19:11:35+00:00
modifiedDate: 2026-10-05
status: published
tags:
- cursor
- github
- cloudflare
- astro
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 016: Vierzehn Artikel im PR: Preview, Merge und Listing-Kontrolle'
  seo_description: 'Großer PR mit Cloudflare Preview, grünen Checks und Merge auf main. Folge 016: Artikel Listing redaktionell steuern statt alles automatisch listen.'
---

Der Agent hat über Nacht gearbeitet (Ablauf ab [Folge 015](/artikel/folge-015-transkript-artikel/)): Mail von [**Cloudflare**](/glossar/cloudflare-pages/), dass ein **Zweig** gebaut wurde (z. B. ein Branch wie `PerseScreencastArticles-e016`, Name variiert). Nicht auf **main** gepusht, sondern eigener [**Branch**](/glossar/branch/) mit vielen neuen Artikeln, nachgeschärftem Ton und automatischen **Checks**.

## Pull Request lesen

Auf GitHub siehst du den [**Pull Request**](/glossar/pull-request/):

- **Zusammenfassung** mit Titeln, Slugs und Hinweisen auf unklare Transkript-Stellen.
- **Preview-Link** (derselbe wie in der Build-Mail): die Site, wie sie mit dem Branch aussehen würde.
- **CI**: z. B. [`npm run build`](/glossar/build/) im Workflow. Scheitert der Build, landet nichts Sinnvolles auf main.
- **Konflikt-Check**, falls parallel auf main etwas geändert wurde.

Zwei Commits sind normal: erst Anlegen der Artikel, dann Stil/Ton. Issue-Nummern und PR-Nummern laufen getrennt; eine „fehlende“ Issue-Nummer ist kein Drama.

## Merge und Live

**Ready for review**, Konflikte prüfen, dann [**Merge**](/glossar/merge/) (Rebase nur, wenn du weißt, warum). **Cloudflare** baut [**main**](/glossar/main/) neu. Lokal: `git pull`, ggf. **Rebase**, wenn du zwischendurch selbst committet hast, dann pushen.

Parallel kannst du Layout anpassen (Hero tiefer, Inhaltsbreite wie auf der Startseite). Die **Artikelübersicht** und Tag-Seiten nutzen die neuen Inhalte.

## Artikel-Listing: wo du es willst

Auf der **Startseite** steckt ein **Artikel-Listing**: z. B. die letzten drei, neueste zuerst, **Grid** mit drei Spalten.

Auf der Route **Artikel** war der Wunsch anders: nicht „erst fester Seitentext, dann automatisch alle Artikel darunter“, sondern **redaktionell** entscheiden, **wo** eine Liste hinkommt und mit welcher Sortierung/Anzahl, wie auf der Startseite. Das ist ein separates Issue an den Agenten (Umsetzung u. a. in [Folge 019](/artikel/folge-019-impressum-komponenten/)).

## KI-Ticks im Text

Viele lange **Gedankenstriche** im ersten Entwurf sind typisch generierter Stil. Gezielt Issue: „über alle Artikel, Striche reduzieren, normaler deutscher Fließtext“. Videos und Doku-Links kannst du später pro Artikel ergänzen. Preview-Zweige vor dem Merge: [Folge 012](/artikel/folge-012-cloudflare-branches/).

<!-- Quelle: 2026-10-04--19-11-35--obs-screencast - hautoo - 016 - transkript - artikel - resultat.txt -->
