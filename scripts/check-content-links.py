#!/usr/bin/env python3
"""Fail on broken Markdown links in src/content (split ](url), orphans, nesting)."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "src" / "content"

SCAN_DIRS = ("articles", "glossar", "pages", "tags")

# [text] then whitespace, newline, or repodoc before (url) — classic split link
BROKEN_LINK = re.compile(
    r"(?<!!)\[[^\]]+\](?:\s|\n|(?:\r?\n\s*)?\{\{repodoc)",
    re.MULTILINE,
)

# Leftover from a split link: (/path/) on its own line or after embed
ORPHAN_TARGET = re.compile(r"^\s*\(/[^\s\)]+\)", re.MULTILINE)

# [outer [inner](url) text](/url) — invalid in most Markdown parsers
NESTED_LINK = re.compile(r"(?<!!)\[[^\]]*\[[^\]]*\]\([^\)]*\)")


def scan_file(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8")
    if text.startswith("---"):
        parts = text.split("---", 2)
        body = parts[2] if len(parts) > 2 else ""
    else:
        body = text

    issues: list[str] = []
    rel = path.relative_to(ROOT)

    for m in BROKEN_LINK.finditer(body):
        snippet = body[m.start() : min(len(body), m.end() + 50)].replace("\n", " ")
        issues.append(f"{rel}: broken link (] not followed by () `{snippet[:90]}`")

    for m in ORPHAN_TARGET.finditer(body):
        issues.append(f"{rel}: orphan link target `{m.group().strip()}`")

    for m in NESTED_LINK.finditer(body):
        issues.append(f"{rel}: nested markdown link `{m.group()[:70]}`")

    return issues


def main() -> int:
    import subprocess

    all_issues: list[str] = []
    for sub in SCAN_DIRS:
        base = CONTENT / sub
        if not base.exists():
            continue
        for path in sorted(base.rglob("*.md")):
            all_issues.extend(scan_file(path))

    if all_issues:
        print("Content link check failed:", file=sys.stderr)
        for item in all_issues:
            print(f"  - {item}", file=sys.stderr)
        return 1

    print("Content link check OK.")
    embed_script = ROOT / "scripts" / "check-content-embeds.py"
    hints_script = ROOT / "scripts" / "check-content-no-video-hints.py"
    rc = 0
    if embed_script.is_file():
        rc = subprocess.run([sys.executable, str(embed_script)], check=False).returncode
    if rc == 0 and hints_script.is_file():
        rc = subprocess.run([sys.executable, str(hints_script)], check=False).returncode
    glossar_warn = ROOT / "scripts" / "check-glossar-first-links.py"
    if glossar_warn.is_file():
        subprocess.run([sys.executable, str(glossar_warn)], check=False)
    return rc


if __name__ == "__main__":
    sys.exit(main())
