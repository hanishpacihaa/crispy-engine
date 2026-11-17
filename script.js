/* Coffee Make Cozy — shared layout, menu, cart, WhatsApp checkout, feedback, EN/AR */
(() => {
  "use strict";

  /* ---------- Settings (edit here) ---------- */
  const WHATSAPP = "601129186169";           // +60 11-2918 6169
  const PHONE_DISPLAY = "+60 11-2918 6169";
  const EMAIL = "coffeemakecozy@gmail.com";
  const SOCIAL = {
    instagram: "https://www.instagram.com/coffeemakecozy",
    tiktok: "https://www.tiktok.com/@coffeemakecozy",
    threads: "https://www.threads.com/@coffeemakecozy",
  };
  const MAPS = "https://www.google.com/maps/search/?api=1&query=Mahallah+Zaid+bin+Harithah+Pagoh+Johor";
  const OPEN_MIN = 11 * 60;                  // 11:00
  const CLOSE_MIN = 21 * 60;                 // 21:00
  const LAST_ORDER_MIN = 20 * 60 + 30;       // 20:30
  const SLOT_STEP = 30;                      // minutes between time slots
  const PREP_MIN = 20;                       // earliest slot from now
  const FREE_ITEM = "buttercreme";           // Buy 3 promo reward
  const PROMO_EVERY = 3;

  const DRINKS = [
    { id: "buttercreme", name: "Iced Buttercreme Latte", price: 6, img: "assets/img/buttercreme-cup.jpg", signature: true,
      desc: { en: "Espresso and cold milk under a thick, buttery cream top.", ar: "إسبريسو وحليب بارد تعلوهما طبقة كثيفة من كريمة الزبدة." } },
    { id: "caramel", name: "Iced Caramel Latte", price: 7, img: "assets/img/caramel-latte.jpg",
      desc: { en: "Espresso, milk and rich caramel over ice.", ar: "إسبريسو وحليب وكراميل غني فوق الثلج." } },
    { id: "spanish", name: "Iced Spanish Latte", price: 7, img: "assets/img/spanish-latte.jpg",
      desc: { en: "Espresso with sweetened condensed milk. Sweet and smooth.", ar: "إسبريسو مع الحليب المكثّف المحلّى. حلوٌ وناعم." } },
    { id: "honey-cinnamon", name: "Iced Honey Cinnamon Latte", price: 10, img: "assets/img/honey-cinnamon-latte.jpg",
      desc: { en: "A honey drizzle and a dusting of cinnamon on soft foam.", ar: "رشّة من العسل وقليل من القرفة فوق رغوة ناعمة." } },
    { id: "dirty", name: "Iced Dirty Latte", price: 10, img: "assets/img/dirty-latte.jpg",
      desc: { en: "A hot espresso shot poured over cold milk. Bold and layered.", ar: "جرعة إسبريسو ساخنة تُسكب فوق حليب بارد. نكهة قوية وطبقات واضحة." } },
  ];

  const ADDONS = [
    { id: "shot", price: 4, name: { en: "Extra shot", ar: "جرعة إسبريسو إضافية" } },
    { id: "oat", price: 3, name: { en: "Oat milk", ar: "حليب الشوفان" } },
    { id: "syrup", price: 2, name: { en: "Syrup", ar: "شراب منكّه" } },
  ];

  const MODES = {
    pickup: { fee: 0, label: "Pickup at Mahallah Zaid bin Harithah" },
    d1: { fee: 1, label: "Delivery around Mahallah Zaid bin Harithah" },
    d3: { fee: 3, label: "Delivery within 3 km" },
  };

  const T = window.CMC_I18N;
  const LANGS = ["en", "ar"];

  /* ---------- Helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rm = (n) => "RM" + (Number.isInteger(n) ? n : n.toFixed(2));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } },
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  let lang = store.get("cmc-lang", (navigator.language || "").toLowerCase().startsWith("ar") ? "ar" : "en");
  if (!LANGS.includes(lang)) lang = "en";
  const t = (k) => T[lang][k] ?? T.en[k] ?? k;
  const en = (k) => T.en[k];
  const page = document.body.dataset.page || "home";

  // Malaysia time, whatever the visitor's device timezone
  function klNow() {
    const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kuala_Lumpur", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
    return +parts.find((p) => p.type === "hour").value * 60 + +parts.find((p) => p.type === "minute").value;
  }
  function fmtTime(min, L = lang) {
    const h = Math.floor(min / 60), m = min % 60, h12 = ((h + 11) % 12) + 1;
    const suf = T[L][h < 12 ? "am" : "pm"];
    return `${h12}:${String(m).padStart(2, "0")}${L === "ar" ? " " : ""}${suf}`;
  }

  /* ---------- Icons ---------- */
  const ICON = {
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm5.3-4a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.6 2c.4 2.3 1.9 3.9 4.4 4.1v3.2c-1.6.1-3-.4-4.4-1.3v6.2c0 4-3.3 6.8-7 6.2-2.9-.5-5-3.1-4.8-6.1.3-3.4 3.5-5.9 6.9-5.2v3.4c-1.5-.4-3.3.5-3.6 2.1-.3 1.5.8 3 2.4 3 1.6.1 2.8-1.1 2.8-2.7V2h3.3z"/></svg>',
    threads: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.2 22C6.3 22 3 18.4 3 12S6.3 2 12.2 2c4.6 0 7.7 2.3 8.8 6.3l-2.3.6c-.8-2.9-3-4.5-6.5-4.5-4.4 0-6.8 2.7-6.8 7.6s2.4 7.6 6.8 7.6c3 0 5.4-1.4 5.4-3.6 0-1.2-.6-2.1-1.7-2.6-.3 2.6-1.9 4.1-4.4 4.1-2.3 0-3.9-1.4-3.9-3.4 0-2.2 1.9-3.6 4.8-3.6.6 0 1.2 0 1.7.1-.2-1.4-1-2.1-2.5-2.1-1.1 0-1.9.4-2.4 1.2l-1.9-1.2c.9-1.4 2.4-2.1 4.3-2.1 3 0 4.6 1.8 4.8 5 2.1.9 3.3 2.6 3.3 4.7 0 3.6-3.5 5.9-7.8 5.9zm-.4-8.6c-1.6 0-2.5.6-2.5 1.5 0 .8.7 1.3 1.7 1.3 1.4 0 2.2-.9 2.4-2.7-.5-.1-1-.1-1.6-.1z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>',
    cup: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10l-1 3H8L7 4zm-1 5h12l-1.4 10.2A2 2 0 0 1 14.6 21H9.4a2 2 0 0 1-2-1.8L6 9z"/></svg>',
  };
  const socials = (cls) => `<nav class="social ${cls}" aria-label="Social">
      <a href="${SOCIAL.instagram}" target="_blank" rel="noopener" aria-label="Instagram @coffeemakecozy">${ICON.instagram}</a>
      <a href="${SOCIAL.tiktok}" target="_blank" rel="noopener" aria-label="TikTok @coffeemakecozy">${ICON.tiktok}</a>
      <a href="${SOCIAL.threads}" target="_blank" rel="noopener" aria-label="Threads @coffeemakecozy">${ICON.threads}</a>
    </nav>`;

  /* ---------- Shared layout (header, footer, cart, dialogs) ---------- */
  const NAV = [
    ["menu", "menu.html", "nav.menu"], ["promo", "promo.html", "nav.promo"], ["how", "how-to-order.html", "nav.how"],
    ["story", "our-story.html", "nav.story"], ["find", "find-us.html", "nav.find"],
  ];
  function renderLayout() {
    const top = $("#site-top"), bottom = $("#site-bottom");
    if (top) top.outerHTML = `
  <a class="skip-link" href="#main" data-i18n="skip">Skip to content</a>
  <div class="topbar">
    <div class="wrap topbar-inner">
      <p class="status" id="open-status"><span class="status-dot"></span><span id="open-status-text">Open daily, 11am to 9pm</span></p>
      <div class="topbar-right">
        ${socials("social-sm")}
        <div class="lang" role="group" data-i18n-aria="lang.label" aria-label="Language">
          <button type="button" data-lang="en" lang="en" aria-pressed="true">EN</button>
          <button type="button" data-lang="ar" lang="ar" aria-pressed="false">عربي</button>
        </div>
      </div>
    </div>
  </div>
  <header class="header">
    <div class="wrap header-inner">
      <a href="index.html" class="brand" aria-label="Coffee Make Cozy"><img src="assets/img/mark-green.png" alt="" width="96" height="42"></a>
      <nav class="nav" id="nav" aria-label="Main">
        ${NAV.map(([id, href, key]) => `<a href="${href}" data-i18n="${key}"${id === page ? ' aria-current="page"' : ""}>${esc(en(key))}</a>`).join("")}
      </nav>
      <div class="header-actions">
        <button type="button" class="cart-btn" id="cart-open" aria-haspopup="dialog">${ICON.cup}<span data-i18n="cart.button">Your order</span><span class="cart-count" id="cart-count" aria-live="polite">0</span></button>
        <button type="button" class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="nav"><span class="sr-only" data-i18n="nav.toggle">Open menu</span><span></span><span></span></button>
      </div>
    </div>
  </header>`;

    if (bottom) bottom.outerHTML = `
  <footer class="footer">
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="assets/img/logo-cream.png" alt="Coffee Make Cozy" width="808" height="416" loading="lazy">
          <p data-i18n="footer.tagline">${esc(en("footer.tagline"))}</p>
          <h3 data-i18n="footer.follow">Follow us</h3>
          ${socials("social-lg")}
          <p class="handle" dir="ltr">@coffeemakecozy</p>
        </div>
        <div>
          <h3 data-i18n="footer.explore">Explore</h3>
          <ul>
            <li><a href="index.html" data-i18n="nav.home">Home</a></li>
            ${NAV.map(([, href, key]) => `<li><a href="${href}" data-i18n="${key}">${esc(en(key))}</a></li>`).join("")}
          </ul>
        </div>
        <div>
          <h3 data-i18n="footer.care">Customer care</h3>
          <ul>
            <li><a href="feedback.html" class="footer-strong" data-i18n="footer.feedback">Feedback form</a></li>
            <li><a href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener" data-i18n="footer.wa">WhatsApp us</a></li>
            <li><a href="mailto:${EMAIL}" data-i18n="footer.email">Email us</a></li>
            <li><a href="privacy.html" data-i18n="footer.privacy">Privacy policy</a></li>
          </ul>
        </div>
        <div>
          <h3 data-i18n="footer.visit">Visit us</h3>
          <ul class="footer-contact">
            <li><a href="${MAPS}" target="_blank" rel="noopener" data-i18n="addr">${esc(en("addr"))}</a></li>
            <li data-i18n="footer.hours">${esc(en("footer.hours"))}</li>
            <li><a href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener" dir="ltr">${PHONE_DISPLAY}</a></li>
            <li><a href="mailto:${EMAIL}" dir="ltr">${EMAIL}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-row">
        <p><bdi dir="ltr">© <span id="year"></span> Coffee Make Cozy.</bdi> <span data-i18n="footer.rights">All rights reserved.</span></p>
        <a href="privacy.html" data-i18n="footer.privacy">Privacy policy</a>
      </div>
    </div>
  </footer>

  <button type="button" class="fab" id="fab" hidden><span data-i18n="cart.view">View order</span><span class="fab-total" id="fab-total">RM0</span></button>

  <dialog class="sheet" id="item-dialog" aria-labelledby="item-title">
    <form method="dialog" class="sheet-body" id="item-form">
      <div class="sheet-head">
        <h2 id="item-title" dir="ltr">Drink</h2>
        <button type="button" class="icon-btn" data-close data-i18n-aria="close" aria-label="Close">×</button>
      </div>
      <p class="item-desc" id="item-desc"></p>
      <fieldset class="opts"><legend data-i18n="item.addons">Add-ons (optional)</legend><div id="item-addons"></div></fieldset>
      <div class="qty-row">
        <span data-i18n="item.qty">Quantity</span>
        <div class="qty"><button type="button" data-step="-1" aria-label="−">−</button><output id="item-qty">1</output><button type="button" data-step="1" aria-label="+">+</button></div>
      </div>
      <button type="submit" class="btn btn-primary btn-block" id="item-submit">Add to order</button>
    </form>
  </dialog>

  <dialog class="drawer" id="cart" aria-labelledby="cart-title">
    <div class="drawer-body">
      <div class="sheet-head">
        <h2 id="cart-title" data-i18n="cart.title">Your order</h2>
        <button type="button" class="icon-btn" data-close data-i18n-aria="close" aria-label="Close">×</button>
      </div>
      <div id="cart-empty" class="cart-empty">
        <p data-i18n="cart.empty">Your order is empty.</p>
        <a href="menu.html" class="btn btn-primary" data-i18n="cart.browse">Browse the menu</a>
      </div>
      <form id="checkout" novalidate>
        <ul class="cart-lines" id="cart-lines"></ul>
        <p class="promo-hint" id="promo-hint"></p>
        <fieldset class="opts">
          <legend data-i18n="co.how">Pickup or delivery</legend>
          <label class="choice"><input type="radio" name="mode" value="pickup" checked> <span><strong data-i18n="co.pickup">Pickup</strong><small data-i18n="addr">Mahallah Zaid bin Harithah</small></span><em>RM0</em></label>
          <label class="choice"><input type="radio" name="mode" value="d1"> <span><strong data-i18n="co.d1">Delivery around the mahallah</strong><small data-i18n="co.d1s">Around Mahallah Zaid bin Harithah</small></span><em>RM1</em></label>
          <label class="choice"><input type="radio" name="mode" value="d3"> <span><strong data-i18n="co.d3">Delivery within 3 km</strong><small data-i18n="co.d3s">Further? Ask us on WhatsApp first</small></span><em>RM3</em></label>
        </fieldset>
        <fieldset class="opts">
          <legend data-i18n="co.when">When</legend>
          <div class="field-row">
            <label><span data-i18n="co.day">Day</span><select name="day" id="day"></select></label>
            <label><span data-i18n="co.time">Time</span><select name="time" id="time"></select></label>
          </div>
        </fieldset>
        <fieldset class="opts">
          <legend data-i18n="co.details">Your details</legend>
          <label><span data-i18n="co.name">Name</span><input name="name" required autocomplete="name"></label>
          <label><span data-i18n="co.phone">Phone number</span><input name="phone" type="tel" required autocomplete="tel" inputmode="tel" dir="ltr" placeholder="01X-XXX XXXX"></label>
          <label id="address-field" hidden><span data-i18n="co.address">Delivery address</span><textarea name="address" rows="2" autocomplete="street-address"></textarea></label>
          <label><span data-i18n="co.notes">Notes (optional)</span><input name="notes" data-i18n-placeholder="co.notesPh" placeholder="Less ice, less sweet…"></label>
        </fieldset>
        <fieldset class="opts">
          <legend data-i18n="co.payment">Payment</legend>
          <label class="choice"><input type="radio" name="pay" value="cash" checked> <span><strong data-i18n="co.cash">Cash</strong><small data-i18n="co.cashS">Pay when you collect or when we deliver</small></span></label>
          <label class="choice"><input type="radio" name="pay" value="duitnow"> <span><strong>DuitNow QR</strong><small data-i18n="co.duitnowS">Scan with any banking or e-wallet app</small></span></label>
        </fieldset>
        <div class="pay-box" id="duitnow-box" hidden>
          <img class="qr" id="duitnow-qr" src="assets/img/duitnow-qr.png" alt="Coffee Make Cozy DuitNow QR code" width="220" height="220" loading="lazy">
          <a class="qr-save" id="duitnow-save" href="assets/img/duitnow-qr.png" download="CMC-DuitNow-QR.png" data-i18n="co.qrSave">Save QR to your phone</a>
          <p data-i18n="co.duitnowNote">Pay the total after we confirm your order on WhatsApp.</p>
          <p class="qr-missing" id="duitnow-missing" hidden data-i18n="co.duitnowMissing">We'll send our DuitNow QR on WhatsApp.</p>
        </div>
        <dl class="totals">
          <div><dt data-i18n="co.subtotal">Drinks</dt><dd id="t-sub">RM0</dd></div>
          <div><dt data-i18n="co.fee">Delivery</dt><dd id="t-fee">RM0</dd></div>
          <div class="grand"><dt data-i18n="co.total">Total</dt><dd id="t-total">RM0</dd></div>
        </dl>
        <p class="form-error" id="form-error" role="alert"></p>
        <button type="submit" class="btn btn-wa btn-block">${ICON.whatsapp}<span data-i18n="co.send">Send order on WhatsApp</span></button>
        <p class="send-note"><span data-i18n="co.sendNote">Your order isn't confirmed until we reply on WhatsApp.</span> <span data-i18n="co.langNote"></span></p>
      </form>
    </div>
  </dialog>

  <div class="toast" id="toast" role="status" aria-live="polite"></div>`;
  }
  renderLayout();

  /* ---------- Language ---------- */
  function applyLang() {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    const titleKey = document.body.dataset.title;
    if (titleKey) document.title = t(titleKey);
    $$("[data-i18n]").forEach((el) => { const v = t(el.dataset.i18n); if (typeof v === "string") el.textContent = v; });
    $$("[data-i18n-placeholder]").forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    $$("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    renderMenu();
    updateStatus();
    buildTimes();
    renderCart();
    document.dispatchEvent(new CustomEvent("cmc:lang", { detail: lang }));
  }
  $$(".lang button").forEach((b) => b.addEventListener("click", () => { lang = b.dataset.lang; store.set("cmc-lang", lang); applyLang(); }));

  /* ---------- Open status ---------- */
  function updateStatus() {
    const now = klNow();
    const el = $("#open-status"), txt = $("#open-status-text");
    el.classList.toggle("is-open", now >= OPEN_MIN && now <= LAST_ORDER_MIN);
    txt.textContent = now < OPEN_MIN ? t("closedEarly") : now <= LAST_ORDER_MIN ? t("openNow") : now < CLOSE_MIN ? t("lastOrderPassed") : t("closedLate");
  }

  /* ---------- Menu (menu page) ---------- */
  function renderMenu() {
    const list = $("#menu-list");
    if (list) list.innerHTML = DRINKS.map((d) => `
      <li class="menu-item">
        <div class="menu-thumb"><img src="${d.img}" alt="" loading="lazy"></div>
        <div>
          <h3><span dir="ltr">${esc(d.name)}</span>${d.signature ? ` <span class="badge">${esc(t("menu.best"))}</span>` : ""}</h3>
          <p>${esc(d.desc[lang])}</p>
        </div>
        <span class="menu-price">${rm(d.price)}</span>
        <button type="button" class="add-btn" data-add="${d.id}" aria-label="${esc(t("menu.add"))}: ${esc(d.name)}">${esc(t("menu.add"))}</button>
      </li>`).join("");
    const addons = $("#addon-list");
    if (addons) addons.innerHTML = ADDONS.map((a) => `<li>${esc(a.name[lang])}<b dir="ltr">+${rm(a.price)}</b></li>`).join("");
  }

  /* ---------- Item dialog ---------- */
  const itemDialog = $("#item-dialog");
  let current = null, qty = 1;
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    current = DRINKS.find((d) => d.id === btn.dataset.add);
    qty = 1;
    $("#item-title").textContent = current.name;
    $("#item-desc").textContent = current.desc[lang];
    $("#item-addons").innerHTML = ADDONS.map((a) => `
      <label class="choice"><input type="checkbox" name="addon" value="${a.id}"> <span><strong>${esc(a.name[lang])}</strong></span><em dir="ltr">+${rm(a.price)}</em></label>`).join("");
    updateItemBtn();
    itemDialog.showModal();
  });
  itemDialog.addEventListener("change", updateItemBtn);
  itemDialog.addEventListener("click", (e) => {
    const step = e.target.closest("[data-step]");
    if (step) { qty = Math.max(1, Math.min(20, qty + Number(step.dataset.step))); updateItemBtn(); }
    if (e.target.closest("[data-close]") || e.target === itemDialog) itemDialog.close();
  });
  const chosenAddons = () => $$("#item-addons input:checked").map((i) => i.value).sort();
  function unitPrice(drinkId, addons) {
    const d = DRINKS.find((x) => x.id === drinkId);
    return d.price + addons.reduce((s, id) => s + ADDONS.find((a) => a.id === id).price, 0);
  }
  function updateItemBtn() {
    $("#item-qty").textContent = qty;
    $("#item-submit").textContent = `${t("item.add")}  ${rm(unitPrice(current.id, chosenAddons()) * qty)}`;
  }
  $("#item-form").addEventListener("submit", (e) => {
    e.preventDefault();
    addToCart(current.id, chosenAddons(), qty);
    itemDialog.close();
    toast(t("added"));
  });

  /* ---------- Cart ---------- */
  let cart = store.get("cmc-cart", []).filter((l) => DRINKS.some((d) => d.id === l.id));
  const save = () => store.set("cmc-cart", cart);
  function addToCart(id, addons, n) {
    const key = id + "|" + addons.join(",");
    const line = cart.find((l) => l.key === key);
    if (line) line.qty = Math.min(50, line.qty + n);
    else cart.push({ key, id, addons, qty: n });
    save(); renderCart();
    const c = $("#cart-count"); c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump");
  }
  function totals() {
    const count = cart.reduce((s, l) => s + l.qty, 0);
    const sub = cart.reduce((s, l) => s + unitPrice(l.id, l.addons) * l.qty, 0);
    const free = Math.floor(count / PROMO_EVERY);
    const mode = $("#checkout").elements.mode.value || "pickup";
    const fee = count ? MODES[mode].fee : 0;
    return { count, sub, free, fee, total: sub + fee, mode };
  }
  const extrasOf = (l, L) => l.addons.map((id) => ADDONS.find((a) => a.id === id).name[L]);
  const nameOf = (l) => DRINKS.find((x) => x.id === l.id).name;
  function renderCart() {
    const { count, sub, free, fee, total } = totals();
    $("#cart-count").textContent = count;
    $("#fab").hidden = count === 0;
    document.body.classList.toggle("has-fab", count > 0);
    $("#fab-total").textContent = rm(total);
    $("#cart-empty").hidden = count > 0;
    $("#checkout").hidden = count === 0;
    const freeName = DRINKS.find((d) => d.id === FREE_ITEM).name;
    $("#cart-lines").innerHTML = cart.map((l, i) => {
      const extras = extrasOf(l, lang);
      return `<li class="cart-line">
        <h3 dir="ltr">${esc(nameOf(l))}</h3>
        <span class="line-price">${rm(unitPrice(l.id, l.addons) * l.qty)}</span>
        ${extras.length ? `<small>+ ${esc(extras.join(lang === "ar" ? "، " : ", "))}</small>` : ""}
        <div class="line-controls">
          <div class="qty qty-sm">
            <button type="button" data-line="${i}" data-d="-1" aria-label="−">−</button>
            <output>${l.qty}</output>
            <button type="button" data-line="${i}" data-d="1" aria-label="+">+</button>
          </div>
          <button type="button" class="remove-btn" data-remove="${i}">${esc(t("remove"))}</button>
        </div>
      </li>`;
    }).join("") + (free ? `<li class="cart-line free"><h3><span dir="ltr">${free}× ${esc(freeName)}</span></h3><span class="line-price">${esc(t("freeTag"))}</span><small>${esc(t("freeLine"))}</small></li>` : "");
    const toNext = PROMO_EVERY - (count % PROMO_EVERY);
    $("#promo-hint").textContent = count === 0 ? "" : free ? t("hintGot")(free) + (toNext < PROMO_EVERY ? " " + t("hintNext")(toNext) : "") : t("hintMore")(toNext);
    $("#t-sub").textContent = rm(sub);
    $("#t-fee").textContent = rm(fee);
    $("#t-total").textContent = rm(total);
  }
  $("#cart-lines").addEventListener("click", (e) => {
    const step = e.target.closest("[data-line]"), rem = e.target.closest("[data-remove]");
    if (step) { const l = cart[+step.dataset.line]; l.qty += +step.dataset.d; if (l.qty < 1) cart.splice(+step.dataset.line, 1); }
    else if (rem) cart.splice(+rem.dataset.remove, 1);
    else return;
    save(); renderCart();
  });

  /* ---------- Cart drawer ---------- */
  const drawer = $("#cart");
  const openCart = () => { renderCart(); buildTimes(); drawer.showModal(); };
  $("#cart-open").addEventListener("click", openCart);
  $("#fab").addEventListener("click", openCart);
  $$("[data-open-cart]").forEach((b) => b.addEventListener("click", openCart));
  drawer.addEventListener("click", (e) => { if (e.target === drawer || e.target.closest("[data-close]")) drawer.close(); });

  /* ---------- Checkout ---------- */
  const form = $("#checkout");
  form.addEventListener("change", (e) => {
    if (e.target.name === "mode") { $("#address-field").hidden = e.target.value === "pickup"; renderCart(); }
    if (e.target.name === "day") buildTimes(true);
    if (e.target.name === "pay") $("#duitnow-box").hidden = e.target.value !== "duitnow";
  });
  form.addEventListener("input", (e) => { if (e.target.classList.contains("invalid")) { e.target.classList.remove("invalid"); $("#form-error").textContent = ""; } });

  function buildTimes(keepDay) {
    const daySel = $("#day"), timeSel = $("#time");
    const now = klNow();
    const prevDay = daySel.value, prevTime = timeSel.value;
    daySel.innerHTML = (now <= LAST_ORDER_MIN ? `<option value="today">${esc(t("today"))}</option>` : "") + `<option value="tomorrow">${esc(t("tomorrow"))}</option>`;
    if (keepDay !== false && [...daySel.options].some((o) => o.value === prevDay)) daySel.value = prevDay;
    const isToday = daySel.value === "today";
    const start = isToday ? Math.max(OPEN_MIN, Math.ceil((now + PREP_MIN) / SLOT_STEP) * SLOT_STEP) : OPEN_MIN;
    const opts = [];
    if (isToday && now >= OPEN_MIN) opts.push(`<option value="asap">${esc(t("asap"))}</option>`);
    for (let m = start; m <= CLOSE_MIN; m += SLOT_STEP) opts.push(`<option value="${m}">${fmtTime(m)}</option>`);
    timeSel.innerHTML = opts.join("");
    if ([...timeSel.options].some((o) => o.value === prevTime)) timeSel.value = prevTime;
  }

  // The order message is always written in English, so the CMC team can read every order.
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = form.elements;
    const { sub, free, fee, total, mode } = totals();
    const err = $("#form-error");
    $$(".invalid", form).forEach((x) => x.classList.remove("invalid"));
    const fail = (field, msg) => { if (field) { field.classList.add("invalid"); field.focus(); } err.textContent = msg; };
    if (!f.name.value.trim()) return fail(f.name, t("errName"));
    if (f.phone.value.replace(/\D/g, "").length < 9) return fail(f.phone, t("errPhone"));
    if (mode !== "pickup" && !f.address.value.trim()) return fail(f.address, t("errAddress"));
    if (!f.time.value) return fail(f.time, t("errTime"));
    err.textContent = "";

    const day = f.day.value === "today" ? "Today" : "Tomorrow";
    const time = f.time.value === "asap" ? "As soon as possible" : fmtTime(+f.time.value, "en");
    const lines = cart.map((l) => {
      const extras = extrasOf(l, "en");
      return `• ${l.qty}x ${nameOf(l)}${extras.length ? ` (+ ${extras.join(", ")})` : ""} — ${rm(unitPrice(l.id, l.addons) * l.qty)}`;
    });
    if (free) lines.push(`• ${free}x ${DRINKS.find((d) => d.id === FREE_ITEM).name} — FREE (Buy 3 promo)`);
    const msg = [
      "Hi CMC! I'd like to order:", "", ...lines, "",
      `Drinks: ${rm(sub)}`, `Delivery: ${rm(fee)}`, `*Total: ${rm(total)}*`, "",
      `Order type: ${MODES[mode].label}`,
      `Time: ${day}, ${time}`,
      `Name: ${f.name.value.trim()}`,
      `Phone: ${f.phone.value.trim()}`,
      mode !== "pickup" ? `Address: ${f.address.value.trim()}` : null,
      f.notes.value.trim() ? `Notes: ${f.notes.value.trim()}` : null,
      `Payment: ${f.pay.value === "duitnow" ? "DuitNow QR (I'll send the receipt screenshot)" : "Cash"}`,
      lang === "ar" ? "Website language: Arabic" : null,
    ].filter((x) => x !== null).join("\n");

    store.set("cmc-details", { name: f.name.value, phone: f.phone.value, address: f.address.value });
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    toast(t("sent"));
  });

  const saved = store.get("cmc-details", null);
  if (saved) { form.elements.name.value = saved.name || ""; form.elements.phone.value = saved.phone || ""; form.elements.address.value = saved.address || ""; }

  const qr = $("#duitnow-qr");
  const qrMissing = () => { qr.hidden = true; $("#duitnow-save").hidden = true; $("#duitnow-missing").hidden = false; };
  qr.addEventListener("error", qrMissing);

  /* ---------- Feedback page ---------- */
  const fb = $("#feedback-form");
  if (fb) {
    const build = () => {
      const f = fb.elements;
      const typeLabel = { compliment: "Compliment", suggestion: "Suggestion", problem: "Problem with an order", other: "Other" }[f.type.value];
      const rating = f.rating.value ? `${f.rating.value}/5` : "Not given";
      return [
        "CMC feedback", "",
        `Type: ${typeLabel}`, `Rating: ${rating}`,
        f.fbname.value.trim() ? `Name: ${f.fbname.value.trim()}` : null,
        f.fbcontact.value.trim() ? `Contact: ${f.fbcontact.value.trim()}` : null,
        "", f.message.value.trim(),
      ].filter((x) => x !== null).join("\n");
    };
    const valid = () => {
      const m = fb.elements.message;
      if (m.value.trim()) { $("#fb-error").textContent = ""; m.classList.remove("invalid"); return true; }
      m.classList.add("invalid"); m.focus(); $("#fb-error").textContent = t("fb.err"); return false;
    };
    fb.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!valid()) return;
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(build())}`, "_blank", "noopener");
      toast(t("fb.sent"));
    });
    $("#fb-email").addEventListener("click", (e) => {
      e.preventDefault();
      if (!valid()) return;
      location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("CMC feedback")}&body=${encodeURIComponent(build())}`;
    });
    fb.addEventListener("input", (e) => { if (e.target.name === "message" && e.target.classList.contains("invalid")) valid(); });
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(text) {
    const el = $("#toast"); el.textContent = text; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
  }

  /* ---------- Header + nav ---------- */
  const header = $(".header");
  const onScroll = () => header.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const toggle = $("#menu-toggle"), nav = $("#nav");
  toggle.addEventListener("click", () => { const o = nav.classList.toggle("open"); toggle.setAttribute("aria-expanded", String(o)); });
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); } });

  $("#year").textContent = new Date().getFullYear();
  applyLang();

  /* ---------- Gentle scroll reveals (inner pages) ---------- */
  const single = [".page-head", ".addons", ".promo-copy", ".promo-cups", ".promo-terms", ".how-note", ".pay-cards", ".story-arch",
    ".story-copy", ".review figure", ".review-ask", ".find-grid > div", ".feedback-form", ".legal", ".footer-brand"];
  const groups = ["#menu-list", ".steps"];
  single.forEach((sel) => $$(sel).forEach((el) => el.classList.add("reveal")));
  groups.forEach((sel) => $$(sel).forEach((el) => el.classList.add("reveal-stagger")));
  const setIndexes = () => $$(".reveal-stagger").forEach((g) => [...g.children].forEach((c, i) => c.style.setProperty("--i", i)));
  setIndexes();
  const ml = $("#menu-list"); if (ml) new MutationObserver(setIndexes).observe(ml, { childList: true });
  const targets = $$(".reveal, .reveal-stagger");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((en2) => {
      if (en2.isIntersecting) { en2.target.classList.add("in"); io.unobserve(en2.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    targets.forEach((el) => io.observe(el));
  } else targets.forEach((el) => el.classList.add("in"));
  setInterval(updateStatus, 60000);
})();
