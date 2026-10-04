#!/usr/bin/env python3
"""One-off helper for issue #19: set SEO fields in content frontmatter."""

from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "src" / "content"

ARTICLE_SEO: dict[str, dict[str, str]] = {
    "folge-001-hautuu-intro": {
        "seo_title": "Folge 001: Leeres Repo, voller Plan, so startet hautuu",
        "seo_description": "Du legst GitHub an, holst das Projekt lokal und erklärst Cursor dein Ziel in normaler Sprache. Folge 001 zeigt den Einstiegsablauf für hautuu.",
    },
    "folge-002-github-issues": {
        "seo_title": "Folge 002: Issues statt Chaos: So behältst du die KI auf Kurs",
        "seo_description": "GitHub Issues, Meilensteine und das Zusammenspiel von Cursor, GitHub und Cloudflare. So gibst du der KI klare Tickets statt jeden Tag alles neu zu erklären.",
    },
    "folge-003-erstes-design": {
        "seo_title": "Folge 003: Erstes Outfit: Ubuntu, Dark Mode und ein Footer, der nicht nervt",
        "seo_description": "Schrift, Farben und Breakpoints für hautuu festlegen. Plus die Regel: lokal committen ja, pushen nur wenn du es wirklich willst. Design Folge 003 Schritt für Schritt.",
    },
    "folge-004-collection-pages": {
        "seo_title": "Folge 004: Seiten sind nur Dateien und trotzdem schlau strukturiert",
        "seo_description": "Pages als Markdown, Collections in Astro und SEO Felder einmal zentral pflegen. Folge 004 erklärt die CMS Struktur von hautuu für Einsteiger.",
    },
    "folge-005-astro-toolbar": {
        "seo_title": "Folge 005: Die Astro-Leiste nervt? Breakpoints retten den Tag",
        "seo_description": "Die Astro Dev Toolbar lokal verstehen und mit Breakpoints Layout Probleme finden. Folge 005: Footer Abstand und Feintuning ohne CSS Profi zu sein.",
    },
    "folge-006-git-push-pull": {
        "seo_title": "Folge 006: Zwei Ordner, ein GitHub: Pull, Push und kein Datenmüll",
        "seo_description": "Warum Push manchmal abgelehnt wird und wie Pull, Clone und Merge dich wieder auf einen Stand bringen. Git Alltag mit zwei Projektordnern in Folge 006.",
    },
    "folge-007-merge-rebase": {
        "seo_title": "Folge 007: Merge oder Rebase: Warum die Historie manchmal lügt",
        "seo_description": "Nach Merge oder Rebase wirkt die Historie im Tool oft leer, auf GitHub liegt trotzdem alles. Folge 007 erklärt den Unterschied ohne Git Guru Werbung.",
    },
    "folge-008-cursor-modi": {
        "seo_title": "Folge 008: Ask, Agent, Plan: Wann die KI nur reden darf",
        "seo_description": "Cursor Modi Ask, Agent und Plan: wann die KI nur antwortet und wann sie Dateien ändert. Folge 008 hilft dir, Chats und Repo sauber zu trennen.",
    },
    "folge-009-cursor-abo": {
        "seo_title": "Folge 009: Cursor-Abo: Balken, Tokens und warum On-Demand bösartig teuer ist",
        "seo_description": "Cursor Usage verstehen: Token Verbrauch, Auto Modus und wann ein Upgrade sinnvoller ist als On Demand. Folge 009 zu Kosten und Kontrolle beim KI Coding.",
    },
    "folge-010-cursor-chats": {
        "seo_title": "Folge 010: Zwei Chats, zwei Rollen: Erst meckern, dann fixen",
        "seo_description": "Zwei Cursor Chats mit klaren Rollen: einer findet Probleme, der andere setzt um. Folge 010 zeigt einen einfachen Workflow ohne Extra Bot.",
    },
    "folge-011-cloudflare-setup": {
        "seo_title": "Folge 011: Von GitHub ins Netz: Cloudflare Pages in echten Schritten",
        "seo_description": "Cloudflare Pages mit GitHub verbinden, Astro bauen lassen und an der Commit ID sehen, was live ist. Folge 011 führt dich Schritt für Schritt ins Netz.",
    },
    "folge-012-cloudflare-branches": {
        "seo_title": "Folge 012: Test-Zweig, geheime URL, Rollback (ohne die Live-Seite zu grillen)",
        "seo_description": "Am Branch testen, Preview Link teilen, mergen wenn es passt oder per Rollback zurück. Folge 012: sicher experimentieren ohne die Live Seite zu riskieren.",
    },
    "folge-013-sveltia-pat": {
        "seo_title": "Folge 013: /admin aufmachen: lokal ohne Passwort, online mit GitHub-Schlüssel",
        "seo_description": "Sveltia CMS lokal ohne Login und online mit GitHub Token. Folge 013 zeigt /admin, Speichern als Commit und warum dein Schlüssel wie ein Passwort ist.",
    },
    "folge-014-sveltia-worker": {
        "seo_title": "Folge 014: Lieber mit GitHub einloggen: Der Worker als Türsteher fürs CMS",
        "seo_description": "OAuth statt PAT Zettel: Cloudflare Worker als CMS Login, Secrets in Variables und Menüs im CMS. Folge 014 richtet GitHub Anmeldung für Sveltia ein.",
    },
    "folge-015-transkript-artikel": {
        "seo_title": "Folge 015: Transkript rein, Artikel raus: Screencast und Cloud Agent",
        "seo_description": "OBS Transkript und Cloud Agent: über Nacht Artikel aus Screencasts als Pull Request. Folge 015 beschreibt den Ablauf von Rohtext bis Review auf hautuu.",
    },
    "folge-016-artikel-pull-request": {
        "seo_title": "Folge 016: Vierzehn Artikel im PR: Preview, Merge und Listing-Kontrolle",
        "seo_description": "Großer PR mit Cloudflare Preview, grünen Checks und Merge auf main. Folge 016: Artikel Listing redaktionell steuern statt alles automatisch listen.",
    },
    "folge-017-github-ssh": {
        "seo_title": "Folge 017: Private Repos klonen: SSH-Schlüssel und GitHub",
        "seo_description": "Permission denied beim Clone? SSH Key erzeugen, in GitHub hinterlegen und private Repos sicher klonen. Folge 017 Schritt für Schritt für hautuu.",
    },
    "folge-018-node-npm": {
        "seo_title": "Folge 018: Node 22, npm install und npm run dev lokal",
        "seo_description": "Nach dem Clone Node 22 installieren, npm install und npm run dev für Astro lokal. Folge 018 bringt deine Entwicklungsumgebung zum Laufen.",
    },
    "folge-019-impressum-komponenten": {
        "seo_title": "Folge 019: Impressum, Datenschutz, ENV und CMS-Komponenten",
        "seo_description": "Rechtstexte mit dem Agenten, Kontakt E Mail als Secret, Separator und Artikel Listing im CMS. Folge 019 zu Legal Seiten und Komponenten auf hautuu.",
    },
    "folge-020-bausteine-fork": {
        "seo_title": "Folge 020: Bausteine, FAQ und hautoo forken",
        "seo_description": "CMS Bausteine statt Copy Paste, Glossar und FAQ im Überblick und hautuu per GitHub Fork als Vorlage. Folge 020 für Wiederverwendung und eigenes Projekt.",
    },
}

