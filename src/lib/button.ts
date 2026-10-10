import {
	SEPARATOR_COLOR_CSS,
	SEPARATOR_COLOR_KEYS,
	SEPARATOR_COLOR_PREVIEW,
	type SeparatorColor,
} from "./separator";

/** Same design-token palette as `{{separator color="…"}}`. */
export type ButtonColor = SeparatorColor;

export const BUTTON_COLOR_KEYS = SEPARATOR_COLOR_KEYS;
export const BUTTON_COLOR_CSS = SEPARATOR_COLOR_CSS;
export const BUTTON_COLOR_PREVIEW = SEPARATOR_COLOR_PREVIEW;

export const DEFAULT_BUTTON_COLOR: ButtonColor = "action";

export const BUTTON_STYLES = ["solid", "outline"] as const;
export type ButtonStyle = (typeof BUTTON_STYLES)[number];
export const DEFAULT_BUTTON_STYLE: ButtonStyle = "solid";

export const BUTTON_TARGETS = ["_self", "_blank"] as const;
export type ButtonTarget = (typeof BUTTON_TARGETS)[number];
export const DEFAULT_BUTTON_TARGET: ButtonTarget = "_self";

export const BUTTON_ALIGNS = ["left", "center", "right", "full"] as const;
export type ButtonAlign = (typeof BUTTON_ALIGNS)[number];
export const DEFAULT_BUTTON_ALIGN: ButtonAlign = "left";

const COLOR_SET = new Set<string>(BUTTON_COLOR_KEYS);
const STYLE_SET = new Set<string>(BUTTON_STYLES);
const TARGET_SET = new Set<string>(BUTTON_TARGETS);
const ALIGN_SET = new Set<string>(BUTTON_ALIGNS);

/** Fills that need dark label text for contrast on solid buttons. */
const LIGHT_FILL_COLORS = new Set<ButtonColor>([
	"text",
	"text-muted",
	"action",
	"action-hover",
	"danger",
]);

export function resolveButtonColor(raw: string | undefined): ButtonColor {
	const key = (raw ?? "").trim();
	if (COLOR_SET.has(key)) {
		return key as ButtonColor;
	}
	return DEFAULT_BUTTON_COLOR;
}

export function resolveButtonStyle(raw: string | undefined): ButtonStyle {
	const key = (raw ?? "").trim();
	if (STYLE_SET.has(key)) {
		return key as ButtonStyle;
	}
	return DEFAULT_BUTTON_STYLE;
}

export function resolveButtonTarget(raw: string | undefined): ButtonTarget {
	const key = (raw ?? "").trim();
	if (TARGET_SET.has(key)) {
		return key as ButtonTarget;
	}
	return DEFAULT_BUTTON_TARGET;
}

export function resolveButtonAlign(raw: string | undefined): ButtonAlign {
	const key = (raw ?? "").trim();
	if (ALIGN_SET.has(key)) {
		return key as ButtonAlign;
	}
	return DEFAULT_BUTTON_ALIGN;
}

/** Foreground CSS for solid buttons (contrast against fill). */
export function buttonSolidForegroundCss(color: ButtonColor): string {
	return LIGHT_FILL_COLORS.has(color)
		? "var(--color-bg)"
		: "var(--color-text)";
}
