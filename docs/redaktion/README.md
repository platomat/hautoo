# Redaktion (Artikel, Glossar, FAQ)

Verbindliche Regeln für **Menschen** und **KI-Agenten** bei Inhalten unter `src/content/` (Artikel, Glossar, CMS-Seiten wie FAQ). Technische Projektregeln bleiben in [.cursor/rules](../../.cursor/rules/) und [Sprachen & Konventionen](../sprachen-und-konventionen.md).

**Stand:** Site im Aufbau. Alte Artikel-Slugs müssen **nicht** per Redirect abgesichert werden, solange sich URLs noch ändern dürfen.

---

## Workflow: neue Folge / neuer Artikel

Mit **Screencast-Transkript** oder ohne:

1. Transkript bzw. Quelle **vollständig lesen**.
2. **Erkennungsfehler** (Speech-to-Text, Produktnamen) **sinngemäß korrigieren**, nicht wörtlich übernehmen.
3. **Nichts erfinden.** Nur ergänzen, was aus Quelle, Repo oder verifizierbaren externen Fakten folgt.
4. Externe Fakten (Browser, Dienste, Versionen): **recherchieren**, nur **Verifiziertes** schreiben, **Quelle** nennen (Link oder Release Notes). Bei Unsicherheit im PR listen.
5. Artikel anlegen, Glossar/FAQ/Querverweise wie unten, Checkliste vor dem PR.

---

## Schema: Artikel (`articles`)

| Feld | Regel |
| --- | --- |
| **Titel** | `Folge nnn: <Titel>` — **dreistellig** mit führender Null (`001`, `020`). Kein Gedankenstrich im Titel. |
| **Slug / Ordner** | `folge-nnn-<kurz>` unter `src/content/articles/folge-nnn-<kurz>/index.md` |
| **pubDate** | Aus **Aufnahmezeitpunkt** im Originaldateinamen (`YYYY-MM-DD--HH-MM-SS--…`) als ISO-UTC, z. B. `2026-10-04T23:47:38Z` |
| **summary** | Teaser mit **Leser-Nutzen**, Du-Form, **kein** Gedankenstrich |
| **tags** | Vorhandene Tags aus `src/content/tags/` **bevorzugen**, **wenige** (typisch 3–5), thematisch passend |
| **seo** | Wie bestehende Folgen (`index_visibility`, `follow_visibility`, …) |
| **Video** | `videoProvider` / `videoId` **leer lassen**, bis ein echtes Video eingepflegt ist |
| **Quelle** | Am Ende des Body ein HTML-Kommentar mit Original-Transkriptdateiname, z. B. `<!-- Quelle: 2026-10-04--23-47-38--obs-screencast - … -->` |
| **modifiedDate** | Bei inhaltlicher Änderung setzen |

---

## Stil

- **Knackig, locker, Du-Form**, laienverständlich, **informativ und ergänzend** (sinnvolle Zusatzinfos, die das Bild abrunden).
- **Fachbegriffe** beim ersten Vorkommen im Artikel **kurz erklären** oder per [**Glossar-Link**](/glossar/) verknüpfen.
- **Gedankenstriche** (`—`, `–`) **sparsam**: in **Titeln, Teasern und FAQ-Fragen keine**; im Fließtext nur vereinzelt. Stattdessen Punkt, Komma, Doppelpunkt, Klammern oder Umformulierung (siehe auch [.cursor/rules/deutsche-prosa.mdc](../../.cursor/rules/deutsche-prosa.mdc)).
- Prosa auf **Deutsch**; Code, Slugs, Pfade auf **Englisch** wie im Rest des Projekts.

---

## Glossar (`glossar`)

- Fehlende Begriffe **anlegen**: kurz, laienverständlich, **projektbezogen**.
- **`relatedTags`** pflegen, wenn ein Tag thematisch passt (siehe Schema in [Collections — glossar](../sveltia/collections.md)).
- Glossar-Texte **untereinander verlinken** (erstes sinnvolles Vorkommen pro Ziel-Eintrag, nicht auf sich selbst, nicht in Überschriften). Hilfsskript: `scripts/link-glossar-crosslinks.py` (falls im Repo; danach manuell prüfen).
- Optional **`relatedArticles`** auf die Folge mit der ausführlichen Anleitung.

---

## FAQ (`pages/faq`)

- Passende **Laienfragen** in die **richtige H2-Gruppe** (Themenblock).
- Alles **offen sichtbar** (kein Accordion), damit **Strg+F** funktioniert.
- **Trenner** (`---`) vor H2-Gruppen wie im bestehenden FAQ.
- **Fragen** als `###` ohne Gedankenstrich in der Fragezeile.
- Antworten **kurz**, mit Links zu **Folgen**, **Glossar** und ggf. CMS-Seiten.

---

## Querverlinkung

### Glossar in Artikeln / FAQ

- Link nach `/glossar/<slug>/` beim **ersten sinnvollen Vorkommen** pro Seite/Artikel, **nicht in Überschriften**.
- Keine **Inflation** (nicht jeden Begriff in jedem Absatz).

### Folgen

- Link auf die Folge mit der **ausführlichen Anleitung** (z. B. SSH früh erwähnen → [Folge 017](/artikel/folge-017-github-ssh/)).
- **Vor- und rückwärts**: neue Folge in bestehenden Artikeln, Glossar und FAQ erwähnen, wo das Thema schon vorkommt.
- **Glossar-Link und Folgen-Link nicht am selben Wort.**
- **Max. ein Link pro Ziel-Folge** pro Artikel.

### Bausteine (DRY)

- Wiederkehrende Inhalte (z. B. Stack-Grafik) als Block einbinden: `{{block id="stack-uebersicht"}}`, nicht Bild und Überschrift kopieren.
- Nur an **thematisch passenden** Stellen (Pipeline, Gesamtüberblick), nicht in jede Folge. Siehe [Collections — blocks](../sveltia/collections.md).

---

## Checkliste vor dem Pull Request

- [ ] **Schema:** Titel `Folge nnn: …`, Slug `folge-nnn-<kurz>`, pubDate, summary, tags, SEO, Video leer, Quellkommentar
- [ ] **Stil:** Du-Form, laienverständlich, keine Striche in Titel/Teaser/FAQ-Fragen
- [ ] **Glossar:** neue/angepasste Einträge, relatedTags, Querverweise
- [ ] **FAQ:** neue Fragen in der richtigen Gruppe, verlinkt
- [ ] **Querverweise:** Folge ↔ Glossar ↔ bestehende Inhalte (Regeln oben)
- [ ] **Bausteine:** wo sinnvoll, keine Duplikate
- [ ] **`npm run build`** grün
- [ ] **PR-Beschreibung** mit:
  - Tabelle **Datei → Slug → Titel → Tags** (neue/geänderte Artikel)
  - Liste **neuer Glossar-Einträge** und **FAQ-Fragen**
  - Übersicht **gesetzter Querverweise**
  - **Unsichere Transkriptstellen** / bewusst weggelassene Passagen
  - ggf. Screenshot bei sichtbaren UI-Änderungen

---

## Siehe auch

- [Inhalte der Website](../inhalte/README.md)
- [Sveltia Collections](../sveltia/collections.md)
- [CMS Fields](../cms-fields/README.md)
