---
title: 'Folge 015: Transkript rein, Artikel raus: Screencast und Cloud Agent'
summary: Screencasts aufnehmen, fertige Videos in Transkripte wandeln und den Cloud Agenten die Artikel als Pull Request schreiben lassen.
pubDate: 2026-10-04 04:29:47+00:00
modifiedDate: 2026-10-06
status: published
tags:
- cursor
- github
- astro
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 015: Transkript rein, Artikel raus: Screencast und Cloud Agent'
  seo_description: 'Videos transkribieren, Texte an den Cloud Agent in Cursor und Artikel als Pull Request. Folge 015 beschreibt den Ablauf von Rohtext bis Review auf hautuu.'
---

Du nimmst den Screencast auf. Eine **Speech-to-Text**-Software kann zwar live mithören, hier reichen die **fertigen Video-Dateien**: Du gibst ihr die Aufnahmen, sie erzeugt Rohtext. Die Transkripte landen beim [**Cloud Agent**](/glossar/cloud-agent/) in [Cursor](/glossar/cursor/), der daraus die Artikel schreibt. Deine Aufgabe an ihn: aus jedem Video **einen Artikel**, Beispielinhalt weg, Platzhalter fürs spätere Video, alles als [**Pull Request**](/glossar/pull-request/), damit du vor dem Live-Gang drüber schauen kannst.

## Was die Site schon kann

Zwischen den Sessions ist viel passiert: **Menüs** als [Collection](/glossar/collection/), **Artikel** in einer Übersicht, **Seiten** mit optionalem **Hintergrundbild** und Lesbarkeits-Overlay (Motiv suchen und optimieren: [Folge 021](/artikel/folge-021-bilder-suchen-nutzen/)). Im [CMS](/glossar/cms/) fügst du Blöcke ein wie ein Schlagwort, z. B. **Artikel-Listing** (Anzahl und Sortierung konfigurierbar). Später kommen wiederverwendbare **Bausteine** für Grafiken und Snippets dazu ([Folge 020](/artikel/folge-020-bausteine-fork/)). Credits für Bilder von **Unsplash** mit Attribution sind vorgesehen. Status **veröffentlicht** vs. Entwurf steuert, was live geht.

{{repodoc path="docs/inhalte/README.md" title="Inhalte der Website" description="Collections, Medienablage und Embeds."}}

{{repodoc path="docs/redaktion/README.md" title="Redaktion (Artikel, Glossar, FAQ)" description="Schema, Stil und Checkliste für neue Inhalte."}}

## Agent starten

Zuerst prüfen, ob [**Cursor**](/glossar/cursor/) Zugriff auf das [**Repository**](/glossar/repository/) hat. Fehlt der, in den Cursor-Einstellungen nach dem How-To für [GitHub](/glossar/github/)/[OAuth](/glossar/oauth/) schauen. Private Repos und [SSH-Keys](/glossar/ssh-key/): [Folge 017](/artikel/folge-017-github-ssh/).

Dann die Anweisung: Ordner mit Transkripten anhängen oder benennen, **pro Video ein Artikel**, Beispielartikel löschen, **Video-Platzhalter** im [Frontmatter](/glossar/frontmatter/) oder Body vorsehen, **kein direkter [Push](/glossar/push/) auf [main](/glossar/main/)**, sondern [Branch](/glossar/branch/) und PR.

Der **[Cloud Agent](/glossar/cloud-agent/)** läuft auf Cursors Infrastruktur. Du kannst den Rechner zuklappen, später Nachrichten nachschieben („mach noch …“) und morgens den Stand in GitHub lesen.

## Typische Stolpersteine

- Agent „sieht“ das [Repo](/glossar/repository/) nicht: Berechtigung in Cursor/GitHub nachziehen.
- Transkripte sind holprig (Fachwörter, OBS, Produktnamen): im PR steht oft eine Liste **unsicherer Stellen** zum Nachbearbeiten.
- Inhalt vor Optik: Erst Artikel generieren, Feintuning an Abständen und Hero später.

Wenn der PR da ist, gehst du den Review-Weg (Preview, Checks, [Merge](/glossar/merge/)) wie in [Folge 016](/artikel/folge-016-artikel-pull-request/).

<!-- Quelle: 2026-10-04--04-29-47--obs-screencast - hautoo - 015 - transkript - artikel.txt -->
