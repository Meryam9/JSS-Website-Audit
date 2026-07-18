// Loads the shared header (header.html) into every page that has a
// <div id="header-placeholder"></div>. Keeping the header in one file
// means the nav only ever needs to be edited in one place.
document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("header-placeholder");
  if (!placeholder) return;

  fetch("header.html")
    .then((res) => res.text())
    .then((html) => {
      placeholder.innerHTML = html;

      // Work out which page we're on (defaults to index.html for "/").
      let currentPage = window.location.pathname.split("/").pop();
      if (!currentPage) currentPage = "index.html";

      // Highlight the matching nav link.
      placeholder.querySelectorAll("[data-page]").forEach((link) => {
        if (link.getAttribute("data-page") === currentPage) {
          link.classList.add("active");
        }
      });

      // On the home page itself, turn "index.html#section" links into
      // plain "#section" so they scroll instead of reloading the page.
      if (currentPage === "index.html") {
        placeholder.querySelectorAll('a[href^="index.html#"]').forEach((link) => {
          link.setAttribute("href", link.getAttribute("href").replace("index.html", ""));
        });
      }

      // Mobile hamburger menu: toggles the nav dropdown on small/tablet
      // screens. The button and nav only need this wiring once, right
      // after the header markup lands in the DOM.
      const headerEl = placeholder.querySelector(".site-header");
      const toggle = placeholder.querySelector("#navToggle");
      const nav = placeholder.querySelector("#mainNav");

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
