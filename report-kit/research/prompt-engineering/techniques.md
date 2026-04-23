---
title: Prompt Engineering — techniques notes
created: 2026-04-22
updated: 2026-04-22
tags: [prompt-engineering, llm, taxonomy, notes]
status: stable
---

# Prompt Engineering — notes

## Working thesis
Prompt engineering in 2025-2026 is better treated as a stack:

1. Frame the job clearly.
2. Load the right context.
3. Make the model think in a controlled way.
4. Keep the output reliable, parsable, and safe.

## Source-backed taxonomy
- `Prompt Report` gives the historical ceiling: 58 text-based techniques and a huge appendix of multimodal/multilingual methods.
- The 2026 Frontiers taxonomy is the best current umbrella for layer-1 grouping:
  - Profile and instruction
  - Knowledge
  - Reasoning and planning
  - Reliability
- Context engineering and prompt optimization are now separate subfields, not just footnotes.

## Planned layer-1 inventory

### 1. Profile & instruction
- Role / persona prompting
- Task instruction with intent, domain, and demand
- Zero-shot prompting
- Few-shot prompting
- Example selection and ordering
- XML tags, delimiters, and sectioning

### 2. Knowledge & context
- Basic RAG / grounding
- Query rewriting, HyDE, Query2doc-style pseudo-docs
- Multi-hop retrieval and query decomposition
- Post-retrieval restructuring
- Long-context ordering and quote grounding
- Prompt caching and prompt compression

### 3. Reasoning & planning
- Chain-of-thought / zero-shot CoT
- Plan-and-Solve / Least-to-Most
- Tree-of-Thought / Graph-of-Thought
- Self-consistency
- ReAct / tool-augmented reasoning
- Prompt chaining
- PAL / Program-of-Thought

### 4. Reliability & optimization
- Self-refine and critique-revise
- External verification / CRITIC-style checking
- Prompt ensembling / bagging / boosting
- Automatic prompt optimization
- Structured outputs / strict mode / allowed tools
- Safety and injection defenses

## Notes that will shape the report copy
- PromptingGuide.ai is a good classic reference, but it does not reflect the current emphasis on context engineering, structured outputs, and optimization tooling.
- The report should not read like a list of “magic phrases”.
- It should explain where each technique sits in the stack and what failure mode it addresses.
- The practical recommendation should be: fix instruction clarity first, then context, then reasoning scaffold, then reliability constraints.
