import { createSatteriMarkdownProcessor } from "@astrojs/markdown-satteri";
import type { ArticleSort } from "./articles";
import { getPublicBlock } from "./blocks";
import type { GlossarSort } from "./glossar";
import { hastCmsAssets } from "./hast-cms-assets";
import { hastExternalLinks } from "./hast-external-links";
import type { TagSort } from "./tags";
import { parseRepoDocProps, type RepoDocEmbedProps } from "./repodoc";
import type { VideoProvider } from "./video";
import { normalizeVideoId } from "./video";

/** Fields shown on article listing cards (CMS `show="…"`). */
export type ArticleCardField =
	| "title"
	| "intro"
	| "date"
	| "readingTime"
	| "tags";

export const ARTICLE_CARD_FIELDS = [
	"title",
	"intro",
	"tags",
	"date",
	"readingTime",
] as const satisfies readonly ArticleCardField[];

export type ArticleListingEmbedProps = {
	count: number;
	sort: ArticleSort;
	layout: "grid" | "list";
	columns: number;
	/** Gap between items, in rem. */
	gap: number;
	/** Which card fields to render. */
	show: ArticleCardField[];
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

export type VideoEmbedProps = {
	provider: VideoProvider;
	id: string;
	title: string;
	poster?: string;
};

export type ContentSegment =
	| { type: "html"; html: string }
	| { type: "article-listing"; props: ArticleListingEmbedProps }
	| { type: "glossar-listing"; props: GlossarListingEmbedProps }
	| { type: "tag-listing"; props: TagListingEmbedProps }
	| { type: "tag-cloud" }
	| { type: "separator"; props: SeparatorEmbedProps }
	| { type: "contact-email" }
	| { type: "repodoc"; props: RepoDocEmbedProps }
	| { type: "video"; props: VideoEmbedProps }
	| { type: "video-consent-reset" };

const DEFAULT_SHOW: ArticleCardField[] = [
	"title",
	"intro",
	"tags",
	"date",
	"readingTime",
];

const DEFAULT_LISTING: ArticleListingEmbedProps = {
	count: 3,
	sort: "newest",
	layout: "grid",
	columns: 3,
	gap: 1.25,
	show: DEFAULT_SHOW,
};

const ARTICLE_CARD_FIELD_SET = new Set<string>(ARTICLE_CARD_FIELDS);

export function parseArticleCardShow(
	raw: string | undefined,
): ArticleCardField[] {
	if (!raw?.trim()) return [...DEFAULT_SHOW];
	const fields = raw
		.split(/[,\s]+/)
		.map((part) => part.trim())
		.filter((part): part is ArticleCardField =>
			ARTICLE_CARD_FIELD_SET.has(part),
		);
	return fields.length > 0 ? fields : [...DEFAULT_SHOW];
}

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
	/^\{\{(?<name>article-listing|glossar-listing|tag-listing|tag-cloud|separator|contact-email|repodoc|block|video|video-consent-reset)(?<attrs>[^}]*)\}\}\s*$/gm;

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
		hastPlugins: [hastCmsAssets, hastExternalLinks],
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

/** Wide content column for card/list embeds (direct markers only). */
export function hasWideListingEmbed(body: string | undefined): boolean {
	return (
		hasArticleListingEmbed(body) ||
		hasGlossarListingEmbed(body) ||
		hasTagListingEmbed(body)
	);
}

export function hasBlockEmbed(body: string | undefined): boolean {
	if (!body) {
		return false;
	}
	return /\{\{block\b/.test(body);
}

/** True if body (incl. nested public blocks) needs the wide content column. */
export async function contentNeedsWideLayout(
	body: string | undefined,
): Promise<boolean> {
	if (hasWideListingEmbed(body)) {
		return true;
	}
	if (!hasBlockEmbed(body)) {
		return false;
	}
	const segments = await buildContentSegments(body);
	return segments.some(
		(segment) =>
			segment.type === "article-listing" ||
			segment.type === "glossar-listing" ||
			segment.type === "tag-listing",
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
		show: parseArticleCardShow(attrs.show),
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

export function parseVideoEmbedProps(
	attrsRaw: string | undefined,
): VideoEmbedProps | undefined {
	const attrs = parseAttrs(attrsRaw ?? "");
	const provider =
		attrs.provider === "youtube" || attrs.provider === "vimeo"
			? attrs.provider
			: undefined;
	if (!provider) {
		return undefined;
	}
	const id = normalizeVideoId(provider, attrs.id ?? attrs.url ?? "");
	if (!id) {
		return undefined;
	}
	const title = (attrs.title ?? "Video").trim() || "Video";
	const poster = (attrs.poster ?? "").trim() || undefined;
	return { provider, id, title, poster };
}

function parseBlockId(attrsRaw: string | undefined): string {
	const attrs = parseAttrs(attrsRaw ?? "");
	return (attrs.id ?? attrs.slug ?? "").trim();
}

/**
 * Split CMS Markdown on embed placeholders and render Markdown parts to HTML.
 * `{{block id="slug"}}` expands nested public block bodies (cycle-safe).
 */
export async function buildContentSegments(
	body: string | undefined,
	options?: { visitedBlocks?: Set<string> },
): Promise<ContentSegment[]> {
	const source = body ?? "";
	if (!source.trim()) {
		return [];
	}

	const processor = await getProcessor();
	const segments: ContentSegment[] = [];
	const visitedBlocks = options?.visitedBlocks ?? new Set<string>();
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
		} else if (name === "repodoc") {
			const props = parseRepoDocProps(attrs);
			if (props) {
				segments.push({ type: "repodoc", props });
			}
		} else if (name === "video") {
			const props = parseVideoEmbedProps(attrs);
			if (props) {
				segments.push({ type: "video", props });
			}
		} else if (name === "video-consent-reset") {
			segments.push({ type: "video-consent-reset" });
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
		} else if (name === "block") {
			const id = parseBlockId(attrs);
			if (id && !visitedBlocks.has(id)) {
				visitedBlocks.add(id);
				const block = await getPublicBlock(id);
				if (block?.body) {
					const nested = await buildContentSegments(block.body, {
						visitedBlocks,
					});
					segments.push(...nested);
				}
			}
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
