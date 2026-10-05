/** Design-token keys selectable for `{{separator color="…"}}`. */
export const SEPARATOR_COLOR_KEYS = [
	"border",
	"text",
	"text-muted",
	"action",
	"action-hover",
	"action-muted",
	"surface",
	"surface-raised",
	"bg",
	"danger",
] as const;

export type SeparatorColor = (typeof SEPARATOR_COLOR_KEYS)[number];

export const DEFAULT_SEPARATOR_COLOR: SeparatorColor = "border";

const SEPARATOR_COLOR_SET = new Set<string>(SEPARATOR_COLOR_KEYS);

/** Map token → CSS custom property used as line background. */
export const SEPARATOR_COLOR_CSS: Record<SeparatorColor, string> = {
	border: "var(--color-border)",
	text: "var(--color-text)",
	"text-muted": "var(--color-text-muted)",
	action: "var(--color-action)",
	"action-hover": "var(--color-action-hover)",
	"action-muted": "var(--color-action-muted)",
	surface: "var(--color-surface)",
	"surface-raised": "var(--color-surface-raised)",
	bg: "var(--color-bg)",
	danger: "var(--color-danger)",
};

/** Hex approx. for CMS preview (matches :root tokens). */
export const SEPARATOR_COLOR_PREVIEW: Record<SeparatorColor, string> = {
	border: "#2e3833",
	text: "#e8eeea",
	"text-muted": "#9aa89f",
	action: "#3dcf8e",
	"action-hover": "#56d9a0",
	"action-muted": "#1a3d2e",
	surface: "#1a211e",
	"surface-raised": "#232b27",
	bg: "#0f1412",
	danger: "#e57373",
};

export function resolveSeparatorColor(
	raw: string | undefined,
): SeparatorColor {
	const key = (raw ?? "").trim();
	if (SEPARATOR_COLOR_SET.has(key)) {
		return key as SeparatorColor;
	}
	return DEFAULT_SEPARATOR_COLOR;
}
