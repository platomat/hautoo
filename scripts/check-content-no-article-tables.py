#!/usr/bin/env python3
"""Warn on wide or verbose Markdown tables in articles (mobile-unfriendly)."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTICLES = ROOT / "src/content/articles"

MAX_COLUMNS = 3
MAX_CELL_CHARS = 100

TABLE_SEPARATOR = re.compile(
    r"^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$"
)


def body_of(text: str) -> str:
    if text.startswith("---"):
        parts = text.split("---", 2)
        return parts[2] if len(parts) > 2 else ""
    return text


def split_row(line: str) -> list[str]:
    line = line.strip()
    if line.startswith("|"):
        line = line[1:]
    if line.endswith("|"):
        line = line[:-1]
    return [c.strip() for c in line.split("|")]


def column_count(separator_line: str) -> int:
    return len(split_row(separator_line))


def scan_file(path: Path) -> list[str]:
    lines = body_of(path.read_text(encoding="utf-8")).splitlines()
    warnings: list[str] = []
    rel = path.relative_to(ROOT)
    i = 0
    while i < len(lines):
        if not TABLE_SEPARATOR.match(lines[i]):
            i += 1
            continue
        sep_line = i
        cols = column_count(lines[i])
        # header is line before separator if it looks like a table row
        start = sep_line - 1 if sep_line > 0 and "|" in lines[sep_line - 1] else sep_line
        j = sep_line + 1
        max_cell = 0
        while j < len(lines) and "|" in lines[j] and lines[j].strip() and not lines[j].strip().startswith("```"):
            for cell in split_row(lines[j]):
                max_cell = max(max_cell, len(cell))
            j += 1
        if cols > MAX_COLUMNS or max_cell > MAX_CELL_CHARS:
            warnings.append(
                f"{rel}:{start + 1}: wide table ({cols} columns, longest cell {max_cell} chars); "
                f"prefer list `- **Label**<br>…` for many columns or long text (docs/redaktion/README.md)"
            )
        i = j
    return warnings


def main() -> int:
    all_warnings: list[str] = []
    if ARTICLES.is_dir():
        for path in sorted(ARTICLES.rglob("*.md")):
            all_warnings.extend(scan_file(path))
    if all_warnings:
        print("Article table warnings (non-blocking):", file=sys.stderr)
        for item in all_warnings:
            print(f"  - {item}", file=sys.stderr)
    else:
        print("Article table warnings: none.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
