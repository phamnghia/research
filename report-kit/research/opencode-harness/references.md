---
title: opencode harness — references & bài viết liên quan
created: 2026-04-20
updated: 2026-04-20
topic: opencode-harness
---

# References

## Repo gốc
- [anomalyco/opencode — GitHub](https://github.com/anomalyco/opencode) — repo chính, fork của sst/opencode
- [OpenCode — Official site](https://opencode.ai/) — landing page
- [OpenCode Agents docs](https://opencode.ai/docs/agents/) — built-in agents (build, plan) + subagents
- [OpenCode Permissions docs](https://opencode.ai/docs/permissions/) — permission model

## Harness engineering (tổng quan)
- [Martin Fowler — Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html)
- [HumanLayer — Skill Issue: Harness Engineering for Coding Agents](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents)
- [OpenAI — Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)
- [Avi Chawla — The Anatomy of an Agent Harness](https://blog.dailydoseofds.com/p/the-anatomy-of-an-agent-harness)
- [DEV — The Agent Harness: Turning AI Slop Into Shipping Software](https://dev.to/tacoda/the-agent-harness-turning-ai-slop-into-shipping-software-589i)
- [DEV — Building a Production-Ready AI Agent Harness](https://dev.to/apssouza22/building-a-production-ready-ai-agent-harness-2570)
- [arXiv — Building AI Coding Agents for the Terminal (Scaffolding, Harness, Context Engineering)](https://arxiv.org/html/2603.05344v1)
- [Awesome Harness Engineering list](https://github.com/ai-boost/awesome-harness-engineering)
- [Gist — AI Coding Agent Architecture Analysis: Claude Code vs Codex vs Cline vs OpenCode](https://gist.github.com/Haseeb-Qureshi/2213cc0487ea71d62572a645d7582518)

## Agent loop & ReAct
- [IBM — What is a ReAct Agent](https://www.ibm.com/think/topics/react-agent)
- [Medium — A Super Simple ReAct Agent from Scratch](https://medium.com/data-science-collective/a-super-simple-react-agent-87913949f69f)
- [LlamaIndex — ReAct Agent](https://docs.llamaindex.ai/en/stable/examples/agent/react_agent/)
- [Pydantic AI — Agents](https://pydantic.dev/docs/ai/core-concepts/agent/)

## Streaming & tool lifecycle
- [Vercel AI SDK — streamText reference](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text)
- [Vercel AI SDK 5 blog](https://vercel.com/blog/ai-sdk-5) — onInputStart, onInputDelta, onInputAvailable
- [TDS — Building a Streaming Agent with Burr](https://medium.com/data-science/how-to-build-a-streaming-agent-with-burr-fastapi-and-react-e2459ef527a8)

## Context compaction & management
- [Microsoft Learn — Compaction](https://learn.microsoft.com/en-us/agent-framework/agents/conversations/compaction)
- [Medium — Fundamentals of Context Management and Compaction in LLMs](https://kargarisaac.medium.com/the-fundamentals-of-context-management-and-compaction-in-llms-171ea31741a2)
- [JetBrains Research — Cutting Through the Noise: Smarter Context Management for LLM-Powered Agents](https://blog.jetbrains.com/research/2025/12/efficient-context-management/)
- [Factory.ai — Compressing Context](https://factory.ai/news/compressing-context)
- [Morph — Compaction vs Summarization](https://www.morphllm.com/compaction-vs-summarization)
- [ForgeCode — Context Compaction docs](https://forgecode.dev/docs/context-compaction/)
- [Google ADK — Context compression](https://google.github.io/adk-docs/context/compaction/)
- [arXiv — Solving Context Window Overflow in AI Agents](https://arxiv.org/html/2511.22729v1)
- [Redis — Context Window Overflow in 2026](https://redis.io/blog/context-window-overflow/)

## Prompt caching
- [Anthropic — Prompt caching (official)](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- [Anthropic cookbook — prompt_caching.ipynb](https://github.com/anthropics/anthropic-cookbook/blob/main/misc/prompt_caching.ipynb)
- [DigitalOcean — Prompt Caching for Anthropic and OpenAI Models](https://www.digitalocean.com/blog/prompt-caching-with-digital-ocean)
- [MindStudio — What Is Anthropic's Prompt Caching](https://www.mindstudio.ai/blog/anthropic-prompt-caching-claude-subscription-limits)

## Fuzzy edit matching
- [DataCamp — Fuzzy String Matching in Python](https://www.datacamp.com/tutorial/fuzzy-string-python)
- [Medium — Levenshtein Distance and Fuzzy Matching in Python](https://medium.com/analytics-vidhya/fuzzy-matching-in-python-2def168dee4a)
- [Medium — Deep Dive into String Similarity: From Edit Distance to Fuzzy Matching](https://medium.com/data-science-collective/deep-dive-into-string-similarity-from-edit-distance-to-fuzzy-matching-theory-and-practice-in-68e214c0cb1d)
- [Medium — The Two Algorithms Every Developer Uses Wrong: A Visual Guide to Fuzzy String Matching](https://medium.com/@r.manov/the-two-algorithms-every-developer-uses-wrong-a-visual-guide-to-fuzzy-string-matching-5d97961bb465)

## Sub-agents & delegation
- [Anthropic — How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
- [Google ADK — Multi-agent systems](https://google.github.io/adk-docs/agents/multi-agents/)
- [LangChain — Multi-agent docs](https://docs.langchain.com/oss/python/langchain/multi-agent)
- [DEV — Build Multi-Agent Systems Using the Agents as Tools Pattern](https://dev.to/aws/build-multi-agent-systems-using-the-agents-as-tools-pattern-jce)
- [arXiv — The Orchestration of Multi-Agent Systems](https://arxiv.org/html/2601.13671v1)

## Permission models & safety
- [Claude Code — Configure permissions](https://code.claude.com/docs/en/permissions)
- [Anthropic — Claude Code auto mode: a safer way to skip permissions](https://www.anthropic.com/engineering/claude-code-auto-mode)
- [Claude Fast — Claude Code Permissions: Safe vs Fast Development Modes](https://claudefa.st/blog/guide/development/permission-management)
- [DEV — Lock Down Claude Code With 5 Permission Patterns](https://dev.to/klement_gunndu/lock-down-claude-code-with-5-permission-patterns-4gcn)
- [Adversa — Critical Claude Code vulnerability: Deny rules silently bypassed](https://adversa.ai/blog/claude-code-security-bypass-deny-rules-disabled/) — relevance for bash parser choice
- [ClaudeLog — What is Wildcard Bash Permissions in Claude Code](https://claudelog.com/faqs/what-is-wildcard-bash-permissions-in-claude-code/)

## Project instructions (AGENTS.md, CLAUDE.md)
- [agents.md — official format](https://agents.md/)
- [HumanLayer — Writing a good CLAUDE.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)
- [Medium — The Complete Guide to AI Agent Memory Files](https://medium.com/data-science-collective/the-complete-guide-to-ai-agent-memory-files-claude-md-agents-md-and-beyond-49ea0df5c5a9)
- [Augment Code — How to Build Your AGENTS.md (2026)](https://www.augmentcode.com/guides/how-to-build-agents-md)
- [DeployHQ — How to Configure Every AI Coding Assistant](https://www.deployhq.com/blog/ai-coding-config-files-guide)

## Doom loop / infinite loop detection
- [opencode PR #3445 — add doom loop detection](https://github.com/anomalyco/opencode/pull/3445)
- [Medium — LLM Tool-Calling in Production: Rate Limits, Retries, and the "Infinite Loop" Failure Mode](https://medium.com/@komalbaparmar007/llm-tool-calling-in-production-rate-limits-retries-and-the-infinite-loop-failure-mode-you-must-2a1e2a1e84c8)
- [Agent Patterns — Infinite Agent Loop](https://www.agentpatterns.tech/en/failures/infinite-loop)

## OpenTelemetry / observability
- [OpenTelemetry blog — AI Agent Observability (2025)](https://opentelemetry.io/blog/2025/ai-agent-observability/)
- [Uptrace — OpenTelemetry for AI Systems (2026)](https://uptrace.dev/blog/opentelemetry-ai-systems)
- [Agenta — The AI Engineer's Guide to LLM Observability with OpenTelemetry](https://agenta.ai/blog/the-ai-engineer-s-guide-to-llm-observability-with-opentelemetry)
- [OpenLLMetry — open-source observability for GenAI](https://github.com/traceloop/openllmetry)

## Tree-sitter
- [Tree-sitter — official intro](https://tree-sitter.github.io/tree-sitter/)
- [Tree-sitter on GitHub](https://github.com/tree-sitter/tree-sitter)

## Effect-TS (foundation)
- [Effect — Retrying](https://effect.website/docs/error-management/retrying/)
- [Effect — official site](https://effect.website/)
- [Type Driven Blog — Why Effect is Becoming the Go-To Choice for TypeScript APIs](https://blog.type-driven.com/effect-ts-new-standard/)
- [PaulJPhilp/EffectPatterns](https://github.com/PaulJPhilp/EffectPatterns)
