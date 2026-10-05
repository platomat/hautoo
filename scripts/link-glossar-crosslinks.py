#!/usr/bin/env python3
"""Add first-occurrence cross-links to glossar terms in content markdown bodies."""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GLOSSAR_DIR = ROOT / "src/content/glossar"
CONTENT = ROOT / "src/content"

# Longer / more specific patterns first (order matters).
TERM_PATTERNS: list[tuple[str, str]] = [
    ("pull-request", r"Pull\s+Requests?"),
    ("cloudflare-pages", r"Cloudflare\s+Pages"),
    ("cloudflare-worker", r"Cloudflare\s+Workers?"),
    ("git-history", r"Git-Historie"),
    ("content-collections", r"Content\s+Collections"),
    ("personal-access-token", r"Personal\s+Access\s+Tokens?"),
    ("preview-url", r"Preview-URLs?"),
    ("preview-url", r"Preview-(?:URL|Link|Deploys?)"),
    ("preview-url", r"Preview-Deployments"),
    ("production", r"Production-Branch"),
    ("production", r"\bProduction\b"),
    ("ssh-key", r"SSH-Keys?"),
    ("cursor-modi", r"\bAsk\b"),
    ("cursor-modi", r"\bPlan\b"),
    ("cloud-agent", r"Cloud\s+Agents?"),
    ("pull-request", r"\bPRs\b"),
    ("ci-cd", r"CI/CD"),
    ("ci-cd", r"Continuous\s+Integration"),
    ("ci-cd", r"Continuous\s+Deployment"),
    ("nodejs", r"Node\.js"),
    ("github", r"GitHub"),
    ("sveltia", r"Sveltia(?:\s+CMS)?"),
    ("cloudflare-pages", r"Cloudflare(?!\s+(?:Pages|Worker))"),
    ("repository", r"Git-Repo"),
    ("repository", r"Repositories"),
    ("repository", r"Repository"),
    ("repository", r"\bRepos?\b"),
    ("frontmatter", r"Frontmatter"),
    ("breakpoint", r"Breakpoints?"),
    ("komponente", r"Komponenten?"),
    ("collection", r"Collections?"),
    ("markdown", r"Markdown"),
    ("deployment", r"Deployments?"),
    ("deploy", r"Deploy(?:s|ment)?"),
    ("frontend", r"Frontend"),
    ("backend", r"Backend"),
    ("oauth", r"OAuth"),
    ("commit", r"Commits?"),
    ("commit", r"committ(?:en|est)"),
    ("branch", r"Branches?"),
    ("branch", r"Branch"),
    ("branch", r"Zweigen?"),
    ("merge", r"Merge(?:s|-Commit)?"),
    ("merge", r"mergst"),
    ("rebase", r"Rebase"),
    ("rebase", r"rebasest"),
    ("clone", r"git\s+clone"),
    ("clone", r"Clone"),
    ("fork", r"Fork"),
    ("issue", r"Issues?"),
    ("origin", r"\borigin\b"),
    ("main", r"`main`"),
    ("main", r"\bmain\b"),
    ("rollback", r"Rollback"),
    ("build", r"Astro-Build"),
    ("build", r"Build"),
    ("astro", r"Astro"),
    ("cursor", r"Cursor"),
    ("git", r"\bGit\b"),
    ("pull", r"\bPull\b"),
    ("pull", r"pullst"),
    ("push", r"\bPush\b"),
    ("push", r"pushst"),
    ("npm", r"\bnpm\b"),
    ("nvm", r"\bnvm\b"),
    ("nodejs", r"\bNode\b"),
    ("pat", r"\bPAT\b"),
    ("env", r"Umgebungsvariablen?"),
    ("env", r"`\.env`"),
    ("env", r"\.env\b"),
    ("css", r"\bCSS\b"),
    ("css-variable", r"CSS-Variablen?"),
    ("css-variable", r"custom properties"),
    ("cms", r"\bCMS\b"),
    ("ssh-key", r"\bSSH\b"),
    ("ide", r"\bIDE\b"),
    ("ide", r"Entwicklungsumgebung"),
    ("ide", r"Integrierte Entwicklungsumgebung"),
    ("terminal", r"Terminal"),
    ("terminal", r"Kommandozeile"),
    ("terminal", r"Konsole"),
    ("cli", r"\bCLI\b"),
    ("cli", r"Kommandozeilenprogramm"),
]

SLUG_MAP: dict[str, str] = {
    "content-collections": "collection",
    "personal-access-token": "pat",
    "deployment": "deploy",
}


@dataclass
class FileParts:
    frontmatter: str
    body: str


def split_file(text: str) -> FileParts:
    m = re.match(r"(\A---\n.*?\n---\n)(.*)\Z", text, re.S)
    if not m:
        raise ValueError("No frontmatter")
    return FileParts(m.group(1), m.group(2))


def is_protected_index(i: int, protected: list[tuple[int, int]]) -> bool:
    return any(a <= i < b for a, b in protected)


