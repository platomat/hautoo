---
title: 'Folge 017: Private Repos klonen: SSH-Schlüssel und GitHub'
summary: Permission denied beim Clone? Schlüsselpaar erzeugen, config anlegen, Public Key bei GitHub hinterlegen, dann klappt git clone.
pubDate: 2026-10-04 20:01:04+00:00
modifiedDate: 2026-10-04
status: published
tags:
- github
- ssh
- cursor
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 017: Private Repos klonen: SSH-Schlüssel und GitHub'
  seo_description: Permission denied beim Clone? SSH Key erzeugen, in GitHub hinterlegen und private Repos sicher klonen. Folge 017 Schritt für Schritt für hautuu.
---

Öffentliche How-To-Repos siehst du ohne Login. **Private** Projekte wie dein echtes hautuu-Repo verweigern [`git clone`](/glossar/clone/) mit **Permission denied**, bis GitHub deinen Rechner kennt. Grundlagen zu Clone und Push/Pull: [Folge 001](/artikel/folge-001-hautuu-intro/) und [Folge 006](/artikel/folge-006-git-push-pull/). Dafür nutzt du einen [**SSH-Key**](/glossar/ssh-key/) statt Passwort in der URL.

## Ordner `.ssh`

Im **Home-Verzeichnis** liegt (oft versteckt) `.ssh`. Im Dateimanager: versteckte Dateien anzeigen (z. B. Strg+H). Im Terminal:

```bash
cd ~/.ssh
pwd
```

Tilde `~` steht für dein Home (`/home/deinuser` unter Linux, ähnlich auf dem Mac).

## Schlüsselpaar erzeugen

```bash
ssh-keygen -t ed25519 -C "deine@email.de"
```

Dateiname z. B. nach GitHub-Benutzer, damit mehrere Keys unterscheidbar sind. **Passphrase** optional (leer = weniger Tipparbeit, aber der private Key ist dann wie ein offenes Passwort auf der Platte).

Ergebnis: **privater** Key (niemals teilen, nicht committen) und **öffentlicher** Key (`.pub`). Der Public Key verschlüsselt nur für dich; entschlüsseln kann nur der Private Key.

{{repodoc path="docs/github/README.md" title="GitHub" description="SSH, Clone und Zugriff auf private Repos."}}

## `config` für github.com

In `~/.ssh/config` (Datei mit `touch config` anlegen):

```text
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/DEIN_KEYNAME
```

`IdentityFile` ohne `.pub`, nur der private Key-Pfad.

## Key bei GitHub

**Settings** auf [**GitHub**](/glossar/github/) → **SSH and GPG keys** → **New SSH key**. Titel (z. B. „Lab-Test“), Inhalt = komplette `.pub`-Datei (beginnt oft mit `ssh-ed25519` oder `ssh-rsa`). **Private** Keys beginnen mit `BEGIN OPENSSH PRIVATE KEY`, die gehören nicht nach GitHub.

Test:

```bash
ssh -T git@github.com
```

Erfolgsmeldung mit deinem Benutzernamen, dann:

```bash
git clone git@github.com:ORG/REPO.git
```

**Wichtig:** Private Keys nie in Videos, Screenshots oder öffentliche Repos. Test-Keys nach Demos löschen oder rotieren.

## ssh-agent

Manchmal meldet Cursor, dass der Key noch nicht geladen ist. Dann Key zum **ssh-agent** hinzufügen (je nach System `ssh-add ~/.ssh/DEIN_KEYNAME`). Danach sollte Clone und Cursor-Zugriff konsistent sein.

<!-- Quelle: 2026-10-04--20-01-04--obs-screencast - hautoo - 017 - github - ssh keys.txt -->
