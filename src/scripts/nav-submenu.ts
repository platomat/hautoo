const ITEM_OPEN = "is-sub-open";

function initNavSubmenus() {
	const items = document.querySelectorAll<HTMLElement>("[data-nav-item]");
	if (items.length === 0) {
		return;
	}

	const setOpen = (item: HTMLElement, open: boolean) => {
		const toggle = item.querySelector<HTMLButtonElement>("[data-nav-sub-toggle]");
		item.classList.toggle(ITEM_OPEN, open);
		toggle?.setAttribute("aria-expanded", open ? "true" : "false");
	};

	const closeAll = (except?: HTMLElement) => {
		items.forEach((item) => {
			if (item !== except) {
				setOpen(item, false);
			}
		});
	};

	items.forEach((item) => {
		const toggle = item.querySelector<HTMLButtonElement>("[data-nav-sub-toggle]");
		if (!toggle) {
			return;
		}

		toggle.addEventListener("click", (event) => {
			event.preventDefault();
			event.stopPropagation();
			const willOpen = !item.classList.contains(ITEM_OPEN);
			closeAll(willOpen ? item : undefined);
			setOpen(item, willOpen);
		});
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closeAll();
		}
	});

	document.addEventListener("click", (event) => {
		const target = event.target;
		if (!(target instanceof Node)) {
			return;
		}
		const inside = [...items].some((item) => item.contains(target));
		if (!inside) {
			closeAll();
		}
	});

	const media = window.matchMedia("(min-width: 680px)");
	media.addEventListener("change", () => {
		closeAll();
	});

	document.addEventListener("nav:close", () => {
		closeAll();
	});
}

initNavSubmenus();
