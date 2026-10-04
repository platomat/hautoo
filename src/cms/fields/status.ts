import { z } from "astro/zod";

/** Editorial workflow status (pages, articles, glossar — not tags/menus). */
export const ENTRY_STATUSES = [
	"draft",
	"published",
	"future",
	"trash",
] as const;

export type EntryStatus = (typeof ENTRY_STATUSES)[number];

/**
 * Missing status → published (safe for existing content).
 * New CMS entries should set draft via Sveltia default.
 */
export const entryStatusSchema = z.preprocess((value) => {
	if (value === undefined || value === null || value === "") {
		return "published";
	}
	return value;
}, z.enum(ENTRY_STATUSES));

/**
 * Whether an entry should appear on the public site at build/request time.
 * `future` becomes visible once `scheduleDate` is reached (UTC).
 */
export function isEntryPublic(
	status: EntryStatus,
	scheduleDate?: Date | undefined,
): boolean {
	switch (status) {
		case "published":
			return true;
		case "future":
			return (
				scheduleDate instanceof Date &&
				!Number.isNaN(scheduleDate.valueOf()) &&
				scheduleDate.valueOf() <= Date.now()
			);
		case "draft":
		case "trash":
		default:
			return false;
	}
}
