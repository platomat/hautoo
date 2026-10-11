---
title: 'Folge 020: Bausteine, FAQ und hautoo forken'
summary: Wiederverwendbare CMS Bausteine statt Copy Paste, Überblick über Glossar und FAQ und dein eigenes Projekt per Fork oder GitHub-Template starten.
pubDate: 2026-10-04 23:47:38+00:00
modifiedDate: 2026-10-12
status: published
categories:
  - screencasts
tags:
- github
- cursor
- sveltia
- astro
authors:
  - wasilij
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 020: Bausteine, FAQ und hautoo forken'
  seo_description: CMS Bausteine, Glossar und FAQ im Überblick. Eigenes Projekt per GitHub Fork oder Template, inkl. privat vs. öffentliche Website.
---

Zwischen den Sessions ist hautuu richtig gewachsen: **20 Folgen** als Artikel, ein ausgebautes [**Glossar**](/glossar/), eine lange [**FAQ**](/faq/) mit Querverweisen und eine Navigation, die sich anfühlt wie eine kleine Site statt wie ein Ordner voller Dateien. In dieser Folge geht es um **Bausteine** (wiederverwendbare Inhalte), den Überblick und die Einladung: nutze hautuu als Basis für dein eigenes Projekt, per [**Fork**](/glossar/fork/) oder besser oft per [**Template**](/glossar/template/).

Du brauchst ein GitHub-Konto. Zwei Einstiege:

