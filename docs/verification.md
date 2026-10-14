# Verification record

Date: 2026-10-14 UTC. Local release 1.0.0. Product path `/icons/`.

## Passed locally

- Node build: 10 definitions, 61 emitted files, catalog and module SHA-256 hashes.
- Node tests: 5 passed. Selected SVG settings, standalone export, scoped embeddable code, CLI search/retrieval/version, refusal to overwrite existing project files.
- Chromium acceptance: all 10 icons, every supported state at 24/32/48 CSS pixels, 60 rapid state changes per icon, opposite state input, invalid attributes, duplicate instances, remove/reinsert.
- Download progress remains progress after 100 percent and a 1.2 second wait; invalid states rejected.
- Keyboard opening and Escape closing of native dialog; focus controls; touch-capable UI without hover.
- Search in Korean and English, no-results state, selected color and size, both themes and languages at widths 320, 390, 768 and 1440 without horizontal overflow.
- Reduced motion disables motion but retains the selected fill and state.
- Clipboard denial produces selected manual-copy text without a success notification.
- Two copied HTML snippets and mixed icon snippets operate independently, including distinct settings. No top-level declaration, CSS or SVG ID collisions.
- Static SVG export preserves selected state, size and palette with no CSS variables or SVG IDs.
- Twelve isolated HTML executions (ten generated plus copied and downloaded selection) have no script imports or external resource requests.
- Promise example: pending, real resolution, real rejection and cancellation follow the actual Promise.
- Both ZIP archives pass zip integrity checks; all 61 local manifest URLs return 200 with correct byte lengths.
- Gallery and inspector page errors: zero. Failed gallery requests: zero.
- axe-core 4.10.3 WCAG 2 A/AA and 2.1 AA scans: zero violations in light gallery, dark gallery and open inspector. This is automated evidence, not a claim of complete accessibility certification.
- Small inspector samples match selected preview background and palette.
- Independent agent applied the installed skill to a separate sample: only download.js, runtime.js and LICENSE retrieved; 12 checks passed including 48 repeat inputs producing one pending request, keyboard/touch, themes, cancellation and reconnect.
- Independent release review: no P0/P1 findings. One P2 sample-background mismatch was reproduced, fixed and covered by a passing regression.

## Visual evidence

Screenshots in `.artifacts/`: desktop.png, desktop-full.png, desktop-dark-en.png, mobile.png, mobile-full.png, mobile-dark-en.png, detail.png, mobile-detail.png, all-resting.png and all-active.png. These are actual Chromium screenshots of the local build. They are not production screenshots. Reference browser screenshots are stored separately in /workspace/scratch/reference/.

## Production observations

- https://lucianlabs.dev/ -> 200, correct lucianLabs title, no page error.
- https://lucianlabs.dev/uxui-prompt/ -> 200, correct gallery title, no page error.
- https://lucianlabs.dev/uxui-prompt/introducing/ -> 200, correct introduction title, no page error.
- https://lucianlabs.dev/icons/ -> 404. NOT published.
- No existing production source, routing, DNS or deployment was modified.

## Not verified / blocked

- Public `/icons/` deployment, public asset and skill download URLs. Root hosting repository/project and Vercel deployment access are not available in this session.
- New GitHub repository publication. `gh repo create Seokwoooo/lucian-icons --public ...` was denied: `Resource not accessible by integration (createRepository)`. The requested repository remained absent at the last check.
- Direct file:// navigation: Chromium administrator policy returns ERR_BLOCKED_BY_ADMINISTRATOR. Exact downloaded HTML contents were instead loaded into fresh about:blank pages and verified with no network resources. File:// behavior is not claimed as executed.
- Actual installed Claude Code or Codex native runtime invocation. Documentation verified from official sources, CLI/package tested and a separate agent performed a skill-guided sample integration.
- Safari/WebKit, Firefox, physical mobile devices and screen-reader manual audits.

## Re-run

Start `python -m http.server 4173 -d dist`, then:

```
npm test
python tests/runtime.py
python tests/gallery.py
python tests/acceptance.py
python tests/copy-collision.py
python tests/preview-theme.py
```

For hosted acceptance set `TEST_URL=https://your-host/icons/` for gallery.py and acceptance.py. The copy-collision and preview-theme regression scripts currently target the local preview.
