---
name: lucian-icons
description: Use when the user requests Lucian Icons, lucian-icons, original animated SVG icons with their own colors, or asks to replace website icons with Lucian Icons. Also use for wiring icon states such as unread bells, open trash lids, lock states, copy confirmation or download/upload progress when the user names this library. Not for redesigning the whole page or implementing backend operations.
---

# Lucian Icons

Original animated SVG icons, version 2.0.5, MIT. 211 icons in 13 categories. Gallery: https://lucianlabs.dev/icons/. API guide: https://lucianlabs.dev/icons/guide.html.
This installed package works offline. `<skill-dir>` is the folder containing this file. Node.js 18 or later runs the CLI; no package installation is needed.

1. Inspect the target project, its framework, theme, icon locations, existing labels and event handlers. Identify the real source of state and confirm the intended insertion point from the task.
2. Search the lightweight catalog in English or Korean. Results include each icon's color, category and states:
   `node <skill-dir>/scripts/lucian-icons.mjs search 다운로드`
3. Retrieve only chosen icons, with versions and integrity hashes:
   `node <skill-dir>/scripts/lucian-icons.mjs get download`
   To copy runtime and chosen modules to a new project directory:
   `node <skill-dir>/scripts/lucian-icons.mjs get download --out ./src/vendor/lucian-icons`
   The command refuses existing files. Read existing versions before updating. When adding another icon to an existing directory, use `get` to inspect it, compare the shared runtime `VERSION`, and add only the new module. Do not print or load every icon's source.
4. Read [the porting guide](references/porting.md) for the API and framework lifecycle rules. Preserve the drawing, poses and timing. Import the selected module with its sibling `runtime.js`. Strokes follow `currentColor`; surfaces and details use the icon's own color. Map a brand color through `--li-accent` or `accent`, and use `tone="line"` where the design is monochrome. The component is decorative by default; preserve the existing button text and accessible name. For standalone meaning, supply a localized `label`. Keep focus, keyboard behavior, forms and disabled states. Put the icon inside the existing control, never a nested button.
5. Icons with states mirror real application state: call `icon.setState(state)` when that state actually changes, and `icon.setProgress(percent)` only for download, upload and battery. A click is not a successful operation. Follow the existing Promise, observable or framework state. Set success only when it resolves, error when it rejects; preserve cancellation. If the source reports no measured progress, stay in `progress` without inventing numbers. Icons without states only play a hover/focus effect; do not invent states for them. Gallery demos and timers are not production adapters.
6. Test keyboard/touch, both themes, reduced motion, rapid opposite input, duplicate icons, unmount/reinsert, and actual failure. Keep MIT notices. Report changed files, chosen IDs and versions, preserved behavior, completed checks and checks not run.

Upgrading from 1.x: read [the migration table](references/migration.md). `ink` and `paper` attributes are gone, and many state names changed or were removed.

See [a runnable integration](examples/download.html). It uses explicitly labeled user-controlled Promise resolution to verify pending, success and failure without a timer.

Install instructions: [INSTALL.md](INSTALL.md). Catalog and code are generated from the same definitions as the gallery. To upgrade, download a release package and inspect its version and hashes before replacing local code.
