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

/** One button inside `{{button-group …}}` (no per-item align). */
export type ButtonGroupItem = {
	label: string;
	href: string;
	target: ButtonTarget;
	style: ButtonStyle;
	color: ButtonColor;
};

/**
 * Group layout:
 * - `row`: side by side, may wrap
 * - `row-nowrap`: side by side, no wrap
 * - `stack-mobile`: row (+ wrap) on desktop, column under 680px
 * - `stack`: always column
 */
export const BUTTON_GROUP_LAYOUTS = [
	"row",
	"row-nowrap",
	"stack-mobile",
	"stack",
] as const;
export type ButtonGroupLayout = (typeof BUTTON_GROUP_LAYOUTS)[number];
export const DEFAULT_BUTTON_GROUP_LAYOUT: ButtonGroupLayout = "stack-mobile";

export const BUTTON_GROUP_ALIGNS = ["left", "center", "right"] as const;
export type ButtonGroupAlign = (typeof BUTTON_GROUP_ALIGNS)[number];
export const DEFAULT_BUTTON_GROUP_ALIGN: ButtonGroupAlign = "left";

const GROUP_LAYOUT_SET = new Set<string>(BUTTON_GROUP_LAYOUTS);
const GROUP_ALIGN_SET = new Set<string>(BUTTON_GROUP_ALIGNS);

export function resolveButtonGroupLayout(
	raw: string | undefined,
): ButtonGroupLayout {
	const key = (raw ?? "").trim();
	if (GROUP_LAYOUT_SET.has(key)) {
		return key as ButtonGroupLayout;
	}
	return DEFAULT_BUTTON_GROUP_LAYOUT;
}

export function resolveButtonGroupAlign(
	raw: string | undefined,
): ButtonGroupAlign {
	const key = (raw ?? "").trim();
	if (GROUP_ALIGN_SET.has(key)) {
		return key as ButtonGroupAlign;
	}
	return DEFAULT_BUTTON_GROUP_ALIGN;
}

/**
 * Serialize group items: `label|href|style|color|target` joined with `||`.
 * Pipe characters in values are not supported.
 */
export function serializeButtonGroupItems(items: ButtonGroupItem[]): string {
	return items
		.filter((item) => item.label.trim() && item.href.trim())
		.map((item) =>
			[
				item.label.trim(),
				item.href.trim(),
				item.style,
				item.color,
				item.target,
			].join("|"),
		)
		.join("||");
}

/** Parse `items` attr from `{{button-group items="…"}}`. */
export function parseButtonGroupItems(
	raw: string | undefined,
): ButtonGroupItem[] {
	if (!raw?.trim()) return [];
	const out: ButtonGroupItem[] = [];
	for (const chunk of raw.split("||")) {
		const parts = chunk.split("|").map((part) => part.trim());
		const label = parts[0] ?? "";
		const href = parts[1] ?? "";
		if (!label || !href) continue;
		out.push({
			label,
			href,
			style: resolveButtonStyle(parts[2]),
			color: resolveButtonColor(parts[3]),
			target: resolveButtonTarget(parts[4]),
		});
	}
	return out;
}
