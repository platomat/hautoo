---
title: "Folge 002: Issues statt Chaos: So behältst du die KI auf Kurs"
summary: "Tickets, Meilensteine und ein Bild, wie Cursor, GitHub und Cloudflare zusammenspielen. Damit du nicht jeden Tag alles neu erklären musst."
pubDate: 2026-10-03T01:35:20Z
modifiedDate: 2026-10-04
status: published
tags:
  - github
  - cursor
  - cloudflare
  - astro
seo:
  index_visibility: index
  follow_visibility: follow
---

GitHub ist nicht nur Datei-Ablage, es ist dein **Projektbüro**. [**Issues**](/glossar/issue/) sind Tickets: Bug, Idee, Feature. **Meilensteine** bündeln sie (z. B. „Version 1 (Setup)“). **Labels** helfen beim Sortieren (Documentation, Design, …).

## Forks und Pull Requests (kurz)

Du kannst fremde Projekte [**forken**](/glossar/fork/), eine Kopie unter deinem Account. Änderst du was Nützliches, schickst du einen [**Pull Request**](/glossar/pull-request/) (PR) an den Originalautor. Der entscheidet, ob er’s übernimmt. Allein im eigenen Repo? Dann sind Issues trotzdem Gold wert.

## „Bitte Issue #1 umsetzen“

Statt jedes Mal die halbe Projektgeschichte zu tippen, sagst du:

> Bitte Issue #1 umsetzen.

Der Agent liest Titel und Kommentare. Bei einem **öffentlichen** Repo kann das jeder mitlesen, deshalb: **nie Passwörter, Tokens oder API-Keys** committen. Die [**History**](/glossar/git-history/) vergisst nichts.

In Commit-Messages kannst du Issues erwähnen (`Fixes #1`, `Closes #1`). GitHub verlinkt oder schließt das Ticket, du siehst später, welcher [**Commit**](/glossar/commit/) was gelöst hat.

## Die Kette (die Grafik im Kopf)

1. [**Cursor**](/glossar/cursor/): du arbeitest lokal, commit, push.
2. [**GitHub**](/glossar/github/): Quelle der Wahrheit.
3. [**Cloudflare**](/glossar/cloudflare-pages/): merkt Änderungen, [**baut**](/glossar/build/) mit Astro.
4. [**Sveltia**](/glossar/sveltia/): später: Tippfehler im Browser fixen, landet wieder in Git.
5. [**Astro**](/glossar/astro/): macht schnelle statische Seiten, kein WordPress, keine Datenbank auf dem Server.

## Issues klein schneiden

„Astro Collections erstellen“ klingt riesig. Die KI kann **Sub-Issues** vorschlagen (Pages, Articles, Tags …). Dann siehst du Fortschritt statt einen endlosen Klumpen.

Vor dem Bauen fragt der Agent oft nach:

- **CMS-Login:** später per Token oder GitHub (eigenes Thema).
- **Direkt auf [`main`](/glossar/main/):** Speichern kann sofort auf den Hauptzweig gehen → Cloudflare baut neu. Simpel, aber jeder Klick kann live werden.
- **Bilder „Variante B“:** Dateien liegen neben dem Artikel — Astro kann sie optimieren (gut für **Page Speed**).

## Erst lokal gucken

- [`npm install`](/glossar/npm/), holt Pakete (macht Cloudflare beim Build auch).
- `npm run dev`. Vorschau auf deinem Rechner.

Ist Cloudflare schon dran? [**Push**](/glossar/push/) = Build. Darum pusht der Agent bei hautuu nur **auf dein Wort**.

In derselben Session ging’s schon um dunkles Theme, grüne Klick-Farbe, Ubuntu-Schrift, und dass Issues besser sind als „hab ich mal im Chat gesagt“.

<!-- Quelle: 2026-10-03--01-35-20--obs-screencast - hautoo - github - issues.txt -->
