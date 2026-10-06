import { z } from "astro/zod";

/** Editorial content column widths (pages / articles). */
export const CONTENT_WIDTH_VALUES = ["default", "wide", "full"] as const;

export const contentWidthSchema = z.enum(CONTENT_WIDTH_VALUES);

export type ContentWidth = z.infer<typeof contentWidthSchema>;

/** CSS class for non-default widths; empty string for reading column. */
export function contentWidthClass(width: ContentWidth): string {
	if (width === "default") {
		return "";
	}
	return `page--width-${width}`;
}
