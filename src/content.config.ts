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
import { siteConfigSchema } from "./cms/fields/site-config";
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
		/** Show heading TOC after the page hero (default off). */
		showToc: z.boolean().default(false),
		/** Which heading levels appear in the TOC (default h2 only). */
		tocLevels: z.array(z.enum(["h2", "h3", "h4"])).default(["h2"]),
		/** TOC heading label (default „Inhalt”). */
		tocTitle: z.string().default("Inhalt"),
		/** Raw HTML/JS/CSS injected before `</head>` (trusted CMS editors). */
		headCode: z.string().optional(),
		/** Raw HTML/JS/CSS injected before `</body>` (trusted CMS editors). */
		footerCode: z.string().optional(),
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
			/** Show heading TOC after the page hero (default off). */
			showToc: z.boolean().default(false),
			/** Which heading levels appear in the TOC (default h2 only). */
			tocLevels: z.array(z.enum(["h2", "h3", "h4"])).default(["h2"]),
			/** TOC heading label (default „Inhalt”). */
			tocTitle: z.string().default("Inhalt"),
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
		/** Tag slugs; same slug as glossar id is added automatically when a tag exists. */
		relatedTags: z.array(z.string()).default([]),
		seo: seoSchema.optional(),
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

/** Global YAML settings (no Markdown body). Entry id = filename without extension. */
const config = defineCollection({
	loader: glob({ pattern: "*.yaml", base: "./src/content/config" }),
	schema: siteConfigSchema,
});

export const collections = {
	pages,
	menus,
	tags,
	articles,
	glossar,
	blocks,
	config,
};
