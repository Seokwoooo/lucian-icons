# Lucian Icons

**211 original animated SVG icons.** Each one has its own color, a hover effect and, where it means something, real states your app controls: a heart that fills, a bell with unread mail, a download that shows measured progress. Dependency-free web components, MIT licensed, with an agent skill for Claude Code and Codex.

[Gallery](https://lucianlabs.dev/icons/) · [API guide](https://lucianlabs.dev/icons/guide.html) · [Changelog](CHANGELOG.md) · [Contributing](CONTRIBUTING.md)

## Three ways to use it

1. **Paste a prompt.** Click any icon in the [gallery](https://lucianlabs.dev/icons/). Its prompt opens first: the icon's code plus integration steps, ready to paste into your AI coding tool.
2. **Let the agent skill do it.** Install the [skill](#agent-skill) and ask for "icons that fit this screen", or name the number shown in the gallery: "add icon 197".
3. **Add it yourself** with one script tag, as below.

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

Attributes: `state`, `size` (8–512, default 24), `tone` (`color` | `line`), `accent` (CSS color), `weight` (0.5–3, default 1.75), `progress` (0–100), `label`, `animate` (`hover` | `click` | `none`). CSS variables: `--li-accent`, `--li-tint`, `--li-size`, `--li-weight`. Strokes follow `currentColor`. On pages that declare `color-scheme: dark`, surfaces are painted solid in a slightly deeper, richer version of each icon's color so they stay clean on dark backgrounds.

52 icons have states (heart `off/on`, bell `idle/unread`, download `idle/progress/success/error`, ...). The other 159 only play an effect. The full list is in the [API guide](https://lucianlabs.dev/icons/guide.html#states) and the [catalog](https://lucianlabs.dev/icons/catalog.json).

For production, copy `modules/<id>.js` and `modules/runtime.js` into your project (or use the skill CLI below) so the version is pinned. Each icon has its own shadow root, no SVG IDs, no document listeners or timers, and honors `prefers-reduced-motion`.

Upgrading from 1.x is a breaking change: see [the migration table](skills/lucian-icons/references/migration.md).

## Agent skill

Install from GitHub with the skills CLI (Node.js 22.20+):

```sh
npx skills add Seokwoooo/lucian-icons --skill lucian-icons
```

Choose your agent and installation scope when prompted. Alternatively, download the skill ZIP from the [gallery](https://lucianlabs.dev/icons/), or copy [`skills/lucian-icons`](skills/lucian-icons) from this repository:

| Tool | Project | User | Invoke |
| --- | --- | --- | --- |
| Claude Code | `.claude/skills/lucian-icons/` | `~/.claude/skills/lucian-icons/` | `/lucian-icons` |
| Codex | `.agents/skills/lucian-icons/` | `~/.agents/skills/lucian-icons/` | `$lucian-icons` |

Then ask in words, in Korean or English:

- "lucian-icons로 이 화면에 어울리는 아이콘 넣어줘" / "Use lucian-icons to add icons that fit this screen": the agent picks icons for your existing buttons and wires them to real state.
- "lucian-icons로 197번 아이콘 넣어줘" / "Use lucian-icons to add icon 197": every icon shows its number in the gallery (197 is the heart).

The skill works offline and reads only the icons it picks. Its CLI needs Node.js 18 or later:

```sh
node skills/lucian-icons/scripts/lucian-icons.mjs search 다운로드
node skills/lucian-icons/scripts/lucian-icons.mjs get 197          # gallery number or id
node skills/lucian-icons/scripts/lucian-icons.mjs get download --out ./src/vendor/lucian-icons
```

## Develop

Node.js 18 or later. No npm dependencies.

```sh
git clone https://github.com/Seokwoooo/lucian-icons.git
cd lucian-icons
npm run build      # dist/icons/ and skills/lucian-icons/{code,catalog.json}
npm test           # definitions, exports, skill CLI, build output
npm run serve      # http://localhost:4173/icons/
```

Icons are authored in `src/icons/<category>.js` with helpers from `src/icons/_kit.js`: a 24-unit SVG drawing with `data-part` groups, per-state `poses`, `transitions`, looping states, and a hover `effect`. `src/runtime/icon.js` turns a definition into a custom element using the Web Animations API with spring easing. The gallery lives in `web/`.

Browser QA (gallery, guide, runtime, widths 320–1440) needs `playwright-core` and Chrome, with the preview server running:

```sh
PLAYWRIGHT_CORE=/path/to/node_modules/playwright-core node tests/browser.mjs
```

Icon rules and pull requests: [CONTRIBUTING.md](CONTRIBUTING.md). Maintainers deploy `dist/icons/` to `/icons/` of lucianlabs.dev; see [docs/deployment.md](docs/deployment.md).

## License

[MIT](LICENSE), Copyright (c) 2026 Lucian. All drawings are original. The gallery's fonts, Pretendard and Geist Mono, use the SIL Open Font License; see [notices](web/THIRD_PARTY_NOTICES.txt). No tracking scripts, no external icon package, no animation library.

The Lucian and lucianLabs names, Loop L logo, and related brand artwork are reserved brand assets, excluded from the icon library’s MIT grant. The software license grants no trademark rights. See [the brand notice](TRADEMARKS.md). Logo source files and branded images are not bundled in this repository. The official gallery references the logo hosted separately on lucianlabs.dev. Website source ZIPs are no longer distributed; use the icon modules, individual exports or agent skill.
