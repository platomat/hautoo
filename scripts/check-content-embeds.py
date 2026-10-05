#!/usr/bin/env python3
"""Fail when {{repodoc}} or {{block}} splits a sentence, a list, or lacks paragraph spacing."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "src" / "content"
SCAN_DIRS = ("articles", "glossar", "pages", "tags")

EMBED_LINE = re.compile(
    r"^\s*(\{\{(?:repodoc|block)\b[^}]*\}\})\s*$",
    re.MULTILINE,
)
# Inline mention in backticks or prose — not a rendered embed line
EMBED_INLINE = re.compile(r"\{\{(?:repodoc|block)\b")

HEADING = re.compile(r"^#{1,6}\s")
LIST_ITEM = re.compile(r"^\s*([-*+]|\d+\.)\s")


def is_list_item(line: str) -> bool:
    return bool(LIST_ITEM.match(line))


def body_from_md(text: str) -> str:
    if text.startswith("---"):
        parts = text.split("---", 2)
        return parts[2] if len(parts) > 2 else ""
    return text


def scan_body(rel: Path, body: str) -> list[str]:
    issues: list[str] = []
    lines = body.splitlines()

    for i, line in enumerate(lines):
        if not EMBED_LINE.match(line):
            prose = re.sub(r"`[^`]*`", "", line)
            if EMBED_INLINE.search(prose):
                issues.append(
                    f"{rel}: embed must be alone on its line: `{line.strip()[:70]}`"
                )
            continue

        prev_idx = i - 1
        while prev_idx >= 0 and not lines[prev_idx].strip():
            prev_idx -= 1
        next_idx = i + 1
        while next_idx < len(lines) and not lines[next_idx].strip():
            next_idx += 1

        if i > 0 and lines[i - 1].strip():
            issues.append(f"{rel}: line {i + 1}: missing blank line before embed")

        if next_idx < len(lines) and next_idx == i + 1:
            issues.append(f"{rel}: line {i + 1}: missing blank line after embed")

        if prev_idx >= 0:
            prev = lines[prev_idx].strip()
            if prev and not HEADING.match(prev) and not EMBED_LINE.match(prev):
                if not re.search(r"[.!?:]$", prev):
                    issues.append(
                        f"{rel}: line {i + 1}: embed after unfinished line "
                        f"`{prev[:60]}`"
                    )

        if next_idx < len(lines):
            nxt = lines[next_idx].strip()
            if nxt and re.match(r"^[,;]", nxt):
                issues.append(
                    f"{rel}: line {i + 1}: embed splits sentence (continues with "
                    f"`{nxt[:50]}`)"
                )
            elif nxt and nxt[0].islower():
                issues.append(
                    f"{rel}: line {i + 1}: embed splits sentence (continues with "
                    f"`{nxt[:50]}`)"
                )

        if prev_idx >= 0 and next_idx < len(lines):
            prev_line = lines[prev_idx]
            next_line = lines[next_idx]
            if is_list_item(prev_line) and is_list_item(next_line):
                issues.append(
                    f"{rel}: line {i + 1}: embed between list items "
                    f"(move after the list)"
                )

    return issues


def scan_file(path: Path) -> list[str]:
    return scan_body(path.relative_to(ROOT), body_from_md(path.read_text(encoding="utf-8")))


def main() -> int:
    all_issues: list[str] = []
    for sub in SCAN_DIRS:
        base = CONTENT / sub
        if not base.exists():
            continue
        for path in sorted(base.rglob("*.md")):
            all_issues.extend(scan_file(path))

    if all_issues:
        print("Content embed check failed:", file=sys.stderr)
        for item in all_issues:
            print(f"  - {item}", file=sys.stderr)
        return 1

    print("Content embed check OK.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
