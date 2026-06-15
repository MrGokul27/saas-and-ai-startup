/* --- Header Scroll & Mobile Menu --- */
function initHeader() {
  const header = document.querySelector(".site-header");
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("nav-menu");

  if (!header) return;

  // Sticky on scroll
  const onScroll = () =>
    header.classList.toggle("scrolled", window.scrollY > 30);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Hamburger toggles mobile drawer
  hamburger?.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Close drawer on outside click
  document.addEventListener("click", (e) => {
    if (
      mobileNav?.classList.contains("open") &&
      !mobileNav.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      mobileNav.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  // Mobile dropdown toggles
  mobileNav?.querySelectorAll(".has-dropdown > .nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      link.closest(".has-dropdown").classList.toggle("open");
    });
  });

  // Close drawer when any nav link is clicked
  mobileNav
    ?.querySelectorAll("a:not(.has-dropdown > .nav-link)")
    .forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
}

function markActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href")?.split("/").pop();
    link.classList.toggle("active", href === path);
  });
}

/* --- Smooth Scroll for anchor links --- */
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute("href");
  if (id === "#") return;
  const target = document.querySelector(id);
  if (target) {
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    // close mobile menu
    document.getElementById("nav-menu")?.classList.remove("open");
    document.body.style.overflow = "";
  }
});

/* --- Scroll Reveal --- */
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document
    .querySelectorAll(".reveal, .reveal-left, .reveal-right")
    .forEach((el, i) => {
      el.style.transitionDelay = `${(i % 6) * 0.08}s`;
      observer.observe(el);
    });
}

/* --- Counter Animation --- */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const duration = 2000;
  const start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent =
      target % 1 !== 0
        ? current.toFixed(1)
        : Math.floor(current).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
    else
      el.textContent =
        target % 1 !== 0 ? target.toFixed(1) : target.toLocaleString();
  };
  requestAnimationFrame(tick);
}

function initCounters() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  document
    .querySelectorAll("[data-target]")
    .forEach((el) => observer.observe(el));
}

/* --- FAQ Accordion --- */
function initFAQ() {
  document.querySelectorAll(".faq-q").forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.closest(".faq-item");
      const isOpen = item.classList.contains("open");
      document
        .querySelectorAll(".faq-item.open")
        .forEach((i) => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });
}

/* --- Pricing Toggle --- */
function initPricingToggle() {
  const toggle = document.getElementById("pricing-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    const isYearly = toggle.classList.contains("active");

    document.querySelectorAll(".plan-amount").forEach((el) => {
      const monthly = parseFloat(el.dataset.monthly);
      const yearly = Math.round(monthly * 0.75);
      el.textContent = isYearly ? yearly : monthly;
    });
    document.querySelectorAll(".plan-period").forEach((el) => {
      el.textContent = isYearly ? "/month, billed yearly" : "/month";
    });
    document
      .querySelector(".toggle-yearly-label")
      ?.classList.toggle("active-label", isYearly);
    document
      .querySelector(".toggle-monthly-label")
      ?.classList.toggle("active-label", !isYearly);
  });
}

/* --- Scroll To Top --- */
function initScrollTop() {
  const btn = document.getElementById("scroll-top-btn");
  if (!btn) return;
  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("visible", window.scrollY > 400);
    },
    { passive: true },
  );
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
}

/* --- Footer Form --- */
function initFooterForm() {
  const form = document.getElementById("footer-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "404.html";
  });
}

/* --- Contact Form --- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("contactName");

  nameInput?.addEventListener("input", () => {
    nameInput.value = nameInput.value.replace(/[^a-zA-Z\s]/g, "");
  });

  nameInput?.addEventListener("keydown", (e) => {
    if (/[0-9]/.test(e.key) && e.key.length === 1) {
      e.preventDefault();
    }
    if (/[^a-zA-Z\s]/.test(e.key) && e.key.length === 1) {
      e.preventDefault();
    }
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "404.html";
  });
}

/* --- Typed Hero Text Effect --- */
function initTyped() {
  const el = document.getElementById("typed-text");
  if (!el) return;
  const words = ["Automation", "Intelligence", "Innovation", "Efficiency"];
  let wordIdx = 0,
    charIdx = 0,
    deleting = false;

  const type = () => {
    const word = words[wordIdx];
    if (!deleting) {
      el.textContent = word.slice(0, ++charIdx);
      if (charIdx === word.length) {
        deleting = true;
        return setTimeout(type, 2000);
      }
    } else {
      el.textContent = word.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 60 : 110);
  };
  type();
}

/* --- Load Common HTML Components --- */
async function loadCommonHTML(selector, url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();
    document.getElementById(selector).innerHTML = html;
  } catch (error) {
    console.error(`Failed to load ${url}:`, error);
  }
}

/* --- Page Loader (home only) --- */
(function initLoader() {
  const loader = document.getElementById("page-loader");
  if (!loader) return;

  const statusEl = document.getElementById("ld-status-text");
  const progressEl = document.getElementById("ld-progress");

  const steps = [
    { text: "Booting AI core", pct: 18 },
    { text: "Connecting neural layers", pct: 42 },
    { text: "Loading language models", pct: 65 },
    { text: "Initializing agents", pct: 85 },
    { text: "Deploying workflows", pct: 96 },
  ];

  let i = 0;
  const tick = () => {
    if (i >= steps.length) return;
    const s = steps[i++];
    statusEl.style.opacity = "0";
    setTimeout(() => {
      statusEl.textContent = s.text;
      statusEl.style.opacity = "1";
      progressEl.style.width = s.pct + "%";
    }, 200);
  };
  tick();
  const interval = setInterval(tick, 430);

  const dismiss = () => {
    clearInterval(interval);
    progressEl.style.width = "100%";
    statusEl.style.opacity = "0";
    setTimeout(() => {
      statusEl.textContent = "Ready";
      statusEl.style.opacity = "1";
    }, 200);
    setTimeout(() => loader.classList.add("loader-hidden"), 380);
  };

  const maxTimer = setTimeout(dismiss, 1500);
  window.addEventListener(
    "load",
    () => {
      clearTimeout(maxTimer);
      setTimeout(dismiss, 1500);
    },
    { once: true },
  );
})();

/* --- Init All --- */
document.addEventListener("DOMContentLoaded", () => {
  // Load header and footer first, then initialize scripts that depend on them
  Promise.all([
    loadCommonHTML("header-placeholder", "pages/components/common/header.html"),
    loadCommonHTML("footer-placeholder", "pages/components/common/footer.html"),
  ]).then(() => {
    initHeader(); // Initialize header functionality after it's loaded
    markActiveNav(); // Mark active nav link after header is loaded
    initReveal();
    initCounters();
    initFAQ();
    initPricingToggle();
    initScrollTop();
    initTyped();
    initFooterForm();
    initContactForm();
  });
});
