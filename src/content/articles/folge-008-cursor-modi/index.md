---
title: 'Folge 008: Ask, Agent, Plan: Wann die KI nur reden darf'
summary: Unterschied zwischen „bitte nichts anfassen“ und „bau mir das Burger-Menü“. Plus wo dein Chat-Schnack nicht im Repo landen soll.
pubDate: 2026-10-03 23:48:14+00:00
modifiedDate: 2026-10-07
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

[**Cursor**](/glossar/cursor/) ist mehr als Chat, eine [**IDE**](/glossar/ide/) mit **Agenten**, die Dateien lesen und schreiben.

## Chat-Oberfläche vs. IDE

Manchmal startet [Cursor](/glossar/cursor/) chat-lastig. Für hautuu willst du den **[IDE](/glossar/ide/)**-Modus: Dateien, [Terminal](/glossar/terminal/), Agentenleiste. Button „IDE“ (IDE-Modus) schaltet um.

„File“ (Menü Datei) → „Open Folder“ (Ordner öffnen) wechselt den geöffneten Ordner im Fenster: Das aktuelle Projekt wird geschlossen bzw. ersetzt (auch ohne [Git](/glossar/git/), z. B. ein reiner Fotos-Ordner). Zusätzlichen Kontext **neben** deinem Code-Projekt (Fotos, Notizen) fügst du mit „File“ → „Add Folder to Workspace…“ (Ordner zum Arbeitsbereich hinzufügen…) zum bestehenden [Workspace](/glossar/workspace/) hinzu: Beide Ordner stehen im Explorer, und der Agent sieht beide. Wieder entfernen: Rechtsklick auf den Ordner im Explorer → „Remove Folder from Workspace“ (Ordner aus Arbeitsbereich entfernen).

## Drei Modi, drei Temperamentstufen

{{repodoc path="docs/cursor/README.md" title="Cursor (KI)" description="Modi, Agenten und Grenzen in der Cursor-Doku."}}



| Modus | Wofür |
|--------|--------|
| [**Ask**](/glossar/cursor-modi/) | Nur fragen. Ideal, wenn nichts am Code geändert werden soll. `Frage:` am Anfang ist ein guter Hinweis. |
| „Agent“ (Umsetzungsmodus) | Alles: lesen, schreiben, [Terminal](/glossar/terminal/), Commits. Der Vollgas-Modus. |
| **[Plan](/glossar/cursor-modi/)** | Erst Plan mit To-dos, du liest, korrigierst, **dann** Umsetzung im Agent-Modus. |

Im Chat unten Modus wählen: „Ask“ (Fragen-Modus; nur fragen), „Agent“ (umsetzen), „Plan“ (Planungsmodus; erst Plan, dann Agent). Oft steht der Modus standardmäßig auf „Auto“ (Automatik).

„Tab“ (Tabulator-Taste) = Autovervollständigung im Code (im Chat klappt das nicht immer).

Praktischer Tipp: Erstes Projekt ohne Plan war hektisch. Mit Plan-Modus: entspannter. Zwei Chats mit Rollen statt ein Mega-Chat: [Folge 010](/artikel/folge-010-cursor-chats/).

## Burger-Menü: Plan zuerst, Bau zweites

Aufgabe: mobiles Menü, Icon wird zum Kreuz, animiert.

1. „Plan:“ „Umsetzungsplan, noch nicht bauen.“
2. Plan lesen, gut, wenn „kein [Push](/glossar/push/) ohne Anweisung“ drinsteht.
3. Feedback: Trennlinien, Abstände oben/unten.
4. „Agent“ baut → [`npm run dev`](/glossar/npm/) → gucken ([Folge 018](/artikel/folge-018-node-npm/), falls [npm](/glossar/npm/) noch fehlt).
5. [Commit](/glossar/commit/), wenn du zufrieden bist.

Bei **679 Pixel Breite und weniger** zeigt sich die Handy-Ansicht (Burger-Menü statt Desktop-Leiste). Das Menü nutzt dieselben zentralen [CSS-Variablen](/glossar/css-variable/) wie der Rest der Seite: Farben, Abstände und Schriftgrößen aus `global.css`.

## Transkripte: privat lassen

„Export Transcript“ (Transkript exportieren) nach `docs/sessions/`, dein Schnack mit der KI. Ordner in **`.gitignore`** (`docs/sessions/`), sonst landet’s im öffentlichen [Repo](/glossar/repository/). Commits = nur Website-Zeug.

<!-- Quelle: 2026-10-03--23-48-14--obs-screencast - hautoo - cursor - plan, agent, ask.txt -->
