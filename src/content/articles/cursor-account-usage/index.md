---
title: "Cursor-Abo, Usage-Balken und Cloud Agents"
summary: Was die Kontingente bedeuten, warum On-Demand teuer ist und wozu eine VM mit Grok-Bot taugt.
pubDate: 2026-10-04T00:05:52Z
modifiedDate: 2026-10-04
status: published
tags:
  - cursor
seo:
  index_visibility: index
  follow_visibility: follow
---

KI kostet Rechenzeit — bei **Cursor** siehst du das unter Account → **Usage**.

## Tarife und Balken

- Es gibt verschiedene Pläne (im Video z. B. 20 $/60 $ — prüf aktuelle Preise auf cursor.com).
- **Composer / Auto:** Der Alltagsmodus frisst ein Kontingent pro Abrechnungsperiode.
- **Premium-Modelle** („Thinking“, große Kontextfenster): Eigenes Budget — für knifflige Aufgaben, wenn Auto nicht reicht.
- **Kontextfenster:** Wie viel Text/Code das Modell gleichzeitig „im Kopf“ hat — große Fenster = mehr Tokens.

## Cloud Agents vs. lokal

**Cloud Agents** laufen nicht auf deiner CPU: Aufgabe starten, am Ende oft ein **Pull Request** auf GitHub. Praktisch, aber **deutlich mehr Token-Verbrauch** als lokal ein kleines Skript ausführen zu lassen.

## On-Demand Spending

Wenn das Paket leer ist, kannst du **On-Demand** nachkaufen — im Video: drei kleine Anfragen, schon merklich teurer. Empfehlung für Einsteiger: **lieber kurz upgraden** oder warten bis zur neuen Periode statt On-Demand Dauerfeuer.

Im Dashboard siehst du Token pro Anfrage (auch 40-Millionen-Monster sind möglich, wenn du alles mit reinschiebst).

## Grok-Bot & VM (persönlicher Workflow)

Wasilij nutzt teils eine **virtuelle Maschine** — abgeschottet vom Hauptsystem, falls Tools breit lesen. Spezial-Agenten (Audit, Bugfix, nochmal Audit) können strukturiert Issues erzeugen. Das geht auch mit **mehreren Chats** im gleichen Projekt (Rollen: „finde Fehler“ / „behebe sauber“) — siehe nächste Folge.

Feature-Hinweis im Video: **Grok**-Integration kann ab höheren Plänen relevant sein — im Account nachsehen, ob du es brauchst.

<!-- Quelle: 2026-10-04--00-05-52--obs-screencast - hautoo - cursor - account, usage, grok-bot.txt -->
