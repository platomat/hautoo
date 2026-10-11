import { getCollection, getEntry, type CollectionEntry } from "astro:content";
import type { ImageMetadata } from "astro";
import { getPublishedArticles } from "./articles";
import { resolveCmsImage } from "./cms-image";

export type AuthorEntry = CollectionEntry<"authors">;

export function getAuthorHref(author: AuthorEntry | string): string {
	const id = typeof author === "string" ? author : author.id;
	return `/autoren/${id}/`;
}

/** Local CMS avatar, else build-synced Gravatar under `/assets/authors/gravatar/<slug>.*`. */
export function resolveAuthorAvatar(
	author: AuthorEntry,
): ImageMetadata | undefined {
	const local = resolveCmsImage(author.data.avatar);
	if (local) {
		return local;
	}
	return (
		resolveCmsImage(`/assets/authors/gravatar/${author.id}.jpg`) ||
		resolveCmsImage(`/assets/authors/gravatar/${author.id}.jpeg`) ||
		resolveCmsImage(`/assets/authors/gravatar/${author.id}.png`) ||
		resolveCmsImage(`/assets/authors/gravatar/${author.id}.webp`)
	);
}

export async function getAuthorById(
	id: string,
): Promise<AuthorEntry | undefined> {
	const trimmed = id.trim();
	if (!trimmed) {
		return undefined;
	}
	return getEntry("authors", trimmed);
}

export async function getAuthorsByIds(ids: string[]): Promise<AuthorEntry[]> {
	if (ids.length === 0) {
		return [];
	}
	const authors = await getCollection("authors");
	const byId = new Map(authors.map((author) => [author.id, author]));
	return ids
		.map((id) => byId.get(id))
		.filter((author): author is AuthorEntry => Boolean(author));
}

export async function articleCountsByAuthor(): Promise<Map<string, number>> {
	const articles = await getPublishedArticles();
	const counts = new Map<string, number>();
	for (const article of articles) {
		for (const id of article.data.authors ?? []) {
			counts.set(id, (counts.get(id) ?? 0) + 1);
		}
	}
	return counts;
}
