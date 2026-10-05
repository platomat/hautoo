---
title: SSH-Key
status: published
modifiedDate: 2026-10-06
relatedTags:
- ssh
definition: Schlüsselpaar für passwortlosen, sicheren Zugriff auf GitHub per SSH.
seo:
  seo_title: SSH-Key · Glossar
  seo_description: Schlüsselpaar für passwortlosen, sicheren Zugriff auf GitHub per SSH. Den öffentlichen Key trägst du bei GitHub ein; den privaten Key bleibt nur auf deinem
---

Du erzeugst das Paar mit `ssh-keygen` im [Terminal](/glossar/terminal/) (eine [CLI](/glossar/cli/)) für [SSH](/glossar/ssh/)-Zugriff auf [GitHub](/glossar/github/). Den **öffentlichen** Key trägst du bei GitHub ein; den **privaten** Key bleibt nur auf deinem Rechner. Niemals [committen](/glossar/commit/) oder teilen. **SFTP** (sicheres Hochladen per SSH) nutzt ein ähnliches Schlüsselpaar; klassisches [FTP](/glossar/ftp/) ist damit nicht dasselbe und bei hautuu ohnehin nicht nötig. Schritt für Schritt: [Folge 017](/artikel/folge-017-github-ssh/).
