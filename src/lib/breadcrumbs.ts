import type { CollectionEntry } from "astro:content";
import {
	getPageHref,
	indexPagesById,
	type PageEntry,
} from "./pages";

export type BreadcrumbItem = {
	label: string;
	/** Omit on the current (last) crumb. */
	href?: string;
};

const HOME: BreadcrumbItem = { label: "Start", href: "/" };

/** Parent chain for a CMS page, ending with the current title (no href). */
export function buildPageBreadcrumbs(
	page: PageEntry,
	allPages: PageEntry[],
): BreadcrumbItem[] {
	const pagesById = indexPagesById(allPages);
	const trail: BreadcrumbItem[] = [];
	const seen = new Set<string>();
	let current: PageEntry | undefined = page;

	while (current) {
		if (seen.has(current.id)) {
			break;
		}
		seen.add(current.id);

		const segment = current.id.replace(/\/index$/, "");
		if (segment === "index" || segment === "") {
			break;
		}

		trail.unshift({
			label: current.data.title,
			href: getPageHref(current, pagesById),
		});

		const parentId = current.data.parent;
		current = parentId ? pagesById.get(parentId) : undefined;
	}

	if (trail.length === 0) {
		return [];
	}

	const last = trail[trail.length - 1];
	if (last) {
		last.href = undefined;
	}

	return [HOME, ...trail];
}

export function buildArticleBreadcrumbs(
	article: CollectionEntry<"articles">,
): BreadcrumbItem[] {
	return [
		HOME,
		{ label: "Artikel", href: "/artikel/" },
		{ label: article.data.title },
	];
}

export function buildGlossarBreadcrumbs(
	entry: CollectionEntry<"glossar">,
): BreadcrumbItem[] {
	return [
		HOME,
		{ label: "Glossar", href: "/glossar/" },
		{ label: entry.data.title },
	];
}

export function buildTagBreadcrumbs(label: string): BreadcrumbItem[] {
	return [
		HOME,
		{ label: "Artikel", href: "/artikel/" },
		{ label },
	];
}
