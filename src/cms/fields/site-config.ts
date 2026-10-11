import { z } from "astro/zod";
import { contentWidthSchema } from "./content-width";
import { siteTypographyConfigSchema } from "./site-typography";

const headerHeight = z.coerce.number().int().min(40).max(600);

const tocLevelSchema = z.enum(["h2", "h3", "h4"]);

/** Sticky header + bar heights (CMS group Design). Order: min heights → sticky toggles → sticky heights. */
export const siteHeaderConfigSchema = z.object({
	/** Resting bar height at page top; also min-height when sticky is off. */
	minHeightDesktop: headerHeight.default(64),
	minHeightTablet: headerHeight.default(64),
	minHeightMobile: headerHeight.default(56),
	/** `position: sticky` from desktop breakpoint (≥ 1024px). */
	stickyDesktop: z.boolean().default(true),
	/** Sticky on tablet (680–1023px). */
	stickyTablet: z.boolean().default(true),
	/** Sticky on mobile (< 680px). */
	stickyMobile: z.boolean().default(true),
	/** Compact bar height after sticky engages on scroll. */
	heightDesktop: headerHeight.default(64),
	heightTablet: headerHeight.default(64),
	heightMobile: headerHeight.default(56),
});

export type SiteHeaderConfig = z.infer<typeof siteHeaderConfigSchema>;

export const heroTextAlignSchema = z.enum(["left", "center", "right"]);

export type HeroTextAlign = z.infer<typeof heroTextAlignSchema>;

/** Separator between breadcrumb items (CMS Design → Hero per collection). */
export const breadcrumbSeparatorSchema = z.enum(["/", "•", "→", "-"]);

export type BreadcrumbSeparator = z.infer<typeof breadcrumbSeparatorSchema>;

/** Separator between site name and footer copyright claim (CMS General). */
export const footerCopyrightSeparatorSchema = z.enum(["•", "-", "—", "/"]);

export type FooterCopyrightSeparator = z.infer<
	typeof footerCopyrightSeparatorSchema
>;

/** Optional claim after © year + site name in the footer. */
export const footerCopyrightConfigSchema = z.object({
	/**
	 * Text or HTML (same allowlist as background.attribution: `<a href>`).
	 * Empty = only © year and site name.
	 */
	claim: z.string().trim().default(""),
	/** Character between site name and claim. */
	separator: footerCopyrightSeparatorSchema.default("•"),
});

export type FooterCopyrightConfig = z.infer<typeof footerCopyrightConfigSchema>;

/** Hero block defaults for one collection (CMS Design → Hero → …). */
export const siteHeroConfigSchema = z.object({
	/** Alignment for breadcrumbs, title, and description. */
	textAlign: heroTextAlignSchema.default("left"),
	/** Show breadcrumb trail above the title. */
	showBreadcrumbs: z.boolean().default(true),
	/** Character between breadcrumb crumbs. */
	breadcrumbSeparator: breadcrumbSeparatorSchema.default("/"),
	/** 1px border under the hero block. */
	borderBottom: z.boolean().default(false),
});

export type SiteHeroConfig = z.infer<typeof siteHeroConfigSchema>;

/**
 * Collections with a public hero (order = CMS left rail).
 * Blocks/menus/settings have no public hero pages.
 */
export const HERO_COLLECTION_KEYS = [
	"pages",
	"articles",
	"categories",
	"tags",
	"authors",
	"glossar",
] as const;

export type HeroCollectionKey = (typeof HERO_COLLECTION_KEYS)[number];

/** Per-collection hero defaults (CMS Design → Hero). */
export const siteHeroByCollectionSchema = z.object({
	pages: siteHeroConfigSchema.default({}),
	articles: siteHeroConfigSchema.default({}),
	categories: siteHeroConfigSchema.default({}),
	tags: siteHeroConfigSchema.default({}),
	authors: siteHeroConfigSchema.default({}),
	glossar: siteHeroConfigSchema.default({}),
});

export type SiteHeroByCollectionConfig = z.infer<
	typeof siteHeroByCollectionSchema
