# Prompt Engineering Layer 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build deep-dive report pages for all group 3 and group 4 prompt engineering techniques, with shared scaffolding, registry entries, and overview links.

**Architecture:** Keep the implementation data-driven inside `report-kit/src/pages/reports/prompt-engineering/` so each deep dive route stays thin. A shared topic registry will feed a reusable page component, and the overview page will link directly to the new nested routes. Research notes will track the topic-specific source set so the report stays auditable.

**Tech Stack:** Astro, shared report components, TypeScript, report-kit registry metadata, primary-source references from arXiv and official vendor docs.

---

### Task 1: Build shared deep-dive scaffolding

**Files:**
- Create: `report-kit/src/pages/reports/prompt-engineering/deep-dives.ts`
- Create: `report-kit/src/components/PromptDeepDivePage.astro`

- [ ] **Step 1: Define a topic data shape and populate all 12 prompt-engineering deep dives**

```ts
export interface PromptDeepDiveTopic {
  slug: string;
  title: string;
  label: string;
  description: string;
  sidebar: Array<{ title: string; items: Array<{ href: string; label: string; section?: boolean }> }>;
  refs: string[];
}
```

- [ ] **Step 2: Render one reusable deep-dive page layout from the topic data**

```astro
<ReportLayout title={topic.title} description={topic.description}>
  <!-- Sidebar, Hero, Sections, RefList -->
</ReportLayout>
```

- [ ] **Step 3: Verify the component imports and nested route relative paths**

Run: `cd report-kit && npm run build`
Expected: build succeeds without Astro import/path errors.

### Task 2: Create 12 route pages and registry entries

**Files:**
- Create: `report-kit/src/pages/reports/prompt-engineering/cot.astro`
- Create: `report-kit/src/pages/reports/prompt-engineering/plan-solve.astro`
- Create: `report-kit/src/pages/reports/prompt-engineering/tot-got.astro`
- Create: `report-kit/src/pages/reports/prompt-engineering/self-consistency.astro`
- Create: `report-kit/src/pages/reports/prompt-engineering/react.astro`
- Create: `report-kit/src/pages/reports/prompt-engineering/prompt-chaining.astro`
- Create: `report-kit/src/pages/reports/prompt-engineering/pal-pot.astro`
- Create: `report-kit/src/pages/reports/prompt-engineering/self-refine.astro`
- Create: `report-kit/src/pages/reports/prompt-engineering/prompt-ensembling.astro`
- Create: `report-kit/src/pages/reports/prompt-engineering/prompt-optimization.astro`
- Create: `report-kit/src/pages/reports/prompt-engineering/structured-outputs.astro`
- Create: `report-kit/src/pages/reports/prompt-engineering/safety-guardrails.astro`
- Modify: `report-kit/src/data/reports.ts`

- [ ] **Step 1: Add one deep-dive registry entry per topic**

```ts
{
  slug: 'prompt-engineering/cot',
  title: 'Deep Dive: Chain-of-Thought / zero-shot CoT',
  kind: 'deep-dive',
  parentSlug: 'prompt-engineering',
  topicLabel: 'Chain-of-Thought / zero-shot CoT',
}
```

- [ ] **Step 2: Make each route file a thin wrapper around the shared page component**

```astro
---
import PromptDeepDivePage from '../../../../components/PromptDeepDivePage.astro';
import { promptEngineeringDeepDives } from './deep-dives';
---
<PromptDeepDivePage topic={promptEngineeringDeepDives.cot} />
```

- [ ] **Step 3: Verify each nested route is emitted under `/reports/prompt-engineering/.../`**

Run: `cd report-kit && npm run build`
Expected: all 12 routes exist under `dist/reports/prompt-engineering/`.

### Task 3: Link overview, notes, and index

**Files:**
- Modify: `report-kit/src/pages/reports/prompt-engineering/index.astro`
- Modify: `report-kit/research/prompt-engineering/README.md`
- Modify: `report-kit/research/prompt-engineering/references.md`
- Modify: `report-kit/research/prompt-engineering/techniques.md`
- Modify: `_index/README.md`

- [ ] **Step 1: Add `DeepDiveLink` calls to every group 3/4 technique card**

```astro
<DeepDiveLink href="/reports/prompt-engineering/cot/">
  Phân tích sâu: Chain-of-Thought / zero-shot CoT
</DeepDiveLink>
```

- [ ] **Step 2: Add a deep-dive topics list to the prompt-engineering research README**

```md
## Deep Dive Topics
- Chain-of-Thought / zero-shot CoT
- Plan-and-Solve / Least-to-Most
```

- [ ] **Step 3: Add a row per deep dive into the workspace index**

```md
| `prompt-engineering/cot` | `stable` | Deep dive: Chain-of-Thought / zero-shot CoT | ... |
```

### Task 4: Verify, fix, and finish

**Files:**
- Modify as needed based on build output

- [ ] **Step 1: Run the build**

```bash
cd report-kit && npm run build
```

- [ ] **Step 2: Verify the generated report routes and the overview links**

```bash
find dist/reports/prompt-engineering -maxdepth 1 -type f | sort
```

- [ ] **Step 3: Fix any broken imports, route names, or registry mismatches**

Only fix issues found in the build or route check.

- [ ] **Step 4: Update the plan status in-progress → done once build is green**

