import { z } from "astro/zod";

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

/** Root shape of `src/content/config/site.yaml`. */
export const siteConfigSchema = z.object({
	design: z
		.object({
			header: siteHeaderConfigSchema.default({}),
		})
		.default({}),
	content: z
		.object({
			toc: siteTocConfigSchema.default({}),
		})
		.default({}),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;

export const DEFAULT_SITE_HEADER_CONFIG: SiteHeaderConfig =
	siteHeaderConfigSchema.parse({});

export const DEFAULT_SITE_TOC_CONFIG: SiteTocConfig =
	siteTocConfigSchema.parse({});
