const STUCK_CLASS = "is-stuck";

function initHeaderSticky() {
	const header = document.querySelector<HTMLElement>("[data-site-header]");
	const sentinel = document.querySelector<HTMLElement>("[data-header-sticky-sentinel]");

	if (!header || !sentinel) {
		return;
	}

	const stickyEnabled =
		header.classList.contains("site-header--sticky-desktop") ||
		header.classList.contains("site-header--sticky-tablet") ||
		header.classList.contains("site-header--sticky-mobile");

	if (!stickyEnabled) {
		header.classList.remove(STUCK_CLASS);
		return;
	}

	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry) {
				return;
			}
			header.classList.toggle(STUCK_CLASS, !entry.isIntersecting);
		},
		{ threshold: 0 },
	);

	observer.observe(sentinel);
}

initHeaderSticky();
