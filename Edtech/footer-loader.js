// Loads the shared footer (footer.html) into every page that has a
// <div id="footer-placeholder"></div>. Keeping the footer in one file
// means contact info, socials, and the copyright line only ever need
// to be edited in one place.
document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("footer-placeholder");
  if (!placeholder) return;

  fetch("footer.html")
    .then((res) => res.text())
    .then((html) => {
      placeholder.innerHTML = html;
    })
    .catch((err) => {
      console.error("Footer failed to load:", err);
    });
});
