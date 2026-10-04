---
title: 'Folge 002: Issues statt Chaos: So behältst du die KI auf Kurs'
summary: Tickets, Meilensteine und ein Bild, wie Cursor, GitHub und Cloudflare zusammenspielen. Damit du nicht jeden Tag alles neu erklären musst.
pubDate: 2026-10-03 01:35:20+00:00
modifiedDate: 2026-10-05
status: published
tags:
- github
- cursor
- cloudflare
- astro
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 002: Issues statt Chaos: So behältst du die KI auf Kurs'
  seo_description: GitHub Issues, Meilensteine und das Zusammenspiel von Cursor, GitHub und Cloudflare. So gibst du der KI klare Tickets statt jeden Tag alles neu zu erklären.
---

GitHub ist nicht nur Datei-Ablage, es ist dein **Projektbüro**. [**Issues**](/glossar/issue/) sind Tickets: Bug, Idee, Feature. **Meilensteine** bündeln sie (z. B. „Version 1 (Setup)“). **Labels** helfen beim Sortieren (Documentation, Design, …).

## Forks und Pull Requests (kurz)

Du kannst fremde Projekte [**forken**](/glossar/fork/), eine Kopie unter deinem Account. Änderst du was Nützliches, schickst du einen [**Pull Request**](/glossar/pull-request/) (PR) an den Originalautor. Der entscheidet, ob er’s übernimmt. hautuu selbst als Vorlage forken: [Folge 020](/artikel/folge-020-bausteine-fork/). Allein im eigenen Repo? Dann sind Issues trotzdem Gold wert.

## „Bitte Issue #1 umsetzen“

Statt jedes Mal die halbe Projektgeschichte zu tippen, sagst du:

> Bitte Issue #1 umsetzen.

Der Agent liest Titel und Kommentare. Bei einem **öffentlichen** Repo kann das jeder mitlesen, deshalb: **nie Passwörter, Tokens oder API-Keys** committen. Die [**History**](/glossar/git-history/) vergisst nichts.

In Commit-Messages kannst du Issues erwähnen (`Fixes #1`, `Closes #1`). GitHub verlinkt oder schließt das Ticket, du siehst später, welcher [**Commit**](/glossar/commit/) was gelöst hat.

{{block id="stack-uebersicht"}}

1. [**Cursor**](/glossar/cursor/): du arbeitest lokal, commit, push.
2. [**GitHub**](/glossar/github/): Quelle der Wahrheit.
3. [**Cloudflare**](/glossar/cloudflare-pages/): merkt Änderungen, [**baut**](/glossar/build/) mit Astro.
4. [**Sveltia**](/glossar/sveltia/): später: Tippfehler im Browser fixen, landet wieder in Git.
5. [**Astro**](/glossar/astro/): macht schnelle statische Seiten ([**Frontend**](/glossar/frontend/)), kein WordPress, keine Datenbank auf dem Server.

Cloudflare richtest du Schritt für Schritt in [Folge 011](/artikel/folge-011-cloudflare-setup/) ein. Sveltia und PAT/Login: [Folge 013](/artikel/folge-013-sveltia-pat/).

{{repodoc path="docs/konzept/README.md" title="Konzept" description="Ziele, Stack und wie die Teile zusammenspielen."}}

## Issues klein schneiden
{{repodoc path="docs/github/README.md" title="GitHub" description="Issues, Meilensteine und Pull Requests in der Projekt-Doku."}}



„Astro Collections erstellen“ klingt riesig. Die KI kann **Sub-Issues** vorschlagen (Pages, Articles, Tags …). Dann siehst du Fortschritt statt einen endlosen Klumpen. Was Collections sind, steht in [Folge 004](/artikel/folge-004-collection-pages/).

Vor dem Bauen fragt der Agent oft nach:

- **CMS-Login:** später per Token oder GitHub (eigenes Thema).
- **Direkt auf [`main`](/glossar/main/):** Speichern kann sofort auf den Hauptzweig gehen → Cloudflare baut neu. Simpel, aber jeder Klick kann live werden.
- **Bilder „Variante B“:** Dateien liegen neben dem Artikel — Astro kann sie optimieren (gut für **Page Speed**).

## Erst lokal gucken

- [`npm install`](/glossar/npm/), holt Pakete (macht Cloudflare beim Build auch).
- `npm run dev`. Vorschau auf deinem Rechner. Node, npm und die Installation lokal: [Folge 018](/artikel/folge-018-node-npm/).

Ist Cloudflare schon dran? [**Push**](/glossar/push/) = Build. Darum pusht der Agent bei hautuu nur **auf dein Wort**. Pull, Merge und typische Stolpersteine: [Folge 006](/artikel/folge-006-git-push-pull/).

In derselben Session ging’s schon um dunkles Theme, grüne Klick-Farbe, Ubuntu-Schrift, und dass Issues besser sind als „hab ich mal im Chat gesagt“.

<!-- Quelle: 2026-10-03--01-35-20--obs-screencast - hautoo - github - issues.txt -->