PAGE_SEO: dict[str, dict[str, str]] = {
    "index": {
        "seo_title": "hautuu: Website mit Cursor, GitHub und Cloudflare",
        "seo_description": "hautuu zeigt Schritt für Schritt, wie du mit Cursor, GitHub und Cloudflare eine schnelle Website baust. Open Source, Artikel, Glossar und FAQ für Einsteiger.",
    },
    "artikel": {
        "seo_title": "Artikel und How-tos",
        "seo_description": "Alle Folgen und Anleitungen von hautuu: von GitHub Setup über Cloudflare Pages bis Sveltia CMS. Finde die passende Episode für deinen nächsten Schritt.",
    },
    "faq": {
        "seo_title": "FAQ zu hautuu, Git, Cursor und Cloudflare",
        "seo_description": "Antworten auf häufige Fragen zu hautuu, Git, Cursor, Astro, Cloudflare und dem CMS. Kurz, verlinkt und per Strg+F durchsuchbar auf einer Seite.",
    },
    "glossar": {
        "seo_title": "Glossar: Begriffe zum hautuu Stack",
        "seo_description": "Kurze Erklärungen zu Git, GitHub, Astro, Cloudflare, Cursor und CMS Begriffen. Das hautuu Glossar hilft dir beim Lesen der Artikel und FAQ.",
    },
    "tags": {
        "seo_title": "Themen Tags der Artikel",
        "seo_description": "Stöbere hautuu Artikel nach Themen wie GitHub, Cloudflare oder Cursor. Jeder Tag zeigt passende Folgen und verlinkt zum Glossar, wenn es einen Eintrag gibt.",
    },
    "ueber-uns": {
        "seo_title": "Über hautuu",
        "seo_description": "Was hautuu ist, warum das Projekt öffentlich auf GitHub liegt und wie du mit den Artikeln deine eigene Site nachbauen kannst. Kurzvorstellung des Projekts.",
    },
    "impressum": {
        "seo_title": "Impressum",
        "seo_description": "Angaben gemäß DDG: Betreiber, Adresse und Kontakt zu hautuu. Diese Seite ist für Pflichtangaben gedacht und nicht für die Google Suche optimiert.",
    },
    "datenschutz": {
        "seo_title": "Datenschutz",
        "seo_description": "Informationen zur Verarbeitung personenbezogener Daten auf hautuu. Hosting, Kontakt und deine Rechte kompakt erklärt. Seite mit Noindex für Suchmaschinen.",
    },
}

