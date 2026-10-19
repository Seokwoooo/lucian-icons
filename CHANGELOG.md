# Changelog

Released skill ZIPs stay downloadable at `https://lucianlabs.dev/icons/downloads/lucian-icons-skill-<version>.zip`. Website source ZIPs have been withdrawn because they include reserved brand assets.

## 2.0.13 (2026-10-20)

- The hero command installs the agent skill from GitHub with `npx skills add Seokwoooo/lucian-icons --skill lucian-icons`; the copy button copies that command.
- Kept the header within narrow screens in both languages, and made the browser check wait for the dialog close event before checking its dock.
- Removed website source download buttons and links from the gallery and API guide.
- Stopped generating website source ZIPs and removed archived source bundles from the current distribution. Individual icon exports and skill ZIPs remain available.
- Kept the official header logo and favicon by referencing the separately hosted lucianlabs.dev asset; removed bundled logo source files, footer artwork and the branded share image.
- Added an explicit brand notice separating the Lucian names and Loop L logo from the MIT-licensed icon library.
- Archived the verified 2.0.12 skill ZIP.

## 2.0.12 (2026-10-20)

- The repository is public: https://github.com/Seokwoooo/lucian-icons . The gallery header (icon only on narrow screens), the hero's "100% free & open source" line, the footer and the API guide link to it.
- README rewritten for the public repository: the three ways to use the icons (paste a prompt, let the skill do it, one script tag), skill install paths and example requests.
- 2.0.11 skill and source ZIPs archived.

## 2.0.11 (2026-10-20)

Fixes from an independent release review.

- Every newly opened icon starts on its Prompt tab. 2.0.10 kept a tab picked for the previous icon.
- `npm test` passes in an unzipped source ZIP: archived releases are only checked in a full checkout, since the source ZIP leaves `web/downloads/` out.
- Docs: `tone="line"` with `accent` colors only the details (accent strokes, small fills, error marks). The porting reference, the API guide and the design notes now say so; behavior is unchanged and matches between the component and static SVG.
- 2.0.10 skill and source ZIPs archived.

## 2.0.10 (2026-10-20)

- Clicking an icon opens its prompt first: the Prompt tab is the first and default tab, and the reel's Copy button copies the prompt.
- Right below the prompt, a skill card recommends the agent skill, with two requests to copy: let the AI pick fitting icons, or ask for this icon by its gallery number.
- The skill resolves gallery numbers: `get 197`, `search 197번` and `#197` all mean the heart. SKILL.md tells agents how to handle number requests and "pick icons that fit" requests.
- Fix: skill search results include each icon's gallery number (`order`) again; 2.0.9 dropped it.
- 2.0.9 skill and source ZIPs archived.

## 2.0.9 (2026-10-20)

- Error marks on download, upload and shield are now a fixed red instead of the icon's own color, so a failure no longer reads as success (a green "!" on the download icon). They ignore `accent`, follow the line color in `tone="line"` and lighten in dark themes like other details. Runtime: new class `e`.
- Shield empties on alert: the green surface fades out so the red mark stands on the page, readable in dark themes and without relying on red versus green.
- Skill CLI search ranks exact ids first, then names, keywords (earlier keywords weigh more), word prefixes and substrings. `close` now finds Close before Menu, `arrow` finds Arrow before Filter.
- Skill CLI `get --out` can add icons to an existing directory: identical files are kept and only new modules are written. A differing file still stops the command before anything is written. The output lists `written` and `unchanged` files.
- Public code and data paths (`all.js`, `export.js`, `catalog.json`, `modules/`, `runtime/`, `api/`) are cached by browsers for 10 minutes, so sites that load icons from lucianlabs.dev revalidate far less often. CDNs keep revalidating, so a release is live as soon as it deploys.
- GitHub Actions runs the build and tests on Node 18, 22 and 24 and checks that generated skill files are committed. Added this changelog and CONTRIBUTING.md; internal working notes left the repository.

## 2.0.8 (2026-10-19)

- Dark theme surfaces are a slightly deeper, richer version of each icon's color (OKLCH lightness x.93, chroma x1.08), and accents move 40% toward white.
- Heart, star, bookmark, thumbs up, toggle, filter, bulb and lamp are a plain outline when off in dark themes.
- The gallery draws strokes at 1.35 in its dark theme; the component default stays 1.75.

## 2.0.7 (2026-10-19)

- Icons whose state fills the whole shape keep off and on distinct in dark themes.

## 2.0.6 (2026-10-19)

- Clean icon colors in dark themes: where the page declares `color-scheme: dark`, surfaces are painted solid instead of a thin tint that turned olive and brown. Uses `light-dark()` and relative colors behind `@supports`; light rendering is unchanged.
- The hero shows "100% free & open source" on its own line.

## 2.0.5 (2026-10-19)

- New gallery and guide design: a quiet specimen sheet with hairline category tables, a floating toolbar and the 24-unit keyline grid behind every large icon. Wide screens open a docked inspector; narrow screens open the reel.
- Calmer heart: no burst, smaller pulse and hover heartbeat.
- New share image.

## 2.0.4 (2026-10-18)

- Gallery reels: an icon opens full screen with Code, Copy and SVG; links such as `/icons/#download` open its reel.
- Redrawn or re-timed icons, including wrench, fingerprint, mouse, laptop, coin, car, envelope, notebook, ticket and package. `globe` is named Internet.
- Removed `eye` (211 icons, 52 with states). `<lucian-eye>` no longer exists.
- Runtime: class `y` (fixed sun yellow); effect keyframes may set an ellipse's `rx`.

## 2.0.3 (2026-10-15)

- Calmer folder, a clean megaphone grip, and one shared door for home, store and building.

## 2.0.2 (2026-10-15)

- Hovering a gallery tile no longer interrupts its demo.
- 47 icons redrawn or re-timed.

## 2.0.1 (2026-10-15)

- Audit of every hover effect and state transition; 32 icons redrawn. The Lucian logo in the header and favicon.
- Runtime: `skewY` pose property.

## 2.0.0 (2026-10-15)

Breaking. See the [migration table](skills/lucian-icons/references/migration.md).

- All 112 icons redrawn and 100 added (212 in 13 categories). Strokes follow `currentColor`; each icon carries one color; `tone="line"` for monochrome.
- New runtime: spring state transitions that retarget mid-flight, hover and focus effects layered on the current state, reduced motion. Only real application states remain (53 icons); `ink` and `paper` are removed.
- New gallery, bilingual API guide, CORS on public module paths, Node unit tests and browser QA.

## 1.2.0 (2026-10-14)

- 112 icons. Every visible preview in the gallery demonstrates itself at the same time.

## 1.1.0 (2026-10-14)

- Mouse and cursor icons (12 icons) and a cursor-guided autoplay.

## 1.0.0 (2026-10-14)

- First release: animated SVG icons as web components, gallery, static SVG and standalone HTML exports, and the lucian-icons agent skill.
