# Coffee Make Cozy (CMC)

Website for Coffee Make Cozy, a home-based specialty coffee brand at Mahallah Zaid bin Harithah, Pagoh, Johor.

Plain HTML, CSS and JavaScript: no build step and no server. It can be hosted free on GitHub Pages.

## What's on the site

- English and Arabic, with a switch in the top bar. Arabic switches the whole site to right-to-left. Drink names, the brand name, DuitNow and prices stay in English. Orders always reach WhatsApp in English.
- Live open/closed status, based on Malaysia time
- Signature drink, full menu and add-ons
- **Buy 3, get a Buttercreme Latte free.** The cart adds the free drink automatically.
- **Order on the website.** Customers build a cart, then choose pickup or delivery (RM1 or RM3), a day and time, and enter their details. Checkout opens WhatsApp with the full order typed out, sent to +60 11-2918 6169.
- Payment by cash or DuitNow QR. To show your QR in the checkout, save it as `assets/img/duitnow-qr.png`. Until then, customers are told the QR comes on WhatsApp.
- Our story, a customer review, location and delivery fees

## Pages

| Page | File |
| --- | --- |
| Home (the three-scene scroll story and the promotion banner) | `index.html` |
| Menu | `menu.html` |
| Promotion | `promo.html` |
| How to order (steps, payment and delivery fees) | `how-to-order.html` |
| Our story and review | `our-story.html` |
| Find us | `find-us.html` |
| Feedback form (sends by WhatsApp or email) | `feedback.html` |
| Privacy policy | `privacy.html` |

The header, footer, cart and checkout are added to every page by `script.js`. All text in both languages is in `i18n.js`. Each text element in the HTML has a `data-i18n` key that matches an entry in that file.

## Homepage story animation

The top of the page is a scroll-controlled story in three scenes, built with GSAP ScrollTrigger (saved in `assets/vendor/`, so no outside server is needed):

1. **Wake up your senses.** Coffee beans fall, the CMC logo is revealed, then "A little moment of coziness." appears. Scrolling zooms into the scene.
2. **The art of coffee.** The espresso photo shrinks into a glass. Ice drops in, milk rises, then espresso pours, and "Good coffee. Better moments." appears.
3. **Signature collection.** The Iced Buttercreme Latte rises into the centre, then settles to the side while its name, description, price and the Order now button appear.

The animation code is in `story.js`, with styles at the end of `styles.css`. Visitors who prefer reduced motion get a still version of the three scenes.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Page layout and text |
| `styles.css` | Design. Brand colors are at the top in `:root` |
| `script.js` | Menu, prices, add-ons, promo, opening hours, translations and WhatsApp checkout |
| `story.js` | The scroll-controlled homepage story (scenes 1–3) |
| `assets/img/` | Logo and photos |

## Common edits

All business settings are at the top of `script.js`:

- **Prices or drinks:** edit the `DRINKS` list. To show a photo, set `img` to a file in `assets/img/`. `null` shows a cup icon.
- **Add-ons:** edit `ADDONS`.
- **Delivery fees:** edit `MODES`, and the fee table in the "Find us" section of `index.html`.
- **Hours:** edit `OPEN_MIN`, `CLOSE_MIN` and `LAST_ORDER_MIN`, in minutes after midnight (for example 20:30 = `20 * 60 + 30`).
- **WhatsApp number:** edit `WHATSAPP` (country code, no `+` or spaces).
- **Text in both languages:** edit `i18n.js`. Drink descriptions and add-on names are in `script.js`, next to the prices.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish free with GitHub Pages

Repository **Settings → Pages → Build and deployment → Deploy from a branch**. Choose your branch and `/ (root)`, then save. The site goes live at `https://<username>.github.io/crispy-engine/`.
