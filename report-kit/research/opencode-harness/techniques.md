---
title: opencode — Kỹ thuật harness (notes tổng hợp)
created: 2026-04-20
updated: 2026-04-20
tags: [opencode, notes]
status: stable
---

# Notes: Các kỹ thuật harness trong opencode

Tổng hợp từ 4 subagent phân tích. Repo: `/sessions/kind-sleepy-dijkstra/opencode-src/` (anomalyco/opencode, aka sst/opencode fork).

## A. Agent Loop & Streaming
1. **ReAct loop với finish-reason-aware exit** — `session/prompt.ts:1305-1530` (runLoop). Kiểm tra finish reason SAU khi tool execute, không trước. Tránh exit sớm khi model stop nhưng vẫn có tool call pending.
2. **Streaming event demultiplexer** — `session/processor.ts:216-461` (handleEvent). Switch theo event type: reasoning-start/delta, text-delta, tool-input-start, tool-call, finish. Mỗi event mutate state riêng.
3. **Deferred tool call coordination** — `session/processor.ts:134-195, 273-278`. `ctx.toolcalls: Record<string, {done: Deferred}>`. Loop đợi tất cả tool done trước khi qua step tiếp, timeout 250ms.
4. **Interruption-safe scope cleanup** — `session/processor.ts:544-582`. `Effect.ensuring(cleanup())` wrap toàn bộ stream. Interrupt → `halt(AbortError)`. Retry lồng bên trong ensuring.
5. **Synthetic system reminder** — `session/prompt.ts:1453-1468`. Step>1, wrap new user messages trong `<system-reminder>` tags, nhắc model address msg mới trước khi tiếp tục.
6. **Doom loop detection** — `session/processor.ts`. 3 tool call giống hệt nhau liên tiếp → `permission.ask({permission: "doom_loop"})`.

## B. Context Management
7. **Token-based overflow detection** — `session/overflow.ts:1-26`. `usable = input_limit - reserved` (default 20k reserve). Count bao gồm cache.read + cache.write (quan trọng cho Anthropic).
8. **Tail-turn preserving compaction** — `session/compaction.ts:33-170`. `tailBudget = 25% usable, min 2k, max 8k`. Giữ N turn cuối (default 2). Compact phần còn lại.
9. **Tool output pruning với protected tools** — `session/compaction.ts:171-219`. Protected: `["skill"]`. Mark `time.compacted` thay vì xoá. Skip 2 user turns cuối.
10. **Cache-aware system prompt structure** — `session/system.ts` + `session/llm.ts:99-160`. Giữ 2-part: `[header, rest]`. Header cache reusable, rest ephemeral. Rejoin sau plugin transform để preserve breakpoint.
11. **Auto compaction continuation** — `session/compaction.ts:372-451`. Sau compact: replay user msg (media → text description) HOẶC synthetic "continue" prompt với `metadata.compaction_continue: true`.
12. **Structured compaction template** — `session/compaction.ts:277-299`. Default template: Goal / Instructions / Discoveries / Accomplished / Relevant files. Plugin hook override.

## C. Tool Design
13. **Tool description .txt pattern** — mỗi tool có cặp `.ts` + `.txt`. Import: `import DESCRIPTION from "./bash.txt"`. Template variable injection (OS, shell). Dễ A/B test prompt.
14. **Effect-based lazy tool init** — `tool/tool.ts:119-142`. `Tool.define(id, init: Effect)` → resolve Truncate + Agent services at definition time. `wrap()` intercepts execute cho truncation + tracing.
15. **Output truncation (tail-keep + file spill)** — `tool/truncate.ts:64-126`. MAX_LINES=2000, MAX_BYTES=50KB. Direction head/tail. Overflow → file trên disk, hint cho agent dùng Task hoặc Grep để đọc.
16. **Zod schema validation với custom error format** — `tool/tool.ts:86-96`. `parameters.parse(args)` → custom message "Please rewrite the input..." khi fail.
17. **Fuzzy edit matching (3-tier)** — `tool/edit.ts:182-350`. SimpleReplacer → LineTrimmedReplacer → BlockAnchorReplacer (first+last line anchor, Levenshtein middle). Threshold: 0.0 single, 0.3 multiple candidates.
18. **Bash command tree-sitter scan** — `tool/bash.ts:150-320`. Parse bash/powershell WASM lazy-loaded. Detect file-modifying commands (rm, cp, mv...). Extract paths for permission request.
19. **Sub-agent via Task tool** — `tool/task.ts:69-145`. Create child session với permission rules limited (no todowrite/task unless allowed). Call `ops.prompt()` recursive.
20. **Plugin tool dynamic discovery** — `tool/registry.ts:152-173`. Glob scan `{tool,tools}/*.{js,ts}` trong config dirs. Dynamic import. Wrap với fromPlugin để auto-truncate.
21. **Metadata & OTel tracing pipeline** — `tool/tool.ts:78-113`. `Effect.withSpan("Tool.execute")` với tool.name, session.id, call.id. Tools call `ctx.metadata({diff, diagnostics})` mid-execution.

