---
title: FAQ
description: Häufige Fragen zu hautuu, Git, Cursor, Cloudflare und dem CMS.
status: published
publishDate: 2026-10-04
modifiedDate: 2026-10-04
seo:
  index_visibility: index
  follow_visibility: follow
  noarchive: false
  noimageindex: false
  nosnippet: false
  max_snippet_enabled: true
  max_snippet: -1
  max_video_preview_enabled: true
  max_video_preview: -1
  max_image_preview_enabled: true
  max_image_preview: large
---

Antworten kurz und mit Links zu den Folgen und zum [Glossar](/glossar/). Alles steht offen auf der Seite, damit du mit der Browsersuche (Strg+F) jede Formulierung findest.

## Einstieg

### Was ist hautuu überhaupt?

Ein öffentliches Lernprojekt: statische Website mit [**Astro**](/glossar/astro/), Inhalte in [**GitHub**](/glossar/github/), Bearbeitung mit [**Cursor**](/glossar/cursor/), Auslieferung über [**Cloudflare Pages**](/glossar/cloudflare-pages/). Überblick in [Folge 001](/artikel/folge-001-hautuu-intro/).

### Wo liegt die „Wahrheit“, und wo arbeite ich?

Die zentrale Version liegt auf **GitHub**. Auf deinem Rechner ist eine Kopie zum Bearbeiten. Nach [**Push**](/glossar/push/) baut Cloudflare die Live-Site. [Folge 001](/artikel/folge-001-hautuu-intro/), [Folge 006](/artikel/folge-006-git-push-pull/).

### Muss ich am Anfang alles verstehen?

Nein. In [Folge 001](/artikel/folge-001-hautuu-intro/) reicht ein grobes Bild; Details kommen in den folgenden Artikeln und im Glossar.

### Darf ich Geheimnisse ins Repo legen?

Nein. Das Repo ist öffentlich; gelöschte Dateien bleiben in der [**Git-Historie**](/glossar/git-history/). Tokens, Passwörter und private Keys gehören nicht in Commits. [Folge 001](/artikel/folge-001-hautuu-intro/), [Folge 002](/artikel/folge-002-github-issues/).

## GitHub und Git

### Was ist ein Repository?

Der Projektordner unter Versionskontrolle auf GitHub. Kurz: [Glossar Repository](/glossar/repository/), [Folge 001](/artikel/folge-001-hautuu-intro/).

### Was machen Commit, Push und Pull?

[**Commit**](/glossar/commit/) speichert einen Stand lokal, [**Push**](/glossar/push/) schickt ihn zu GitHub, [**Pull**](/glossar/pull/) holt Remote-Änderungen zu dir. [Folge 001](/artikel/folge-001-hautuu-intro/), [Folge 006](/artikel/folge-006-git-push-pull/).

### Warum geht Push manchmal nicht?

Oft ist GitHub neuer als dein Ordner. Dann zuerst [**pullen**](/glossar/pull/), Konflikte lösen, dann pushen. [Folge 006](/artikel/folge-006-git-push-pull/).

### Was sind Issues und wofür sind sie gut?

[**Issues**](/glossar/issue/) sind Tickets auf GitHub (Bug, Idee, Aufgabe). Du verweist im Chat darauf, statt alles neu zu erklären. [Folge 002](/artikel/folge-002-github-issues/).

### Was ist ein Pull Request?

Ein Vorschlag, Änderungen von einem [**Branch**](/glossar/branch/) in einen anderen zu übernehmen, mit Review und Checks. [Glossar Pull Request](/glossar/pull-request/), [Folge 016](/artikel/folge-016-artikel-pull-request/).

### Was ist der Branch main?

Der Hauptzweig; bei hautuu baut Cloudflare ihn als Production. Experimente laufen auf anderen Branches. [Glossar Main](/glossar/main/), [Folge 012](/artikel/folge-012-cloudflare-branches/).

### Merge oder Rebase?

[**Merge**](/glossar/merge/) behält die Verzweigung sichtbar; [**Rebase**](/glossar/rebase/) macht die Historie linear, ist aber kniffeliger. Für den Einstieg reicht oft Merge. [Folge 007](/artikel/folge-007-merge-rebase/).

### Wie hole ich das Projekt auf den Rechner?

Mit [`git clone`](/glossar/clone/). Bei einem **privaten** Repo brauchst du [**SSH-Keys**](/glossar/ssh-key/). [Folge 001](/artikel/folge-001-hautuu-intro/), [Folge 017](/artikel/folge-017-github-ssh/).

## Cursor und KI

### Was ist der Unterschied zwischen Ask, Agent und Plan?

**Ask** nur Fragen, **Agent** darf Dateien und Terminal nutzen, **Plan** erstellt erst einen Plan, dann baust du im Agent-Modus. Überblick: [Glossar Ask, Agent und Plan](/glossar/cursor-modi/). [Folge 008](/artikel/folge-008-cursor-modi/).

### Warum zwei Chats statt einem?

Ein Chat für „Fehler suchen“, einer für „sauber fixen“ hält Rollen klar. [Folge 010](/artikel/folge-010-cursor-chats/).

### Was sind Cloud Agents?

[**Cursor-Agenten**](/glossar/cloud-agent/), die in der Cloud laufen; oft mit [**Pull Request**](/glossar/pull-request/) als Ergebnis. Kostet mehr Tokens als kurz lokal. [Folge 009](/artikel/folge-009-cursor-abo/), [Folge 015](/artikel/folge-015-transkript-artikel/).

### Soll der Agent einfach pushen?

Bei hautuu: **nur auf dein Wort**, sonst baut Cloudflare ungewollt live. [Folge 002](/artikel/folge-002-github-issues/), [Folge 003](/artikel/folge-003-erstes-design/).