def protected_ranges_in_line(line: str) -> list[tuple[int, int]]:
    ranges: list[tuple[int, int]] = []
    for m in re.finditer(r"`[^`]*`", line):
        ranges.append(m.span())
    for m in re.finditer(r"\[[^\]]*\]\([^)]*\)", line):
        ranges.append(m.span())
    for m in re.finditer(r"\[[^\]]*$", line):
        ranges.append(m.span())
    for m in re.finditer(r"\{\{(?:repodoc|block|separator|article-listing|tag-listing)[^}]*\}\}", line):
        ranges.append(m.span())
    return ranges


def should_skip_match(current_slug: str, target_slug: str, matched: str) -> bool:
    if current_slug and target_slug == current_slug:
        return True
    if current_slug == "cloudflare-worker" and re.fullmatch(r"Workers?", matched, re.I):
        return True
    if current_slug in ("backend", "frontend") and matched.lower() in (
        "backend",
        "frontend",
    ):
        return True
    return False


def find_best_match(
    line: str,
    current_slug: str,
    linked_targets: set[str],
    protected: list[tuple[int, int]],
) -> tuple[int, int, str, str] | None:
    best: tuple[int, int, str, str] | None = None

    for pattern_slug, pattern in TERM_PATTERNS:
        slug = SLUG_MAP.get(pattern_slug, pattern_slug)
        if slug in linked_targets:
            continue
        if current_slug and slug == current_slug:
            continue
        flags = (
            0
            if slug in ("main", "git", "github", "branch", "commit")
            else re.IGNORECASE
        )
        for m in re.finditer(pattern, line, flags=flags):
            if is_protected_index(m.start(), protected) or is_protected_index(
                m.end() - 1, protected
            ):
                continue
            if slug == "cursor-modi" and m.group() == "Ask":
                if re.match(r"\s+AI\b", line[m.end() :]):
                    continue
            if slug == "commit" and re.match(r"-(?:ID|Messages)\b", line[m.end() :]):
                continue
            if slug == "git" and line[m.start() : m.start() + 6].lower() == "github":
                continue
            if slug == "git" and line[m.start() : m.start() + 4].lower() == "git-":
                after = line[m.end() : m.end() + 4].lower()
                if after.startswith("hub"):
                    continue
            if slug == "pull" and re.match(r"Pull\s+Request", line[m.start() :], re.I):
                continue
            if should_skip_match(current_slug, slug, m.group()):
                continue
            if best is None or m.start() < best[0]:
                best = (m.start(), m.end(), slug, m.group())
            elif m.start() == best[0] and (m.end() - m.start()) > (best[1] - best[0]):
                best = (m.start(), m.end(), slug, m.group())
    return best


def link_body_multipass(
    body: str, current_slug: str, linked_targets: set[str]
) -> tuple[str, int]:
    total = 0
    linked = set(linked_targets)
    while True:
        new_body, n, linked = link_body_once(body, current_slug, linked)
        if n == 0:
            return new_body, total
        total += n
        body = new_body


def link_body_once(
    body: str, current_slug: str, linked_targets: set[str]
) -> tuple[str, int, set[str]]:
    linked = set(linked_targets)
    added = 0
    out_lines: list[str] = []
    in_fence = False

    for line in body.split("\n"):
        stripped = line.strip()
        if stripped.startswith("```"):
            in_fence = not in_fence
            out_lines.append(line)
            continue
        if in_fence:
            out_lines.append(line)
            continue
        if re.match(r"^#{1,6}\s", line):
            out_lines.append(line)
            continue

        protected = protected_ranges_in_line(line)
        best = find_best_match(line, current_slug, linked, protected)
        if best:
            start, end, slug, matched = best
            line = (
                line[:start]
                + f"[{matched}](/glossar/{slug}/)"
                + line[end:]
            )
            linked.add(slug)
            added += 1
        out_lines.append(line)

    return "\n".join(out_lines), added, linked


def count_glossar_links_in_body(body: str) -> int:
    return len(re.findall(r"\]\(/glossar/[^)]+\)", body))


def content_markdown_files() -> list[Path]:
    paths: list[Path] = []
    for path in sorted(GLOSSAR_DIR.glob("*.md")):
        paths.append(path)
    articles = CONTENT / "articles"
    if articles.exists():
        for path in sorted(articles.glob("*/index.md")):
            paths.append(path)
    for sub in ("pages", "tags"):
        base = CONTENT / sub
        if base.exists():
            for path in sorted(base.rglob("*.md")):
                paths.append(path)
    return paths


def current_slug_for(path: Path) -> str:
    if path.parent.name == "glossar" and path.parent.parent == CONTENT:
        return path.stem
    return ""


def process_file(path: Path) -> int:
    text = path.read_text(encoding="utf-8")
    parts = split_file(text)
    slug = current_slug_for(path)
    before = count_glossar_links_in_body(parts.body)
    new_body, _ = link_body_multipass(parts.body, slug, set())
    after = count_glossar_links_in_body(new_body)
    delta = after - before
    if new_body != parts.body:
        path.write_text(parts.frontmatter + new_body, encoding="utf-8")
    rel = path.relative_to(ROOT)
    print(f"{rel}: {before} -> {after} (+{delta})")
    return delta


def main() -> None:
    total_new = 0
    folge_delta = 0
    for path in content_markdown_files():
        delta = process_file(path)
        total_new += delta
        if "articles/folge-" in str(path):
            folge_delta += delta
    print(f"total new glossar links: {total_new} (articles: {folge_delta})")


if __name__ == "__main__":
    main()
