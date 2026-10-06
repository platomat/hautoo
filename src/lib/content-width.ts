import {
	contentWidthSchema,
	type ContentWidth,
} from "../cms/fields/content-width";
import { contentNeedsWideLayout } from "./content-embeds";
import { getSiteConfig } from "./site-config";

export type EntryWidthFields = {
	contentWidth?: ContentWidth | undefined;
};

/**
 * Resolve content column width for a page or article.
 * Explicit frontmatter wins. Else listing embeds → wide. Else global default.
 */
export async function resolveContentWidth(
	collection: "pages" | "articles",
	entry: EntryWidthFields,
	body: string | undefined,
): Promise<ContentWidth> {
	if (entry.contentWidth) {
		return entry.contentWidth;
	}
	if (await contentNeedsWideLayout(body)) {
		return "wide";
	}
	const config = await getSiteConfig();
	const globalDefault = config.content?.width?.[collection];
	const parsed = contentWidthSchema.safeParse(globalDefault);
	return parsed.success ? parsed.data : "default";
}
