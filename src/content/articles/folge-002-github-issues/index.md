---
title: 'Folge 002: Issues statt Chaos: So behältst du die KI auf Kurs'
summary: Tickets, Meilensteine und ein Bild, wie Cursor, GitHub und Cloudflare zusammenspielen. Damit du nicht jeden Tag alles neu erklären musst.
pubDate: 2026-10-03 01:35:20+00:00
modifiedDate: 2026-10-06
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

[GitHub](/glossar/github/) ist nicht nur Datei-Ablage, es ist dein **Projektbüro**. [**Issues**](/glossar/issue/) sind Tickets: Bug, Idee, Feature. **Meilensteine** bündeln sie (z. B. „Version 1 (Setup)“). **Labels** helfen beim Sortieren (Documentation, Design, …).

## Forks und Pull Requests (kurz)

Du kannst fremde Projekte [**forken**](/glossar/fork/), eine Kopie unter deinem Account. Änderst du was Nützliches, schickst du einen [**Pull Request**](/glossar/pull-request/) (PR) an den Originalautor. Der entscheidet, ob er’s übernimmt. hautuu selbst als Vorlage [fork](/glossar/fork/)en: [Folge 020](/artikel/folge-020-bausteine-fork/). Allein im eigenen [Repo](/glossar/repository/)? Dann sind Issues trotzdem Gold wert.

## „Bitte Issue #1 umsetzen“

Statt jedes Mal die halbe Projektgeschichte zu tippen, sagst du:

> Bitte [Issue](/glossar/issue/) #1 umsetzen.

Der Agent liest Titel und Kommentare. Bei einem **öffentlichen** [Repo](/glossar/repository/) kann das jeder mitlesen, deshalb: **nie Passwörter, Tokens oder API-Keys** [committen](/glossar/commit/). Die [**History**](/glossar/git-history/) vergisst nichts.

In [Commit](/glossar/commit/)-Messages kannst du [Issues](/glossar/issue/) erwähnen (`Fixes #1`, `Closes #1`). GitHub verlinkt oder schließt das Ticket, du siehst später, welcher [**Commit**](/glossar/commit/) was gelöst hat.

{{block id="stack-uebersicht"}}

1. [**Cursor**](/glossar/cursor/): du arbeitest lokal, commit, [push](/glossar/push/).
2. [**GitHub**](/glossar/github/): Quelle der Wahrheit.
3. [**Cloudflare**](/glossar/cloudflare-pages/): merkt Änderungen, [**baut**](/glossar/build/) mit [Astro](/glossar/astro/).
4. [**Sveltia**](/glossar/sveltia/): später: Tippfehler im Browser fixen, landet wieder in [Git](/glossar/git/).
5. [**Astro**](/glossar/astro/): macht schnelle statische Seiten ([**Frontend**](/glossar/frontend/)), kein WordPress, keine Datenbank auf dem Server.

[Cloudflare](/glossar/cloudflare-pages/) richtest du Schritt für Schritt in [Folge 011](/artikel/folge-011-cloudflare-setup/) ein. [Sveltia](/glossar/sveltia/) und [PAT](/glossar/pat/)/Login: [Folge 013](/artikel/folge-013-sveltia-pat/).

{{repodoc path="docs/konzept/README.md" title="Konzept" description="Ziele, Stack und wie die Teile zusammenspielen."}}

## Issues klein schneiden

{{repodoc path="docs/github/README.md" title="GitHub" description="Issues, Meilensteine und Pull Requests in der Projekt-Doku."}}



„[Astro](/glossar/astro/) [Collections](/glossar/collection/) erstellen“ klingt riesig. Die KI kann **Sub-Issues** vorschlagen (Pages, Articles, Tags …). Dann siehst du Fortschritt statt einen endlosen Klumpen. Was [Collections](/glossar/collection/) sind, steht in [Folge 004](/artikel/folge-004-collection-pages/).

Vor dem Bauen fragt der Agent oft nach:

- **[CMS](/glossar/cms/)-Login:** später per Token oder [GitHub](/glossar/github/) (eigenes Thema).
- **Direkt auf [`main`](/glossar/main/):** Speichern kann sofort auf den Hauptzweig gehen → [Cloudflare](/glossar/cloudflare-pages/) baut neu. Simpel, aber jeder Klick kann live werden.
- **Bilder „Variante B“:** Dateien liegen neben dem Artikel — Astro kann sie optimieren (gut für **Page Speed**).

## Erst lokal gucken

- **[`npm install`](/glossar/npm/)** lädt die **Pakete** (Abhängigkeiten), die das Projekt braucht. Stehen in `package.json`, landen lokal in `node_modules`. Du machst das beim ersten Aufsetzen nach dem [Clone](/glossar/clone/), auf einem anderen Rechner oder wenn neue Abhängigkeiten dazukamen. Nicht bei jedem Öffnen des Projekts. Der KI-Agent in [Cursor](/glossar/cursor/) sagt dir das in der Regel oder führt es selbst aus. Schritt für Schritt: [Folge 018](/artikel/folge-018-node-npm/). Online macht Cloudflare beim [Build](/glossar/build/) dasselbe automatisch.
- **`npm run dev`**: kurze Vorschau auf deinem Rechner, solange der Server läuft (Strg+C stoppt ihn, siehe [Folge 003](/artikel/folge-003-erstes-design/)).

Ist Cloudflare schon dran? [**Push**](/glossar/push/) = [Build](/glossar/build/). Darum pusht der Agent bei hautuu nur **auf dein Wort**. [Pull](/glossar/pull/), [Merge](/glossar/merge/) und typische Stolpersteine: [Folge 006](/artikel/folge-006-git-push-pull/).

In derselben Session ging’s schon um dunkles Theme, grüne Klick-Farbe, Ubuntu-Schrift, und dass Issues besser sind als „hab ich mal im Chat gesagt“.

<!-- Quelle: 2026-10-03--01-35-20--obs-screencast - hautoo - github - issues.txt -->