>;

/**
 * Accept legacy flat `hero: { textAlign, … }` and expand to all collections.
 */
export function normalizeHeroByCollection(raw: unknown): unknown {
	if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
		return raw;
	}
	const obj = raw as Record<string, unknown>;
	const looksFlat =
		("textAlign" in obj ||
			"showBreadcrumbs" in obj ||
			"breadcrumbSeparator" in obj ||
			"borderBottom" in obj) &&
		!("pages" in obj) &&
		!("articles" in obj);
	if (!looksFlat) {
		return raw;
	}
	return {
		pages: obj,
		articles: obj,
		categories: obj,
		tags: obj,
		authors: obj,
		glossar: obj,
	};
}

/**
 * Per-entry hero overrides (CMS object `hero`).
 * Omit object or fields = Design → Hero for that collection.
 */
export const entryHeroSchema = z
	.object({
		textAlign: heroTextAlignSchema.optional(),
		showBreadcrumbs: z.boolean().optional(),
		borderBottom: z.boolean().optional(),
	})
	.optional();

export type EntryHero = z.infer<typeof entryHeroSchema>;

/** Per-entry TOC overrides (CMS object `toc`). */
export const entryTocSchema = z
	.object({
		/** Omit = global Content → TOC → enabled for this collection. */
		show: z.boolean().optional(),
		levels: z.array(tocLevelSchema).optional(),
		title: z.string().optional(),
	})
	.optional();

export type EntryToc = z.infer<typeof entryTocSchema>;

