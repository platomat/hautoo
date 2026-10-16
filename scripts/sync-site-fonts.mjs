#!/usr/bin/env node
/**
 * Sync Design → Schrift fonts into public/fonts/ + fonts.generated.css.
 *
 * 1) Fontsource (curated `site-fonts.json`): download selected weights via jsDelivr.
 * 2) Custom: scan `src/fonts/custom/<id>/` (Transfonter-style stylesheet.css + files).
 *    Always publish to `public/fonts/<id>/` + `stylesheet.css` for optional
 *    `<link rel="stylesheet" href="/fonts/<id>/stylesheet.css">` (Head-Code).
 *    Paths in source CSS only name files; we rewrite to `/fonts/<id>/…`.
 *    Site-wide Design-Schrift still only pulls selected IDs into fonts.generated.css.
 *
 * Also writes `site-fonts.generated.json` (CMS + Zod) and updates font options in
 * `public/admin/config.yml`. Run from predev/prebuild.
 */
import {
	copyFile,
	mkdir,
	readdir,
	readFile,
	stat,
	writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const curatedCatalogPath = path.join(root, "src/cms/fields/site-fonts.json");
const generatedCatalogPath = path.join(
	root,
	"src/cms/fields/site-fonts.generated.json",
);
const designPath = path.join(root, "src/content/settings/design.json");
const outCssPath = path.join(root, "src/styles/fonts.generated.css");
const fontsRoot = path.join(root, "public/fonts");
const customRoot = path.join(root, "src/fonts/custom");
const adminConfigPath = path.join(root, "public/admin/config.yml");

const SUBSETS = ["latin", "latin-ext"];
const HEADING_LEVELS = ["h1", "h2", "h3", "h4", "h5", "h6"];

const FALLBACK_UNICODE = {
	latin:
		"U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
	"latin-ext":
		"U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
};

function nearestWeight(available, wanted) {
	if (!available?.length) {
		return wanted;
	}
	return available.reduce((best, weight) =>
		Math.abs(weight - wanted) < Math.abs(best - wanted) ? weight : best,
	);
}

async function readJson(filePath) {
	return JSON.parse(await readFile(filePath, "utf8"));
}

async function fetchJson(url) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`GET ${url} → ${response.status}`);
	}
	return response.json();
}

async function downloadFile(url, dest) {
	const response = await fetch(url);
	if (!response.ok) {
		return false;
	}
	await mkdir(path.dirname(dest), { recursive: true });
	const buffer = Buffer.from(await response.arrayBuffer());
	await writeFile(dest, buffer);
	return true;
}

function cdnUrl(fontId, subset, weight) {
	return `https://cdn.jsdelivr.net/fontsource/fonts/${fontId}@latest/${subset}-${weight}-normal.woff2`;
}

function parseWeight(raw) {
	const value = String(raw ?? "400").trim().toLowerCase();
	if (value === "normal") return 400;
	if (value === "bold") return 700;
	const num = Number(value);
	return Number.isFinite(num) ? num : 400;
}

function parseStyle(raw) {
	const value = String(raw ?? "normal").trim().toLowerCase();
	if (value.startsWith("italic") || value.startsWith("oblique")) {
		return "italic";
	}
	return "normal";
}

function extractProp(block, name) {
	const re = new RegExp(`${name}\\s*:\\s*([^;]+);`, "i");
	const m = block.match(re);
	return m ? m[1].trim() : undefined;
}

function extractUrls(srcValue) {
	if (!srcValue) return [];
	const urls = [];
	const re = /url\(\s*['"]?([^'")]+)['"]?\s*\)/gi;
	let m;
	while ((m = re.exec(srcValue))) {
		urls.push(m[1].trim());
	}
	return urls;
}

function pickPreferredUrl(urls) {
	const rank = (u) => {
		const lower = u.toLowerCase();
		if (lower.includes(".woff2")) return 0;
		if (lower.includes(".woff")) return 1;
		if (lower.includes(".ttf") || lower.includes(".otf")) return 2;
		return 9;
	};
	return [...urls].sort((a, b) => rank(a) - rank(b))[0];
}

