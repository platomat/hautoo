---
title: 'Folge 018: Node 22, npm install und npm run dev lokal'
summary: 'Nach dem Clone einmal npm install, danach für die lokale Vorschau meist nur npm run dev. Wann installieren wirklich nötig ist, steht als Checkliste.'
pubDate: 2026-10-04 20:22:22+00:00
modifiedDate: 2026-10-12
status: published
categories:
  - screencasts
  - werkzeuge
tags:
- node
- astro
- cursor
authors:
  - wasilij
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 018: Node 22, npm install und npm run dev lokal'
  seo_description: Node 22, npm install nach dem Clone und npm run dev für die lokale Astro-Vorschau. Wann npm install wirklich nötig ist und wann nicht.
---

Das [Repo](/glossar/repository/) enthält Quellcode und `package.json`, aber nicht den ganzen **`node_modules`**-Berg. In deiner lokalen [IDE](/glossar/ide/) ([Entwicklungsumgebung](/glossar/ide/)) brauchst du [**Node.js**](/glossar/nodejs/) (für hautuu empfohlen: **Version 22**) und [npm](/glossar/npm/), damit `npm run dev` und `npm run build` laufen.

{{repodoc path="docs/astro/README.md" title="Astro" description="Framework, Build-Befehle und Ausgabeordner."}}

{{repodoc path="docs/entwicklung/README.md" title="Lokale Entwicklung" description="Node, npm und Dev-Server im Projekt."}}

## Node installieren

Auf [nodejs.org](https://nodejs.org/) liegt ein **Linux-Install-Skript** (oft per `curl` | `bash`). Fehlt `curl`, zuerst:

```bash
sudo apt update
sudo apt install curl
```

Kaputte Paketlisten auf einem frisch eingerichteten Rechner fixst du ggf. mit `sudo apt-get update` und den Hinweisen aus `apt` (broken packages, fix-missing). Danach das [Node](/glossar/nodejs/)-Skript erneut ausführen. Das Setup legt oft [**nvm**](/glossar/nvm/) mit, sodass mehrere [Node](/glossar/nodejs/)-Versionen parallel möglich sind.

Prüfen:

```bash
node -v
```

Ziel: etwas wie `v22.x.x`.

## Erstes Aufsetzen im Projektordner

Nach dem [Clone](/glossar/clone/) einmal Abhängigkeiten holen und den Dev-Server starten:

```bash
npm install
npm run dev
```

[`npm install`](/glossar/npm/) liest `package.json` (und im Repo auch `package-lock.json`) und legt die Pakete in `node_modules` ab, wie in der [npm-Doku zu `install`](https://docs.npmjs.com/cli/v10/commands/npm-install) beschrieben. Darin stecken [Astro](/glossar/astro/), [Sveltia](/glossar/sveltia/)-[Build](/glossar/build/)-Tools und weitere Bibliotheken. npm ist eine [CLI](/glossar/cli/).

`npm run dev` startet den **Entwicklungsmodus** (Skript `dev` in `package.json`, Tabelle der npm-Skripte in der Repo-Doku **Lokale Entwicklung** weiter oben). Du bekommst eine lokale URL (oft `http://localhost:4321`). Link im [Terminal](/glossar/terminal/) anklicken oder URL kopieren; [CMS](/glossar/cms/)-Vorschau dann unter `/admin/`.

## Alltag: meist reicht `npm run dev`

Wenn `node_modules` schon da ist und sich an den Abhängigkeiten nichts geändert hat, startest du die Vorschau **ohne** vorheriges `npm install`:

```bash
npm run dev
```

Das gilt auch, wenn du den Dev-Server gestern beendet hast und heute weiterarbeitest: einfach wieder `npm run dev` im Projektordner. Texte, Artikel, Bilder oder CSS im Repo ändern daran nichts. `node_modules` liegt lokal auf deinem Rechner und wird nicht mit [Commit](/glossar/commit/) und [Push](/glossar/push/) mit hochgeladen ([Folge 002](/artikel/folge-002-github-issues/)).

So testest du Änderungen **ohne** jedes Mal auf **[main](/glossar/main/)** zu pushen. Für öffentliche Previews nutzt du weiter [**Branches**](/glossar/branch/) und [Cloudflare](/glossar/cloudflare-pages/)-URLs mit „Preview“ (Vorschau) ([Folge 012](/artikel/folge-012-cloudflare-branches/)).

## Wann `npm install` nötig ist

- **Erstes Mal nach dem Klonen**<br>Ohne `node_modules` kann `npm run dev` die Pakete nicht finden. Einmal `npm install` im Projektroot, danach Dev-Server.
- **`package.json` oder `package-lock.json` haben sich geändert**<br>Nach [Pull](/glossar/pull/) oder [Merge](/glossar/merge/), wenn jemand (oder ein Agent in [Cursor](/glossar/cursor/)) neue Abhängigkeiten eingetragen hat. npm synchronisiert dann `node_modules` mit der Datei im Repo.
- **`node_modules` fehlt oder wurde gelöscht**<br>Der Ordner ist groß und steht in `.gitignore`. Wenn er weg ist, Abhängigkeiten neu installieren.
- **Andere Node-Version aktiv**<br>Nach Wechsel mit [nvm](/glossar/nvm/) oder neu installiertem Node: installieren erneut ausführen, damit native Module zur laufenden Version passen (in der Praxis der sichere Standard).
- **`npm run dev` bricht mit „Cannot find module“ o. Ä. ab**<br>Oft fehlt ein Paket oder der Stand von `node_modules` passt nicht mehr. `npm install` erneut; wenn es dann noch scheitert, Fehlermeldung und Lockfile-Änderungen prüfen.

## Wann `npm install` nicht nötig ist

- **Normale Inhaltsarbeit**<br>Markdown unter `src/content/`, Seiten, Glossar, Bilder: speichern, Browser aktualisieren oder Hot Reload vom Dev-Server reicht.
- **Dev-Server neu starten**<br>Terminal mit `Ctrl+C` beendet, später wieder `npm run dev`: kein Install-Schritt dazwischen, solange die Fälle oben nicht zutreffen.
- **Nur Git holen ohne Dependency-Änderung**<br>Pull mit reinen Text- oder Layout-Commits: weiter mit `npm run dev` arbeiten.

## Was npm hier nicht ist

Du hostest die fertige Site nicht mit `npm run dev`. [Production](/glossar/production/) läuft über [**Cloudflare Pages**](/glossar/cloudflare-pages/) nach [Push](/glossar/push/) ([Folge 011](/artikel/folge-011-cloudflare-setup/)). Lokal ist npm nur Werkzeugkiste: installieren, entwickeln, `npm run build` vor dem [Commit](/glossar/commit/) wenn du den Produktions[build](/glossar/build/) prüfen willst.

<!-- Quelle: 2026-10-04--20-22-22--obs-screencast - hautoo - 018 - nvm, npm, node.txt -->
