import MiniSearch from "minisearch";

type SearchCopy = {
	open: string;
	close: string;
	title: string;
	placeholder: string;
	loading: string;
	empty: string;
	noQuery: string;
};

type SearchConfig = {
	copy: SearchCopy;
	typeOrder: string[];
};

type SearchInstance = {
	dialog: HTMLDialogElement;
	input: HTMLInputElement;
	status: HTMLElement;
	results: HTMLElement;
	copy: SearchCopy;
	typeOrder: string[];
	setMini: (mini: MiniSearch) => void;
	runSearch: () => void;
};

let indexPromise: Promise<MiniSearch> | null = null;

function resultCountLabel(n: number) {
	return n === 1 ? "1 Treffer" : `${n} Treffer`;
}

function escapeHtml(text: string) {
	return String(text)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

function loadIndex() {
	if (indexPromise) return indexPromise;

	indexPromise = fetch("/search/de.json")
		.then((res) => {
			if (!res.ok) throw new Error(`search index ${res.status}`);
			return res.json();
		})
		.then((payload) => {
			const mini = new MiniSearch({
				idField: "id",
				fields: ["title", "description", "body", "extra"],
				storeFields: ["title", "description", "url", "type", "typeLabel"],
			});
			mini.addAll(payload.documents ?? []);
			return mini;
		});

	return indexPromise;
}

type SearchHit = {
	type?: unknown;
	typeLabel?: unknown;
	title?: unknown;
	description?: unknown;
	url?: unknown;
};

function groupResults(results: SearchHit[]) {
	const grouped = new Map<string, SearchHit[]>();
	for (const hit of results) {
		const type = String(hit.type);
		if (!grouped.has(type)) grouped.set(type, []);
		grouped.get(type)!.push(hit);
	}
	return grouped;
}

function closeDialog(dialog: HTMLDialogElement | null) {
	dialog?.close();
}

function closeMobileNav() {
	const header = document.querySelector("[data-site-header]");
	if (!(header instanceof HTMLElement)) return;
	if (!header.classList.contains("is-nav-open")) return;
	header.classList.remove("is-nav-open");
	document.body.classList.remove("is-nav-locked");
	const toggle = header.querySelector("[data-nav-toggle]");
	if (toggle instanceof HTMLButtonElement) {
		toggle.setAttribute("aria-expanded", "false");
		toggle.setAttribute("aria-label", "Menü öffnen");
	}
}

function renderResults(
	container: HTMLElement,
	results: SearchHit[],
	typeOrder: string[],
) {
	container.innerHTML = "";
	if (results.length === 0) {
		container.hidden = true;
		return;
	}

	const grouped = groupResults(results);
	const frag = document.createDocumentFragment();

	for (const type of typeOrder) {
		const items = grouped.get(type);
		if (!items?.length) continue;

		const section = document.createElement("section");
		section.className = "site-search__group";

		const heading = document.createElement("h3");
		heading.className = "site-search__group-title";
		heading.textContent = String(items[0].typeLabel);
		section.appendChild(heading);

		const list = document.createElement("ul");
		list.className = "site-search__list";

		for (const item of items) {
			const li = document.createElement("li");
			const link = document.createElement("a");
			link.className = "site-search__hit";
			link.href = String(item.url);
			link.innerHTML = `<span class="site-search__hit-title">${escapeHtml(String(item.title))}</span>${
				item.description
					? `<span class="site-search__hit-desc">${escapeHtml(String(item.description))}</span>`
					: ""
			}`;
			link.addEventListener("click", () =>
				closeDialog(container.closest(".site-search") as HTMLDialogElement),
			);
			li.appendChild(link);
			list.appendChild(li);
		}

		section.appendChild(list);
		frag.appendChild(section);
	}

	container.appendChild(frag);
	container.hidden = false;
}

function readConfig(dialog: Element): SearchConfig | null {
	const raw = dialog.getAttribute("data-search-config");
	if (!raw) return null;
	try {
		return JSON.parse(raw) as SearchConfig;
	} catch {
		return null;
	}
}

function getResultLinks(results: HTMLElement): HTMLAnchorElement[] {
	return [...results.querySelectorAll<HTMLAnchorElement>(".site-search__hit")];
}

function wireSearchTabOrder(
	input: HTMLInputElement,
	closeBtn: HTMLButtonElement,
	results: HTMLElement,
	dialog: HTMLDialogElement,
) {
	closeBtn.addEventListener("keydown", (e) => {
		if (e.key !== "Tab") return;
		const links = getResultLinks(results);

		if (e.shiftKey) {
			e.preventDefault();
			if (!results.hidden && links.length > 0) links[links.length - 1].focus();
			else input.focus();
			return;
		}

		if (!results.hidden && links.length > 0) {
			e.preventDefault();
			links[0].focus();
			return;
		}

		e.preventDefault();
		input.focus();
	});

	results.addEventListener("keydown", (e) => {
		if (e.key !== "Tab") return;
		const links = getResultLinks(results);
		if (links.length === 0) return;

		if (e.shiftKey && e.target === links[0]) {
			e.preventDefault();
			closeBtn.focus();
			return;
		}

		if (!e.shiftKey && e.target === links[links.length - 1]) {
			e.preventDefault();
			input.focus();
		}
	});

	input.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			e.preventDefault();
			closeDialog(dialog);
			return;
		}

		if (e.key !== "Tab" || !e.shiftKey) return;
		const links = getResultLinks(results);
		e.preventDefault();
		if (!results.hidden && links.length > 0) links[links.length - 1].focus();
		else closeBtn.focus();
	});
}

