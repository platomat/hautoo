---
title: "Folge 019: Impressum, Datenschutz, ENV und CMS-Komponenten"
summary: "Rechtstexte per Agent, Kontakt-E-Mail als Secret, Separator und Artikel-Listing redaktionell, Glossar-Seite im Aufbau."
pubDate: 2026-10-04T20:57:40Z
modifiedDate: 2026-10-04
status: published
tags:
  - astro
  - sveltia
  - cloudflare
  - design
seo:
  index_visibility: index
  follow_visibility: follow
---

Impressum und Datenschutz für einen in **Deutschland** betriebenen Auftritt, gehostet auf **Cloudflare**, mit den Tools aus dem Projekt: das kann der Agent ausformulieren, du prüfst Inhalt und Ton. **Kontakt-E-Mail** gehört nicht als Klartext ins öffentliche Repo.

## E-Mail schützen

Öffentliches GitHub bedeutet: jede Adresse im Code ist scrapebar. Stattdessen:

- **Cloudflare Pages** → dein Projekt → **Settings** → **Variables and Secrets**: z. B. `CONTACT_EMAIL` als Secret.
- **Lokal** dieselbe Variable in `.env` (liegt in `.gitignore`), z. B. `CONTACT_EMAIL=du@example.de`.
- Build (`npm run build`) und Dev-Server lesen die Variable; die Impressums-Komponente rendert einen `mailto:`-Link ohne die Adresse im Markdown zu committen.

Kurz: **ENV** = Umgebungsvariablen, getrennt für lokal und Production.

## Separator im CMS

Neue **Komponente** im Seiten-/Artikel-Editor: **Trennlinie** mit **Höhe** (1 dezent, 10 kräftig) und **Breite** in Prozent (z. B. 50 % zentriert). Optional später: Farbe aus der Design-Palette, Standard ein dezentes Grau. Einfügen, verschieben, löschen wie bei Bildern.

## Artikel-Listing gezielt einsetzen

Statt fest verdrahteter Listen auf der Artikel-Route: Block **Artikel-Listing** im Inhalt. Beispiele aus dem Transkript:

- **Startseite:** letzte drei, neueste zuerst, **Grid**, drei Spalten.
- **Seite „Artikel“:** alle Einträge (`limit` null), neueste oder älteste zuerst, **eine Spalte**, Kartenstil ähnlich Startseite oder Liste ohne Karte.

Im CMS explizit sagen, in welcher **Collection** (Seiten vs. Artikel vs. Glossar) der Block verfügbar sein soll.

## Glossar und Bilder

Glossar-Begriffe können vom Agenten vorbefüllt werden; **Glossar-Listing** auf einer eigenen Seite (Menüpunkt „Glossar“) war noch To-do. Hintergrundbilder lieber **lokal** im Repo statt Hotlink (z. B. Platzhalter-Dienste): weniger Ladezeit, weniger Drittanfragen, **datenschutzfreundlicher**.

## Text-Stil nachziehen

Nach dem großen Artikel-Import: Issue an den Agenten, **Gedankenstriche** in der Prosa zu reduzieren (im Transkript: grob von sehr vielen auf wenige siteweit). Rechtstexte: unnötige Standard-Abschnitte raus, wenn sie nicht zum Setup passen.

<!-- Quelle: 2026-10-04--20-57-40--obs-screencast - hautoo - 019 - inhalt, impressum, datenschutz, komponenten.txt -->
