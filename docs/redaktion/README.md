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
| **seo** | `seo_title`, `seo_description`, `index_visibility`, `follow_visibility`, … (siehe Abschnitt SEO-Felder) |
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
- **`seo`:** `seo_title` (z. B. `Begriff · Glossar`), `seo_description` für Meta; sichtbare Kurzdefinition bleibt `definition`.

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
- Bausteine mit **eigener Überschrift** im Markdown (z. B. `stack-uebersicht` mit `## Stack-Übersicht`): **keine doppelte** oder **leere H2** direkt davor.
  - **Leere H2** = Überschrift ohne eigenen Absatztext, danach sofort der Block (nur Leerzeile dazwischen).
  - **Dann:** (a) unter die H2 **ein bis zwei knackige Sätze** schreiben, die zum Block hinführen, **oder** (b) die H2 **entfernen** bzw. **unter** den Block setzen, wenn der folgende Inhalt zur Überschrift gehört.
  - Keine Überschrift, die nur die Block-Grafik wiederholt; Fließtext ohne H2 ist oft genug.
- **Nur**, wenn der umgebende Text den **Gesamt-Stack** oder den Ablauf **GitHub → Cloudflare → Live-Seite** (bzw. die nummerierte Kette Cursor → GitHub → Build → Live) **wirklich erklärt** — nicht nur, weil Cloudflare oder Push irgendwo erwähnt werden.
- Themen wie **Branch/Preview/Rollback**, **Pull Request + Merge**, **Worker/OAuth** oder **CMS-Listing** tragen oft **keinen** Stack-Baustein; dort reicht Fließtext oder ein **eigenes** ASCII/Diagramm zum Abschnitt.
- **Ausnahme:** [Folge 020](/artikel/folge-020-bausteine-fork/) bindet `stack-uebersicht` bewusst als **Live-Beispiel** für die Baustein-Collection ein (Abschnitt „Bausteine statt zehnmal das gleiche Bild“), nicht als zusätzliche Pipeline-Folge.
- Nicht in jede Folge inflationär. Siehe [Collections — blocks](../sveltia/collections.md).

### Repo-Dokumente (`docs/`)

