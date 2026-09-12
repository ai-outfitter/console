/** Mirrors `WorkflowDefinition` in ai-outfitter/outfitter `code/cli/src/resolver/WorkflowDefinition.ts`. */
export type WorkflowActor =
  | { readonly kind: 'agent'; readonly profile: string; readonly skills?: readonly string[] }
  | { readonly kind: 'human' | 'tool' | 'system'; readonly profile?: string; readonly skills?: readonly string[] };

export interface WorkflowNode {
  readonly id: string;
  readonly description: string;
  readonly action?: string;
  readonly workflow?: string;
  readonly actor?: string;
  readonly environment?: string;
  readonly needs?: readonly string[];
  readonly skill?: string;
  readonly skills?: readonly string[];
  readonly uses?: readonly string[];
  readonly if?: string;
}

export interface WorkflowDefinition {
  readonly version: 1;
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status?: string;
  readonly actors: Readonly<Record<string, WorkflowActor>>;
  readonly environments?: Readonly<Record<string, unknown>>;
  readonly integrations?: Readonly<Record<string, unknown>>;
  readonly triggers?: readonly Readonly<Record<string, unknown>>[];
  readonly nodes: readonly WorkflowNode[];
  readonly feedback?: readonly { readonly from: string; readonly to: string }[];
}
