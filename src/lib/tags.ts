import { getCollection, type CollectionEntry } from "astro:content";
import { getPublishedArticles } from "./articles";

export type TagEntry = CollectionEntry<"tags">;

export type TagSort = "title-asc" | "title-desc" | "most-used";

export type TagListingEntry = {
	tag: TagEntry;
	count: number;
};

export function getTagHref(tag: TagEntry | string): string {
	const id = typeof tag === "string" ? tag : tag.id;
	return `/tags/${id}/`;
}

/** Display label as hashtag, e.g. `#Astro`. */
export function formatTagHashtag(tag: TagEntry): string {
	const label = tag.data.title.trim().replace(/\s+/g, "");
	return `#${label}`;
}

async function articleCountsByTag(): Promise<Map<string, number>> {
	const articles = await getPublishedArticles();
	const counts = new Map<string, number>();
	for (const article of articles) {
		for (const id of article.data.tags ?? []) {
			counts.set(id, (counts.get(id) ?? 0) + 1);
		}
	}
	return counts;
}

function sortTagListings(
	entries: TagListingEntry[],
	sort: TagSort,
): TagListingEntry[] {
	const byTitle = (a: TagListingEntry, b: TagListingEntry) =>
		a.tag.data.title.localeCompare(b.tag.data.title, "de", {
			sensitivity: "base",
		});
	const sorted = [...entries];
	switch (sort) {
		case "title-desc":
			return sorted.sort((a, b) => byTitle(b, a));
		case "most-used":
			return sorted.sort((a, b) => b.count - a.count || byTitle(a, b));
		default:
			return sorted.sort(byTitle);
	}
}

/** All tags, A–Z by title (de). */
export async function getTagsSorted(): Promise<TagEntry[]> {
	const tags = await getCollection("tags");
	return tags.sort((a, b) =>
		a.data.title.localeCompare(b.data.title, "de", { sensitivity: "base" }),
	);
}

/** Tags that appear on at least one published article, A–Z. */
export async function getUsedTagsSorted(): Promise<TagEntry[]> {
	const entries = await getTagEntries({ sort: "title-asc", usedOnly: true });
	return entries.map((entry) => entry.tag);
}

export async function getTagEntries(options?: {
	sort?: TagSort;
	limit?: number;
	/** Default true: only tags used on published articles. */
	usedOnly?: boolean;
}): Promise<TagListingEntry[]> {
	const sort = options?.sort ?? "title-asc";
	const usedOnly = options?.usedOnly ?? true;
	const [tags, counts] = await Promise.all([
		getCollection("tags"),
		articleCountsByTag(),
	]);
	let entries: TagListingEntry[] = tags.map((tag) => ({
		tag,
		count: counts.get(tag.id) ?? 0,
	}));
	if (usedOnly) {
		entries = entries.filter((entry) => entry.count > 0);
	}
	entries = sortTagListings(entries, sort);
	if (options?.limit !== undefined) {
		entries = entries.slice(0, options.limit);
	}
	return entries;
}
