/* ---- Guard: require login ---- */
const raw = sessionStorage.getItem("stackly_user");
if (!raw) {
  window.location.href = "login.html";
}
const user = JSON.parse(raw);
const { email, role, name, loginTime } = user;

/* ---- Role config ---- */
const ROLE_NAV = {
  admin: [
    {
      section: "Overview",
      items: [
        {
          icon: "🏠",
          label: "Dashboard",
          href: "dashboard.html",
          active: true,
          badge: "",
        },
        {
          icon: "📊",
          label: "Analytics",
          href: "admin-analytics.html",
          active: false,
          badge: "",
        },
        {
          icon: "📈",
          label: "Reports",
          href: "admin-reports.html",
          active: false,
          badge: "New",
        },
      ],
    },
    {
      section: "Management",
      items: [
        {
          icon: "👥",
          label: "Users",
          href: "admin-users.html",
          active: false,
          badge: "128",
        },
        {
          icon: "🔑",
          label: "Roles & Permissions",
          href: "admin-roles.html",
          active: false,
          badge: "",
        },
        {
          icon: "🏢",
          label: "Organizations",
          href: "admin-orgs.html",
          active: false,
          badge: "",
        },
        {
          icon: "💳",
          label: "Billing",
          href: "admin-billing.html",
          active: false,
          badge: "",
        },
      ],
    },
    {
      section: "AI & Automation",
      items: [
        {
          icon: "🤖",
          label: "AI Agents",
          href: "admin-agents.html",
          active: false,
          badge: "5 live",
        },
        {
          icon: "⚙️",
          label: "Workflows",
          href: "admin-workflows.html",
          active: false,
          badge: "",
        },
        {
          icon: "🧩",
          label: "Integrations",
          href: "admin-integrations.html",
          active: false,
          badge: "",
        },
      ],
    },
    {
      section: "System",
      items: [
        {
          icon: "🛡️",
          label: "Security",
          href: "admin-security.html",
          active: false,
          badge: "",
        },
        {
          icon: "📋",
          label: "Audit Logs",
          href: "admin-audit.html",
          active: false,
          badge: "",
        },
        {
          icon: "🔧",
          label: "Settings",
          href: "admin-settings.html",
          active: false,
          badge: "",
        },
      ],
    },
  ],
  developer: [
    {
      section: "Overview",
      items: [
        {
          icon: "🏠",
          label: "Dashboard",
          href: "dashboard.html",
          active: true,
          badge: "",
        },
        {
          icon: "📡",
          label: "API Usage",
          href: "dev-api-usage.html",
          active: false,
          badge: "",
        },
        {
          icon: "📡",
          label: "Webhooks",
          href: "dev-webhooks.html",
          active: false,
          badge: "3",
        },
      ],
    },
    {
      section: "Development",
      items: [
        {
          icon: "🔌",
          label: "API Explorer",
          href: "dev-api-explorer.html",
          active: false,
          badge: "",
        },
        {
          icon: "🧩",
          label: "Integrations",
          href: "dev-integrations.html",
          active: false,
          badge: "",
        },
        {
          icon: "🗄️",
          label: "Data Pipelines",
          href: "dev-pipelines.html",
          active: false,
          badge: "",
        },
        {
          icon: "📦",
          label: "Deployments",
          href: "dev-deployments.html",
          active: false,
          badge: "2",
        },
      ],
    },
    {
      section: "Monitoring",
      items: [
        {
          icon: "⚡",
          label: "Performance",
          href: "dev-performance.html",
          active: false,
          badge: "",
        },
        {
          icon: "🐛",
          label: "Error Logs",
          href: "dev-errors.html",
          active: false,
          badge: "7",
        },
        {
          icon: "🔧",
          label: "Settings",
          href: "dev-settings.html",
          active: false,
          badge: "",
        },
      ],
    },
  ],
  analyst: [
    {
      section: "Overview",
      items: [
        {
          icon: "🏠",
          label: "Dashboard",
          href: "dashboard.html",
          active: true,
          badge: "",
        },
        {
          icon: "📊",
          label: "Analytics",
          href: "analyst-analytics.html",
          active: false,
          badge: "",
        },
        {
          icon: "📈",
          label: "Reports",
          href: "analyst-reports.html",
          active: false,
          badge: "New",
        },
      ],
    },
    {
      section: "Data",
      items: [
        {
          icon: "🗂️",
          label: "Datasets",
          href: "analyst-datasets.html",
          active: false,
          badge: "",
        },
        {
          icon: "🔍",
          label: "Query Builder",
          href: "analyst-query.html",
          active: false,
          badge: "",
        },
        {
          icon: "📉",
          label: "Funnels",
          href: "analyst-funnels.html",
          active: false,
          badge: "",
        },
        {
          icon: "🎯",
          label: "Goals & KPIs",
          href: "analyst-goals.html",
          active: false,
          badge: "",
        },
      ],
    },
    {
      section: "Exports",
      items: [
        {
          icon: "📤",
          label: "Export Center",
          href: "analyst-exports.html",
          active: false,
          badge: "",
        },
        {
          icon: "📧",
          label: "Scheduled Reports",
          href: "analyst-scheduled.html",
          active: false,
          badge: "2",
        },
      ],
    },
  ],
  manager: [
    {
      section: "Overview",
      items: [
        {
          icon: "🏠",
          label: "Dashboard",
          href: "dashboard.html",
          active: true,
          badge: "",
        },
        {
          icon: "📊",
          label: "Team Analytics",
          href: "mgr-analytics.html",
          active: false,
          badge: "",
        },
        {
          icon: "📈",
          label: "OKRs",
          href: "mgr-okrs.html",
          active: false,
          badge: "",
        },
      ],
    },
    {
      section: "Team",
      items: [
        {
          icon: "👥",
          label: "Members",
          href: "mgr-members.html",
          active: false,
          badge: "12",
        },
        {
          icon: "📋",
          label: "Projects",
          href: "mgr-projects.html",
          active: false,
          badge: "",
        },
        {
          icon: "✅",
          label: "Task Board",
          href: "mgr-tasks.html",
          active: false,
          badge: "5",
        },
        {
          icon: "📆",
          label: "Calendar",
          href: "mgr-calendar.html",
          active: false,
          badge: "",
        },
      ],
    },
    {
      section: "Finance",
      items: [
        {
          icon: "💰",
          label: "Budget Tracker",
          href: "mgr-budget.html",
          active: false,
          badge: "",
        },
        {
          icon: "🧾",
          label: "Invoices",
          href: "mgr-invoices.html",
          active: false,
          badge: "3",
        },
      ],
    },
  ],
  viewer: [
    {
      section: "Overview",
      items: [
        {
          icon: "🏠",
          label: "Dashboard",
          href: "dashboard.html",
          active: true,
          badge: "",
        },
        {
          icon: "📊",
          label: "Analytics",
          href: "viewer-analytics.html",
          active: false,
          badge: "",
        },
      ],
    },
    {
      section: "Browse",
      items: [
        {
          icon: "📈",
          label: "Reports",
          href: "viewer-reports.html",
          active: false,
          badge: "",
        },
        {
          icon: "📄",
          label: "Documents",
          href: "viewer-documents.html",
          active: false,
          badge: "",
        },
        {
          icon: "🎓",
          label: "Tutorials",
          href: "viewer-tutorials.html",
          active: false,
          badge: "New",
        },
      ],
    },
  ],
};

