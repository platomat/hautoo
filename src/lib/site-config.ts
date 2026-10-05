import { getEntry } from "astro:content";
import {
	DEFAULT_SITE_HEADER_CONFIG,
	siteConfigSchema,
	type SiteConfig,
	type SiteHeaderConfig,
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
	return config.header ?? DEFAULT_SITE_HEADER_CONFIG;
}
