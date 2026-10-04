import { createSatteriMarkdownProcessor } from "@astrojs/markdown-satteri";

/** Placeholders editors can put on their own line in page Markdown. */
export const CONTENT_EMBEDS = ["latest-articles", "tag-cloud"] as const;
export type ContentEmbedName = (typeof CONTENT_EMBEDS)[number];

export type ContentSegment =
	| { type: "html"; html: string }
	| { type: "embed"; name: ContentEmbedName };

const EMBED_LINE =
	/^\{\{(latest-articles|tag-cloud)\}\}\s*$/gm;

let markdownProcessor: Awaited<
	ReturnType<typeof createSatteriMarkdownProcessor>
> | null = null;

async function getProcessor() {
	markdownProcessor ??= await createSatteriMarkdownProcessor();
	return markdownProcessor;
}

export function hasContentEmbeds(body: string | undefined): boolean {
	if (!body) {
		return false;
	}
	EMBED_LINE.lastIndex = 0;
	return EMBED_LINE.test(body);
}

function isEmbedName(value: string): value is ContentEmbedName {
	return (CONTENT_EMBEDS as readonly string[]).includes(value);
}

/**
 * Split CMS Markdown on embed placeholders and render Markdown parts to HTML.
 * Markers must sit alone on a line: `{{latest-articles}}` / `{{tag-cloud}}`.
 */
export async function buildContentSegments(
	body: string | undefined,
): Promise<ContentSegment[]> {
	const source = body ?? "";
	if (!source.trim()) {
		return [];
	}

	const parts = source.split(EMBED_LINE);
	const processor = await getProcessor();
	const segments: ContentSegment[] = [];

	for (let i = 0; i < parts.length; i++) {
		const part = parts[i] ?? "";
		if (i % 2 === 1 && isEmbedName(part)) {
			segments.push({ type: "embed", name: part });
			continue;
		}
		const markdown = part.trim();
		if (!markdown) {
			continue;
		}
		const { code } = await processor.render(markdown);
		if (code.trim()) {
			segments.push({ type: "html", html: code });
		}
	}

	return segments;
}