- Vertiefung aus dem Repository in **Artikeln** (und ggf. CMS-Seiten) per Embed: `{{repodoc path="docs/github/README.md" title="GitHub" description="Optionaler Satz"}}` (Toolbar **Repo-Dokument** in Sveltia).
- **Nur** existierende Pfade unter `docs/` (`.md`), Linkziel: [GitHub `main`](https://github.com/platomat/hautoo/tree/main/docs). Technik: `src/lib/repodoc.ts`, `RepoDocLink.astro`, [CMS Fields — Inhalts-Blöcke](../cms-fields/README.md#inhalts-blöcke-seiten-artikel-body).
- **Sparingly:** Richtwert **0–3** Boxen pro Artikel, nur wo die Doku wirklich vertieft; keine leere/doppelte H2 nur für die Box.
- **Platzierung:** `{{repodoc …}}` und `{{block …}}` stehen **allein in einer Zeile**, mit **Leerzeile davor und danach**; der Satz davor endet mit `.`, `?` oder `!` — **nicht** mitten im Satz (z. B. nicht „… gleiche Dateien [BOX] , gleiche History“). Mehrere Boxen direkt untereinander sind ok. Prüfung: `python3 scripts/check-content-embeds.py` (läuft auch im Build über `check-content-links.py`).
- **Neue oder geänderte `docs/`:** prüfen, welche **Artikel** die Box brauchen oder ob in der Doku eine **Screencast-Folgen**-Liste (Links zur Live-Site) ergänzt wird.

---

## SEO-Felder (alle Collections mit öffentlicher URL)

Schema und Ausgabe: `src/cms/fields/seo.ts`, gebaut in `BaseLayout.astro` (`<title>`, `<meta name="description">`, `<meta name="robots">`). CMS-Anker `&field_seo` in `public/admin/config.yml`.

**Pflicht für Agenten:** Bei **jedem neuen oder geänderten** Eintrag in `articles`, `pages`, `glossar`, `tags` (und wo `seo` im Schema existiert) die SEO-relevanten Felder **mit erzeugen oder aktualisieren**, inhaltlich aus dem Text abgeleitet, nichts erfinden. Bestehende gute Werte nicht verschlechtern, **keine doppelten** Meta-Descriptions zwischen Seiten.

| Collection | Felder | Ausgabe / Hinweis |
| --- | --- | --- |
| **articles** | `seo.seo_title`, `seo.seo_description`, `index_visibility`, `follow_visibility`, … | Fallback Titel: `title`, Description: `summary`. Robots-Defaults: index, follow. |
| **pages** | wie oben + Seiten-`description` | **Impressum** und **Datenschutz:** `index_visibility: noindex` **beibehalten** (nicht auf index stellen). |
| **glossar** | `seo.seo_title`, `seo.seo_description`, … | Sichtbare Kurzdefinition bleibt `definition`; Meta kann länger sein. |
| **tags** | `description` (kein `seo`-Objekt) | Wird als Meta-Description auf `/tags/<slug>/` genutzt. |
| **blocks**, **menus** | kein eigenes SEO (keine URL) | Nur `title` / Menütext pflegen. |

### Stil und Länge

- **Sprache:** Deutsch, **Du-Form**, laienverständlich; **keine Gedankenstriche** in SEO-Titel und Meta-Description.
- **SEO Title (`seo_title`):** knackig, ca. **50–60 Zeichen**; bei Folgen oft gleich `title` (`Folge nnn: …`). Leer = Fallback auf Seitentitel.
- **Meta Description (`seo_description` bzw. Tag-`description`):** informativ, einladend, ca. **140–160 Zeichen**; aus Summary, Definition oder Seiteninhalt, nicht copy-paste von anderen URLs.
- **Robots:** nur ändern, wenn inhaltlich begründet; Legal-Seiten **noindex** wie oben.

Hilfsskript (Bulk, einmalig): `scripts/fill-seo-fields.py` (manuell anpassen, nicht blind wiederholen).

---

## Checkliste vor dem Pull Request

- [ ] **Schema:** Titel `Folge nnn: …`, Slug `folge-nnn-<kurz>`, pubDate, summary, tags, Video leer, Quellkommentar
- [ ] **SEO:** Meta-Titel und Description (bzw. Tag-`description`, Glossar-`seo`) gesetzt oder aktualisiert; Länge und Stil wie oben; Impressum/Datenschutz **noindex**
- [ ] **Stil:** Du-Form, laienverständlich, keine Striche in Titel/Teaser/FAQ-Fragen
- [ ] **Glossar:** neue/angepasste Einträge, relatedTags, Querverweise
- [ ] **FAQ:** neue Fragen in der richtigen Gruppe, verlinkt
- [ ] **Querverweise:** Folge ↔ Glossar ↔ bestehende Inhalte (Regeln oben)
- [ ] **Repo-Docs:** passende `{{repodoc …}}` in Artikeln; bei Doku-Änderungen Rückverweise zu Folgen prüfen
- [ ] **Bausteine:** wo sinnvoll, keine Duplikate
- [ ] **`npm run build`** grün
- [ ] **PR-Beschreibung** mit:
  - Tabelle **Datei → Slug → Titel → Tags** (neue/geänderte Artikel)
  - Liste **neuer Glossar-Einträge** und **FAQ-Fragen**
  - Übersicht **gesetzter Querverweise**
  - **Unsichere Transkriptstellen** / bewusst weggelassene Passagen
  - ggf. Screenshot bei sichtbaren UI-Änderungen

---

## Screencast-Folgen (Website)

- [Folge 015: Transkript und Artikel aus Screencasts](https://hautoo.storyofai.net/artikel/folge-015-transkript-artikel/)
- [Folge 016: Pull Request und Listing](https://hautoo.storyofai.net/artikel/folge-016-artikel-pull-request/)

## Siehe auch

- [Inhalte der Website](../inhalte/README.md)
- [Sveltia Collections](../sveltia/collections.md)
- [CMS Fields](../cms-fields/README.md)
