import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { menuSchema } from "./cms/fields/menu";
import {
	backgroundAttributionSchema,
	backgroundImageSchema,
	backgroundOverlaySchema,
} from "./cms/fields/page-background";
import { seoSchema } from "./cms/fields/seo";

const pages = defineCollection({
	loader: glob({ pattern: "**/index.md", base: "./src/content/pages" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		/** Parent page id (folder slug), builds nested URLs like `/parent/child/`. */
		parent: z.string().optional(),
		/**
		 * Full-viewport background. CMS may store `/assets/…` (shared library)
		 * or an entry-relative filename — resolved via resolveCmsImage.
		 */
		backgroundImage: backgroundImageSchema,
		/** Black overlay over background, 0–100%. */
		backgroundOverlay: backgroundOverlaySchema.optional(),
		/** Credit text or bare URL; listed on Impressum. */
		backgroundAttribution: backgroundAttributionSchema,
		/** Shared SEO object (same shape as Sveltia `&field_seo`). */
		seo: seoSchema.optional(),
	}),
});

const menus = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/content/menus" }),
	schema: menuSchema,
});

const tags = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/content/tags" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
	}),
});

const articles = defineCollection({
	loader: glob({ pattern: "**/index.md", base: "./src/content/articles" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			summary: z.string().optional(),
			pubDate: z.coerce.date(),
			draft: z.boolean().default(false),
			/** Entry-relative only (Variante B) — use `image()` for optimization. */
			heroImage: image().optional(),
			backgroundImage: backgroundImageSchema,
			backgroundOverlay: backgroundOverlaySchema.optional(),
			backgroundAttribution: backgroundAttributionSchema,
			tags: z.array(z.string()).default([]),
			videoProvider: z.enum(["youtube", "vimeo"]).optional(),
			videoId: z.string().optional(),
			seo: seoSchema.optional(),
		}),
});

const glossar = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/content/glossar" }),
	schema: z.object({
		title: z.string(),
		definition: z.string(),
		relatedArticles: z.array(z.string()).default([]),
	}),
});

export const collections = { pages, menus, tags, articles, glossar };
