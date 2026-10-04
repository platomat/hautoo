import { getCollection, type CollectionEntry } from "astro:content";
import { isEntryPublic } from "../cms/fields/status";

export type ArticleEntry = CollectionEntry<"articles">;

export type ArticleSort = "newest" | "oldest" | "title-asc" | "title-desc";

export type ArticleListingOptions = {
	/** How many to return (after sort). */
	limit?: number;
	sort?: ArticleSort;
};

function compareByTitle(a: ArticleEntry, b: ArticleEntry): number {
	return a.data.title.localeCompare(b.data.title, "de", { sensitivity: "base" });
}

function sortArticles(
	articles: ArticleEntry[],
	sort: ArticleSort,
): ArticleEntry[] {
	const list = [...articles];
	switch (sort) {
		case "oldest":
			return list.sort((a, b) => {
				const byDate = a.data.pubDate.valueOf() - b.data.pubDate.valueOf();
				return byDate !== 0 ? byDate : compareByTitle(a, b);
			});
		case "title-asc":
			return list.sort(compareByTitle);
		case "title-desc":
			return list.sort((a, b) => compareByTitle(b, a));
		case "newest":
		default:
			return list.sort((a, b) => {
				const byDate = b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
				return byDate !== 0 ? byDate : compareByTitle(a, b);
			});
	}
}

export function isArticlePublic(article: ArticleEntry): boolean {
	return isEntryPublic(article.data.status, article.data.pubDate);
}

/** Public articles with optional sort and limit. */
export async function getPublishedArticles(
	options: ArticleListingOptions = {},
): Promise<ArticleEntry[]> {
	const { sort = "newest", limit } = options;
	const articles = await getCollection("articles");
	const published = articles.filter(isArticlePublic);
	const sorted = sortArticles(published, sort);
	if (typeof limit === "number" && Number.isFinite(limit) && limit >= 0) {
		return sorted.slice(0, limit);
	}
	return sorted;
}

export function getArticleHref(article: ArticleEntry): string {
	return `/artikel/${article.id}/`;
}

/** Published articles for the given ids, preserving id order. */
export async function getArticlesByIds(
	ids: string[],
): Promise<ArticleEntry[]> {
	if (ids.length === 0) return [];
	const articles = await getCollection("articles");
	const byId = new Map(articles.map((article) => [article.id, article]));
	return ids
		.map((id) => byId.get(id))
		.filter((article): article is ArticleEntry => Boolean(article))
		.filter(isArticlePublic);
}

/** Published articles that include a tag slug. */
export async function getArticlesByTag(
	tagId: string,
	options: ArticleListingOptions = {},
): Promise<ArticleEntry[]> {
	const articles = await getPublishedArticles(options);
	return articles.filter((article) => (article.data.tags ?? []).includes(tagId));
}

/**
 * Neighbors by publish date: older = past (left), newer = future (right).
 * Same-day ties use title (A–Z).
 */
export async function getAdjacentArticles(current: ArticleEntry): Promise<{
	older: ArticleEntry | undefined;
	newer: ArticleEntry | undefined;
}> {
	const chronological = await getPublishedArticles({ sort: "oldest" });
	const index = chronological.findIndex((entry) => entry.id === current.id);
	if (index < 0) {
		return { older: undefined, newer: undefined };
	}
	return {
		older: chronological[index - 1],
		newer: chronological[index + 1],
	};
}

/** Display date as dd.mm.yyyy (UTC — CMS stores date-only). */
export function formatArticleDate(date: Date): string {
	const day = String(date.getUTCDate()).padStart(2, "0");
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const year = date.getUTCFullYear();
	return `${day}.${month}.${year}`;
}
