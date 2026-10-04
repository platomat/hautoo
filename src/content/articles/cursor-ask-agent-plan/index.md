---
title: "Cursor: Ask, Agent, Plan — und das Burger-Menü"
summary: Wann die KI nur redet, wann sie baut, und warum du zuerst planen lassen solltest.
pubDate: 2026-10-03T23:48:14Z
modifiedDate: 2026-10-04
status: published
tags:
  - cursor
  - css
  - design
seo:
  index_visibility: index
  follow_visibility: follow
---

Cursor ist mehr als Chat — es ist eine **IDE** (Entwicklungsumgebung) mit eingebauten **Agenten**.

## Chat-Ansicht vs. IDE

Beim Start siehst du manchmal eine chat-lastige Oberfläche. Für Projektarbeit: **IDE**-Modus — Dateibaum, Editor, Terminal, Agentenleiste.

Du kannst auch **Ordner ohne Git** öffnen (Fotos sortieren, Docs sammeln) und dem Agenten Kontext geben.

## Drei Modi (unten in der Leiste)

| Modus | Wofür |
|--------|--------|
| **Ask** | Fragen stellen — idealerweise **keine** Dateiänderungen. Auch `Frage:` am Anfang signalisiert Nur-Lesen. |
| **Agent** | Lesen, schreiben, Terminal, Commits — der Vollwerkmodus. |
| **Plan** | Erst **Plan** schreiben (To-dos, Schritte, Grenzen), du liest mit, korrigierst, **dann** Umsetzung im Agent-Modus. |

**Tab** = Autovervollständigung im Code (nicht überall im Chat).

Tipp aus dem Video: Erstes Projekt ohne Plan — zweites mit Phasen und Plänen. Deutlich entspannter.

## Beispiel: Burger-Menü

Aufgabe: Mobiles Menü, Icon wird zum Kreuz, animiert. Workflow:

1. Plan-Modus: „Bitte Umsetzungsplan, noch nicht bauen.“
2. Plan lesen (CSS, Doku, kein Push ohne Anweisung — gut).
3. Feedback („Trennlinien zwischen Einträgen“, Abstände oben/unten).
4. Agent setzt um → in `npm run dev` testen.
5. Commit auf Anweisung.

Breakpoints: Mobil ab 679 px im Projekt — Menü nutzt die globalen Tokens.

## Chat-Transkripte privat halten

Unter `docs/sessions/` kannst du **Export Transcript** ablegen — persönlicher Verlauf. Ordner in **`.gitignore`** packen (`docs/sessions/`), sonst landet Schnack im öffentlichen Repo. Commits enthalten dann nur Website-relevantes.

<!-- Quelle: 2026-10-03--23-48-14--obs-screencast - hautoo - cursor - plan, agent, ask.txt -->
