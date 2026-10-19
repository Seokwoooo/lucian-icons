# Deployment

Lucian Icons is served at https://lucianlabs.dev/icons/. This page is for maintainers.

## How it is hosted

- **Icons project** (Vercel team `lucian-main`, project `lucian-icons`): linked to this repository, production branch `main`. Every push to `main` builds and deploys. Build command `npm run build`, no dependency installation, output `dist/`, which contains only `icons/`. Configuration lives in `vercel.json`.
- **Public origin:** https://lucian-icons.vercel.app/icons/. Unique preview URLs keep the team's default deployment protection.
- **Site project** (`lucianlabs`, deployed separately from its own repository): owns the `lucianlabs.dev` domain and has two project-level routing rules that hand `/icons/` to the icons project:

  | Match | Action |
  | --- | --- |
  | `^/icons$` | 308 to `/icons/` |
  | `^/icons/(.*)$` | rewrite to `https://lucian-icons.vercel.app/icons/$1` |

  Deploying the site does not replace these rules, and releasing icons never touches the site. Never deploy this repository's `dist/` over the site project. There is no root service worker or catch-all route; every public asset is under `/icons/`.

## Headers

`vercel.json` sets, for the public code and data paths (`/icons/all.js`, `/icons/export.js`, `/icons/catalog.json`, `/icons/modules/*`, `/icons/runtime/*`, `/icons/api/*`):

- `Access-Control-Allow-Origin: *`, because the gallery and README advertise loading modules straight from `https://lucianlabs.dev/icons/`. Cross-origin module scripts fail without it.
- `Cache-Control: public, max-age=600`, so browsers on pages that load icons from lucianlabs.dev do not revalidate every module on every view. A returning visitor may keep the previous release for up to 10 minutes after a deploy.
- `CDN-Cache-Control: public, max-age=0, must-revalidate`. Without it, Vercel's CDN would also cache by `Cache-Control`, including the site's proxy in front of the external rewrite, and lucianlabs.dev could serve the previous release after a deploy. `CDN-Cache-Control` takes priority on Vercel and is forwarded to other CDNs. Do not add `s-maxage` or `stale-while-revalidate`: Vercel treats both as CDN directives and strips them from the browser's header.

Pages (`index.html`, `guide.html`) and gallery assets keep Vercel's default `max-age=0, must-revalidate`. The headers come from the icons project and pass through the site's rewrite.

## Releasing

1. Bump the version in `package.json`, `src/runtime/icon.js` (header and `VERSION`), `src/export.js`, the skill (`SKILL.md`, `INSTALL.md`, `references/porting.md`, `scripts/lucian-icons.mjs`, `tokens.css`) and the expected versions in `tests/`.
2. Archive the previous release: download its skill ZIP from `https://lucianlabs.dev/icons/downloads/` into `web/downloads/` and check that bytes and SHA-256 match the live `manifest.json`. Add the new version to the ZIP list in `tests/build.test.mjs`.
3. Add a `CHANGELOG.md` entry, then `npm run build`, `npm test` and the browser checks against the local preview.
4. Commit and push `main`. When the deployment is READY, verify production:
   - `https://lucianlabs.dev/icons/manifest.json` shows the new version, and every file it lists is served with matching bytes and SHA-256.
   - `curl -sI https://lucianlabs.dev/icons/modules/heart.js` shows the CORS and cache headers.
   - Older skill archive URLs still download. Website source ZIP URLs must return 404; do not archive or republish them because they contain reserved brand artwork.
   - `TEST_URL=https://lucianlabs.dev/icons/ node tests/browser.mjs` passes.
   - Bulk checks (hundreds of requests in a few minutes) can make Vercel's automatic protection challenge your IP on lucianlabs.dev (403 with `x-vercel-mitigated: challenge`, even for headless browsers). Compare every file against the origin `https://lucian-icons.vercel.app/icons/`, keep checks on lucianlabs.dev to a few requests, and confirm public reachability from other networks (for example check-host.net) before assuming an outage.
   - The site root and `/uxui-prompt/` are unchanged.

## Rollback

- **Icons regression:** in the `lucian-icons` project, roll back or promote a known READY production deployment. Do not touch the site project's deployments.
- **Routing regression:** read the site project's current routes, find the two rules by their match patterns above, remove only those from a staged version (keep any later rules), review the diff, then promote it.
