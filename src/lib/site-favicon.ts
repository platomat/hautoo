import type { ImageMetadata } from "astro";
import { resolveCmsImage } from "./cms-image";
import { getSiteConfig } from "./site-config";

export type FaviconLink = {
	href: string;
	type?: string;
	media?: string;
};

/** Media-library fallback when CMS favicon fields are empty. */
const DEFAULT_CMS_PATH = "/assets/favicon.svg";

/**
 * Default favicon as Astro ImageMetadata (CMS or `/assets/favicon.svg`).
 * Used by `{{separator mark="favicon"}}`.
 */
export function resolveFaviconMeta(): ImageMetadata | undefined {
	const favicons = getSiteConfig().general?.favicons;
	return (
		resolveCmsImage(favicons?.default) ??
		resolveCmsImage(DEFAULT_CMS_PATH)
	);
}

function mimeForPath(path: string): string | undefined {
	const lower = path.toLowerCase().split("?")[0] ?? "";
	if (lower.endsWith(".svg")) return "image/svg+xml";
	if (lower.endsWith(".png")) return "image/png";
	if (lower.endsWith(".webp")) return "image/webp";
	if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
	if (lower.endsWith(".gif")) return "image/gif";
	if (lower.endsWith(".ico")) return "image/x-icon";
	return undefined;
}

/** Resolve CMS media path to a build URL, or undefined. */
function resolveFaviconHref(cmsPath: string | undefined): string | undefined {
	const trimmed = cmsPath?.trim();
	if (!trimmed) return undefined;
	const meta = resolveCmsImage(trimmed);
	if (meta?.src) {
		return meta.src;
	}
	console.warn(`[site-favicon] asset not found: ${trimmed}`);
	return undefined;
}

/**
 * `<link rel="icon">` entries for BaseLayout.
 * Default = CMS or `/assets/favicon.svg`; optional dark via prefers-color-scheme.
 */
export function getFaviconLinks(): FaviconLink[] {
	const favicons = getSiteConfig().general?.favicons;
	const defaultHref =
		resolveFaviconHref(favicons?.default) ??
		resolveFaviconHref(DEFAULT_CMS_PATH);
	const darkHref = resolveFaviconHref(favicons?.dark);

	if (!defaultHref) {
		console.warn(
			`[site-favicon] no favicon resolved (CMS empty and ${DEFAULT_CMS_PATH} missing)`,
		);
		return [];
	}

	const links: FaviconLink[] = [];

	if (darkHref && darkHref !== defaultHref) {
		links.push({
			href: defaultHref,
			type: mimeForPath(defaultHref),
			media: "(prefers-color-scheme: light)",
		});
		links.push({
			href: darkHref,
			type: mimeForPath(darkHref),
			media: "(prefers-color-scheme: dark)",
		});
		// Browsers that ignore media= on icons
		links.push({
			href: defaultHref,
			type: mimeForPath(defaultHref),
		});
	} else {
		links.push({
			href: defaultHref,
			type: mimeForPath(defaultHref),
		});
	}

	return links;
}
