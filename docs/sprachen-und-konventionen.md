# Sprachen und Konventionen

Dieses Projekt ist **öffentlich** und richtet sich an deutschsprachige Nutzerinnen und Nutzer. Damit KI, Mitwirkende und Dokumentation konsistent bleiben, gelten feste Sprachregeln.

## Sprachmatrix

| Was | Sprache | Beispiel |
| --- | --- | --- |
| Dokumentation unter `docs/` | Deutsch | „So verbindest du die Domain“ |
| UI-Texte der Website | Deutsch | Menü, Artikel, Glossar |
| Quellcode (Variablen, Funktionen, Kommentare im Code) | Englisch | `getArticleBySlug` |
| Dateinamen technischer Module | Englisch | `ArticleCard.astro` |
| Git-Commit-Messages | Deutsch | `Artikel-Layout für Videos ergänzen` |
| GitHub Issues & Pull Requests | Deutsch | Titel und Beschreibung auf Deutsch |

## Für die Arbeit mit Cursor

- Beschreibe Aufgaben auf **Deutsch**.
- Erwarte **deutschen** Doku- und Fließtext, aber **englischen** Code.
- Verweise bei Unsicherheit auf diese Datei und auf `.cursor/rules/projekt-konventionen.mdc`.

## Namensgebung

- Collections (Sveltia): `pages`, `articles`, `tags`, `glossar`
- Öffentliche Domain: `hautoo.storyofai.net`
- Repo-Name: `hautuu` (GitHub)

## Was nicht gilt

- Keine Secrets in Commits (siehe [Sicherheit](./sicherheit/README.md))
- Keine englischen Commit-Messages „nur weil der Code englisch ist“
- Keine deutschen Bezeichner im TypeScript/Astro-Code
