# Devesh Pratap — Portfolio

Plain HTML/CSS/JS, no build step. Three files:

- `index.html` — markup
- `style.css` — all styling (dark/light theme, layout, animations)
- `script.js` — theme toggle, typing effect, scroll reveals, GitHub API fetch, dashboard modal, counters, contact form

## Run it locally

Just opening `index.html` in a browser works for most of the site. For the GitHub API calls to run reliably (some browsers restrict `fetch` on `file://` pages), serve it over a local server instead:


Then open http://localhost:8000 in your browser.

Node alternative:

```bash
npx serve .
```

## Deploy

Drag this folder into Vercel, Netlify, or push it to a GitHub repo and enable GitHub Pages — no build command needed, just set the output/root to this folder.

## Where to edit things

- Contact info, name, role titles → `index.html` (hero + contact + footer sections)
- Colors, fonts, spacing → `style.css` (`:root` and `html[data-theme="light"]` at the top)
- Typed role list, skill percentages, dashboard/ML/cloud card content, GitHub username → `script.js` (look for `roles`, `dashboards`, `mlModels`, `cloudItems`, `GH_USER`)
- CGPA, certification details → `index.html` (Education and Certifications sections)
