// Loads the shared footer (footer.html) into every page that has a
// <div id="footer-placeholder"></div>. Keeping the footer in one file

document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("footer-placeholder");
  if (!placeholder) return;

  // Use the inlined markup from partials.js by default - see
  // header-loader.js for why (avoids the file:// fetch/CORS block).
  const footerHtmlPromise =
    typeof FOOTER_HTML !== "undefined"
      ? Promise.resolve(FOOTER_HTML)
      : fetch((typeof SITE_ROOT !== "undefined" ? SITE_ROOT : "") + "footer.html").then((res) => res.text());

  footerHtmlPromise
    .then((html) => {
      placeholder.innerHTML = html;
    })
    .catch((err) => {
      console.error("Footer failed to load:", err);
    });
});