const ROLE_KPI = {
  admin: [
    {
      icon: "💰",
      iconBg: "icon-green",
      label: "Total Revenue",
      value: "$284K",
      trend: "+18.2%",
      trendType: "up",
      sub: "↑ $44K from last month",
    },
    {
      icon: "👥",
      iconBg: "icon-purple",
      label: "Active Users",
      value: "12,840",
      trend: "+5.7%",
      trendType: "up",
      sub: "128 new this week",
    },
    {
      icon: "🤖",
      iconBg: "icon-blue",
      label: "AI Operations",
      value: "1.4M",
      trend: "+31%",
      trendType: "up",
      sub: "Per day average",
    },
    {
      icon: "🛡️",
      iconBg: "icon-red",
      label: "Security Score",
      value: "98/100",
      trend: "↑ 2pts",
      trendType: "up",
      sub: "SOC 2 compliant",
    },
  ],
  developer: [
    {
      icon: "📡",
      iconBg: "icon-blue",
      label: "API Requests",
      value: "4.2M",
      trend: "+22%",
      trendType: "up",
      sub: "Today vs yesterday",
    },
    {
      icon: "⚡",
      iconBg: "icon-green",
      label: "Avg Latency",
      value: "38ms",
      trend: "-12ms",
      trendType: "up",
      sub: "P95 response time",
    },
    {
      icon: "🐛",
      iconBg: "icon-red",
      label: "Error Rate",
      value: "0.04%",
      trend: "-0.01%",
      trendType: "up",
      sub: "Below 0.1% target",
    },
    {
      icon: "📦",
      iconBg: "icon-purple",
      label: "Deployments",
      value: "14",
      trend: "↑ 3",
      trendType: "up",
      sub: "This sprint",
    },
  ],
  analyst: [
    {
      icon: "👁️",
      iconBg: "icon-blue",
      label: "Page Views",
      value: "892K",
      trend: "+14.3%",
      trendType: "up",
      sub: "Monthly total",
    },
    {
      icon: "🎯",
      iconBg: "icon-green",
      label: "Conversion Rate",
      value: "6.8%",
      trend: "+0.9%",
      trendType: "up",
      sub: "vs 5.9% last month",
    },
    {
      icon: "⏱️",
      iconBg: "icon-purple",
      label: "Avg Session",
      value: "4m 22s",
      trend: "+18s",
      trendType: "up",
      sub: "Engagement up",
    },
    {
      icon: "📉",
      iconBg: "icon-red",
      label: "Bounce Rate",
      value: "28%",
      trend: "-4%",
      trendType: "up",
      sub: "Down from 32%",
    },
  ],
  manager: [
    {
      icon: "✅",
      iconBg: "icon-green",
      label: "Tasks Done",
      value: "84%",
      trend: "+6%",
      trendType: "up",
      sub: "Sprint completion",
    },
    {
      icon: "👥",
      iconBg: "icon-purple",
      label: "Team Size",
      value: "12",
      trend: "+2",
      trendType: "up",
      sub: "2 new this quarter",
    },
    {
      icon: "💰",
      iconBg: "icon-blue",
      label: "Budget Used",
      value: "$42K",
      trend: "68%",
      trendType: "neutral",
      sub: "of $62K total",
    },
    {
      icon: "📆",
      iconBg: "icon-orange",
      label: "Upcoming Deadlines",
      value: "7",
      trend: "3 urgent",
      trendType: "down",
      sub: "Next 14 days",
    },
  ],
  viewer: [
    {
      icon: "📄",
      iconBg: "icon-blue",
      label: "Reports Viewed",
      value: "24",
      trend: "+8",
      trendType: "up",
      sub: "This month",
    },
    {
      icon: "📊",
      iconBg: "icon-purple",
      label: "Dashboards",
      value: "6",
      trend: "Active",
      trendType: "neutral",
      sub: "Shared with you",
    },
    {
      icon: "🔔",
      iconBg: "icon-green",
      label: "Alerts",
      value: "3",
      trend: "Unread",
      trendType: "down",
      sub: "Requires attention",
    },
    {
      icon: "🎓",
      iconBg: "icon-orange",
      label: "Tutorials Done",
      value: "9/15",
      trend: "60%",
      trendType: "neutral",
      sub: "Keep going!",
    },
  ],
};

