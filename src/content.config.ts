import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { modifiedDateSchema } from "./cms/fields/dates";
import { menuSchema } from "./cms/fields/menu";
import {
	backgroundAttributionSchema,
	backgroundImageSchema,
	backgroundOverlaySchema,
} from "./cms/fields/page-background";
import { seoSchema } from "./cms/fields/seo";
import { entryStatusSchema } from "./cms/fields/status";

const publishDateSchema = z.coerce.date().optional();

const pages = defineCollection({
	loader: glob({ pattern: "**/index.md", base: "./src/content/pages" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		/** draft | published | future | trash */
		status: entryStatusSchema,
		/** Schedule date when status is `future`. */
		publishDate: publishDateSchema,
		/** Last editorial change (SEO meta; not shown in page UI yet). */
		modifiedDate: modifiedDateSchema,
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
		modifiedDate: modifiedDateSchema,
	}),
});

const articles = defineCollection({
	loader: glob({ pattern: "**/index.md", base: "./src/content/articles" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			summary: z.string().optional(),
			pubDate: z.coerce.date(),
			/** draft | published | future | trash (`pubDate` gates `future`) */
			status: entryStatusSchema,
			/** Last editorial change (SEO meta; not shown in article UI yet). */
			modifiedDate: modifiedDateSchema,
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
		status: entryStatusSchema,
		publishDate: publishDateSchema,
		modifiedDate: modifiedDateSchema,
		relatedArticles: z.array(z.string()).default([]),
	}),
});

/** Reusable CMS snippets; injected via `{{block id="slug"}}` (no own URL). */
const blocks = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/content/blocks" }),
	schema: z.object({
		title: z.string(),
		status: entryStatusSchema,
		publishDate: publishDateSchema,
		modifiedDate: modifiedDateSchema,
	}),
});

export const collections = { pages, menus, tags, articles, glossar, blocks };
