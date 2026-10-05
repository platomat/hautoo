---
title: 'Folge 008: Ask, Agent, Plan: Wann die KI nur reden darf'
summary: Unterschied zwischen „bitte nichts anfassen“ und „bau mir das Burger-Menü“. Plus wo dein Chat-Schnack nicht im Repo landen soll.
pubDate: 2026-10-03 23:48:14+00:00
modifiedDate: 2026-10-04
status: published
tags:
- cursor
- css
- design
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 008: Ask, Agent, Plan: Wann die KI nur reden darf'
  seo_description: 'Cursor Modi Ask, Agent und Plan: wann die KI nur antwortet und wann sie Dateien ändert. Folge 008 hilft dir, Chats und Repo sauber zu trennen.'
---

[**Cursor**](/glossar/cursor/) ist mehr als Chat, eine **IDE** (Entwicklungsumgebung) mit **Agenten**, die Dateien lesen und schreiben.

## Chat-Oberfläche vs. IDE

Manchmal startet Cursor chat-lastig. Für hautuu willst du den **IDE**-Modus: Dateien, [Terminal](/glossar/terminal/), Agentenleiste. Button **IDE** hilft.

Du kannst auch einen beliebigen **Ordner ohne Git** öffnen (Fotos, Notizen) und dem Agenten sagen: „Pack das ins Projekt.“

## Drei Modi, drei Temperamentstufen
{{repodoc path="docs/cursor/README.md" title="Cursor (KI)" description="Modi, Agenten und Grenzen in der Cursor-Doku."}}



| Modus | Wofür |
|--------|--------|
| [**Ask**](/glossar/cursor-modi/) | Nur fragen. Ideal, wenn nichts am Code geändert werden soll. `Frage:` am Anfang ist ein guter Hinweis. |
| **Agent** | Alles: lesen, schreiben, Terminal, Commits. Der Vollgas-Modus. |
| **Plan** | Erst Plan mit To-dos, du liest, korrigierst, **dann** Umsetzung im Agent-Modus. |

**Tab** = Autovervollständigung im Code (im Chat klappt das nicht immer).

Tipp aus dem Video: Erstes Projekt ohne Plan war hektisch. Mit Plan-Modus: entspannter. Zwei Chats mit Rollen statt ein Mega-Chat: [Folge 010](/artikel/folge-010-cursor-chats/).

## Burger-Menü: Plan zuerst, Bau zweites

Aufgabe: mobiles Menü, Icon wird zum Kreuz, animiert.

1. **Plan:** „Umsetzungsplan, noch nicht bauen.“
2. Plan lesen, gut, wenn „kein Push ohne Anweisung“ drinsteht.
3. Feedback: Trennlinien, Abstände oben/unten.
4. **Agent** baut → [`npm run dev`](/glossar/npm/) → gucken ([Folge 018](/artikel/folge-018-node-npm/), falls npm noch fehlt).
5. Commit, wenn du zufrieden bist.

Mobil greift ab 679 px — Menü nutzt die globalen Design-Tokens.

## Transkripte: privat lassen

**Export Transcript** nach `docs/sessions/`, dein Schnack mit der KI. Ordner in **`.gitignore`** (`docs/sessions/`), sonst landet’s im öffentlichen Repo. Commits = nur Website-Zeug.

<!-- Quelle: 2026-10-03--23-48-14--obs-screencast - hautoo - cursor - plan, agent, ask.txt -->
