# Design & Erscheinungsbild

Wie die Website **aussehen und wirken** soll. Umsetzung in CSS/Astro folgt diesen Vorgaben.

## Logo

- **Markenzeichen:** Blatt mit Mittelrippe und Gabelnerven (Natur + Branch-Struktur)
- **Farben:** Konturen/Punkte = Ink (`#e8eeea` / Textfarbe); Mittelrippe + Wurzelpunkt = Accent (`#3dcf8e` / Aktionsgrün)
- **Klassen:** `.logo-mark__ink` (folgt `currentColor`), `.logo-mark__accent` (Aktionsfarbe)
- **Statikdatei:** `public/img/logo-mark.svg` (gleiche Geometrie/Farben für README und Einbettungen)
- **Header:** `LogoMark.astro`. Initial Ink hell + Accent grün; Hover invertiert (Ink → Aktionsfarbe, Accent → Textfarbe)
- **Wortmarke:** `hautuu` neben dem Mark (Header)
- **Favicon:** `public/img/favicon.svg` (Ink dunkel bei hellem System, hell bei dunklem; Accent bleibt grün), Fallback `favicon.ico`

## Prinzipien

- **Dunkel** — dunkles Farbschema als Standard (kein Hellmodus in v1)
- **Schlicht** — wenig Dekoration, keine unnötigen Karten, Schatten oder Badges
- **Übersichtlich** — klare Hierarchie, genug Weißraum (auf dunklem Grund: Luft zwischen Blöcken), eine Aufgabe pro Abschnitt

## Typografie

| Rolle | Schrift | Schnitt | Stärke (`font-weight`) |
| --- | --- | --- | --- |
| Fließtext | **Ubuntu** | Light | **300** |
| Überschriften (`h1`–`h6`) | **Ubuntu** | Medium | **500** |

- `font-family`: `'Ubuntu', system-ui, sans-serif`
- Keine zweite Display-Schrift — eine Familie für alles
- Zeilenlänge Fließtext: ca. 60–75 Zeichen, angenehme `line-height` (z. B. 1.6)
- Content-Überschriften (`.page h2`–`h6` ohne Klasse): **mehr Abstand nach oben** als nach unten, damit Überschrift + folgender Text als Block wirken (z. B. FAQ Frage→Antwort)

### Bereitstellung

Schriften werden **lokal** unter `public/fonts/ubuntu/` gehostet (kein CDN):

| Datei | Schnitt |
| --- | --- |
| `Ubuntu-Light.woff2` / `.woff` | Light (300), Latin + Latin-Extended Subset |
| `Ubuntu-Medium.woff2` / `.woff` | Medium (500), Latin + Latin-Extended Subset |

Subset mit `pyftsubset` (DE inkl. Umlaute). Preload beider WOFF2 in `BaseLayout`. Stylesheets werden im Build inline (`build.inlineStylesheets: 'always'`), damit kein render-blocking CSS-Request die FCP verzögert.

`@font-face` und zentrale **CSS-Variablen** (im Englischen oft *design tokens* oder *custom properties*) liegen in `src/styles/global.css`, eingebunden über `src/layouts/BaseLayout.astro`.

## Links

- **Keine Unterstreichung** (`text-decoration: none`)
- Farbe = **Aktionsfarbe** (`--color-action`)
- Hover: etwas heller (`--color-action-hover`), optional leichte Opacity — weiterhin ohne Unterstreichung
- Fokus: sichtbarer Fokusring in Aktionsfarbe (Tastaturbedienbarkeit)

## Farbpalette

Grün ist die **primäre Aktionsfarbe**. Die übrigen Töne sind kühl-neutral mit leicht grünem Stich, damit alles zusammenpasst — nicht lila, nicht grell.

### CSS-Variablen (`:root`)

