/** Vertical spacer embed `{{spacer height="…"}}` (height in px). */

export const DEFAULT_SPACER_HEIGHT = 32;
export const MIN_SPACER_HEIGHT = 1;
export const MAX_SPACER_HEIGHT = 600;

export function clampSpacerHeight(raw: string | number | undefined): number {
	const n =
		typeof raw === "number"
			? raw
			: Number.parseInt(String(raw ?? "").trim(), 10);
	if (!Number.isFinite(n)) {
		return DEFAULT_SPACER_HEIGHT;
	}
	return Math.min(MAX_SPACER_HEIGHT, Math.max(MIN_SPACER_HEIGHT, Math.round(n)));
}
