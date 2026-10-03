import { z } from "astro/zod";

/** Shared SEO object — used by Astro content schemas; mirrored as YAML anchor `&field_seo` in `public/admin/config.yml`. */
export const seoSchema = z.object({
	seo_title: z.string().optional(),
	seo_description: z.string().optional(),
	index_visibility: z.enum(["index", "noindex"]).default("index"),
	follow_visibility: z.enum(["follow", "nofollow"]).default("follow"),
	noarchive: z.boolean().default(false),
	noimageindex: z.boolean().default(false),
	nosnippet: z.boolean().default(false),
	max_snippet_enabled: z.boolean().default(true),
	max_snippet: z.number().int().default(-1),
	max_video_preview_enabled: z.boolean().default(true),
	max_video_preview: z.number().int().default(-1),
	max_image_preview_enabled: z.boolean().default(true),
	max_image_preview: z.enum(["none", "standard", "large"]).default("large"),
});

export type Seo = z.infer<typeof seoSchema>;

/** Normalize missing/partial frontmatter to full SEO defaults. */
export function resolveSeo(seo: unknown): Seo {
	return seoSchema.parse(seo ?? {});
}

/** Build `<meta name="robots" content="…">` from SEO settings. */
export function buildRobotsContent(seo: Seo): string {
	const parts: string[] = [seo.index_visibility, seo.follow_visibility];

	if (seo.noarchive) parts.push("noarchive");
	if (seo.noimageindex) parts.push("noimageindex");
	if (seo.nosnippet) parts.push("nosnippet");
	if (seo.max_snippet_enabled) parts.push(`max-snippet:${seo.max_snippet}`);
	if (seo.max_video_preview_enabled) {
		parts.push(`max-video-preview:${seo.max_video_preview}`);
	}
	if (seo.max_image_preview_enabled) {
		parts.push(`max-image-preview:${seo.max_image_preview}`);
	}

	return parts.join(", ");
}
