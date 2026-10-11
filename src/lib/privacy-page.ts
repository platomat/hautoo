import { getSiteConfig } from "./site-config";
import { getPageHref, getPublicPages, indexPagesById } from "./pages";

/** CMS General → Privacy page (pages collection slug), or empty. */
export function getPrivacyPageId(): string {
	return getSiteConfig().general?.privacyPage?.trim() ?? "";
}

/**
 * Public href for the configured privacy page, optional hash fragment.
 * Undefined when unset or page missing/not public.
 */
export async function getPrivacyPageHref(
	hash?: string,
): Promise<string | undefined> {
	const pageId = getPrivacyPageId();
	if (!pageId) return undefined;

	const pages = await getPublicPages();
	const pagesById = indexPagesById(pages);
	const page = pagesById.get(pageId);
	if (!page) return undefined;

	const href = getPageHref(page, pagesById);
	if (!hash) return href;
	const fragment = hash.replace(/^#/, "");
	return fragment ? `${href}#${fragment}` : href;
}
