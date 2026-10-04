import { z } from "astro/zod";

/** One link in a menu (page relation or external URL). */
export const menuLeafSchema = z.object({
	label: z.string(),
	linkType: z.enum(["page", "url"]).default("page"),
	/** Page slug (`pages` collection id / folder name). */
	page: z.string().optional(),
	/** External or absolute path when linkType is `url`. */
	url: z.string().optional(),
	/** Optional CSS class(es) on the link (WordPress-style, space-separated). */
	cssClass: z.string().optional(),
});

/** Top-level menu item with optional one-level children (submenu). */
export const menuItemSchema = menuLeafSchema.extend({
	children: z.array(menuLeafSchema).optional(),
});

export const menuSchema = z.object({
	title: z.string(),
	items: z.array(menuItemSchema).default([]),
});

export type MenuLeaf = z.infer<typeof menuLeafSchema>;
export type MenuItem = z.infer<typeof menuItemSchema>;
export type Menu = z.infer<typeof menuSchema>;
