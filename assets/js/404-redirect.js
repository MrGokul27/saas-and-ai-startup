(function () {
  function get404Url() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    const pagesIdx = parts.findIndex((p) => p === "pages");
    if (pagesIdx !== -1) {
      const depth = parts.length - pagesIdx;
      return "../".repeat(depth) + "404.html";
    }
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
    true,
  );
})();
