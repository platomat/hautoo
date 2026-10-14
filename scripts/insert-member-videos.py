#!/usr/bin/env python3
"""Insert member-video + before/after blocks after first body paragraph of each Folge."""

from __future__ import annotations

import re
from pathlib import Path

ARTICLES = Path(__file__).resolve().parents[1] / "src/content/articles"
POSTER = "/assets/hautoo-member-video-poster.webp"
DIR03 = Path(
    "/media/dna/dev/web/projects/2026-10 - hautoo.storyofai.net/01 - screencasts/03 - all with fixed audio"
)

# Use replace, not str.format — {{ would be eaten by format().
SNIPPET_TMPL = """\
{{block id="memberaccessmedia-info-before"}}

{{member-video src="videos/__FILE__" poster="__POSTER__"}}

{{block id="memberaccessmedia-info-after"}}
"""

# Broken single-brace variant from earlier format() bug, plus correct double-brace.
EXISTING = re.compile(
    r"\n\{+\s*block id=\"memberaccessmedia-info-before\"\}+[\s\S]*?"
    r"\{+\s*block id=\"memberaccessmedia-info-after\"\}+\n*",
)


def video_for_num(num: str) -> str | None:
    matches = sorted(DIR03.glob(f"hautoo--folge--{num}--*.mp4"))
    if not matches:
        return None
    return matches[0].name


def insert_after_first_paragraph(body: str, snippet: str) -> str:
    body = EXISTING.sub("\n", body)
    parts = re.split(r"(\n\n+)", body, maxsplit=2)
    if len(parts) == 1:
        return body.rstrip() + "\n\n" + snippet + "\n"
    para0, sep = parts[0], parts[1]
    rest = "".join(parts[2:]) if len(parts) > 2 else ""
    return para0 + sep + snippet + "\n\n" + rest.lstrip("\n")


def main() -> None:
    updated = 0
    for folder in sorted(ARTICLES.glob("folge-*")):
        index = folder / "index.md"
        if not index.is_file():
            continue
        m = re.match(r"folge-(\d+)", folder.name)
        if not m:
            continue
        num = f"{int(m.group(1)):03d}"
        filename = video_for_num(num)
        if not filename:
            print(f"SKIP {folder.name}: no video in 03 for {num}")
            continue
        text = index.read_text(encoding="utf-8")
        if not text.startswith("---"):
            print(f"SKIP {folder.name}: no frontmatter")
            continue
        end = text.find("\n---\n", 3)
        if end < 0:
            print(f"SKIP {folder.name}: frontmatter end missing")
            continue
        fm, body = text[: end + 5], text[end + 5 :]
        snippet = SNIPPET_TMPL.replace("__FILE__", filename).replace("__POSTER__", POSTER)
        new_body = insert_after_first_paragraph(body.lstrip("\n"), snippet)
        new_text = fm + "\n" + new_body.lstrip("\n")
        if new_text != text:
            index.write_text(new_text, encoding="utf-8")
            print(f"OK  {folder.name} → {filename}")
            updated += 1
        else:
            print(f"==  {folder.name} (unchanged)")
    print(f"updated={updated}")


if __name__ == "__main__":
    main()
