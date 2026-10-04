# Medienablage — Variante B

Bilder, die zu einem Eintrag gehören, liegen **im selben Ordner** wie die Markdown-Datei — nicht unter `public/media`.

```text
src/content/articles/mein-artikel/
  index.md          # Frontmatter + Text
  hero.jpg          # Bild zum Eintrag (relativ referenziert)
```

**Warum:** Astro kann Dateien unter `src/` mit dem Schema-Helfer `image()` optimieren. Eintrag und Medien bleiben im Repo zusammen.

**Abgrenzung:** How-to-Videos bleiben **Embeds** (Vimeo/YouTube), keine Videodateien im Repo. Siehe [Inhalte](../inhalte/README.md).

**Geteilte/generische Bilder:** Variante B gilt für eintragsbezogene Medien. Wiederverwendbare Assets (Logo, Icons, Illustrationen) können zusätzlich unter `src/assets/` liegen (globaler Fallback in der CMS-Config). Siehe [Gemeinsamer Medienpool](#gemeinsamer-medienpool-ergänzend-zu-b).

Zurück zur [Sveltia-Übersicht](./README.md).

---

## Variante B in Sveltia zum Laufen bringen

Ziel: Upload im CMS speichert Dateien neben `index.md`; Frontmatter/Markdown enthält **eintragsrelative** Pfade (z. B. `hero.jpg`), die Astro mit `image()` verstehen kann.

### Schritt 1 — Collection als Ordner-Einträge (nicht Einzeldatei)

Pro Eintrag ein Unterordner + `index.md`. In `public/admin/config.yml` pro Collection:

```yaml
collections:
  - name: articles   # Beispiel; bei pages bereits so umgesetzt
    folder: src/content/articles
    create: true
    path: "{{slug}}/index"
    media_folder: ""
    public_folder: ""
    extension: md
    format: yaml-frontmatter
```

| Option | Wert | Bedeutung |
| --- | --- | --- |
| `path` | `"{{slug}}/index"` | Datei = `…/<slug>/index.md` |
| `media_folder` | `""` (leer) | Medien **relativ zum Eintrag** |
| `public_folder` | `""` (leer) | Gespeicherter Pfad ebenfalls eintragsrelativ (für Astro `image()`) |

Ohne leeres `media_folder`/`public_folder` würden Uploads in den globalen Ordner wandern (Variante A / Fallback).

**Stand `pages`:** `path`, `media_folder: ""` und `public_folder: ""` sind bereits gesetzt. Bild-Felder kommen, sobald Seiten Bilder brauchen; bei **articles** (#4) ist das der Standardfall.

### Schritt 2 — Globalen Fallback behalten (optional, für geteilte Assets)

Oben in `config.yml` (bereits vorhanden):

```yaml
media_folder: src/assets
public_folder: /assets
```

Das ist der **gemeinsame Pool**, wenn eine Collection *keine* leeren `media_folder`/`public_folder` setzt — oder für Assets außerhalb der Eintragsordner. Für Variante-B-Collections überschreiben die leeren Collection-Werte diesen Fallback.

### Schritt 3 — Bildfelder im CMS

Pro gewünschtes Bild ein Widget, z. B.:

```yaml
- { name: heroImage, label: Titelbild, widget: image, required: false }
```

Im Markdown-Body können Redakteure ebenfalls Bilder einfügen; bei Variante B landen Uploads ebenfalls neben dem Eintrag.

### Schritt 4 — Astro Content Schema mit `image()`

In `src/content.config.ts` das Bildfeld über den Schema-Helfer `image` typisieren:

```ts
schema: ({ image }) =>
  z.object({
    title: z.string(),
    heroImage: image().optional(),
    // … weitere Felder
  }),
```

Voraussetzungen:

- Datei liegt unter `src/` (nicht nur unter `public/`)
- Pfad im Frontmatter ist relativ zur Entry-Datei (`hero.jpg` oder `./hero.jpg`)
- `output.omit_empty_optional_fields: true` in der CMS-Config bleibt an (bereits gesetzt) — sonst leere optionale Felder → Zod-Fehler

### Schritt 5 — In Layouts/Templates ausliefern

```astro
---
import { Image } from "astro:assets";
const { heroImage, title } = Astro.props.page.data;
---
{heroImage && <Image src={heroImage} alt={title} />}
```

Ohne `Image`/`getImage` entfällt die Optimierung — die Datei muss trotzdem korrekt referenziert sein.

### Schritt 6 — Smoke-Test

1. `npm run dev` → `/admin/` → einloggen (PAT).
2. Eintrag anlegen/öffnen, Bild hochladen, speichern.
3. Im Repo prüfen:

   ```text
   src/content/<collection>/<slug>/
     index.md      # enthält z. B. heroImage: hero.jpg
     hero.jpg
   ```

4. Seite lokal öffnen — Bild sichtbar, Build ohne Schema-Fehler (`npm run build`).
5. Nach Push auf `main`: Cloudflare-Deploy prüfen.

---

## Gemeinsamer Medienpool (ergänzend zu B)

| Nutzung | Ablage |
| --- | --- |
| Bild nur für diesen Eintrag | neben `index.md` (Variante B) |
| Logo, Icons, wiederkehrende Motive | z. B. `src/assets/` (globaler `media_folder`) |

Eintragsbilder aus Variante B sind in anderen Einträgen **nicht** automatisch als „alle Assets“ wählbar — sie gehören zum jeweiligen Ordner. Geteilte Dateien bewusst unter `src/assets/` ablegen.

**Keine Asset-Beschreibung in der Mediathek:** Sveltia speichert am Bild selbst keine editierbare Beschreibung/Attribution (nur abgeleitete Infos wie Größe, Nutzung). Bildnachweise gehören in Eintragsfelder — für Seitenhintergründe: `backgroundAttribution` (siehe [CMS-Felder](../cms-fields/README.md)).

## Checkliste Variante B

| Schritt | Status / Ort |
| --- | --- |
| Collection mit `path: "{{slug}}/index"` | `pages` erledigt; `articles` bei #4 |
| `media_folder` / `public_folder`: `""` | `pages` erledigt |
| Globaler Fallback `src/assets` | in `config.yml` |
| `omit_empty_optional_fields: true` | in `config.yml` |
| Image-Widget + Astro `image()` + `<Image>` | noch ausarbeiten (vor allem `articles`) |

Referenz: [Sveltia — Internal Media Storage](https://sveltiacms.app/en/docs/media/internal), [Sveltia + Astro](https://sveltiacms.app/en/docs/frameworks/astro).
