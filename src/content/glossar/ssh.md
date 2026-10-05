---
title: SSH
status: published
modifiedDate: 2026-10-06
relatedTags:
- ssh
- github
definition: Verschlüsseltes Protokoll für sichere Verbindungen zwischen deinem Rechner und einem Server oder Dienst wie GitHub.
relatedArticles:
- folge-017-github-ssh
seo:
  seo_title: SSH · Glossar
  seo_description: Secure Shell, verschlüsselte Verbindung zu Servern und GitHub. Unterschied zu SSH-Key, HTTPS und FTP. Schritt für Schritt in Folge 017.
---

**SSH** (*Secure Shell*) ist ein **Protokoll** für verschlüsselte Verbindungen über das Netz. Typisch: `git clone` per `git@github.com:…` statt HTTPS mit Passwort in der URL.

Dafür richtest du auf deinem Rechner einen [**SSH-Key**](/glossar/ssh-key/) ein und hinterlegst den **öffentlichen** Teil bei [GitHub](/glossar/github/). Befehle wie `ssh-keygen` tippst du im [Terminal](/glossar/terminal/). Anleitung: [Folge 017](/artikel/folge-017-github-ssh/), [Clone](/glossar/clone/).

**SFTP** (Dateien sicher hochladen) nutzt oft dieselbe SSH-Infrastruktur. Das ist nicht dasselbe wie unverschlüsseltes FTP auf klassischen Webhostern. Bei hautuu brauchst du weder FTP noch eine eigene Server-[VM](/glossar/vm/): [Push](/glossar/push/) zu [GitHub](/glossar/github/) und [Deploy](/glossar/deploy/) über [Cloudflare Pages](/glossar/cloudflare-pages/).
