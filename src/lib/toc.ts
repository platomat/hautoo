import GithubSlugger from "github-slugger";

export type TocDepth = 2 | 3 | 4;

export type TocEntry = {
	depth: TocDepth;
	text: string;
	id: string;
};

export type TocLevelName = "h2" | "h3" | "h4";

export const DEFAULT_TOC_LEVELS: TocLevelName[] = ["h2"];
export const DEFAULT_TOC_TITLE = "Inhalt";

const LEVEL_TO_DEPTH: Record<TocLevelName, TocDepth> = {
	h2: 2,
	h3: 3,
	h4: 4,
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

export function normalizeTocLevels(
	levels: string[] | undefined | null,
): TocDepth[] {
	const depths = new Set<TocDepth>();
	for (const level of levels ?? []) {
		const key = String(level).trim().toLowerCase() as TocLevelName;
		if (key in LEVEL_TO_DEPTH) {
			depths.add(LEVEL_TO_DEPTH[key]);
		}
	}
	if (depths.size === 0) {
		return DEFAULT_TOC_LEVELS.map((name) => LEVEL_TO_DEPTH[name]);
	}
	return [...depths].sort((a, b) => a - b);
}

export function resolveTocTitle(title: string | undefined | null): string {
	const trimmed = title?.trim();
	return trimmed || DEFAULT_TOC_TITLE;
}

/**
 * Collect headings from Markdown body for the given depths (h2–h4).
 * IDs match Astro/Satteri via github-slugger (same as rendered heading anchors).
 */
export function extractTocEntries(
	body: string | undefined,
	levels?: string[] | null,
): TocEntry[] {
	if (!body?.trim()) {
		return [];
	}

	const allowed = new Set(normalizeTocLevels(levels));
	const source = stripFencedCode(body);
	const slugger = new GithubSlugger();
	const entries: TocEntry[] = [];
	const headingRe = /^(#{2,4})\s+(.+?)\s*#*\s*$/gm;

	for (const match of source.matchAll(headingRe)) {
		const marks = match[1] ?? "";
		const raw = match[2] ?? "";
		const text = plainHeadingText(raw);
		if (!text) {
			continue;
		}
		const depth = marks.length as TocDepth;
		if (!allowed.has(depth)) {
			continue;
		}
		entries.push({
			depth,
			text,
			id: slugger.slug(text),
		});
	}

	return entries;
}
