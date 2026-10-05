---
title: FAQ
description: Häufige Fragen zu hautuu, Git, Cursor, Cloudflare und dem CMS.
status: published
publishDate: 2026-10-04
modifiedDate: 2026-10-05
backgroundImage: /assets/sebastien-goldberg-9R_bNdo4-2I-unsplash.webp
backgroundOverlay: 88
backgroundAttribution: Photo by <a href="https://unsplash.com/@sebastiengoldberg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Sébastien Goldberg</a> on <a href="https://unsplash.com/photos/a-sea-turtle-swimming-in-the-ocean-9R_bNdo4-2I?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
showToc: true
tocTitle: Inhalt
tocLevels:
- h2
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
  seo_title: FAQ zu hautuu, Git, Cursor und Cloudflare
  seo_description: Antworten auf häufige Fragen zu hautuu, Git, Cursor, Astro, Cloudflare und dem CMS. Kurz, verlinkt und per Strg+F durchsuchbar auf einer Seite.
---

Antworten kurz und mit Links zu den [Folgen](/artikel/) und zum [Glossar](/glossar/). Alles steht offen auf der Seite, damit du mit der Browsersuche (Strg+F) jede Formulierung findest.

## Einstieg

### Was ist hautuu überhaupt?

Ein öffentliches Lernprojekt: [**Astro**](/glossar/astro/) baut statische Seiten, [**GitHub**](/glossar/github/) speichert den Stand, [**Cursor**](/glossar/cursor/) hilft beim Bearbeiten, [**Cloudflare Pages**](/glossar/cloudflare-pages/) liefert sie aus. [Folge 001](/artikel/folge-001-hautuu-intro/).

### Kann ich das für meine eigene Website nachbauen?

Ja, das ist die Idee. Du brauchst Accounts, etwas Geduld und die Folgen Schritt für Schritt. hautuu zeigt einen Weg, kein fertiger Shop-Baukasten. [Folge 001](/artikel/folge-001-hautuu-intro/), [Über uns](/ueber-uns/).

### Wie forke ich hautoo für mein eigenes Projekt?

Auf GitHub beim Repo **Fork** wählen (deine Kopie unter deinem Account), dann den Fork klonen und in Cursor weiterbauen: Inhalte ersetzen, eigenes Hosting anbinden. [Glossar Fork](/glossar/fork/), [Folge 020](/artikel/folge-020-bausteine-fork/).

### Brauche ich Programmierkenntnisse?

Nein im klassischen Sinn. Du beschreibst Ziele in normaler Sprache, der Agent ändert Dateien. Terminal-Befehle kannst du oft kopieren. Trotzdem hilft Neugier, wenn etwas hakt. [Folge 008](/artikel/folge-008-cursor-modi/), [Folge 001](/artikel/folge-001-hautuu-intro/).

### Was ist der Unterschied zu WordPress?

hautuu ist **statisch**: keine Datenbank auf dem Server, Inhalte liegen als Dateien in Git. [**Astro**](/glossar/astro/) erzeugt HTML beim [**Build**](/glossar/build/). [Folge 002](/artikel/folge-002-github-issues/).

### Was heißt „statische Website“?

Fertige HTML-Seiten werden ausgeliefert, nicht bei jedem Klick neu aus einer Datenbank zusammengebaut. Das ist dein [**Frontend**](/glossar/frontend/). Schnell und schlicht, dafür kein klassisches Plugin-Ökosystem. [Glossar Astro](/glossar/astro/), [Folge 002](/artikel/folge-002-github-issues/).

### Was ist der Unterschied zwischen Frontend und Backend?

**Frontend** sehen Besucher (gebautes HTML/CSS). Das [**Backend**](/glossar/backend/) ist bei hautuu vor allem Speicher (GitHub), Redaktion (`/admin/`) und optional der [**Worker**](/glossar/cloudflare-worker/) für OAuth, keine WordPress-Datenbank. [Folge 002](/artikel/folge-002-github-issues/), [Folge 014](/artikel/folge-014-sveltia-worker/).