| Variable | Hex / Wert | Rolle |
| --- | --- | --- |
| `--color-bg` | `#0F1412` | Seitenhintergrund |
| `--color-surface` | `#1A211E` | Flächen (Header, Footer, abgesetzte Bereiche) |
| `--color-surface-glass` | `rgba(26, 33, 30, 0.5)` | Halbtransparente Fläche (~50 %) |
| `--color-chrome` | standard: `var(--color-surface)` | Header/Footer/Nav; bei Seiten-BG → `surface-glass` |
| `--color-surface-raised` | `#232B27` | leicht angehoben (z. B. Code, Zitat) |
| `--color-border` | `#2E3833` | Linien, Trenner |
| `--color-text` | `#E8EEEA` | Haupttext |
| `--color-text-muted` | `#9AA89F` | Nebentext, Meta, Captions |
| `--color-action` | `#3DCF8E` | Primär / Links / Buttons / Fokus |
| `--color-action-hover` | `#56D9A0` | Hover-Zustand der Aktion |
| `--color-action-muted` | `#1A3D2E` | dezenter Aktions-Hintergrund (z. B. Chip, Hover-Fläche) |
| `--color-danger` | `#E57373` | Fehler, destruktive Hinweise |

Wenn eine Seite/ein Artikel ein Hintergrundbild hat (`body.has-page-bg`), nutzen Header, Footer und Nav-Panels `--color-surface-glass` plus leichtes `backdrop-filter`, damit das Bild durchscheint.

### Kurzüberblick

```text
Hintergrund     #0F1412  ████
Fläche          #1A211E  ████
Fläche Glas     rgba(26,33,30,.5)  (über BG-Bild)
Erhöht          #232B27  ████
Rahmen          #2E3833  ████
Text            #E8EEEA  ████
Text gedämpft   #9AA89F  ████
Aktion / Primär #3DCF8E  ████
Aktion Hover    #56D9A0  ████
Aktion gedämpft #1A3D2E  ████
Gefahr          #E57373  ████
```

### Beispiel `:root`

```css
:root {
  --color-bg: #0f1412;
  --color-surface: #1a211e;
  --color-surface-glass: rgba(26, 33, 30, 0.5);
  --color-chrome: var(--color-surface);
  --color-surface-raised: #232b27;
  --color-border: #2e3833;
  --color-text: #e8eeea;
  --color-text-muted: #9aa89f;
  --color-action: #3dcf8e;
  --color-action-hover: #56d9a0;
  --color-action-muted: #1a3d2e;
  --color-danger: #e57373;

  --font-sans: "Ubuntu", system-ui, sans-serif;
  --font-weight-body: 300;
  --font-weight-heading: 700;
}
```

## Layout & UI (Leitplanken)

- Maximale Inhaltsbreite begrenzt (Lesbarkeit), nicht Full-Bleed-Text über den ganzen Monitor
- Navigation und Fließtext klar getrennt; wenig gleichzeitige CTAs
- Keine Card-Optik als Default (Rahmen/Schatten nur wenn Interaktion es braucht)
- Kontrast Text/Hintergrund prüfen (WCAG möglichst AA)

## Breakpoints

| Name | Bedingung | Bedeutung |
| --- | --- | --- |
| Desktop | `≥ 1024px` | Standard-Desktop |
| Tablet | `< 1024px` | Tablet (und kleiner, bis Mobile greift) |
| Mobile | `< 680px` | Smartphone |

Breakpoint-**CSS-Variablen** in `:root` (`src/styles/global.css`): `--bp-tablet: 1024px`, `--bp-mobile: 680px`. In `@media` dieselben Pixelwerte nutzen (`max-width: 1023px` / `max-width: 679px`), weil Media Queries CSS-Variablen nicht zuverlässig auswerten.

Footer-Copyright-Zeile: ab Mobile untereinander und zentriert (Utilities `stack-on-mobile` + `center-on-mobile`).

### Mobile-Navigation (Burger)

Unter **680px** (`max-width: 679px`):

