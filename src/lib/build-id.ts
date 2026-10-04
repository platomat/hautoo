/**
 * Short build identity for cache-busting query params on public assets.
 * Prefer Cloudflare Pages / CI commit SHA; fall back to BUILD_ID or "dev".
 */
export function getBuildId(): string {
	const fromCf = import.meta.env.CF_PAGES_COMMIT_SHA;
	if (typeof fromCf === "string" && fromCf.length > 0) {
		return fromCf.slice(0, 8);
	}

	const fromGithub = import.meta.env.GITHUB_SHA;
	if (typeof fromGithub === "string" && fromGithub.length > 0) {
		return fromGithub.slice(0, 8);
	}

	const fromBuild = import.meta.env.BUILD_ID;
	if (typeof fromBuild === "string" && fromBuild.length > 0) {
		return fromBuild.slice(0, 12);
	}

	return "dev";
}

/** Append `?v=<buildId>` (or `&v=`) to a public asset URL. */
export function withBuildId(path: string): string {
	const id = getBuildId();
	const sep = path.includes("?") ? "&" : "?";
	return `${path}${sep}v=${encodeURIComponent(id)}`;
}
