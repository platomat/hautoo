import { z } from "astro/zod";
import { contentWidthSchema } from "./content-width";

const headerHeight = z.coerce.number().int().min(40).max(600);

const tocLevelSchema = z.enum(["h2", "h3", "h4"]);

/** Sticky header + bar heights (CMS group Design). Order: min heights → sticky toggles → sticky heights. */
export const siteHeaderConfigSchema = z.object({
	/** Resting bar height at page top; also min-height when sticky is off. */
	minHeightDesktop: headerHeight.default(64),
	minHeightTablet: headerHeight.default(64),
	minHeightMobile: headerHeight.default(56),
	/** `position: sticky` from desktop breakpoint (≥ 1024px). */
	stickyDesktop: z.boolean().default(true),
	/** Sticky on tablet (680–1023px). */
	stickyTablet: z.boolean().default(true),
	/** Sticky on mobile (< 680px). */
	stickyMobile: z.boolean().default(true),
	/** Compact bar height after sticky engages on scroll. */
	heightDesktop: headerHeight.default(64),
	heightTablet: headerHeight.default(64),
	heightMobile: headerHeight.default(56),
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

/** Hex from Sveltia color widget (`#RGB` / `#RRGGBB` / `#RRGGBBAA`, any case). */
const cssHexColor = z
	.string()
	.trim()
	.regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, "Invalid CSS hex color");

/** Design → Farbpalette (`design.colors`). Defaults match `global.css` :root. */
export const siteColorsConfigSchema = z.object({
	bg: cssHexColor.default("#0f1412"),
	surface: cssHexColor.default("#1a211e"),
	/** 8-digit hex with alpha preferred (Sveltia `enableAlpha`). */
	surfaceGlass: cssHexColor.default("#1a211ee6"),
	surfaceRaised: cssHexColor.default("#232b27"),
	border: cssHexColor.default("#2e3833"),
	text: cssHexColor.default("#e8eeea"),
	textMuted: cssHexColor.default("#9aa89f"),
	action: cssHexColor.default("#3dcf8e"),
	actionHover: cssHexColor.default("#56d9a0"),
	actionMuted: cssHexColor.default("#1a3d2e"),
	danger: cssHexColor.default("#e57373"),
});

export type SiteColorsConfig = z.infer<typeof siteColorsConfigSchema>;

/** `src/content/settings/design.json` */
export const siteDesignConfigSchema = z.object({
	colors: siteColorsConfigSchema.default({}),
	header: siteHeaderConfigSchema.default({}),
	hero: z.preprocess(
		normalizeHeroByCollection,
		siteHeroByCollectionSchema.default({}),
	),
});

export type SiteDesignConfig = z.infer<typeof siteDesignConfigSchema>;

export const DEFAULT_SITE_COLORS: SiteColorsConfig =
	siteColorsConfigSchema.parse({});

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
