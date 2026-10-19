# Verification record

Product path `/icons/`.

## Release 2.0.5 gallery redesign

Date: 2026-10-18 (local review on branch `gallery-keys`); released as 2.0.5 on 2026-10-19 together with the calmer heart.

- Before release (2026-10-19, after the version bump and archiving the 2.0.4 ZIPs): `npm run build` 884 files, `npm test` 14 of 14, `tests/browser.mjs` 17 of 17 in Chrome.
- `npm run build` and `npm test`: 14 of 14 passed.
- `tests/browser.mjs` rewritten for the new gallery, 17 of 17 passed in Chrome and 17 of 17 in Playwright WebKit 26.6 (Safari's engine; clipboard reads stubbed there because WebKit automation cannot grant clipboard access). Checks: 211 icons in 13 category tables, five per row, inspector closed until a click; visible icons demonstrate themselves with the cursor; the hero card runs the cursor demo, a featured pick switches the icon and a click steps its state; hovering a running icon changes nothing; category, search, `/` and empty state; language, tone and theme persist; at 1360px a click steps the icon and slides in the docked inspector, still five per row, the inspector and the icon stay in sync both ways, close button and Escape close it; reel deep link, rail copy, SVG and code, the inspector sheet over the reel with states, code tabs, copy and downloads, first Escape closes only the sheet; at 900px a click opens the reel and the big icon steps or replays; the reel follows the filter, Escape and Back land on the last icon seen (also in WebKit after the scroll restoration fix); arrow keys cross categories and keep the column; runtime interruption; reduced motion; no horizontal overflow at 320, 390, 768 and 1440px with the large icon clear of the text, rail and HUD; guide demos.
- No horizontal overflow on the gallery or the guide at 320, 360, 390, 414, 600, 768, 900, 1024, 1180, 1280 and 1440px.
- axe-core 4.10.2 (WCAG 2.1 A/AA and best practice): no violations on the grid (light and dark at 1440, light at 390), with the inspector open, the reel (dark 390), the inspector sheet (light 900) and the guide (light and dark).
- Visual review in Chrome and WebKit: light, dark, phone, tablet and desktop; no page errors. Simulating the stale-cache case in WebKit (2.0.4 CSS and JS with the new HTML) reproduced the broken page the user saw.

## Release 2.0.4 icon review

Date: 2026-10-18. The user listed 33 icons (numbers 14, 19, 25, 37, 43, 44, 54, 55, 57, 77, 90, 92, 93, 113, 115, 118, 120, 123, 128, 137, 142, 149, 150, 158, 163, 170, 175, 178, 180, 182, 183, 202, 211).

- Each icon was rendered from source as a 12-frame strip for its hover effect and every state transition, before and after. Drawings with several options (wrench, fingerprint, eye, laptop, coin, car, mountain, paw) were compared side by side at 90 to 120px and 28 to 32px, and in line tone, before choosing.
- Checked specifically: notebook cover never crosses the rings; save arrow stays inside the label; envelope letter ends on the pocket line and the edge behind it hides, so no outlines cross; translate arrow has no dot before it starts drawing; Wi-Fi connecting and signal searching are clearly dimmer than connected and full (opacity .3, readable on dark); bulb rays leave about 1.4 units of clear space; train lights no longer grow past the body; package tape fades out before it gets short, so no dot is left.
- Runtime: new class `y` (fixed #F4AF2D) used only by the mountain's sun. Color tone keeps it yellow; line tone and static line SVG use currentColor.
- `npm test` 14/14 and `tests/browser.mjs` 14/14 after the changes. Changed icons reviewed in light and dark.
- Second review (8 icons: notebook, eye, sliders, hammer, mouse, ticket, internet, coffee): strips re-rendered from source for every effect and transition; eye candidates (plain pupil, lashed, lid only) compared before choosing; globe turn checked for no blue meridian riding on the outline. `npm test` 14/14 and `tests/browser.mjs` 14/14 again.
- Third review: notebook open and close sampled every 50ms (no stall, no sliver); globe end sampled before and after the effect ends (identical images) and every 150ms through the turn (no doubled meridians); `rx` animation confirmed in Chrome (computed rx follows the keyframes, including shrinking values). Eye removed; counts updated to 211 icons and 52 with states in tests, README, skill and gallery copy.

## Release 2.0.4 local checks

Date: 2026-10-16. Gallery reels: pressing a tile or its icon opens that icon full screen, like the uxui-prompt reels.

- `npm run build` and `npm test`: 14 of 14 passed.
- `tests/browser.mjs` against the local build: 14 of 14 passed. New and changed checks: deep link `#download` opens the reel; rail Copy puts the HTML snippet on the clipboard, rail SVG downloads a file, rail Code opens the detail dialog with the reel demo paused behind it; the first Escape closes only the dialog, the second returns to the grid with no hash. A tile click opens the reel on that icon; pressing the big heart steps to `on` and the chips follow; a stateless icon (calendar) replays its effect. With a category filter the reel holds only those icons, arrow and End keys move, Escape and browser Back return to the grid with focus and scroll on the last icon seen. Reduced motion opens the reel without the zoom. At 320, 390, 768 and 1440px the open reel has no horizontal overflow, the icon clears the text, rail and HUD, and every HUD control stays on screen.
- Visual review: open and close frames confirm the icon grows out of the pressed tile and shrinks back into the tile of the icon last seen; light, dark, English, tablet and phone layouts reviewed. axe-core: no violations with the reel open.
- Hovering a tile still changes nothing: its demo keeps running.

## Release 2.0.3 local checks

Date: 2026-10-15. Follow-up on folder, megaphone and doors after the user reviewed 2.0.2.

- Folder: one document sits inside the folder below the back edge, so no outline crosses another; open state reviewed at 140/48/32/24px.
- Megaphone: redrawn so the grip's two ends sit exactly on the body's straight bottom edge; previously the grip's right leg ran 0.4 past the slanted edge and overlapped it.
- Doors: home, store and building share one door: a doorway outline, a filled panel with a knob, and a dim interior. Opening narrows the panel toward its hinge with a slight skew so the dark interior shows, then it shuts with a small bounce.
- `npm test` and `tests/browser.mjs` rerun (see release commit).

## Release 2.0.2 local checks

Date: 2026-10-15. Folder redrawn again after user feedback; gallery hover made inert.

- Folder: compared four open-state candidates at 150/48/32/24px (two inner sheets, one sheet rising above the folder, two sheets rising, no sheet). Chose one sheet rising above the folder; the back's top edge under the sheet fades out so no outlines cross. Motion strips for hover, open and close reviewed at 120px.
- Gallery: hovering a live tile keeps its demo running and the icon does not play its own hover effect. Keyboard focus still takes over and plays the effect; click still advances state.
- User review of 47 icons: each redrawn or re-timed. Candidates were compared side by side at 112/32/24px before choosing (hammer, brush, pill, scissors, flower, tree, snowflake, paw, wifi, globe, folder). Rotated drawings are generated from upright designs by a path transformer so stroke geometry stays exact. Final sheets: static color and line tone for all 47, and motion strips for every hover effect and state transition (63 rows).
- `npm test`: 14 passed. `tests/browser.mjs`: 13 passed (new: hover leaves the demo running).

## Release 2.0.1 local checks

Date: 2026-10-15. Full motion and drawing audit after user feedback on 2.0.0.

- Audit method: a filmstrip of nine sampled frames for every hover effect and every state transition (323 rows across 212 icons) plus static sheets in color tone at 64px, then 150px close-ups of anything doubtful. Each icon was judged on whether its motion acts out what the object does and whether the motion is large enough to read at small sizes.
- Changed (32): folder opens to show two stacked documents; inbox receives a document that drops in and tucks into the tray; book turns two curling pages; notebook cover swings open over a ruled page; tag now hangs from a peg and swings on its string; ZIP file redrawn with block zipper teeth and a pull that tugs and dangles; receipt clears and prints line by line; document and newspaper backspace and retype instead of blanking; aperture redrawn as a hexagonal iris that closes and opens; handshake redrawn with fewer, wider knuckles; graduation tassel hangs from a cord; flag flaps; processor pins pulse around the chip instead of the core spinning; keyboard keys light up in sequence; next, shuffle, radio, USB, bank, map, train, wind, calendar, bag, video call, log in, save and battery got motion specific to the object; attachment, link and bookmark got readable amplitudes.
- Runtime: `skewY` pose property (combined with `skewX` in one transform, also in static exports). All icons using skew (book, cake, card, flag, flame, folder, hashtag, notebook) re-checked.
- Logo: header and footer on the gallery and guide use the Loop L mark; favicon is the root site's favicon. Checked in light and dark.
- `npm test`: 14 passed. `tests/browser.mjs`: 12 passed.

## Release 2.0.0 local checks

Date: 2026-10-15. Full redesign: 212 icons (112 kept IDs, 100 new), new runtime, gallery and guide.

- Every icon was drawn on the 24 grid and reviewed in contact sheets at 16/20/24/28/48px in color and line tone, light and dark, plus motion strips of each state transition and hover effect. Fixes found this way include folder skew, envelope folds, fingerprint, handshake, hammer, tree canopy, quote, star start angle, full 360 degree spins for asymmetric icons and the power stem color.
- `npm test`: 14 passed (definitions, exports, skill CLI, build manifest and hashes, page placeholders).
- `tests/browser.mjs` (Chrome, local build): 12 passed. 212 tiles, four per row, visible tiles demo themselves; category, search (Korean typed immediately after opening), `/` shortcut and empty state; language/tone/theme persistence; deep-linked detail dialog with state chips, code tabs, clipboard copy, SVG and HTML downloads, Escape; tile keyboard activation; 25 rapid opposite state changes settle on the last state with no running animations, duplicates independent, reinsertion keeps state; reduced motion runs no animations and stops gallery demos; no horizontal overflow at 320/390/768/1440 on gallery and guide; guide demos drive real element state.
- Bug found by the browser suite and fixed: typing within about 0.6s of opening search placed the caret at the start (the input had zero width while expanding), reversing text.
- axe-core 4.10.3 WCAG 2 A/AA and 2.1 AA: zero violations on the gallery, open detail dialog and guide, light and dark, after raising `--ink-3` contrast and making code blocks keyboard-scrollable.
- Performance: 60fps while scrolling with 12 live demos (average frame 16.6ms).

## Release 1.2.0 local checks

- Exactly 100 additional original definitions, 112 total, grouped into 10 categories. All have unique SVG source, IDs and order, bilingual descriptions/search terms/state labels and matching animated-part baselines.
- All112 were rendered and visually reviewed at 24/32/48/80px in their default and active states. Independent batches inspected forward/reverse motion at0/60/120/220/400ms. Original12 also checked in both themes through800ms. Root inspected every authoring size sheet.
- Existing designs: search, power, mouse and cursor redrawn; bell, heart and bookmark contours refined. Original IDs/states/triggers retained. Trash/folder/envelope/lock/download retain their corrected mechanisms.
- Simultaneous autoplay is independent per preview, starts at90% visibility and stops offscreen. Direct input stops only that preview. Global pause persistence, category/search filtering, inspector, hidden document, reduced motion, delayed-import cancellation and destroy cleanup passed. No demo timers in icon modules or skill exports.
- Node tests:7 passed. Full Chromium acceptance:112 icons,226 supported states,24/32/48px sizes, rapid reversal/remount/duplicates,114 independent HTML executions and474 local asset URLs passed. No page or HTTP errors.
- Independent release review found a P1 static SVG transform-origin mismatch. Reproduced as a failing browser test, fixed by embedding runtime transform-box/origin defaults in every exported part, then checked all226 state renderings for matching live/exported geometry.
- Three automated axe WCAG2 A/AA and2.1 AA scans: zero violations. Category/search/language interaction and both themes/layout widths320/390/768/1440 passed. First viewport module loading is measured by tests/catalog-gallery.py separately from later category browsing.
- Selected-only skill retrieval works for the expanded catalog. Historical1.0.0 and1.1.0 archive URLs remain available. v1.2.0 source/skill archives contain the new drawings and runtime fix.
- Evidence: `.artifacts/batch-*`, `.artifacts/v1.2/existing-before-after.png`, `.artifacts/small-{resting,active}-00.png` through `-09.png`. Public verification follows deployment and is saved separately in `.artifacts/production-verification.json` and `.artifacts/release.json`.

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