/** Per-collection TOC defaults (CMS group Content). */
export const siteTocCollectionSchema = z.object({
	/** Show TOC when entry omits `toc.show`. */
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

/** Default content column when entry omits `layout.contentWidth` (and no listing auto-wide). */
export const siteWidthConfigSchema = z.object({
	pages: contentWidthSchema.default("default"),
	articles: contentWidthSchema.default("default"),
});

export type SiteWidthConfig = z.infer<typeof siteWidthConfigSchema>;

/** Vertical gap after hero / before footer (rem), matching previous CSS defaults. */
export const siteSpacingRemSchema = z.coerce.number().min(0).max(12);

export const siteSpacingCollectionSchema = z.object({
	/** Margin below `.page-hero` before TOC/body. */
	afterHero: siteSpacingRemSchema.default(2.5),
	/** Bottom padding of `.page` before the site footer. */
	beforeFooter: siteSpacingRemSchema.default(4),
});

export type SiteSpacingCollectionConfig = z.infer<
	typeof siteSpacingCollectionSchema
>;

/** Per-collection content spacing (CMS Content → Abstand; same keys as Design → Hero). */
export const siteSpacingByCollectionSchema = z.object({
	pages: siteSpacingCollectionSchema.default({}),
	articles: siteSpacingCollectionSchema.default({}),
	categories: siteSpacingCollectionSchema.default({}),
	tags: siteSpacingCollectionSchema.default({}),
	authors: siteSpacingCollectionSchema.default({}),
	glossar: siteSpacingCollectionSchema.default({}),
});

/** Where authors appear on the article single view. */
export const authorArticlePlacementSchema = z.enum([
	"none",
	"hero",
	"after",
	"both",
]);

export type AuthorArticlePlacement = z.infer<
	typeof authorArticlePlacementSchema
>;

export const authorAvatarShapeSchema = z.enum(["round", "square"]);

export type AuthorAvatarShape = z.infer<typeof authorAvatarShapeSchema>;

/** CMS Content → Autoren: article byline + avatar shape. */
export const siteAuthorsConfigSchema = z.object({
	/** Hero and/or end of article (profile page always shows round avatar). */
	articlePlacement: authorArticlePlacementSchema.default("hero"),
	avatarShape: authorAvatarShapeSchema.default("round"),
});

export type SiteAuthorsConfig = z.infer<typeof siteAuthorsConfigSchema>;

export type SiteSpacingByCollectionConfig = z.infer<
	typeof siteSpacingByCollectionSchema
>;

export const DEFAULT_SITE_SPACING_COLLECTION: SiteSpacingCollectionConfig =
	siteSpacingCollectionSchema.parse({});

/** CMS group General (site name for chrome + document titles). */
export const siteGeneralConfigSchema = z.object({
	/** Brand / site name in header, title suffix, og:site_name. */
	websiteTitle: z.string().trim().min(1).default("hautuu"),
	/**
	 * Optional short description / slogan (#75).
	 * Stored for later UI use; not required on every page yet.
	 */
	websiteDescription: z.string().trim().default(""),
	/** Optional footer line after site name (claim + separator). */
	footerCopyright: footerCopyrightConfigSchema.default({}),
	/**
	 * Optional contact address for `{{contact-email}}`.
	 * When set, overrides env `CONTACT_EMAIL` at build time (value is public in Git).
	 */
	contactEmail: z.string().trim().default(""),
	/**
	 * Optional public GitHub repo (`owner/name`) for the footer center icon.
	 * Set for hautoo (`platomat/hautoo`); leave empty on forks → site logo → `/`.
	 */
	githubRepo: z.string().trim().default(""),
});

export type SiteGeneralConfig = z.infer<typeof siteGeneralConfigSchema>;

/** Hex from Sveltia color widget (`#RGB` / `#RRGGBB` / `#RRGGBBAA`, any case). */
const cssHexColor = z
	.string()
	.trim()
	.regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, "Invalid CSS hex color");

/** Design → Farbpalette (`design.colors`). Defaults match `global.css` :root. */
export const siteColorsConfigSchema = z.object({
	bg: cssHexColor.default("#0f1412"),
	surface: cssHexColor.default("#1a211e"),
	/** 8-digit hex with alpha preferred (Sveltia `enableAlpha`). */
	surfaceGlass: cssHexColor.default("#1a211ee6"),
	surfaceRaised: cssHexColor.default("#232b27"),
	border: cssHexColor.default("#2e3833"),
	text: cssHexColor.default("#e8eeea"),
	textMuted: cssHexColor.default("#9aa89f"),
	action: cssHexColor.default("#3dcf8e"),
	actionHover: cssHexColor.default("#56d9a0"),
	actionMuted: cssHexColor.default("#1a3d2e"),
	danger: cssHexColor.default("#e57373"),
});

export type SiteColorsConfig = z.infer<typeof siteColorsConfigSchema>;

/** `src/content/settings/design.json` */
export const siteDesignConfigSchema = z.object({
	colors: siteColorsConfigSchema.default({}),
	typography: siteTypographyConfigSchema.default({}),
	header: siteHeaderConfigSchema.default({}),
	hero: z.preprocess(
		normalizeHeroByCollection,
		siteHeroByCollectionSchema.default({}),
	),
});

export type SiteDesignConfig = z.infer<typeof siteDesignConfigSchema>;

export const DEFAULT_SITE_COLORS: SiteColorsConfig =
	siteColorsConfigSchema.parse({});

export {
	DEFAULT_SITE_TYPOGRAPHY,
	type SiteTypographyConfig,
} from "./site-typography";

/** Self-hosted video base (Cloudflare R2 custom domain), CMS Content → Medien. */
export const siteMediaConfigSchema = z.object({
	/**
	 * Public base URL for `provider="file"` videos (trailing slash optional).
	 * Example: `https://media.hautoo.storyofai.net/videos/`
	 */
	videoBaseUrl: z.string().trim().default(""),
});

export type SiteMediaConfig = z.infer<typeof siteMediaConfigSchema>;

/** `src/content/settings/content.json` */
export const siteContentConfigSchema = z.object({
	toc: siteTocConfigSchema.default({}),
	width: siteWidthConfigSchema.default({}),
	spacing: siteSpacingByCollectionSchema.default({}),
	media: siteMediaConfigSchema.default({}),
	authors: siteAuthorsConfigSchema.default({}),
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

export const DEFAULT_SITE_SPACING_CONFIG: SiteSpacingByCollectionConfig =
	siteSpacingByCollectionSchema.parse({});
