import { z } from "astro/zod";
import siteFontsCatalog from "./site-fonts.json";

/** Curated Fontsource IDs selectable in Design → Schrift. */
export const SITE_FONT_OPTIONS = siteFontsCatalog.fonts;

export const SITE_FONT_IDS = SITE_FONT_OPTIONS.map((font) => font.id) as [
	string,
	...string[],
];

export const siteFontIdSchema = z.enum(SITE_FONT_IDS);

export type SiteFontId = z.infer<typeof siteFontIdSchema>;

export const FONT_WEIGHT_VALUES = [300, 400, 500, 600, 700] as const;

export const fontWeightSchema = z.preprocess(
	(value) =>
		typeof value === "string" && value.trim() !== ""
			? Number(value)
			: value,
	z.union([
		z.literal(300),
		z.literal(400),
		z.literal(500),
		z.literal(600),
		z.literal(700),
	]),
);

export type FontWeight = z.infer<typeof fontWeightSchema>;

export const textTransformSchema = z.enum([
	"none",
	"capitalize",
	"uppercase",
	"lowercase",
]);

export type TextTransform = z.infer<typeof textTransformSchema>;

export const HEADING_LEVELS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

export type HeadingLevel = (typeof HEADING_LEVELS)[number];

/** Per-level heading typography (size in rem relative to base). */
export const siteHeadingLevelSchema = z.object({
	/** Font size in rem (1 = base size). */
	size: z.coerce.number().min(0.5).max(4).default(1),
	weight: fontWeightSchema.default(500),
	transform: textTransformSchema.default("none"),
});

export type SiteHeadingLevelConfig = z.infer<typeof siteHeadingLevelSchema>;

const defaultHeadingLevel = (
	size: number,
	weight: FontWeight = 500,
): SiteHeadingLevelConfig => ({
	size,
	weight,
	transform: "none",
});

export const siteHeadingsConfigSchema = z.object({
	h1: siteHeadingLevelSchema.default(defaultHeadingLevel(2)),
	h2: siteHeadingLevelSchema.default(defaultHeadingLevel(1.5)),
	h3: siteHeadingLevelSchema.default(defaultHeadingLevel(1.25)),
	h4: siteHeadingLevelSchema.default(defaultHeadingLevel(1.125)),
	h5: siteHeadingLevelSchema.default(defaultHeadingLevel(1)),
	h6: siteHeadingLevelSchema.default(defaultHeadingLevel(0.875)),
});

export type SiteHeadingsConfig = z.infer<typeof siteHeadingsConfigSchema>;

/** Design → Schrift (`design.typography`). */
export const siteTypographyConfigSchema = z.object({
	bodyFont: siteFontIdSchema.default("ubuntu"),
	headingFont: siteFontIdSchema.default("ubuntu"),
	/** Root `html` font-size in px (default browser 16). */
	baseSize: z.coerce.number().int().min(12).max(24).default(16),
	bodyWeight: fontWeightSchema.default(300),
	headings: siteHeadingsConfigSchema.default({}),
});

export type SiteTypographyConfig = z.infer<typeof siteTypographyConfigSchema>;

export const DEFAULT_SITE_TYPOGRAPHY: SiteTypographyConfig =
	siteTypographyConfigSchema.parse({});

export function getSiteFontMeta(id: string) {
	return SITE_FONT_OPTIONS.find((font) => font.id === id);
}

export function siteFontStack(id: SiteFontId): string {
	const meta = getSiteFontMeta(id);
	const family = meta?.family ?? "Ubuntu";
	const fallback = meta?.fallback ?? "system-ui, sans-serif";
	return `"${family}", ${fallback}`;
}