TAG_DESCRIPTIONS: dict[str, str] = {
    "astro": "Artikel zum Astro Framework: statische Seiten, Build und Collections in hautuu. Finde Folgen, die Astro Setup und Alltag im Projekt zeigen.",
    "cloudflare": "Hosting, Build und Deploy mit Cloudflare Pages für hautuu. Alle Folgen zu Preview URLs, Branches, Workers und Livegang an einem Ort.",
    "css": "Layout, Breakpoints und Styles auf hautuu. Artikel zu Design, Typo und Performance ohne schwere CSS Frameworks.",
    "cursor": "Cursor IDE, Agenten, Modi und Abo im hautuu Kontext. Lerne, wie du KI beim Coden steuerst ohne Chaos im Repo.",
    "design": "Farben, Schrift und Footer auf hautuu. Folgen zu erstem Design, Breakpoints und redaktionellen Feintuning Tipps.",
    "github": "GitHub Issues, Branches, Pull Requests und Fork für hautuu. Alle Artikel rund um Repository, Zusammenarbeit und Open Source.",
    "node": "Node.js und npm für lokale Entwicklung und Build. Folgen zu Installation, npm run dev und Node Versionen bei hautuu.",
    "ssh": "SSH Keys und sicherer Zugriff auf private GitHub Repos. Passende hautuu Artikel zum Klonen ohne Permission denied.",
    "sveltia": "Sveltia CMS unter /admin: PAT, Worker Login und Redaktion in Git. Alle Folgen zum browserbasierten Bearbeiten von hautuu Inhalten.",
}

GLOSSAR_SEO_TITLE_SUFFIX = " · Glossar"


def load_frontmatter(path: Path) -> tuple[dict, str]:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        raise ValueError(f"No frontmatter: {path}")
    parts = text.split("---", 2)
    meta = yaml.safe_load(parts[1]) or {}
    body = parts[2] if len(parts) > 2 else ""
    return meta, body


