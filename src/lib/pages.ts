import type { CollectionEntry } from "astro:content";

export type PageEntry = CollectionEntry<"pages">;

/** Map of page id → entry for parent chain lookups. */
export function indexPagesById(pages: PageEntry[]): Map<string, PageEntry> {
	return new Map(pages.map((page) => [page.id, page]));
}

/** Own URL segment from a page id (`ueber-uns` / `index`). */
export function getPageSegment(page: PageEntry | string): string {
	const id = typeof page === "string" ? page : page.id;
	return id.replace(/\/index$/, "");
}

/**
 * URL path for a pages entry, including parent chain.
 * Example: parent `ueber-uns` + child `team` → `/ueber-uns/team/`
 */
export function getPageHref(
	page: PageEntry,
	pagesById: Map<string, PageEntry> = new Map(),
): string {
	const segments: string[] = [];
	const seen = new Set<string>();
	let current: PageEntry | undefined = page;

	while (current) {
		if (seen.has(current.id)) {
			break;
		}
		seen.add(current.id);

		const segment = getPageSegment(current);
		if (segment === "index" || segment === "") {
			break;
		}
		segments.unshift(segment);

		const parentId = current.data.parent;
		current = parentId ? pagesById.get(parentId) : undefined;
	}

	if (segments.length === 0) {
		return "/";
	}
	return `/${segments.join("/")}/`;
}

/** Label shown in the site navigation. */
export function getMenuLabel(page: PageEntry): string {
	return page.data.menuLabel?.trim() || page.data.title;
}

/** Pages flagged for the menu, sorted by menuOrder then title. */
export function getMenuPages(pages: PageEntry[]): PageEntry[] {
	return pages
		.filter((page) => page.data.showInMenu)
		.sort((a, b) => {
			const orderA = a.data.menuOrder ?? Number.POSITIVE_INFINITY;
			const orderB = b.data.menuOrder ?? Number.POSITIVE_INFINITY;
			if (orderA !== orderB) {
				return orderA - orderB;
			}
			return getMenuLabel(a).localeCompare(getMenuLabel(b), "de");
		});
}

/** Legal links in the footer copyright row (right side), sorted by footerLegalOrder. */
export function getFooterLegalPages(pages: PageEntry[]): PageEntry[] {
	return pages
		.filter((page) => page.data.showInFooterLegal)
		.sort((a, b) => {
			const orderA = a.data.footerLegalOrder ?? Number.POSITIVE_INFINITY;
			const orderB = b.data.footerLegalOrder ?? Number.POSITIVE_INFINITY;
			if (orderA !== orderB) {
				return orderA - orderB;
			}
			return getMenuLabel(a).localeCompare(getMenuLabel(b), "de");
		});
}
