---
title: "Folge 015: Transkript rein, Artikel raus: Screencast und Cloud Agent"
summary: "Speech-to-Text aus OBS, Texte auf der VM sammeln und den Cloud Agenten nachts die Artikel als Pull Request schreiben lassen."
pubDate: 2026-10-04T04:29:47Z
modifiedDate: 2026-10-04
status: published
tags:
  - cursor
  - github
  - astro
seo:
  index_visibility: index
  follow_visibility: follow
---

Du nimmst den Screencast auf, die **Speech-to-Text**-Software hört mit und liefert Rohtext. Den packst du zusammen mit der Aufnahme in einen Ordner auf deiner **virtuellen Maschine** und gibst dem [**Cloud Agent**](/glossar/cloud-agent/) in Cursor eine klare Aufgabe: aus jedem Video **einen Artikel**, Beispielinhalt weg, Platzhalter fürs spätere Video, alles als [**Pull Request**](/glossar/pull-request/), damit du vor dem Live-Gang drüber schauen kannst.

## Was die Site schon kann

Zwischen den Sessions ist viel passiert: **Menüs** als Collection, **Artikel** in einer Übersicht, **Seiten** mit optionalem **Hintergrundbild** und Lesbarkeits-Overlay. Im CMS fügst du Blöcke ein wie ein Schlagwort, z. B. **Artikel-Listing** (Anzahl und Sortierung konfigurierbar). Credits für Bilder von **Unsplash** mit Attribution sind vorgesehen. Status **veröffentlicht** vs. Entwurf steuert, was live geht.

## Agent starten

Zuerst prüfen, ob [**Cursor**](/glossar/cursor/) Zugriff auf das [**Repository**](/glossar/repository/) hat. Fehlt der, in den Cursor-Einstellungen nach dem How-To für GitHub/OAuth schauen (ähnlich wie bei privaten Repos und SSH in einer späteren Folge).

Dann die Anweisung: Ordner mit Transkripten anhängen oder benennen, **pro Video ein Artikel**, Beispielartikel löschen, **Video-Platzhalter** im Frontmatter oder Body vorsehen, **kein direkter Push auf main**, sondern Branch und PR.

Der **Cloud Agent** läuft auf Cursors Infrastruktur. Du kannst den Rechner zuklappen, später Nachrichten nachschieben („mach noch …“) und morgens den Stand in GitHub lesen.

## Typische Stolpersteine

- Agent „sieht“ das Repo nicht: Berechtigung in Cursor/GitHub nachziehen.
- Transkripte sind holprig (Fachwörter, OBS, Produktnamen): im PR steht oft eine Liste **unsicherer Stellen** zum Nachbearbeiten.
- Inhalt vor Optik: Erst Artikel generieren, Feintuning an Abständen und Hero später.

Wenn der PR da ist, gehst du den Review-Weg (Preview, Checks, Merge), so wie in der nächsten Folge.

<!-- Quelle: 2026-10-04--04-29-47--obs-screencast - hautoo - 015 - transkript - artikel.txt -->
