# AGENTS.md

- This is an npm workspace. The deployable Astro app lives in `apps/server`; reusable components and browser-safe types live in `packages/ui`.
- A component used by both the standalone server and `ai-outfitter/website` belongs in `packages/ui`. Kubernetes deployment and credentials belong in `ai-outfitter/agent-operator`; hosted identity and GitHub repository authority belong in `ai-outfitter/website`.
- Never expose resident A2A bearer credentials to browser code. Server-side A2A access and SSE proxying stay in `apps/server` or the hosted website's server boundary.
- Preserve compatibility with the task and elicitation extensions emitted by `ai-outfitter/channels`.
- Run `npm run check && npm run build` before opening a pull request.
- Until operator integration is intentionally resumed, test the server through `bin/deploy-manual-ocean`; it mutates only the existing `a2astro` acceptance Deployment and reuses its Secrets and NetworkPolicies.
- Treat the project as alpha. Do not publish `1.0.0`, a new major version, or a breaking-change release without Nicholas's explicit approval.
