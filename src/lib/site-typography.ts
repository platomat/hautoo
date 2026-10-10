import {
	DEFAULT_SITE_TYPOGRAPHY,
	HEADING_LEVELS,
	getSiteFontMeta,
	siteFontStack,
	type SiteFontId,
	type SiteTypographyConfig,
} from "../cms/fields/site-typography";
import { getSiteConfig } from "./site-config";

export function getSiteTypographyConfig(): SiteTypographyConfig {
	const config = getSiteConfig();
	return config.design?.typography ?? DEFAULT_SITE_TYPOGRAPHY;
}

/** Unique Fontsource IDs used by the current typography settings. */
export function getRequiredFontIds(
	typography: SiteTypographyConfig = getSiteTypographyConfig(),
): SiteFontId[] {
	return [...new Set([typography.bodyFont, typography.headingFont])];
}

/** Weights that must be present for the active fonts. */
export function getRequiredFontWeights(
	typography: SiteTypographyConfig = getSiteTypographyConfig(),
): number[] {
	const weights = new Set<number>([typography.bodyWeight]);
	for (const level of HEADING_LEVELS) {
		weights.add(typography.headings[level].weight);
	}
	return [...weights].sort((a, b) => a - b);
}

/**
 * Inline `:root` typography overrides from Design → Schrift.
 * Font faces live in `src/styles/fonts.generated.css` (sync-site-fonts).
 */
export function buildSiteTypographyRootCss(
	typography: SiteTypographyConfig = getSiteTypographyConfig(),
): string {
	const lines: string[] = [
		`--font-size-base: ${typography.baseSize}px;`,
		`--font-body: ${siteFontStack(typography.bodyFont)};`,
		`--font-heading: ${siteFontStack(typography.headingFont)};`,
		`--font-sans: ${siteFontStack(typography.bodyFont)};`,
		`--font-weight-body: ${typography.bodyWeight};`,
		`--font-weight-heading: ${typography.headings.h2.weight};`,
	];

	for (const level of HEADING_LEVELS) {
		const heading = typography.headings[level];
		lines.push(`--font-${level}-size: ${heading.size}rem;`);
		lines.push(`--font-${level}-weight: ${heading.weight};`);
		lines.push(`--font-${level}-transform: ${heading.transform};`);
	}

	return `:root {\n\t${lines.join("\n\t")}\n}`;
}

/** WOFF2 files to preload (latin subset only; latin-ext loads on demand). */
export function getFontPreloadHrefs(
	typography: SiteTypographyConfig = getSiteTypographyConfig(),
): string[] {
	const hrefs: string[] = [];
	const seen = new Set<string>();

	const add = (fontId: SiteFontId, weight: number) => {
		const href = `/fonts/${fontId}/${weight}-normal-latin.woff2`;
		if (seen.has(href)) {
			return;
		}
		seen.add(href);
		hrefs.push(href);
	};

	add(typography.bodyFont, typography.bodyWeight);
	for (const level of HEADING_LEVELS) {
		add(typography.headingFont, typography.headings[level].weight);
	}

	return hrefs;
}

export function describeSiteFonts(
	typography: SiteTypographyConfig = getSiteTypographyConfig(),
): string {
	const body = getSiteFontMeta(typography.bodyFont)?.label ?? typography.bodyFont;
	const heading =
		getSiteFontMeta(typography.headingFont)?.label ?? typography.headingFont;
	return body === heading ? body : `${body} / ${heading}`;
}
