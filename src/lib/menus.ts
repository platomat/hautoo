import { getCollection, type CollectionEntry } from "astro:content";
import type { MenuItem, MenuLeaf } from "../cms/fields/menu";
import { getPageHref, indexPagesById, type PageEntry } from "./pages";

export type MenuEntry = CollectionEntry<"menus">;

export type ResolvedMenuLink = {
	label: string;
	href: string;
	external: boolean;
};

export type ResolvedMenuItem = ResolvedMenuLink & {
	children: ResolvedMenuLink[];
};

/** Well-known menu ids (filename / collection id). */
export const MENU_MAIN = "main";
export const MENU_FOOTER_LEGAL = "footer-legal";

export async function getMenuEntry(
	id: string,
): Promise<MenuEntry | undefined> {
	const menus = await getCollection("menus");
	return menus.find((menu) => menu.id === id);
}

function resolveLeafHref(
	item: MenuLeaf,
	pagesById: Map<string, PageEntry>,
): ResolvedMenuLink | null {
	const label = item.label?.trim();
	if (!label) {
		return null;
	}

	if (item.linkType === "url") {
		const href = item.url?.trim();
		if (!href) {
			return null;
		}
		const external = /^https?:\/\//i.test(href);
		return { label, href, external };
	}

	const pageId = item.page?.trim();
	if (!pageId) {
		return null;
	}
	const page = pagesById.get(pageId);
	if (!page) {
		return null;
	}
	return {
		label,
		href: getPageHref(page, pagesById),
		external: false,
	};
}

/** Resolve menu items to hrefs; drop broken page links. */
export function resolveMenuItems(
	items: MenuItem[] | undefined,
	pages: PageEntry[],
): ResolvedMenuItem[] {
	const pagesById = indexPagesById(pages);
	const resolved: ResolvedMenuItem[] = [];

	for (const item of items ?? []) {
		const link = resolveLeafHref(item, pagesById);
		if (!link) {
			continue;
		}
		const children = (item.children ?? [])
			.map((child) => resolveLeafHref(child, pagesById))
			.filter((child): child is ResolvedMenuLink => child !== null);
		resolved.push({ ...link, children });
	}

	return resolved;
}

export async function getResolvedMenu(
	id: string,
	pages?: PageEntry[],
): Promise<ResolvedMenuItem[]> {
	const menu = await getMenuEntry(id);
	if (!menu) {
		return [];
	}
	const allPages = pages ?? (await getCollection("pages"));
	return resolveMenuItems(menu.data.items, allPages);
}