### Hat meine Seite überhaupt ein Backend?

Kein klassisches Server-Backend mit Datenbank. Inhalte liegen in Git, die Live-Site ist statisch. Kleine Backend-Bausteine gibt es fürs CMS-Login. [Folge 011](/artikel/folge-011-cloudflare-setup/), [Folge 013](/artikel/folge-013-sveltia-pat/).

### Wo fange ich sinnvoll an?

Repo anlegen, lokal klonen, Cursor öffnen, grobe Richtung verstehen. Danach Issues, Design, Cloudflare, CMS. [Folge 001](/artikel/folge-001-hautuu-intro/), [Folge 002](/artikel/folge-002-github-issues/).

### Wo liegt die „Wahrheit“, und wo arbeite ich?

Zentral auf **GitHub**. Lokal ist deine Werkstatt. Nach [**Push**](/glossar/push/) baut Cloudflare die Live-Site. [Folge 001](/artikel/folge-001-hautuu-intro/), [Folge 006](/artikel/folge-006-git-push-pull/).

### Muss ich am Anfang alles verstehen?

Nein. Erst ein Bild im Kopf, Details in den Folgen und im [Glossar](/glossar/). [Folge 001](/artikel/folge-001-hautuu-intro/).

---

## Voraussetzungen und Kosten

### Was kostet das alles?

Viele Bausteine haben **kostenlose Einstiegstarife** (öffentliches GitHub-Repo, Cloudflare Pages für statische Sites, Astro als Open Source). **Cursor** ist kostenpflichtig je nach Plan und Nutzung. Aktuelle Preise immer auf cursor.com, github.com und cloudflare.com prüfen. [Folge 009](/artikel/folge-009-cursor-abo/).

### Muss ich einen eigenen Server mieten?

Nein. Cloudflare **hostet** die gebaute Site; du pflegst Code und Inhalte in Git. [Folge 011](/artikel/folge-011-cloudflare-setup/).

### Welchen Rechner und welches Betriebssystem brauche ich?

In den Folgen: **Linux** oder **Mac** (ähnliche Pfade für Terminal und SSH). Windows geht mit angepassten Tools, im Projekt liegt der Fokus auf Linux/Mac. [Folge 017](/artikel/folge-017-github-ssh/), [Folge 018](/artikel/folge-018-node-npm/).

### Brauche ich eine virtuelle Maschine?

Optional. Manche nutzen eine VM für Experimente oder Cloud Agents; du kannst aber auch direkt auf deinem Rechner starten. [Folge 009](/artikel/folge-009-cursor-abo/), [Folge 015](/artikel/folge-015-transkript-artikel/).

### Welche Accounts muss ich anlegen?

Mindestens **GitHub** und **Cursor**; für Live-Hosting **Cloudflare** und Verknüpfung mit dem Repo. [Folge 001](/artikel/folge-001-hautuu-intro/), [Folge 011](/artikel/folge-011-cloudflare-setup/).

### Wie viel Zeit soll ich einplanen?

Das Projekt wächst in vielen Sessions. Plane lieber mehrere Abende ein als „fertig in einer Stunde“. Die Folgen sind der rote Faden.

### Reicht mein Internet?

Ja, für Git, Builds in der Cloud und Downloads wie `npm install`. Große Medien lokal sparen Bandbreite. [Folge 018](/artikel/folge-018-node-npm/).

### Brauche ich Chrome für das CMS?

Für Sveltia online wird **Chrome/Chromium** empfohlen; Firefox klappt fürs Backend oft nicht. [Folge 013](/artikel/folge-013-sveltia-pat/).

### Ist hautuu nur eine Demo oder „echt“ live?