const ROLE_CHART = {
  admin: {
    title: "Weekly Revenue",
    total: "$48,200",
    donutTitle: "Revenue Split",
    values: [38, 72, 55, 61, 80, 67, 91],
  },
  developer: {
    title: "API Requests / Day (K)",
    total: "4.2M total",
    donutTitle: "Request Types",
    values: [82, 65, 90, 78, 95, 88, 100],
  },
  analyst: {
    title: "Daily Page Views (K)",
    total: "892K total",
    donutTitle: "Traffic Sources",
    values: [45, 62, 55, 70, 66, 80, 74],
  },
  manager: {
    title: "Tasks Completed / Day",
    total: "84% sprint",
    donutTitle: "Task Status",
    values: [6, 9, 7, 12, 8, 11, 10],
  },
  viewer: {
    title: "Content Views / Day",
    total: "24 reports",
    donutTitle: "Content Types",
    values: [3, 5, 4, 7, 6, 8, 9],
  },
};

const ROLE_DONUT = {
  admin: [
    { label: "SaaS", val: 42, color: "#6c63ff" },
    { label: "Enterprise", val: 31, color: "#00d4ff" },
    { label: "Starter", val: 18, color: "#00ffa3" },
    { label: "Add-ons", val: 9, color: "#ff6b6b" },
  ],
  developer: [
    { label: "REST", val: 54, color: "#6c63ff" },
    { label: "GraphQL", val: 28, color: "#00d4ff" },
    { label: "WebSocket", val: 12, color: "#00ffa3" },
    { label: "gRPC", val: 6, color: "#ffaa6b" },
  ],
  analyst: [
    { label: "Organic", val: 38, color: "#6c63ff" },
    { label: "Paid", val: 26, color: "#00d4ff" },
    { label: "Social", val: 22, color: "#00ffa3" },
    { label: "Direct", val: 14, color: "#ff6b6b" },
  ],
  manager: [
    { label: "Done", val: 51, color: "#00ffa3" },
    { label: "In Progress", val: 25, color: "#6c63ff" },
    { label: "Review", val: 16, color: "#00d4ff" },
    { label: "Blocked", val: 8, color: "#ff6b6b" },
  ],
  viewer: [
    { label: "Reports", val: 40, color: "#6c63ff" },
    { label: "Dashboards", val: 35, color: "#00d4ff" },
    { label: "Tutorials", val: 25, color: "#00ffa3" },
  ],
};

