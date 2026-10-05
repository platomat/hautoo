#!/usr/bin/env python3
"""Add first-occurrence cross-links between glossar markdown bodies."""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

GLOSSAR_DIR = Path(__file__).resolve().parents[1] / "src/content/glossar"

TERM_PATTERNS: list[tuple[str, str]] = [
    ("pull-request", r"Pull\s+Requests?"),
    ("cloudflare-pages", r"Cloudflare\s+Pages"),
    ("cloudflare-worker", r"Cloudflare\s+Workers?"),
    ("git-history", r"Git-Historie"),
    ("content-collections", r"Content\s+Collections"),
    ("personal-access-token", r"Personal\s+Access\s+Tokens?"),
    ("preview-url", r"Preview-(?:URL|Link|Deploys?)"),
    ("preview-url", r"Preview-Deployments"),
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
    ("repository", r"Repositories"),
    ("repository", r"Repository"),
    ("repository", r"\bRepos\b"),
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
    ("build", r"Build"),
    ("astro", r"Astro"),
    ("cursor", r"Cursor"),
    ("git", r"\bGit\b"),
    ("pull", r"\bPull\b"),
    ("pull", r"pullst"),
    ("push", r"\bPush\b"),
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
    # Incomplete markdown link: protect from `[` through end of line (no `](` yet).
    for m in re.finditer(r"\[[^\]]*$", line):
        ranges.append(m.span())
    for m in re.finditer(r"\{\{repodoc[^}]*\}\}", line):
        ranges.append(m.span())
    return ranges


def should_skip_match(current_slug: str, target_slug: str, matched: str) -> bool:
    if target_slug == current_slug:
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
        if slug == current_slug or slug in linked_targets:
            continue
        flags = re.IGNORECASE if slug != "main" else 0
        for m in re.finditer(pattern, line, flags=flags):
            if is_protected_index(m.start(), protected) or is_protected_index(
                m.end() - 1, protected
            ):
                continue
            if slug == "git" and line[m.start() : m.start() + 6].lower() == "github":
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

    for line in body.split("\n"):
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


def main() -> None:
    total_new = 0
    for path in sorted(GLOSSAR_DIR.glob("*.md")):
        slug = path.stem
        text = path.read_text(encoding="utf-8")
        parts = split_file(text)
        before = count_glossar_links_in_body(parts.body)
        new_body, n = link_body_multipass(parts.body, slug, set())
        after = count_glossar_links_in_body(new_body)
        if new_body != parts.body:
            path.write_text(parts.frontmatter + new_body, encoding="utf-8")
        print(f"{slug}: {before} -> {after} (+{after - before})")
        total_new += after - before
    print(f"total glossar cross-links in bodies: {total_new} new")


if __name__ == "__main__":
    main()
