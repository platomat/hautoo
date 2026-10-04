export type SearchContentType = "article" | "glossar" | "page" | "tag";

export const searchTypeLabels: Record<SearchContentType, string> = {
	article: "Artikel",
	glossar: "Glossar",
	page: "Seite",
	tag: "Tag",
};

export const searchTypeOrder: SearchContentType[] = [
	"article",
	"glossar",
	"page",
	"tag",
];

export const searchUiCopy = {
	open: "Suche öffnen",
	close: "Suche schließen",
	title: "Suche",
	placeholder: "Artikel, Glossar, Seiten durchsuchen…",
	loading: "Suchindex wird geladen…",
	empty: "Keine Treffer.",
	noQuery: "Suchbegriff eingeben.",
} as const;
