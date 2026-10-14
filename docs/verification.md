# Verification record

Date: 2026-10-14 UTC. Product path `/icons/`.

## Release 1.1.0 checks

- Added mouse click and cursor icons, now 12 definitions from the same catalog. New source and skill archives use version 1.1.0; original 1.0.0 archive URLs are preserved.
- Gallery autoplay uses one visible preview at a time, a decorative cursor and click ripple, two synchronized pause controls and a saved preference. Direct input wins. Inspector, hidden-tab, offscreen and reduced-motion checks passed. No autoplay code is included in the runtime or exported icons.
- Download symbols fade out before the next symbol appears. Every pair of its four states, including 48 mid-transition reversals, was sampled at 60fps without overlapping glyphs. Progress contrast was increased for small light-theme previews.
- Envelope opening stages the flap before the letter; the nested viewport clips the letter inside the envelope. Folder skew and protruding lower paper edge were removed. Lock keyhole stays fixed while its shackle opens.
- Captured 98 animation frames before and 98 after the fixes, with forward and reverse contact sheets. Inspected keyframes and all 12 icons at 24/32/48px in both themes. Evidence: `.artifacts/motion-before/`, `.artifacts/motion-after/`, `.artifacts/small-resting.png`, `.artifacts/small-active.png`.
- Node tests: 5 passed. Browser acceptance: 12 icons, all states/sizes, rapid inputs, duplicate instances, remove/reinsert, 14 independent HTML executions, 72 asset URLs, both languages/themes and widths 320/390/768/1440 passed. Zero page errors or HTTP errors.
- WCAG 2 A/AA and 2.1 AA automated scans: zero violations in light gallery, dark gallery and inspector.
- Git-triggered production deployment `dpl_3xt39sXbRfX6Z4GFGqPsr6ThWAG7` reached READY for commit `07cb63b`. Canonical and origin URLs returned version 1.1.0 and all 12 entries. The following documentation and capture-framing commit does not change the application.
- Repeated acceptance, autoplay, interrupted-motion tests and the three automated accessibility scans on the canonical public URL: passed. Captured public desktop/mobile screenshots and frame sheets. Public catalog, all 72 manifest hashes and the downloaded skill search/retrieval flow passed. Original 28 asset hashes, homepage and both UX/UI page titles/statuses remained unchanged; no page errors.
- Existing route version `fc25bc36-185c-4f45-8e7f-8e75cecacd10` is unchanged. Latest deployment metadata and production verification are also recorded in `.artifacts/release.json` and `.artifacts/production-verification.json`.

## Release 1.0.0 baseline

The following production observations were completed for the original release.

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

Screenshots in `.artifacts/`: desktop.png, desktop-full.png, desktop-dark-en.png, mobile.png, mobile-full.png, mobile-dark-en.png, detail.png, mobile-detail.png, all-resting.png and all-active.png. The desktop, mobile, theme and inspector screenshots were recaptured from https://lucianlabs.dev/icons/ after deployment. all-resting.png and all-active.png are local runtime comparison fixtures. Reference browser screenshots are stored separately in /workspace/scratch/reference/.

## Production observations

- https://lucianlabs.dev/ -> 200, correct lucianLabs title, no page error.
- https://lucianlabs.dev/uxui-prompt/ -> 200, correct gallery title, no page error.
- https://lucianlabs.dev/uxui-prompt/introducing/ -> 200, correct introduction title, no page error.
- https://lucianlabs.dev/icons/ -> 200, correct product title and version, browser acceptance passed. `/icons` redirects to `/icons/`; a missing icon asset returns 404.
- All 61 public manifest URLs return 200 and match both byte length and SHA-256. Skill and source ZIP downloads are valid. Downloaded skill searches Korean, retrieves only download.js/runtime.js/LICENSE and reports version 1.0.0.
- Origin and canonical URL acceptance: all ten states/sizes/reversal/duplicate cases, 12 isolated HTML documents, real Promise outcomes, keyboard, reduced motion, both languages/themes and 320/390/768/1440 widths passed. Additional mobile touch context passed.
- Public automated accessibility scan: zero WCAG 2 A/AA and 2.1 AA violations in light, dark and inspector views. No gallery console errors or failed requests.
- Existing root and both UX/UI pages retain their titles and return 200 without page errors. 28 existing assets have exactly the same hashes as before the route addition.
- Existing production deployment was preserved. Only two scoped project-level rules were added for /icons. No DNS or protection settings changed. See deployment.md.

## Limits

- Public GitHub visibility. Creation was initially denied by the integration; the user then created Seokwoooo/lucian-icons privately. Write access is available. Private visibility is retained pending explicit approval for that settings change.
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
