import contentRaw from "../content/settings/content.json" with { type: "json" };
import designRaw from "../content/settings/design.json" with { type: "json" };
import generalRaw from "../content/settings/general.json" with { type: "json" };
import {
	DEFAULT_SITE_GENERAL_CONFIG,
	DEFAULT_SITE_HEADER_CONFIG,
	DEFAULT_SITE_HERO_CONFIG,
	DEFAULT_SITE_TOC_CONFIG,
	siteConfigSchema,
	siteContentConfigSchema,
	siteDesignConfigSchema,
	siteGeneralConfigSchema,
	type EntryHeroFields,
	type HeroTextAlign,
	type SiteConfig,
	type SiteHeaderConfig,
	type SiteHeroConfig,
	type SiteTocCollectionConfig,
	type SiteTocConfig,
} from "../cms/fields/site-config";

/**
 * Merge CMS settings JSON files (like cdr-legal `src/content/settings/`).
 * Loaded via direct import — not an Astro content collection.
 */
export function getSiteConfig(): SiteConfig {
	return siteConfigSchema.parse({
		general: siteGeneralConfigSchema.parse(generalRaw),
		design: siteDesignConfigSchema.parse(designRaw),
		content: siteContentConfigSchema.parse(contentRaw),
	});
}

/** Brand / site name from CMS (header wordmark, title suffix, og:site_name). */
export function getSiteWebsiteTitle(): string {
	const config = getSiteConfig();
	return (
		config.general?.websiteTitle?.trim() ||
		DEFAULT_SITE_GENERAL_CONFIG.websiteTitle
	);
}

export function getSiteHeaderConfig(): SiteHeaderConfig {
	const config = getSiteConfig();
	return config.design?.header ?? DEFAULT_SITE_HEADER_CONFIG;
}

export function getSiteHeroConfig(): SiteHeroConfig {
	const config = getSiteConfig();
	return config.design?.hero ?? DEFAULT_SITE_HERO_CONFIG;
}

export type ResolvedHeroSettings = {
	textAlign: HeroTextAlign;
	showBreadcrumbs: boolean;
	borderBottom: boolean;
};

/**
 * Merge entry hero fields with global Design → Hero.
 * Missing local values → global defaults.
 */
export function resolveHeroSettings(
	entry: EntryHeroFields,
	globalHero: SiteHeroConfig = DEFAULT_SITE_HERO_CONFIG,
): ResolvedHeroSettings {
	return {
		textAlign: entry.heroTextAlign ?? globalHero.textAlign,
		showBreadcrumbs:
			typeof entry.showBreadcrumbs === "boolean"
				? entry.showBreadcrumbs
				: globalHero.showBreadcrumbs,
		borderBottom:
			typeof entry.heroBorderBottom === "boolean"
				? entry.heroBorderBottom
				: globalHero.borderBottom,
	};
}

export function resolveHeroForEntry(
	entry: EntryHeroFields,
): ResolvedHeroSettings {
	return resolveHeroSettings(entry, getSiteHeroConfig());
}

export function getSiteTocConfig(): SiteTocConfig {
	const config = getSiteConfig();
	return config.content?.toc ?? DEFAULT_SITE_TOC_CONFIG;
}

export type TocCollectionKey = "pages" | "articles";

export type EntryTocFields = {
	showToc?: boolean | undefined;
	tocLevels?: Array<"h2" | "h3" | "h4"> | undefined;
	tocTitle?: string | undefined;
};

export type ResolvedTocSettings = {
	show: boolean;
	levels: Array<"h2" | "h3" | "h4">;
	title: string;
};

/**
 * Merge entry TOC fields with global config.
 * Missing `showToc` → global `enabled`; local true/false wins.
 * Empty/missing levels or title → global values for that collection.
 */
export function resolveTocSettings(
	entry: EntryTocFields,
	globalForCollection: SiteTocCollectionConfig,
): ResolvedTocSettings {
	const show =
		typeof entry.showToc === "boolean"
			? entry.showToc
			: globalForCollection.enabled;

	const levels =
		entry.tocLevels && entry.tocLevels.length > 0
			? entry.tocLevels
			: globalForCollection.levels;

	const title =
		entry.tocTitle?.trim() ||
		globalForCollection.title.trim() ||
		"Inhalt";

	return { show, levels, title };
}

export function resolveTocForCollection(
	collection: TocCollectionKey,
	entry: EntryTocFields,
): ResolvedTocSettings {
	const toc = getSiteTocConfig();
	const globalForCollection = toc[collection] ?? siteTocCollectionFallback();
	return resolveTocSettings(entry, globalForCollection);
}

function siteTocCollectionFallback(): SiteTocCollectionConfig {
	return DEFAULT_SITE_TOC_CONFIG.pages;
}
