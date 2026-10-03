import type { CollectionEntry } from "astro:content";

export type PageEntry = CollectionEntry<"pages">;

/** URL path for a pages collection entry (`index` → `/`). */
export function getPageHref(page: PageEntry | string): string {
	const id = typeof page === "string" ? page : page.id;
	const slug = id.replace(/\/index$/, "");
	if (slug === "index" || slug === "") {
		return "/";
	}
	return `/${slug}/`;
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
