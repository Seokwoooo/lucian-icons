# Deployment handoff

This release is built for https://lucianlabs.dev/icons/. Do not call it published until the checks below pass against that address.

Observed on 2026-10-14: the requested path returns HTTP 404 with Vercel headers. The homepage and UX/UI routes return 200. Public UX/UI source is a Node-only static build without a Vercel config or deployment workflow. The active environment provides GitHub access but no configured Vercel credential, root-site checkout, project ID or verified production build configuration. GitHub repository creation was initially denied by the integration. The user subsequently created Seokwoooo/lucian-icons as a private repository, and repository write access is now available. Its initial commit and MIT license are retained. No production source, routing or DNS was modified.

Required to finish: the source/hosting project currently serving lucianlabs.dev, with permission to deploy through its existing mechanism. The new repository is private; changing its visibility requires the separate approval specified by the user for security-setting changes. User has already authorized necessary commit, push and safe /icons/ deployment. No additional conversational approval is required for that scope. A new paid service, new domain, new credentials, security setting changes or impactful DNS changes still require separate approval.

Once access exists:

1. Inspect the root checkout's AGENTS.md, clean/dirty state, production branch, current deployed commit, build command, output and routes. Confirm production can be reproduced and /icons/ remains unused. Record the root and /uxui-prompt/ asset hashes before changing anything.
2. Preserve user changes. Add this release's `dist/icons/` folder to the existing output at `/icons/`, or add a narrowly scoped build integration consuming a pinned new-repo commit. Do not replace the root output. Do not add a catch-all route or service worker.
3. Use the existing preview deployment mechanism. Validate `/icons/`, `/icons/guide.html`, `#trash`, catalog and manifest URLs, both ZIPs, all assets and the existing root/UXUI pages. `TEST_URL=https://<preview>/icons/ python tests/acceptance.py` verifies public assets and interactions.
4. Review only related changes and deploy through the existing production trigger. Record project, branch, source SHA, build command and output path.
5. Poll the actual deployment status until ready. Repeat browser checks at https://lucianlabs.dev/icons/ and fetch every manifest path. Confirm the actual Lucian Icons title and version, not only HTTP 200. Confirm root and both UX/UI pages remain intact. If this change regresses them, revert only this release's changes and fix the cause.

The local `dist/` directory contains only the new `/icons/` tree. It must not be used to replace the entire production site's content.