### Landen meine Chats im öffentlichen Repo?

Nur wenn du sie committest. Chat-Exporte gehören z. B. nach `docs/sessions/` und der Ordner in `.gitignore`, damit nichts mitcommittet wird. [Folge 008](/artikel/folge-008-cursor-modi/), [Folge 010](/artikel/folge-010-cursor-chats/).

## Cloudflare

### Was macht Cloudflare Pages für hautuu?

Verbindet sich mit GitHub, führt `npm run build` aus und hostet den Ordner `dist`. [Glossar Cloudflare Pages](/glossar/cloudflare-pages/), [Folge 011](/artikel/folge-011-cloudflare-setup/).

### Was ist eine Preview-URL?

Eine temporäre Adresse für einen Branch-Build, bevor du auf [**main**](/glossar/main/) mergst. [Glossar Preview-URL](/glossar/preview-url/), [Folge 012](/artikel/folge-012-cloudflare-branches/).

### Kann ich eine alte Live-Version zurückholen?

Ja, Rollback auf ein früheres Deployment in Cloudflare, ohne die Git-Historie zu löschen. [Glossar Rollback](/glossar/rollback/), [Folge 012](/artikel/folge-012-cloudflare-branches/).

### Was ist ein Cloudflare Worker in diesem Projekt?

Kleines Programm am Edge, z. B. OAuth-Brücke zwischen [**Sveltia**](/glossar/sveltia/) und GitHub. Nicht die Website selbst. [Glossar Cloudflare Worker](/glossar/cloudflare-worker/), [Folge 014](/artikel/folge-014-sveltia-worker/).

### Push heißt automatisch neu bauen?

Ja, wenn Pages an das Repo hängt: Push auf den Production-Branch startet einen [**Build**](/glossar/build/). [Folge 011](/artikel/folge-011-cloudflare-setup/), [Folge 002](/artikel/folge-002-github-issues/).

## Sveltia CMS

### Was ist Sveltia und wo liegt `/admin`?

Ein [**CMS**](/glossar/cms/) im Browser; Änderungen landen als Dateien in Git. [Glossar Sveltia](/glossar/sveltia/), [Folge 013](/artikel/folge-013-sveltia-pat/).

### Wie logge ich mich ein, wenn das Repo öffentlich ist?

Lesezugriff ist für alle, Schreiben braucht einen [**PAT**](/glossar/pat/) oder später **Sign in with GitHub** über einen Worker. [Folge 013](/artikel/folge-013-sveltia-pat/), [Folge 014](/artikel/folge-014-sveltia-worker/).

### Was sind Collections?

Typisierte Inhaltssätze (z. B. pages, articles, [**menus**](/glossar/collection/), glossar). [Glossar Collection](/glossar/collection/), [Folge 004](/artikel/folge-004-collection-pages/).

### Was ist Frontmatter?

Die Metadaten oben in einer `.md`-Datei zwischen den Trennlinien; der Body darunter ist [**Markdown**](/glossar/markdown/). [Glossar Frontmatter](/glossar/frontmatter/), [Folge 004](/artikel/folge-004-collection-pages/).

### Speichern im CMS heißt sofort live?

Nur wenn du auf **main** committest und Cloudflare Production baut. Sonst Branch und Preview nutzen. [Folge 013](/artikel/folge-013-sveltia-pat/), [Folge 012](/artikel/folge-012-cloudflare-branches/).

## Node und npm

### Brauche ich Node.js lokal?

Ja, für `npm install`, `npm run dev` und `npm run build`. Empfohlen: Node 22. [Glossar Node.js](/glossar/nodejs/), [Folge 018](/artikel/folge-018-node-npm/).

### Was macht npm install?

Lädt Abhängigkeiten in `node_modules` (nicht alles liegt im Repo). [Glossar npm](/glossar/npm/), [Folge 018](/artikel/folge-018-node-npm/).

### Was ist der Unterschied zwischen npm run dev und npm run build?

**dev** ist die Entwicklungsvorschau lokal; **build** erzeugt die statische Site für Production (auch auf Cloudflare). [Folge 005](/artikel/folge-005-astro-toolbar/), [Folge 018](/artikel/folge-018-node-npm/), [Glossar Build](/glossar/build/).

### Was ist nvm?

[**Node Version Manager**](/glossar/nvm/), falls du mehrere Node-Versionen brauchst. Oft Teil des offiziellen Install-Skripts. [Folge 018](/artikel/folge-018-node-npm/).

## Rechtliches und Inhalte

### Wo liegen Impressum und Datenschutz?

Als normale [**Pages**](/glossar/collection/) im Repo, oft mit **noindex** für SEO. [Folge 003](/artikel/folge-003-erstes-design/), [Folge 019](/artikel/folge-019-impressum-komponenten/).

### Wie schütze ich die Kontakt-E-Mail vor Scrapern?

Nicht als Klartext ins Repo: [**Umgebungsvariable**](/glossar/env/) in `.env` lokal und als Secret bei Cloudflare. [Folge 019](/artikel/folge-019-impressum-komponenten/).

### Was ist das Artikel-Listing im CMS?

Eine [**Komponente**](/glossar/komponente/), mit der du im Seiteninhalt festlegst, welche Artikel wo und wie sortiert erscheinen. [Folge 016](/artikel/folge-016-artikel-pull-request/), [Folge 019](/artikel/folge-019-impressum-komponenten/).

### Kann ich Artikel aus Screencasts automatisch erzeugen lassen?

Ja: Transkripte sammeln, [**Cloud Agent**](/glossar/cloud-agent/) mit Pull Request beauftragen, vor dem Merge prüfen. [Folge 015](/artikel/folge-015-transkript-artikel/), [Folge 016](/artikel/folge-016-artikel-pull-request/).
