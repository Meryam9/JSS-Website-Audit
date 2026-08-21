// Loads the shared header (header.html) into every page that has a
// <div id="header-placeholder"></div>. Keeping the header in one file
// means the nav only ever needs to be edited in one place.
document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("header-placeholder");
  if (!placeholder) return;

  // Use the inlined markup from partials.js by default - this works
  // regardless of protocol (file:// or http(s)://) and browser. If
  // partials.js hasn't been included for some reason, fall back to
  // fetch() for servers where that still works.
  const headerHtmlPromise =
    typeof HEADER_HTML !== "undefined"
      ? Promise.resolve(HEADER_HTML)
      : fetch("header.html").then((res) => res.text());

  headerHtmlPromise
    .then((html) => {
      // IMPORTANT: don't use placeholder.innerHTML here. That would leave
      // the real <header> nested *inside* the (empty-at-first-layout)
      // placeholder <div>, and browsers can fail to keep a `position:
      // sticky` element pinned when it's injected that way into a
      // wrapper that had no size at initial layout. Parsing the markup
      // separately and swapping the placeholder itself out for the real
      // <header> node keeps <header> a direct, normal child of <body>
      // from the moment it enters the DOM, so its sticky positioning
      // behaves correctly.
      const template = document.createElement("template");
      template.innerHTML = html.trim();
      const root = template.content.firstElementChild;
      placeholder.replaceWith(root);

      // Work out which page we're on (defaults to index.html for "/").
      let currentPage = window.location.pathname.split("/").pop();
      if (!currentPage) currentPage = "index.html";

      // Highlight the matching nav link.
      root.querySelectorAll("[data-page]").forEach((link) => {
        if (link.getAttribute("data-page") === currentPage) {
          link.classList.add("active");
        }
      });

      // On the home page itself, turn "index.html#section" links into
      // plain "#section" so they scroll instead of reloading the page.
      if (currentPage === "index.html") {
        root.querySelectorAll('a[href^="index.html#"]').forEach((link) => {
          link.setAttribute("href", link.getAttribute("href").replace("index.html", ""));
        });
      }

      // Mobile hamburger menu: toggles the nav dropdown on small/tablet
      // screens. The button and nav only need this wiring once, right
      // after the header markup lands in the DOM.
      const headerEl = root.classList.contains("site-header") ? root : root.querySelector(".site-header");
      const toggle = root.querySelector("#navToggle");
      const nav = root.querySelector("#mainNav");

      // Solid-white header on scroll: at the very top the header can stay
      // translucent/blurred, but once the page scrolls we make it fully
      // opaque so the logo never shows page content bleeding through it.
      if (headerEl) {
        const SCROLL_THRESHOLD = 8;
        const updateScrollState = () => {
          headerEl.classList.toggle("is-scrolled", window.scrollY > SCROLL_THRESHOLD);
        };
        updateScrollState();
        window.addEventListener("scroll", updateScrollState, { passive: true });
      }

      if (headerEl && toggle && nav) {
        const closeMenu = () => {
          headerEl.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
        };

        toggle.addEventListener("click", () => {
          const isOpen = headerEl.classList.toggle("nav-open");
          toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        // Tapping a link closes the dropdown so it doesn't stay open
        // after navigating (or scrolling to a same-page section).
        nav.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", closeMenu);
        });

        // If the viewport is resized past the mobile/tablet breakpoint
        // (e.g. rotating a tablet, or a resizable desktop window),
        // make sure the dropdown state doesn't get stuck open.
        window.addEventListener("resize", () => {
          if (window.innerWidth > 980) closeMenu();
        });

        // Clicking outside the nav/toggle also closes it.
        document.addEventListener("click", (event) => {
          if (!headerEl.classList.contains("nav-open")) return;
          if (headerEl.contains(event.target)) return;
          closeMenu();
        });
      }
    })
    .catch((err) => {
      console.error("Header failed to load:", err);
    });
});