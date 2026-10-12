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
| Worker-Name | `hautoo-member-media-access` (Cloudflare) |
| Worker-Code | `workers/media-access/` (gleiches Repo, eigenes Deploy) |
| Komponente | `src/components/MemberVideo.astro` |
| Embed | `{{member-video src="datei.mp4" title="…" }}` |
| CMS | Toolbar **Member-Video (Code)** |
| Worker-URL | Content → Medien → `videoAccessWorkerUrl` |
| Session | `localStorage`: `hautuu-member-video-token` (Session-Token, nicht der Klartext-Code) |

Ein Token gilt **site-weit für alle Member-Videos** im Browser. Jede Person bekommt einen **eigenen** Code (Hash in KV).

## Wer hat welchen Code?

Der Worker speichert **keine** Personenliste und **keinen** Klartext-Code. In KV liegt nur:

- **Key:** SHA-256-Hash des Codes  
- **Value:** z. B. `{"active":true,"label":"anna-mueller","createdAt":"2026-04-09"}`

`label` ist frei wählbar (interne Notiz, Kundenkürzel, E-Mail-Kürzel). Darüber kannst du später sperren oder zuordnen, **ohne** den Klartext in KV zu halten.

Zusätzlich brauchst du intern eine eigene Übersicht (Tabelle, Passwortmanager-Notiz, CRM), mindestens:

| Person / Kanal | Klartext-Code (nur bei dir / beim Empfänger) | KV-label | ausgegeben am |
| --- | --- | --- | --- |

Den Klartext nach dem Versand idealerweise nur noch beim Empfänger belassen und bei dir nur Hash + Label + Person notieren. Ohne solche Liste kannst du aus KV allein nicht rekonstruieren, wem welcher Code gehört (außer du hast `label` sinnvoll gesetzt).

## Warum Worker im gleichen Repo?

Ein Ordner `workers/media-access/` reicht: gemeinsames Git, getrennte Deployments (Pages vs. Worker). Zweites Repo nur nötig, wenn andere Rechte/Teams den Worker getrennt versionieren sollen. Standard hier: **ein Repo**.

## Setup (Kurz)

1. Privaten R2-Bucket anlegen (keine öffentliche Custom Domain).
2. KV-Namespace für Code-Hashes.
3. Bindings + `ALLOWED_ORIGINS` in `workers/media-access/wrangler.toml`.
4. `npx wrangler secret put SIGNING_SECRET`
5. `npm install && npm run deploy` im Worker-Ordner (Script-Name: `hautoo-member-media-access`).
6. Worker-URL in `content.media.videoAccessWorkerUrl` setzen (z. B. `https://hautoo-member-media-access.<account>.workers.dev`).
7. Codes: `npm run hash-code -- --generate` → Klartext an User, Hash + sinnvolles `label` in KV.

Details: [workers/media-access/README.md](../../workers/media-access/README.md).

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

- [ ] Privater Bucket + KV + Worker `hautoo-member-media-access` deployed, Secret gesetzt
- [ ] `videoAccessWorkerUrl` in Content → Medien
- [ ] Test-Code in KV mit `label`, Klartext nicht committed
- [ ] Interne Zuordnung Person ↔ Label (ggf. Klartext) geführt
- [ ] Embed im Artikel, Freischaltung + zweites Video ohne erneute Code-Eingabe
- [ ] Datenschutz-Absatz geprüft
