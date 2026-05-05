# Dexholdem Website

Static project website for the NeurIPS 2026 Dataset & Benchmark submission
**Dexholdem: A real-world ShadowHand benchmark for dexterous tabletop
manipulation and embodied agents**.

Open `index.html` directly in a browser, or serve this folder with any static
server. The site uses local assets only and has no build step.

## GitHub Pages

This repository includes `.github/workflows/pages.yml`, which deploys the static
site from the repository root on every push to `main`.

Expected project-page URL:

<https://dexholdem.github.io/Dexholdem/>

If this is the first Pages deployment for the repository, set GitHub repository
Settings -> Pages -> Source to `GitHub Actions`.

## Updating Demo Videos

Place released videos under `assets/videos/` and update the cards in
`index.html` to use `<video controls poster="...">` elements or direct links to
hosted videos.

## Key Resources

- Paper: `assets/papers/dexas-holdem-neurips2026.pdf`
- Croissant metadata: `assets/data/croissant.json`
- Dataset: <https://huggingface.co/datasets/Winniechen2002/TexasPokerRobot>
