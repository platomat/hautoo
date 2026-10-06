# UI-Wortlaut in Inhalten

Englische **Menü-, Button- und Feldnamen** aus Software-Oberflächen nicht fett setzen. Stattdessen:

1. **Erstes Vorkommen pro Datei:** deutsche Anführungszeichen „…“ mit englischem UI-Original und kurzer deutscher Bedeutung in Klammern, z. B. „Open Folder“ (Ordner öffnen).
2. **Weitere Vorkommen** derselben Zeichenkette in derselben Datei: nur „…“ ohne erneute Übersetzung, sofern der Kontext klar bleibt.
3. **Deutsche UI** oder **deutsche Betonung** im Fließtext weiterhin mit **Fett** (z. B. **geöffnete Projektordner**, **Trennlinie** in unserem CMS).
4. **Produktnamen** (Cursor, OBS Studio, Firefox) normal schreiben, nicht als Menülabel formatieren.
5. **Pfade und Code** in Backticks (`main`, `/admin/`, `npm run dev`).

Unsichere oder nicht gegen Live-UI geprüfte Strings in [`tmp/ui-unverified.txt`](../../tmp/ui-unverified.txt) notieren.

## Verifizierte UI-Strings (hautuu-Stack)

| UI (Original) | Deutsch (Erklärung) | Quelle |
| --- | --- | --- |
| File | Datei | [VS Code: User interface](https://code.visualstudio.com/docs/getstarted/userinterface) |
| Open Folder | Ordner öffnen | [VS Code: Workspaces](https://code.visualstudio.com/docs/editor/workspaces) |
| Add Folder to Workspace… | Ordner zum Arbeitsbereich hinzufügen | [VS Code: Multi-root workspaces](https://code.visualstudio.com/docs/editor/multi-root-workspaces) |
| Remove Folder from Workspace | Ordner aus Arbeitsbereich entfernen | [VS Code: Multi-root workspaces](https://code.visualstudio.com/docs/editor/multi-root-workspaces) |
| Ask / Agent / Plan | Ask / Agent / Plan (Cursor-Modi) | [Folge 008](https://hautoo.storyofai.net/artikel/folge-008-cursor-modi/), Cursor-Oberfläche |
| Custom domains | Eigene Domains | [Cloudflare Pages: Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/), [docs/cloudflare/README.md](../cloudflare/README.md) |
| Retry | Erneut versuchen | [Folge 014](https://hautoo.storyofai.net/artikel/folge-014-sveltia-worker/), Cloudflare Pages Deployments |
| Link-Vorschau (DE) / Preview Link (EN) | Link-Vorschau | [Mozilla: Link Previews](https://support.mozilla.org/kb/use-link-previews-firefox), [Folge 020](https://hautoo.storyofai.net/artikel/folge-020-bausteine-fork/) |
| Start Recording / Stop Recording | Aufnahme starten / Aufnahme stoppen | [OBS Studio](https://obsproject.com/) (Steuerleiste; Sprache kann abweichen) |
| Konfiguration, Seiten, Artikel, Glossar, Bausteine, Menüs | (deutsche CMS-Labels) | [`public/admin/config.yml`](https://github.com/platomat/hautoo/blob/main/public/admin/config.yml) |
| Design, Content, Inhaltsverzeichnis (TOC), Header | Design, Inhalt, TOC, Header | [`public/admin/config.yml`](https://github.com/platomat/hautoo/blob/main/public/admin/config.yml) (`site.yaml`-Editor) |
| Baustein, Trennlinie, Repo-Dokument, Artikel-Listing, … | (deutsche Toolbar-Labels) | [`public/admin/editor-components.js`](https://github.com/platomat/hautoo/blob/main/public/admin/editor-components.js) |
| Only select repositories | Nur ausgewählte Repositories | [GitHub App install](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party) |
| All repositories | Alle Repositories | [GitHub App install](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party) |
| Public | Öffentlich (Sichtbarkeit) | [Creating a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository) |
| Code | Code kopieren (Repo-URL) | GitHub Repo-Seite |
| New repository | Neues Repository | [Creating a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository) |
| Milestone / Labels | Meilenstein / Labels | GitHub Issue-Formular |
| Source Control / Pull | Quellcode-Verwaltung / Pull | [VS Code: Source Control](https://code.visualstudio.com/docs/sourcecontrol/overview) |
| Save Workspace As… | Arbeitsbereich speichern | [VS Code: Workspaces](https://code.visualstudio.com/docs/editor/workspaces) |
| Contents: Read and write | Inhalte: Lesen und Schreiben | [GitHub PAT docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) |
