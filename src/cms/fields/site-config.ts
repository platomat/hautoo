import { z } from "astro/zod";
import { contentWidthSchema } from "./content-width";

const headerHeight = z.coerce.number().int().min(40).max(160);

const tocLevelSchema = z.enum(["h2", "h3", "h4"]);

/** Sticky header + bar heights (CMS group Design). */
export const siteHeaderConfigSchema = z.object({
	/** `position: sticky` from desktop breakpoint (≥ 1024px). */
	stickyDesktop: z.boolean().default(true),
	/** Sticky on tablet (680–1023px). */
	stickyTablet: z.boolean().default(true),
	/** Sticky on mobile (< 680px). */
	stickyMobile: z.boolean().default(true),
	/** Fixed bar height when sticky (desktop). */
	heightDesktop: headerHeight.default(64),
	heightTablet: headerHeight.default(64),
	heightMobile: headerHeight.default(56),
	/** Min bar height when not sticky (desktop). */
	minHeightDesktop: headerHeight.default(64),
	minHeightTablet: headerHeight.default(64),
	minHeightMobile: headerHeight.default(56),
});

export type SiteHeaderConfig = z.infer<typeof siteHeaderConfigSchema>;

export const heroTextAlignSchema = z.enum(["left", "center", "right"]);

export type HeroTextAlign = z.infer<typeof heroTextAlignSchema>;

/** Separator between breadcrumb items (CMS Design → Hero per collection). */
export const breadcrumbSeparatorSchema = z.enum(["/", "•", "→", "-"]);

export type BreadcrumbSeparator = z.infer<typeof breadcrumbSeparatorSchema>;

/** Hero block defaults for one collection (CMS Design → Hero → …). */
export const siteHeroConfigSchema = z.object({
	/** Alignment for breadcrumbs, title, and description. */
	textAlign: heroTextAlignSchema.default("left"),
	/** Show breadcrumb trail above the title. */
	showBreadcrumbs: z.boolean().default(true),
	/** Character between breadcrumb crumbs. */
	breadcrumbSeparator: breadcrumbSeparatorSchema.default("/"),
	/** 1px border under the hero block. */
	borderBottom: z.boolean().default(false),
});

export type SiteHeroConfig = z.infer<typeof siteHeroConfigSchema>;

/**
 * Collections with a public hero (order = CMS left rail).
 * Blocks/menus/settings have no public hero pages.
 */
export const HERO_COLLECTION_KEYS = [
	"pages",
	"articles",
	"categories",
	"tags",
	"glossar",
] as const;

export type HeroCollectionKey = (typeof HERO_COLLECTION_KEYS)[number];

/** Per-collection hero defaults (CMS Design → Hero). */
export const siteHeroByCollectionSchema = z.object({
	pages: siteHeroConfigSchema.default({}),
	articles: siteHeroConfigSchema.default({}),
	categories: siteHeroConfigSchema.default({}),
	tags: siteHeroConfigSchema.default({}),
	glossar: siteHeroConfigSchema.default({}),
});

export type SiteHeroByCollectionConfig = z.infer<
	typeof siteHeroByCollectionSchema
>;

/**
 * Accept legacy flat `hero: { textAlign, … }` and expand to all collections.
 */
export function normalizeHeroByCollection(raw: unknown): unknown {
	if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
		return raw;
	}
	const obj = raw as Record<string, unknown>;
	const looksFlat =
		("textAlign" in obj ||
			"showBreadcrumbs" in obj ||
			"breadcrumbSeparator" in obj ||
			"borderBottom" in obj) &&
		!("pages" in obj) &&
		!("articles" in obj);
	if (!looksFlat) {
		return raw;
	}
	return {
		pages: obj,
		articles: obj,
		categories: obj,
		tags: obj,
		glossar: obj,
	};
}

/** Per-entry hero overrides (omit = use Design → Hero for that collection). */
export const entryHeroFieldsSchema = z.object({
	heroTextAlign: heroTextAlignSchema.optional(),
	showBreadcrumbs: z.boolean().optional(),
	heroBorderBottom: z.boolean().optional(),
});

export type EntryHeroFields = z.infer<typeof entryHeroFieldsSchema>;

/** Per-collection TOC defaults (CMS group Content). */
export const siteTocCollectionSchema = z.object({
	/** Show TOC when entry does not set `showToc`. */
	enabled: z.boolean().default(false),
	levels: z.array(tocLevelSchema).default(["h2"]),
	title: z.string().default("Inhalt"),
});

export type SiteTocCollectionConfig = z.infer<typeof siteTocCollectionSchema>;

export const siteTocConfigSchema = z.object({
	pages: siteTocCollectionSchema.default({}),
	articles: siteTocCollectionSchema.default({}),
});

export type SiteTocConfig = z.infer<typeof siteTocConfigSchema>;

/** Default content column when entry omits `contentWidth` (and no listing auto-wide). */
export const siteWidthConfigSchema = z.object({
	pages: contentWidthSchema.default("default"),
	articles: contentWidthSchema.default("default"),
});

export type SiteWidthConfig = z.infer<typeof siteWidthConfigSchema>;

/** CMS group General (site name for chrome + document titles). */
export const siteGeneralConfigSchema = z.object({
	/** Brand / site name in header, title suffix, og:site_name. */
	websiteTitle: z.string().trim().min(1).default("hautuu"),
	/**
	 * Optional contact address for `{{contact-email}}`.
	 * When set, overrides env `CONTACT_EMAIL` at build time (value is public in Git).
	 */
	contactEmail: z.string().trim().default(""),
});

export type SiteGeneralConfig = z.infer<typeof siteGeneralConfigSchema>;

/** `src/content/settings/design.json` */
export const siteDesignConfigSchema = z.object({
	header: siteHeaderConfigSchema.default({}),
	hero: z.preprocess(
		normalizeHeroByCollection,
		siteHeroByCollectionSchema.default({}),
	),
});

export type SiteDesignConfig = z.infer<typeof siteDesignConfigSchema>;

/** `src/content/settings/content.json` */
export const siteContentConfigSchema = z.object({
	toc: siteTocConfigSchema.default({}),
	width: siteWidthConfigSchema.default({}),
});

export type SiteContentFileConfig = z.infer<typeof siteContentConfigSchema>;

/** Merged site settings (general + design + content JSON files). */
export const siteConfigSchema = z.object({
	general: siteGeneralConfigSchema.default({}),
	design: siteDesignConfigSchema.default({}),
	content: siteContentConfigSchema.default({}),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;

export const DEFAULT_SITE_GENERAL_CONFIG: SiteGeneralConfig =
	siteGeneralConfigSchema.parse({});

export const DEFAULT_SITE_HEADER_CONFIG: SiteHeaderConfig =
	siteHeaderConfigSchema.parse({});

export const DEFAULT_SITE_HERO_CONFIG: SiteHeroConfig =
	siteHeroConfigSchema.parse({});

export const DEFAULT_SITE_TOC_CONFIG: SiteTocConfig =
	siteTocConfigSchema.parse({});

export const DEFAULT_SITE_WIDTH_CONFIG: SiteWidthConfig =
	siteWidthConfigSchema.parse({});
