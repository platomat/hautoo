import { createSatteriMarkdownProcessor } from "@astrojs/markdown-satteri";
import type { ArticleSort } from "./articles";
import type { GlossarSort } from "./glossar";
import { hastExternalLinks } from "./hast-external-links";
import type { TagSort } from "./tags";

export type ArticleListingEmbedProps = {
	count: number;
	sort: ArticleSort;
	layout: "grid" | "list";
	columns: number;
	/** Gap between items, in rem. */
	gap: number;
};

export type GlossarListingEmbedProps = {
	count: number;
	sort: GlossarSort;
	layout: "grid" | "list";
	columns: number;
	gap: number;
};

export type TagListingEmbedProps = {
	count: number;
	sort: TagSort;
	layout: "cloud" | "list" | "grid";
	columns: number;
	gap: number;
};

export type SeparatorEmbedProps = {
	/** Thickness in px. */
	height: number;
	/** Width in percent of the content column. */
	width: number;
};

export type ContentSegment =
	| { type: "html"; html: string }
	| { type: "article-listing"; props: ArticleListingEmbedProps }
	| { type: "glossar-listing"; props: GlossarListingEmbedProps }
	| { type: "tag-listing"; props: TagListingEmbedProps }
	| { type: "tag-cloud" }
	| { type: "separator"; props: SeparatorEmbedProps }
	| { type: "contact-email" };

const DEFAULT_LISTING: ArticleListingEmbedProps = {
	count: 3,
	sort: "newest",
	layout: "grid",
	columns: 3,
	gap: 1.25,
};

const DEFAULT_GLOSSAR_LISTING: GlossarListingEmbedProps = {
	count: 0,
	sort: "title-asc",
	layout: "list",
	columns: 2,
	gap: 1.5,
};

const DEFAULT_TAG_LISTING: TagListingEmbedProps = {
	count: 0,
	sort: "title-asc",
	layout: "cloud",
	columns: 3,
	gap: 1.25,
};

const DEFAULT_SEPARATOR: SeparatorEmbedProps = {
	height: 1,
	width: 100,
};

/** Line must be only the embed (optional attrs). */
const EMBED_LINE =
	/^\{\{(?<name>article-listing|glossar-listing|tag-listing|tag-cloud|separator|contact-email)(?<attrs>[^}]*)\}\}\s*$/gm;

const ARTICLE_SORTS = new Set<ArticleSort>([
	"newest",
	"oldest",
	"title-asc",
	"title-desc",
]);

const GLOSSAR_SORTS = new Set<GlossarSort>([
	"title-asc",
	"title-desc",
	"newest",
	"oldest",
]);

const TAG_SORTS = new Set<TagSort>(["title-asc", "title-desc", "most-used"]);

let markdownProcessor: Awaited<
	ReturnType<typeof createSatteriMarkdownProcessor>
> | null = null;

async function getProcessor() {
	markdownProcessor ??= await createSatteriMarkdownProcessor({
		hastPlugins: [hastExternalLinks],
	});
	return markdownProcessor;
}

export function hasContentEmbeds(body: string | undefined): boolean {
	if (!body) {
		return false;
	}
	EMBED_LINE.lastIndex = 0;
	return EMBED_LINE.test(body);
}

