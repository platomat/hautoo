---
title: FTP
status: published
modifiedDate: 2026-10-06
relatedTags:
- cloudflare
- github
definition: Klassisches Protokoll zum Hochladen von Dateien auf einen Webserver, heute bei hautuu nicht nötig.
relatedArticles:
- folge-012-cloudflare-branches
- folge-014-sveltia-worker
seo:
  seo_title: FTP · Glossar
  seo_description: File Transfer Protocol zum Datei-Upload auf Server. Unverschlüsselt, heute oft durch SFTP oder Git-Deploy ersetzt. hautuu nutzt GitHub und Cloudflare statt FTP.
---

**FTP** (*File Transfer Protocol*) ist ein älterer Standard, um Dateien von deinem Rechner auf einen **Server** zu kopieren. Früher war das ein typischer Weg, HTML und Bilder für eine Website hochzuladen.

Beim klassischen FTP laufen Anmeldung und Dateiübertragung **unverschlüsselt** über das Netz. Deshalb nutzen viele Anbieter heute **SFTP** (über [SSH](/glossar/ssh-key/)) oder **FTPS** (FTP mit TLS) statt reinem FTP.

Bei **hautuu** brauchst du kein FTP: Du arbeitest in [Git](/glossar/git/), [pushst](/glossar/push/) zu [GitHub](/glossar/github/), und [Cloudflare Pages](/glossar/cloudflare-pages/) baut und [deployt](/glossar/deploy/) die Site automatisch ([CI/CD](/glossar/ci-cd/)). Setup: [Folge 011](/artikel/folge-011-cloudflare-setup/), [Branches](/glossar/branch/) und [Rollback](/glossar/rollback/): [Folge 012](/artikel/folge-012-cloudflare-branches/).