const ROLE_ACTIVITY = {
  admin: [
    {
      icon: "👤",
      bg: "rgba(108,99,255,0.15)",
      text: "<strong>Sarah K.</strong> joined as Developer",
      time: "2m ago",
    },
    {
      icon: "⚡",
      bg: "rgba(0,255,163,0.12)",
      text: "<strong>Workflow #42</strong> completed 1,240 automations",
      time: "5m ago",
    },
    {
      icon: "💳",
      bg: "rgba(0,212,255,0.12)",
      text: "<strong>Orbit Labs</strong> upgraded to Enterprise plan",
      time: "12m ago",
    },
    {
      icon: "🛡️",
      bg: "rgba(255,107,107,0.12)",
      text: "<strong>Security scan</strong> passed — 0 vulnerabilities",
      time: "28m ago",
    },
    {
      icon: "🤖",
      bg: "rgba(108,99,255,0.15)",
      text: "<strong>Agent Nexus</strong> processed 42K records",
      time: "1h ago",
    },
  ],
  developer: [
    {
      icon: "📦",
      bg: "rgba(0,212,255,0.12)",
      text: "<strong>v2.4.1</strong> deployed to production",
      time: "3m ago",
    },
    {
      icon: "🐛",
      bg: "rgba(255,107,107,0.12)",
      text: "<strong>Bug #1087</strong> resolved — memory leak fixed",
      time: "18m ago",
    },
    {
      icon: "📡",
      bg: "rgba(0,255,163,0.12)",
      text: "<strong>Webhook /events</strong> received 320 payloads",
      time: "30m ago",
    },
    {
      icon: "🔌",
      bg: "rgba(108,99,255,0.15)",
      text: "<strong>Stripe integration</strong> reconnected successfully",
      time: "45m ago",
    },
    {
      icon: "⚡",
      bg: "rgba(0,255,163,0.12)",
      text: "<strong>CI pipeline</strong> passed all 148 tests",
      time: "1h ago",
    },
  ],
  analyst: [
    {
      icon: "📈",
      bg: "rgba(0,255,163,0.12)",
      text: "<strong>Conversion report</strong> for Q3 is ready",
      time: "5m ago",
    },
    {
      icon: "🎯",
      bg: "rgba(108,99,255,0.15)",
      text: "<strong>Goal #4</strong> 'Reach 7% CVR' hit 6.8%",
      time: "22m ago",
    },
    {
      icon: "👁️",
      bg: "rgba(0,212,255,0.12)",
      text: "<strong>Landing page</strong> views up 14% this week",
      time: "40m ago",
    },
    {
      icon: "📉",
      bg: "rgba(0,255,163,0.12)",
      text: "<strong>Bounce rate</strong> dropped to 28% — best ever",
      time: "1h ago",
    },
    {
      icon: "📤",
      bg: "rgba(255,170,107,0.12)",
      text: "<strong>Weekly digest</strong> sent to 8 stakeholders",
      time: "2h ago",
    },
  ],
  manager: [
    {
      icon: "✅",
      bg: "rgba(0,255,163,0.12)",
      text: "<strong>Task #88</strong> 'API docs update' marked done",
      time: "7m ago",
    },
    {
      icon: "👥",
      bg: "rgba(108,99,255,0.15)",
      text: "<strong>Marcus R.</strong> joined the team",
      time: "20m ago",
    },
    {
      icon: "📆",
      bg: "rgba(0,212,255,0.12)",
      text: "<strong>Sprint review</strong> scheduled for Friday 2pm",
      time: "1h ago",
    },
    {
      icon: "💰",
      bg: "rgba(255,170,107,0.12)",
      text: "<strong>Invoice #204</strong> approved — $8,400",
      time: "2h ago",
    },
    {
      icon: "📋",
      bg: "rgba(108,99,255,0.15)",
      text: "<strong>Project Orion</strong> moved to In Review",
      time: "3h ago",
    },
  ],
  viewer: [
    {
      icon: "📄",
      bg: "rgba(108,99,255,0.15)",
      text: "<strong>Q3 Analytics Report</strong> shared with you",
      time: "1h ago",
    },
    {
      icon: "🔔",
      bg: "rgba(255,107,107,0.12)",
      text: "<strong>Alert:</strong> Bounce rate spike detected",
      time: "2h ago",
    },
    {
      icon: "🎓",
      bg: "rgba(0,255,163,0.12)",
      text: "<strong>Tutorial:</strong> Getting started with dashboards",
      time: "3h ago",
    },
    {
      icon: "📊",
      bg: "rgba(0,212,255,0.12)",
      text: "<strong>Dashboard #3</strong> was updated",
      time: "5h ago",
    },
  ],
};

const ROLE_AGENTS = {
  admin: [
    {
      icon: "🧠",
      bg: "rgba(108,99,255,0.15)",
      name: "Nexus AI",
      task: "Processing 42K user records",
      status: "running",
      statusClass: "status-running",
    },
    {
      icon: "📊",
      bg: "rgba(0,212,255,0.12)",
      name: "Analyst Bot",
      task: "Generating weekly report",
      status: "running",
      statusClass: "status-running",
    },
    {
      icon: "🔒",
      bg: "rgba(0,255,163,0.12)",
      name: "SecureGuard",
      task: "Monitoring 12 endpoints",
      status: "running",
      statusClass: "status-running",
    },
    {
      icon: "📧",
      bg: "rgba(255,170,107,0.12)",
      name: "Mailer Agent",
      task: "Queue empty — on standby",
      status: "idle",
      statusClass: "status-idle",
    },
  ],
  developer: [
    {
      icon: "🔍",
      bg: "rgba(108,99,255,0.15)",
      name: "Code Reviewer",
      task: "Scanning PR #142",
      status: "running",
      statusClass: "status-running",
    },
    {
      icon: "🧪",
      bg: "rgba(0,212,255,0.12)",
      name: "Test Runner",
      task: "Running 148 unit tests",
      status: "running",
      statusClass: "status-running",
    },
    {
      icon: "📦",
      bg: "rgba(0,255,163,0.12)",
      name: "Deploy Agent",
      task: "Awaiting merge approval",
      status: "queued",
      statusClass: "status-queued",
    },
    {
      icon: "🐛",
      bg: "rgba(255,107,107,0.12)",
      name: "Bug Tracker",
      task: "Error in module auth.js",
      status: "error",
      statusClass: "status-error",
    },
  ],
  analyst: [
    {
      icon: "📈",
      bg: "rgba(0,255,163,0.12)",
      name: "Trend Analyzer",
      task: "Processing 7-day cohort",
      status: "running",
      statusClass: "status-running",
    },
    {
      icon: "🎯",
      bg: "rgba(108,99,255,0.15)",
      name: "Goal Tracker",
      task: "Monitoring 6 active KPIs",
      status: "running",
      statusClass: "status-running",
    },
    {
      icon: "📤",
      bg: "rgba(0,212,255,0.12)",
      name: "Report Exporter",
      task: "Queued: 2 exports pending",
      status: "queued",
      statusClass: "status-queued",
    },
  ],
  manager: [
    {
      icon: "✅",
      bg: "rgba(0,255,163,0.12)",
      name: "Task Planner",
      task: "Sprint 14 — Day 6/14",
      status: "running",
      statusClass: "status-running",
    },
    {
      icon: "📆",
      bg: "rgba(108,99,255,0.15)",
      name: "Scheduler",
      task: "3 meetings tomorrow",
      status: "idle",
      statusClass: "status-idle",
    },
    {
      icon: "💰",
      bg: "rgba(255,170,107,0.12)",
      name: "Budget Monitor",
      task: "68% budget used — on track",
      status: "idle",
      statusClass: "status-idle",
    },
  ],
  viewer: [
    {
      icon: "🔔",
      bg: "rgba(255,107,107,0.12)",
      name: "Alert Bot",
      task: "3 unread alerts for you",
      status: "running",
      statusClass: "status-running",
    },
    {
      icon: "📄",
      bg: "rgba(108,99,255,0.15)",
      name: "Report Watcher",
      task: "2 new reports available",
      status: "idle",
      statusClass: "status-idle",
    },
  ],
};

