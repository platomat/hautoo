import {
	contentWidthSchema,
	type ContentWidth,
	type EntryLayout,
} from "../cms/fields/content-width";
import type { ContentWidthCollectionKey } from "../cms/fields/site-config";
import { contentNeedsWideLayout } from "./content-embeds";
import { getSiteConfig } from "./site-config";

export type { ContentWidthCollectionKey };

export type EntryWidthFields = {
	layout?: EntryLayout;
	/** @deprecated Prefer `layout.contentWidth`. */
	contentWidth?: ContentWidth | undefined;
};

/**
 * Resolve content column width for a collection view.
 * Explicit layout/frontmatter wins. Else listing embeds → wide. Else global default.
 */
export async function resolveContentWidth(
	collection: ContentWidthCollectionKey,
	entry?: EntryWidthFields,
	body?: string | undefined,
): Promise<ContentWidth> {
	const local = entry?.layout?.contentWidth ?? entry?.contentWidth;
	if (local) {
		return local;
	}
	if (body && (await contentNeedsWideLayout(body))) {
		return "wide";
	}
	const config = getSiteConfig();
	const globalDefault = config.design?.contentWidth?.[collection];
	const parsed = contentWidthSchema.safeParse(globalDefault);
	return parsed.success ? parsed.data : "default";
}
