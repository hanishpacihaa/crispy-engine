# Business Landing Page

A responsive one-page business website built with plain HTML, CSS and JavaScript. It has no dependencies and no build step.

## Files

- `index.html`: all page content (text, sections, links)
- `styles.css`: design. Brand colors are at the top in `:root`
- `script.js`: mobile menu, scroll animations, counters, form validation
- `assets/favicon.svg`: browser tab icon

## Preview locally

Open `index.html` in a browser, or run:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customize

1. **Text:** search `index.html` for "Your Business" and replace the placeholder copy.
2. **Colors:** edit `--brand`, `--brand-dark` and `--accent` in `styles.css`.
3. **Testimonials:** replace the placeholders with real customer quotes.
4. **Contact form:** right now it only validates in the browser. To receive messages, sign up for a free form service such as [Formspree](https://formspree.io), then set `action="https://formspree.io/f/YOUR_ID" method="POST"` on the `<form>` and remove the `e.preventDefault()` submit handler in `script.js`.

## Publish for free with GitHub Pages

Repository **Settings → Pages → Source: Deploy from a branch**, then pick the branch and `/ (root)`.
