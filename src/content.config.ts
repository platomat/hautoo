import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pages = defineCollection({
	loader: glob({ pattern: "**/index.md", base: "./src/content/pages" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		menuLabel: z.string().optional(),
		menuOrder: z.number().int().optional(),
		showInMenu: z.boolean().default(true),
	}),
});

export const collections = { pages };
