document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("jumpnav-placeholder");
  if (!placeholder) return;

  // A page can supply its own tab set (e.g. shorter programs that don't
  // have every section) via window.JUMPNAV_HTML_OVERRIDE, declared in an
  // inline <script> before this file loads. Otherwise fall back to the
  // shared default defined in partials.js.
  const resolvedHtml =
    typeof window.JUMPNAV_HTML_OVERRIDE !== "undefined"
      ? window.JUMPNAV_HTML_OVERRIDE
      : typeof JUMPNAV_HTML !== "undefined"
      ? JUMPNAV_HTML
      : null;

  const jumpnavHtmlPromise = Promise.resolve(resolvedHtml);

  jumpnavHtmlPromise.then((html) => {
    if (!html) return;

    placeholder.classList.add("pd-jumpnav");
    placeholder.innerHTML = html;

    // Dock the bar directly beneath the real (already-inserted) header,
    // whatever its actual rendered height is at this breakpoint.
    const positionJumpnav = () => {
      const header = document.querySelector(".site-header");
      const headerHeight = header ? header.getBoundingClientRect().height : 72;
      placeholder.style.top = `${Math.round(headerHeight)}px`;
    };
    positionJumpnav();
    window.addEventListener("resize", positionJumpnav);

    // Scroll-spy: highlight whichever section is currently under the
    // sticky bar as the user scrolls.
    const links = Array.from(placeholder.querySelectorAll("a[data-jump]"));
    const sections = links
      .map((link) => document.getElementById(link.dataset.jump))
      .filter(Boolean);

    if (!sections.length) return;

    const setActive = (id) => {
      links.forEach((link) => {
        link.classList.toggle("active", link.dataset.jump === id);
      });
    };

    const jumpnavHeight = placeholder.getBoundingClientRect().height || 56;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        // Treat a section as "current" once it's just under the sticky
        // header + jump bar, and stop counting it once it's past the
        // upper third of the viewport.
        rootMargin: `-${Math.round(jumpnavHeight) + 80}px 0px -65% 0px`,
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    // Smooth-scroll on click, accounting for the sticky offset so the
    // section heading doesn't end up hidden behind the bars.
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const target = document.getElementById(link.dataset.jump);
        if (!target) return;
        e.preventDefault();
        const header = document.querySelector(".site-header");
        const headerHeight = header ? header.getBoundingClientRect().height : 72;
        const offset = headerHeight + jumpnavHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });
  });
});