Echte Site unter der Projekt-Domain, öffentliches Repo, echte Deployments. Du kannst mitlesen und denselben Stack lernen. [Über uns](/ueber-uns/).

### Muss ich KI extra bezahlen neben Cursor?

Cursor-Abos enthalten Kontingente; stärkere Modelle und **Cloud Agents** verbrauchen mehr. On-Demand-Nachkauf ist möglich, kann teuer werden. [Folge 009](/artikel/folge-009-cursor-abo/).

---

## Terminal und Rechner

### Was ist ein Terminal und brauche ich das?

Ein Textfenster für Befehle (auch **Konsole** oder **Kommandozeile**). In [Cursor](/glossar/cursor/) ist oft eins eingebaut. Für hautuu reicht meist: Befehle aus den Folgen kopieren oder der Agent tippt sie. [Glossar Terminal](/glossar/terminal/), [Folge 001](/artikel/folge-001-hautuu-intro/), [Folge 008](/artikel/folge-008-cursor-modi/).

### Was ist eine CLI?

Programme wie [Git](/glossar/git/), [npm](/glossar/npm/) oder `ssh-keygen`, die du per Text im [Terminal](/glossar/terminal/) bedienst. [Glossar CLI](/glossar/cli/), [Folge 006](/artikel/folge-006-git-push-pull/), [Folge 018](/artikel/folge-018-node-npm/).

### Wie öffne ich ein Terminal?

In Cursor: Terminal-Leiste. Am System: je nach OS ein Programm wie „Terminal“ (Mac/Linux). [Folge 001](/artikel/folge-001-hautuu-intro/).

### Was bedeutet `cd`?

**Change directory**: in einen Ordner wechseln. Viele Befehle aus den Folgen setzen voraus, dass du im Projektordner bist. [Folge 017](/artikel/folge-017-github-ssh/).

### Warum beendet Strg+C meinen Server?

Im [Terminal](/glossar/terminal/) ist **Strg+C** Stopp, nicht Kopieren. `npm run dev` damit beenden. [Folge 003](/artikel/folge-003-erstes-design/).

### Was sind versteckte Dateien?

Namen mit Punkt am Anfang (z. B. `.git`, `.env`). Im Dateimanager oft per Strg+H sichtbar. [Folge 001](/artikel/folge-001-hautuu-intro/), [Folge 017](/artikel/folge-017-github-ssh/).

### Was ist das Home-Verzeichnis (`~`)?

Dein persönlicher Ordner unter Linux/Mac. `~/.ssh` liegt dort für SSH-Keys. [Folge 017](/artikel/folge-017-github-ssh/).

### Der Ordnername auf der Festplatte ist egal?

Ja, für Git zählt der Inhalt mit `.git`, nicht der Display-Name des Ordners. [Folge 006](/artikel/folge-006-git-push-pull/).

### Muss mein Rechner laufen, wenn der Cloud Agent arbeitet?

Nein. Der [**Cloud Agent**](/glossar/cloud-agent/) läuft in der Cloud; du liest das Ergebnis später auf GitHub. [Folge 015](/artikel/folge-015-transkript-artikel/).

---

## GitHub und Git

### Was ist der Unterschied zwischen Git und GitHub?

[**Git**](/glossar/git/) ist die Versionsverwaltung auf deinem Rechner. [**GitHub**](/glossar/github/) ist der Dienst, wo das Repo liegt und Issues/PRs laufen. [Folge 001](/artikel/folge-001-hautuu-intro/).

### Was ist ein Repository?

Der Projektordner unter Versionskontrolle. [Glossar Repository](/glossar/repository/), [Folge 001](/artikel/folge-001-hautuu-intro/).

### Was machen Commit, Push und Pull?

[**Commit**](/glossar/commit/) speichert lokal, [**Push**](/glossar/push/) schickt zu GitHub, [**Pull**](/glossar/pull/) holt Änderungen zu dir. [Folge 006](/artikel/folge-006-git-push-pull/).

