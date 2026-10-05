---
title: 'Folge 018: Node 22, npm install und npm run dev lokal'
summary: 'Nach dem Clone: Node über das offizielle Install-Skript, Abhängigkeiten mit npm install, Entwicklungsserver mit npm run dev.'
pubDate: 2026-10-04 20:22:22+00:00
modifiedDate: 2026-10-06
status: published
tags:
- node
- astro
- cursor
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 018: Node 22, npm install und npm run dev lokal'
  seo_description: Nach dem Clone Node 22 installieren, npm install und npm run dev für Astro lokal. Folge 018 bringt deine Entwicklungsumgebung zum Laufen.
---

Das [Repo](/glossar/repository/) enthält Quellcode und `package.json`, aber nicht den ganzen **`node_modules`**-Berg. In deiner lokalen [IDE](/glossar/ide/) ([Entwicklungsumgebung](/glossar/ide/)) brauchst du [**Node.js**](/glossar/nodejs/) (für hautuu empfohlen: **Version 22**) und **npm**, damit `npm run dev` und `npm run build` laufen.

{{repodoc path="docs/astro/README.md" title="Astro" description="Framework, Build-Befehle und Ausgabeordner."}}

{{repodoc path="docs/entwicklung/README.md" title="Lokale Entwicklung" description="Node, npm und Dev-Server im Projekt."}}

## Node installieren

Auf [nodejs.org](https://nodejs.org/) liegt ein **Linux-Install-Skript** (oft per `curl` | `bash`). Fehlt `curl`, zuerst:

```bash
sudo apt update
sudo apt install curl
```

Kaputte Paketlisten auf einem frisch eingerichteten Rechner fixst du ggf. mit `sudo apt-get update` und den Hinweisen aus `apt` (broken packages, fix-missing). Danach das [Node](/glossar/nodejs/)-Skript erneut ausführen. Das Setup legt oft [**nvm**](/glossar/nvm/) mit, sodass mehrere Node-Versionen parallel möglich sind.

Prüfen:

```bash
node -v
```

Ziel: etwas wie `v22.x.x`.

## Abhängigkeiten und Dev-Server

Im Projektordner:

```bash
npm install
npm run dev
```

[`npm install`](/glossar/npm/) lädt alle in `package.json` genannten Pakete ([Astro](/glossar/astro/), [Sveltia](/glossar/sveltia/)-[Build](/glossar/build/)-Tools, …). Das Tool ist eine [CLI](/glossar/cli/). `npm run dev` baut die Site im **Entwicklungsmodus** und zeigt eine lokale URL (oft `http://localhost:4321`). Link im [Terminal](/glossar/terminal/) anklicken oder URL kopieren; CMS-Vorschau dann unter `/admin/`.

So testest du Änderungen **ohne** jedes Mal auf **[main](/glossar/main/)** zu pushen. Für öffentliche Previews nutzt du weiter [**Branches**](/glossar/branch/) und [Cloudflare](/glossar/cloudflare-pages/)-**Preview**-URLs ([Folge 012](/artikel/folge-012-cloudflare-branches/)).

## Was npm hier nicht ist

Du hostest die fertige Site nicht mit `npm run dev`. [Production](/glossar/production/) läuft über [**Cloudflare Pages**](/glossar/cloudflare-pages/) nach [Push](/glossar/push/) ([Folge 011](/artikel/folge-011-cloudflare-setup/)). Lokal ist npm nur Werkzeugkiste: installieren, entwickeln, `npm run build` vor dem [Commit](/glossar/commit/) wenn du den Produktionsbuild prüfen willst.

<!-- Quelle: 2026-10-04--20-22-22--obs-screencast - hautoo - 018 - [nvm](/glossar/nvm/), [npm](/glossar/npm/), node.txt -->
