import GithubSlugger from "github-slugger";

export type TocEntry = {
	depth: 2 | 3;
	text: string;
	id: string;
};

/** Remove fenced code blocks so headings inside them are ignored. */
function stripFencedCode(markdown: string): string {
	return markdown.replace(/^```[\s\S]*?^```/gm, "").replace(/^~~~[\s\S]*?^~~~/gm, "");
}

/** Plain text for TOC labels (strip common Markdown inline markup). */
function plainHeadingText(raw: string): string {
	return raw
		.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
		.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/`([^`]+)`/g, "$1")
		.replace(/\*\*([^*]+)\*\*/g, "$1")
		.replace(/\*([^*]+)\*/g, "$1")
		.replace(/__([^_]+)__/g, "$1")
		.replace(/_([^_]+)_/g, "$1")
		.replace(/<\/?[^>]+>/g, "")
		.trim();
}

/**
 * Collect h2/h3 headings from Markdown body.
 * IDs match Astro/Satteri via github-slugger (same as rendered heading anchors).
 */
export function extractTocEntries(body: string | undefined): TocEntry[] {
	if (!body?.trim()) {
		return [];
	}

	const source = stripFencedCode(body);
	const slugger = new GithubSlugger();
	const entries: TocEntry[] = [];
	const headingRe = /^(#{2,3})\s+(.+?)\s*#*\s*$/gm;

	for (const match of source.matchAll(headingRe)) {
		const marks = match[1] ?? "";
		const raw = match[2] ?? "";
		const text = plainHeadingText(raw);
		if (!text) {
			continue;
		}
		const depth = marks.length === 2 ? 2 : 3;
		entries.push({
			depth,
			text,
			id: slugger.slug(text),
		});
	}

	return entries;
}
