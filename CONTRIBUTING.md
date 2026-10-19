# Contributing

Thanks for helping. Issues and pull requests are welcome, from a typo to a new icon.

## Setup

Node.js 18 or later. There are no npm dependencies.

```sh
npm run build   # dist/icons/ plus the generated skill files
npm test        # definitions, exports, skill CLI, build output
npm run serve   # http://localhost:4173/icons/
```

Commit the generated files under `skills/lucian-icons/` (`code/` and `catalog.json`) together with the source change. CI fails when they are out of date. `dist/` is not committed.

## Icons

Icons live in `src/icons/<category>.js` and use the helpers in `src/icons/_kit.js`.

- Draw on the 24-unit grid with round caps and joins. Strokes stay `currentColor`; color goes on the classes `s` (tinted surface), `t` (tinted surface without a stroke), `a` (accent stroke), `f` (small solid detail) and `k` (ink fill). `e` is reserved for error marks and `y` for the mountain's sun.
- Every icon needs a bilingual name and description (Korean and English), at least three keywords and a hover effect.
- Add states only when they mirror real application state (on/off, unread, locked, progress). Give every state a label in both languages.
- Check the icon at 16, 24 and 48 pixels, in both themes and with reduced motion.
- No SVG `id`s, scripts, event attributes or external URLs. All drawings must be original.

## Browser QA

Changes to the runtime, gallery or guide should pass the browser checks. They need `playwright-core` and Chrome, with `npm run serve` running:

```sh
PLAYWRIGHT_CORE=/path/to/node_modules/playwright-core node tests/browser.mjs
```

## Pull requests

Keep one change per pull request and describe what you checked. By contributing you agree that your work is released under the [MIT license](LICENSE).
