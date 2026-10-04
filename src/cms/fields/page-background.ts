import { z } from "astro/zod";

/** Overlay strength 0–100 (black layer over the background image). */
export const backgroundOverlaySchema = z.coerce
	.number()
	.min(0)
	.max(100)
	.default(40);

/**
 * Shared page/article background fields (except the image, which needs
 * the collection `image()` helper).
 */
export const pageBackgroundMetaSchema = {
	backgroundOverlay: backgroundOverlaySchema.optional(),
};

export type BackgroundOverlay = z.infer<typeof backgroundOverlaySchema>;

/** Clamp overlay for inline styles (0–1 alpha). */
export function overlayAlpha(percent: number | undefined): number {
	const value = typeof percent === "number" && Number.isFinite(percent) ? percent : 40;
	return Math.min(100, Math.max(0, value)) / 100;
}
