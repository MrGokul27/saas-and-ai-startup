/* ---- Auth Guard ---- */
const _raw = sessionStorage.getItem("stackly_user");
if (!_raw) {
  window.location.href = "login.html";
}
const _user = JSON.parse(_raw);
window.STACKLY = { user: _user };

const { email, role, name, loginTime } = _user;

/* ---- Role nav map ---- */
const ROLE_NAV = {
  admin: [
    {
      section: "Overview",
      items: [
        { icon: "🏠", label: "Dashboard", href: "dashboard.html" },
        { icon: "📊", label: "Analytics", href: "admin-analytics.html" },
        {
          icon: "📈",
          label: "Reports",
          href: "admin-reports.html",
          badge: "New",
        },
      ],
    },
    {
      section: "Management",
      items: [
        { icon: "👥", label: "Users", href: "admin-users.html", badge: "128" },
        { icon: "🔑", label: "Roles & Permissions", href: "admin-roles.html" },
        { icon: "🏢", label: "Organizations", href: "admin-orgs.html" },
        { icon: "💳", label: "Billing", href: "admin-billing.html" },
      ],
    },
    {
      section: "AI & Automation",
      items: [
        {
          icon: "🤖",
          label: "AI Agents",
          href: "admin-agents.html",
          badge: "5 live",
        },
        { icon: "⚙️", label: "Workflows", href: "admin-workflows.html" },
        { icon: "🧩", label: "Integrations", href: "admin-integrations.html" },
      ],
    },
    {
      section: "System",
      items: [
        { icon: "🛡️", label: "Security", href: "admin-security.html" },
        { icon: "📋", label: "Audit Logs", href: "admin-audit.html" },
        { icon: "🔧", label: "Settings", href: "admin-settings.html" },
      ],
    },
  ],
  developer: [
    {
      section: "Overview",
      items: [
        { icon: "🏠", label: "Dashboard", href: "dashboard.html" },
        { icon: "📡", label: "API Usage", href: "dev-api-usage.html" },
        {
          icon: "📡",
          label: "Webhooks",
          href: "dev-webhooks.html",
          badge: "3",
        },
      ],
    },
    {
      section: "Development",
      items: [
        { icon: "🔌", label: "API Explorer", href: "dev-api-explorer.html" },
        { icon: "🧩", label: "Integrations", href: "dev-integrations.html" },
        { icon: "🗄️", label: "Data Pipelines", href: "dev-pipelines.html" },
        {
          icon: "📦",
          label: "Deployments",
          href: "dev-deployments.html",
          badge: "2",
        },
      ],
    },
    {
      section: "Monitoring",
      items: [
        { icon: "⚡", label: "Performance", href: "dev-performance.html" },
        {
          icon: "🐛",
          label: "Error Logs",
          href: "dev-errors.html",
          badge: "7",
        },
        { icon: "🔧", label: "Settings", href: "dev-settings.html" },
      ],
    },
  ],
  analyst: [
    {
      section: "Overview",
      items: [
        { icon: "🏠", label: "Dashboard", href: "dashboard.html" },
        { icon: "📊", label: "Analytics", href: "analyst-analytics.html" },
        {
          icon: "📈",
          label: "Reports",
          href: "analyst-reports.html",
          badge: "New",
        },
      ],
    },
    {
      section: "Data",
      items: [
        { icon: "🗂️", label: "Datasets", href: "analyst-datasets.html" },
        { icon: "🔍", label: "Query Builder", href: "analyst-query.html" },
        { icon: "📉", label: "Funnels", href: "analyst-funnels.html" },
        { icon: "🎯", label: "Goals & KPIs", href: "analyst-goals.html" },
      ],
    },
    {
      section: "Exports",
      items: [
        { icon: "📤", label: "Export Center", href: "analyst-exports.html" },
        {
          icon: "📧",
          label: "Scheduled Reports",
          href: "analyst-scheduled.html",
          badge: "2",
        },
      ],
    },
  ],
  manager: [
    {
      section: "Overview",
      items: [
        { icon: "🏠", label: "Dashboard", href: "dashboard.html" },
        { icon: "📊", label: "Team Analytics", href: "mgr-analytics.html" },
        { icon: "📈", label: "OKRs", href: "mgr-okrs.html" },
      ],
    },
    {
      section: "Team",
      items: [
        { icon: "👥", label: "Members", href: "mgr-members.html", badge: "12" },
        { icon: "📋", label: "Projects", href: "mgr-projects.html" },
        { icon: "✅", label: "Task Board", href: "mgr-tasks.html", badge: "5" },
        { icon: "📆", label: "Calendar", href: "mgr-calendar.html" },
      ],
    },
    {
      section: "Finance",
      items: [
        { icon: "💰", label: "Budget Tracker", href: "mgr-budget.html" },
        {
          icon: "🧾",
          label: "Invoices",
          href: "mgr-invoices.html",
          badge: "3",
        },
      ],
    },
  ],
  viewer: [
    {
      section: "Overview",
      items: [
        { icon: "🏠", label: "Dashboard", href: "dashboard.html" },
        { icon: "📊", label: "Analytics", href: "viewer-analytics.html" },
      ],
    },
    {
      section: "Browse",
      items: [
        { icon: "📈", label: "Reports", href: "viewer-reports.html" },
        { icon: "📄", label: "Documents", href: "viewer-documents.html" },
        {
          icon: "🎓",
          label: "Tutorials",
          href: "viewer-tutorials.html",
          badge: "New",
        },
      ],
    },
  ],
};

