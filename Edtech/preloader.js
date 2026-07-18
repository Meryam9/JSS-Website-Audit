// Drives the splash/preloader progress bar and fades it out once the
// page is ready. This never depends on network requests finishing, so
// it can't get stuck part-way through like a loader tied to fetch()
// calls can.
(function () {
  const preloader = document.getElementById("site-preloader");
  if (!preloader) return;

  // Repeat visit in this browser session: the inline head script
  // already hid it with CSS, so just bail out — nothing to animate.
  if (document.documentElement.classList.contains("preloader-skip")) {
    preloader.remove();
    return;
  }

  const fill = document.getElementById("preloaderFill");
  const percentLabel = document.getElementById("preloaderPercent");

  let progress = 0;
  const duration = 1200; // ms, purely cosmetic
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    // Ease toward 100% over `duration`, but never let real page-load
    // time hold it back — after `duration` it snaps straight to 100.
    progress = Math.min(100, Math.round((elapsed / duration) * 100));
    if (fill) fill.style.width = progress + "%";
    if (percentLabel) percentLabel.textContent = progress + "%";

    if (progress < 100) {
      requestAnimationFrame(tick);
    } else {
      finish();
    }
  }

  function finish() {
    preloader.classList.add("preloader-hidden");
    // Remember it's been shown so it won't appear again for the rest
    // of this browser session (e.g. navigating to Programs and back).
    try {
      sessionStorage.setItem("Edtech4d_preloader_seen", "1");
    } catch (e) {
      // sessionStorage unavailable (e.g. private mode) — harmless,
      // the splash will just show again next time.
    }
    // Remove it from the DOM after the fade so it can't block clicks
    // or get stuck visually re-appearing.
    setTimeout(() => preloader.remove(), 550);
  }

  requestAnimationFrame(tick);

  // Safety net: even if something above throws, force the splash away
  // after a couple of seconds so the site is never stuck loading.
  setTimeout(() => {
    if (document.body.contains(preloader)) finish();
  }, 2500);
})();