const ROLE_TASKS = {
  admin: [
    { label: "User Onboarding Pipeline", pct: 92, cls: "" },
    { label: "SOC 2 Audit Prep", pct: 78, cls: "accent" },
    { label: "Q4 Revenue Target", pct: 65, cls: "" },
    { label: "Infrastructure Migration", pct: 43, cls: "warn" },
    { label: "AI Model Training v3", pct: 88, cls: "accent" },
  ],
  developer: [
    { label: "API v3 Migration", pct: 72, cls: "" },
    { label: "Unit Test Coverage", pct: 86, cls: "accent" },
    { label: "CI/CD Pipeline Upgrade", pct: 55, cls: "warn" },
    { label: "GraphQL Schema Refactor", pct: 38, cls: "" },
    { label: "Performance Optimization", pct: 91, cls: "accent" },
  ],
  analyst: [
    { label: "Q3 Analytics Report", pct: 95, cls: "accent" },
    { label: "Funnel Optimization Study", pct: 68, cls: "" },
    { label: "Attribution Model Update", pct: 42, cls: "warn" },
    { label: "Dashboard Redesign", pct: 77, cls: "accent" },
    { label: "Cohort Analysis Automation", pct: 60, cls: "" },
  ],
  manager: [
    { label: "Sprint 14 Completion", pct: 84, cls: "accent" },
    { label: "Q4 OKRs Defined", pct: 100, cls: "" },
    { label: "Budget Reconciliation", pct: 68, cls: "warn" },
    { label: "Team Hiring Plan", pct: 50, cls: "" },
    { label: "Roadmap Presentation", pct: 90, cls: "accent" },
  ],
  viewer: [
    { label: "Onboarding Tutorials", pct: 60, cls: "accent" },
    { label: "Reading Q3 Report", pct: 40, cls: "" },
    { label: "Setting Up Alerts", pct: 25, cls: "warn" },
  ],
};

const ROLE_TABLE = {
  admin: {
    icon: "👥",
    title: "Recent Users",
    head: ["User", "Role", "Email", "Status", "Joined"],
    rows: [
      ["Sarah K.", "Developer", "sarah.k@orbitlabs.io", "active", "2 days ago"],
      ["Marcus R.", "Manager", "marcus@stackly.io", "active", "1 week ago"],
      ["Priya N.", "Analyst", "priya.n@axiom.co", "active", "2 weeks ago"],
      ["Tom H.", "Viewer", "tom.h@demo.com", "inactive", "1 month ago"],
      ["Elena M.", "Developer", "elena.m@devs.io", "pending", "Today"],
    ],
  },
  developer: {
    icon: "📦",
    title: "Recent Deployments",
    head: ["Version", "Branch", "Status", "Duration", "Deployed"],
    rows: [
      ["v2.4.1", "main", "active", "1m 24s", "Just now"],
      ["v2.4.0", "main", "active", "1m 18s", "2h ago"],
      ["v2.3.9", "hotfix/auth", "active", "58s", "1d ago"],
      ["v2.3.8", "main", "inactive", "2m 01s", "3d ago"],
      ["v2.3.7", "feature/api-v3", "danger", "Failed", "5d ago"],
    ],
  },
  analyst: {
    icon: "📈",
    title: "Top Pages",
    head: ["Page", "Views", "Bounce", "Avg Time", "CVR"],
    rows: [
      ["/pricing", "42,100", "22%", "3m 40s", "8.2%"],
      ["/features", "38,400", "28%", "2m 55s", "5.6%"],
      ["/home", "91,200", "35%", "1m 20s", "3.1%"],
      ["/docs", "24,600", "18%", "5m 10s", "1.8%"],
      ["/blog", "17,800", "40%", "2m 00s", "2.4%"],
    ],
  },
  manager: {
    icon: "📋",
    title: "Active Projects",
    head: ["Project", "Owner", "Progress", "Due Date", "Status"],
    rows: [
      ["Project Orion", "Marcus R.", "88%", "Nov 15", "active"],
      ["Platform v3", "Sarah K.", "62%", "Nov 28", "active"],
      ["Data Migration", "Priya N.", "41%", "Dec 5", "pending"],
      ["Brand Refresh", "Tom H.", "97%", "Nov 10", "active"],
      ["API Docs", "Elena M.", "25%", "Dec 20", "inactive"],
    ],
  },
  viewer: {
    icon: "📄",
    title: "Available Reports",
    head: ["Report", "Author", "Date", "Type", "Status"],
    rows: [
      ["Q3 Analytics Summary", "Priya N.", "Oct 31", "Analytics", "active"],
      ["User Growth Trends", "Marcus R.", "Oct 28", "Growth", "active"],
      ["Revenue Breakdown", "Admin", "Oct 25", "Finance", "active"],
      ["AI Performance", "Sarah K.", "Oct 20", "AI Ops", "pending"],
    ],
  },
};

