/**
 * Sveltia editor blocks for page/article Markdown.
 * Inserted via the editor toolbar (like images); stored as {{…}} markers.
 */
(function registerHautuuEditorComponents() {
	if (typeof CMS === "undefined" || typeof CMS.registerEditorComponent !== "function") {
		console.warn("[hautuu] CMS.registerEditorComponent unavailable");
		return;
	}

	function parseAttrs(raw) {
		const out = {};
		const re = /(\w+)="([^"]*)"/g;
		let match;
		while ((match = re.exec(raw || "")) !== null) {
			out[match[1]] = match[2];
		}
		return out;
	}

	CMS.registerEditorComponent({
		id: "article-listing",
		label: "Artikel-Listing",
		icon: "newspaper",
		fields: [
			{
				name: "count",
				label: "Anzahl",
				widget: "number",
				value_type: "int",
				default: 3,
				min: 0,
				max: 48,
				hint: "0 = alle veröffentlichten Artikel.",
			},
			{
				name: "sort",
				label: "Sortierung",
				widget: "select",
				default: "newest",
				options: [
					{ label: "Neueste zuerst", value: "newest" },
					{ label: "Älteste zuerst", value: "oldest" },
					{ label: "Titel A–Z", value: "title-asc" },
					{ label: "Titel Z–A", value: "title-desc" },
				],
			},
			{
				name: "layout",
				label: "Layout",
				widget: "select",
				default: "grid",
				options: [
					{ label: "Grid (Karten)", value: "grid" },
					{ label: "Liste", value: "list" },
				],
			},
			{
				name: "columns",
				label: "Spalten (nur Grid)",
				widget: "number",
				value_type: "int",
				default: 3,
				min: 1,
				max: 4,
				hint: "Wird bei Layout „Liste“ ignoriert.",
			},
			{
				name: "gap",
				label: "Abstand (rem)",
				widget: "number",
				value_type: "float",
				default: 1.25,
				min: 0,
				max: 8,
				step: 0.25,
				hint: "Abstand zwischen Karten bzw. Listeneinträgen.",
			},
			{
				name: "show",
				label: "Felder auf der Karte",
				widget: "select",
				multiple: true,
				default: ["title", "intro", "tags", "date", "readingTime"],
				options: [
					{ label: "Titel", value: "title" },
					{ label: "Intro", value: "intro" },
					{ label: "Tags", value: "tags" },
					{ label: "Datum", value: "date" },
					{ label: "Lesezeit", value: "readingTime" },
				],
				hint: "Anzeige: Tags in eigener Zeile über Datum und Lesezeit.",
			},
		],
		pattern: /^\{\{article-listing(?<attrs>[^}]*)\}\}\s*$/m,
		fromBlock: (match) => {
			const attrs = parseAttrs(match?.groups?.attrs || "");
			const showDefault = "title,intro,tags,date,readingTime";
			return {
				count: attrs.count !== undefined && attrs.count !== "" ? attrs.count : "3",
				sort: attrs.sort || "newest",
				layout: attrs.layout || "grid",
				columns: attrs.columns || "3",
				gap: attrs.gap || "1.25",
				show: (attrs.show || showDefault).split(",").filter(Boolean),
			};
		},
		toBlock: ({
			count = 3,
			sort = "newest",
			layout = "grid",
			columns = 3,
			gap = 1.25,
			show = ["title", "intro", "tags", "date", "readingTime"],
		}) => {
			const showAttr = Array.isArray(show) ? show.join(",") : String(show || "");
			return `{{article-listing count="${count}" sort="${sort}" layout="${layout}" columns="${columns}" gap="${gap}" show="${showAttr}"}}`;
		},
		toPreview: ({
			count = 3,
			sort = "newest",
			layout = "grid",
			columns = 3,
			gap = 1.25,
			show = ["title", "intro", "tags", "date", "readingTime"],
		}) => {
			const showLabel = Array.isArray(show) ? show.join(", ") : String(show || "");
			return `<div style="padding:0.75rem 1rem;border:1px dashed #2e3833;border-radius:6px;color:#9aa89f;font-size:0.9rem">Artikel-Listing · ${count === 0 || count === "0" ? "alle" : count} · ${sort} · ${layout}${layout === "grid" ? ` · ${columns} Spalten` : ""} · gap ${gap}rem · ${showLabel}</div>`;
		},
	});

	CMS.registerEditorComponent({
		id: "glossar-listing",
		label: "Glossar-Listing",
		icon: "menu_book",
		fields: [
			{
				name: "count",
				label: "Anzahl",
				widget: "number",
				value_type: "int",
				default: 0,
				min: 0,
				max: 48,
				hint: "0 = alle veröffentlichten Begriffe.",
			},
			{
				name: "sort",
				label: "Sortierung",
				widget: "select",
				default: "title-asc",
				options: [
					{ label: "Titel A–Z", value: "title-asc" },
					{ label: "Titel Z–A", value: "title-desc" },
					{ label: "Neueste zuerst", value: "newest" },
					{ label: "Älteste zuerst", value: "oldest" },
				],
			},
			{
				name: "layout",
				label: "Layout",
				widget: "select",
				default: "list",
				options: [
					{ label: "Liste", value: "list" },
					{ label: "Grid (Karten)", value: "grid" },
				],
			},
			{
				name: "columns",
				label: "Spalten (nur Grid)",
				widget: "number",
				value_type: "int",
				default: 2,
				min: 1,
				max: 4,
				hint: "Wird bei Layout „Liste“ ignoriert.",
			},
			{
				name: "gap",
				label: "Abstand (rem)",
				widget: "number",
				value_type: "float",
				default: 1.5,
				min: 0,
				max: 8,
				step: 0.25,
			},
		],
		pattern: /^\{\{glossar-listing(?<attrs>[^}]*)\}\}\s*$/m,
		fromBlock: (match) => {
			const attrs = parseAttrs(match?.groups?.attrs || "");
			return {
				count: attrs.count !== undefined && attrs.count !== "" ? attrs.count : "0",
				sort: attrs.sort || "title-asc",
				layout: attrs.layout || "list",
				columns: attrs.columns || "2",
				gap: attrs.gap || "1.5",
			};
		},
		toBlock: ({
			count = 0,
			sort = "title-asc",
			layout = "list",
			columns = 2,
			gap = 1.5,
		}) =>
			`{{glossar-listing count="${count}" sort="${sort}" layout="${layout}" columns="${columns}" gap="${gap}"}}`,
		toPreview: ({
			count = 0,
			sort = "title-asc",
			layout = "list",
			columns = 2,
			gap = 1.5,
		}) =>
			`<div style="padding:0.75rem 1rem;border:1px dashed #2e3833;border-radius:6px;color:#9aa89f;font-size:0.9rem">Glossar-Listing · ${count === 0 || count === "0" ? "alle" : count} · ${sort} · ${layout}${layout === "grid" ? ` · ${columns} Spalten` : ""} · gap ${gap}rem</div>`,
	});

	CMS.registerEditorComponent({
		id: "tag-listing",
		label: "Tag-Listing",
		icon: "sell",
		fields: [
			{
				name: "count",
				label: "Anzahl",
				widget: "number",
				value_type: "int",
				default: 0,
				min: 0,
				max: 48,
				hint: "0 = alle genutzten Tags.",
			},
			{
				name: "sort",
				label: "Sortierung",
				widget: "select",
				default: "title-asc",
				options: [
					{ label: "Titel A–Z", value: "title-asc" },
					{ label: "Titel Z–A", value: "title-desc" },
					{ label: "Häufigste zuerst", value: "most-used" },
				],
			},
			{
				name: "layout",
				label: "Layout",
				widget: "select",
				default: "cloud",
				options: [
					{ label: "Wolke", value: "cloud" },
					{ label: "Liste", value: "list" },
					{ label: "Grid (Karten)", value: "grid" },
				],
			},
			{
				name: "columns",
				label: "Spalten (nur Grid)",
				widget: "number",
				value_type: "int",
				default: 3,
				min: 1,
				max: 4,
				hint: "Wird bei Layout „Wolke“ und „Liste“ ignoriert.",
			},
			{
				name: "gap",
				label: "Abstand (rem)",
				widget: "number",
				value_type: "float",
				default: 1.25,
				min: 0,
				max: 8,
				step: 0.25,
			},
		],
		pattern: /^\{\{tag-listing(?<attrs>[^}]*)\}\}\s*$/m,
		fromBlock: (match) => {
			const attrs = parseAttrs(match?.groups?.attrs || "");
			return {
				count: attrs.count !== undefined && attrs.count !== "" ? attrs.count : "0",
				sort: attrs.sort || "title-asc",
				layout: attrs.layout || "cloud",
				columns: attrs.columns || "3",
				gap: attrs.gap || "1.25",
			};
		},
		toBlock: ({
			count = 0,
			sort = "title-asc",
			layout = "cloud",
			columns = 3,
			gap = 1.25,
		}) =>
			`{{tag-listing count="${count}" sort="${sort}" layout="${layout}" columns="${columns}" gap="${gap}"}}`,
		toPreview: ({
			count = 0,
			sort = "title-asc",
			layout = "cloud",
			columns = 3,
			gap = 1.25,
		}) =>
			`<div style="padding:0.75rem 1rem;border:1px dashed #2e3833;border-radius:6px;color:#9aa89f;font-size:0.9rem">Tag-Listing · ${count === 0 || count === "0" ? "alle" : count} · ${sort} · ${layout}${layout === "grid" ? ` · ${columns} Spalten` : ""} · gap ${gap}rem</div>`,
	});

	CMS.registerEditorComponent({
		id: "tag-cloud",
		label: "Tagwolke",
		icon: "sell",
		fields: [],
		pattern: /^\{\{tag-cloud\}\}\s*$/m,
		toBlock: () => "{{tag-cloud}}",
		toPreview: () =>
			'<div style="padding:0.75rem 1rem;border:1px dashed #2e3833;border-radius:6px;color:#9aa89f;font-size:0.9rem">Tagwolke (Kurzform für Tag-Listing Layout Wolke)</div>',
	});

	CMS.registerEditorComponent({
		id: "block",
		label: "Baustein",
		icon: "widgets",
		fields: [
			{
				name: "id",
				label: "Baustein",
				widget: "relation",
				collection: "blocks",
				value_field: "{{slug}}",
				search_fields: ["title"],
				display_fields: ["title"],
				hint: "Wiederverwendbarer Inhalt aus der Collection „Bausteine“. Dateiname = id.",
			},
		],
		pattern: /^\{\{block(?<attrs>[^}]*)\}\}\s*$/m,
		fromBlock: (match) => {
			const attrs = parseAttrs(match?.groups?.attrs || "");
			return { id: attrs.id || attrs.slug || "" };
		},
		toBlock: ({ id = "" }) => `{{block id="${id}"}}`,
		toPreview: ({ id = "" }) =>
			`<div style="padding:0.75rem 1rem;border:1px dashed #2e3833;border-radius:6px;color:#9aa89f;font-size:0.9rem">Baustein · ${id || "?"}</div>`,
	});

	CMS.registerEditorComponent({
		id: "contact-email",
		label: "Kontakt-E-Mail",
		icon: "mail",
		fields: [],
		pattern: /^\{\{contact-email\}\}\s*$/m,
		toBlock: () => "{{contact-email}}",
		toPreview: () =>
			'<div style="padding:0.75rem 1rem;border:1px dashed #2e3833;border-radius:6px;color:#9aa89f;font-size:0.9rem">Kontakt-E-Mail (aus Build-Variable CONTACT_EMAIL)</div>',
	});

	CMS.registerEditorComponent({
		id: "repodoc",
		label: "Repo-Dokument",
		icon: "description",
		fields: [
			{
				name: "path",
				label: "Pfad im Repo",
				widget: "string",
				hint: 'z. B. docs/github/README.md (muss unter docs/ existieren).',
			},
			{
				name: "title",
				label: "Titel",
				widget: "string",
				required: false,
				hint: "Optional. Leer = erste Überschrift aus der Datei.",
			},
			{
				name: "description",
				label: "Kurzbeschreibung",
				widget: "text",
				required: false,
				hint: "Optional, ein Satz für die Box.",
			},
		],
		pattern: /^\{\{repodoc(?<attrs>[^}]*)\}\}\s*$/m,
		fromBlock: (match) => {
			const attrs = parseAttrs(match?.groups?.attrs || "");
			return {
				path: attrs.path || "",
				title: attrs.title || "",
				description: attrs.description || "",
			};
		},
		toBlock: ({ path = "", title = "", description = "" }) => {
			const parts = [`path="${path}"`];
			if (title) parts.push(`title="${title}"`);
			if (description) parts.push(`description="${description}"`);
			return `{{repodoc ${parts.join(" ")}}}`;
		},
		toPreview: ({ path = "", title = "", description = "" }) => {
			const label = title || path || "?";
			const desc = description ? ` · ${description}` : "";
			return `<div style="padding:0.75rem 1rem;border:1px solid #2e3833;border-radius:6px;color:#9aa89f;font-size:0.9rem;display:flex;gap:0.75rem;align-items:flex-start"><span style="color:#3dcf8e">ⓘ</span><span><strong style="color:#e8eeea">Vertiefung im Repo</strong><br>${label}${desc}</span></div>`;
		},
	});

	CMS.registerEditorComponent({
		id: "video",
		label: "Video (YT/Vimeo)",
		icon: "videocam",
		fields: [
			{
				name: "provider",
				label: "Anbieter",
				widget: "select",
				options: [
					{ label: "YouTube", value: "youtube" },
					{ label: "Vimeo", value: "vimeo" },
				],
				default: "youtube",
			},
			{
				name: "id",
				label: "Video-ID oder URL",
				widget: "string",
				hint: "YouTube-ID / youtu.be-URL oder Vimeo-ID / Video-URL.",
			},
			{
				name: "title",
				label: "Titel (Barrierefreiheit)",
				widget: "string",
				required: false,
				default: "Video",
			},
			{
				name: "poster",
				label: "Poster (lokal)",
				widget: "string",
				required: false,
				hint: "Optional: Pfad unter /assets/… (kein YouTube-Thumbnail vor Consent).",
			},
		],
		pattern: /^\{\{video(?<attrs>[^}]*)\}\}\s*$/m,
		fromBlock: (match) => {
			const attrs = parseAttrs(match?.groups?.attrs || "");
			return {
				provider: attrs.provider || "youtube",
				id: attrs.id || attrs.url || "",
				title: attrs.title || "Video",
				poster: attrs.poster || "",
			};
		},
		toBlock: ({ provider = "youtube", id = "", title = "Video", poster = "" }) => {
			const parts = [`provider="${provider}"`, `id="${id}"`];
			if (title && title !== "Video") parts.push(`title="${title}"`);
			if (poster) parts.push(`poster="${poster}"`);
			return `{{video ${parts.join(" ")}}}`;
		},
		toPreview: ({ provider = "youtube", id = "", title = "Video" }) =>
			`<div style="padding:0.75rem 1rem;border:1px dashed #2e3833;border-radius:6px;color:#9aa89f;font-size:0.9rem"><strong style="color:#e8eeea">Video</strong> (${provider}) · ${title || id || "?"}<br><span style="font-size:0.8rem">Facade mit Consent, kein Player vor Klick</span></div>`,
	});

	CMS.registerEditorComponent({
		id: "video-consent-reset",
		label: "Video-Consent zurücksetzen",
		icon: "cookie",
		fields: [],
		pattern: /^\{\{video-consent-reset\}\}\s*$/m,
		fromBlock: () => ({}),
		toBlock: () => "{{video-consent-reset}}",
		toPreview: () =>
			'<div style="padding:0.75rem 1rem;border:1px dashed #2e3833;border-radius:6px;color:#9aa89f;font-size:0.9rem">Button: Video-Freischaltung widerrufen</div>',
	});

	const SEPARATOR_COLORS = {
		border: "#2e3833",
		text: "#e8eeea",
		"text-muted": "#9aa89f",
		action: "#3dcf8e",
		"action-hover": "#56d9a0",
		"action-muted": "#1a3d2e",
		surface: "#1a211e",
		"surface-raised": "#232b27",
		bg: "#0f1412",
		danger: "#e57373",
	};

	CMS.registerEditorComponent({
		id: "separator",
		label: "Trennlinie",
		icon: "horizontal_rule",
		fields: [
			{
				name: "height",
				label: "Höhe (px)",
				widget: "number",
				value_type: "int",
				default: 1,
				min: 1,
				max: 24,
			},
			{
				name: "width",
				label: "Breite (%)",
				widget: "number",
				value_type: "int",
				default: 100,
				min: 1,
				max: 100,
				hint: "Prozent der Inhaltsbreite; zentriert.",
			},
			{
				name: "color",
				label: "Farbe",
				widget: "select",
				default: "border",
				options: [
					{ label: "Rahmen (Standard)", value: "border" },
					{ label: "Text", value: "text" },
					{ label: "Text gedämpft", value: "text-muted" },
					{ label: "Aktion", value: "action" },
					{ label: "Aktion Hover", value: "action-hover" },
					{ label: "Aktion gedämpft", value: "action-muted" },
					{ label: "Fläche", value: "surface" },
					{ label: "Fläche angehoben", value: "surface-raised" },
					{ label: "Hintergrund", value: "bg" },
					{ label: "Danger", value: "danger" },
				],
				hint: "Design-Token aus der Palette. Standard = aktuelle Linienfarbe (border).",
			},
		],
		pattern: /^\{\{separator(?<attrs>[^}]*)\}\}\s*$/m,
		fromBlock: (match) => {
			const attrs = parseAttrs(match?.groups?.attrs || "");
			return {
				height: attrs.height || "1",
				width: (attrs.width || "100").replace(/%$/, ""),
				color: attrs.color || "border",
			};
		},
		toBlock: ({ height = 1, width = 100, color = "border" }) => {
			const parts = [`height="${height}"`, `width="${width}"`];
			if (color && color !== "border") parts.push(`color="${color}"`);
			return `{{separator ${parts.join(" ")}}}`;
		},
		toPreview: ({ height = 1, width = 100, color = "border" }) => {
			const bg = SEPARATOR_COLORS[color] || SEPARATOR_COLORS.border;
			return `<hr style="display:block;border:0;background:${bg};opacity:.65;height:${height}px;width:${width}%;margin:1.25rem auto">`;
		},
	});
})();
