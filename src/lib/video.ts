export type VideoProvider = "youtube" | "vimeo";

/** Extract a YouTube/Vimeo id from a bare id or common URL forms. */
export function normalizeVideoId(
	provider: VideoProvider,
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
	provider: VideoProvider,
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