const ROLE_QUICK = {
  admin: [
    { icon: "👤", bg: "rgba(108,99,255,0.15)", label: "Invite Team Member" },
    { icon: "📊", bg: "rgba(0,212,255,0.12)", label: "Generate Report" },
    { icon: "🤖", bg: "rgba(0,255,163,0.12)", label: "Launch AI Agent" },
    { icon: "🔧", bg: "rgba(255,170,107,0.12)", label: "System Settings" },
  ],
  developer: [
    { icon: "📦", bg: "rgba(108,99,255,0.15)", label: "New Deployment" },
    { icon: "🔌", bg: "rgba(0,212,255,0.12)", label: "Add Integration" },
    { icon: "📡", bg: "rgba(0,255,163,0.12)", label: "Test Webhook" },
    { icon: "🐛", bg: "rgba(255,107,107,0.12)", label: "View Error Logs" },
  ],
  analyst: [
    { icon: "📈", bg: "rgba(0,255,163,0.12)", label: "Create Report" },
    { icon: "🔍", bg: "rgba(108,99,255,0.15)", label: "Query Builder" },
    { icon: "📤", bg: "rgba(0,212,255,0.12)", label: "Export Data" },
    { icon: "🎯", bg: "rgba(255,170,107,0.12)", label: "Set New Goal" },
  ],
  manager: [
    { icon: "✅", bg: "rgba(0,255,163,0.12)", label: "Add Task" },
    { icon: "📆", bg: "rgba(108,99,255,0.15)", label: "Schedule Meeting" },
    { icon: "💰", bg: "rgba(0,212,255,0.12)", label: "Budget Update" },
    { icon: "👥", bg: "rgba(255,170,107,0.12)", label: "Team Overview" },
  ],
  viewer: [
    { icon: "📄", bg: "rgba(108,99,255,0.15)", label: "Browse Reports" },
    { icon: "🎓", bg: "rgba(0,255,163,0.12)", label: "View Tutorials" },
    { icon: "🔔", bg: "rgba(0,212,255,0.12)", label: "Check Alerts" },
  ],
};

const ROLE_NOTIF = {
  admin: [
    {
      color: "#ff6b6b",
      msg: "<strong>Security alert:</strong> Unusual login from new IP",
      time: "5m ago",
    },
    {
      color: "#00ffa3",
      msg: "<strong>Orbit Labs</strong> upgraded to Enterprise",
      time: "12m ago",
    },
    {
      color: "#6c63ff",
      msg: "<strong>Nexus AI</strong> processed 1M records today",
      time: "1h ago",
    },
  ],
  developer: [
    {
      color: "#ff6b6b",
      msg: "<strong>Error:</strong> Build #142 failed — check logs",
      time: "8m ago",
    },
    {
      color: "#00ffa3",
      msg: "<strong>v2.4.1</strong> deployed successfully",
      time: "3m ago",
    },
    {
      color: "#00d4ff",
      msg: "<strong>Webhook</strong> /events exceeded 1K calls",
      time: "30m ago",
    },
  ],
  analyst: [
    {
      color: "#00ffa3",
      msg: "<strong>Q3 Report</strong> is ready for review",
      time: "5m ago",
    },
    {
      color: "#6c63ff",
      msg: "<strong>Goal reached:</strong> Session time +18s",
      time: "1h ago",
    },
    {
      color: "#ffaa6b",
      msg: "<strong>Export queued:</strong> funnel_oct2024.csv",
      time: "2h ago",
    },
  ],
  manager: [
    {
      color: "#ff6b6b",
      msg: "<strong>Deadline:</strong> Project Orion due in 3 days",
      time: "1h ago",
    },
    {
      color: "#00ffa3",
      msg: "<strong>Sprint 14</strong> at 84% completion — on track",
      time: "2h ago",
    },
    {
      color: "#00d4ff",
      msg: "<strong>Invoice #204</strong> approved for payment",
      time: "3h ago",
    },
  ],
  viewer: [
    {
      color: "#ff6b6b",
      msg: "<strong>Alert:</strong> 3 new items need your attention",
      time: "1h ago",
    },
    {
      color: "#00d4ff",
      msg: "<strong>New report</strong> shared: Q3 Analytics Summary",
      time: "2h ago",
    },
    {
      color: "#00ffa3",
      msg: "<strong>Tutorial:</strong> Dashboard basics unlocked",
      time: "4h ago",
    },
  ],
};

/* =============================================
   HELPERS
   ============================================= */
function initials(n) {
  return n
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

/* =============================================
   CLOCK
   ============================================= */
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("liveClock").textContent = `${h}:${m}`;
  document.getElementById("liveDate").textContent = now.toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "short",
      day: "numeric",
    },
  );
}
updateClock();
setInterval(updateClock, 10000);