### Warum geht Push manchmal nicht?

GitHub ist oft neuer als dein Ordner. Erst [**pullen**](/glossar/pull/), Konflikte lösen, dann pushen. [Folge 006](/artikel/folge-006-git-push-pull/).

### Was sind Issues?

[**Tickets**](/glossar/issue/) für Bugs, Ideen und Aufgaben. Im Chat: „Bitte Issue #5 umsetzen“. [Folge 002](/artikel/folge-002-github-issues/).

### Was ist ein Pull Request?

Vorschlag, einen [**Branch**](/glossar/branch/) in `main` (oder anders) zu mergen, mit Checks. [Glossar Pull Request](/glossar/pull-request/), [Folge 016](/artikel/folge-016-artikel-pull-request/).

### Was ist `main`?

Der Hauptzweig, den Cloudflare als Production baut. [Glossar Main](/glossar/main/), [Folge 012](/artikel/folge-012-cloudflare-branches/).

### Merge oder Rebase?

[**Merge**](/glossar/merge/) zeigt die Verzweigung; [**Rebase**](/glossar/rebase/) linearisiert. Einstieg: Merge reicht. [Folge 007](/artikel/folge-007-merge-rebase/).

### Wie hole ich das Projekt auf den Rechner?

[`git clone`](/glossar/clone/). Private Repos: [**SSH-Key**](/glossar/ssh-key/). [Folge 017](/artikel/folge-017-github-ssh/).

### Ist mein Code öffentlich?

Bei hautuu ja: **öffentliches** Repo, jeder kann lesen. Schreiben nur mit Berechtigung. [Folge 001](/artikel/folge-001-hautuu-intro/), [Folge 013](/artikel/folge-013-sveltia-pat/).

### Was ist ein Fork?

Deine Kopie eines fremden Repos unter deinem Account. Nicht verwechseln mit `git clone` allein. [Glossar Fork](/glossar/fork/), [Folge 002](/artikel/folge-002-github-issues/), [Folge 020](/artikel/folge-020-bausteine-fork/).

### Was ist `origin`?

Der Standardname für dein Remote auf GitHub. [Glossar Origin](/glossar/origin/), [Folge 001](/artikel/folge-001-hautuu-intro/).

---

## Cursor und KI

### Was ist der Unterschied zwischen Ask, Agent und Plan?

**Ask** fragt nur, **Agent** schreibt und nutzt das Terminal, **Plan** plant erst. [Glossar Ask, Agent und Plan](/glossar/cursor-modi/), [Folge 008](/artikel/folge-008-cursor-modi/).

### Warum zwei Chats?

Ein Chat sucht Probleme, einer fixt. Klarere Rollen. [Folge 010](/artikel/folge-010-cursor-chats/).

### Was sind Cloud Agents?

Agenten in der Cloud, Ergebnis oft ein [**Pull Request**](/glossar/pull-request/). [Glossar Cloud Agent](/glossar/cloud-agent/), [Folge 015](/artikel/folge-015-transkript-artikel/).

### Soll der Agent einfach pushen?

Bei hautuu: **nur auf dein Wort**, sonst ungewolltes Live-Deploy. [Folge 003](/artikel/folge-003-erstes-design/), [Folge 002](/artikel/folge-002-github-issues/).

### Kann die KI Fehler machen?

Ja. PRs, Preview und `npm run build` prüfen; du liest den Diff. [Folge 016](/artikel/folge-016-artikel-pull-request/), [Folge 010](/artikel/folge-010-cursor-chats/).

### Wie merke ich, dass die KI Mist gebaut hat?

Rote CI-Checks, Build-Fehler, kaputtes Layout in `npm run dev` oder Preview. Issue mit konkretem Symptom öffnen. [Folge 016](/artikel/folge-016-artikel-pull-request/).

### Was sind Tokens und Kontingente?

