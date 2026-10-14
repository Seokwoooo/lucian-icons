# Lucian Icons design and implementation brief

Goal: ship ten original interactive SVG icons, an immediate hands-on gallery at https://lucianlabs.dev/icons/, independent exports, and the lucian-icons agent skill. Public deployment and a new GitHub repository are explicitly authorized by the user.

Observed reference: the live introducing page was scrolled in Chromium at desktop and mobile sizes. Its CSS defines ink #171a19, muted #5f6561, night #08090d, cream #f4f0e8, violet #b7a4ff; typography is Pretendard Variable, headings tight at -.045em, wide content (1313px at 1440), pill actions, numbered editorial sections. Preserve these values and the lime accent without duplicating its long scroll-controlled introduction. First screen is immediately usable. No separate introducing page is needed.

Architecture: dependency-free static HTML, CSS and ES modules, matching the source gallery's Node-only approach. Catalog entries and original drawings live in src/icons/*.json. The build derives gallery catalog, per-icon modules, static SVG, independent HTML, selected-code payloads, and the skill's lightweight catalog from these files. No animation dependency.

Each icon uses a 48-unit canvas, 2-unit rounded strokes, deliberate filled planes and sparse details. Begin with trash, folder and lock; inspect at 24/32/48 pixels before adding envelope, bell, heart, bookmark, download, search, power. Each object has distinct articulated motion.

Runtime: one Shadow DOM custom element per icon type, registered idempotently. state is controlled by the app, not a business event listener. setState, setProgress and declarative attributes update only the visual. No synthetic success timers. Explicit demo controls live outside production components. SVGs contain no IDs. Attribute validation, immediate reversals and disconnect/reconnect are test requirements.

Gallery: dark editorial hero with three usable icons, ten-icon searchable grid and a dedicated accessible dialog. Korean/English names, states, trigger, size, accent, background, static SVG, standalone animated HTML, code and application prompt. UI examples use separate demo actions clearly labeled as simulations. Theme and language persist where storage works. Clipboard failure opens a selectable textarea.

Skill: installed folder skills/lucian-icons. Search reads catalog only, get reads only selected modules with runtime, tokens and version hashes. Existing functionality, labels, event handlers and real app state are preserved. CLI and sample project tested separately from agent-runtime execution claims.

Deployment: /icons/ currently returns a Vercel 404. No root hosting repository or Vercel credentials have yet been identified. GitHub createRepository failed with integration permission error. Request missing source access while implementation proceeds. Never overwrite /icons/ if it becomes occupied. Preserve root and existing uxui paths. New source repo Seokwoooo/lucian-icons requested by user.

License: original work MIT (c) 2026 Seokwoooo. Existing UX/UI source is MIT. Font usage retains separate SIL OFL notice. No original third-party icon paths reused. No tracking.
