# Cursor (KI)

Cursor ist der erste unterstützte KI-Editor für dieses Projekt. Er hilft beim Erstellen von Code, Layouts und Dokumentation.

## Rolle von Cursor

- Astro-Komponenten und Seiten aufsetzen oder anpassen
- Dokumentation ergänzen
- CMS-Konfiguration (Sveltia) erklären und pflegen
- Fehler suchen und Fixes vorschlagen

Cursor **ersetzt nicht** das menschliche Prüfen von Inhalten, Commits und Deployments.

## Projektregeln

Im Repo liegen Regeln unter `.cursor/rules/`. Wichtigste Punkte:

- Dokumentation und Commits: **Deutsch**
- Code: **Englisch**
- Keine Secrets committen

Siehe auch: [Sprachen und Konventionen](../sprachen-und-konventionen.md)

## Typischer Arbeitsablauf

1. Projektordner in Cursor öffnen
2. Aufgabe klar auf Deutsch beschreiben (Ziel, Einschränkungen, Dateien)
3. Vorschläge der KI lesen und gezielt übernehmen
4. Lokal prüfen (siehe [Entwicklung](../entwicklung/README.md))
5. Commit auf Deutsch, Push → Deployment über Cloudflare

## Tipps für gute Prompts

- Kontext nennen: „Astro + Sveltia, Collection `articles` …“
- Gewünschtes Ergebnis nennen: „Doku-Seite auf Deutsch unter `docs/…`“
- Grenzen setzen: „Keine Secrets, keine neuen Dependencies ohne Bedarf“

## Noch auszuarbeiten

- Empfohlene Cursor-Version / Einstellungen
- Beispiel-Prompts für Artikel, Glossar, Layout
- Umgang mit Agent-Mode vs. Chat