Recheneinheiten für Modelle; große Kontexte und Cloud Agents kosten mehr. [Folge 009](/artikel/folge-009-cursor-abo/).

### Wann Plan-Modus statt direkt Agent?

Bei größeren Features (z. B. Burger-Menü): Plan lesen, korrigieren, dann bauen. [Folge 008](/artikel/folge-008-cursor-modi/).

### Landen Chats im Repo?

Nur wenn du sie committest. Exporte nach `docs/sessions/` und `.gitignore` nutzen. [Folge 008](/artikel/folge-008-cursor-modi/).

### Was ist der IDE-Modus?

Dateibaum, Terminal, Agent: so arbeitest du am Projekt, nicht nur im Chat-Fenster. [Folge 008](/artikel/folge-008-cursor-modi/).

### Issues statt endlos im Chat erklären?

Ja. Issue beschreibt die Aufgabe dauerhaft auf GitHub. [Folge 002](/artikel/folge-002-github-issues/).

---

## Cloudflare

### Was macht Cloudflare Pages hier?

Baut nach Git-Push (`npm run build`, Output `dist`) und hostet die Site. [Folge 011](/artikel/folge-011-cloudflare-setup/).

### Was ist eine Preview-URL?

Temporäre Adresse für einen Branch, bevor du mergst. [Glossar Preview-URL](/glossar/preview-url/), [Folge 012](/artikel/folge-012-cloudflare-branches/).

### Kann ich eine alte Version zurückholen?

[**Rollback**](/glossar/rollback/) auf ein früheres Deployment. [Folge 012](/artikel/folge-012-cloudflare-branches/).

### Was ist der Worker?

[**Edge-Programm**](/glossar/cloudflare-worker/) z. B. für CMS-Login, nicht die Website selbst. [Folge 014](/artikel/folge-014-sveltia-worker/).

### Push heißt automatisch neu bauen?

Ja, wenn Pages mit dem Repo verbunden ist. [Folge 011](/artikel/folge-011-cloudflare-setup/).

### Wie bekomme ich eine eigene Domain?

Unter **Custom domains** in Pages, oft CNAME/TLS über Cloudflare. [Folge 011](/artikel/folge-011-cloudflare-setup/).

### Was ist die `pages.dev`-URL?

Die von Cloudflare vergebene Adresse zum Testen, auch für Previews. [Folge 011](/artikel/folge-011-cloudflare-setup/), [Folge 012](/artikel/folge-012-cloudflare-branches/).

### Wie lange dauert ein Deploy?

Oft wenige Minuten; manchmal hängt der Hook kurz. Unter Deployments in Cloudflare den Status sehen. [Folge 014](/artikel/folge-014-sveltia-worker/).

### Warum sehe ich meine Änderung nicht online?

Nicht gepusht, falscher Branch, Build noch läuft oder fehlgeschlagen, oder du schaust Preview statt Production. [Folge 006](/artikel/folge-006-git-push-pull/), [Folge 011](/artikel/folge-011-cloudflare-setup/).

### Woran erkenne ich, welcher Commit live ist?

Kurze Commit-ID in Cloudflare Pages vergleichen mit GitHub. [Folge 011](/artikel/folge-011-cloudflare-setup/).

---

## Sveltia CMS

### Was ist Sveltia und wo ist `/admin`?

[**Git-basiertes CMS**](/glossar/sveltia/) im Browser. Lokal: `npm run dev` und `/admin/`. [Folge 013](/artikel/folge-013-sveltia-pat/).

### Wie logge ich mich online ein?

Mit [**PAT**](/glossar/pat/) oder später GitHub-Login über [**Worker**](/glossar/cloudflare-worker/). [Folge 013](/artikel/folge-013-sveltia-pat/), [Folge 014](/artikel/folge-014-sveltia-worker/).

### Was sind Collections?

