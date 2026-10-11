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

	/** Canonical card-field order (FE layout is fixed; CMS is checkbox-only). */
	const ARTICLE_CARD_SHOW_ORDER = [
		"title",
		"intro",
		"categories",
		"tags",
		"authors",
		"date",
		"readingTime",
	];

	function normalizeArticleCardShow(show) {
		const selected = new Set(
			(Array.isArray(show) ? show : String(show || "").split(/[,\s]+/))
				.map((part) => String(part).trim())
				.filter(Boolean),
		);
		return ARTICLE_CARD_SHOW_ORDER.filter((field) => selected.has(field));
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
				/** Keep checkboxes (not tag UI): tags allow drag-reorder that FE ignores. */
				dropdown_threshold: 20,
				default: ["title", "intro", "categories", "tags", "date", "readingTime"],
				options: [
					{ label: "Titel", value: "title" },
					{ label: "Intro", value: "intro" },
					{ label: "Kategorien", value: "categories" },
					{ label: "Tags", value: "tags" },
					{ label: "Autoren", value: "authors" },
					{ label: "Datum", value: "date" },
					{ label: "Lesezeit", value: "readingTime" },
				],
				hint: "Nur an/aus per Checkbox. Feste Kartenreihenfolge: Titel, Intro, Kategorien | Tags, Autoren, Datum · Lesezeit.",
			},
			{
				name: "authors",
				label: "Nur Autoren",
				widget: "relation",
				collection: "authors",
				value_field: "{{slug}}",
				search_fields: ["title"],
				display_fields: ["title"],
				multiple: true,
				required: false,
				hint: "Leer = alle. Mehrere: Artikel mit mindestens einem dieser Autoren.",
			},
			{
				name: "categories",
				label: "Nur Kategorien",
				widget: "relation",
				collection: "categories",
				value_field: "{{slug}}",
				search_fields: ["title"],
				display_fields: ["title"],
				multiple: true,
				required: false,
				hint: "Leer = alle. Mehrere: Artikel mit mindestens einer dieser Kategorien.",
			},
			{
				name: "tags",
				label: "Nur Tags",
				widget: "relation",
				collection: "tags",
				value_field: "{{slug}}",
				search_fields: ["title"],
				display_fields: ["title"],
				multiple: true,
				required: false,
				hint: "Leer = alle. Mehrere: Artikel mit mindestens einem dieser Tags.",
			},
			{
				name: "match",
				label: "Filter-Verknüpfung",
				widget: "select",
				default: "all",
				options: [
					{ label: "Alle Bedingungen (UND)", value: "all" },
					{ label: "Eine Bedingung (ODER)", value: "any" },
				],
				hint: "Nur wenn mehrere Filterarten gesetzt sind (Autoren und/oder Kategorien und/oder Tags).",
			},
		],
		pattern: /^\{\{article-listing(?<attrs>[^}]*)\}\}\s*$/m,
		fromBlock: (match) => {
			const attrs = parseAttrs(match?.groups?.attrs || "");
			const showDefault = "title,intro,categories,tags,date,readingTime";
			const splitList = (raw) =>
				(raw || "")
					.split(",")
					.map((s) => s.trim())
					.filter(Boolean);
			const showParsed = normalizeArticleCardShow(attrs.show || showDefault);
			return {
				count: attrs.count !== undefined && attrs.count !== "" ? attrs.count : "3",
				sort: attrs.sort || "newest",
				layout: attrs.layout || "grid",
				columns: attrs.columns || "3",
				gap: attrs.gap || "1.25",
				show: showParsed.length > 0 ? showParsed : showDefault.split(","),
				authors: splitList(attrs.authors),
				categories: splitList(attrs.categories),
				tags: splitList(attrs.tags),
				match: attrs.match === "any" ? "any" : "all",
			};
		},
		toBlock: ({
			count = 3,
			sort = "newest",
			layout = "grid",
			columns = 3,
			gap = 1.25,
			show = ["title", "intro", "categories", "tags", "date", "readingTime"],
			authors = [],
			categories = [],
			tags = [],
			match = "all",
		}) => {
			const showNormalized = normalizeArticleCardShow(show);
			const showAttr = (
				showNormalized.length > 0
					? showNormalized
					: ["title", "intro", "categories", "tags", "date", "readingTime"]
			).join(",");
			const listAttr = (value) =>
				(Array.isArray(value) ? value : String(value || "").split(","))
					.map((s) => String(s).trim())
					.filter(Boolean)
					.join(",");
			const authorsAttr = listAttr(authors);
			const categoriesAttr = listAttr(categories);
			const tagsAttr = listAttr(tags);
			const parts = [
				`count="${count}"`,
				`sort="${sort}"`,
				`layout="${layout}"`,
				`columns="${columns}"`,
				`gap="${gap}"`,
				`show="${showAttr}"`,
			];
			if (authorsAttr) parts.push(`authors="${authorsAttr}"`);
			if (categoriesAttr) parts.push(`categories="${categoriesAttr}"`);
			if (tagsAttr) parts.push(`tags="${tagsAttr}"`);
			if ((authorsAttr || categoriesAttr || tagsAttr) && match === "any") {
				parts.push(`match="any"`);
			}
			return `{{article-listing ${parts.join(" ")}}}`;
		},
		toPreview: ({
			count = 3,
			sort = "newest",
			layout = "grid",
			columns = 3,
			gap = 1.25,
			show = ["title", "intro", "categories", "tags", "date", "readingTime"],
			authors = [],
			categories = [],
			tags = [],
			match = "all",
		}) => {
			const showNormalized = normalizeArticleCardShow(show);
			const showLabel = (
				showNormalized.length > 0
					? showNormalized
					: ["title", "intro", "categories", "tags", "date", "readingTime"]
			).join(", ");
			const listLabel = (value) =>
				(Array.isArray(value) ? value : String(value || "").split(","))
					.map((s) => String(s).trim())
					.filter(Boolean)
					.join(", ");
			const filterBits = [];
			const authorsLabel = listLabel(authors);
			const categoriesLabel = listLabel(categories);
			const tagsLabel = listLabel(tags);
			if (authorsLabel) filterBits.push(`Autoren ${authorsLabel}`);
			if (categoriesLabel) filterBits.push(`Kategorien ${categoriesLabel}`);
			if (tagsLabel) filterBits.push(`Tags ${tagsLabel}`);
			if (filterBits.length > 1) {
				filterBits.push(match === "any" ? "ODER" : "UND");
			}
			const filterSuffix = filterBits.length
				? ` · Filter: ${filterBits.join(" · ")}`
				: "";
			return `<div style="padding:0.75rem 1rem;border:1px dashed #2e3833;border-radius:6px;color:#9aa89f;font-size:0.9rem">Artikel-Listing · ${count === 0 || count === "0" ? "alle" : count} · ${sort} · ${layout}${layout === "grid" ? ` · ${columns} Spalten` : ""} · gap ${gap}rem · ${showLabel}${filterSuffix}</div>`;
		},
	});

