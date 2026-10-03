# Sveltia-Zugang über Cloudflare Worker (OAuth)

Statt Personal Access Token: Login mit **„Login with GitHub“** über den offiziellen OAuth-Client **[sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)** als **Cloudflare Worker**.

Die Website selbst bleibt auf **Cloudflare Pages** (statisch). Der Worker ist nur der Auth-Proxy zwischen Browser, GitHub und Sveltia.

```text
Browser → https://hautoo.storyofai.net/admin/
       → „Login with GitHub“
       → Cloudflare Worker (sveltia-cms-auth)
       → GitHub OAuth App (Authorize)
       → zurück zum Admin → Zugriff auf Repo platomat/hautoo
```

Zurück zur [Sveltia-Übersicht](./README.md). PAT-Variante (einfacher Start): [Zugang / Cloudflare (PAT)](./zugang-cloudflare.md).

> **Hinweis von Sveltia:** Für Solo/technisch versierte Nutzer reicht oft der [PAT](./zugang-cloudflare.md). Worker/OAuth lohnt vor allem, wenn **nicht-technische** Redakteure sich ohne Token-Paste anmelden sollen.

---

## Voraussetzungen

1. Site über Pages erreichbar, `/admin/` lädt ([Pages-Go-Live](../cloudflare/README.md), [PAT-Doku Schritt 1](./zugang-cloudflare.md#schritt-1--site-online-pages)).
2. Cloudflare-Account (derselbe wie für `storyofai.net` / Pages ist sinnvoll).
3. Rechte, auf GitHub eine **OAuth App** anzulegen (persönlich oder unter der Org).

---

## Schritt 1 — Worker deployen (`sveltia-cms-auth`)

1. Repo öffnen: [github.com/sveltia/sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth).
2. Im README den Button **Deploy to Cloudflare Workers** nutzen  
   (oder Repo klonen und lokal `wrangler deploy`).
3. Im Cloudflare-Dashboard den Worker öffnen (typischer Name: `sveltia-cms-auth`).
4. Worker-URL notieren, z. B.:

   `https://sveltia-cms-auth.<dein-subdomain>.workers.dev`

   Diese URL brauchst du für Callback und für `base_url` in der CMS-Config — **ohne** Pfad `/callback`.

---

## Schritt 2 — GitHub OAuth App anlegen

1. GitHub → [New OAuth App](https://github.com/settings/applications/new)  
   (bei Org: Organization → Settings → Developer settings → OAuth Apps).
2. Felder:

   | Feld | Wert |
   | --- | --- |
   | **Application name** | z. B. `hautuu Sveltia CMS` |
   | **Homepage URL** | `https://hautoo.storyofai.net` (oder das Auth-Repo) |
   | **Authorization callback URL** | `<DEINE_WORKER_URL>/callback` |

   Beispiel Callback:  
   `https://sveltia-cms-auth.<dein-subdomain>.workers.dev/callback`

3. App speichern → **Generate a new client secret**.
4. **Client ID** und **Client Secret** kopieren (Secret nur einmal sichtbar).

> Client Secret ist ein **Secret** — nur in die Worker-Variablen, nie ins Repo / Issues / `config.yml`. Siehe [Sicherheit](../sicherheit/README.md).

Schreibrecht am Repo `platomat/hautoo` brauchen die Redakteure weiterhin (GitHub-Rolle Write o. ä.) — OAuth ersetzt die Repo-Berechtigung nicht.

---

## Schritt 3 — Worker-Umgebungsvariablen setzen

Im Cloudflare-Dashboard: Worker `sveltia-cms-auth` → **Settings** → **Variables** (bzw. Variables and Secrets):

| Variable | Wert | Hinweis |
| --- | --- | --- |
| `GITHUB_CLIENT_ID` | Client ID aus Schritt 2 | |
| `GITHUB_CLIENT_SECRET` | Client Secret aus Schritt 2 | als **Secret** / Encrypt |
| `ALLOWED_DOMAINS` | siehe unten | stark empfohlen |

Optional: `GITHUB_HOSTNAME` nur bei GitHub Enterprise Server (Standard: `github.com`).

### `ALLOWED_DOMAINS` (empfohlen)

Verhindert, dass andere Websites deinen Worker missbrauchen. Für hautuu typisch:

```text
hautoo.storyofai.net, *.pages.dev
```

oder enger, wenn die Pages-Preview-URL bekannt ist:

```text
hautoo.storyofai.net, hautoo.pages.dev
```

Mehrere Hostnames komma-getrennt; `*.example.com` matcht Subdomains (nicht die Apex-Domain allein).

Danach **Save** / Worker erneut deployen, falls nötig.

---

## Schritt 4 — CMS-Config: `base_url` setzen

In `public/admin/config.yml` unter `backend` die Worker-URL eintragen (**ohne** `/callback`):

```yaml
backend:
  name: github
  repo: platomat/hautoo
  branch: main
  base_url: https://sveltia-cms-auth.<dein-subdomain>.workers.dev
```

Committen und pushen → Cloudflare Pages deployed die neue Config.  
Lokal: nach dem Deploy der Config (bzw. mit lokal geänderter `config.yml`) `/admin/` neu laden.

---

## Schritt 5 — Login prüfen

1. `https://hautoo.storyofai.net/admin/` öffnen.
2. **Login with GitHub** (nicht „Sign In with Token“).
3. Bei GitHub autorisieren.
4. Zurück im CMS: Collections sichtbar, Speichern erzeugt Commit auf `main`.

### Typische Fehler

| Symptom | Prüfen |
| --- | --- |
| Redirect-Fehler / bad redirect_uri | Callback-URL in der OAuth App exakt `…/callback`? |
| Login bricht ab / Domain-Fehler | `ALLOWED_DOMAINS` enthält den Hostname, von dem `/admin/` geladen wird? |
| Speichern scheitert | GitHub-User hat Schreibrecht auf `platomat/hautoo`? |
| Weiterhin nur Token-Login | `base_url` deployed? Richtige Worker-URL (ohne Trailing Slash / ohne `/callback`)? |

---

## PAT vs. Worker — wann was?

| | PAT | Worker (OAuth) |
| --- | --- | --- |
| Setup | schnell | Worker + OAuth App + Secrets |
| Login | Token einfügen | Klick „Login with GitHub“ |
| Secrets | im Browser (Local Storage) | Client Secret nur im Worker |
| Geeignet für | Solo / Technik | mehrere / nicht-technische Redakteure |
| Website-Hosting | Pages | Pages (unverändert) |

Beide Wege können parallel existieren; mit gesetztem `base_url` ist OAuth der vorgesehene Button-Login. PAT bleibt in Sveltia oft zusätzlich wählbar.

---

## Checkliste Worker-Auth

- [ ] Worker `sveltia-cms-auth` deployed, URL notiert
- [ ] GitHub OAuth App mit Callback `<WORKER_URL>/callback`
- [ ] Worker-Variablen: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (encrypted)
- [ ] `ALLOWED_DOMAINS` enthält `hautoo.storyofai.net` (und ggf. Pages-Host)
- [ ] `backend.base_url` in `public/admin/config.yml` = Worker-URL (ohne `/callback`)
- [ ] Config deployed; Login with GitHub funktioniert
- [ ] Test-Commit aus dem CMS auf `main` sichtbar

Offizielle Quelle: [sveltia/sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth), [GitHub Backend — Authorization Code Flow](https://sveltiacms.app/en/docs/backends/github).
