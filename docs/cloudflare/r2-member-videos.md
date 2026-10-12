# Geschützte Member-Videos (privates R2 + Zugangscode)

Öffentliche R2-Videos (`VideoEmbed` / `provider="file"`) bleiben unverändert. Für Inhalte nur mit persönlichem Code: **privater** R2-Bucket, Cloudflare Worker, Codes als Hash in KV.

Wer die öffentliche Doku und den Worker-Code liest, kann **ohne gültigen Code weder Token noch Stream** bekommen. Klartext-Codes und `SIGNING_SECRET` gehören nicht ins Repo.

## Überblick

```text
Privates R2  ←  Worker (unlock / sign / play)  ←  MemberVideo im Browser
                     ↑
              KV: sha256(code) → { active, label }
```

| Was | Wo |
| --- | --- |
| Worker | `workers/video-access/` (gleiches Repo, eigenes Deploy) |
| Komponente | `src/components/MemberVideo.astro` |
| Embed | `{{member-video src="datei.mp4" title="…" }}` |
| CMS | Toolbar **Member-Video (Code)** |
| Worker-URL | Content → Medien → `videoAccessWorkerUrl` |
| Session | `localStorage`: `hautuu-member-video-token` (Session-Token, nicht der Klartext-Code) |

Ein Token gilt **site-weit für alle Member-Videos** im Browser. Jede Person bekommt einen **eigenen** Code (Hash in KV).

## Warum Worker im gleichen Repo?

Ein Ordner `workers/video-access/` reicht: gemeinsames Git, getrennte Deployments (Pages vs. Worker). Zweites Repo nur nötig, wenn andere Rechte/Teams den Worker getrennt versionieren sollen. Standard hier: **ein Repo**.

## Setup (Kurz)

1. Privaten R2-Bucket anlegen (keine öffentliche Custom Domain).
2. KV-Namespace für Code-Hashes.
3. Bindings + `ALLOWED_ORIGINS` in `workers/video-access/wrangler.toml`.
4. `npx wrangler secret put SIGNING_SECRET`
5. `npm install && npm run deploy` im Worker-Ordner.
6. Worker-URL in `content.media.videoAccessWorkerUrl` setzen.
7. Codes: `npm run hash-code -- --generate` → Klartext an User, Hash in KV.

Details: [workers/video-access/README.md](../../workers/video-access/README.md).

## Einbinden

```markdown
{{member-video src="mitglieder/folge-010.mp4" title="Folge 010" poster="/assets/poster.webp"}}
```

`src` ist der **Objekt-Key im privaten Bucket**, nicht die öffentliche `media.`-URL.

## Abgrenzung zu öffentlichen Videos

| | Öffentlich (`file`) | Member |
| --- | --- | --- |
| Bucket | öffentlich / Custom Domain | privat |
| Embed | `{{video provider="file" …}}` | `{{member-video …}}` |
| Config | `videoBaseUrl` | `videoAccessWorkerUrl` |
| Zugang | jeder mit URL | persönlicher Code |

## Datenschutz

Kurz auf der Datenschutzerklärung: Freischaltung speichert ein Session-Token in **localStorage**; Abruf läuft über den eigenen Worker/Cloudflare. Kein YouTube/Vimeo-Consent nötig.

## Checkliste

- [ ] Privater Bucket + KV + Worker deployed, Secret gesetzt
- [ ] `videoAccessWorkerUrl` in Content → Medien
- [ ] Test-Code in KV, Klartext nicht committed
- [ ] Embed im Artikel, Freischaltung + zweites Video ohne erneute Code-Eingabe
- [ ] Datenschutz-Absatz geprüft
