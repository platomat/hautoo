import { getCollection, type CollectionEntry } from "astro:content";
import { isEntryPublic } from "../cms/fields/status";

export type ArticleEntry = CollectionEntry<"articles">;

export type ArticleSort = "newest" | "oldest" | "title-asc" | "title-desc";

export type ArticleListingOptions = {
	/** How many to return (after sort). */
	limit?: number;
	sort?: ArticleSort;
};

/** Between filter groups (authors / categories / tags). Within a group: any slug matches. */
export type ArticleFilterMatch = "all" | "any";

export type ArticleFilters = {
	authorIds?: string[];
	categoryIds?: string[];
	tagIds?: string[];
	/** Default `all`: every non-empty group must match. `any`: at least one group. */
	match?: ArticleFilterMatch;
};

function normalizeIdList(ids: string[] | undefined): string[] {
	if (!ids?.length) return [];
	const seen = new Set<string>();
	const out: string[] = [];
	for (const raw of ids) {
		const id = raw.trim();
		if (!id || seen.has(id)) continue;
		seen.add(id);
		out.push(id);
	}
	return out;
}

function listIntersects(haystack: string[] | undefined, needles: string[]): boolean {
	if (needles.length === 0) return true;
	const set = new Set(haystack ?? []);
	return needles.some((id) => set.has(id));
}

/** Whether a published article matches optional author/category/tag filters. */
export function articleMatchesFilters(
	article: ArticleEntry,
	filters: ArticleFilters = {},
): boolean {
	const authorIds = normalizeIdList(filters.authorIds);
	const categoryIds = normalizeIdList(filters.categoryIds);
	const tagIds = normalizeIdList(filters.tagIds);
	const checks: boolean[] = [];
	if (authorIds.length > 0) {
		checks.push(listIntersects(article.data.authors, authorIds));
	}
	if (categoryIds.length > 0) {
		checks.push(listIntersects(article.data.categories, categoryIds));
	}
	if (tagIds.length > 0) {
		checks.push(listIntersects(article.data.tags, tagIds));
	}
	if (checks.length === 0) return true;
	return filters.match === "any" ? checks.some(Boolean) : checks.every(Boolean);
}

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

/** Published articles after optional taxonomy/author filters (filter, then limit). */
export async function getFilteredArticles(
	filters: ArticleFilters = {},
	options: ArticleListingOptions = {},
): Promise<ArticleEntry[]> {
	const { sort = "newest", limit } = options;
	const articles = await getPublishedArticles({ sort });
	const filtered = articles.filter((article) =>
		articleMatchesFilters(article, filters),
	);
	if (typeof limit === "number" && Number.isFinite(limit) && limit >= 0) {
		return filtered.slice(0, limit);
	}
	return filtered;
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
	return getFilteredArticles({ tagIds: [tagId] }, options);
}

/** Published articles that include a category slug. */
export async function getArticlesByCategory(
	categoryId: string,
	options: ArticleListingOptions = {},
): Promise<ArticleEntry[]> {
	return getFilteredArticles({ categoryIds: [categoryId] }, options);
}

/** Published articles that include an author slug. */
export async function getArticlesByAuthor(
	authorId: string,
	options: ArticleListingOptions = {},
): Promise<ArticleEntry[]> {
	return getFilteredArticles({ authorIds: [authorId] }, options);
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
