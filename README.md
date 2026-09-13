# AI Outfitter Console

The shared web console for AI Outfitter resident agents. One workspace ships both the deployable Astro server and the reusable Astro components used by the hosted AI Outfitter website.

## Workspace

| Package | Purpose | Canonical responsibility |
| --- | --- | --- |
| `apps/server` | Astro 7 Node SSR server | A2A credentials, task/event proxying, self-hosted routes, and the container image |
| `packages/ui` | `@ai-outfitter/console-ui` | Task, chat, elicitation, output, and workflow presentation shared with `ai-outfitter/website` |

`ai-outfitter/agent-operator` deploys and configures the server. `ai-outfitter/website` supplies hosted identity, GitHub App authority, and repository management around the shared UI. Neither should fork the console components.

The initial server implementation was migrated from `ncrmro/a2astro`. The `a2astro` metadata key and `A2ASTRO_CONFIG` environment variable remain accepted only as compatibility contracts while deployments move to this repository.

## Develop

```sh
npm install
npm run mock
npm run dev
```

The server uses `apps/server/console.config.mock.yaml` by default. Copy `apps/server/console.config.example.yaml` to `apps/server/console.config.yaml` for a real fleet, or set `OUTFITTER_CONSOLE_CONFIG`.

To permit a non-local development hostname, set a comma-separated allow list:

```sh
OUTFITTER_CONSOLE_ALLOWED_HOSTS=ncrmro-workstation npm run dev
```

Run the full local gate with `npm run check && npm run build`.

## Hand-deploy against the existing Ocean agents

The current acceptance path deliberately bypasses `agent-operator`. It repoints the existing `a2astro` test Deployment at this workspace while reusing that harness's mounted `a2astro-config` and `a2astro-routes` Secrets and its existing NetworkPolicies.

```sh
REVISION=feat/workspace bin/deploy-manual-ocean
kubectl --context default -n a2astro port-forward service/a2astro 4322:80
```

Then open <http://localhost:4322/agents>. An authenticated, non-mutating proof is:

```sh
curl --fail --silent http://localhost:4322/api/agents/ks-luce/tasks.json | jq '.agent.id, (.tasks | length)'
```

An Agent Card page alone is not acceptance: the task-list request must succeed because it exercises the resident bearer credential. Chat can then be tested by hand at <http://localhost:4322/agents/ks-luce/chat>.

## Consume the UI package

```sh
npm install @ai-outfitter/console-ui
```

```astro
---
import '@ai-outfitter/console-ui/styles.css';
import StateBadge from '@ai-outfitter/console-ui/StateBadge.astro';
---

<StateBadge state="TASK_STATE_WORKING" />
```

Components accept route/action base props where the hosted website and standalone server differ. Resident bearer credentials and A2A requests remain server-side; this package contains presentation and browser-safe view models, not credential handling.
