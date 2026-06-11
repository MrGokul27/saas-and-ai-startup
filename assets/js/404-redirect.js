(function () {
  // Resolve the root-relative path to 404.html regardless of nesting depth
  function get404Url() {
    // Count how many directories deep we are relative to the project root
    const parts = window.location.pathname.split("/").filter(Boolean);
    // Find "pages" segment to determine depth (works for file:// and http://)
    const pagesIdx = parts.findIndex((p) => p === "pages");
    if (pagesIdx !== -1) {
      // Inside /pages/ or deeper — go up to root
      const depth = parts.length - pagesIdx;
      return "../".repeat(depth) + "404.html";
    }
    // Already at root
    return "404.html";
  }

  document.addEventListener(
    "click",
    function (e) {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (href === null) return;

      const trimmed = href.trim();

      // Intercept placeholder hrefs only
      const isPlaceholder =
        trimmed === "#" ||
        trimmed === "" ||
        trimmed === "javascript:void(0)" ||
        trimmed === "javascript:;";

      if (!isPlaceholder) return;

      e.preventDefault();
      e.stopPropagation();

      window.location.href = get404Url();
    },
    true, // capture phase so it fires before any inline handlers
  );
})();
