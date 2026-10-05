---
title: 'Folge 020: Bausteine, FAQ und hautoo forken'
summary: Wiederverwendbare CMS Bausteine statt Copy Paste, Überblick über Glossar und FAQ und dein eigenes Projekt per GitHub Fork starten.
pubDate: 2026-10-04 23:47:38+00:00
modifiedDate: 2026-10-06
status: published
tags:
- github
- cursor
- sveltia
- astro
seo:
  index_visibility: index
  follow_visibility: follow
  seo_title: 'Folge 020: Bausteine, FAQ und hautoo forken'
  seo_description: CMS Bausteine statt Copy Paste, Glossar und FAQ im Überblick und hautuu per GitHub Fork als Vorlage. Folge 020 für Wiederverwendung und eigenes Projekt.
---

Zwischen den Sessions ist hautuu richtig gewachsen: **20 Folgen** als Artikel, ein ausgebautes [**Glossar**](/glossar/), eine lange [**FAQ**](/faq/) mit Querverweisen und eine Navigation, die sich anfühlt wie eine kleine Site statt wie ein Ordner voller Dateien. In dieser Folge geht es um **Bausteine** (wiederverwendbare Inhalte), den Überblick und die Einladung: **[fork](/glossar/fork/)e** das Repo, wenn du Struktur und Features für dein eigenes Projekt nutzen willst.

