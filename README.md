# Lucian Icons

211 original animated SVG icons. Each one has its own color, a hover effect and, where it means something, real states your app controls. Dependency-free web components, MIT licensed, with a portable Claude Code and Codex skill.

Gallery: https://lucianlabs.dev/icons/ · API guide: https://lucianlabs.dev/icons/guide.html

Source: https://github.com/Seokwoooo/lucian-icons (currently private). Source and skill packages are downloadable from the gallery.

## Use

```html
<!-- every icon -->
<script type="module" src="https://lucianlabs.dev/icons/all.js"></script>
<!-- or one icon (loads its sibling runtime.js) -->
<script type="module" src="https://lucianlabs.dev/icons/modules/heart.js"></script>

<button type="button" aria-pressed="false">
  <lucian-heart></lucian-heart>
  <span>Like</span>
</button>
```

The icon plays its effect when its nearest button or link is hovered or focused. Icons with states follow your app:

```js
icon.setState('on');          // RangeError for unsupported states
download.setProgress(42);     // download, upload, battery: measured progress only
icon.play();                  // effect once
```

Attributes: `state`, `size` (8–512, default 24), `tone` (`color` | `line`), `accent` (CSS color), `weight` (0.5–3, default 1.75), `progress` (0–100), `label`, `animate` (`hover` | `click` | `none`). CSS variables: `--li-accent`, `--li-tint`, `--li-size`, `--li-weight`. Strokes follow `currentColor`. On pages that declare `color-scheme: dark`, surfaces switch to solid, slightly deeper colors so they stay clean on dark backgrounds.

52 icons have states (heart `off/on`, bell `idle/unread`, download `idle/progress/success/error`, ...). The other 159 only play an effect. The full list is in the [API guide](https://lucianlabs.dev/icons/guide.html#states) and the [catalog](https://lucianlabs.dev/icons/catalog.json).

For production, copy `modules/<id>.js` and `modules/runtime.js` into your project (or use the skill CLI below) so the version is pinned. Each icon has its own shadow root, no SVG IDs, no document listeners or timers, and honors `prefers-reduced-motion`.

Upgrading from 1.x is a breaking change: see [the migration table](skills/lucian-icons/references/migration.md).

## Agent skill

Copy `skills/lucian-icons` to `.claude/skills/lucian-icons/` (Claude Code) or `.agents/skills/lucian-icons/` (Codex), or download the skill ZIP from the gallery. User-wide paths are `~/.claude/skills/lucian-icons/` and `~/.agents/skills/lucian-icons/`. Invoke `/lucian-icons ...` in Claude Code or `$lucian-icons ...` in Codex.

```sh
node skills/lucian-icons/scripts/lucian-icons.mjs search 다운로드
node skills/lucian-icons/scripts/lucian-icons.mjs get download --out ./src/vendor/lucian-icons
```

## Develop

Node.js 18 or later. No npm dependencies.

```sh
npm run build      # dist/icons/ and skills/lucian-icons/{code,catalog.json}
npm test           # definitions, exports, skill CLI, build output
npm run serve      # http://localhost:4173/icons/
```

Icons are authored in `src/icons/<category>.js` with helpers from `src/icons/_kit.js`: a 24-unit SVG drawing with `data-part` groups, per-state `poses`, `transitions`, looping states, and a hover `effect`. `src/runtime/icon.js` turns a definition into a custom element using the Web Animations API with spring easing. The gallery lives in `web/`.

Browser QA (gallery, guide, runtime, widths 320–1440) needs `playwright-core` and Chrome, with the preview server running:

```sh
PLAYWRIGHT_CORE=/path/to/node_modules/playwright-core node tests/browser.mjs
```

`dist/icons/` is served at `/icons/` of the existing site through scoped rewrites; see [docs/deployment.md](docs/deployment.md). Never deploy it over the root site.

## License

[MIT](LICENSE), Copyright (c) 2026 Lucian. All drawings are original. Pretendard uses the SIL Open Font License; see [notices](web/THIRD_PARTY_NOTICES.txt). No tracking, no external icon package, no animation library.
