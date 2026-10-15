# Lucian Icons 2.0 design brief

Goal: icons people want to press. 2.0 replaces the 1.x drawings, runtime and gallery after the user found the 1.x design and motion unsatisfying. It keeps all 112 IDs and adds 100 new icons (212 total, 13 categories).

Drawing: 24-unit grid, 1.75 default stroke, round caps and joins, `currentColor` ink strokes. Each icon gets one hue from a 15-step palette (red, coral, orange, amber, yellow, lime, green, teal, cyan, blue, indigo, violet, purple, pink, slate) chosen for its subject. The hue paints a tinted surface (`.s`, `--li-tint` .24 light / .32 dark), accent strokes (`.a`) and small solid details (`.f`). `tone="line"` folds everything into `currentColor` for monochrome interfaces. Every icon reads at 16px; details that do not survive 16px are removed.

Motion: parts are named with `data-part`. A state is a pose per part (rotate, translate, scale, skewX, opacity, draw). Transitions between states use spring curves (snappy, bouncy, smooth, gentle) generated as CSS `linear()` easing, with optional keyframed paths for overshoot and anticipation. Interrupted transitions continue from the rendered values. Hover effects are additive keyframes (`composite: 'add'`), so they work on top of any state. Looping states (ringing, loading, syncing, playing) run only while active and finish their cycle on exit. Reduced motion jumps to the final pose.

States: only where they mirror real application state (on/off, unread, locked, progress, copied). Visual-only 1.x states such as pressed or raised became hover effects. 53 icons have states.

Gallery: same visual language as lucianlabs.dev/uxui-prompt (warm paper, ink type, violet-blue-teal gradient, Pretendard). Four large tiles per row (two on phones), each glowing in its icon's hue. Tiles at least half in view demonstrate themselves: a ghost cursor glides in, triggers the effect and taps through every state, then leaves and repeats. Pointer or focus hands control to the user; the demo resumes 1.4s after they leave. Category chips, search (`/` shortcut), autoplay, tone and theme toggles, KO/EN. The detail dialog previews states and sizes, tone, color, weight, and exports HTML, React, static SVG and an agent prompt. The gallery chrome uses Lucian icons itself.

Distribution: `all.js`, per-icon ES modules with a shared runtime, JSON API, static SVG and standalone HTML downloads, source and skill ZIPs, and the lucian-icons agent skill. Public module paths send `Access-Control-Allow-Origin: *` so the one-line script works from any site.
