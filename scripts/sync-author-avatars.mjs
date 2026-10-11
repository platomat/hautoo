#!/usr/bin/env node
/**
 * Download Gravatar (or direct image URL) avatars for authors into
 * src/assets/authors/gravatar/<slug>.* so visitors never hit gravatar.com.
 * Run from predev/prebuild. Local CMS `avatar` wins at render time.
 */
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const authorsDir = path.join(root, "src/content/authors");
const outDir = path.join(root, "src/assets/authors/gravatar");

function isEmail(value) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function gravatarUrlFromEmail(email, size = 256) {
	const hash = createHash("md5")
		.update(email.trim().toLowerCase())
		.digest("hex");
	return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}

function resolveFetchUrl(raw) {
	const value = String(raw || "").trim();
	if (!value) {
		return undefined;
	}
	if (isEmail(value)) {
		return gravatarUrlFromEmail(value);
	}
	if (/^https?:\/\//i.test(value)) {
		return value;
	}
	return undefined;
}

function extensionFromContentType(contentType, url) {
	const type = (contentType || "").split(";")[0].trim().toLowerCase();
	if (type === "image/jpeg") return ".jpg";
	if (type === "image/png") return ".png";
	if (type === "image/webp") return ".webp";
	if (type === "image/gif") return ".gif";
	const fromUrl = path.extname(new URL(url).pathname).toLowerCase();
	if ([".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(fromUrl)) {
		return fromUrl === ".jpeg" ? ".jpg" : fromUrl;
	}
	return ".jpg";
}

async function listAuthorFiles() {
	try {
		const names = await readdir(authorsDir);
		return names.filter((name) => name.endsWith(".md")).map((name) => path.join(authorsDir, name));
	} catch (error) {
		if (error && error.code === "ENOENT") {
			return [];
		}
		throw error;
	}
}

async function downloadAvatar(url, destBase) {
	const response = await fetch(url, {
		headers: { "User-Agent": "hautoo-sync-author-avatars" },
	});
	if (!response.ok) {
		console.warn(`[sync-author-avatars] GET ${url} → ${response.status}`);
		return false;
	}
	const ext = extensionFromContentType(
		response.headers.get("content-type"),
		url,
	);
	const dest = `${destBase}${ext}`;
	await mkdir(path.dirname(dest), { recursive: true });
	const buffer = Buffer.from(await response.arrayBuffer());
	await writeFile(dest, buffer);
	return dest;
}

async function main() {
	const files = await listAuthorFiles();
	if (files.length === 0) {
		console.log("[sync-author-avatars] no authors");
		return;
	}

	await mkdir(outDir, { recursive: true });
	let downloaded = 0;

	for (const file of files) {
		const slug = path.basename(file, ".md");
		const raw = await readFile(file, "utf8");
		const { data } = matter(raw);
		const fetchUrl = resolveFetchUrl(data.gravatarUrl);
		if (!fetchUrl) {
			continue;
		}
		const destBase = path.join(outDir, slug);
		const dest = await downloadAvatar(fetchUrl, destBase);
		if (dest) {
			downloaded += 1;
			console.log(`[sync-author-avatars] ${slug} → ${path.relative(root, dest)}`);
		}
	}

	console.log(`[sync-author-avatars] done (${downloaded} file(s))`);
}

main().catch((error) => {
	console.error("[sync-author-avatars]", error);
	process.exitCode = 1;
});
