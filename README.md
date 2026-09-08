# Pediatric Nutrition Toolkit — PWA 0.1

Static Progressive Web App (no Python, Streamlit, Ollama, or paid AI API required).

## Intended workflow
1. Take a photo of 24-hour recall / FFQ in the normal ChatGPT app.
2. Type `PNIF` and copy the JSON response.
3. Open this PWA and paste into **PNIF**.
4. Review/edit/add foods and ingredients.
5. Match foods in the local database and calculate nutrients.
6. For modular diets, create one daily recipe and enter prescribed vs actual mL per feed.

## Open on Mac for a quick test
Because service workers require HTTP/HTTPS, run any static web server in this folder. For example, if Python is already installed:

`python3 -m http.server 8080`

Then open `http://localhost:8080`.

This is only for local testing. Python is NOT required for the deployed PWA.

## Use on Mac + Android + iPad
Upload the contents of this folder to any static HTTPS host such as GitHub Pages or Cloudflare Pages. Then open the same HTTPS URL on each device. The app can be installed to the home screen as a PWA and works offline after the first successful load.

## Current prototype limitations
- Data is stored locally in each browser. Cross-device sync is not included yet.
- Food database contains only a few demo/custom defaults. It intentionally does not bundle Thai FCD data.
- Food matching is simple name matching. Portion conversion requires the amount to be in the database basis unit or an entered weight/volume.
- Medical formula database and custom Excel import are planned next.
- The app does not ask ChatGPT to calculate nutrients; nutrient math is deterministic inside the PWA.

## Files
- `index.html`
- `styles.css`
- `app.js`
- `manifest.webmanifest`
- `sw.js`
- `icons/`
