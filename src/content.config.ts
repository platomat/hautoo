import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { menuSchema } from "./cms/fields/menu";
import { seoSchema } from "./cms/fields/seo";

const pages = defineCollection({
	loader: glob({ pattern: "**/index.md", base: "./src/content/pages" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		/** Parent page id (folder slug), builds nested URLs like `/parent/child/`. */
		parent: z.string().optional(),
		/** Shared SEO object (same shape as Sveltia `&field_seo`). */
		seo: seoSchema.optional(),
	}),
});

const menus = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/content/menus" }),
	schema: menuSchema,
});

export const collections = { pages, menus };