function stripQuotes(value) {
	return String(value ?? "")
		.trim()
		.replace(/^['"]|['"]$/g, "");
}

function titleFromId(id) {
	return id
		.split(/[-_]+/)
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

/**
 * @param {string} cssText
 * @returns {{ family: string, weight: number, style: string, localFile: string }[]}
 */
function parseFontFaces(cssText) {
	const faces = [];
	const blocks = cssText.match(/@font-face\s*\{[\s\S]*?\}/gi) ?? [];
	for (const block of blocks) {
		const family = stripQuotes(extractProp(block, "font-family"));
		const src = extractProp(block, "src");
		const urls = extractUrls(src);
		const localFile = pickPreferredUrl(
			urls.filter((u) => !/^https?:\/\//i.test(u) && !u.startsWith("data:")),
		);
		if (!family || !localFile) {
			continue;
		}
		faces.push({
			family,
			weight: parseWeight(extractProp(block, "font-weight")),
			style: parseStyle(extractProp(block, "font-style")),
			localFile: localFile.replace(/^\.\//, ""),
		});
	}
	return faces;
}

async function findStylesheet(dir) {
	const preferred = ["stylesheet.css", "fonts.css", "font.css"];
	for (const name of preferred) {
		try {
			await stat(path.join(dir, name));
			return name;
		} catch {
			/* missing */
		}
	}
	const names = await readdir(dir);
	const css = names.filter((n) => n.toLowerCase().endsWith(".css")).sort();
	return css[0];
}

/**
 * Discover custom font packages under src/fonts/custom/<id>/.
 * @returns {Promise<{ id: string; label: string; family: string; fallback: string; source: "custom"; faces: { family: string; weight: number; style: string; localFile: string; absFile: string }[] }[]>}
 */
async function discoverCustomFonts() {
	/** @type {Awaited<ReturnType<typeof discoverCustomFonts>>} */
	const found = [];
	let entries = [];
	try {
		entries = await readdir(customRoot, { withFileTypes: true });
	} catch {
		return found;
	}

	for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
		if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
		const id = entry.name;
		if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(id)) {
			console.warn(
				`[sync-site-fonts] skip custom "${id}" (use slug folder names, e.g. my-font)`,
			);
			continue;
		}
		const dir = path.join(customRoot, id);
		const sheetName = await findStylesheet(dir);
		if (!sheetName) {
			console.warn(
				`[sync-site-fonts] skip custom "${id}" (no stylesheet.css / *.css)`,
			);
			continue;
		}
		const cssText = await readFile(path.join(dir, sheetName), "utf8");
		const parsed = parseFontFaces(cssText);
		if (parsed.length === 0) {
			console.warn(
				`[sync-site-fonts] skip custom "${id}" (no @font-face with local url())`,
			);
			continue;
		}

		/** @type {{ label?: string; family?: string; fallback?: string }} */
		let meta = {};
		try {
			meta = await readJson(path.join(dir, "meta.json"));
		} catch {
			/* optional */
		}

		const family = meta.family?.trim() || parsed[0].family;
		const faces = [];
		for (const face of parsed) {
			const absFile = path.resolve(dir, face.localFile);
			try {
				await stat(absFile);
			} catch {
				console.warn(
					`[sync-site-fonts] ${id}: missing file ${face.localFile}, skip face`,
				);
				continue;
			}
			faces.push({ ...face, family, absFile });
		}
		if (faces.length === 0) continue;

		found.push({
			id,
			label: meta.label?.trim() || titleFromId(id),
			family,
			fallback: meta.fallback?.trim() || "system-ui, sans-serif",
			source: "custom",
			faces,
		});
		console.log(
			`[sync-site-fonts] custom ${id}: ${faces.length} face(s) from ${sheetName}`,
		);
	}
	return found;
}

function yamlDoubleQuoted(value) {
	return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

/**
 * Refresh Sveltia select options for body/heading fonts.
 * @param {{ id: string; label: string }[]} fonts
 */
async function updateAdminConfigFontOptions(fonts) {
	let yaml;
	try {
		yaml = await readFile(adminConfigPath, "utf8");
	} catch {
		console.warn("[sync-site-fonts] admin config.yml missing, skip CMS options");
		return;
	}

	const optionsBlock = fonts
		.map(
			(font) =>
				`                  - { label: ${yamlDoubleQuoted(font.label)}, value: ${font.id} }`,
		)
		.join("\n");

	const replaced = yaml.replace(
		/(options: &font_family_options\n)(?:\s*- \{ label: .+\n)+/,
		`$1${optionsBlock}\n`,
	);

	if (replaced === yaml) {
		console.warn(
			"[sync-site-fonts] could not patch &font_family_options in config.yml",
		);
		return;
	}

	await writeFile(adminConfigPath, replaced, "utf8");
	console.log("[sync-site-fonts] updated public/admin/config.yml font options");
}

/**
 * Copy custom package to public/fonts/<id>/ and write stylesheet.css for Head-Code links.
 * @param {{ id: string; family: string; faces: { weight: number; style: string; absFile: string }[] }} custom
 * @returns {Promise<{ weight: number; style: string; file: string }[]>}
 */
async function publishCustomFontPackage(custom) {
	const destDir = path.join(fontsRoot, custom.id);
	await mkdir(destDir, { recursive: true });
	const faces = [];
	const usedNames = new Set();
	for (const face of custom.faces) {
		const base = path.basename(face.absFile);
		let destName = base;
		if (usedNames.has(destName)) {
			destName = `${face.weight}-${face.style}-${base}`;
		}
		usedNames.add(destName);
		await copyFile(face.absFile, path.join(destDir, destName));
		faces.push({
			weight: face.weight,
			style: face.style,
			file: `/fonts/${custom.id}/${destName}`,
		});
		console.log(`[sync-site-fonts] custom ${custom.id}/${destName}`);
	}

	const sheet = [
		`/* Generated by sync-site-fonts from src/fonts/custom/${custom.id}/ — do not edit. */`,
		`/* Optional: <link rel="stylesheet" href="/fonts/${custom.id}/stylesheet.css"> */`,
		"",
		...faces.flatMap((face) => [
			`@font-face {
	font-family: "${custom.family}";
	src: url("${face.file}") format("woff2");
	font-weight: ${face.weight};
	font-style: ${face.style};
	font-display: swap;
}`,
			"",
		]),
	];
	await writeFile(path.join(destDir, "stylesheet.css"), sheet.join("\n"), "utf8");
	console.log(
		`[sync-site-fonts] custom ${custom.id}/stylesheet.css (${faces.length} face(s))`,
	);
	return faces;
}

async function main() {
	const curated = await readJson(curatedCatalogPath);
	const customFonts = await discoverCustomFonts();
	const customById = new Map(customFonts.map((font) => [font.id, font]));

	const curatedIds = new Set(curated.fonts.map((f) => f.id));
	for (const id of customById.keys()) {
		if (curatedIds.has(id)) {
			throw new Error(
				`Custom font id "${id}" conflicts with Fontsource catalog entry`,
			);
		}
	}

	const mergedFonts = [
		...curated.fonts.map((font) => ({
			...font,
			source: font.source ?? "fontsource",
		})),
		...customFonts.map(({ id, label, family, fallback, source }) => ({
			id,
			label,
			family,
			fallback,
			source,
		})),
	];

	await writeFile(
		generatedCatalogPath,
		`${JSON.stringify({ fonts: mergedFonts }, null, "\t")}\n`,
		"utf8",
	);
	console.log(
		`[sync-site-fonts] wrote ${path.relative(root, generatedCatalogPath)} (${mergedFonts.length} fonts)`,
	);
	await updateAdminConfigFontOptions(mergedFonts);

	/** Always publish custom packages (Head-Code link), independent of Design selection. */
	/** @type {Map<string, { family: string; faces: { weight: number; style: string; file: string }[] }>} */
	const publishedCustom = new Map();
	for (const custom of customFonts) {
		const faces = await publishCustomFontPackage(custom);
		publishedCustom.set(custom.id, { family: custom.family, faces });
	}

	const design = await readJson(designPath);
	const typography = design.typography ?? {};
	const bodyFont = typography.bodyFont ?? "ubuntu";
	const headingFont = typography.headingFont ?? "ubuntu";
	const bodyWeight = Number(typography.bodyWeight ?? 300);
	const headings = typography.headings ?? {};

	const wantedWeights = new Set([bodyWeight]);
	for (const level of HEADING_LEVELS) {
		wantedWeights.add(Number(headings[level]?.weight ?? 500));
	}

	const fontIds = [...new Set([bodyFont, headingFont])];
	const familyById = new Map(mergedFonts.map((font) => [font.id, font.family]));

	/** @type {Map<string, { family: string, faces: Array<{ weight: number, style?: string, subset?: string, file: string, unicodeRange?: string }> }>} */
	const plan = new Map();

	for (const fontId of fontIds) {
		if (!familyById.has(fontId)) {
			throw new Error(`Unknown font id "${fontId}" in design.typography`);
		}

		const published = publishedCustom.get(fontId);
		if (published) {
			plan.set(fontId, published);
			continue;
		}

		let meta;
		try {
			meta = await fetchJson(`https://api.fontsource.org/v1/fonts/${fontId}`);
		} catch (error) {
			console.warn(
				`[sync-site-fonts] Metadata for ${fontId} unavailable (${error.message}); using CDN defaults.`,
			);
			meta = {
				weights: [...wantedWeights],
				unicodeRange: FALLBACK_UNICODE,
			};
		}

		const available = meta.weights ?? [...wantedWeights];
		const faces = [];
		const resolvedWeights = new Set();

		for (const wanted of [...wantedWeights].sort((a, b) => a - b)) {
			const weight = nearestWeight(available, wanted);
			if (weight !== wanted) {
				console.warn(
					`[sync-site-fonts] ${fontId}: weight ${wanted} → ${weight} (nearest available)`,
				);
			}
			resolvedWeights.add(weight);
		}

		for (const weight of [...resolvedWeights].sort((a, b) => a - b)) {
			for (const subset of SUBSETS) {
				const fileName = `${weight}-normal-${subset}.woff2`;
				const dest = path.join(fontsRoot, fontId, fileName);
				const url = cdnUrl(fontId, subset, weight);
				const ok = await downloadFile(url, dest);
				if (!ok) {
					if (subset === "latin") {
						throw new Error(`Failed to download ${url}`);
					}
					console.warn(`[sync-site-fonts] skip missing ${url}`);
					continue;
				}
				const unicodeRange =
					meta.unicodeRange?.[subset] ??
					FALLBACK_UNICODE[subset] ??
					FALLBACK_UNICODE.latin;
				faces.push({
					weight,
					style: "normal",
					subset,
					file: `/fonts/${fontId}/${fileName}`,
					unicodeRange: unicodeRange.replaceAll(",", ", "),
				});
				console.log(`[sync-site-fonts] ${fontId}/${fileName}`);
			}
		}

		plan.set(fontId, {
			family: familyById.get(fontId),
			faces,
		});
	}

	const cssChunks = [
		"/* Generated by scripts/sync-site-fonts.mjs — do not edit. */",
		"/* Fontsource via jsDelivr and/or src/fonts/custom/; served from public/fonts/. */",
		"",
	];

	for (const [fontId, { family, faces }] of plan) {
		cssChunks.push(`/* ${family} (${fontId}) */`);
		for (const face of faces) {
			const style = face.style ?? "normal";
			const unicode = face.unicodeRange
				? `\n\tunicode-range: ${face.unicodeRange};`
				: "";
			cssChunks.push(`@font-face {
	font-family: "${family}";
	src: url("${face.file}") format("woff2");
	font-weight: ${face.weight};
	font-style: ${style};
	font-display: swap;${unicode}
}`);
			cssChunks.push("");
		}
	}

	await mkdir(path.dirname(outCssPath), { recursive: true });
	await writeFile(outCssPath, `${cssChunks.join("\n").trimEnd()}\n`, "utf8");
	console.log(`[sync-site-fonts] wrote ${path.relative(root, outCssPath)}`);
}

main().catch((error) => {
	console.error("[sync-site-fonts]", error);
	process.exit(1);
});
