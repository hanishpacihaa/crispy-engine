/* Coffee Make Cozy — scroll-driven coffee story (GSAP + ScrollTrigger)
   Scene 01: falling beans, logo reveal, headline, cinematic zoom
   Scene 02: espresso photo masks down into a glass; ice, milk and espresso fill it
   Scene 03: the signature cup rises, turns and settles; product details stagger in
   Without GSAP, or when the visitor prefers reduced motion, the scenes stay as a simple stacked layout. */
(() => {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!window.gsap || !window.ScrollTrigger || reduce) return;
  gsap.registerPlugin(ScrollTrigger);

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const stage = $("#story-stage");
  const header = $(".header");
  const isMobile = () => window.innerWidth <= 960;

  const setHdr = () => root.style.setProperty("--hdr", header.offsetHeight + "px");
  setHdr();
  root.classList.add("story-on");

  /* ---------- Scene 01: falling beans (continuous, not scroll-linked) ---------- */
  const beanWrap = $("#s1-beans");
  const beanCount = window.innerWidth < 700 ? 9 : 16;
  const beanSrcs = [1, 2, 3, 4, 5, 6].map((n) => `assets/img/bean-${n}.webp`);
  for (let i = 0; i < beanCount; i++) {
    const img = new Image();
    img.src = beanSrcs[i % beanSrcs.length];
    img.alt = "";
    const depth = gsap.utils.random(0.35, 1);            // 1 = close to camera
    img.style.width = Math.round(28 + depth * 62) + "px";
    img.style.filter = depth < 0.55 ? `blur(${(0.55 - depth) * 6}px) brightness(.8)` : "none";
    img.style.zIndex = Math.round(depth * 10);
    beanWrap.appendChild(img);
    const fall = () => {
      const h = beanWrap.clientHeight, w = beanWrap.clientWidth;
      gsap.fromTo(img,
        { x: gsap.utils.random(0, w), y: -140, rotation: gsap.utils.random(0, 360) },
        {
          y: h + 140,
          x: `+=${gsap.utils.random(-60, 60)}`,
          rotation: `+=${gsap.utils.random(-260, 260)}`,
          duration: gsap.utils.random(2.4, 3.6) / (0.6 + depth * 0.5),
          ease: "power1.in",                              // gravity: speeds up as it falls
          delay: gsap.utils.random(0, 1.6),
          onComplete: fall,
        });
    };
    gsap.delayedCall(i * 0.18, fall);
  }

  /* ---------- Scene 01: intro reveal (on load) ---------- */
  gsap.set("#scene-2, #scene-3", { autoAlpha: 0 });
  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  intro
    .from(".s1-bg img", { scale: 1.15, duration: 2.2, ease: "power2.out" }, 0)
    .fromTo(".s1-logo", { clipPath: "inset(0 50% 0 50%)", autoAlpha: 0 }, { clipPath: "inset(0 0% 0 0%)", autoAlpha: 1, duration: 1.3, ease: "power2.inOut" }, 0.3)
    .from(".scene-1 .scene-tag", { autoAlpha: 0, y: 12, duration: 0.8 }, 0.9)
    .from(".s1-title .line > span", { yPercent: 110, duration: 1.1, stagger: 0.14 }, 1.0)
    .from(".s1-cue", { autoAlpha: 0, duration: 0.8 }, 1.8);

  /* ---------- Scene 02 + 03 setup ---------- */
  const fill = $(".glass-fill");
  gsap.set(fill, { "--fill": 0 });
  gsap.set(".s2-text, .s2-steps, .s2-glass, .ice, .s2-pour, .s3-item", { autoAlpha: 0 });
  gsap.set(".ice-wrap", { autoAlpha: 1 });
  gsap.set(".s2-t1 .line > span, .s2-t2 .line > span", { yPercent: 110 });
  gsap.set("#s3-cup", { xPercent: -50, yPercent: -50, autoAlpha: 0 });

  // Where the glass sits inside scene 2, as a % of the stage: the espresso photo shrinks into this point.
  const glassPoint = () => {
    const s = stage.getBoundingClientRect(), g = $("#s2-glass").getBoundingClientRect();
    const cx = ((g.left + g.width / 2 - s.left) / s.width) * 100;
    const cy = ((g.top + g.height * 0.55 - s.top) / s.height) * 100;
    return { cx: cx.toFixed(2), cy: cy.toFixed(2) };
  };
  // Cup's resting place in scene 3
  const cupRest = () => {
    if (isMobile()) return { x: 0, y: -stage.clientHeight * 0.27, scale: 0.62 };
    const s = stage.getBoundingClientRect(), grid = $(".s3-grid").getBoundingClientRect();
    return { x: grid.left - s.left + grid.width * 0.76 - s.width / 2, y: 0, scale: 1.05 };
  };

  /* ---------- Master scroll timeline ----------
     Every step uses fromTo with immediateRender:false, so scrubbing backwards and
     ScrollTrigger refreshes always land on exact values. */
  const tl = gsap.timeline({ defaults: { ease: "none", immediateRender: false } });
  const FT = (target, from, to, at) => tl.fromTo(target, from, to, at);

  // Scene 01 -> cinematic zoom
  tl.to({}, { duration: 0.6 }, 0);
  FT(".s1-content", { scale: 1, autoAlpha: 1 }, { scale: 2.6, autoAlpha: 0, duration: 1.2, ease: "power2.in" }, 0.6);
  FT(".s1-bg img", { scale: 1 }, { scale: 2, duration: 1.4, ease: "power1.in" }, 0.6);
  FT(".s1-beans", { autoAlpha: 1, scale: 1 }, { autoAlpha: 0, scale: 1.6, duration: 0.9 }, 0.8);
  FT("#scene-2", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 1.4);
  FT("#s2-photo", { scale: 1.45, autoAlpha: 1, clipPath: "circle(100% at 50% 50%)" }, { scale: 1, duration: 0.9, ease: "power2.out" }, 1.4);
  FT("#scene-1", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.2 }, 1.9);

  // Scene 02 — the espresso photo masks down into the glass
  FT(".s2-glass", { autoAlpha: 0, scale: 1, yPercent: 0 }, { autoAlpha: 1, duration: 0.3 }, 2.6);
  FT("#s2-photo", { clipPath: "circle(100% at 50% 50%)" }, {
    clipPath: () => { const p = glassPoint(); return `circle(0% at ${p.cx}% ${p.cy}%)`; },
    duration: 0.9, ease: "power2.inOut",
  }, 2.7);
  FT("#s2-photo", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.35 }, 3.25);
  FT(".s2-text, .s2-steps", { autoAlpha: 0, y: 0 }, { autoAlpha: 1, duration: 0.4 }, 3.2);
  FT(".s2-t1 .line > span", { yPercent: 110 }, { yPercent: 0, stagger: 0.12, duration: 0.5, ease: "power3.out" }, 3.2);
  // 01 ICE — cubes drop one by one into the empty cup and stack up inside it
  const cubeRot = [-14, 20, 6, -24, 28, -8, 16];
  gsap.utils.toArray(".ice-box .ice").forEach((cube, i) => {
    const at = 3.55 + i * 0.09;
    const flip = i === 4 ? -1 : 1;
    FT(cube, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.02 }, at);
    FT(cube, { yPercent: -850, rotation: cubeRot[i] + (i % 2 ? 140 : -120), scaleX: flip },
      { yPercent: 0, rotation: cubeRot[i], scaleX: flip, duration: 0.3, ease: "power2.in" }, at);
    FT(cube, { yPercent: 0 }, { yPercent: -7, duration: 0.05, ease: "power1.out", yoyo: true, repeat: 1 }, at + 0.3);  // small settle
  });
  // 02 MILK — rises around the ice
  tl.set(fill, { "--fill": 0 }, 2.5);   // cup starts empty (also when scrolling back up)
  FT(fill, { "--fill": 0 }, { "--fill": 0.5, duration: 0.6, ease: "power1.inOut" }, 4.4);
  FT(".ice-wrap", { autoAlpha: 1 }, { autoAlpha: 0.55, duration: 0.6 }, 4.4);   // cubes sink into the milk
  // 03 ESPRESSO — carafe tilts in and pours over the top
  FT(".s2-pour", { autoAlpha: 0, xPercent: 14, yPercent: -22, rotation: 8, clipPath: "inset(0% 0% 64% 0%)" },
    { autoAlpha: 1, xPercent: 0, yPercent: 0, rotation: 0, duration: 0.3, ease: "power2.out" }, 5.0);
  FT(".s2-pour", { clipPath: "inset(0% 0% 64% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.35, ease: "power1.in" }, 5.25);
  FT(fill, { "--fill": 0.5 }, { "--fill": 1, duration: 0.85, ease: "power1.inOut" }, 5.45);
  FT(".ice-wrap", { autoAlpha: 0.55 }, { autoAlpha: 0, duration: 0.4 }, 5.9);    // the finished drink shows its own ice
  FT(".s2-pour", { autoAlpha: 1, xPercent: 0, yPercent: 0, rotation: 0 }, { autoAlpha: 0, xPercent: 14, yPercent: -22, rotation: 8, duration: 0.3, ease: "power2.in" }, 6.3);
  // message swap
  FT(".s2-t1 .line > span", { yPercent: 0 }, { yPercent: -110, stagger: 0.08, duration: 0.4, ease: "power2.in" }, 6.55);
  FT(".s2-t2 .line > span", { yPercent: 110 }, { yPercent: 0, stagger: 0.12, duration: 0.5, ease: "power3.out" }, 6.8);

  // Scene 03 — the glass becomes the finished signature drink
  FT(".s2-glass", { scale: 1, yPercent: 0, autoAlpha: 1 }, { scale: 0.7, yPercent: -12, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, 7.5);
  FT(".s2-text, .s2-steps", { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -30, duration: 0.5 }, 7.5);
  FT("#scene-3", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 7.7);
  FT("#s3-cup", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 7.8);
  FT("#s3-cup", { x: 0, y: () => stage.clientHeight * 0.75, rotation: -22, scale: 0.5 },
    { y: 0, rotation: 8, scale: 1.15, duration: 1.0, ease: "power2.out" }, 7.8);
  FT("#s3-cup", { x: 0, y: 0, rotation: 8, scale: 1.15 }, {
    x: () => cupRest().x, y: () => cupRest().y, scale: () => cupRest().scale, rotation: 0,
    duration: 0.8, ease: "power2.inOut",
  }, 8.8);
  FT(".s3-item", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, stagger: 0.16, duration: 0.5, ease: "power3.out" }, 9.1);
  tl.to({}, { duration: 1.2 }, 10.2);

  // Highlight ingredient steps as the glass fills
  const steps = { ice: $('[data-step="ice"]'), milk: $('[data-step="milk"]'), espresso: $('[data-step="espresso"]') };
  // Scene 3 buttons are only focusable once they are visible
  const s3Btns = $$(".scene-3 a, .scene-3 button");
  let s3On = null;
  const syncSteps = () => {
    const t = tl.time();
    const on = t > 9.1;
    if (on !== s3On) { s3On = on; s3Btns.forEach((b) => { b.tabIndex = on ? 0 : -1; }); }
    steps.ice.classList.toggle("on", t >= 3.55 && t < 7.5);
    steps.milk.classList.toggle("on", t >= 4.4 && t < 7.5);
    steps.espresso.classList.toggle("on", t >= 5.0 && t < 7.5);
  };

  ScrollTrigger.create({
    trigger: stage,
    start: () => `top ${header.offsetHeight}px`,
    end: () => "+=" + window.innerHeight * (isMobile() ? 4.2 : 5),
    pin: true,
    scrub: 0.6,
    animation: tl,
    invalidateOnRefresh: true,
    onUpdate: syncSteps,
  });

  ScrollTrigger.addEventListener("refreshInit", setHdr);

  window.addEventListener("load", () => ScrollTrigger.refresh());
  if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