## D. Provider Abstraction
22. **Multi-provider SDK lazy loading** — `provider/provider.ts:92-117`. `BUNDLED_PROVIDERS: Record<string, () => Promise<Loader>>`. 20+ providers (Anthropic, OpenAI, Google, Bedrock, Mistral, ...). Dynamic import khi dùng.
23. **Provider-specific message transformation** — `provider/transform.ts:48-150`. Anthropic: split tool_use + non-tool thành 2 messages. Mistral: truncate toolCallId to 9 chars, pad. Claude: sanitize alphanum.
24. **Overflow pattern detection (25+ regex)** — `provider/error.ts:8-193`. `OVERFLOW_PATTERNS`: "prompt is too long", "exceeds the context window", "no body 400/413"... Unified across providers.
25. **Retry với server header awareness** — `session/retry.ts:17-52`. `retry-after-ms` / `retry-after` header → respect server-directed. Fallback exponential: `2^(attempt-1) * 2000ms`, cap 30s. Skip retry on ContextOverflowError.
26. **Cost & capability matrix** — `provider/models.ts:30-96`. Per-model: cost{input,output,cache_read,cache_write}, temperature, tool_call, reasoning, attachment, modalities{input,output}. Enables cost-aware routing.

## E. Permission Model
27. **Wildcard last-match-wins evaluation** — `permission/evaluate.ts:1-15`. `rules.findLast(rule => Wildcard.match(permission, rule.permission) && Wildcard.match(pattern, rule.pattern))`. Actions: allow / deny / ask.
28. **Session-scoped permission state** — `permission/index.ts:130-282`. Reply: `once` / `always` / `reject`. `always` pattern auto-approves future matching requests. `reject` fails all pending.
29. **Arity-based command normalization** — `permission/arity.ts:1-161`. `ARITY = {touch:1, npm:2, "npm run":3, "git config":3, ...}` (450+ entries). Extract "human" command without flags.
30. **Per-tool permission context extraction** — `tool/bash.ts:261-282`. Scan command → extract dirs + patterns. Ask with `patterns` (exact) + `always` (suggested wildcard like `"ls *"`).
31. **Config-driven permission với order preserved** — `config/permission.ts:1-77`. `__originalKeys` preprocessing preserves YAML key order (last rule wins).

## F. System Prompt & Instructions
32. **Model-specific system prompt dispatch** — `session/system.ts:19-77`. `if gpt-4/o1 → PROMPT_BEAST, gpt → PROMPT_GPT, gemini → PROMPT_GEMINI, claude → PROMPT_ANTHROPIC, default`.
33. **Dynamic env + skill injection** — `session/system.ts:48-77`. Every call: `<env>directory, worktree, git status, platform</env>` + available skills list (permission-gated).
34. **AGENTS.md / CLAUDE.md cascading** — `session/instruction.ts:52-62, 120-228`. FILES=["AGENTS.md","CLAUDE.md","CONTEXT.md"]. findUp từ cwd tới worktree. First match wins (no stacking). Per-message claims tracking prevents re-attach.
35. **OAuth flow với validation prompts** — `provider/auth.ts:42-223`. Each provider defines own prompt config + validator. Centralized ValidationFailed error.

---

## Ghi chú riêng

- **Stack tech:** TypeScript, Bun, Effect (v4 beta), Drizzle ORM, AI SDK (Vercel), tree-sitter WASM, Zod.
- **Pattern chủ đạo:** Effect-based services + InstanceState per-directory + self-reexport ESM namespace.
- **Điểm khác biệt so với Claude Code / Aider / Cursor:**
  - Compaction được thiết kế bài bản hơn (tail-turn preserve, protected tools, media-to-text).
  - Permission model là first-class — arity normalization + wildcard + always/once/reject state.
  - Fuzzy edit 3-tier (most others chỉ 1-2 tier).
  - Effect-based interruption semantics (rare trong agent harnesses).
  - Provider transform làm rất sâu — per-provider quirks handling.