CMS.registerEditorComponent({
		id: "category-listing",
		label: "Kategorie-Listing",
		icon: "folder",
		fields: [
			{
				name: "count",
				label: "Anzahl",
				widget: "number",
				value_type: "int",
				default: 0,
				min: 0,
				max: 48,
				hint: "0 = alle genutzten Kategorien.",
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
				default: "grid",
				options: [
					{ label: "Grid (Karten)", value: "grid" },
					{ label: "Liste", value: "list" },
					{ label: "Wolke", value: "cloud" },
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
		pattern: /^\{\{category-listing(?<attrs>[^}]*)\}\}\s*$/m,
		fromBlock: (match) => {
			const attrs = parseAttrs(match?.groups?.attrs || "");
			return {
				count: attrs.count !== undefined && attrs.count !== "" ? attrs.count : "0",
				sort: attrs.sort || "title-asc",
				layout: attrs.layout || "grid",
				columns: attrs.columns || "3",
				gap: attrs.gap || "1.25",
			};
		},
		toBlock: ({
			count = 0,
			sort = "title-asc",
			layout = "grid",
			columns = 3,
			gap = 1.25,
		}) =>
			`{{category-listing count="${count}" sort="${sort}" layout="${layout}" columns="${columns}" gap="${gap}"}}`,
		toPreview: ({
			count = 0,
			sort = "title-asc",
			layout = "grid",
			columns = 3,
			gap = 1.25,
		}) =>
			`<div style="padding:0.75rem 1rem;border:1px dashed #2e3833;border-radius:6px;color:#9aa89f;font-size:0.9rem">Kategorie-Listing · ${count === 0 || count === "0" ? "alle" : count} · ${sort} · ${layout}${layout === "grid" ? ` · ${columns} Spalten` : ""} · gap ${gap}rem</div>`,
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
		id: "author-listing",
		label: "Autoren-Listing",
		icon: "group",
		fields: [],
		pattern: /^\{\{author-listing\}\}\s*$/m,
		fromBlock: () => ({}),
		toBlock: () => "{{author-listing}}",
		toPreview: () =>
			'<div style="padding:0.75rem 1rem;border:1px dashed #2e3833;border-radius:6px;color:#9aa89f;font-size:0.9rem">Autoren-Listing (alle Autoren mit Avatar und Artikelanzahl)</div>',
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
			'<div style="padding:0.75rem 1rem;border:1px dashed #2e3833;border-radius:6px;color:#9aa89f;font-size:0.9rem">Kontakt-E-Mail (CMS General → Contact email, sonst CONTACT_EMAIL)</div>',
	});

	CMS.registerEditorComponent({
		id: "logo",
		label: "Logo",
		icon: "image",
		fields: [
			{
				name: "variant",
				label: "Welches Logo",
				widget: "select",
				default: "header",
				options: [
					{ label: "Header", value: "header" },
					{ label: "Sticky Header", value: "sticky" },
					{ label: "Footer", value: "footer" },
				],
				hint: "Aus Einstellungen → General → Logos. Sticky/Footer fallen auf Header zurück, wenn leer.",
			},
			{
				name: "width",
				label: "Breite",
				widget: "number",
				value_type: "int",
				default: 120,
				min: 1,
				max: 1200,
				hint: "Zahl; Einheit darunter (px oder %).",
			},
			{
				name: "unit",
				label: "Einheit",
				widget: "select",
				default: "px",
				options: [
					{ label: "Pixel (px)", value: "px" },
					{ label: "Prozent (%)", value: "%" },
				],
			},
			{
				name: "align",
				label: "Ausrichtung",
				widget: "select",
				default: "left",
				options: [
					{ label: "Links", value: "left" },
					{ label: "Zentriert", value: "center" },
					{ label: "Rechts", value: "right" },
				],
			},
		],
		pattern: /^\{\{logo(?<attrs>[^}]*)\}\}\s*$/m,
		fromBlock: (match) => {
			const attrs = parseAttrs(match?.groups?.attrs || "");
			return {
				variant: attrs.variant || "header",
				width: attrs.width || "120",
				unit: attrs.unit === "%" ? "%" : "px",
				align: attrs.align || "left",
			};
		},
		toBlock: ({
			variant = "header",
			width = 120,
			unit = "px",
			align = "left",
		}) =>
			`{{logo variant="${variant}" width="${width}" unit="${unit}" align="${align}"}}`,
		toPreview: ({
			variant = "header",
			width = 120,
			unit = "px",
			align = "left",
		}) =>
			`<div style="padding:0.75rem 1rem;border:1px dashed #2e3833;border-radius:6px;color:#9aa89f;font-size:0.9rem">Logo · ${variant} · ${width}${unit} · ${align}</div>`,
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
		label: "Video",
		icon: "videocam",
		fields: [
			{
				name: "provider",
				label: "Anbieter",
				widget: "select",
				options: [
					{ label: "YouTube", value: "youtube" },
					{ label: "Vimeo", value: "vimeo" },
					{ label: "Datei (R2 / selbst gehostet)", value: "file" },
				],
				default: "youtube",
			},
			{
				name: "id",
				label: "Video-ID, URL oder Dateiname",
				widget: "string",
				required: false,
				hint: "YouTube/Vimeo: ID oder URL. Datei: volle https-URL, oder Dateiname relativ zur Video-Basis-URL (CMS Content → Medien). Leer = Block wird beim Speichern entfernt.",
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
				label: "Poster",
				widget: "image",
				required: false,
				choose_url: false,
				hint: "Optional: Vorschaubild aus der Mediathek (bei YT/Vimeo kein Drittanbieter-Thumbnail vor Consent).",
			},
		],
		pattern: /^\{\{video(?<attrs>[^}]*)\}\}\s*$/m,
		fromBlock: (match) => {
			const attrs = parseAttrs(match?.groups?.attrs || "");
			const provider = attrs.provider === "r2" ? "file" : attrs.provider || "youtube";
			return {
				provider,
				id: attrs.src || attrs.id || attrs.url || "",
				title: attrs.title || "Video",
				poster: attrs.poster || "",
			};
		},
		toBlock: ({ provider = "youtube", id = "", title = "Video", poster = "" }) => {
			const ref = String(id || "").trim();
			if (!ref) return "";
			const parts = [`provider="${provider}"`];
			if (provider === "file") {
				parts.push(`src="${ref}"`);
			} else {
				parts.push(`id="${ref}"`);
			}
			if (title && title !== "Video") parts.push(`title="${title}"`);
			if (poster) parts.push(`poster="${poster}"`);
			return `{{video ${parts.join(" ")}}}`;
		},
		toPreview: ({ provider = "youtube", id = "", title = "Video" }) => {
			const note =
				provider === "file"
					? "HTML5-Player, Datei von R2/CDN (kein YT/Vimeo-Consent)"
					: "Facade mit Consent, kein Player vor Klick";
			return `<div style="padding:0.75rem 1rem;border:1px dashed #2e3833;border-radius:6px;color:#9aa89f;font-size:0.9rem"><strong style="color:#e8eeea">Video</strong> (${provider}) · ${title || id || "?"}<br><span style="font-size:0.8rem">${note}</span></div>`;
		},
	});

	CMS.registerEditorComponent({
		id: "video-consent-reset",
		label: "Video-Freischaltung widerrufen",
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

	CMS.registerEditorComponent({
		id: "spacer",
		label: "Abstandshalter",
		icon: "height",
		fields: [
			{
				name: "height",
				label: "Höhe (px)",
				widget: "number",
				value_type: "int",
				default: 32,
				min: 1,
				max: 600,
				hint: "Vertikaler Leerraum. Standard 32 px.",
			},
		],
		pattern: /^\{\{spacer(?<attrs>[^}]*)\}\}\s*$/m,
		fromBlock: (match) => {
			const attrs = parseAttrs(match?.groups?.attrs || "");
			return {
				height: attrs.height || "32",
			};
		},
		toBlock: ({ height = 32 }) => {
			if (!height || Number(height) === 32) return "{{spacer}}";
			return `{{spacer height="${height}"}}`;
		},
		toPreview: ({ height = 32 }) => {
			const h = Math.min(600, Math.max(1, Number(height) || 32));
			return `<div style="height:${h}px;margin:0;border:1px dashed #2e3833;border-radius:4px;background:repeating-linear-gradient(135deg,transparent,transparent 6px,#2e3833 6px,#2e3833 7px);opacity:.55" title="Abstand ${h}px" aria-hidden="true"></div>`;
		},
	});

	const BUTTON_LIGHT_FILLS = new Set([
		"text",
		"text-muted",
		"action",
		"action-hover",
		"danger",
	]);

	CMS.registerEditorComponent({
		id: "button",
		label: "Button",
		icon: "smart_button",
		fields: [
			{
				name: "label",
				label: "Beschriftung",
				widget: "string",
				default: "Mehr erfahren",
			},
			{
				name: "href",
				label: "Link (URL)",
				widget: "string",
				hint: "Intern z. B. /kontakt/ oder absolute URL.",
			},
			{
				name: "target",
				label: "Ziel",
				widget: "select",
				default: "_self",
				options: [
					{ label: "Gleicher Tab", value: "_self" },
					{ label: "Neuer Tab", value: "_blank" },
				],
			},
			{
				name: "style",
				label: "Stil",
				widget: "select",
				default: "solid",
				options: [
					{ label: "Ausgefüllt", value: "solid" },
					{ label: "Kontur", value: "outline" },
				],
			},
			{
				name: "color",
				label: "Farbe",
				widget: "select",
				default: "action",
				options: [
					{ label: "Aktion (Standard)", value: "action" },
					{ label: "Aktion Hover", value: "action-hover" },
					{ label: "Aktion gedämpft", value: "action-muted" },
					{ label: "Rahmen", value: "border" },
					{ label: "Text", value: "text" },
					{ label: "Text gedämpft", value: "text-muted" },
					{ label: "Fläche", value: "surface" },
					{ label: "Fläche angehoben", value: "surface-raised" },
					{ label: "Hintergrund", value: "bg" },
					{ label: "Danger", value: "danger" },
				],
				hint: "Bei Ausgefüllt: Hintergrund; bei Kontur: Rand und Text. Solid-Textfarbe wird kontrastreich gewählt.",
			},
			{
				name: "align",
				label: "Ausrichtung",
				widget: "select",
				default: "left",
				options: [
					{ label: "Links", value: "left" },
					{ label: "Zentriert", value: "center" },
					{ label: "Rechts", value: "right" },
					{ label: "Volle Breite", value: "full" },
				],
			},
		],
		pattern: /^\{\{button(?<attrs>[^}]*)\}\}\s*$/m,
		fromBlock: (match) => {
			const attrs = parseAttrs(match?.groups?.attrs || "");
			return {
				label: attrs.label || attrs.text || "Mehr erfahren",
				href: attrs.href || attrs.url || "",
				target: attrs.target || "_self",
				style: attrs.style || "solid",
				color: attrs.color || "action",
				align: attrs.align || "left",
			};
		},
		toBlock: ({
			label = "Mehr erfahren",
			href = "",
			target = "_self",
			style = "solid",
			color = "action",
			align = "left",
		}) => {
			const parts = [`label="${label}"`, `href="${href}"`];
			if (target && target !== "_self") parts.push(`target="${target}"`);
			if (style && style !== "solid") parts.push(`style="${style}"`);
			if (color && color !== "action") parts.push(`color="${color}"`);
			if (align && align !== "left") parts.push(`align="${align}"`);
			return `{{button ${parts.join(" ")}}}`;
		},
		toPreview: ({
			label = "Mehr erfahren",
			style = "solid",
			color = "action",
			align = "left",
		}) => {
			const fill = SEPARATOR_COLORS[color] || SEPARATOR_COLORS.action;
			const fg = BUTTON_LIGHT_FILLS.has(color) ? "#0f1412" : "#e8eeea";
			const solid = style !== "outline";
			const alignCss =
				align === "center"
					? "center"
					: align === "right"
						? "right"
						: "left";
			const widthCss = align === "full" ? "width:100%;box-sizing:border-box;" : "";
			const btn = solid
				? `background:${fill};color:${fg};border:2px solid ${fill};`
				: `background:transparent;color:${fill};border:2px solid ${fill};`;
			return `<div style="text-align:${alignCss};margin:0.75rem 0"><span style="display:inline-block;${widthCss}padding:0.45rem 1rem;border-radius:4px;font-weight:500;${btn}">${label}</span></div>`;
		},
	});
})();