/* =============================================
   POPULATE HEADER & WELCOME
   ============================================= */
const avatarText = initials(name);
document.getElementById("sidebarAvatar").textContent = avatarText;
document.getElementById("sidebarName").textContent = name;
document.getElementById("sidebarRole").textContent = role;
document.getElementById("topbarAvatar").textContent = avatarText;
document.getElementById("topbarAvatar").title = `${name} (${role})`;
document.getElementById("breadcrumbRole").textContent =
  role.charAt(0).toUpperCase() + role.slice(1) + " Dashboard";

const loginDate = loginTime ? new Date(loginTime) : new Date();
const loginTimeStr = loginDate.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
});
document.getElementById("welcomeTitle").textContent =
  `${getGreeting()}, ${name.split(" ")[0]}! 👋`;
document.getElementById("welcomeSub").textContent =
  `Signed in as ${role} · Last login at ${loginTimeStr}. Here's your workspace overview.`;

/* =============================================
   SIDEBAR NAV
   ============================================= */
const navDef = ROLE_NAV[role] || ROLE_NAV.viewer;
const navEl = document.getElementById("dbNav");
navDef.forEach((section) => {
  const sectionEl = document.createElement("div");
  sectionEl.className = "db-nav-section";
  sectionEl.innerHTML = `<div class="db-nav-label">${section.section}</div>`;
  section.items.forEach((item) => {
    const a = document.createElement("a");
    a.href = item.href;
    a.className = `db-nav-item${item.active ? " active" : ""}`;
    a.innerHTML = `
      <span class="db-nav-icon">${item.icon}</span>
      <span>${item.label}</span>
      ${item.badge ? `<span class="db-nav-badge">${item.badge}</span>` : ""}
    `;
    sectionEl.appendChild(a);
  });
  navEl.appendChild(sectionEl);
});

/* =============================================
   KPI CARDS
   ============================================= */
const kpis = ROLE_KPI[role] || ROLE_KPI.viewer;
const kpiGrid = document.getElementById("kpiGrid");
kpis.forEach((k) => {
  kpiGrid.insertAdjacentHTML(
    "beforeend",
    `
    <div class="db-kpi-card">
      <div class="db-kpi-header">
        <div class="db-kpi-icon ${k.iconBg}">${k.icon}</div>
        <span class="db-kpi-trend trend-${k.trendType}">${k.trend}</span>
      </div>
      <div class="db-kpi-value">${k.value}</div>
      <div class="db-kpi-label">${k.label}</div>
      <div class="db-kpi-sub">📅 ${k.sub}</div>
    </div>
  `,
  );
});

/* =============================================
   BAR CHART
   ============================================= */
const chartCfg = ROLE_CHART[role] || ROLE_CHART.viewer;
document.getElementById("chartTitle").textContent = chartCfg.title;
document.getElementById("chartTotal").textContent = chartCfg.total;
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxVal = Math.max(...chartCfg.values);
const barChartEl = document.getElementById("barChart");
chartCfg.values.forEach((v, i) => {
  const pct = (v / maxVal) * 100;
  barChartEl.insertAdjacentHTML(
    "beforeend",
    `
    <div class="db-bar-col" style="position:relative">
      <div class="db-bar${i === 6 ? "" : " accent"}" style="height:${pct}%"></div>
      <span class="db-bar-label">${days[i]}</span>
    </div>
  `,
  );
});

/* =============================================
   SPARKLINE SVG
   ============================================= */
const sparkVals = [20, 35, 28, 55, 40, 62, 48, 70, 58, 80, 65, 90];
const maxS = Math.max(...sparkVals);
const pts = sparkVals
  .map((v, i) => {
    const x = (i / (sparkVals.length - 1)) * 300;
    const y = 60 - (v / maxS) * 50;
    return `${x},${y}`;
  })
  .join(" ");
const svgEl = document.getElementById("sparkline");
svgEl.innerHTML = `
  <defs>
    <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(0,212,255,0.3)"/>
      <stop offset="100%" stop-color="rgba(0,212,255,0)"/>
    </linearGradient>
  </defs>
  <polygon points="${pts} 300,60 0,60" fill="url(#sparkGrad)"/>
  <polyline points="${pts}" fill="none" stroke="#00d4ff" stroke-width="2" stroke-linejoin="round"/>
`;

/* =============================================
   DONUT CHART
   ============================================= */
const donutData = ROLE_DONUT[role] || ROLE_DONUT.viewer;
document.getElementById("donutTitle").textContent = (
  ROLE_CHART[role] || ROLE_CHART.viewer
).donutTitle;
const total = donutData.reduce((s, d) => s + d.val, 0);
let offset = 0;
const R = 40,
  cx = 60,
  cy = 60,
  stroke = 18;
