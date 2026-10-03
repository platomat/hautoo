# GitHub

GitHub speichert Quellcode, Inhalte und die Geschichte aller Änderungen. Issues und Pull Requests sind die Orte für Planung und Review.

## Sprache

- Issues, Pull Requests, Commit-Messages: **Deutsch**
- Siehe [Sprachen und Konventionen](../sprachen-und-konventionen.md)

## Wozu GitHub hier dient

| Funktion | Nutzen |
| --- | --- |
| Repository | Code + Markdown-Inhalte versioniert |
| Issues | Aufgaben, Fehler, Ideen |
| Pull Requests | Änderungen vorschlagen und prüfen |
| Actions (optional) | Checks vor dem Merge |
| Zusammenarbeit | Mehrere Personen am gleichen Stand |

## Typischer Ablauf

1. Branch anlegen (oder direkt auf `main` — je nach Teamregel)
2. Änderungen committen (Message auf Deutsch)
3. Pushen
4. Optional: Pull Request mit kurzer Beschreibung auf Deutsch
5. Nach Merge/Push: Cloudflare baut die Site neu

## Öffentliches Repo

- Keine Secrets (siehe [Sicherheit](../sicherheit/README.md))
- README und `docs/` sollen Einsteigern den Einstieg erklären
- Lizenz und Beitragsregeln noch festlegen (siehe offene Fragen)

## Verknüpfung mit Cloudflare

Go-Live und Anbindung GitHub → Cloudflare Pages: [Cloudflare](../cloudflare/README.md).

## Noch auszuarbeiten

- Branch-Strategie (`main` only vs. Feature-Branches)
- Issue-Vorlagen (Bug, Inhalt, Doku)
- Rechte: wer darf direkt auf `main` pushen?
