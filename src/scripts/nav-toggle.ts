const OPEN_CLASS = "is-nav-open";
const BODY_LOCK_CLASS = "is-nav-locked";

function initNavToggle() {
	const header = document.querySelector<HTMLElement>("[data-site-header]");
	const toggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
	const nav = document.querySelector<HTMLElement>("[data-site-nav]");

	if (!header || !toggle || !nav) {
		return;
	}

	const labelOpen = "Menü öffnen";
	const labelClose = "Menü schließen";

	const setOpen = (open: boolean) => {
		header.classList.toggle(OPEN_CLASS, open);
		document.body.classList.toggle(BODY_LOCK_CLASS, open);
		toggle.setAttribute("aria-expanded", open ? "true" : "false");
		toggle.setAttribute("aria-label", open ? labelClose : labelOpen);
	};

	const close = () => setOpen(false);

	toggle.addEventListener("click", () => {
		setOpen(!header.classList.contains(OPEN_CLASS));
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && header.classList.contains(OPEN_CLASS)) {
			close();
			toggle.focus();
		}
	});

	document.addEventListener("click", (event) => {
		if (!header.classList.contains(OPEN_CLASS)) {
			return;
		}
		const target = event.target;
		if (!(target instanceof Node)) {
			return;
		}
		if (!header.contains(target)) {
			close();
		}
	});

	nav.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", close);
	});

	const media = window.matchMedia("(min-width: 680px)");
	const syncViewport = () => {
		if (media.matches) {
			close();
		}
	};
	media.addEventListener("change", syncViewport);
}

initNavToggle();
