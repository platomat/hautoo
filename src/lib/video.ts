export type ThirdPartyVideoProvider = "youtube" | "vimeo";
/** Self-hosted file (e.g. Cloudflare R2) via HTML5 `<video>`. */
export type FileVideoProvider = "file";
export type VideoProvider = ThirdPartyVideoProvider | FileVideoProvider;

export function isThirdPartyVideoProvider(
	provider: string | undefined,
): provider is ThirdPartyVideoProvider {
	return provider === "youtube" || provider === "vimeo";
}

export function isFileVideoProvider(
	provider: string | undefined,
): provider is FileVideoProvider {
	return provider === "file";
}

/** Extract a YouTube/Vimeo id from a bare id or common URL forms. */
export function normalizeVideoId(
	provider: ThirdPartyVideoProvider,
	raw: string,
): string | undefined {
	const value = raw.trim();
	if (!value) {
		return undefined;
	}

	if (provider === "youtube") {
		if (/^[\w-]{6,}$/.test(value) && !value.includes("/")) {
			return value;
		}
		try {
			const url = new URL(value);
			if (url.hostname.includes("youtu.be")) {
				return url.pathname.replace(/^\//, "") || undefined;
			}
			const fromQuery = url.searchParams.get("v");
			if (fromQuery) {
				return fromQuery;
			}
			const embed = url.pathname.match(/\/embed\/([\w-]+)/);
			if (embed?.[1]) {
				return embed[1];
			}
		} catch {
			return undefined;
		}
		return undefined;
	}

	if (/^\d+$/.test(value)) {
		return value;
	}
	try {
		const url = new URL(value);
		const match = url.pathname.match(/\/(?:video\/)?(\d+)/);
		return match?.[1];
	} catch {
		return undefined;
	}
}

export function videoEmbedSrc(
	provider: ThirdPartyVideoProvider,
	id: string,
): string | undefined {
	const normalized = normalizeVideoId(provider, id);
	if (!normalized) {
		return undefined;
	}
	if (provider === "youtube") {
		return `https://www.youtube-nocookie.com/embed/${normalized}`;
	}
	return `https://player.vimeo.com/video/${normalized}`;
}

/**
 * Resolve a self-hosted video URL.
 * Absolute http(s) or root-relative `/…` stay as-is; otherwise join with `baseUrl`.
 */
export function resolveFileVideoSrc(
	raw: string,
	baseUrl: string | undefined,
): string | undefined {
	const value = raw.trim();
	if (!value) {
		return undefined;
	}
	if (/^https?:\/\//i.test(value) || value.startsWith("//")) {
		return value.startsWith("//") ? `https:${value}` : value;
	}
	if (value.startsWith("/")) {
		return value;
	}
	const base = (baseUrl ?? "").trim();
	if (!base) {
		return undefined;
	}
	const normalizedBase = base.endsWith("/") ? base : `${base}/`;
	const key = value.replace(/^\.\//, "").replace(/^\/+/, "");
	try {
		return new URL(key, normalizedBase).href;
	} catch {
		return `${normalizedBase}${key}`;
	}
}
