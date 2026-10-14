# Integration API

Import just `code/download.js` and its sibling `runtime.js`. Every icon module registers its element idempotently and exports its `definition`. Registration does not install click handlers or timers.

```html
<script type="module" src="./vendor/lucian-icons/download.js"></script>
<button id="export-report" type="button">
  <lucian-download size="24" state="idle"></lucian-download>
  <span>Export report</span>
</button>
```

Keep the existing operation handler. Update the element when that handler's actual state changes. Use `setState('progress')` while pending, `setProgress(percentage)` only from measured progress, `setState('success')` on real resolution, `setState('error')` on real rejection. The element never mutates a parent button's label, disabled state or ARIA. The app owns them. On cancellation use `idle` and preserve the app's cancellation behavior.

Attributes: `state`, `size` (16 to 256 CSS pixels), `accent`, `ink`, `paper` (six-digit hex colors), `progress` (0 to 100, download only), `label` (optional accessible name). Unknown states fall back to the default when set as an attribute; `setState` rejects them with RangeError. Invalid colors/sizes use defaults. A progress value of 100 does not imply success.

The default icon is `aria-hidden` inside its shadow root. Button labels remain visible and accessible. A meaningful standalone icon must use `label="localized description"`. Toggle controls retain their own `aria-pressed` or `aria-expanded`, download controls retain live status text and busy/disabled behavior.

The catalog lists supported states and demonstration triggers. Triggers are adapters in your application, not automatic behavior. Trash opening never deletes a record. Folder opening follows disclosure state. Lock follows actual lock state. Bell's `ringing` state plays one finite ring, ending at rest. Reset to `idle` before a later notification. Heart and bookmark use `on` and `off`. Search uses `searching` and `idle`. Power uses `on` and `off`.

Each element owns an isolated shadow root. No SVG IDs, global selectors, document listeners, timers, or animation runtime. Same-name custom element registration is idempotent; import one version per page. Different versions with the same tag do not override an existing registration. Inspect `VERSION` in runtime.js before combining copies.

For React, load the module on the client, render the custom element in the existing button, and synchronize its attributes from state or call the API through a ref in an effect. In Vue configure `isCustomElement` for the chosen `lucian-*` tag, or port SVG/CSS into the existing component. Svelte and plain HTML can use the custom element directly. In SSR frameworks register only in client execution. Preserve actual event handlers and remove any listeners your adapter adds on cleanup. Do not copy the gallery or its demo handlers.

If adapting colors from CSS variables, resolve them to six-digit hex values in your framework or port the isolated SVG variables. The current public attribute API does not accept arbitrary CSS expressions. Check both themes. Reduced motion removes motion while retaining fill, state and progress.

Static SVG downloads freeze the selected state and palette. They do not contain a click interaction. Standalone HTML includes runtime and explicit demonstration controls and works from file:// without fetching scripts. The application prompt includes only the selected icon plus this distinction.
