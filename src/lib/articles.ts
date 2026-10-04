import { getCollection, type CollectionEntry } from "astro:content";

export type ArticleEntry = CollectionEntry<"articles">;

/** Published articles, newest first. */
export async function getPublishedArticles(): Promise<ArticleEntry[]> {
	const articles = await getCollection("articles");
	return articles
		.filter((article) => !article.data.draft)
		.sort(
			(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
		);
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