function isTypingTarget(target: EventTarget | null) {
	if (!(target instanceof HTMLElement)) return false;
	if (target.isContentEditable) return true;
	if (target.closest(".site-search")) return false;
	return (
		target instanceof HTMLInputElement ||
		target instanceof HTMLTextAreaElement ||
		target instanceof HTMLSelectElement
	);
}

async function openSearch(instance: SearchInstance) {
	const { dialog, input, status, copy, runSearch } = instance;
	if (dialog.open) {
		input.focus();
		input.select();
		return;
	}

	closeMobileNav();
	dialog.showModal();
	status.textContent = copy.loading;
	instance.setMini(await loadIndex());
	if (input.value.trim()) runSearch();
	else status.textContent = copy.noQuery;
	input.focus();
	input.select();
}

export function initSiteSearch() {
	let keyboardInstance: SearchInstance | null = null;

	document.querySelectorAll("[data-search-open]").forEach((trigger) => {
		const header = trigger.closest(".site-header");
		const dialog = header?.querySelector(".site-search");
		const input = dialog?.querySelector("[data-search-input]");
		const status = dialog?.querySelector("[data-search-status]");
		const results = dialog?.querySelector("[data-search-results]");
		const closeBtn = dialog?.querySelector("[data-search-close]");

		if (
			!(dialog instanceof HTMLDialogElement) ||
			!(input instanceof HTMLInputElement) ||
			!(status instanceof HTMLElement) ||
			!(results instanceof HTMLElement) ||
			!(closeBtn instanceof HTMLButtonElement)
		) {
			return;
		}

		const config = readConfig(dialog);
		if (!config) return;

		const { copy, typeOrder } = config;
		let mini: MiniSearch | null = null;

		function runSearch() {
			const q = input.value.trim();
			if (!q) {
				status.textContent = copy.noQuery;
				results.hidden = true;
				results.innerHTML = "";
				return;
			}
			if (!mini) return;

			const hits = mini.search(q, {
				boost: { title: 4, description: 2, extra: 1.5, body: 1 },
				fuzzy: 0.15,
				prefix: true,
			});

			status.textContent = hits.length
				? resultCountLabel(hits.length)
				: copy.empty;
			renderResults(results, hits, typeOrder);
		}

		const instance: SearchInstance = {
			dialog,
			input,
			status,
			results,
			copy,
			typeOrder,
			setMini: (value) => {
				mini = value;
			},
			runSearch,
		};

		if (!keyboardInstance) keyboardInstance = instance;

		trigger.addEventListener("click", () => {
			void openSearch(instance);
		});

		closeBtn.addEventListener("click", () => closeDialog(dialog));
		wireSearchTabOrder(input, closeBtn, results, dialog);

		dialog.addEventListener("click", (e) => {
			if (e.target === dialog) closeDialog(dialog);
		});

		dialog.addEventListener("close", () => {
			input.value = "";
			status.textContent = copy.noQuery;
			results.hidden = true;
			results.innerHTML = "";
		});

		input.addEventListener("input", async () => {
			if (!mini) {
				status.textContent = copy.loading;
				mini = await loadIndex();
			}
			runSearch();
		});
	});

	if (keyboardInstance) {
		document.addEventListener(
			"keydown",
			(e) => {
				if (
					e.key.toLowerCase() !== "k" ||
					(!e.ctrlKey && !e.metaKey) ||
					e.altKey ||
					e.shiftKey
				) {
					return;
				}
				if (isTypingTarget(e.target)) return;

				e.preventDefault();
				e.stopImmediatePropagation();
				void openSearch(keyboardInstance!);
			},
			{ capture: true },
		);

		const initialQuery = new URLSearchParams(window.location.search).get("q");
		if (initialQuery?.trim()) {
			keyboardInstance.input.value = initialQuery;
			void openSearch(keyboardInstance);
		}
	}
}
