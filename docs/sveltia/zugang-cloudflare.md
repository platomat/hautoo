# Sveltia auf Cloudflare zum Laufen bringen

Voraussetzung: Die Website ist über **Cloudflare Pages** deployed (siehe [Cloudflare](../cloudflare/README.md)). Das CMS ist keine Extra-App — Admin-UI unter `/admin/` (`src/pages/admin.html`) plus Config `public/admin/config.yml`.

```text
Browser → https://hautoo.storyofai.net/admin/
       → Sveltia (JS) + config.yml
       → Login mit GitHub-PAT
       → schreibt Dateien ins Repo platomat/hautoo (Branch main)
       → Cloudflare Pages Build → Live-Site aktualisiert
```

Zurück zur [Sveltia-Übersicht](./README.md).

---

## Schritt 1 — Site online (Pages)

1. Cloudflare Pages mit Repo `platomat/hautoo` verbinden und bauen ([Anleitung](../cloudflare/README.md)).
2. Prüfen, dass die Admin-UI erreichbar ist:
   - `https://hautoo.storyofai.net/admin/`
   - oder vor der Custom Domain: `https://<project>.pages.dev/admin/`
3. Erwartet: Login-Bildschirm von Sveltia (noch ohne Inhaltspflege).  
   Fehlt `/admin/`: Build prüfen — Route `src/pages/admin.html` und `public/admin/config.yml` müssen ausgeliefert werden.

Keine Cloudflare-Sonderkonfiguration für Sveltia nötig (kein Worker, kein `base_url` in der Config — solange PAT genutzt wird).

## Schritt 2 — GitHub-Rechte

Dein GitHub-Konto braucht **Schreibzugriff** auf [`platomat/hautoo`](https://github.com/platomat/hautoo/) (Rolle Write, Maintain oder Admin). Nur Lesen → Login/Speichern scheitert.

## Schritt 3 — Personal Access Token (PAT) erzeugen

1. Admin öffnen: `https://hautoo.storyofai.net/admin/`
2. **Sign In with Token** / „Mit Token anmelden“ wählen.
3. Dem Link im Dialog folgen (GitHub öffnet die Token-Seite mit passenden Voreinstellungen), **oder** manuell:
   - GitHub → **Settings** → **Developer settings** → **Personal access tokens**
   - Empfohlen: **Fine-grained token**
   - Repository access: nur `platomat/hautoo`
   - Permissions:

     | Permission | Zugriff | Wofür |
     | --- | --- | --- |
     | **Contents** | Read and write | Inhalte lesen und committen |
     | **Pull requests** | Read and write | nur nötig, falls später Editorial Workflow |

   - Classic-Token-Alternative: Scope `repo` (umfasst das Nötige; breiter als fine-grained)
4. Token erzeugen, **einmalig kopieren** (wird nicht erneut angezeigt).
5. Token in den Sveltia-Dialog einfügen → anmelden.

Das Token liegt nur im **Local Storage des Browsers** — nicht im Repo, nicht in Cloudflare-Umgebungsvariablen.

> **Secret:** PAT niemals committen, nicht in Issues/Chats posten, nicht in `config.yml` eintragen. Siehe [Sicherheit](../sicherheit/README.md).

## Schritt 4 — Ersten Inhalt speichern und Deploy prüfen

1. Im CMS z. B. Collection **Seiten** öffnen, kleinen Text ändern, speichern.
2. Auf GitHub erscheint ein Commit auf `main` (Autor: dein GitHub-Konto).
3. Cloudflare Pages startet einen Build (Push auf `main`).
4. Nach erfolgreichem Deploy die Live-Seite prüfen.

Lokal zum Vergleich: `npm run dev` → `http://localhost:4321/admin/` — gleicher PAT-Login, schreibt ebenfalls gegen GitHub `main` (nicht gegen uncommittete lokale Dateien, solange der GitHub-Backend-Modus aktiv ist).

## Schritt 5 — Alltag & Token-Pflege

| Thema | Hinweis |
| --- | --- |
| Token abgelaufen | Neu erzeugen, im Admin erneut „Sign In with Token“ |
| Anderer Rechner / Browser | Erneut mit PAT anmelden |
| Mehrere Redakteure | Jede Person braucht Schreibrecht am Repo + eigenen PAT — oder später OAuth |
| `/admin/` öffentlich | Die UI-URL ist öffentlich; **ohne gültigen Token** keine Schreibzugriffe. Trotzdem: nur Vertrauenspersonen bekommen Tokens/Rechte |
| Site-Deploy | Speichern im CMS = Commit auf `main` = neuer Cloudflare-Build |

## Alternative: OAuth über Cloudflare Worker

Für „Login with GitHub“ ohne Token-Paste: eigener Worker ([sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)).  
Schritt-für-Schritt: **[Zugang über Cloudflare Worker (OAuth)](./zugang-worker.md)**.

## Checkliste CMS live (PAT)

- [ ] Cloudflare Pages Deploy läuft, Site unter `hautoo.storyofai.net` erreichbar
- [ ] `https://hautoo.storyofai.net/admin/` zeigt Sveltia-Login
- [ ] GitHub-Konto hat Schreibrecht auf `platomat/hautoo`
- [ ] PAT mit Contents Read/Write (fine-grained) erzeugt
- [ ] Login im Admin erfolgreich
- [ ] Test-Änderung speichert → Commit auf `main` → Cloudflare-Build → Inhalt live

Offizielle Referenzen: [Sveltia Getting Started](https://sveltiacms.app/en/docs/start), [GitHub Backend](https://sveltiacms.app/en/docs/backends/github).
