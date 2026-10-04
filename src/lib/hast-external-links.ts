import { defineHastPlugin } from "satteri";

/** Must match `site` in `astro.config.mjs`. */
const SITE_HOST = "hautoo.storyofai.net";

function isExternalHref(href: string): boolean {
	const trimmed = href.trim();
	if (!trimmed) {
		return false;
	}
	if (
		trimmed.startsWith("/") ||
		trimmed.startsWith("#") ||
		trimmed.startsWith("?") ||
		trimmed.startsWith("mailto:") ||
		trimmed.startsWith("tel:")
	) {
		return false;
	}

	try {
		const url = new URL(trimmed, `https://${SITE_HOST}/`);
		if (url.protocol !== "http:" && url.protocol !== "https:") {
			return false;
		}
		const host = url.hostname.replace(/^www\./, "");
		return host !== SITE_HOST;
	} catch {
		return false;
	}
}

/** Open external Markdown links in a new tab (noopener). */
export const hastExternalLinks = defineHastPlugin({
	name: "hast-external-links",
	element: {
		filter: ["a"],
		visit(node, ctx) {
			const href = node.properties.href;
			if (typeof href === "string" && isExternalHref(href)) {
				ctx.setProperty(node, "target", "_blank");
				ctx.setProperty(node, "rel", "noopener noreferrer");
			}
		},
	},
});
