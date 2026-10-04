import { getCollection, type CollectionEntry } from "astro:content";
import { getPublishedArticles } from "./articles";

export type TagEntry = CollectionEntry<"tags">;

export function getTagHref(tag: TagEntry | string): string {
	const id = typeof tag === "string" ? tag : tag.id;
	return `/tags/${id}/`;
}

/** Display label as hashtag, e.g. `#Astro`. */
export function formatTagHashtag(tag: TagEntry): string {
	const label = tag.data.title.trim().replace(/\s+/g, "");
	return `#${label}`;
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
	const [tags, articles] = await Promise.all([
		getCollection("tags"),
		getPublishedArticles(),
	]);
	const used = new Set<string>();
	for (const article of articles) {
		for (const id of article.data.tags ?? []) {
			used.add(id);
		}
	}
	return tags
		.filter((tag) => used.has(tag.id))
		.sort((a, b) =>
			a.data.title.localeCompare(b.data.title, "de", { sensitivity: "base" }),
		);
}
