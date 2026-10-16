import { defineHastPlugin, type PluginFactoryContext } from "satteri";
import { createHeadingSlugger } from "./heading-slug";

/**
 * Assign ASCII heading `id`s before Satteri's built-in heading-ids plugin.
 * If `id` is already set, Satteri keeps it (and uses it in `astro.headings`).
 * Factory: fresh slugger per document (duplicate titles → `-1`, `-2`, …).
 */
export function hastHeadingIds(_ctx: PluginFactoryContext) {
	const slugger = createHeadingSlugger();
	return defineHastPlugin({
		name: "hast-heading-ids-ascii",
		element: {
			filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
			visit(node, ctx) {
				const existing = node.properties?.id;
				if (typeof existing === "string" && existing.trim()) {
					return;
				}
				const text = ctx.textContent(node).trim();
				if (!text) {
					return;
				}
				ctx.setProperty(node, "id", slugger.slug(text));
			},
		},
	});
}
