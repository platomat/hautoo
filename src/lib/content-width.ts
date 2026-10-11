import {
	contentWidthSchema,
	type ContentWidth,
	type EntryLayout,
} from "../cms/fields/content-width";
import { contentNeedsWideLayout } from "./content-embeds";
import { getSiteConfig } from "./site-config";

export type EntryWidthFields = {
	layout?: EntryLayout;
	/** @deprecated Prefer `layout.contentWidth`. */
	contentWidth?: ContentWidth | undefined;
};

/**
 * Resolve content column width for a page or article.
 * Explicit layout/frontmatter wins. Else listing embeds → wide. Else global default.
 */
export async function resolveContentWidth(
	collection: "pages" | "articles",
	entry: EntryWidthFields,
	body: string | undefined,
): Promise<ContentWidth> {
	const local = entry.layout?.contentWidth ?? entry.contentWidth;
	if (local) {
		return local;
	}
	if (await contentNeedsWideLayout(body)) {
		return "wide";
	}
	const config = getSiteConfig();
	const globalDefault = config.design?.width?.[collection];
	const parsed = contentWidthSchema.safeParse(globalDefault);
	return parsed.success ? parsed.data : "default";
}
