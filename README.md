# Coffee Make Cozy (CMC)

Website for Coffee Make Cozy, a home-based specialty coffee brand at Mahallah Zaid bin Harithah, Pagoh, Johor.

Plain HTML, CSS and JavaScript: no build step and no server. It can be hosted free on GitHub Pages.

## What's on the site

- English and Bahasa Melayu, with a switch in the top bar
- Live open/closed status, based on Malaysia time
- Signature drink, full menu and add-ons
- **Buy 3, get a Buttercreme Latte free.** The cart adds the free drink automatically.
- **Order on the website.** Customers build a cart, then choose pickup or delivery (RM1 or RM3), a day and time, and enter their details. Checkout opens WhatsApp with the full order typed out, sent to +60 11-2918 6169.
- Payment by cash or DuitNow QR. To show your QR in the checkout, save it as `assets/img/duitnow-qr.png`. Until then, customers are told the QR comes on WhatsApp.
- Our story, a customer review, location and delivery fees

## Files

| File | What it is |
| --- | --- |
| `index.html` | Page layout and text |
| `styles.css` | Design. Brand colors are at the top in `:root` |
| `script.js` | Menu, prices, add-ons, promo, opening hours, translations and WhatsApp checkout |
| `assets/img/` | Logo and photos |

## Common edits

All business settings are at the top of `script.js`:

- **Prices or drinks:** edit the `DRINKS` list. To show a photo, set `img` to a file in `assets/img/`. `null` shows a cup icon.
- **Add-ons:** edit `ADDONS`.
- **Delivery fees:** edit `MODES`, and the fee table in the "Find us" section of `index.html`.
- **Hours:** edit `OPEN_MIN`, `CLOSE_MIN` and `LAST_ORDER_MIN`, in minutes after midnight (for example 20:30 = `20 * 60 + 30`).
- **WhatsApp number:** edit `WHATSAPP` (country code, no `+` or spaces).
- **Text in both languages:** edit the `T.en` and `T.ms` translations in `script.js`. Each piece of text in `index.html` has a matching `data-i18n` key.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish free with GitHub Pages

Repository **Settings → Pages → Build and deployment → Deploy from a branch**. Choose your branch and `/ (root)`, then save. The site goes live at `https://<username>.github.io/crispy-engine/`.
