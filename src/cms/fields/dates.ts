import { z } from "astro/zod";

/** Last editorial change — stored on all collections; used for SEO meta. */
export const modifiedDateSchema = z.coerce.date().optional();

/** ISO-8601 for `<meta>` (UTC). */
export function formatModifiedDateMeta(date: Date): string {
	return date.toISOString();
}