Inhaltstypen wie pages, articles, menus, blocks (Bausteine). [Glossar Collection](/glossar/collection/), [Folge 004](/artikel/folge-004-collection-pages/).

### Was ist ein Baustein und wie nutze ich ihn?

Wiederverwendbarer Inhalt ohne eigene URL in der Collection **blocks**. Einbinden mit `{{block id="slug"}}` oder Toolbar **Baustein** in Sveltia. [Glossar Baustein](/glossar/baustein/), [Folge 020](/artikel/folge-020-bausteine-fork/).

### Was ist Frontmatter?

Metadaten oben in der Datei; darunter [**Markdown**](/glossar/markdown/). [Glossar Frontmatter](/glossar/frontmatter/), [Folge 004](/artikel/folge-004-collection-pages/).

### Speichern heißt sofort live?

Nur wenn auf **main** gepusst und Production baut. Sonst Branch/Preview. [Folge 012](/artikel/folge-012-cloudflare-branches/).

### Was ist der lokale Modus?

Ordner auf der Platte öffnen, ohne Passwort, weil die Dateien schon da sind. [Folge 013](/artikel/folge-013-sveltia-pat/).

### Was sind Menüs im CMS?

Eigene **menus**-Collection, nicht nur pro Seite. [Folge 014](/artikel/folge-014-sveltia-worker/), [Folge 004](/artikel/folge-004-collection-pages/).

### Kann ich SEO-Felder pflegen?

Ja, z. B. Tab-Titel und Meta Description im CMS. [Folge 013](/artikel/folge-013-sveltia-pat/), [Folge 004](/artikel/folge-004-collection-pages/).

### Wo landen Bilder?

In der Medienbibliothek unter `src/assets` oder neben Artikeln, je nach Setup. [Folge 013](/artikel/folge-013-sveltia-pat/).

### Was passiert beim Speichern technisch?

Datei ändert sich, dann Commit zu GitHub, dann Cloudflare-Build. [Folge 013](/artikel/folge-013-sveltia-pat/).

---

## Node und npm

### Brauche ich Node.js?

Ja für `npm install`, `npm run dev` und `npm run build` lokal. Empfohlen: Version 22. [Folge 018](/artikel/folge-018-node-npm/).

### Was macht `npm install`?

Lädt Abhängigkeiten in `node_modules`. [Glossar npm](/glossar/npm/), [Folge 018](/artikel/folge-018-node-npm/).

### Was ist der Unterschied zwischen `npm run dev` und `npm run build`?

**dev** = Entwicklungsvorschau lokal, **build** = fertige Site für Production. [Folge 005](/artikel/folge-005-astro-toolbar/), [Folge 018](/artikel/folge-018-node-npm/).

### Was ist nvm?

[**Node Version Manager**](/glossar/nvm/) für mehrere Node-Versionen. [Folge 018](/artikel/folge-018-node-npm/).

### Was ist `localhost`?

Dein Rechner lokal; der Dev-Server zeigt oft Port 4321. [Folge 018](/artikel/folge-018-node-npm/), [Folge 013](/artikel/folge-013-sveltia-pat/).

### Committe ich `node_modules`?

Nein. Nur `package.json` / Lockfile im Repo; installieren kann jeder mit `npm install`. [Folge 018](/artikel/folge-018-node-npm/).

### Was ist `package.json`?

Liste der npm-Abhängigkeiten und Skripte wie `dev` und `build`. [Folge 018](/artikel/folge-018-node-npm/).

### Baut Cloudflare auch mit npm?

Ja, derselbe Build-Befehl wie lokal. [Folge 011](/artikel/folge-011-cloudflare-setup/), [Folge 002](/artikel/folge-002-github-issues/).

---

## Inhalte pflegen

### Wie schreibe ich einen Artikel ohne Code?

Im [**CMS**](/glossar/cms/) unter `/admin/` oder Markdown in Cursor. [Folge 013](/artikel/folge-013-sveltia-pat/).

