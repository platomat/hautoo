const OPEN_CLASS = "is-nav-open";
const BODY_LOCK_CLASS = "is-nav-locked";
const SCROLL_ATTR = "data-nav-scroll-y";

function lockBodyScroll() {
	const body = document.body;
	if (body.classList.contains(BODY_LOCK_CLASS)) {
		return;
	}
	const scrollY = window.scrollY;
	body.setAttribute(SCROLL_ATTR, String(scrollY));
	body.style.position = "fixed";
	body.style.top = `-${scrollY}px`;
	body.style.left = "0";
	body.style.right = "0";
	body.style.width = "100%";
	body.classList.add(BODY_LOCK_CLASS);
}

function unlockBodyScroll() {
	const body = document.body;
	if (!body.classList.contains(BODY_LOCK_CLASS)) {
		return;
	}
	const scrollY = Number(body.getAttribute(SCROLL_ATTR) || "0");
	body.classList.remove(BODY_LOCK_CLASS);
	body.style.position = "";
	body.style.top = "";
	body.style.left = "";
	body.style.right = "";
	body.style.width = "";
	body.removeAttribute(SCROLL_ATTR);
	window.scrollTo(0, scrollY);
}

/** Close mobile nav and restore scroll (also used by site search). */
export function closeMobileNav() {
	const header = document.querySelector<HTMLElement>("[data-site-header]");
	const toggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
	if (!header?.classList.contains(OPEN_CLASS)) {
		return;
	}
	header.classList.remove(OPEN_CLASS);
	unlockBodyScroll();
	if (toggle) {
		toggle.setAttribute("aria-expanded", "false");
		toggle.setAttribute("aria-label", "Menü öffnen");
	}
	document.dispatchEvent(new Event("nav:close"));
}

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
		const isOpen = header.classList.contains(OPEN_CLASS);
		if (open === isOpen) {
			return;
		}
		if (open) {
			lockBodyScroll();
			header.classList.add(OPEN_CLASS);
		} else {
			header.classList.remove(OPEN_CLASS);
			unlockBodyScroll();
			document.dispatchEvent(new Event("nav:close"));
		}
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