const circ = 2 * Math.PI * R;
let svgPaths = "";
donutData.forEach((d) => {
  const dash = (d.val / total) * circ;
  const gap = circ - dash;
  svgPaths += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${d.color}" stroke-width="${stroke}"
    stroke-dasharray="${dash} ${gap}" stroke-dashoffset="${-offset}" stroke-linecap="butt"
    transform="rotate(-90 ${cx} ${cy})" style="transition:stroke-dasharray 1s ease"/>`;
  offset += dash;
});
svgPaths += `<text x="${cx}" y="${cy + 4}" text-anchor="middle" fill="#fff" font-size="12" font-weight="800">${total}%</text>`;
document.getElementById("donutSvg").innerHTML = svgPaths;
const legendEl = document.getElementById("donutLegend");
donutData.forEach((d) => {
  legendEl.insertAdjacentHTML(
    "beforeend",
    `
    <div class="db-legend-item">
      <span class="db-legend-dot" style="background:${d.color}"></span>
      <span>${d.label}</span>
      <span class="db-legend-val">${d.val}%</span>
    </div>
  `,
  );
});

/* =============================================
   ACTIVITY FEED
   ============================================= */
const activities = ROLE_ACTIVITY[role] || ROLE_ACTIVITY.viewer;
const feedEl = document.getElementById("activityFeed");
activities.forEach((a) => {
  feedEl.insertAdjacentHTML(
    "beforeend",
    `
    <div class="db-activity-item">
      <div class="db-act-icon" style="background:${a.bg}">${a.icon}</div>
      <div class="db-act-text">${a.text}</div>
      <div class="db-act-time">${a.time}</div>
    </div>
  `,
  );
});

/* =============================================
   AI AGENTS
   ============================================= */
const agents = ROLE_AGENTS[role] || ROLE_AGENTS.viewer;
const agentEl = document.getElementById("agentList");
agents.forEach((a) => {
  agentEl.insertAdjacentHTML(
    "beforeend",
    `
    <div class="db-agent-item">
      <div class="db-agent-icon" style="background:${a.bg}">${a.icon}</div>
      <div>
        <div class="db-agent-name">${a.name}</div>
        <div class="db-agent-task">${a.task}</div>
      </div>
      <span class="db-agent-status ${a.statusClass}">${a.status}</span>
    </div>
  `,
  );
});

/* =============================================
   TASKS
   ============================================= */
const tasks = ROLE_TASKS[role] || ROLE_TASKS.viewer;
const taskEl = document.getElementById("taskList");
tasks.forEach((t) => {
  taskEl.insertAdjacentHTML(
    "beforeend",
    `
    <div class="db-task-item">
      <div class="db-task-header">
        <span class="db-task-name">${t.label}</span>
        <span class="db-task-pct">${t.pct}%</span>
      </div>
      <div class="db-progress">
        <div class="db-progress-fill ${t.cls}" style="width:${t.pct}%"></div>
      </div>
    </div>
  `,
  );
});

/* =============================================
   DATA TABLE
   ============================================= */
const tbl = ROLE_TABLE[role] || ROLE_TABLE.viewer;
document.getElementById("tableIcon").textContent = tbl.icon;
document.getElementById("tableTitle").textContent = tbl.title;
const thead = document.getElementById("tableHead");
thead.innerHTML = `<tr>${tbl.head.map((h) => `<th>${h}</th>`).join("")}</tr>`;
const tbody = document.getElementById("tableBody");
const statusMap = {
  active: "pill-active",
  pending: "pill-pending",
  inactive: "pill-inactive",
  danger: "pill-danger",
  Failed: "pill-danger",
};
tbl.rows.forEach((row) => {
  const cells = row
    .map((cell, i) => {
      if (i === 0) {
        return `<td><span class="db-table-avatar">${initials(cell)}</span>${cell}</td>`;
      }
      const cls = statusMap[cell];
      if (cls)
        return `<td><span class="db-status-pill ${cls}">${cell}</span></td>`;
      return `<td>${cell}</td>`;
    })
    .join("");
  tbody.insertAdjacentHTML("beforeend", `<tr>${cells}</tr>`);
});

/* =============================================
   QUICK ACTIONS
   ============================================= */
const qas = ROLE_QUICK[role] || ROLE_QUICK.viewer;
const qaEl = document.getElementById("quickActions");
qas.forEach((q) => {
  qaEl.insertAdjacentHTML(
    "beforeend",
    `
    <button class="db-qa-btn">
      <span class="db-qa-icon" style="background:${q.bg}">${q.icon}</span>
      ${q.label}
      <span class="db-qa-arrow">›</span>
    </button>
  `,
  );
});

/* =============================================
   NOTIFICATIONS
   ============================================= */
const notifs = ROLE_NOTIF[role] || ROLE_NOTIF.viewer;
const notifEl = document.getElementById("notifList");
document.getElementById("notifCount").textContent = `${notifs.length} new`;
notifs.forEach((n) => {
  notifEl.insertAdjacentHTML(
    "beforeend",
    `
    <div class="db-notif-item">
      <span class="db-notif-dot" style="background:${n.color};box-shadow:0 0 5px ${n.color}"></span>
      <div class="db-notif-msg">${n.msg}</div>
      <span class="db-notif-when">${n.time}</span>
    </div>
  `,
  );
});

/* =============================================
   SIDEBAR MOBILE TOGGLE
   ============================================= */
const sidebar = document.getElementById("dbSidebar");
const overlay = document.getElementById("sidebarOverlay");
const hamburger = document.getElementById("hamburgerBtn");

hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("open");
});
overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("open");
});

/* =============================================
   LOGOUT
   ============================================= */
document.getElementById("logoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem("stackly_user");
  window.location.href = "login.html";
});