Direkt loslegen: [hautoo auf GitHub forken](https://github.com/platomat/hautoo/fork). Du brauchst dafür ein GitHub-Konto.

## Bausteine statt zehnmal das gleiche Bild

Die Stack-Grafik kennst du von der Startseite. Die willst du an mehreren Stellen zeigen, ohne in jedem Artikel Überschrift und Bild zu pflegen. Dafür gibt es die [Collection](/glossar/collection/) **Bausteine** (`blocks`): [Markdown](/glossar/markdown/) ohne eigene URL, einmal pflegen, überall gleich.

{{block id="stack-uebersicht"}}

Technisch eine Zeile im Body, z. B. `{{block id="stack-uebersicht"}}`. In [Sveltia](/glossar/sveltia/) findest du in der Toolbar **Baustein** (oder du legst den Eintrag unter **Bausteine** an). Änderst du den Baustein, aktualisieren sich alle Stellen beim nächsten [Build](/glossar/build/). Das ist bewusst **[WordPress](/glossar/wordpress/)-ähnlich**, nur dass alles in [Git](/glossar/git/) landet. Details: [Glossar Baustein](/glossar/baustein/), [Folge 004](/artikel/folge-004-collection-pages/).

Weitere Bausteine sind z. B. **Kontakt-E-Mail** (`{{contact-email}}`) für Impressum und Datenschutz ohne Klartext im [Repo](/glossar/repository/) ([Folge 019](/artikel/folge-019-impressum-komponenten/#e-mail-schützen)) oder ein **Separator** für optische Trennlinien. **Bildnachweise** zu Seitenhintergründen sammelt die Site automatisch auf dem Impressum ([Folge 019](/artikel/folge-019-impressum-komponenten/#bildnachweise-im-impressum)).

{{repodoc path="docs/sveltia/collections.md" title="Collections (Sveltia)" description="Bausteine, Pages und alle CMS-Collections."}}

## Seiten feintunen

Bei **Seiten** kannst du optional **Header-Code** und **Footer-Code** setzen: kleine HTML- oder Style-Snippets nur für diese eine Seite, ohne das globale Layout für alle anzufassen. **SEO**-Felder liegen im [CMS](/glossar/cms/) weiter unten, damit der Alltags-Content oben bleibt. Titel und Descriptions für alle Seiten kannst du später gezielt mit dem Agenten ausfüllen lassen.

## FAQ mit Inhaltsverzeichnis

Die [**FAQ**](/faq/) bündelt viele Fragen in **Themengruppen** (Überschriften **H2**). Pro Frage gibt es eine **H3**-Überschrift. Mit `showToc` und `tocLevels: h2` springst du nur zwischen den Gruppen, nicht durch jede einzelne Frage. Das gleiche Muster kennst du von Artikeln mit optionalem Inhaltsverzeichnis ([Folge 004](/artikel/folge-004-collection-pages/)).

Glossar-Einträge und Folgen sind von dort verlinkt, damit du nicht alles auswendig lernen musst.

## Glossar nachschlagen mit Link-Vorschau (Firefox)

In den Artikeln verlinken wir [**Glossar**](/glossar/)-Begriffe, z. B. [**SSH-Key**](/glossar/ssh-key/). Statt jeden Begriff in einem neuen Tab zu öffnen, kannst du in **Firefox** auf dem Desktop eine **Link-Vorschau** nutzen: Du bleibst im Artikel und siehst kurz Titel und Beschreibung der Zielseite in einer **eigenen Firefox-Karte**, nicht als Overlay der Website.

So geht’s laut Mozilla (Stand **Firefox 142**, Desktop):

- **Rechtsklick** auf den Link → Eintrag **Link-Vorschau** (englische Oberfläche: *Preview Link*).
- Alternativ den Link **lange gedrückt halten** (Desktop, wie in den [Firefox-142-Release-Notes](https://www.firefox.com/firefox/142.0/releasenotes/) beschrieben).

Die Funktion heißt offiziell **Link Previews** und wird **schrittweise** ausgerollt (z. B. zunächst für einige englische Firefox-Locales und Rechner mit genug freiem RAM). Wenn du den Menüpunkt nicht siehst: Firefox aktualisieren, einmal neu starten und unter **Einstellungen → Allgemein → Surfen** nach einer Option für Link-Vorschau schauen. In Einzelfällen hilft laut Community-Hinweisen `browser.ml.linkPreview.enabled` in `about:config` (nur wenn du weißt, was du tust). Details und Schalter können sich je nach Version ändern, die [Mozilla-Hilfe zu Link Previews](https://support.mozilla.org/kb/use-link-previews-firefox) ist die Referenz.

**Lokal** (`npm run dev`, `localhost`) klappt die Vorschau oft **nicht** (Firefox meldet dann, dass keine Vorschau möglich ist). Auf der **öffentlichen Site** mit SEO-Beschreibung im Glossar ist das Nachschlagen angenehmer. Optional können KI-Stichpunkte in der Vorschau angeboten werden; für Glossar reicht meist die normale Vorschau aus Seiten-Metadaten.

Früher gab es die Idee experimentell in **Firefox Labs** (eigene Tastenkombination beim Überfahren eines Links). Die heutige Variante ist die Link-Vorschau über Kontextmenü bzw. langes Drücken.

## Fork statt nur klonen

{{repodoc path="docs/inhalte/README.md" title="Inhalte der Website" description="Struktur der Collections und Medienablage."}}



Wenn dir **Struktur**, **Bausteine**, **Menüs**, **Artikel** und **Seiten** gefallen, musst du nicht bei null anfangen:

1. Auf [GitHub](/glossar/github/) beim Repo **Fork** wählen. Das ist **deine** Kopie unter deinem Account, kein Schreiben im Original ([**Glossar Fork**](/glossar/fork/), Kurz in [Folge 002](/artikel/folge-002-github-issues/)).
2. Deinen Fork **klonen**, in [**Cursor**](/glossar/cursor/) öffnen.
3. Dem Agenten sagen: Inhalte löschen, Farben und Logo ersetzen, Texte anpassen, [Cloudflare](/glossar/cloudflare-pages/) auf **dein** Repo hängen ([Folge 011](/artikel/folge-011-cloudflare-setup/)).

**Klonen** holt ein Repo auf die Platte. **Forken** legt zuerst deine GitHub-Kopie an. Für „eigene Site auf Basis von hautuu“ ist der Fork der richtige Start.

Hast du ein gutes Feature gebaut, schick einen [**Pull Request**](/glossar/pull-request/) zurück ans Original. Umgekehrt kannst du von hier Updates übernehmen, wenn du magst. Ein **Stern** auf GitHub beim Original ist ein kleines Danke, wenn dir das Projekt hilft.

## Was du mitnehmen kannst

- **Bausteine** für wiederkehrende Inhalte (Stack, Kontakt, Trenner).
- **Glossar**, **FAQ** und **Tags** als Lern-Netz; in Firefox Link-Vorschau zum Nachschlagen.
- **Fork** als Einstieg in dein eigenes Projekt mit gleichem Stack ([Folge 001](/artikel/folge-001-hautuu-intro/) für die grobe Kette).
- **Bilder** für Hintergründe und Assets: Quellen, WebP und Upload ([Folge 021](/artikel/folge-021-bilder-suchen-nutzen/)).

<!-- Quelle: 2026-10-04--23-47-38--obs-screencast - hautoo - 020 - neue bausteine, neue features, hautoo forken.txt -->
