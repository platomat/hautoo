import { getCollection, type CollectionEntry } from "astro:content";
import { isEntryPublic } from "../cms/fields/status";
import {
	getTagListingsByIds,
	type TagListingEntry,
} from "./tags";

export type GlossarEntry = CollectionEntry<"glossar">;

export type GlossarSort = "title-asc" | "title-desc" | "newest" | "oldest";

export type GlossarListingOptions = {
	limit?: number;
	sort?: GlossarSort;
};

export function isGlossarPublic(entry: GlossarEntry): boolean {
	return isEntryPublic(entry.data.status, entry.data.publishDate);
}

function sortGlossarEntries(
	entries: GlossarEntry[],
	sort: GlossarSort,
): GlossarEntry[] {
	const list = [...entries];
	switch (sort) {
		case "title-desc":
			return list.sort((a, b) =>
				b.data.title.localeCompare(a.data.title, "de", { sensitivity: "base" }),
			);
		case "newest":
			return list.sort((a, b) => {
				const aDate = a.data.publishDate?.valueOf() ?? 0;
				const bDate = b.data.publishDate?.valueOf() ?? 0;
				const byDate = bDate - aDate;
				return byDate !== 0
					? byDate
					: a.data.title.localeCompare(b.data.title, "de", {
							sensitivity: "base",
						});
			});
		case "oldest":
			return list.sort((a, b) => {
				const aDate = a.data.publishDate?.valueOf() ?? 0;
				const bDate = b.data.publishDate?.valueOf() ?? 0;
				const byDate = aDate - bDate;
				return byDate !== 0
					? byDate
					: a.data.title.localeCompare(b.data.title, "de", {
							sensitivity: "base",
						});
			});
		case "title-asc":
		default:
			return list.sort((a, b) =>
				a.data.title.localeCompare(b.data.title, "de", { sensitivity: "base" }),
			);
	}
}

/** Public glossar entries with optional sort and limit. */
export async function getGlossarEntries(
	options: GlossarListingOptions = {},
): Promise<GlossarEntry[]> {
	const { sort = "title-asc", limit } = options;
	const entries = await getCollection("glossar");
	const published = entries.filter(isGlossarPublic);
	const sorted = sortGlossarEntries(published, sort);
	if (typeof limit === "number" && Number.isFinite(limit) && limit > 0) {
		return sorted.slice(0, limit);
	}
	return sorted;
}

export function getGlossarHref(entry: GlossarEntry): string {
	return `/glossar/${entry.id}/`;
}

/** Tag slugs for a glossar entry: same slug (if tag exists) + optional relatedTags. */
export async function getGlossarRelatedTags(
	entry: GlossarEntry,
): Promise<TagListingEntry[]> {
	const tags = await getCollection("tags");
	const tagIds = new Set(tags.map((tag) => tag.id));
	const ids = new Set(entry.data.relatedTags ?? []);
	if (tagIds.has(entry.id)) {
		ids.add(entry.id);
	}
	return getTagListingsByIds([...ids], { usedOnly: true });
}

/**
 * Glossar entry to highlight on a tag page: exact slug match, else sole relatedTags mapping.
 */
export async function getGlossarForTag(
	tagId: string,
): Promise<GlossarEntry | undefined> {
	const entries = await getGlossarEntries();
	const exact = entries.find((entry) => entry.id === tagId);
	if (exact) return exact;

	const related = entries.filter((entry) =>
		(entry.data.relatedTags ?? []).includes(tagId),
	);
	if (related.length === 1) return related[0];
	return undefined;
}
