# Architecture

The console has one portable product layer and two delivery integrations.

```text
                         @ai-outfitter/console-ui
                         components + view models
                           /                 \
              apps/server                     ai-outfitter/website
       Node SSR + A2A credential proxy     hosted auth + GitHub broker
                   |
       ai-outfitter/agent-operator
       Kubernetes deployment + wiring
```

## Ownership rule

- Put task, chat, elicitation, output, and workflow presentation in `packages/ui` when both delivery modes can use it.
- Put resident discovery, bearer-token handling, A2A requests, SSE proxying, local scheduling, and standalone routes in `apps/server`.
- Put Organization/Agent reconciliation, Services, Secrets, NetworkPolicies, and OIDC ingress in `ai-outfitter/agent-operator`.
- Put hosted account identity, GitHub App installation authority, repository mutation, and tenant routing in `ai-outfitter/website`.
- Put A2A protocol and task lifecycle behavior in `ai-outfitter/channels`; the console consumes those contracts.

The UI package deliberately has no resident credential API. A host supplies data and route/action props; only a trusted server boundary talks to resident agents.

## Compatibility

The initial implementation came from `ncrmro/a2astro`. Existing `a2astro/v1` task metadata, message IDs, and `A2ASTRO_CONFIG` remain readable during migration. New deployment configuration uses `OUTFITTER_CONSOLE_CONFIG` and `console.config.yaml`.