- Burger-Button rechts neben dem Brand; horizontale Nav wird zum Panel darunter
- Icon: drei Linien → animiertes Kreuz beim Öffnen (`transform` / `opacity`, ~220ms)
- Toggle-Script: `src/scripts/nav-toggle.ts` — `aria-expanded`, Escape, Klick außerhalb, Body-Scroll-Lock
- Untermenüs: Desktop als Flyout (Hover/Fokus/Chevron); Mobile als Akkordeon (`src/scripts/nav-submenu.ts`)
- `prefers-reduced-motion: reduce` schaltet die Transition aus
- Ab **680px**: kein Burger, horizontale Nav wie bisher

### Layout-Utilities (`src/styles/global.css`)

Beliebig kombinieren, statt Flex-CSS in jeder Komponente neu zu schreiben:

| Klasse | Wirkung |
| --- | --- |
| `.flex-row` / `.flex-col` | Flex-Zeile bzw. -Spalte, `gap: 1em` |
| `.flex-wrap` | Umbruch erlauben |
| `.flex-between` | `justify-content: space-between` |
| `.flex-center` | Inhalt zentrieren |
| `.flex-align-center` / `.flex-align-baseline` | Cross-Axis |
| `.flex-shrink-0` | nicht schrumpfen |
| `.gap-sm` / `.gap-md` / `.gap-lg` | Abstand überschreiben |
| `.w-full` / `.min-w-0` | Breite |
| `.ms-auto` | nach rechts schieben (`margin-inline-start: auto`) |
| `.text-center` / `.text-muted` / `.text-sm` | Text |
| `.list-plain` | Liste ohne Bullets/Margin |
| `.stack-on-tablet` | ab `< 1024px` → Spalte |
| `.stack-on-mobile` | ab `< 680px` → Spalte |
| `.center-on-tablet` / `.center-on-mobile` | auf Breakpoint zentrieren; setzt `.ms-auto` zurück |
| `.page--wide` / `.page--with-sidebar` | breitere Inhaltsbreite (`--content-wide-max-width`, 64rem) |
| `.page-layout` / `.page-layout__main` | Flex-Zeile Inhalt/Sidebar (mit `.stack-on-tablet`) |
| `.hero` / `.page-hero` | Titelblock überall (`PageHero.astro`: `h1` + optionale Beschreibung, Abstand zum Inhalt) |
| `.separator` | Dezente Trennlinie (`Separator.astro` / CMS `{{separator height width color}}`; Default-Farbe `border`) |
| `.article-list` | Artikelliste (Titel, Summary, Datum) |

Beispiel: `class="flex-row flex-between stack-on-mobile center-on-mobile"`

## Leistung & CSS

Die Website soll **schnell und schlank** bleiben (Page Speed mitdenken).

### Styles wiederverwenden

- Vorhandene CSS-Variablen und Klassen in `src/styles/` nutzen — nicht bei jeder Komponente CSS neu erfinden
- Häufige Muster als **gemeinsame Gruppen-/Utility-Klassen** pflegen (z. B. Inhaltsbreite, vertikaler Abstand)
- Scoped Astro-`<style>` nur für wirklich komponentenspezifisches Markup

### Critical vs. non-critical CSS

| Art | Inhalt | Regel |
| --- | --- | --- |
| **Critical** | Above-the-fold: CSS-Variablen, Basis, Typo, Header/Nav, erste Inhaltsfläche | Klein halten, früh laden |
| **Non-critical** | Seltene Komponenten, Artikel-Extras | Separat; nicht in den First-Paint-Pfad mischen |

Stand der Dateien: Critical-Basis in `src/styles/global.css` (weiter aufteilen, sobald die Site wächst). Agenten-Regeln: `.cursor/rules/leistung-und-css.mdc`.

## Bezug

- Stack und Zielgruppe: [Konzept](../konzept/README.md)
- Technische Umsetzung: [Astro](../astro/README.md)
- Deploy nur nach bewusstem Push: [Cloudflare](../cloudflare/README.md)
