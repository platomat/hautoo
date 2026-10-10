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
	type BreadcrumbSeparator,
	type EntryHero,
	type EntryToc,
	type HeroCollectionKey,
	type HeroTextAlign,
	type SiteConfig,
	type SiteHeaderConfig,
	type SiteHeroConfig,
	type SiteTocCollectionConfig,
	type SiteTocConfig,
} from "../cms/fields/site-config";

export type { HeroCollectionKey };

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

/** Hero defaults for one collection (Design → Hero → Seiten/Artikel/…). */
export function getSiteHeroConfig(
	collection: HeroCollectionKey = "pages",
): SiteHeroConfig {
	const config = getSiteConfig();
	return config.design?.hero?.[collection] ?? DEFAULT_SITE_HERO_CONFIG;
}

export type ResolvedHeroSettings = {
	textAlign: HeroTextAlign;
	showBreadcrumbs: boolean;
	breadcrumbSeparator: BreadcrumbSeparator;
	borderBottom: boolean;
};

/**
 * Merge entry `hero` object with Design → Hero for that collection.
 * Missing local values → collection defaults.
 */
export function resolveHeroSettings(
	entry: EntryHero | undefined,
	globalHero: SiteHeroConfig = DEFAULT_SITE_HERO_CONFIG,
): ResolvedHeroSettings {
	return {
		textAlign: entry?.textAlign ?? globalHero.textAlign,
		showBreadcrumbs:
			typeof entry?.showBreadcrumbs === "boolean"
				? entry.showBreadcrumbs
				: globalHero.showBreadcrumbs,
		breadcrumbSeparator: globalHero.breadcrumbSeparator,
		borderBottom:
			typeof entry?.borderBottom === "boolean"
				? entry.borderBottom
				: globalHero.borderBottom,
	};
}

export function resolveHeroForEntry(
	entry: EntryHero | undefined,
	collection: HeroCollectionKey = "pages",
): ResolvedHeroSettings {
	return resolveHeroSettings(entry, getSiteHeroConfig(collection));
}

export function getSiteTocConfig(): SiteTocConfig {
	const config = getSiteConfig();
	return config.content?.toc ?? DEFAULT_SITE_TOC_CONFIG;
}

export type TocCollectionKey = "pages" | "articles";

export type EntryWithToc = {
	toc?: EntryToc;
};

export type ResolvedTocSettings = {
	show: boolean;
	levels: Array<"h2" | "h3" | "h4">;
	title: string;
};

/**
 * Merge entry `toc` object with global config.
 * Missing `toc.show` → global `enabled`; local true/false wins.
 * Empty/missing levels or title → global values for that collection.
 */
export function resolveTocSettings(
	entryToc: EntryToc | undefined,
	globalForCollection: SiteTocCollectionConfig,
): ResolvedTocSettings {
	const show =
		typeof entryToc?.show === "boolean"
			? entryToc.show
			: globalForCollection.enabled;

	const levels =
		entryToc?.levels && entryToc.levels.length > 0
			? entryToc.levels
			: globalForCollection.levels;

	const title =
		entryToc?.title?.trim() ||
		globalForCollection.title.trim() ||
		"Inhalt";

	return { show, levels, title };
}

export function resolveTocForCollection(
	collection: TocCollectionKey,
	entry: EntryWithToc,
): ResolvedTocSettings {
	const toc = getSiteTocConfig();
	const globalForCollection = toc[collection] ?? siteTocCollectionFallback();
	return resolveTocSettings(entry.toc, globalForCollection);
}

function siteTocCollectionFallback(): SiteTocCollectionConfig {
	return DEFAULT_SITE_TOC_CONFIG.pages;
}
