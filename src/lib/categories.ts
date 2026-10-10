import { getCollection, type CollectionEntry } from "astro:content";
import { getPublishedArticles } from "./articles";

export type CategoryEntry = CollectionEntry<"categories">;

export type CategorySort = "title-asc" | "title-desc" | "most-used";

export type CategoryListingEntry = {
	category: CategoryEntry;
	count: number;
};

export function getCategoryHref(category: CategoryEntry | string): string {
	const id = typeof category === "string" ? category : category.id;
	return `/kategorien/${id}/`;
}

export async function articleCountsByCategory(): Promise<Map<string, number>> {
	const articles = await getPublishedArticles();
	const counts = new Map<string, number>();
	for (const article of articles) {
		for (const id of article.data.categories ?? []) {
			counts.set(id, (counts.get(id) ?? 0) + 1);
		}
	}
	return counts;
}

function sortCategoryListings(
	entries: CategoryListingEntry[],
	sort: CategorySort,
): CategoryListingEntry[] {
	const byTitle = (a: CategoryListingEntry, b: CategoryListingEntry) =>
		a.category.data.title.localeCompare(b.category.data.title, "de", {
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

/** All categories, A–Z by title (de). */
export async function getCategoriesSorted(): Promise<CategoryEntry[]> {
	const categories = await getCollection("categories");
	return categories.sort((a, b) =>
		a.data.title.localeCompare(b.data.title, "de", { sensitivity: "base" }),
	);
}

/** Categories used on at least one published article, A–Z. */
export async function getUsedCategoriesSorted(): Promise<CategoryEntry[]> {
	const entries = await getCategoryEntries({
		sort: "title-asc",
		usedOnly: true,
	});
	return entries.map((entry) => entry.category);
}

export async function getCategoryEntries(options?: {
	sort?: CategorySort;
	limit?: number;
	/** Default true: only categories used on published articles. */
	usedOnly?: boolean;
}): Promise<CategoryListingEntry[]> {
	const sort = options?.sort ?? "title-asc";
	const usedOnly = options?.usedOnly ?? true;
	const [categories, counts] = await Promise.all([
		getCollection("categories"),
		articleCountsByCategory(),
	]);
	let entries: CategoryListingEntry[] = categories.map((category) => ({
		category,
		count: counts.get(category.id) ?? 0,
	}));
	if (usedOnly) {
		entries = entries.filter((entry) => entry.count > 0);
	}
	entries = sortCategoryListings(entries, sort);
	if (options?.limit !== undefined) {
		entries = entries.slice(0, options.limit);
	}
	return entries;
}

/** Resolve category entries by id (order: title asc). Skips unknown ids. */
export async function getCategoryListingsByIds(
	ids: string[],
	options?: { usedOnly?: boolean },
): Promise<CategoryListingEntry[]> {
	const unique = [...new Set(ids)];
	if (unique.length === 0) return [];

	const [categories, counts] = await Promise.all([
		getCollection("categories"),
		articleCountsByCategory(),
	]);
	const categoryMap = new Map(categories.map((category) => [category.id, category]));

	let entries: CategoryListingEntry[] = unique
		.map((id) => {
			const category = categoryMap.get(id);
			if (!category) return null;
			return { category, count: counts.get(id) ?? 0 };
		})
		.filter((entry): entry is CategoryListingEntry => entry !== null);

	if (options?.usedOnly) {
		entries = entries.filter((entry) => entry.count > 0);
	}

	return sortCategoryListings(entries, "title-asc");
}

/** Ancestor chain from root to parent (excludes `category`). Cycle-safe. */
export function getCategoryAncestors(
	category: CategoryEntry,
	all: CategoryEntry[],
): CategoryEntry[] {
	const byId = new Map(all.map((entry) => [entry.id, entry]));
	const trail: CategoryEntry[] = [];
	const seen = new Set<string>([category.id]);
	let parentId = category.data.parent;

	while (parentId) {
		if (seen.has(parentId)) {
			break;
		}
		seen.add(parentId);
		const parent = byId.get(parentId);
		if (!parent) {
			break;
		}
		trail.unshift(parent);
		parentId = parent.data.parent;
	}

	return trail;
}

/** Direct children of a category, A–Z. */
export function getCategoryChildren(
	parentId: string,
	all: CategoryEntry[],
): CategoryEntry[] {
	return all
		.filter((entry) => entry.data.parent === parentId)
		.sort((a, b) =>
			a.data.title.localeCompare(b.data.title, "de", { sensitivity: "base" }),
		);
}

export type CategoryTreeNode = {
	category: CategoryEntry;
	children: CategoryTreeNode[];
};

/**
 * Hierarchical forest for sidebars: used categories plus ancestors needed
 * to show the tree. Roots first, children A–Z.
 */
export function buildCategoryForest(
	all: CategoryEntry[],
	usedIds: Iterable<string>,
): CategoryTreeNode[] {
	const byId = new Map(all.map((entry) => [entry.id, entry]));
	const used = new Set(
		[...usedIds].filter((id) => byId.has(id)),
	);
	if (used.size === 0) {
		return [];
	}

	const visible = new Set<string>();
	for (const id of used) {
		let current: string | undefined = id;
		const seen = new Set<string>();
		while (current && byId.has(current) && !seen.has(current)) {
			visible.add(current);
			seen.add(current);
			current = byId.get(current)?.data.parent;
		}
	}

	function childrenOf(parentId: string | undefined): CategoryTreeNode[] {
		return all
			.filter((entry) => {
				if (!visible.has(entry.id)) {
					return false;
				}
				const parent = entry.data.parent;
				if (!parentId) {
					return !parent || !byId.has(parent);
				}
				return parent === parentId;
			})
			.sort((a, b) =>
				a.data.title.localeCompare(b.data.title, "de", {
					sensitivity: "base",
				}),
			)
			.map((category) => ({
				category,
				children: childrenOf(category.id),
			}));
	}

	return childrenOf(undefined);
}
