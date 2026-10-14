# Deployment record

Lucian Icons is served at https://lucianlabs.dev/icons/ on the user's existing Vercel Hobby team. No purchase, DNS change, new credential or deployment-protection change was made.

## Verified hosting

- Team: lucian-main (`team_pbaQ9CdEAdSJ2WWdKavp9Msh`).
- Existing domain project: lucianlabs (`prj_TKThNuHcaZrKP7BKiOnWZd9UfAI0`).
- Existing production deployment: `dpl_22NPyABMcmWMPKdzz2jjtf6aXxDr`, READY, source CLI, 1,169 uploaded files. Build logs show `vercel build` and `/vercel/output`. No connected Git source, production branch or Git-triggered pipeline was found for this existing project. Its deployment and source files were not replaced.
- Icons project: lucian-icons (`prj_wCSef57xHufZjwrBDgsjlYKR6jC0`), linked to Seokwoooo/lucian-icons, production branch `main`. Git pushes now deploy successfully.
- Icons build: `npm run build`, Node 24.x as observed on Vercel, no dependency installation, output `dist/` containing only `icons/`. Configuration is in `vercel.json` and the downloadable source ZIP.
- Public origin: https://lucian-icons.vercel.app/icons/. Unique preview URLs retain the team's default authentication protection.
- Canonical public path: https://lucianlabs.dev/icons/. No separate introducing page is needed; the API and install guide is `/icons/guide.html`.

The initial Git-triggered build was BLOCKED because the workspace's pre-existing Git email mapped to a different account. This repository's local author configuration was corrected to match the user's own initial GitHub commit (Seokwoooo / Lucian). The next Git-triggered deployment completed READY. No commit history was rewritten and no security setting was loosened.

## Isolated domain integration

The existing project had no project-level routing rules. Two scoped rules were staged, inspected as additions, then published after origin browser acceptance passed:

| Rule ID | Match | Action |
| --- | --- | --- |
| `1df8b6a1-9812-4579-943c-2e90bcdf5dc2` | `^/icons$` | 308 to `/icons/` |
| `9dac8413-e226-441e-bc78-1d1f9cbc8083` | `^/icons/(.*)$` | rewrite to `https://lucian-icons.vercel.app/icons/$1` |

Live route version: `fc25bc36-185c-4f45-8e7f-8e75cecacd10`.

The existing root deployment, domain alias, `/uxui-prompt/`, its introducing page, API functions and other paths are preserved. The icons origin uses `main` for future releases; root-site CLI deployments do not replace this project-level routing configuration. Public assets are all under `/icons/`; there is no root service worker or catch-all route.

## Verification and rollback

Origin acceptance passed before publishing the scoped rules. Public acceptance then passed at the canonical URL. All 61 public manifest files matched SHA-256 and byte size. Existing root and both UX/UI pages returned the same titles with no page errors; 28 loaded existing assets retained exactly the same SHA-256 hashes. Evidence is stored locally in `.artifacts/production-baseline.json` and `.artifacts/production-verification.json`.

For a future icons-only regression, roll back only the icons project to a known READY deployment. For a routing regression, read the current project routes, remove only the two rule IDs above from the staged version, preserve any later user rules, review the diff, then promote that staged version. Do not roll back the unrelated root deployment. Never replace the existing site with this repository's `dist/`.

Repository visibility remains PRIVATE as created by the user. Public source and skill ZIP downloads are served from the website. Changing repository visibility still requires the separate approval the user requested for security-setting changes.
