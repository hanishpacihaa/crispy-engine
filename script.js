// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Header shadow on scroll
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("nav-menu");
toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
menu.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  })
);

// Animated counters
function animateCount(el) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const duration = 1200;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Scroll reveal + counters
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        entry.target.querySelectorAll("[data-count]").forEach(animateCount);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
  document.querySelectorAll("[data-count]").forEach((el) => {
    el.textContent = el.dataset.count + (el.dataset.suffix || "");
  });
}

// Contact form (front-end validation only — see README to connect a real form service)
const form = document.getElementById("contact-form");
const statusEl = form.querySelector(".form-status");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll("input, textarea").forEach((field) => {
    const ok = field.checkValidity() && field.value.trim() !== "";
    field.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    statusEl.textContent = "Please fill in all fields with a valid email.";
    return;
  }
  statusEl.textContent = "Thanks! We'll be in touch soon.";
  form.reset();
});
