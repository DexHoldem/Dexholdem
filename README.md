# DexHoldem Website

Static project website for
**DexHoldem: Playing Texas Hold'em with Dexterous Embodied System**.

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

Compressed policy-bench videos live under `assets/videos/policy-bench/`, with
matching posters under `assets/videos/policy-bench/posters/`. Update
`policyDemoVideos` in `script.js` when adding new demo files or labels.

## Key Resources

- Paper placeholder: `assets/papers/paper.pdf`
- Teaser: `assets/images/teaser.png`
- Detail pages: `pages/perception.html`, `pages/policy.html`, `pages/system.html`, `pages/analysis.html`
- Croissant metadata: `assets/data/croissant.json`
- Dataset: <https://huggingface.co/datasets/Winniechen2002/TexasPokerRobot>
- GitHub organization: <https://github.com/DexHoldem>
- DexHoldem Policy: <https://github.com/DexHoldem/Dexholdem-Policy>
- Skills runtime: <https://github.com/DexHoldem/DexHoldemSKills>
