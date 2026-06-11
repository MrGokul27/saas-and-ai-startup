function buildShell() {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="db-sidebar-overlay" id="sidebarOverlay"></div>
    <aside class="db-sidebar" id="dbSidebar">
      <div class="db-sidebar-logo">
        <a href="../index.html">
          <img src="../assets/images/logoStackly.webp" alt="Stackly" />
        </a>
      </div>
      <div class="db-sidebar-user">
        <div class="db-user-avatar" id="sidebarAvatar">—</div>
        <div style="min-width:0">
          <div class="db-user-name" id="sidebarName">Loading…</div>
          <div class="db-user-role" id="sidebarRole">—</div>
        </div>
      </div>
      <nav class="db-nav" id="dbNav"></nav>
      <div class="db-sidebar-bottom">
        <button class="db-logout-btn" id="logoutBtn">
          <span style="font-size:16px">🚪</span> Sign Out
        </button>
      </div>
    </aside>
  `,
  );

  /* wrap existing content in .db-main if not already present */
  if (!document.querySelector(".db-main")) {
    const content = document.getElementById("pageContent");
    const wrapper = document.createElement("div");
    wrapper.className = "db-main";
    wrapper.innerHTML = `
      <header class="db-topbar">
        <div class="db-topbar-left">
          <button class="db-hamburger" id="hamburgerBtn" aria-label="Toggle sidebar">
            <span></span><span></span><span></span>
          </button>
          <div>
            <div class="db-page-title" id="topbarPageTitle">Dashboard</div>
            <div class="db-breadcrumb">Stackly / <span id="topbarBreadcrumb">Overview</span></div>
          </div>
        </div>
        <div class="db-topbar-right">
          <div class="db-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            Search…
            <span style="font-size:0.7rem;padding:1px 6px;background:rgba(255,255,255,0.07);border-radius:4px;margin-left:8px">⌘K</span>
          </div>
          <button class="db-icon-btn" title="Notifications">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <span class="notif-badge"></span>
          </button>
          <button class="db-icon-btn" title="Settings" onclick="window.location.href='${_getSettingsHref()}'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
            </svg>
          </button>
          <div class="db-topbar-avatar" id="topbarAvatar" title="Profile">—</div>
        </div>
      </header>
    `;
    content && wrapper.appendChild(content);
    document.body.appendChild(wrapper);
  }
}

function _getSettingsHref() {
  const r =
    JSON.parse(sessionStorage.getItem("stackly_user") || "{}").role || "viewer";
  const map = {
    admin: "admin-settings.html",
    developer: "dev-settings.html",
    analyst: "analyst-analytics.html",
    manager: "mgr-analytics.html",
    viewer: "viewer-analytics.html",
  };
  return map[r] || "dashboard.html";
}

function setTopbarMeta(title, breadcrumb) {
  const t = document.getElementById("topbarPageTitle");
  const b = document.getElementById("topbarBreadcrumb");
  if (t) t.textContent = title;
  if (b) b.textContent = breadcrumb;
}
