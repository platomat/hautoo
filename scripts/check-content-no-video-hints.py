#!/usr/bin/env python3
"""Fail when public content references the screencast/video instead of standing alone."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "src" / "content"
SCAN_DIRS = ("articles", "glossar", "pages")

HTML_COMMENT = re.compile(r"<!--.*?-->", re.DOTALL)

# Meta phrases that send readers to the video/transcript (not the topic „Screencast“ in titles).
PATTERNS: list[tuple[str, re.Pattern[str]]] = [
    ("im Video", re.compile(r"\bim\s+Video\b", re.IGNORECASE)),
    ("aus dem Video", re.compile(r"\baus\s+dem\s+Video\b", re.IGNORECASE)),
    ("im Screencast", re.compile(r"\bim\s+Screencast\b", re.IGNORECASE)),
    ("im Transkript", re.compile(r"\bim\s+Transkript\b", re.IGNORECASE)),
    ("aus dem Transkript", re.compile(r"\baus\s+dem\s+Transkript\b", re.IGNORECASE)),
]

ALLOWED_LINE_SNIPPETS = (
    re.compile(r"nicht\s+im\s+Video\s+zeigen", re.IGNORECASE),
)


def body_without_comments(text: str) -> str:
    if text.startswith("---"):
        parts = text.split("---", 2)
        body = parts[2] if len(parts) > 2 else ""
    else:
        body = text
    return HTML_COMMENT.sub("", body)


def line_allowed(line: str) -> bool:
    return any(p.search(line) for p in ALLOWED_LINE_SNIPPETS)


def scan_file(path: Path) -> list[str]:
    body = body_without_comments(path.read_text(encoding="utf-8"))
    rel = path.relative_to(ROOT)
    issues: list[str] = []

    for lineno, line in enumerate(body.splitlines(), start=1):
        if line_allowed(line):
            scrubbed = line
            for p in ALLOWED_LINE_SNIPPETS:
                scrubbed = p.sub("", scrubbed)
        else:
            scrubbed = line

        for label, pattern in PATTERNS:
            if pattern.search(scrubbed):
                snippet = line.strip()[:90]
                issues.append(f"{rel}:{lineno}: forbidden phrase „{label}“ in `{snippet}`")

    return issues


def main() -> int:
    all_issues: list[str] = []
    for sub in SCAN_DIRS:
        base = CONTENT / sub
        if not base.exists():
            continue
        for path in sorted(base.rglob("*.md")):
            all_issues.extend(scan_file(path))

    if all_issues:
        print("Content no-video-hints check failed:", file=sys.stderr)
        for item in all_issues:
            print(f"  - {item}", file=sys.stderr)
        return 1

    print("Content no-video-hints check OK.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
