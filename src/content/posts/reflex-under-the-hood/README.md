# Reflex walkthrough article

`index.svelte` is the complete article at `/blog/reflex-under-the-hood`. Its module
exports the metadata used by the existing blog index, tags, related posts, social
metadata, and sitemap. `layout: 'interactive'` lets the post own its full-width
reading layout beneath the site's navigation.

The article is server-rendered Svelte markup, including all original chapters and
source excerpts. `MotionFigure.svelte` owns the six figures' playback, seeking,
phase explanations, and packet inspectors. `diagram.ts` preserves the original
SVG geometry, while `explorer.ts` mounts the click explorer and transcript selector.
`TableOfContents.svelte` owns the responsive chapter navigation and active-section tracking.
Every observer, document listener, and animation frame is
cleaned up when the reader leaves the post.

`diagrams.json` contains the original phase descriptions and compilation excerpts;
`captures.json` contains the unchanged recorded messages. `walkthrough.css` scopes
the source article's styling to `.reflex-walkthrough` so it cannot restyle other
pages. There is no iframe, separate HTML page, or live Reflex backend dependency.

Converted from `reflex/examples/flow_lab/assets/walkthrough.html` in the sibling
checkout. The original source file is unchanged. The recorded version notes remain
in the article; update them alongside the evidence when revising the walkthrough.
