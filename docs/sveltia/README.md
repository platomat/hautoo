# Sveltia CMS

Sveltia ist das CMS, mit dem Redaktion Inhalte im Browser pflegen kann. Änderungen landen als Dateien im GitHub-Repository.

## Entscheidungen (Stand)

| Thema | Entscheidung |
| --- | --- |
| Auth | Zuerst **PAT**; optional **OAuth** über Cloudflare Worker ([sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)) |
| Speichern | Direkt auf Branch `main` |
| Medien | **Neben dem Content** (Variante B) — [Anleitung](./medien-variante-b.md) |

Tracking: GitHub [#2](https://github.com/platomat/hautoo/issues/2) und Sub-Issues #3–#6.

## Inhaltsverzeichnis (dieser Ordner)

| Dokument | Inhalt |
| --- | --- |
| [Zugang / Cloudflare (PAT)](./zugang-cloudflare.md) | Admin live schalten, Token, Speichern → Deploy |
| [Zugang / Worker (OAuth)](./zugang-worker.md) | „Login with GitHub“ über `sveltia-cms-auth` |
| [Medien — Variante B](./medien-variante-b.md) | Bilder neben dem Eintrag, CMS- + Astro-Schritte |
| [Collections](./collections.md) | `pages`, `menus` (umgesetzt); geplant `articles` / `tags` / `glossar` |

Verwandt: [CMS Fields (DRY)](../cms-fields/README.md), [Inhalte](../inhalte/README.md), [Cloudflare](../cloudflare/README.md).

## Admin-Zugang (Kurz)

| | |
| --- | --- |
| UI (Produktion) | `https://hautoo.storyofai.net/admin/` |
| UI (lokal) | `http://localhost:4321/admin/` |
| Admin-Shell | `src/pages/admin.html` (Astro-Route — nötig, weil `/admin/` sonst vom Catch-All `404` wird) |
| Config | `public/admin/config.yml` |
| Auth (Start) | **GitHub PAT** — [Schritte](./zugang-cloudflare.md) |
| Auth (optional) | **OAuth** via Cloudflare Worker — [Schritte](./zugang-worker.md) |
| Speichern | Branch `main` → Cloudflare Pages baut neu |

## Sicherheit

- **PAT** und spätere OAuth-Secrets: nie ins Repo, nie in die öffentliche `config.yml`
- Token nur im Browser (Local Storage) bzw. später im Worker-Dashboard
- Details: [Sicherheit](../sicherheit/README.md)

## Noch auszuarbeiten

- Collection #6 `glossar`
- Erste echte Bild-Pipeline in Templates (`<Image />`)
- Worker optional live schalten (`base_url` in `config.yml`, wenn OAuth gewünscht)
