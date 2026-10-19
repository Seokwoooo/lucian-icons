# Integration API (v2.0.8)

Import just the chosen module, for example `code/download.js`, with its sibling `runtime.js`. Every module registers `<lucian-ID>` idempotently and exports its `definition`. Registration installs no document listeners or timers.

```html
<script type="module" src="./vendor/lucian-icons/download.js"></script>
<button id="export-report" type="button">
  <lucian-download state="idle"></lucian-download>
  <span>Export report</span>
</button>
```

## Attributes

| Attribute | Values | Notes |
| --- | --- | --- |
| `state` | per icon (see catalog `states`) | Unsupported values fall back to `defaultState`. |
| `size` | 8–512, default 24 | CSS pixels. `--li-size` also works. |
| `tone` | `color` (default), `line` | `line` draws everything in `currentColor`. |
| `accent` | CSS color | Replaces the icon's own color. Same as CSS `--li-accent`. The mountain's sun stays yellow. |
| `weight` | 0.5–3, default 1.75 | Stroke width on the 24 grid. `--li-weight` also works. |
| `progress` | 0–100 | Download, upload and battery only. |
| `label` | text | Adds `role="img"` and an accessible name. Omit for decorative icons. |
| `animate` | `hover` (default), `click`, `none` | When the effect plays. State transitions always animate. |

CSS variables: `--li-accent`, `--li-tint` (surface fill opacity, default .24), `--li-size`, `--li-weight`. Strokes always follow `color`.

Dark pages: when the page (or any ancestor) declares `color-scheme: dark`, surfaces are painted solid in a slightly deeper, richer version of the icon color instead of a thin tint, and accent details get lighter. Icons whose state fills the shape (heart, star, bookmark, thumbs up, toggle, filter, bulb, lamp) are just an outline when off, so off and on stay distinct. `--li-tint` still scales the surface (0 removes it). Keep the site's existing `color-scheme`; add `color-scheme: dark` to its dark theme if it is missing. Browsers without `light-dark()` and relative colors keep the light rendering.

## Methods

- `setState(name)`: throws `RangeError` for unsupported names.
- `setProgress(n)`: clamps to 0–100; throws `TypeError` on icons without progress.
- `play()`: plays the effect once; returns `false` if one is running or reduced motion is on.
- `next()`: advances to the next state and returns it; stateless icons play their effect and return `null`. Meant for demos, not for production state.
- Read-only `state`, `states`, `definition`.

## Real state

Keep the existing operation handler and update the element when the actual state changes. For download/upload use `setState('progress')` while pending, `setProgress(percentage)` only from measured progress, `setState('success')` on real resolution, `setState('error')` on real rejection, `idle` on cancellation. Progress 100 does not imply success. For battery, `level` shows the measured charge through `setProgress`; `charging` follows the real charging flag.

The element never mutates a parent button's label, disabled state or ARIA; the app owns them. Toggle controls keep their own `aria-pressed` or `aria-expanded`; download controls keep live status text and busy/disabled behavior. Typical mappings: heart, star, bookmark, thumbsup, toggle use `off`/`on` with `aria-pressed`; bell uses `unread` while unread notifications exist and `idle` otherwise; lock follows the actual lock; trash and folder `open` follow disclosure or a confirmation step, never deletion itself; copy shows `copied` only after the clipboard write resolves, then returns to `idle`.

Looping states (phone `ringing`, refresh `loading`, cloud `syncing`, fingerprint `scanning`, chat `typing` and similar) loop only while active and finish their cycle on exit. Change state to stop them; do not remove the element.

## Behavior

- Hover effects bind to the nearest `button`, `a[href]`, `summary`, `label` or ARIA control role, and to keyboard `:focus-visible`. Touch plays on press. Listeners are removed on disconnect.
- Effects compose on top of the current state. State changes interrupted mid-flight continue from the rendered pose.
- `prefers-reduced-motion: reduce` removes motion while keeping the final pose, colors and progress.
- Each element owns a shadow root: no SVG IDs, no global selectors. Duplicates are safe. Same-name registration is idempotent; import one runtime version per page and check `VERSION` in `runtime.js` before combining copies.

## Frameworks

React: load the module on the client, render the custom element inside the existing button, and pass `state` from props or call methods through a ref in an effect. React 19 forwards attributes to custom elements. In TypeScript declare the tag in `JSX.IntrinsicElements`. Vue: configure `isCustomElement: tag => tag.startsWith('lucian-')`. Svelte and plain HTML use the element directly. In SSR frameworks register only in client execution. Preserve actual event handlers and remove any listeners your adapter adds on cleanup. Do not copy the gallery or its demo handlers.

## Exports

Static SVG downloads freeze the selected state and color, with no interaction. Standalone HTML inlines the runtime and works from file://. The application prompt contains only the selected icon plus these rules.
