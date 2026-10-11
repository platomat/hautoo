import { resolveCmsImage } from "./cms-image";
import { withBuildId } from "./build-id";
import { getSiteConfig } from "./site-config";

export type FaviconLink = {
	href: string;
	type?: string;
	media?: string;
};

const DEFAULT_SVG = "/img/favicon.svg";
const DEFAULT_ICO = "/img/favicon.ico";

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
 * Default = CMS or `public/img/favicon.svg`; optional dark via prefers-color-scheme.
 */
export function getFaviconLinks(): FaviconLink[] {
	const favicons = getSiteConfig().general?.favicons;
	const defaultHref =
		resolveFaviconHref(favicons?.default) ?? withBuildId(DEFAULT_SVG);
	const darkHref = resolveFaviconHref(favicons?.dark);
	const usingBuiltInDefault = !favicons?.default?.trim();

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

	if (usingBuiltInDefault) {
		links.push({
			href: withBuildId(DEFAULT_ICO),
			type: "image/x-icon",
		});
	}

	return links;
}
