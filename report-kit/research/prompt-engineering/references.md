---
title: Prompt Engineering — references
created: 2026-04-22
updated: 2026-04-22
topic: prompt-engineering
---

# References

## Taxonomy / surveys
- [The Prompt Report: A Systematic Survey of Prompting Techniques](https://arxiv.org/abs/2406.06608) — survey lớn nhất về prompting text-based, 58 techniques, useful as the classic baseline.
- [The Prompt Report site](https://trigaten.github.io/Prompt_Survey_Site/) — taxonomy, PRISMA flow, case studies, and prompt engineering best-practice notes.
- [A comprehensive taxonomy of prompt engineering techniques for large language models](https://journal.hep.com.cn/fcs/EN/10.1007/s11704-025-50058-z) — 2026 taxonomy with four aspects: profile/instruction, knowledge, reasoning/planning, reliability.
- [A Survey of Context Engineering for Large Language Models](https://arxiv.org/abs/2507.13334) — context engineering frame: retrieval/generation, processing, management.
- [A Survey of Automatic Prompt Engineering: An Optimization Perspective](https://arxiv.org/abs/2502.11560) — optimizer-centric view of prompt engineering.
- [A Systematic Survey of Automatic Prompt Optimization Techniques](https://arxiv.org/abs/2502.16923) — optimization methods and evaluation loops.
- [Prompt Compression for Large Language Models: A Survey](https://aclanthology.org/2025.naacl-long.368/) — prompt compression as its own subfield.

## OpenAI
- [Prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering/tactics-to-improve-reliability) — clear instructions, context, examples, structured data, eval-driven iteration.
- [Function calling](https://platform.openai.com/docs/guides/function-calling/parallel-function-calling-and-structured-outputs) — schemas, strict mode, tool definitions, constrained responses.
- [Structured model outputs](https://platform.openai.com/docs/guides/structured-outputs/avoid-json-schema-divergence%3F.zst) — schema adherence instead of plain JSON mode.
- [Prompt caching](https://platform.openai.com/docs/guides/prompt-caching/prompt-caching) — static prefix first, variable content last, cache-aware prompt shape.
- [Prompt optimizer](https://platform.openai.com/docs/guides/prompt-optimizer/) — dataset-driven prompt improvement with graders and annotations.
- [Safety in building agents](https://platform.openai.com/docs/guides/agent-builder-safety) — prompt injections, structured outputs, tool approvals, guardrails.
- [Using GPT-5.4](https://developers.openai.com/api/docs/guides/latest-model) — allowed tools, CFG-constrained outputs, preambles, explicit tool guidance.

## Anthropic
- [Prompting best practices: XML tags](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#structure-prompts-with-xml-tags) — XML structure, nesting, clear separation of instructions/context/examples.
- [Prompting best practices: chain complex prompts](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#chain-complex-prompts) — prompt chaining, subtask isolation, iterative pipelines.
- [Prompting best practices: long context prompting](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#long-context-prompting) — long docs first, query last, quote grounding, document tags.
- [Prompt improver](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-tools) — automated prompt rewriting with XML, CoT refinement, and example enhancement.

## Google / Vertex AI
- [Overview of prompting strategies](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/prompt-design-strategies) — instructions, examples, role, structure, reasoning, decomposition, prompt health checklist.
- [Prompt design strategies](https://ai.google.dev/guide/prompt_best_practices) — zero-shot, few-shot, system instructions, example guidance.
- [Optimize prompts](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/prompt-optimizer) — zero-shot and data-driven prompt optimization.
- [Gemini text generation system instructions](https://ai.google.dev/gemini-api/docs/system-instructions) — system instructions and few-shot basics.

## Microsoft
- [Prompt engineering with Semantic Kernel](https://learn.microsoft.com/en-us/semantic-kernel/concepts/prompts/) — prompt design as a reusable, testable engineering workflow.
- [Semantic Kernel prompt template syntax](https://learn.microsoft.com/en-us/semantic-kernel/concepts/prompts/prompt-template-syntax) — variables, functions, and prompt composition.
- [Azure OpenAI prompt engineering techniques](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/prompt-engineering) — specificity, ordering, grounding context, and few-shot effects.

## Reasoning / planning papers
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903) — the core CoT paper.
- [Self-Consistency Improves Chain of Thought Reasoning in Language Models](https://arxiv.org/abs/2203.11171) — sampling and voting over reasoning paths.
- [Least-to-Most Prompting Enables Complex Reasoning in Large Language Models](https://arxiv.org/abs/2205.10625) — decomposition-first reasoning.
- [Plan-and-Solve Prompting](https://arxiv.org/abs/2305.04091) — plan before solving.
- [Tree of Thoughts](https://arxiv.org/abs/2305.10601) — branching search over thoughts.
- [ReAct](https://arxiv.org/abs/2210.03629) — interleave reasoning and acting.
- [PAL: Program-aided Language Models](https://arxiv.org/abs/2211.10435) — code as intermediate reasoning.
- [Self-Refine](https://arxiv.org/abs/2303.17651) — iterative critique and revision.
- [CRITIC](https://arxiv.org/abs/2305.11738) — tool-backed external verification.