### Wie binde ich ein Video ein?

Artikel-Felder `videoProvider` (YouTube/Vimeo) und `videoId` im CMS; in den Folgen oft noch Platzhalter. [Folge 001](/artikel/folge-001-hautuu-intro/), [Folge 016](/artikel/folge-016-artikel-pull-request/).

### Was sind Tags?

Stichworte zu Artikeln, keine tiefe Kategorie-Hierarchie. [Folge 004](/artikel/folge-004-collection-pages/).

### Was ist das Artikel-Listing?

[**Komponente**](/glossar/komponente/) im Seiteninhalt: Anzahl, Sortierung, Grid. [Folge 019](/artikel/folge-019-impressum-komponenten/), [Folge 016](/artikel/folge-016-artikel-pull-request/).

### Was ist die Trennlinien-Komponente?

**Separator** im CMS mit Höhe und Breite. [Folge 019](/artikel/folge-019-impressum-komponenten/).

### Wie pflege ich das Glossar?

Eigene Collection `glossar`, Übersicht unter `/glossar/`. [Glossar](/glossar/), [Folge 004](/artikel/folge-004-collection-pages/).

### Kann ich Glossarbegriffe nachschlagen, ohne den Artikel zu verlassen?

In **Firefox** (Desktop, Link Previews ab Version 142): Rechtsklick auf den Glossar-Link → **Link-Vorschau**, oder Link lange gedrückt halten. Die Vorschau öffnet sich in Firefox, der Artikel bleibt im Hintergrund. Lokal mit `localhost` funktioniert das oft nicht; auf der Live-Site schon. [Folge 020](/artikel/folge-020-bausteine-fork/), [Mozilla-Hilfe](https://support.mozilla.org/kb/use-link-previews-firefox).

### Kann ich Artikel aus Videos erzeugen lassen?

Transkript + [**Cloud Agent**](/glossar/cloud-agent/) + Pull Request, dann prüfen. [Folge 015](/artikel/folge-015-transkript-artikel/).

### Wie passe ich Design und Abstände an?

Issues an den Agenten, bestehende CSS-Klassen nutzen. [Folge 003](/artikel/folge-003-erstes-design/), [Folge 005](/artikel/folge-005-astro-toolbar/).

### Was sind Breakpoints?

Layout-Umschaltung z. B. unter 680 px mobil. [Glossar Breakpoint](/glossar/breakpoint/), [Folge 005](/artikel/folge-005-astro-toolbar/).

### Seiten-Hintergrundbild?

Optionales Feld in Pages, Lesbarkeit per Overlay. [Folge 015](/artikel/folge-015-transkript-artikel/), [Folge 019](/artikel/folge-019-impressum-komponenten/).

---

## Rechtliches

### Brauche ich Impressum und Datenschutz?

Für einen öffentlichen Auftritt in Deutschland üblicherweise ja. Inhalte prüfen lassen, nicht blind der KI überlassen. [Folge 019](/artikel/folge-019-impressum-komponenten/), [Folge 003](/artikel/folge-003-erstes-design/).

### Wo liegen die Texte?

Als normale Pages im Repo, oft im Footer verlinkt. [Folge 003](/artikel/folge-003-erstes-design/).

### Sollen Legal-Seiten bei Google indexiert werden?

Oft **noindex** für Impressum/Datenschutz. [Folge 004](/artikel/folge-004-collection-pages/).

### Wie schütze ich die Kontakt-E-Mail?

[**ENV**](/glossar/env/) lokal und Secrets bei Cloudflare, nicht im Repo. [Folge 019](/artikel/folge-019-impressum-komponenten/).

### Bildnachweise?

Attribution-Felder; Credits können im Impressum landen. [Folge 003](/artikel/folge-003-erstes-design/), [Folge 019](/artikel/folge-019-impressum-komponenten/).

### KI-generierte Rechtstexte ungeprüft übernehmen?

Nein. Unpassende Abschnitte raus, Inhalt an dein Setup anpassen. [Folge 019](/artikel/folge-019-impressum-komponenten/).

---

## Sicherheit

### Was darf **nie** ins Repo?

Passwörter, [**PATs**](/glossar/pat/), API-Keys, private SSH-Keys, echte `.env`-Werte. [Folge 001](/artikel/folge-001-hautuu-intro/), [Folge 002](/artikel/folge-002-github-issues/).

### Ist ein PAT wie ein Passwort?

Ja. Einmal kopieren, nicht zeigen, bei Leak widerrufen. [Folge 013](/artikel/folge-013-sveltia-pat/).

### Darf ich meinen privaten SSH-Key teilen?

Nein. Nur die `.pub`-Datei gehört zu GitHub. [Folge 017](/artikel/folge-017-github-ssh/).

### Hilft ein öffentliches Repo Scrapern?

Ja, E-Mail im Klartext wäre sichtbar. Deshalb ENV/Secrets. [Folge 019](/artikel/folge-019-impressum-komponenten/).

### Wo liegen OAuth-Secrets?

Als Secrets im [**Worker**](/glossar/cloudflare-worker/), nicht in `config.yml` im Klartext. [Folge 014](/artikel/folge-014-sveltia-worker/).

### Gelöschte Dateien sind weg?

Aus dem aktuellen Stand ja, in der [**Historie**](/glossar/git-history/) oft noch lesbar. [Folge 006](/artikel/folge-006-git-push-pull/).

### Was sind Allowed domains im CMS?

Schutz, welche Domains Sveltia nutzen darf. [Folge 014](/artikel/folge-014-sveltia-worker/).

---

## Fehler und Problemlösung

### Was passiert, wenn ich etwas kaputt mache?

Git behält Historie; Cloudflare [**Rollback**](/glossar/rollback/); lokal Änderungen verwerfen. Nicht panisch. [Folge 012](/artikel/folge-012-cloudflare-branches/), [Folge 006](/artikel/folge-006-git-push-pull/).

### Merge-Konflikt, was tun?

Datei öffnen, Zeilen wählen, committen. Dem Agenten die Situation beschreiben. [Folge 006](/artikel/folge-006-git-push-pull/), [Folge 014](/artikel/folge-014-sveltia-worker/).

### PR-Build rot, was jetzt?

Logs lesen, oft `npm run build` lokal nachstellen, Fix committen. [Folge 016](/artikel/folge-016-artikel-pull-request/).

### Permission denied beim Clone?

Meist fehlender [**SSH-Key**](/glossar/ssh-key/) oder falscher Key bei GitHub. [Folge 017](/artikel/folge-017-github-ssh/).

### `npm run dev` startet nicht?

Node installiert? Vorher `npm install`? [Folge 018](/artikel/folge-018-node-npm/).

### /admin geht online nicht?

PAT/OAuth, Chrome, Cloudflare-Build, richtige Domain. [Folge 013](/artikel/folge-013-sveltia-pat/).

### Lokal sieht es anders aus als live?

Push vergessen, anderer Branch, oder Build noch nicht durch. [Folge 011](/artikel/folge-011-cloudflare-setup/).

### Preview zeigt es, Production nicht?

Noch nicht auf **main** gemergt und deployed. [Folge 012](/artikel/folge-012-cloudflare-branches/).

### Deployment fehlgeschlagen, Retry?

**Retry** baut denselben Commit nochmal, ersetzt keinen fehlenden Build. [Folge 014](/artikel/folge-014-sveltia-worker/).

### Der Agent hat 120 Gedankenstriche eingebaut?

Issue: Stil bereinigen, wie nach dem großen Artikel-Import. [Folge 016](/artikel/folge-016-artikel-pull-request/), [Folge 019](/artikel/folge-019-impressum-komponenten/).
