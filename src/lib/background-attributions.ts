import { getCollection } from "astro:content";
import {
	classifyAttribution,
	sanitizeAttributionHtml,
	type AttributionKind,
} from "../cms/fields/page-background";
import { getArticleHref, getPublishedArticles } from "./articles";
import { getPageHref, indexPagesById } from "./pages";

export type BackgroundAttributionItem = {
	/** Raw CMS value (text, URL, or stock-platform HTML). */
	credit: string;
	kind: AttributionKind;
	/** Sanitized HTML when `kind === "html"`. */
	creditHtml?: string;
	/** Title of the page/article that uses the background. */
	usedOnTitle: string;
	/** Public href of that entry. */
	usedOnHref: string;
};

/**
 * Collect background attributions from all public pages and articles.
 * Sorted by used-on title, then credit.
 */
export async function collectBackgroundAttributions(): Promise<
	BackgroundAttributionItem[]
> {
	const pages = await getCollection("pages");
	const pagesById = indexPagesById(pages);
	const articles = await getPublishedArticles();
	const items: BackgroundAttributionItem[] = [];

	for (const page of pages) {
		const item = toItem(
			page.data.backgroundAttribution,
			page.data.title,
			getPageHref(page, pagesById),
		);
		if (item) {
			items.push(item);
		}
	}

	for (const article of articles) {
		const item = toItem(
			article.data.backgroundAttribution,
			article.data.title,
			getArticleHref(article),
		);
		if (item) {
			items.push(item);
		}
	}

	return items.sort((a, b) => {
		const byTitle = a.usedOnTitle.localeCompare(b.usedOnTitle, "de");
		if (byTitle !== 0) {
			return byTitle;
		}
		return a.credit.localeCompare(b.credit, "de");
	});
}

function toItem(
	raw: string | undefined,
	usedOnTitle: string,
	usedOnHref: string,
): BackgroundAttributionItem | undefined {
	const credit = raw?.trim();
	if (!credit) {
		return undefined;
	}
	const kind = classifyAttribution(credit);
	return {
		credit,
		kind,
		creditHtml: kind === "html" ? sanitizeAttributionHtml(credit) : undefined,
		usedOnTitle,
		usedOnHref,
	};
}
