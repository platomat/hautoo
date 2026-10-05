import { z } from "astro/zod";

const headerHeight = z.coerce.number().int().min(40).max(160);

/** Header block inside `src/content/config/site.yaml`. */
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

/** Root shape of the site config YAML file. */
export const siteConfigSchema = z.object({
	header: siteHeaderConfigSchema.default({}),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;

export const DEFAULT_SITE_HEADER_CONFIG: SiteHeaderConfig =
	siteHeaderConfigSchema.parse({});
