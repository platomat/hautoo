import { getEntry } from "astro:content";
import {
	DEFAULT_SITE_HEADER_CONFIG,
	DEFAULT_SITE_TOC_CONFIG,
	siteConfigSchema,
	type SiteConfig,
	type SiteHeaderConfig,
	type SiteTocCollectionConfig,
	type SiteTocConfig,
} from "../cms/fields/site-config";

/** Load `src/content/config/site.yaml` with Zod defaults. */
export async function getSiteConfig(): Promise<SiteConfig> {
	const entry = await getEntry("config", "site");
	if (!entry) {
		return siteConfigSchema.parse({});
	}
	return siteConfigSchema.parse(entry.data);
}

export async function getSiteHeaderConfig(): Promise<SiteHeaderConfig> {
	const config = await getSiteConfig();
	return config.design?.header ?? DEFAULT_SITE_HEADER_CONFIG;
}

export async function getSiteTocConfig(): Promise<SiteTocConfig> {
	const config = await getSiteConfig();
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

export async function resolveTocForCollection(
	collection: TocCollectionKey,
	entry: EntryTocFields,
): Promise<ResolvedTocSettings> {
	const toc = await getSiteTocConfig();
	const globalForCollection = toc[collection] ?? siteTocCollectionFallback();
	return resolveTocSettings(entry, globalForCollection);
}

function siteTocCollectionFallback(): SiteTocCollectionConfig {
	return DEFAULT_SITE_TOC_CONFIG.pages;
}