export function hasArticleListingEmbed(body: string | undefined): boolean {
	if (!body) {
		return false;
	}
	return /\{\{article-listing\b/.test(body);
}

export function hasGlossarListingEmbed(body: string | undefined): boolean {
	if (!body) {
		return false;
	}
	return /\{\{glossar-listing\b/.test(body);
}

export function hasTagListingEmbed(body: string | undefined): boolean {
	if (!body) {
		return false;
	}
	return /\{\{tag-listing\b/.test(body);
}

/** Wide content column for card/list embeds. */
export function hasWideListingEmbed(body: string | undefined): boolean {
	return (
		hasArticleListingEmbed(body) ||
		hasGlossarListingEmbed(body) ||
		hasTagListingEmbed(body)
	);
}

function parseAttrs(raw: string): Record<string, string> {
	const out: Record<string, string> = {};
	const re = /(\w+)="([^"]*)"/g;
	for (const match of raw.matchAll(re)) {
		out[match[1] ?? ""] = match[2] ?? "";
	}
	return out;
}

function clampInt(
	value: string | undefined,
	fallback: number,
	min: number,
	max: number,
): number {
	const n = Number.parseInt(value ?? "", 10);
	if (!Number.isFinite(n)) {
		return fallback;
	}
	return Math.min(max, Math.max(min, n));
}

function clampRem(
	value: string | undefined,
	fallback: number,
	min: number,
	max: number,
): number {
	const n = Number.parseFloat((value ?? "").replace(/rem$/i, ""));
	if (!Number.isFinite(n)) {
		return fallback;
	}
	return Math.min(max, Math.max(min, n));
}

export function parseArticleListingProps(
	attrsRaw: string | undefined,
): ArticleListingEmbedProps {
	const attrs = parseAttrs(attrsRaw ?? "");
	const sort = ARTICLE_SORTS.has(attrs.sort as ArticleSort)
		? (attrs.sort as ArticleSort)
		: DEFAULT_LISTING.sort;
	const layout = attrs.layout === "list" ? "list" : "grid";
	return {
		/** `0` = all published articles (no limit). */
		count: clampInt(attrs.count, DEFAULT_LISTING.count, 0, 48),
		sort,
		layout,
		columns: clampInt(attrs.columns, DEFAULT_LISTING.columns, 1, 4),
		gap: clampRem(attrs.gap, DEFAULT_LISTING.gap, 0, 8),
	};
}

export function parseGlossarListingProps(
	attrsRaw: string | undefined,
): GlossarListingEmbedProps {
	const attrs = parseAttrs(attrsRaw ?? "");
	const sort = GLOSSAR_SORTS.has(attrs.sort as GlossarSort)
		? (attrs.sort as GlossarSort)
		: DEFAULT_GLOSSAR_LISTING.sort;
	const layout = attrs.layout === "grid" ? "grid" : "list";
	return {
		/** `0` = all public entries (no limit). */
		count: clampInt(attrs.count, DEFAULT_GLOSSAR_LISTING.count, 0, 48),
		sort,
		layout,
		columns: clampInt(attrs.columns, DEFAULT_GLOSSAR_LISTING.columns, 1, 4),
		gap: clampRem(attrs.gap, DEFAULT_GLOSSAR_LISTING.gap, 0, 8),
	};
}

export function parseTagListingProps(
	attrsRaw: string | undefined,
): TagListingEmbedProps {
	const attrs = parseAttrs(attrsRaw ?? "");
	const sort = TAG_SORTS.has(attrs.sort as TagSort)
		? (attrs.sort as TagSort)
		: DEFAULT_TAG_LISTING.sort;
	const layout =
		attrs.layout === "list" || attrs.layout === "grid"
			? attrs.layout
			: "cloud";
	return {
		/** `0` = all used tags (no limit). */
		count: clampInt(attrs.count, DEFAULT_TAG_LISTING.count, 0, 48),
		sort,
		layout,
		columns: clampInt(attrs.columns, DEFAULT_TAG_LISTING.columns, 1, 4),
		gap: clampRem(attrs.gap, DEFAULT_TAG_LISTING.gap, 0, 8),
	};
}

export function parseSeparatorProps(
	attrsRaw: string | undefined,
): SeparatorEmbedProps {
	const attrs = parseAttrs(attrsRaw ?? "");
	return {
		height: clampInt(attrs.height, DEFAULT_SEPARATOR.height, 1, 24),
		width: clampInt(
			(attrs.width ?? "").replace(/%$/, ""),
			DEFAULT_SEPARATOR.width,
			1,
			100,
		),
	};
}

/**
 * Split CMS Markdown on embed placeholders and render Markdown parts to HTML.
 */
export async function buildContentSegments(
	body: string | undefined,
): Promise<ContentSegment[]> {
	const source = body ?? "";
	if (!source.trim()) {
		return [];
	}

	const processor = await getProcessor();
	const segments: ContentSegment[] = [];
	let cursor = 0;
	EMBED_LINE.lastIndex = 0;

	for (const match of source.matchAll(EMBED_LINE)) {
		const index = match.index ?? 0;
		const before = source.slice(cursor, index).trim();
		if (before) {
			const { code } = await processor.render(before);
			if (code.trim()) {
				segments.push({ type: "html", html: code });
			}
		}

		const name = match.groups?.name ?? "";
		const attrs = match.groups?.attrs ?? "";
		if (name === "tag-cloud") {
			segments.push({ type: "tag-cloud" });
		} else if (name === "tag-listing") {
			segments.push({
				type: "tag-listing",
				props: parseTagListingProps(attrs),
			});
		} else if (name === "contact-email") {
			segments.push({ type: "contact-email" });
		} else if (name === "separator") {
			segments.push({
				type: "separator",
				props: parseSeparatorProps(attrs),
			});
		} else if (name === "article-listing") {
			segments.push({
				type: "article-listing",
				props: parseArticleListingProps(attrs),
			});
		} else if (name === "glossar-listing") {
			segments.push({
				type: "glossar-listing",
				props: parseGlossarListingProps(attrs),
			});
		}

		cursor = index + match[0].length;
	}

	const after = source.slice(cursor).trim();
	if (after) {
		const { code } = await processor.render(after);
		if (code.trim()) {
			segments.push({ type: "html", html: code });
		}
	}

	return segments;
}
