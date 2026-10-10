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
	/** Min bar height in px (desktop). */
	heightDesktop: headerHeight.default(64),
	heightTablet: headerHeight.default(64),
	heightMobile: headerHeight.default(56),
});

export type SiteHeaderConfig = z.infer<typeof siteHeaderConfigSchema>;

export const heroTextAlignSchema = z.enum(["left", "center", "right"]);

export type HeroTextAlign = z.infer<typeof heroTextAlignSchema>;

/** Hero block defaults (CMS group Design → Hero). */
export const siteHeroConfigSchema = z.object({
	/** Alignment for breadcrumbs, title, and description. */
	textAlign: heroTextAlignSchema.default("left"),
	/** Show breadcrumb trail above the title. */
	showBreadcrumbs: z.boolean().default(true),
	/** 1px border under the hero block. */
	borderBottom: z.boolean().default(false),
});

export type SiteHeroConfig = z.infer<typeof siteHeroConfigSchema>;

/** Per-entry hero overrides (omit = use global Design → Hero). */
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
	hero: siteHeroConfigSchema.default({}),
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
