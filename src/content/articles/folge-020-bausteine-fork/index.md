---
title: "Folge 020: Bausteine, FAQ und hautoo forken"
summary: "Wiederverwendbare CMS Bausteine statt Copy Paste, Überblick über Glossar und FAQ und dein eigenes Projekt per GitHub Fork starten."
pubDate: 2026-10-04T23:47:38Z
modifiedDate: 2026-10-04
status: published
tags:
  - github
  - cursor
  - sveltia
  - astro
seo:
  index_visibility: index
  follow_visibility: follow
---

Zwischen den Sessions ist hautuu richtig gewachsen: **19 Folgen** als Artikel, ein ausgebautes [**Glossar**](/glossar/), eine lange [**FAQ**](/faq/) mit Querverweisen und eine Navigation, die sich anfühlt wie eine kleine Site statt wie ein Ordner voller Dateien. In dieser Folge geht es um **Bausteine** (wiederverwendbare Inhalte), den Überblick und die Einladung: **forke** das Repo, wenn du Struktur und Features für dein eigenes Projekt nutzen willst.

## Bausteine statt zehnmal das gleiche Bild

Die Stack-Grafik kennst du von der Startseite. Die willst du an mehreren Stellen zeigen, ohne in jedem Artikel Überschrift und Bild zu pflegen. Dafür gibt es die Collection **Bausteine** (`blocks`): Markdown ohne eigene URL, einmal pflegen, überall gleich.

{{block id="stack-uebersicht"}}

Technisch eine Zeile im Body, z. B. `{{block id="stack-uebersicht"}}`. In Sveltia findest du in der Toolbar **Baustein** (oder du legst den Eintrag unter **Bausteine** an). Änderst du den Baustein, aktualisieren sich alle Stellen beim nächsten Build. Das ist bewusst **WordPress-ähnlich**, nur dass alles in Git landet. Details: [Glossar Baustein](/glossar/baustein/), [Folge 004](/artikel/folge-004-collection-pages/).

Weitere Bausteine sind z. B. **Kontakt-E-Mail** (`{{contact-email}}`) für Impressum und Datenschutz ohne Klartext im Repo ([Folge 019](/artikel/folge-019-impressum-komponenten/)) oder ein **Separator** für optische Trennlinien.

## Seiten feintunen

Bei **Seiten** kannst du optional **Header-Code** und **Footer-Code** setzen: kleine HTML- oder Style-Snippets nur für diese eine Seite, ohne das globale Layout für alle anzufassen. **SEO**-Felder liegen im CMS weiter unten, damit der Alltags-Content oben bleibt. Titel und Descriptions für alle Seiten kannst du später gezielt mit dem Agenten ausfüllen lassen.

## FAQ mit Inhaltsverzeichnis

Die [**FAQ**](/faq/) bündelt viele Fragen in **Themengruppen** (Überschriften **H2**). Pro Frage gibt es eine **H3**-Überschrift. Mit `showToc` und `tocLevels: h2` springst du nur zwischen den Gruppen, nicht durch jede einzelne Frage. Das gleiche Muster kennst du von Artikeln mit optionalem Inhaltsverzeichnis ([Folge 004](/artikel/folge-004-collection-pages/)).

Glossar-Einträge und Folgen sind von dort verlinkt, damit du nicht alles auswendig lernen musst.

## Fork statt nur klonen

Wenn dir **Struktur**, **Bausteine**, **Menüs**, **Artikel** und **Seiten** gefallen, musst du nicht bei null anfangen:

1. Auf GitHub beim Repo **Fork** wählen. Das ist **deine** Kopie unter deinem Account, kein Schreiben im Original ([**Glossar Fork**](/glossar/fork/), Kurz in [Folge 002](/artikel/folge-002-github-issues/)).
2. Deinen Fork **klonen**, in [**Cursor**](/glossar/cursor/) öffnen.
3. Dem Agenten sagen: Inhalte löschen, Farben und Logo ersetzen, Texte anpassen, Cloudflare auf **dein** Repo hängen ([Folge 011](/artikel/folge-011-cloudflare-setup/)).

**Klonen** holt ein Repo auf die Platte. **Forken** legt zuerst deine GitHub-Kopie an. Für „eigene Site auf Basis von hautuu“ ist der Fork der richtige Start.

Hast du ein gutes Feature gebaut, schick einen [**Pull Request**](/glossar/pull-request/) zurück ans Original. Umgekehrt kannst du von hier Updates übernehmen, wenn du magst. Ein **Stern** auf GitHub beim Original ist ein kleines Danke, wenn dir das Projekt hilft.

## Was du mitnehmen kannst

- **Bausteine** für wiederkehrende Inhalte (Stack, Kontakt, Trenner).
- **Glossar**, **FAQ** und **Tags** als Lern-Netz, nicht als Pflichtlektüre.
- **Fork** als Einstieg in dein eigenes Projekt mit gleichem Stack ([Folge 001](/artikel/folge-001-hautuu-intro/) für die grobe Kette).

<!-- Quelle: 2026-10-04--23-47-38--obs-screencast - hautoo - 020 - neue bausteine, neue features, hautoo forken.txt -->
