---
name: lucian-icons
description: Use when the user requests Lucian Icons, lucian-icons, original interactive SVG icons, or asks to replace website icons with Lucian Icons. Also use for opening trash lids, folders, lock states, or download progress when the user names this library. Not for redesigning the whole page or implementing backend operations.
---

# Lucian Icons

Original SVG icons, version 1.1.0, MIT. Gallery: https://lucianlabs.dev/icons/.
This installed package works offline. `<skill-dir>` is the folder containing this file. Node.js 18 or later runs the CLI; no package installation is needed.

1. Inspect the target project, its framework, theme, icon locations, existing labels and event handlers. Identify the real source of state and confirm the intended insertion point from the task.
2. Read only the lightweight catalog by searching in English or Korean:
   `node <skill-dir>/scripts/lucian-icons.mjs search 다운로드`
3. Retrieve only chosen icons, with versions and integrity hashes:
   `node <skill-dir>/scripts/lucian-icons.mjs get download`
   To copy runtime and chosen modules to a new project directory:
   `node <skill-dir>/scripts/lucian-icons.mjs get download --out ./src/vendor/lucian-icons`
   The command refuses existing files. Read existing versions before updating. When adding another icon to an existing directory, use `get` to inspect it, compare the shared runtime version, and add only the new module. Read `tokens` only if needed. Do not print or load every icon's source.
4. Read [the porting guide](references/porting.md) for the API and framework lifecycle rules. Preserve the drawing, part transforms and timing. Import the selected module with its sibling `runtime.js`. Map `accent`, `ink`, `paper` to the existing theme. The component is decorative by default; preserve the existing button text and accessible name. For standalone meaning, supply a localized `label`. Keep focus, keyboard behavior, forms and disabled states. Use a span or SVG inside the existing control, never a nested button.
5. Wire visual state to the real application: `icon.setState(state)` and, for download only, `icon.setProgress(percent)`. A click is not a successful operation. Follow the existing Promise, observable or framework state. Set success only when it resolves, error when it rejects; preserve cancellation. If the source reports no measured progress, keep progress at zero and expose an indeterminate status in the existing UI. Do not fabricate progress or completion. Gallery demo cycling and timers are not production adapters.
6. Test keyboard/touch, both themes, reduced motion, rapid opposite input, duplicate icons, unmount/reinsert, and actual failure. Keep MIT notices. Report changed files, chosen IDs and versions, preserved behavior, completed checks and checks not run.

See [a runnable integration](examples/download.html). It uses explicitly labeled user-controlled Promise resolution to verify pending, success and failure without a timer.

Install instructions: [INSTALL.md](INSTALL.md). Catalog and code are generated from the same definitions as the gallery. To upgrade, download a release package and inspect its version and hashes before replacing local code.
