# Reflex walkthrough article

`index.svelte` is the article at `/blog/reflex-under-the-hood`. Its module exports the
metadata used by the blog index, tags, related posts, social metadata, and sitemap.
`layout: 'interactive'` lets the post own its full-width layout beneath the site navigation.

- `MotionFigure.svelte` — the six animated figures: playback, seeking, and packet inspectors.
- `diagram.ts` — SVG geometry for those figures.
- `explorer.ts` — the click stepper and recorded-frame selector.
- `TableOfContents.svelte` — chapter navigation and active-section tracking.
- `diagrams.json` — phase descriptions and compilation excerpts.
- `captures.json` — recorded Socket.IO messages (IDs redacted).
- `walkthrough.css` — styles scoped to `.reflex-walkthrough`.

Captures and generated code come from the `examples/flow_lab` app in a Reflex 0.9.10 checkout.
