---
title: "Folge 018: Node 22, npm install und npm run dev lokal"
summary: "Nach dem Clone: Node über das offizielle Install-Skript, Abhängigkeiten mit npm install, Entwicklungsserver mit npm run dev."
pubDate: 2026-10-04T20:22:22Z
modifiedDate: 2026-10-04
status: published
tags:
  - node
  - astro
  - cursor
seo:
  index_visibility: index
  follow_visibility: follow
---

Das Repo enthält Quellcode und `package.json`, aber nicht den ganzen **`node_modules`**-Berg. Lokal brauchst du **Node.js** (für hautuu empfohlen: **Version 22**) und **npm**, damit `npm run dev` und `npm run build` laufen.

## Node installieren

Auf [nodejs.org](https://nodejs.org/) liegt ein **Linux-Install-Skript** (oft per `curl` | `bash`). Fehlt `curl`, zuerst:

```bash
sudo apt update
sudo apt install curl
```

Kaputte Paketlisten auf einer frischen VM fixst du ggf. mit `sudo apt-get update` und den Hinweisen aus `apt` (broken packages, fix-missing). Danach das Node-Skript erneut ausführen. Das Setup legt oft **nvm** mit, sodass mehrere Node-Versionen parallel möglich sind.

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

`npm install` lädt alle in `package.json` genannten Pakete (Astro, Sveltia-Build-Tools, …). `npm run dev` baut die Site im **Entwicklungsmodus** und zeigt eine lokale URL (oft `localhost:4321`). Link im Terminal anklicken oder URL kopieren.

So testest du Änderungen **ohne** jedes Mal auf **main** zu pushen. Für öffentliche Previews nutzt du weiter **Branches** und Cloudflare-**Preview**-URLs, wie in den Cloudflare-Folgen.

## Was npm hier nicht ist

Du hostest die fertige Site nicht mit `npm run dev`. Production läuft über **Cloudflare Pages** nach Push. Lokal ist npm nur Werkzeugkiste: installieren, entwickeln, `npm run build` vor dem Commit wenn du den Produktionsbuild prüfen willst.

<!-- Quelle: 2026-10-04--20-22-22--obs-screencast - hautoo - 018 - nvm, npm, node.txt -->
