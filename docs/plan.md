# Lucian Icons Implementation Plan

> Execute inline using superpowers:executing-plans; user explicitly requests no intermediate approval gates.

Goal: deliver the complete brief in design.md.
Architecture: catalog-driven SVG definitions, isolated visual runtime, static gallery, generated agent distribution.
Tech: Node >=18, SVG/CSS/vanilla JavaScript, Python Playwright for browser verification.

Global constraints: ten icons, MIT, no animation dependencies, no middle dot in authored copy, /icons/ URLs, keyboard/touch/reduced motion, no fake production completion.

Review focus: invalid/untrusted attribute values; rapid reversal; component reconnect; clipboard blocked; download pending without completion; duplicate instances; static snapshot versus live state; independent file:// HTML.

1. Runtime and baseline artwork. Create src/runtime/icon.js, src/icons/{trash,folder,lock}.json, scripts/build.mjs, tests/runtime.py. First run a failing browser test against a missing component. Implement observed state, validated palette/size and scoped transitions. Inspect 24/32/48 frames. Record evidence.
2. Remaining artwork and export system. Create the other seven definitions and src/export.js. Test progress remains pending and duplicated components independent; add standalone HTML with explicit demo controls. Export settings must match preview.
3. Gallery. Create web/index.html, gallery.css, gallery.js, i18n.js. Test search in both languages, keyboard dialog, theme/locale, settings and export failures. Review desktop/mobile screens and refine.
4. Agent package. Create skills/lucian-icons/SKILL.md, CLI, porting guide, example. Run retrieval baseline, then skill-enabled sample integration. Verify official install paths. Build ZIP, manifest and integrity hashes.
5. Validation and release. Run Node and browser tests, fresh-context code review, fixes. Build clean output, commit and push new repo if available. Inspect current hosting deployment and add only /icons/ safely. Verify remote deployment, downloads, asset statuses and existing routes. Report exact blockers separately if credentials unavailable.
