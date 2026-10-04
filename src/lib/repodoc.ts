import fs from "node:fs";
import path from "node:path";

/** Public GitHub URL for repo docs (main branch). */
export const REPO_DOC_GITHUB_BASE =
	"https://github.com/platomat/hautoo/blob/main/";

const DOCS_ROOT = path.join(process.cwd(), "docs");

export type RepoDocEmbedProps = {
	/** Repo-relative path, e.g. `docs/astro/README.md`. */
	path: string;
	title: string;
	description?: string;
	href: string;
};

const PATH_RE = /^docs\/[a-z0-9][a-z0-9._/-]*\.md$/i;

export function normalizeRepoDocPath(raw: string): string | null {
	const trimmed = raw.trim().replace(/^\//, "");
	if (!trimmed.startsWith("docs/") || !PATH_RE.test(trimmed)) {
		return null;
	}
	if (trimmed.includes("..")) {
		return null;
	}
	const absolute = path.join(process.cwd(), trimmed);
	if (!absolute.startsWith(DOCS_ROOT)) {
		return null;
	}
	if (!fs.existsSync(absolute)) {
		return null;
	}
	return trimmed;
}

export function repoDocGitHubHref(repoPath: string): string {
	return `${REPO_DOC_GITHUB_BASE}${repoPath}`;
}

export function readRepoDocTitle(repoPath: string): string | undefined {
	const absolute = path.join(process.cwd(), repoPath);
	try {
		const text = fs.readFileSync(absolute, "utf8");
		const match = text.match(/^#\s+(.+)$/m);
		return match?.[1]?.trim();
	} catch {
		return undefined;
	}
}

export function parseRepoDocProps(attrsRaw: string | undefined): RepoDocEmbedProps | null {
	const attrs: Record<string, string> = {};
	const re = /(\w+)="([^"]*)"/g;
	for (const match of (attrsRaw ?? "").matchAll(re)) {
		attrs[match[1] ?? ""] = match[2] ?? "";
	}

	const repoPath = normalizeRepoDocPath(attrs.path ?? "");
	if (!repoPath) {
		return null;
	}

	const title =
		(attrs.title ?? "").trim() ||
		readRepoDocTitle(repoPath) ||
		repoPath.replace(/^docs\//, "").replace(/\/README\.md$/, "");

	const description = (attrs.description ?? "").trim() || undefined;

	return {
		path: repoPath,
		title,
		description,
		href: repoDocGitHubHref(repoPath),
	};
}
