#!/usr/bin/env python3
"""Insert {{repodoc …}} markers into article bodies (issue #27)."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTICLES = ROOT / "src" / "content" / "articles"

# (unique anchor substring in body, embed line to insert BEFORE anchor — actually AFTER anchor)
# We insert immediately after the anchor line/paragraph.
INSERTS: dict[str, list[tuple[str, str]]] = {
    "folge-001-hautuu-intro": [
        (
            "Kurz die Wörter:",
            '\n\n{{repodoc path="docs/github/README.md" title="GitHub" description="Repository, Remote und Zusammenarbeit im Überblick der Doku."}}\n',
        ),
        (
            "## Cursor: Ordner auf, Agent an",
            '\n\n{{repodoc path="docs/cursor/README.md" title="Cursor (KI)" description="IDE, Agenten und typische Workflows im Projekt."}}\n',
        ),
    ],
    "folge-002-github-issues": [
        (
            "Sveltia und PAT/Login: [Folge 013](/artikel/folge-013-sveltia-pat/).",
            '\n\n{{repodoc path="docs/konzept/README.md" title="Konzept" description="Ziele, Stack und wie die Teile zusammenspielen."}}\n',
        ),
        (
            "## Issues klein schneiden",
            '\n{{repodoc path="docs/github/README.md" title="GitHub" description="Issues, Meilensteine und Pull Requests in der Projekt-Doku."}}\n\n',
        ),
    ],
    "folge-003-erstes-design": [
        (
            "## Seiten, Menü, Footer",
            '\n{{repodoc path="docs/design/README.md" title="Design & Erscheinungsbild" description="Tokens, Breakpoints und Layout-Regeln im Repo."}}\n\n',
        ),
    ],
    "folge-004-collection-pages": [
        (
            "## SEO: einmal definieren",
            '\n\n{{repodoc path="docs/cms-fields/README.md" title="CMS field partials (DRY)" description="SEO-Objekt, Hintergrund und Embeds in der Config."}}\n',
        ),
        (
            "gleiche Git-**History**.",
            '\n\n{{repodoc path="docs/sveltia/collections.md" title="Collections (Sveltia)" description="Alle Content-Typen und CMS-Felder im Detail."}}\n',
        ),
    ],
    "folge-005-astro-toolbar": [
        (
            "## Breakpoints: einmal festlegen, überall nutzen",
            '\n{{repodoc path="docs/design/README.md" title="Design & Erscheinungsbild" description="Breakpoints und Flex-Hilfsklassen nachschlagen."}}\n\n',
        ),
        (
            "Mit [`npm run dev`](/glossar/npm/) klebt oft die **Astro-Dev-Toolbar**",
            '\n\n{{repodoc path="docs/astro/README.md" title="Astro" description="Build, Dev-Server und Projektstruktur in der Doku."}}\n',
        ),
    ],
    "folge-006-git-push-pull": [
        (
            "## Zwei Ordner, eine Wahrheit",
            '\n{{repodoc path="docs/github/README.md" title="GitHub" description="Push, Pull und Branch-Logik im Projekt."}}\n\n',
        ),
    ],
    "folge-007-merge-rebase": [
        (
            "Mit KI-Agent reicht Merge",
            '\n\n{{repodoc path="docs/github/README.md" title="GitHub" description="Merge, Historie und Zusammenarbeit auf GitHub."}}\n',
        ),
    ],
    "folge-008-cursor-modi": [
        (
            "## Drei Modi, drei Temperamentstufen",
            '\n{{repodoc path="docs/cursor/README.md" title="Cursor (KI)" description="Modi, Agenten und Grenzen in der Cursor-Doku."}}\n\n',
        ),
    ],
    "folge-009-cursor-abo": [
        (
            "## On-Demand: Finger weg, wenn’s geht",
            '\n\n{{repodoc path="docs/cursor/README.md" title="Cursor (KI)" description="Abo, Usage und Kosten im Überblick."}}\n',
        ),
    ],
    "folge-010-cursor-chats": [
        (
            "Gleicher Trick wie mit zwei Spezial-Agenten",
            '\n\n{{repodoc path="docs/cursor/README.md" title="Cursor (KI)" description="Chats, Rollen und saubere Trennung von Aufgaben."}}\n',
        ),
    ],
    "folge-011-cloudflare-setup": [
        (
            "Push auf **[`main`](/glossar/main/)** = Production",
            '\n\n{{repodoc path="docs/cloudflare/README.md" title="Cloudflare — Website online bringen" description="Pages, Deployments und Domain in der Doku."}}\n',
        ),
        (
            "Erst **Build**, dann [**Deploy**](/glossar/deploy/).",
            '\n\n{{repodoc path="docs/sveltia/zugang-cloudflare.md" title="Sveltia auf Cloudflare" description="CMS-Zugang nach dem Livegang einrichten."}}\n',
        ),
    ],
    "folge-012-cloudflare-branches": [
        (
            "Kein FTP.",
            '\n\n{{repodoc path="docs/cloudflare/README.md" title="Cloudflare — Website online bringen" description="Preview-Deployments und Production im Repo nachlesen."}}\n',
        ),
    ],
    "folge-013-sveltia-pat": [
        (
            "**Token = Passwort.**",
            '\n\n{{repodoc path="docs/sicherheit/README.md" title="Sicherheit & Secrets" description="PAT, ENV und was nicht ins Repo gehört."}}\n',
        ),
        (
            "## Was beim Speichern passiert",
            '\n{{repodoc path="docs/sveltia/README.md" title="Sveltia CMS" description="Collections, /admin und Git als Speicher."}}\n\n',
        ),
    ],
    "folge-014-sveltia-worker": [
        (
            "Der Worker ist **nicht** deine Website",
            '\n\n{{repodoc path="docs/sveltia/zugang-worker.md" title="Sveltia-Zugang über Cloudflare Worker" description="OAuth, Callback und Secrets Schritt für Schritt."}}\n',
        ),
    ],
    "folge-015-transkript-artikel": [
        (
            "Status **veröffentlicht** vs. Entwurf",
            '\n\n{{repodoc path="docs/redaktion/README.md" title="Redaktion (Artikel, Glossar, FAQ)" description="Schema, Stil und Checkliste für neue Inhalte."}}\n',
        ),
        (
            "Credits für Bilder",
            '\n\n{{repodoc path="docs/inhalte/README.md" title="Inhalte der Website" description="Collections, Medienablage und Embeds."}}\n',
        ),
    ],
    "folge-016-artikel-pull-request": [
        (
            "**CI**: z. B. [`npm run build`](/glossar/build/)",
            '\n\n{{repodoc path="docs/entwicklung/README.md" title="Lokale Entwicklung" description="Build, Tests und typischer PR-Ablauf lokal."}}\n',
        ),
    ],
    "folge-017-github-ssh": [
        (
            "Der Public Key verschlüsselt nur für dich",
            '\n\n{{repodoc path="docs/github/README.md" title="GitHub" description="SSH, Clone und Zugriff auf private Repos."}}\n',
        ),
    ],
    "folge-018-node-npm": [
        (
            "damit `npm run dev` und `npm run build` laufen.",
            '\n\n{{repodoc path="docs/astro/README.md" title="Astro" description="Framework, Build-Befehle und Ausgabeordner."}}\n\n{{repodoc path="docs/entwicklung/README.md" title="Lokale Entwicklung" description="Node, npm und Dev-Server im Projekt."}}\n',
        ),
    ],
    "folge-019-impressum-komponenten": [
        (
            "Baustein `{{contact-email}}`",
            '\n\n{{repodoc path="docs/cms-fields/README.md" title="CMS field partials (DRY)" description="Embeds, Kontakt-E-Mail und SEO-Felder."}}\n',
        ),
        (
            "## E-Mail schützen",
            '\n\n{{repodoc path="docs/sicherheit/README.md" title="Sicherheit & Secrets" description="Kontakt per ENV statt Klartext im Repo."}}\n',
        ),
    ],
    "folge-020-bausteine-fork": [
        (
            "Weitere Bausteine sind z. B.",
            '\n\n{{repodoc path="docs/sveltia/collections.md" title="Collections (Sveltia)" description="Bausteine, Pages und alle CMS-Collections."}}\n',
        ),
        (
            "## Fork statt nur klonen",
            '\n{{repodoc path="docs/inhalte/README.md" title="Inhalte der Website" description="Struktur der Collections und Medienablage."}}\n\n',
        ),
    ],
}


def is_unsafe_insert_point(body: str, end: int) -> str | None:
    """Return error message if inserting at `end` would split Markdown or prose."""
    after = body[end:]
    if re.match(r"\s*\]\(", after):
        return "insert point is before ](url) of a Markdown link"
    line_start = body.rfind("\n", 0, end) + 1
    line_prefix = body[line_start:end]
    if re.search(r"\[[^\]]*$", line_prefix):
        return "insert point is inside Markdown link text ([ without ])"
    if re.match(r"\s*[\)\w]", after) and re.search(
        r"\([^)\n]*$", body[max(0, end - 120) : end]
    ):
        return "insert point may split parenthetical link or sentence"
    return None


def insert_after(body: str, anchor: str, snippet: str) -> str:
    if snippet.strip() in body:
        return body
    idx = body.find(anchor)
    if idx < 0:
        raise ValueError(f"Anchor not found: {anchor[:60]}…")
    end = idx + len(anchor)
    unsafe = is_unsafe_insert_point(body, end)
    if unsafe:
        raise ValueError(f"Unsafe anchor «{anchor[:50]}…»: {unsafe}")
    return body[:end] + snippet + body[end:]


def main() -> None:
    for slug, pairs in INSERTS.items():
        path = ARTICLES / slug / "index.md"
        text = path.read_text(encoding="utf-8")
        if not text.startswith("---"):
            raise ValueError(f"No frontmatter: {path}")
        parts = text.split("---", 2)
        body = parts[2]
        for anchor, snippet in pairs:
            body = insert_after(body, anchor, snippet)
        path.write_text(f"---{parts[1]}---{body}", encoding="utf-8")
        print(slug, len(pairs))


if __name__ == "__main__":
    main()
