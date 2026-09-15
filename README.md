# Prakshit — merged portfolio

This is the dependency-free static version of the portfolio, combining the terminal-style Netlify redesign with the original project's personal content and interactive features.

## Files

- `index.html` — page structure, SEO metadata, project content, navigation, contact UI
- `style.css` — terminal/grid visual system, responsive layout, animations
- `script.js` — mobile nav, reveal animations, copy-email action, console easter egg + confetti

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static HTTP server.

Python:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Deploy

The folder can be dropped directly into Netlify, GitHub Pages, Cloudflare Pages, or any static host. No Node/TanStack/Tailwind build step is required.
