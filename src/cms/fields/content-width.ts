import { z } from "astro/zod";

/** Editorial content column widths (pages / articles). */
export const CONTENT_WIDTH_VALUES = ["default", "wide", "full"] as const;

export const contentWidthSchema = z.enum(CONTENT_WIDTH_VALUES);

export type ContentWidth = z.infer<typeof contentWidthSchema>;

/** Optional rem spacing override on an entry (`layout.afterHero` / `beforeFooter`). */
export const entrySpacingRemSchema = z.coerce.number().min(0).max(12).optional();

/**
 * Per-entry layout group (CMS „Inhaltsbreite“): width + optional spacing.
 * Legacy flat `contentWidth` is still accepted via preprocess in content schema.
 */
export const entryLayoutSchema = z
	.object({
		contentWidth: contentWidthSchema.optional(),
		/** Gap below hero before TOC/body (rem). Omit = global Design → Abstand. */
		afterHero: entrySpacingRemSchema,
		/** Bottom padding of `.page` before footer (rem). Omit = global. */
		beforeFooter: entrySpacingRemSchema,
	})
	.optional();

export type EntryLayout = z.infer<typeof entryLayoutSchema>;

/** CSS class for non-default widths; empty string for reading column. */
export function contentWidthClass(width: ContentWidth): string {
	if (width === "default") {
		return "";
	}
	return `page--width-${width}`;
}

/**
 * Chrome shell (header / footer) max-width modifier on `.shell-inner`.
 * Same three steps as content: default 42rem · wide 64rem · full 80rem.
 */
export function shellWidthClass(width: ContentWidth): string {
	return `shell-inner--width-${width}`;
}
