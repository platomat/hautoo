import { z } from "astro/zod";

/** Overlay strength 0–100 (black layer over the background image). */
export const backgroundOverlaySchema = z.coerce
	.number()
	.min(0)
	.max(100)
	.default(40);

/**
 * Background image path from Sveltia (`/assets/…` or entry-relative).
 * Resolved at render via `resolveCmsImage` — not Astro `image()`, which
 * cannot load global `/assets/` paths.
 */
export const backgroundImageSchema = z.preprocess((value) => {
	if (typeof value !== "string") {
		return value;
	}
	const trimmed = value.trim();
	return trimmed === "" ? undefined : trimmed;
}, z.string().min(1).optional());

export type BackgroundOverlay = z.infer<typeof backgroundOverlaySchema>;

/** Clamp overlay for inline styles (0–1 alpha). */
export function overlayAlpha(percent: number | undefined): number {
	const value = typeof percent === "number" && Number.isFinite(percent) ? percent : 40;
	return Math.min(100, Math.max(0, value)) / 100;
}
