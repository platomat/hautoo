import { getCollection, type CollectionEntry } from "astro:content";
import { isEntryPublic } from "../cms/fields/status";

export type ArticleEntry = CollectionEntry<"articles">;

export type ArticleSort = "newest" | "oldest" | "title-asc" | "title-desc";

export type ArticleListingOptions = {
	/** How many to return (after sort). */
	limit?: number;
	sort?: ArticleSort;
};

function sortArticles(
	articles: ArticleEntry[],
	sort: ArticleSort,
): ArticleEntry[] {
	const list = [...articles];
	switch (sort) {
		case "oldest":
			return list.sort(
				(a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf(),
			);
		case "title-asc":
			return list.sort((a, b) =>
				a.data.title.localeCompare(b.data.title, "de", { sensitivity: "base" }),
			);
		case "title-desc":
			return list.sort((a, b) =>
				b.data.title.localeCompare(a.data.title, "de", { sensitivity: "base" }),
			);
		case "newest":
		default:
			return list.sort(
				(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
			);
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

/** Display date as dd.mm.yyyy (UTC — CMS stores date-only). */
export function formatArticleDate(date: Date): string {
	const day = String(date.getUTCDate()).padStart(2, "0");
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const year = date.getUTCFullYear();
	return `${day}.${month}.${year}`;
}
