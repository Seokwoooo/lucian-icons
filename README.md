# Lucian Icons

112 original interactive SVG icons. Small motions, thoughtful details. Dependency-free, MIT licensed, with a portable Claude Code and Codex skill.

Gallery: https://lucianlabs.dev/icons/

Source: https://github.com/Seokwoooo/lucian-icons (currently private). Public source and skill packages are available from the gallery without GitHub access.

## Icons

| Icon | States and motion |
| --- | --- |
| Trash | closed / open, right-hinged lid |
| Folder | closed / open, folding front and revealed paper |
| Envelope | closed / open, flap and rising letter |
| Lock | locked / unlocked, articulated shackle |
| Bell | idle / ringing, one decaying pendulum ring |
| Heart | off / on, fill and short beat |
| Bookmark | off / on, fill and saved mark |
| Download | idle / progress / success / error, real progress API |
| Search | idle / searching, a short lens sweep |
| Power | off / on, split ring and stem fill |
| Mouse click | idle / pressed, left button press and click rays |
| Cursor | idle / pressed, pointer fill and click rays |

## Build and preview

Node.js 18 or later. No npm dependencies.

```sh
node scripts/build.mjs
npm test
python -m http.server 4173 -d dist
```

Open http://localhost:4173/icons/. The output is `dist/icons/`; it is intended to be added to an existing site's `/icons/` directory. It does not replace root routes, install a service worker, or change DNS. Do not publish it over an occupied path.

Browser QA uses Python Playwright and an installed Chromium (`/usr/bin/chromium` by default). Run `python tests/gallery.py`, `python tests/runtime.py`, and `python tests/acceptance.py` with the preview server running. `TEST_URL` can select a deployed base URL.

## Gallery autoplay

All previews that are at least 90 percent in view play concurrently, each with an approaching cursor and click indicator. Pause or resume from the header or collection controls. The choice is saved locally. Direct interaction stops only the touched preview until autoplay is re-enabled. Hidden tabs, offscreen previews and an open inspector stop their demos. Reduced motion disables autoplay while keeping manual state controls. These gallery timers are never included in exported icons or the skill. Search English/Korean keywords and filter by category.

The catalog contains 112 icons across files, communication, people, security, navigation, editing, media, devices, commerce and everyday objects. Use the [live catalog](https://lucianlabs.dev/icons/catalog.json) or the offline skill search to find every ID and its supported states. The table above lists the original 12.

Motion QA: `python tests/autoplay.py`, `python tests/motion-regression.py`, and `FRAME_OUT=.artifacts/motion-after python tests/motion-frames.py`. The frame script captures forward and reverse transitions at 60fps and readable contact sheets.

## Use one icon

Copy only the chosen module from `dist/icons/modules/` plus sibling `runtime.js` and LICENSE, or use the skill CLI:

```sh
node skills/lucian-icons/scripts/lucian-icons.mjs search download
node skills/lucian-icons/scripts/lucian-icons.mjs get download --out ./vendor/lucian-icons
```

```html
<script type="module" src="./vendor/lucian-icons/download.js"></script>
<button type="button">
  <lucian-download state="idle" size="24"></lucian-download>
  <span>Export report</span>
</button>
```

Drive `setState('progress'|'success'|'error'|'idle')` and `setProgress(percent)` from actual app events. A click never implies success. No business operation or timer is built into the icon. Preserve existing labels, disabled state, event handlers and accessibility. Meaningful standalone icons can set `label`.

Each icon has Shadow DOM isolation, no SVG IDs, scoped CSS and reduced motion support. State attributes are validated. One runtime version per page. Gallery controls are explicitly demos.

## Install lucian-icons

Copy `skills/lucian-icons` to `.claude/skills/lucian-icons/` (Claude Code) or `.agents/skills/lucian-icons/` (Codex). User-wide paths are `~/.claude/skills/lucian-icons/` and `~/.agents/skills/lucian-icons/`.

Invoke `/lucian-icons ...` in Claude Code or `$lucian-icons ...` in Codex. See [installation](skills/lucian-icons/INSTALL.md) and [API guide](skills/lucian-icons/references/porting.md).

Build outputs include the portable skill ZIP, complete source ZIP, per-icon static SVGs, standalone interactive HTML files, a lightweight API catalog and content hashes. The source definitions in `src/icons/` generate both the gallery and skill data. Generated files inside `skills/lucian-icons/code/` and catalog.json are committed so a repository installation works without building.

## License

[MIT](LICENSE), Copyright (c) 2026 Lucian. Retain this notice in redistributed code. Pretendard uses the SIL Open Font License; see [notices](web/THIRD_PARTY_NOTICES.txt). No external icon package, tracking script, or animation runtime.
