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

Full hand-level agent demos are embedded from Bilibili in `index.html` and
`pages/demos.html`.

Compressed policy-bench videos live under `assets/videos/policy-bench/`, with
matching posters under `assets/videos/policy-bench/posters/`. Update
`policyDemoVideos` in `script.js` when adding new demo files or labels.

## Updating Dataset Video Previews

The data demo browser lives at `pages/data-demos.html`. The legacy
`pages/dataset-videos.html` URL keeps the same browser content. It expects one
representative MP4 per RGB camera at:

```text
assets/videos/dataset-samples/<task>/cam0.mp4
assets/videos/dataset-samples/<task>/cam1.mp4
assets/videos/dataset-samples/<task>/cam2.mp4
```

Generate those previews from the compact one-episode-per-task subset:

```bash
python scripts/generate_dataset_video_previews.py --tasks all
```

## Key Resources

- Paper placeholder: `assets/papers/paper.pdf`
- Teaser: `assets/images/teaser.png`
- Policy rollout snapshots: `assets/images/trajectory-*.png`
- Skills state captures: `assets/images/skills-state-*.jpg`
- Detail pages: `pages/agent.html`, `pages/authors.html`, `pages/data.html`, `pages/data-demos.html`, `pages/demos.html`, `pages/dataset-videos.html`, `pages/policy.html`, `pages/policy-demos.html`, `pages/system.html`
- Croissant metadata: `assets/data/croissant.json`
- Dataset: <https://huggingface.co/datasets/Winniechen2002/TexasPokerRobot>
- GitHub organization: <https://github.com/DexHoldem>
- DexHoldem Policy: <https://github.com/DexHoldem/Dexholdem-Policy>
- Skills runtime: <https://github.com/DexHoldem/DexHoldemSKills>
