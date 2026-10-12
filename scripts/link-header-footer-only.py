#!/usr/bin/env python3
"""Add first-occurrence links for glossar header and footer only."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GLOSSAR_DIR = ROOT / "src/content/glossar"
CONTENT = ROOT / "src/content"

PATTERNS: list[tuple[str, str]] = [
    ("sticky-header", r"Sticky\s+Headers?"),
    ("header", r"\bHeader\b"),
    ("footer", r"\bFooter\b"),
]


def split_file(text: str) -> tuple[str, str]:
    m = re.match(r"(\A---\n.*?\n---\n)(.*)\Z", text, re.S)
    if not m:
        raise ValueError("No frontmatter")
    return m.group(1), m.group(2)


def protected_ranges(line: str) -> list[tuple[int, int]]:
    ranges: list[tuple[int, int]] = []
    for m in re.finditer(r"`[^`]*`", line):
        ranges.append(m.span())
    for m in re.finditer(r"\[[^\]]*\]\([^)]*\)", line):
        ranges.append(m.span())
    return ranges


def in_range(i: int, ranges: list[tuple[int, int]]) -> bool:
    return any(a <= i < b for a, b in ranges)


def content_files() -> list[Path]:
    paths: list[Path] = []
    for path in sorted(GLOSSAR_DIR.glob("*.md")):
        paths.append(path)
    articles = CONTENT / "articles"
    if articles.exists():
        paths.extend(sorted(articles.glob("*/index.md")))
    for sub in ("pages", "tags"):
        base = CONTENT / sub
        if base.exists():
            paths.extend(sorted(base.rglob("*.md")))
    return paths


def slug_for(path: Path) -> str:
    if path.parent.name == "glossar":
        return path.stem
    return ""


def link_body(body: str, current_slug: str) -> tuple[str, list[str]]:
    linked: set[str] = set()
    if current_slug:
        linked.add(current_slug)
    if re.search(r"\]\(/glossar/header/\)", body):
        linked.add("header")
    if re.search(r"\]\(/glossar/sticky-header/\)", body):
        linked.add("sticky-header")
    if re.search(r"\]\(/glossar/footer/\)", body):
        linked.add("footer")

    added: list[str] = []
    out: list[str] = []
    in_fence = False

    for line in body.split("\n"):
        if line.strip().startswith("```"):
            in_fence = not in_fence
            out.append(line)
            continue
        if in_fence or line.strip().startswith("<!--") or re.match(r"^#{1,6}\s", line):
            out.append(line)
            continue

        prot = protected_ranges(line)
        best: tuple[int, int, str, str] | None = None
        for slug, pattern in PATTERNS:
            if slug in linked:
                continue
            if current_slug and slug == current_slug:
                continue
            for m in re.finditer(pattern, line, re.I if slug == "footer" else 0):
                if in_range(m.start(), prot) or in_range(m.end() - 1, prot):
                    continue
                if slug == "header" and re.match(r"Sticky\s+Header", line[m.start() - 7 : m.end()], re.I):
                    continue
                if best is None or m.start() < best[0]:
                    best = (m.start(), m.end(), slug, m.group())
        if best:
            s, e, slug, matched = best
            line = line[:s] + f"[{matched}](/glossar/{slug}/)" + line[e:]
            linked.add(slug)
            added.append(slug)
        out.append(line)

    return "\n".join(out), added


def main() -> None:
    report: dict[str, list[str]] = {}
    for path in content_files():
        text = path.read_text(encoding="utf-8")
        fm, body = split_file(text)
        new_body, added = link_body(body, slug_for(path))
        if added:
            path.write_text(fm + new_body, encoding="utf-8")
            report[str(path.relative_to(ROOT))] = added
    for rel, slugs in sorted(report.items()):
        print(f"{rel}: {', '.join(slugs)}")
    print(f"files updated: {len(report)}")


if __name__ == "__main__":
    main()
