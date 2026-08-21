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
    // The tab links live in a dedicated scrollable track, with a thin
    // non-scrolling "scroll hint" bar docked underneath it so mobile users
    // can tell (and see) that the tabs scroll horizontally.
    placeholder.innerHTML =
      `<div class="pd-jumpnav-track">${html}</div>` +
      `<div class="pd-jumpnav-scrollhint">` +
      `<div class="pd-jumpnav-scrollhint-track">` +
      `<div class="pd-jumpnav-scrollhint-thumb"></div>` +
      `</div></div>`;

    const track = placeholder.querySelector(".pd-jumpnav-track");
    const scrollThumb = placeholder.querySelector(".pd-jumpnav-scrollhint-thumb");

    // Dock the bar directly beneath the real (already-inserted) header,
    // whatever its actual rendered height is at this breakpoint.
    const positionJumpnav = () => {
      const header = document.querySelector(".site-header");
      const headerHeight = header ? header.getBoundingClientRect().height : 72;
      placeholder.style.top = `${Math.round(headerHeight)}px`;
    };
    positionJumpnav();
    window.addEventListener("resize", positionJumpnav);

    // Keep the thin hint bar's thumb in sync with how far the tabs have
    // been scrolled, and hide the hint entirely once there's nothing left
    // to scroll (e.g. wide screens, or a short tab list that already fits).
    const updateScrollHint = () => {
      if (!track || !scrollThumb) return;
      const scrollable = track.scrollWidth - track.clientWidth;

      if (scrollable <= 1) {
        placeholder.classList.add("pd-jumpnav--no-scroll");
        return;
      }
      placeholder.classList.remove("pd-jumpnav--no-scroll");

      const hintTrackWidth = scrollThumb.parentElement.clientWidth;
      const thumbWidth = Math.max(
        16,
        (track.clientWidth / track.scrollWidth) * hintTrackWidth
      );
      const maxThumbOffset = hintTrackWidth - thumbWidth;
      const progress = track.scrollLeft / scrollable;

      scrollThumb.style.width = `${thumbWidth}px`;
      scrollThumb.style.transform = `translateX(${progress * maxThumbOffset}px)`;
    };

    updateScrollHint();
    if (track) track.addEventListener("scroll", updateScrollHint, { passive: true });
    window.addEventListener("resize", updateScrollHint);

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

    // On mobile, stop showing the sticky jump bar once the footer has
    // scrolled into view so it doesn't float on top of footer content.
    const watchFooterAndHideJumpnav = () => {
      const footer = document.querySelector(".site-footer");
      if (!footer) {
        // Footer partial may not be injected yet - try again shortly.
        setTimeout(watchFooterAndHideJumpnav, 150);
        return;
      }

      const footerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            placeholder.classList.toggle("pd-jumpnav--hide", entry.isIntersecting);
          });
        },
        { threshold: 0, rootMargin: "0px" }
      );
      footerObserver.observe(footer);
    };
    watchFooterAndHideJumpnav();

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