def dump_frontmatter(meta: dict, body: str) -> str:
    header = yaml.dump(meta, allow_unicode=True, sort_keys=False, width=1000).rstrip()
    return f"---\n{header}\n---{body}"


def merge_seo(meta: dict, seo_patch: dict[str, str]) -> None:
    seo = meta.get("seo") or {}
    if not isinstance(seo, dict):
        seo = {}
    for key, value in seo_patch.items():
        if value:
            seo[key] = value
    meta["seo"] = seo


def clamp_length(text: str, min_len: int = 140, max_len: int = 160) -> str:
    text = re.sub(r"\s+", " ", text.strip())
    if len(text) <= max_len and len(text) >= min_len:
        return text
    if len(text) > max_len:
        cut = text[: max_len + 1]
        if " " in cut:
            cut = cut.rsplit(" ", 1)[0]
        return cut.rstrip(".,;:")
    pad = " Mehr im Glossar auf hautuu."
    while len(text) < min_len and pad:
        text = (text + pad).strip()
        if len(text) > max_len:
            return clamp_length(text, min_len, max_len)
    return text[:max_len].rsplit(" ", 1)[0] if len(text) > max_len else text


def glossar_seo_description(definition: str, body: str) -> str:
    defn = definition.strip().strip('"')
    plain = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", body)
    plain = re.sub(r"[*_`#>]", "", plain)
    plain = re.sub(r"\s+", " ", plain).strip()
    first = ""
    for part in plain.split(". "):
        part = part.strip()
        if len(part) > 40:
            first = part if part.endswith(".") else part + "."
            break
    combo = defn
    if first and first.lower() not in defn.lower():
        combo = f"{defn} {first}"
    return clamp_length(combo)


def main() -> int:
    counts = {"articles": 0, "pages": 0, "tags": 0, "glossar": 0}

    for path in sorted((CONTENT / "articles").glob("*/index.md")):
        slug = path.parent.name
        patch = ARTICLE_SEO.get(slug)
        if not patch:
            print(f"Missing article SEO: {slug}", file=sys.stderr)
            return 1
        meta, body = load_frontmatter(path)
        merge_seo(meta, patch)
        path.write_text(dump_frontmatter(meta, body), encoding="utf-8")
        counts["articles"] += 1

    for path in sorted((CONTENT / "pages").glob("*/index.md")):
        slug = path.parent.name
        patch = PAGE_SEO.get(slug)
        if not patch:
            print(f"Missing page SEO: {slug}", file=sys.stderr)
            return 1
        meta, body = load_frontmatter(path)
        merge_seo(meta, patch)
        path.write_text(dump_frontmatter(meta, body), encoding="utf-8")
        counts["pages"] += 1

    for path in sorted((CONTENT / "tags").glob("*.md")):
        slug = path.stem
        desc = TAG_DESCRIPTIONS.get(slug)
        if not desc:
            print(f"Missing tag description: {slug}", file=sys.stderr)
            return 1
        meta, body = load_frontmatter(path)
        meta["description"] = desc
        path.write_text(dump_frontmatter(meta, body), encoding="utf-8")
        counts["tags"] += 1

    for path in sorted((CONTENT / "glossar").glob("*.md")):
        meta, body = load_frontmatter(path)
        title = meta.get("title", path.stem)
        definition = meta.get("definition", "")
        seo_title = f"{title}{GLOSSAR_SEO_TITLE_SUFFIX}"
        if len(seo_title) > 60:
            seo_title = title
        seo_description = glossar_seo_description(definition, body)
        merge_seo(
            meta,
            {
                "seo_title": seo_title,
                "seo_description": seo_description,
            },
        )
        path.write_text(dump_frontmatter(meta, body), encoding="utf-8")
        counts["glossar"] += 1

    print("Updated:", counts)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
