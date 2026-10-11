import {
	DEFAULT_SITE_SPACING_COLLECTION,
	type HeroCollectionKey,
	type SiteSpacingCollectionConfig,
} from "../cms/fields/site-config";
import { getSiteConfig } from "./site-config";

export type EntryLayoutSpacing = {
	layout?:
		| {
				afterHero?: number | undefined;
				beforeFooter?: number | undefined;
		  }
		| undefined;
};

export type ResolvedContentSpacing = SiteSpacingCollectionConfig;

/**
 * Merge entry `layout` spacing with Design → Abstand for that collection.
 * Missing local values → collection defaults.
 */
export function resolveContentSpacing(
	collection: HeroCollectionKey,
	entry?: EntryLayoutSpacing,
): ResolvedContentSpacing {
	const config = getSiteConfig();
	const globalForCollection =
		config.design?.spacing?.[collection] ?? DEFAULT_SITE_SPACING_COLLECTION;
	const local = entry?.layout;
	return {
		afterHero:
			typeof local?.afterHero === "number" && Number.isFinite(local.afterHero)
				? local.afterHero
				: globalForCollection.afterHero,
		beforeFooter:
			typeof local?.beforeFooter === "number" &&
			Number.isFinite(local.beforeFooter)
				? local.beforeFooter
				: globalForCollection.beforeFooter,
	};
}

/** Inline CSS custom properties for `.page` / `.page-hero`. */
export function contentSpacingStyle(spacing: ResolvedContentSpacing): string {
	return [
		`--page-space-after-hero: ${spacing.afterHero}rem`,
		`--page-space-before-footer: ${spacing.beforeFooter}rem`,
	].join("; ");
}
