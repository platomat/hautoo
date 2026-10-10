import {
	DEFAULT_SITE_COLORS,
	type SiteColorsConfig,
} from "../cms/fields/site-config";
import { getSiteConfig } from "./site-config";

/** Solid palette keys written to `:root` as `--color-*`. */
export const SITE_COLOR_CSS_KEYS = [
	"bg",
	"surface",
	"surfaceRaised",
	"border",
	"text",
	"textMuted",
	"action",
	"actionHover",
	"actionMuted",
	"danger",
] as const;

const CSS_VAR_BY_KEY: Record<(typeof SITE_COLOR_CSS_KEYS)[number], string> = {
	bg: "--color-bg",
	surface: "--color-surface",
	surfaceRaised: "--color-surface-raised",
	border: "--color-border",
	text: "--color-text",
	textMuted: "--color-text-muted",
	action: "--color-action",
	actionHover: "--color-action-hover",
	actionMuted: "--color-action-muted",
	danger: "--color-danger",
};

/** Default alpha for glass (matches previous global.css). */
export const SURFACE_GLASS_ALPHA = 0.9;

export function getSiteColorsConfig(): SiteColorsConfig {
	const config = getSiteConfig();
	return config.design?.colors ?? DEFAULT_SITE_COLORS;
}

/** Parse `#RGB` / `#RRGGBB` / `#RRGGBBAA` (any case) → channels. */
export function parseCssHex(
	raw: string,
): { r: number; g: number; b: number; a: number } | undefined {
	const hex = raw.trim().replace(/^#/, "");
	if (/^[0-9a-fA-F]{3}$/.test(hex)) {
		return {
			r: Number.parseInt(hex[0]! + hex[0]!, 16),
			g: Number.parseInt(hex[1]! + hex[1]!, 16),
			b: Number.parseInt(hex[2]! + hex[2]!, 16),
			a: 1,
		};
	}
	if (/^[0-9a-fA-F]{6}$/.test(hex)) {
		return {
			r: Number.parseInt(hex.slice(0, 2), 16),
			g: Number.parseInt(hex.slice(2, 4), 16),
			b: Number.parseInt(hex.slice(4, 6), 16),
			a: 1,
		};
	}
	if (/^[0-9a-fA-F]{8}$/.test(hex)) {
		return {
			r: Number.parseInt(hex.slice(0, 2), 16),
			g: Number.parseInt(hex.slice(2, 4), 16),
			b: Number.parseInt(hex.slice(4, 6), 16),
			a: Number.parseInt(hex.slice(6, 8), 16) / 255,
		};
	}
	return undefined;
}

export function hexToRgbaCss(hex: string, alphaFallback?: number): string {
	const parsed = parseCssHex(hex);
	if (!parsed) {
		return hex;
	}
	const a =
		alphaFallback !== undefined && parsed.a === 1
			? alphaFallback
			: parsed.a;
	if (a >= 1) {
		return `#${[parsed.r, parsed.g, parsed.b]
			.map((n) => n.toString(16).padStart(2, "0"))
			.join("")}`;
	}
	const aRounded = Math.round(a * 1000) / 1000;
	return `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, ${aRounded})`;
}

/**
 * Inline `:root` overrides from Design → Farbpalette.
 * `surface-glass` from `surfaceGlass` (8-digit hex) or derived from `surface`.
 * `--color-chrome` stays `var(--color-surface)` in global.css.
 */
export function buildSiteColorRootCss(
	colors: SiteColorsConfig = getSiteColorsConfig(),
): string {
	const lines: string[] = [];
	for (const key of SITE_COLOR_CSS_KEYS) {
		const value = colors[key]?.trim() || DEFAULT_SITE_COLORS[key];
		const normalized = hexToRgbaCss(value);
		lines.push(`${CSS_VAR_BY_KEY[key]}: ${normalized};`);
	}

	const glassRaw = colors.surfaceGlass?.trim();
	const glassCss = glassRaw
		? hexToRgbaCss(glassRaw)
		: hexToRgbaCss(colors.surface || DEFAULT_SITE_COLORS.surface, SURFACE_GLASS_ALPHA);
	lines.push(`--color-surface-glass: ${glassCss};`);

	return `:root {\n\t${lines.join("\n\t")}\n}`;
}
