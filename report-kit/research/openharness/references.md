---
title: HKUDS/OpenHarness — references
created: 2026-04-20
updated: 2026-04-20
topic: openharness
---

# References — HKUDS/OpenHarness

## Repo gốc
- [HKUDS/OpenHarness](https://github.com/HKUDS/OpenHarness) — repo chính
- [HKUDS/OpenHarness — SHOWCASE](https://github.com/HKUDS/OpenHarness/blob/main/docs/SHOWCASE.md)
- [HKUDS/ClawTeam](https://github.com/HKUDS/ClawTeam) — integration partner
- [Awesome Harness Engineering](https://github.com/ai-boost/awesome-harness-engineering)

## Harness engineering
- [Martin Fowler — Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html)
- [HumanLayer — Skill Issue: Harness Engineering for Coding Agents](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents)
- [OpenAI — Harness engineering](https://openai.com/index/harness-engineering/)
- [Avi Chawla — The Anatomy of an Agent Harness](https://blog.dailydoseofds.com/p/the-anatomy-of-an-agent-harness)
- [DEV — Building a Production-Ready AI Agent Harness](https://dev.to/apssouza22/building-a-production-ready-ai-agent-harness-2570)

## Async Python & Agent loop
- [Python asyncio — gather & task concurrency](https://docs.python.org/3/library/asyncio-task.html)
- [Trio/asyncio — Structured concurrency in Python](https://trio.readthedocs.io/en/stable/reference-core.html)
- [IBM — What is a ReAct Agent](https://www.ibm.com/think/topics/react-agent)
- [Medium — ReAct Agent from Scratch (Python)](https://medium.com/data-science-collective/a-super-simple-react-agent-87913949f69f)

## Context compaction & memory
- [Microsoft Learn — Compaction](https://learn.microsoft.com/en-us/agent-framework/agents/conversations/compaction)
- [JetBrains Research — Smarter Context Management](https://blog.jetbrains.com/research/2025/12/efficient-context-management/)
- [Factory.ai — Compressing Context](https://factory.ai/news/compressing-context)
- [Morph — Compaction vs Summarization](https://www.morphllm.com/compaction-vs-summarization)
- [arXiv — Solving Context Window Overflow in AI Agents](https://arxiv.org/html/2511.22729v1)
- [Medium — Complete Guide to AI Agent Memory Files (CLAUDE.md, AGENTS.md)](https://medium.com/data-science-collective/the-complete-guide-to-ai-agent-memory-files-claude-md-agents-md-and-beyond-49ea0df5c5a9)

## Prompt layering
- [agents.md — official format](https://agents.md/)
- [HumanLayer — Writing a good CLAUDE.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)
- [Augment Code — How to Build Your AGENTS.md (2026)](https://www.augmentcode.com/guides/how-to-build-agents-md)

## Pydantic & tool base
- [Pydantic — Models docs](https://docs.pydantic.dev/latest/)
- [Pydantic AI — Agents](https://pydantic.dev/docs/ai/core-concepts/agent/)
- [Pydantic AI — Tools](https://ai.pydantic.dev/tools/)

## Tool design, ripgrep, truncation
- [BurntSushi/ripgrep — README](https://github.com/BurntSushi/ripgrep)
- [DEV — Parsing bash commands in Python (shlex)](https://docs.python.org/3/library/shlex.html)
- [Python pty module](https://docs.python.org/3/library/pty.html)

## MCP (Model Context Protocol)
- [MCP — official spec](https://modelcontextprotocol.io/)
- [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk)
- [Anthropic — Introducing the MCP](https://www.anthropic.com/news/model-context-protocol)
- [MCP Transport spec (stdio, HTTP)](https://modelcontextprotocol.io/docs/concepts/transports)

## Hooks & plugins
- [Claude Code — Hooks documentation](https://code.claude.com/docs/en/hooks)
- [Claude Code — Plugins documentation](https://code.claude.com/docs/en/plugins)
- [DEV — 5 Permission Patterns in Claude Code](https://dev.to/klement_gunndu/lock-down-claude-code-with-5-permission-patterns-4gcn)

## Permission & safety
- [Claude Code — Configure permissions](https://code.claude.com/docs/en/permissions)
- [Anthropic — Claude Code auto mode](https://www.anthropic.com/engineering/claude-code-auto-mode)
- [Adversa — Claude Code Deny rules silently bypassed](https://adversa.ai/blog/claude-code-security-bypass-deny-rules-disabled/)

## Multi-agent coordination (swarm)
- [Anthropic — Multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
- [Google ADK — Multi-agent systems](https://google.github.io/adk-docs/agents/multi-agents/)
- [LangChain — Multi-agent docs](https://docs.langchain.com/oss/python/langchain/multi-agent)
- [DEV — Agents as Tools Pattern](https://dev.to/aws/build-multi-agent-systems-using-the-agents-as-tools-pattern-jce)
- [OpenAI Swarm — Research](https://github.com/openai/swarm)

## Git worktree
- [git-worktree docs](https://git-scm.com/docs/git-worktree)
- [Atlassian — Git Worktree Beginner Guide](https://www.atlassian.com/git/tutorials/git-worktree)
- [Shopify — Managing multiple branches with worktree](https://shopify.engineering/maintaining-multiple-worktrees-with-git)

## IPC & mailbox patterns
- [LWN — File-based IPC patterns](https://lwn.net/Articles/820462/)
- [Redis blog — Message queue patterns](https://redis.io/glossary/message-queue/)
- [Enterprise Integration Patterns — Messaging Mailbox](https://www.enterpriseintegrationpatterns.com/patterns/messaging/)

## Channel integration (Slack/Feishu/Telegram/Discord)
- [Slack Bolt Python SDK](https://slack.dev/bolt-python/)
- [Feishu OAPI (lark-oapi)](https://open.feishu.cn/document/home)
- [python-telegram-bot docs](https://docs.python-telegram-bot.org/)
- [discord.py docs](https://discordpy.readthedocs.io/)

## LSP & code intelligence
- [Microsoft LSP spec](https://microsoft.github.io/language-server-protocol/)
- [Python ast module docs](https://docs.python.org/3/library/ast.html)
- [Jedi — Python autocompletion](https://github.com/davidhalter/jedi)

## Sandbox & Docker
- [Docker Python SDK (docker-py)](https://docker-py.readthedocs.io/)
- [OWASP — Container Security Verification](https://owasp.org/www-project-container-security/)
- [gVisor — Application kernel sandbox](https://gvisor.dev/)

## Cron & background jobs
- [python-croniter](https://github.com/kiorky/croniter)
- [APScheduler — Python scheduling](https://apscheduler.readthedocs.io/)
- [Celery — Distributed task queue](https://docs.celeryq.dev/)

## Observability
- [OpenTelemetry blog — AI Agent Observability (2025)](https://opentelemetry.io/blog/2025/ai-agent-observability/)
- [OpenLLMetry — open-source observability for GenAI](https://github.com/traceloop/openllmetry)

## Personalization & fact extraction
- [LangChain — Memory with entities](https://python.langchain.com/docs/modules/memory/types/entity_summary_memory)
- [Mem0 — Personalized memory for AI](https://github.com/mem0ai/mem0)

## So sánh harness (opencode, Claude Code, Codex, Cline)
- [Gist — AI Coding Agent Architecture: Claude Code vs Codex vs Cline vs OpenCode](https://gist.github.com/Haseeb-Qureshi/2213cc0487ea71d62572a645d7582518)
- [DeployHQ — Configure Every AI Coding Assistant](https://www.deployhq.com/blog/ai-coding-config-files-guide)

## Doom loop / failure modes
- [Medium — LLM Tool-Calling in Production: Rate Limits, Retries, Infinite Loop Failure Mode](https://medium.com/@komalbaparmar007/llm-tool-calling-in-production-rate-limits-retries-and-the-infinite-loop-failure-mode-you-must-2a1e2a1e84c8)
- [Agent Patterns — Infinite Loop](https://www.agentpatterns.tech/en/failures/infinite-loop)
