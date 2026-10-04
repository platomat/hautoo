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
		],
		pattern: /^\{\{separator(?<attrs>[^}]*)\}\}\s*$/m,
		fromBlock: (match) => {
			const attrs = parseAttrs(match?.groups?.attrs || "");
			return {
				height: attrs.height || "1",
				width: (attrs.width || "100").replace(/%$/, ""),
			};
		},
		toBlock: ({ height = 1, width = 100 }) =>
			`{{separator height="${height}" width="${width}"}}`,
		toPreview: ({ height = 1, width = 100 }) =>
			`<hr style="display:block;border:0;background:#2e3833;opacity:.65;height:${height}px;width:${width}%;margin:1.25rem auto">`,
	});
})();