/* ---- Helpers ---- */
function _initials(n) {
  return (n || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
function _greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

/* ---- Render sidebar nav ---- */
function renderSidebar(activeHref) {
  const nav = ROLE_NAV[role] || ROLE_NAV.viewer;
  const el = document.getElementById("dbNav");
  if (!el) return;
  el.innerHTML = "";
  nav.forEach((section) => {
    const sec = document.createElement("div");
    sec.className = "db-nav-section";
    sec.innerHTML = `<div class="db-nav-label">${section.section}</div>`;
    section.items.forEach((item) => {
      const a = document.createElement("a");
      a.href = item.href;
      a.className = "db-nav-item" + (item.href === activeHref ? " active" : "");
      a.innerHTML = `
        <span class="db-nav-icon">${item.icon}</span>
        <span>${item.label}</span>
        ${item.badge ? `<span class="db-nav-badge">${item.badge}</span>` : ""}
      `;
      sec.appendChild(a);
    });
    el.appendChild(sec);
  });
}

/* ---- Populate user identity elements ---- */
function populateUserUI() {
  const av = _initials(name);
  const setTxt = (id, v) => {
    const e = document.getElementById(id);
    if (e) e.textContent = v;
  };
  setTxt("sidebarAvatar", av);
  setTxt("sidebarName", name);
  setTxt("sidebarRole", role);
  setTxt("topbarAvatar", av);
  const ta = document.getElementById("topbarAvatar");
  if (ta) ta.title = `${name} (${role})`;
}

/* ---- Placeholder Redirection ---- */
function _initPlaceholderRedirects() {
  document.addEventListener("click", (e) => {
    const target = e.target.closest("a, button");
    if (!target) return;

    // Skip functional dashboard elements
    if (target.id === "logoutBtn" || target.closest("#logoutBtn")) return;
    if (target.id === "hamburgerBtn" || target.closest("#hamburgerBtn")) return;

    const isLink = target.tagName === "A";
    const isButton = target.tagName === "BUTTON";

    if (isLink) {
      const href = target.getAttribute("href");
      const isPlaceholder =
        !href || href === "#" || href.startsWith("javascript:");
      if (isPlaceholder) {
        e.preventDefault();
        _redirectTo404();
      }
    } else if (isButton) {
      // Redirect buttons that don't have an inline onclick (placeholder check)
      if (!target.hasAttribute("onclick")) {
        _redirectTo404();
      }
    }
  });
}

function _redirectTo404() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const pagesIdx = parts.findIndex((p) => p === "pages");
  const depth = pagesIdx !== -1 ? Math.max(0, parts.length - 1 - pagesIdx) : 0;
  const prefix = "../".repeat(depth);

  window.location.href = prefix + "404.html";
}

/* ---- Live clock ---- */
function startClock() {
  function tick() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const clockEl = document.getElementById("liveClock");
    const dateEl = document.getElementById("liveDate");
    if (clockEl) clockEl.textContent = `${h}:${m}`;
    if (dateEl)
      dateEl.textContent = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
  }
  tick();
  setInterval(tick, 10000);
}

/* ---- Mobile sidebar toggle ---- */
function initMobileToggle() {
  const sidebar = document.getElementById("dbSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  const hamburger = document.getElementById("hamburgerBtn");
  if (!hamburger) return;
  hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("open");
  });
  overlay &&
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("open");
      overlay.classList.remove("open");
    });
}

/* ---- Logout ---- */
function initLogout() {
  const btn = document.getElementById("logoutBtn");
  if (btn)
    btn.addEventListener("click", () => {
      sessionStorage.removeItem("stackly_user");
      window.location.href = "login.html";
    });
}

/* ---- Welcome banner ---- */
function setWelcome(sub) {
  const titleEl = document.getElementById("welcomeTitle");
  const subEl = document.getElementById("welcomeSub");
  if (titleEl)
    titleEl.textContent = `${_greeting()}, ${name.split(" ")[0]}! 👋`;
  if (subEl) subEl.textContent = sub || "Here's your workspace overview.";
}

/* ---- Boot all shell features ---- */
function bootShell(activeHref, welcomeSub) {
  populateUserUI();
  renderSidebar(activeHref);
  startClock();
  initMobileToggle();
  initLogout();
  setWelcome(welcomeSub);
  _initPlaceholderRedirects();
}