- [hautoo als Vorlage (Template)](https://github.com/platomat/hautoo/generate) (auch **privates** Repo möglich)
- [hautoo forken](https://github.com/platomat/hautoo/fork) (Fork bleibt **öffentlich**)

## Bausteine statt zehnmal das gleiche Bild

Die Stack-Grafik kennst du von der Startseite. Die willst du an mehreren Stellen zeigen, ohne in jedem Artikel Überschrift und Bild zu pflegen. Dafür gibt es die [Collection](/glossar/collection/) **Bausteine** (`blocks`): [Markdown](/glossar/markdown/) ohne eigene URL, einmal pflegen, überall gleich.

{{block id="stack-uebersicht"}}

Technisch eine Zeile im Body, z. B. `{{block id="stack-uebersicht"}}`. In [Sveltia](/glossar/sveltia/) auf der **Startseite** im Inhalt über die Toolbar **Baustein** und den passenden Block wählen (oder unter Collection **Bausteine** pflegen). Änderst du den Baustein, aktualisieren sich alle Stellen beim nächsten [Build](/glossar/build/). Details: [Glossar Baustein](/glossar/baustein/), [Folge 004](/artikel/folge-004-collection-pages/).

Weitere Bausteine sind z. B. **Kontakt-E-Mail** (`{{contact-email}}`) für Impressum und Datenschutz ohne Klartext im [Repo](/glossar/repository/) ([Folge 019](/artikel/folge-019-impressum-komponenten/#e-mail-schützen)) oder eine **Trennlinie** für optische Trennung. **Bildnachweise** zu Seitenhintergründen sammelt die Site automatisch auf dem Impressum ([Folge 019](/artikel/folge-019-impressum-komponenten/#bildnachweise-im-impressum)).

{{repodoc path="docs/sveltia/collections.md" title="Collections (Sveltia)" description="Bausteine, Pages und alle CMS-Collections."}}

## Seiten feintunen

Bei **Seiten** kannst du optional **Header-Code** und **Footer-Code** setzen: kleine HTML- oder Style-Snippets nur für diese eine Seite, ohne das globale Layout für alle anzufassen. **SEO**-Felder liegen im [CMS](/glossar/cms/) weiter unten, damit der Alltags-Content oben bleibt. Titel und Descriptions für alle Seiten kannst du später gezielt mit dem Agenten ausfüllen lassen.

## FAQ mit Inhaltsverzeichnis

Die [**FAQ**](/faq/) bündelt viele Fragen in **Themengruppen** (Überschriften **H2**). Pro Frage gibt es eine **H3**-Überschrift. Mit `toc.show` und `toc.levels: [h2]` springst du nur zwischen den Gruppen, nicht durch jede einzelne Frage. Das gleiche Muster kennst du von Artikeln mit optionalem Inhaltsverzeichnis ([Folge 004](/artikel/folge-004-collection-pages/)).

Glossar-Einträge und Folgen sind von dort verlinkt, damit du nicht alles auswendig lernen musst.

## Glossar nachschlagen mit Link-Vorschau (Firefox)

In den Artikeln verlinken wir [**Glossar**](/glossar/)-Begriffe, z. B. [**SSH-Key**](/glossar/ssh-key/). Statt jeden Begriff in einem neuen Tab zu öffnen, kannst du in **Firefox** auf dem Desktop eine **Link-Vorschau** nutzen: Du bleibst im Artikel und siehst kurz Titel und Beschreibung der Zielseite in einer **eigenen Firefox-Karte**, nicht als Overlay der Website.

So geht’s laut Mozilla (Stand **Firefox 142**, Desktop):

- **Rechtsklick** auf den Link → Eintrag **Link-Vorschau** (englische Oberfläche: *Preview Link*).
- Alternativ den Link **lange gedrückt halten** (Desktop, wie in den [Firefox-142-Release-Notes](https://www.firefox.com/firefox/142.0/releasenotes/) beschrieben).

Die Funktion heißt offiziell „Link Previews“ (Link-Vorschau) und wird **schrittweise** ausgerollt (z. B. zunächst für einige englische Firefox-Locales und Rechner mit genug freiem RAM). Wenn du den Menüpunkt nicht siehst: Firefox aktualisieren, einmal neu starten und unter **Einstellungen → Allgemein → Surfen** nach einer Option für Link-Vorschau schauen. In Einzelfällen hilft laut Community-Hinweisen `browser.ml.linkPreview.enabled` in `about:config` (nur wenn du weißt, was du tust). Details und Schalter können sich je nach Version ändern, die [Mozilla-Hilfe zu Link Previews](https://support.mozilla.org/kb/use-link-previews-firefox) ist die Referenz.

**Lokal** (`npm run dev`, `localhost`) klappt die Vorschau oft **nicht** (Firefox meldet dann, dass keine Vorschau möglich ist). Auf der **öffentlichen Site** mit SEO-Beschreibung im Glossar ist das Nachschlagen angenehmer. Optional können KI-Stichpunkte in der Vorschau angeboten werden; für Glossar reicht meist die normale Vorschau aus Seiten-Metadaten.

Früher gab es die Idee experimentell in **Firefox Labs** (eigene Tastenkombination beim Überfahren eines Links). Die heutige Variante ist die Link-Vorschau über Kontextmenü bzw. langes Drücken.

## Eigenes Projekt: Fork oder Template

{{repodoc path="docs/inhalte/README.md" title="Inhalte der Website" description="Struktur der Collections und Medienablage."}}

Wenn dir **Struktur**, **Bausteine**, **Menüs**, **Artikel** und **Seiten** gefallen, musst du nicht bei null anfangen. [**Klonen**](/glossar/clone/) holt Dateien nur auf die Platte. Für „eigene Site auf Basis von hautuu“ legst du zuerst ein **eigenes** [Repo](/glossar/repository/) unter deinem Account an: per [**Fork**](/glossar/fork/) oder per [**Template**](/glossar/template/).

### Template (empfohlen, wenn du privat willst)

GitHub-Vorlage: Du erzeugst ein **neues** Repo und wählst Sichtbarkeit selbst.

1. Öffne [hautoo als Vorlage](https://github.com/platomat/hautoo/generate) (**Use this template** / Diese Vorlage verwenden).
2. Vergib einen Repo-Namen (z. B. `meine-webseite`). Der Name ist nur der GitHub-Ordner, nicht automatisch deine Domain.
3. Wähle **Private** oder **Public**. Private heißt: Quellcode auf GitHub nicht für alle lesbar.
4. Repo **klonen**, in [**Cursor**](/glossar/cursor/) öffnen, Inhalte und Design anpassen, [Cloudflare Pages](/glossar/cloudflare-pages/) auf **dein** Repo hängen ([Folge 011](/artikel/folge-011-cloudflare-setup/)).

### Fork

1. Auf der Repo-Seite [Fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) → **Create fork** (Fork erstellen). Kurz auch in [Folge 002](/artikel/folge-002-github-issues/).
2. Fork **klonen**, in Cursor öffnen, wie oben anpassen und hosten.

**Wichtig:** Forkst du das **öffentliche** hautuu-Repo, bleibt dein Fork bei GitHub **öffentlich**. Du kannst ihn später nicht einfach auf privat stellen. Willst du den Code nicht offen auf GitHub, nimm das **Template**.

### Repo privat oder öffentlich ist nicht die Website

Zwei getrennte Dinge:

| Schalter | Bedeutung |
| --- | --- |
| Repo **Public** / **Private** auf GitHub | Wer den **Quellcode** und die Markdown-Inhalte auf GitHub lesen darf |
| Website online (Cloudflare, Domain) | Ob **Besucher** deine Site im Browser erreichen |

Ein **privates** Repo kann eine **öffentliche** Website ausliefern. Ein **öffentliches** Repo heißt nicht zwingend, dass du schon eine fertige Domain freigeschaltet hast. Details: [Glossar Repository](/glossar/repository/), [Glossar Template](/glossar/template/).

Hast du ein gutes Feature gebaut, schick einen [**Pull Request**](/glossar/pull-request/) zurück ans Original (vom Fork aus besonders natürlich). Ein „Star“ (Stern auf GitHub) beim Original ist ein kleines Danke, wenn dir das Projekt hilft.

## Was du mitnehmen kannst

- **Bausteine** für wiederkehrende Inhalte (Stack, Kontakt, Trenner).
- **Glossar**, **FAQ** und **Tags** als Lern-Netz; in Firefox Link-Vorschau zum Nachschlagen.
- **Template** oder **Fork** als Einstieg in dein eigenes Projekt (Template für privates Repo); Stack-Idee in [Folge 001](/artikel/folge-001-hautuu-intro/).
- **Bilder** für Hintergründe und Assets: Quellen, WebP und Upload ([Folge 021](/artikel/folge-021-bilder-suchen-nutzen/)).

<!-- Quelle: 2026-10-04--23-47-38--obs-screencast - hautoo - 020 - neue bausteine, neue features, hautoo forken.txt -->
