#!/usr/bin/env python3
"""Warn when glossar terms appear unlinked (first occurrence heuristic). Exit 0 always."""

from __future__ import annotations

import importlib.util
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
_SCRIPTS = Path(__file__).resolve().parent


def _load_crosslinks():
    spec = importlib.util.spec_from_file_location(
        "link_glossar_crosslinks",
        _SCRIPTS / "link-glossar-crosslinks.py",
    )
    mod = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = mod
    spec.loader.exec_module(mod)
    return mod


def main() -> int:
    mod = _load_crosslinks()
    all_warn: list[str] = []

    for path in mod.content_markdown_files():
        text = path.read_text(encoding="utf-8")
        try:
            parts = mod.split_file(text)
        except ValueError:
            continue
        rel = path.relative_to(ROOT)
        current_slug = mod.current_slug_for(path)
        linked: set[str] = set()
        in_fence = False

        for lineno, line in enumerate(parts.body.splitlines(), start=1):
            stripped = line.strip()
            if stripped.startswith("```"):
                in_fence = not in_fence
                continue
            if in_fence or re.match(r"^#{1,6}\s", line):
                continue

            protected = mod.protected_ranges_in_line(line)
            best = mod.find_best_match(line, current_slug, linked, protected)
            if not best:
                continue
            _, _, slug, matched = best
            if f"](/glossar/{slug}/)" in line:
                linked.add(slug)
                continue
            all_warn.append(
                f"{rel}:{lineno}: unlinked first mention `{matched}` -> /glossar/{slug}/"
            )
            linked.add(slug)

    if all_warn:
        print("Glossar first-link warnings (non-blocking):", file=sys.stderr)
        for item in all_warn[:200]:
            print(f"  - {item}", file=sys.stderr)
        if len(all_warn) > 200:
            print(f"  - … and {len(all_warn) - 200} more", file=sys.stderr)
    else:
        print("Glossar first-link check: no warnings.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
