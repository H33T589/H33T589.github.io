# AGENTS.md

## Project Context

This repository powers Heet Patel's personal portfolio site.

The recent revamp intentionally moved the site away from a generic "product shipper" or startup-founder persona and toward a more honest student portfolio identity:

- AI and cognitive systems are the center of gravity.
- Quantum computing remains a clear long-term bet.
- Rust can still appear as an interest in projects or tooling, but it should not dominate the personal framing unless explicitly requested.
- The tone should feel thoughtful, student-core, technically ambitious, and presentable.

## Current Positioning

The site should read like:

- SFU student exploring AI, cognitive systems, and computational models of learning
- interested in neural networks, perception, language, and intelligent systems
- optimistic about quantum computing
- curious, experimental, and early-stage without overclaiming expertise

Avoid pushing the voice back toward:

- "secure terminal"
- "systems hacker"
- "startup operator"
- vague "shipping" identity with no connection to the actual work

## Visual Direction

The design language is intentionally:

- light, editorial, and slightly academic
- warm neutrals with green and earth accents
- photo-led, with a polished but personal student feel
- expressive typography rather than default SaaS styling

Do not revert the site to:

- dark cyberpunk aesthetics
- heavy neon/glow terminal UI
- generic app-landing-page layouts

## Photo Usage

The current hero composition uses:

- `public/images/img2.webp` as the primary hero portrait
- `public/images/img1.webp` as the secondary candid frame
- `public/images/img3.webp` as the accent portrait

These should stay integrated as an editorial composition, not a plain gallery.

## GitHub Activity Section

The GitHub section is meant to show real public commit activity in a way that feels closer to GitHub's contribution view.

Current intent:

- discover all owned public repositories for `H33T589`
- count public commits authored by `H33T589` over the last 365 days
- show large summary numbers clearly
- show active days and streak-style metrics
- render a contribution heatmap
- show the top repositories by commit count

Important nuance:

- this section is commit-focused, not a perfect clone of GitHub profile contributions
- GitHub profile totals may differ because GitHub also counts pull requests, issues, reviews, and optionally private contributions
- commit attribution also depends on Git author identity being connected to the GitHub account

Current product decision:

- keep the GitHub activity code in the repository
- hide the section in the live UI for now
- the section should stay hidden until there is stronger public contribution data worth showing
- visibility is controlled in `src/data/site.js` via `githubSection.enabled`

If this section is modified later, preserve clarity about what is being counted.

## Contact Section

The current contact section was intentionally simplified.

Decision:

- keep contact
- keep it simple
- do not bring back the terminal-contact gimmick unless explicitly requested

The contact area should feel easy to use and credible:

- email
- GitHub
- LinkedIn

## Content Source of Truth

Most copy and structured content lives in:

- `src/data/site.js`

Core rendering and dynamic wiring:

- `src/render.js`
- `src/main.js`
- `src/features/githubActivity.js`

Styling:

- `src/styles/main.css`

## Editing Guidance

When making future changes:

- preserve the student/AI/cognition framing
- keep quantum computing visible as an important interest
- prefer honest specificity over inflated claims
- avoid "vibe-coded" gimmicks that make the site feel unserious
- keep the projects section compatible with the existing project cards unless intentionally redesigning them

## Verification

Standard verification:

- run `npm run build`
- if preview is needed, run `npm run preview -- --host 127.0.0.1 --port 4173`
