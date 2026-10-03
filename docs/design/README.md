# Design & Erscheinungsbild

Wie die Website **aussehen und wirken** soll. Umsetzung in CSS/Astro folgt diesen Vorgaben.

## Prinzipien

- **Dunkel** — dunkles Farbschema als Standard (kein Hellmodus in v1)
- **Schlicht** — wenig Dekoration, keine unnötigen Karten, Schatten oder Badges
- **Übersichtlich** — klare Hierarchie, genug Weißraum (auf dunklem Grund: Luft zwischen Blöcken), eine Aufgabe pro Abschnitt

## Typografie

| Rolle | Schrift | Stärke (`font-weight`) |
| --- | --- | --- |
| Fließtext | **Ubuntu** | **300** (Light) |
| Überschriften (`h1`–`h6`) | **Ubuntu** | **600** (Semi Bold) |

- `font-family`: `'Ubuntu', system-ui, sans-serif`
- Keine zweite Display-Schrift — eine Familie für alles
- Zeilenlänge Fließtext: ca. 60–75 Zeichen, angenehme `line-height` (z. B. 1.6)

### Bereitstellung

Schriften werden **lokal im Repo** gehostet (kein Google-Fonts-CDN). Dateien und `@font-face` liefert das Projekt bzw. die Maintainer; Einbindung z. B. unter `public/fonts/` oder `src/assets/fonts/`.

Benötigte Schnitte: **300** und **600** (falls 600 als Datei fehlt: nächstgelegenen Schnitt dokumentieren und mapping in CSS festhalten).

## Links

- **Keine Unterstreichung** (`text-decoration: none`)
- Farbe = **Aktionsfarbe** (`--color-action`)
- Hover: etwas heller (`--color-action-hover`), optional leichte Opacity — weiterhin ohne Unterstreichung
- Fokus: sichtbarer Fokusring in Aktionsfarbe (Tastaturbedienbarkeit)

## Farbpalette

Grün ist die **primäre Aktionsfarbe**. Die übrigen Töne sind kühl-neutral mit leicht grünem Stich, damit alles zusammenpasst — nicht lila, nicht grell.

### Tokens (CSS-Variablen, Englisch)

| Token | Hex | Rolle |
| --- | --- | --- |
| `--color-bg` | `#0F1412` | Seitenhintergrund |
| `--color-surface` | `#1A211E` | Flächen (Header, Footer, abgesetzte Bereiche) |
| `--color-surface-raised` | `#232B27` | leicht angehoben (z. B. Code, Zitat) |
| `--color-border` | `#2E3833` | Linien, Trenner |
| `--color-text` | `#E8EEEA` | Haupttext |
| `--color-text-muted` | `#9AA89F` | Nebentext, Meta, Captions |
| `--color-action` | `#3DCF8E` | Primär / Links / Buttons / Fokus |
| `--color-action-hover` | `#56D9A0` | Hover-Zustand der Aktion |
| `--color-action-muted` | `#1A3D2E` | dezenter Aktions-Hintergrund (z. B. Chip, Hover-Fläche) |
| `--color-danger` | `#E57373` | Fehler, destruktive Hinweise |

### Kurzüberblick

```text
Hintergrund     #0F1412  ████
Fläche          #1A211E  ████
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
  --font-weight-heading: 600;
}
```

## Layout & UI (Leitplanken)

- Maximale Inhaltsbreite begrenzt (Lesbarkeit), nicht Full-Bleed-Text über den ganzen Monitor
- Navigation und Fließtext klar getrennt; wenig gleichzeitige CTAs
- Keine Card-Optik als Default (Rahmen/Schatten nur wenn Interaktion es braucht)
- Kontrast Text/Hintergrund prüfen (WCAG möglichst AA)

## Bezug

- Stack und Zielgruppe: [Konzept](../konzept/README.md)
- Technische Umsetzung: [Astro](../astro/README.md)
- Offene Layout-Arbeit: folgt mit ersten Seiten-Templates
