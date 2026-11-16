/* Coffee Make Cozy — menu, cart, WhatsApp checkout, EN/BM */
(() => {
  "use strict";

  /* ---------- Settings (edit here) ---------- */
  const WHATSAPP = "601129186169";           // +60 11-2918 6169
  const OPEN_MIN = 11 * 60;                  // 11:00
  const CLOSE_MIN = 21 * 60;                 // 21:00
  const LAST_ORDER_MIN = 20 * 60 + 30;       // 20:30
  const SLOT_STEP = 30;                      // minutes between time slots
  const PREP_MIN = 20;                       // earliest slot from now
  const FREE_ITEM = "buttercreme";           // Buy 3 promo reward
  const PROMO_EVERY = 3;

  const DRINKS = [
    { id: "buttercreme", name: "Iced Buttercreme Latte", price: 6, img: "assets/img/buttercreme-latte.jpg", signature: true,
      desc: { en: "Espresso and cold milk under a thick, buttery cream top.", ms: "Espresso dan susu sejuk dengan lapisan krim mentega yang tebal." } },
    { id: "caramel", name: "Iced Caramel Latte", price: 7, img: "assets/img/caramel-latte.jpg",
      desc: { en: "Espresso, milk and rich caramel over ice.", ms: "Espresso, susu dan karamel pekat bersama ais." } },
    { id: "spanish", name: "Iced Spanish Latte", price: 7, img: "assets/img/spanish-latte.jpg",
      desc: { en: "Espresso with sweetened condensed milk. Sweet and smooth.", ms: "Espresso dengan susu pekat manis. Manis dan lembut." } },
    { id: "honey-cinnamon", name: "Iced Honey Cinnamon Latte", price: 10, img: "assets/img/honey-cinnamon-latte.jpg",
      desc: { en: "A honey drizzle and a dusting of cinnamon on soft foam.", ms: "Titisan madu dan taburan kayu manis di atas buih lembut." } },
    { id: "dirty", name: "Iced Dirty Latte", price: 10, img: "assets/img/dirty-latte.jpg",
      desc: { en: "A hot espresso shot poured over cold milk. Bold and layered.", ms: "Espresso panas dituang ke atas susu sejuk. Pekat dan berlapis." } },
  ];

  const ADDONS = [
    { id: "shot", price: 4, name: { en: "Extra shot", ms: "Tambah shot" } },
    { id: "oat", price: 3, name: { en: "Oat milk", ms: "Susu oat" } },
    { id: "syrup", price: 2, name: { en: "Syrup", ms: "Sirap" } },
  ];

  const MODES = {
    pickup: { fee: 0, label: { en: "Pickup at Mahallah Zaid bin Harithah", ms: "Ambil sendiri di Mahallah Zaid bin Harithah" } },
    d1: { fee: 1, label: { en: "Delivery around Mahallah Zaid bin Harithah", ms: "Penghantaran sekitar Mahallah Zaid bin Harithah" } },
    d3: { fee: 3, label: { en: "Delivery within 3 km", ms: "Penghantaran dalam 3 km" } },
  };

  /* ---------- Translations ---------- */
  const T = {
    en: {
      skip: "Skip to content",
      "nav.menu": "Menu", "nav.promo": "Promo", "nav.how": "How to order", "nav.story": "Our story", "nav.find": "Find us", "nav.toggle": "Menu",
      "cart.button": "Your order", "cart.view": "View order", "cart.title": "Your order",
      "cart.empty": "Your order is empty. Add a drink from the menu to get started.", "cart.browse": "Browse the menu",
      "hero.kicker": "Home-based café in Pagoh, Johor",
      "hero.title": "Specialty coffee at student prices.",
      "hero.sub": "Iced lattes made to order by five friends. Pick up at Mahallah Zaid bin Harithah, or we'll bring it to your door.",
      "hero.order": "Order now", "hero.wa": "Chat on WhatsApp",
      "hero.fact1": "for our signature latte", "hero.fact2a": "Buy 3", "hero.fact2": "get a signature free", "hero.fact3": "delivery around the mahallah",
      "hero.tag": "Signature",
      "sig.kicker": "Our signature",
      "sig.body": "Espresso and cold milk under a thick, buttery cream top. It's the drink we're known for, and the one we give away free with every three you buy.",
      "menu.title": "Menu", "menu.sub": "All drinks are iced and made fresh when you order.",
      "menu.add": "Add to order", "menu.addons": "Make it yours", "menu.addonsNote": "Choose add-ons when you add a drink to your order.",
      "menu.best": "Signature",
      "promo.title": "Buy 3, get a Buttercreme Latte free.",
      "promo.body": "Order any three drinks on one receipt and we'll add a free Iced Buttercreme Latte. Order six, get two. Your cart adds it for you.",
      "promo.cta": "Start an order", "promo.free": "free",
      "how.title": "How to order",
      "how.s1t": "Build your order", "how.s1": "Add drinks and extras here, then choose pickup or delivery and a time.",
      "how.s2t": "Send it on WhatsApp", "how.s2": "Tap send and WhatsApp opens with your order typed out. We'll reply to confirm.",
      "how.s3t": "Pay by cash or DuitNow QR", "how.s3": "Pay cash when you collect or when we deliver, or scan our DuitNow QR and send us the receipt.",
      "how.note": "Last orders at 8:30pm. We're open every day from 11am to 9pm.",
      "story.title": "Five friends, one coffee machine.",
      "story.p1": "CMC started with five friends and one problem: good coffee was either too far from campus or too expensive for a student budget. So we decided to make it ourselves.",
      "story.p2": "We practised shot after shot between classes until every cup tasted like something we'd happily pay more for. Then we kept the price student-friendly.",
      "story.p3": "Today we brew specialty coffee from our home-based café at Mahallah Zaid bin Harithah. Every drink is made to order, and every cup should feel like a small break in a long day. That's what Coffee Make Cozy means to us.",
      "review.title": "What customers say", "review.ask": "Tried CMC? Tag us on Instagram at",
      "find.title": "Find us", "find.pickup": "Pickup", "find.map": "Open in Google Maps",
      "find.hours": "Hours", "find.hoursVal": "Every day, 11am to 9pm. Last orders 8:30pm.",
      "find.pay": "Payment", "find.payVal": "Cash or DuitNow QR.",
      "find.contact": "Contact", "find.delivery": "Delivery to your door",
      "find.zone1": "Around Mahallah Zaid bin Harithah", "find.zone2": "Within 3 km",
      "find.further": "Further than 3 km? Message us on WhatsApp before you order.",
      "footer.email": "Email",
      "item.addons": "Add-ons (optional)", "item.qty": "Quantity", "item.add": "Add to order",
      "co.how": "Pickup or delivery", "co.pickup": "Pickup", "co.d1": "Delivery around the mahallah", "co.d1s": "Around Mahallah Zaid bin Harithah",
      "co.d3": "Delivery within 3 km", "co.d3s": "Further? Ask us on WhatsApp first",
      "co.when": "When", "co.day": "Day", "co.time": "Time",
      "co.details": "Your details", "co.name": "Name", "co.phone": "Phone number", "co.address": "Delivery address (block and room)",
      "co.notes": "Notes (optional)", "co.notesPh": "Less ice, less sweet…",
      "co.payment": "Payment", "co.cash": "Cash", "co.cashS": "Pay when you collect or when we deliver",
      "co.duitnowS": "Scan with any banking or e-wallet app",
      "co.duitnowNote": "Pay the total after we confirm your order on WhatsApp, then send us a screenshot of your receipt.",
      "co.duitnowMissing": "We'll send our DuitNow QR on WhatsApp when we confirm your order.",
      "co.subtotal": "Drinks", "co.fee": "Delivery", "co.total": "Total",
      "co.send": "Send order on WhatsApp", "co.sendNote": "Your order isn't confirmed until we reply on WhatsApp.",
      // dynamic
      today: "Today", tomorrow: "Tomorrow", asap: "As soon as possible",
      openNow: "Open now. Last orders 8:30pm", closedLate: "Closed for today. Order now for tomorrow from 11am",
      closedEarly: "Opens today at 11am", lastOrderPassed: "Last orders have closed. Order now for tomorrow",
      added: "Added to your order", freeLine: "Free with Buy 3 promo", remove: "Remove",
      hintMore: (n) => `Add ${n} more drink${n > 1 ? "s" : ""} to get a free Buttercreme Latte.`,
      hintGot: (n) => `Buy 3 promo: ${n} free Buttercreme Latte${n > 1 ? "s" : ""} added.`,
      hintNext: (n) => `Add ${n} more for another one.`,
      errName: "Enter your name so we know who the order is for.",
      errPhone: "Enter a phone number we can reach you on.",
      errAddress: "Enter your delivery address, including block and room.",
      errTime: "Choose a pickup or delivery time.",
      msgHi: "Hi CMC! I'd like to order:", msgFree: "FREE", msgPromo: "Buy 3 promo",
      msgSub: "Drinks", msgFee: "Delivery", msgTotal: "Total", msgMode: "Order type", msgWhen: "Time",
      msgName: "Name", msgPhone: "Phone", msgAddress: "Address", msgNotes: "Notes", msgPay: "Payment", payCash: "Cash", payDuitnow: "DuitNow QR (I'll send the receipt screenshot)",
      sent: "WhatsApp opened. Send the message to place your order.",
    },
    ms: {
      skip: "Langkau ke kandungan",
      "nav.menu": "Menu", "nav.promo": "Promosi", "nav.how": "Cara pesan", "nav.story": "Kisah kami", "nav.find": "Lokasi", "nav.toggle": "Menu",
      "cart.button": "Pesanan anda", "cart.view": "Lihat pesanan", "cart.title": "Pesanan anda",
      "cart.empty": "Pesanan anda masih kosong. Tambah minuman dari menu untuk mula.", "cart.browse": "Lihat menu",
      "hero.kicker": "Kafe rumah di Pagoh, Johor",
      "hero.title": "Kopi specialty, harga pelajar.",
      "hero.sub": "Latte ais dibancuh ikut tempahan oleh lima sahabat. Ambil sendiri di Mahallah Zaid bin Harithah, atau kami hantar ke pintu anda.",
      "hero.order": "Pesan sekarang", "hero.wa": "WhatsApp kami",
      "hero.fact1": "untuk latte signature kami", "hero.fact2a": "Beli 3", "hero.fact2": "percuma satu signature", "hero.fact3": "penghantaran sekitar mahallah",
      "hero.tag": "Signature",
      "sig.kicker": "Signature kami",
      "sig.body": "Espresso dan susu sejuk dengan lapisan krim mentega yang tebal. Inilah minuman yang paling dikenali, dan yang kami beri percuma untuk setiap tiga yang anda beli.",
      "menu.title": "Menu", "menu.sub": "Semua minuman ais dan dibancuh segar bila anda pesan.",
      "menu.add": "Tambah", "menu.addons": "Ikut citarasa anda", "menu.addonsNote": "Pilih tambahan semasa anda menambah minuman ke pesanan.",
      "menu.best": "Signature",
      "promo.title": "Beli 3, percuma Buttercreme Latte.",
      "promo.body": "Pesan mana-mana tiga minuman dalam satu resit dan kami tambah satu Iced Buttercreme Latte percuma. Pesan enam, dapat dua. Troli anda akan tambah secara automatik.",
      "promo.cta": "Mula pesan", "promo.free": "percuma",
      "how.title": "Cara pesan",
      "how.s1t": "Pilih pesanan", "how.s1": "Tambah minuman dan tambahan di sini, kemudian pilih ambil sendiri atau penghantaran dan masa.",
      "how.s2t": "Hantar melalui WhatsApp", "how.s2": "Tekan hantar dan WhatsApp akan dibuka dengan pesanan anda. Kami akan balas untuk sahkan.",
      "how.s3t": "Bayar tunai atau DuitNow QR", "how.s3": "Bayar tunai semasa ambil atau semasa kami hantar, atau imbas DuitNow QR kami dan hantar resit.",
      "how.note": "Pesanan terakhir jam 8:30 malam. Kami buka setiap hari dari 11 pagi hingga 9 malam.",
      "story.title": "Lima sahabat, satu mesin kopi.",
      "story.p1": "CMC bermula dengan lima sahabat dan satu masalah: kopi yang sedap sama ada terlalu jauh dari kampus atau terlalu mahal untuk bajet pelajar. Jadi kami putuskan untuk buat sendiri.",
      "story.p2": "Kami berlatih membancuh espresso di antara kelas sehingga setiap cawan terasa seperti kopi yang kami sanggup bayar lebih. Kemudian kami kekalkan harga mesra pelajar.",
      "story.p3": "Hari ini kami membancuh kopi specialty dari kafe rumah kami di Mahallah Zaid bin Harithah. Setiap minuman dibuat ikut tempahan, dan setiap cawan patut terasa seperti rehat kecil dalam hari yang panjang. Itulah maksud Coffee Make Cozy bagi kami.",
      "review.title": "Kata pelanggan", "review.ask": "Dah cuba CMC? Tag kami di Instagram",
      "find.title": "Lokasi kami", "find.pickup": "Ambil sendiri", "find.map": "Buka di Google Maps",
      "find.hours": "Waktu", "find.hoursVal": "Setiap hari, 11 pagi hingga 9 malam. Pesanan terakhir 8:30 malam.",
      "find.pay": "Bayaran", "find.payVal": "Tunai atau DuitNow QR.",
      "find.contact": "Hubungi", "find.delivery": "Penghantaran ke pintu anda",
      "find.zone1": "Sekitar Mahallah Zaid bin Harithah", "find.zone2": "Dalam 3 km",
      "find.further": "Lebih dari 3 km? WhatsApp kami dahulu sebelum memesan.",
      "footer.email": "Emel",
      "item.addons": "Tambahan (pilihan)", "item.qty": "Kuantiti", "item.add": "Tambah ke pesanan",
      "co.how": "Ambil sendiri atau penghantaran", "co.pickup": "Ambil sendiri", "co.d1": "Penghantaran sekitar mahallah", "co.d1s": "Sekitar Mahallah Zaid bin Harithah",
      "co.d3": "Penghantaran dalam 3 km", "co.d3s": "Lebih jauh? Tanya kami di WhatsApp dahulu",
      "co.when": "Bila", "co.day": "Hari", "co.time": "Masa",
      "co.details": "Maklumat anda", "co.name": "Nama", "co.phone": "Nombor telefon", "co.address": "Alamat penghantaran (blok dan bilik)",
      "co.notes": "Nota (pilihan)", "co.notesPh": "Kurang ais, kurang manis…",
      "co.payment": "Bayaran", "co.cash": "Tunai", "co.cashS": "Bayar semasa ambil atau semasa kami hantar",
      "co.duitnowS": "Imbas dengan mana-mana aplikasi bank atau e-dompet",
      "co.duitnowNote": "Bayar jumlah selepas kami sahkan pesanan di WhatsApp, kemudian hantar tangkapan skrin resit anda.",
      "co.duitnowMissing": "Kami akan hantar DuitNow QR di WhatsApp semasa mengesahkan pesanan anda.",
      "co.subtotal": "Minuman", "co.fee": "Penghantaran", "co.total": "Jumlah",
      "co.send": "Hantar pesanan di WhatsApp", "co.sendNote": "Pesanan anda hanya disahkan selepas kami balas di WhatsApp.",
      today: "Hari ini", tomorrow: "Esok", asap: "Secepat mungkin",
      openNow: "Buka sekarang. Pesanan terakhir 8:30 malam", closedLate: "Sudah tutup hari ini. Pesan sekarang untuk esok dari 11 pagi",
      closedEarly: "Buka hari ini jam 11 pagi", lastOrderPassed: "Pesanan terakhir sudah tamat. Pesan sekarang untuk esok",
      added: "Ditambah ke pesanan", freeLine: "Percuma dengan promosi Beli 3", remove: "Buang",
      hintMore: (n) => `Tambah ${n} lagi minuman untuk dapat Buttercreme Latte percuma.`,
      hintGot: (n) => `Promosi Beli 3: ${n} Buttercreme Latte percuma ditambah.`,
      hintNext: (n) => `Tambah ${n} lagi untuk dapat satu lagi.`,
      errName: "Masukkan nama anda supaya kami tahu pesanan ini untuk siapa.",
      errPhone: "Masukkan nombor telefon yang boleh kami hubungi.",
      errAddress: "Masukkan alamat penghantaran, termasuk blok dan bilik.",
      errTime: "Pilih masa untuk ambil atau penghantaran.",
      msgHi: "Hai CMC! Saya nak pesan:", msgFree: "PERCUMA", msgPromo: "Promosi Beli 3",
      msgSub: "Minuman", msgFee: "Penghantaran", msgTotal: "Jumlah", msgMode: "Jenis pesanan", msgWhen: "Masa",
      msgName: "Nama", msgPhone: "Telefon", msgAddress: "Alamat", msgNotes: "Nota", msgPay: "Bayaran", payCash: "Tunai", payDuitnow: "DuitNow QR (saya akan hantar tangkapan skrin resit)",
      sent: "WhatsApp dibuka. Hantar mesej untuk membuat pesanan.",
    },
  };

  /* ---------- Helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rm = (n) => "RM" + (Number.isInteger(n) ? n : n.toFixed(2));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } },
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  let lang = store.get("cmc-lang", (navigator.language || "").toLowerCase().startsWith("ms") ? "ms" : "en");
  if (!T[lang]) lang = "en";
  const t = (k) => T[lang][k] ?? T.en[k] ?? k;

  // Malaysia time, whatever the visitor's device timezone
  function klNow() {
    const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kuala_Lumpur", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
    const h = +parts.find((p) => p.type === "hour").value;
    const m = +parts.find((p) => p.type === "minute").value;
    return h * 60 + m;
  }
  function fmtTime(min) {
    const h = Math.floor(min / 60), m = min % 60;
    const h12 = ((h + 11) % 12) + 1;
    const suffix = lang === "ms" ? (h < 12 ? " pagi" : h < 19 ? " petang" : " malam") : (h < 12 ? "am" : "pm");
    return `${h12}:${String(m).padStart(2, "0")}${suffix}`;
  }

  /* ---------- Language ---------- */
  function applyLang() {
    document.documentElement.lang = lang === "ms" ? "ms" : "en";
    $$("[data-i18n]").forEach((el) => { const v = t(el.dataset.i18n); if (typeof v === "string") el.textContent = v; });
    $$("[data-i18n-placeholder]").forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    renderMenu();
    updateStatus();
    buildTimes();
    renderCart();
  }
  $$(".lang button").forEach((b) => b.addEventListener("click", () => { lang = b.dataset.lang; store.set("cmc-lang", lang); applyLang(); }));

  /* ---------- Open status ---------- */
  function updateStatus() {
    const now = klNow();
    const el = $("#open-status"), txt = $("#open-status-text");
    const open = now >= OPEN_MIN && now < CLOSE_MIN;
    el.classList.toggle("is-open", open && now <= LAST_ORDER_MIN);
    if (now < OPEN_MIN) txt.textContent = t("closedEarly");
    else if (now <= LAST_ORDER_MIN) txt.textContent = t("openNow");
    else if (now < CLOSE_MIN) txt.textContent = t("lastOrderPassed");
    else txt.textContent = t("closedLate");
  }

  /* ---------- Menu ---------- */
  const cupIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h14l-1 2H6L5 3zm1.2 4h11.6l-1.5 12.3A2 2 0 0 1 14.3 21H9.7a2 2 0 0 1-2-1.7L6.2 7zM9 10l.6 7h1.2L10.3 10H9z"/></svg>';
  function renderMenu() {
    $("#menu-list").innerHTML = DRINKS.map((d) => `
      <li class="menu-item">
        <div class="menu-thumb">${d.img ? `<img src="${d.img}" alt="" loading="lazy">` : cupIcon}</div>
        <div>
          <h3>${esc(d.name)}${d.signature ? ` <span class="badge">${esc(t("menu.best"))}</span>` : ""}</h3>
          <p>${esc(d.desc[lang])}</p>
        </div>
        <span class="menu-price">${rm(d.price)}</span>
        <button type="button" class="add-btn" data-add="${d.id}" aria-label="${esc(t("menu.add"))}: ${esc(d.name)}">${esc(t("menu.add"))}</button>
      </li>`).join("");
    $("#addon-list").innerHTML = ADDONS.map((a) => `<li>${esc(a.name[lang])}<b>+${rm(a.price)}</b></li>`).join("");
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
      <label class="choice"><input type="checkbox" name="addon" value="${a.id}"> <span><strong>${esc(a.name[lang])}</strong></span><em>+${rm(a.price)}</em></label>`).join("");
    updateItemBtn();
    itemDialog.showModal();
  });
  itemDialog.addEventListener("change", updateItemBtn);
  itemDialog.addEventListener("click", (e) => {
    const step = e.target.closest("[data-step]");
    if (step) { qty = Math.max(1, Math.min(20, qty + Number(step.dataset.step))); updateItemBtn(); }
    if (e.target.closest("[data-close]") || e.target === itemDialog) itemDialog.close();
  });
  function chosenAddons() { return $$("#item-addons input:checked").map((i) => i.value).sort(); }
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
  function save() { store.set("cmc-cart", cart); }
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
    const mode = ($("#checkout").elements.mode.value) || "pickup";
    const fee = count ? MODES[mode].fee : 0;
    return { count, sub, free, fee, total: sub + fee, mode };
  }
  function lineLabel(l) {
    const d = DRINKS.find((x) => x.id === l.id);
    const extras = l.addons.map((id) => ADDONS.find((a) => a.id === id).name[lang]);
    return { name: d.name, extras };
  }
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
      const { name, extras } = lineLabel(l);
      return `<li class="cart-line">
        <h3>${esc(name)}</h3>
        <span class="line-price">${rm(unitPrice(l.id, l.addons) * l.qty)}</span>
        ${extras.length ? `<small>+ ${esc(extras.join(", "))}</small>` : ""}
        <div class="line-controls">
          <div class="qty qty-sm">
            <button type="button" data-line="${i}" data-d="-1" aria-label="−">−</button>
            <output>${l.qty}</output>
            <button type="button" data-line="${i}" data-d="1" aria-label="+">+</button>
          </div>
          <button type="button" class="remove-btn" data-remove="${i}">${esc(t("remove"))}</button>
        </div>
      </li>`;
    }).join("") + (free ? `<li class="cart-line free"><h3>${free}× ${esc(freeName)}</h3><span class="line-price">${esc(T[lang].msgFree)}</span><small>${esc(t("freeLine"))}</small></li>` : "");

    const toNext = PROMO_EVERY - (count % PROMO_EVERY);
    $("#promo-hint").textContent = count === 0 ? "" : free ? t("hintGot")(free) + (toNext < PROMO_EVERY ? " " + t("hintNext")(toNext) : "") : t("hintMore")(toNext);
    $("#t-sub").textContent = rm(sub);
    $("#t-fee").textContent = rm(fee);
    $("#t-total").textContent = rm(total);
  }
  $("#cart-lines").addEventListener("click", (e) => {
    const step = e.target.closest("[data-line]");
    const rem = e.target.closest("[data-remove]");
    if (step) {
      const l = cart[+step.dataset.line];
      l.qty += +step.dataset.d;
      if (l.qty < 1) cart.splice(+step.dataset.line, 1);
    } else if (rem) cart.splice(+rem.dataset.remove, 1);
    else return;
    save(); renderCart();
  });

  /* ---------- Cart drawer ---------- */
  const drawer = $("#cart");
  const openCart = () => { renderCart(); buildTimes(); drawer.showModal(); };
  $("#cart-open").addEventListener("click", openCart);
  $("#fab").addEventListener("click", openCart);
  drawer.addEventListener("click", (e) => {
    if (e.target === drawer || e.target.closest("[data-close]")) drawer.close();
  });

  /* ---------- Checkout form ---------- */
  const form = $("#checkout");
  form.addEventListener("change", (e) => {
    if (e.target.name === "mode") {
      $("#address-field").hidden = e.target.value === "pickup";
      renderCart();
    }
    if (e.target.name === "day") buildTimes(true);
    if (e.target.name === "pay") $("#duitnow-box").hidden = e.target.value !== "duitnow";
  });

  form.addEventListener("input", (e) => { if (e.target.classList.contains("invalid")) { e.target.classList.remove("invalid"); $("#form-error").textContent = ""; } });

  function buildTimes(keepDay) {
    const daySel = $("#day"), timeSel = $("#time");
    const now = klNow();
    const todayOk = now <= LAST_ORDER_MIN;
    const prevDay = daySel.value, prevTime = timeSel.value;
    daySel.innerHTML = (todayOk ? `<option value="today">${esc(t("today"))}</option>` : "") + `<option value="tomorrow">${esc(t("tomorrow"))}</option>`;
    if (keepDay !== false && [...daySel.options].some((o) => o.value === prevDay)) daySel.value = prevDay;
    const isToday = daySel.value === "today";
    let start = OPEN_MIN;
    if (isToday) start = Math.max(OPEN_MIN, Math.ceil((now + PREP_MIN) / SLOT_STEP) * SLOT_STEP);
    const opts = [];
    if (isToday && now >= OPEN_MIN) opts.push(`<option value="asap">${esc(t("asap"))}</option>`);
    for (let m = start; m <= CLOSE_MIN; m += SLOT_STEP) opts.push(`<option value="${m}">${fmtTime(m)}</option>`);
    timeSel.innerHTML = opts.join("");
    if ([...timeSel.options].some((o) => o.value === prevTime)) timeSel.value = prevTime;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = form.elements;
    const { sub, free, fee, total, mode } = totals();
    const err = $("#form-error");
    $$(".invalid", form).forEach((x) => x.classList.remove("invalid"));
    const fail = (field, msg) => { if (field) { field.classList.add("invalid"); field.focus(); } err.textContent = msg; };

    const phone = f.phone.value.replace(/[^\d+]/g, "");
    if (!f.name.value.trim()) return fail(f.name, t("errName"));
    if (phone.replace(/\D/g, "").length < 9) return fail(f.phone, t("errPhone"));
    if (mode !== "pickup" && !f.address.value.trim()) return fail(f.address, t("errAddress"));
    if (!f.time.value) return fail(f.time, t("errTime"));
    err.textContent = "";

    const when = `${f.day.options[f.day.selectedIndex].text}, ${f.time.options[f.time.selectedIndex].text}`;
    const lines = cart.map((l) => {
      const { name, extras } = lineLabel(l);
      return `• ${l.qty}x ${name}${extras.length ? ` (+ ${extras.join(", ")})` : ""} — ${rm(unitPrice(l.id, l.addons) * l.qty)}`;
    });
    if (free) lines.push(`• ${free}x ${DRINKS.find((d) => d.id === FREE_ITEM).name} — ${t("msgFree")} (${t("msgPromo")})`);

    const msg = [
      t("msgHi"), "", ...lines, "",
      `${t("msgSub")}: ${rm(sub)}`,
      `${t("msgFee")}: ${rm(fee)}`,
      `*${t("msgTotal")}: ${rm(total)}*`, "",
      `${t("msgMode")}: ${MODES[mode].label[lang]}`,
      `${t("msgWhen")}: ${when}`,
      `${t("msgName")}: ${f.name.value.trim()}`,
      `${t("msgPhone")}: ${f.phone.value.trim()}`,
      mode !== "pickup" ? `${t("msgAddress")}: ${f.address.value.trim()}` : null,
      f.notes.value.trim() ? `${t("msgNotes")}: ${f.notes.value.trim()}` : null,
      `${t("msgPay")}: ${f.pay.value === "duitnow" ? t("payDuitnow") : t("payCash")}`,
    ].filter((x) => x !== null).join("\n");

    store.set("cmc-details", { name: f.name.value, phone: f.phone.value, address: f.address.value });
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    toast(t("sent"));
  });

  // Prefill returning customer's details (this device only)
  const saved = store.get("cmc-details", null);
  if (saved) { form.elements.name.value = saved.name || ""; form.elements.phone.value = saved.phone || ""; form.elements.address.value = saved.address || ""; }

  // DuitNow QR: until assets/img/duitnow-qr.png is added, explain that the QR comes on WhatsApp
  const qr = $("#duitnow-qr");
  const qrMissing = () => { qr.hidden = true; $("#duitnow-missing").hidden = false; };
  qr.addEventListener("error", qrMissing);
  if (qr.complete && !qr.naturalWidth) qrMissing();

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
  setInterval(() => { updateStatus(); }, 60000);
})();
