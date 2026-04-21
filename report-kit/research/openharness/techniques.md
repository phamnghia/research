---
title: HKUDS/OpenHarness — Kỹ thuật Harness (notes)
created: 2026-04-20
updated: 2026-04-20
topic: openharness
status: stable
---

# Notes: Kỹ thuật harness trong HKUDS/OpenHarness

Repo: `/sessions/kind-sleepy-dijkstra/openharness-src/` (HKUDS/OpenHarness, "Open-source Python port of Claude Code"). Tech stack: Python 3.10+, Anthropic SDK, OpenAI SDK, MCP, Pydantic, Rich/Textual + React Ink (dual TUI), Typer, httpx.

Tổng hợp 30 kỹ thuật từ 4 subagent phân tích các subsystem: engine, tools, permissions/memory/autopilot, swarm/channels/services.

## A. Agent Loop & Streaming (5)

1. **Async ReAct loop với branching single/parallel tool execution** — `engine/query.py:516-650` (`run_query`). Khi 1 tool → sequential stream event ngay. Khi 2+ tool → `asyncio.gather()` parallel, emit event sau.
2. **Auto-compact before-turn + reactive on overflow** — `engine/query.py:519-562` + `services/compact/`. `AUTOCOMPACT_BUFFER_TOKENS=13_000`. Microcompact (xoá tool_result cũ) trước, fallback LLM summary. Nếu API trả "prompt too long" → retry với `truncate_head_for_ptl_retry()`.
3. **Streaming events với union types + CompactProgressEvent 9-phase** — `engine/stream_events.py`. 7 event types; `CompactProgressEvent` có `hooks_start / context_collapse_start-end / session_memory_start-end / compact_start-retry-end-failed`.
4. **Pre/Post tool hook interception** — `engine/query.py:660-670`. Gọi `hook_executor.execute(PRE_TOOL_USE, payload)`. Nếu `blocked` → trả `ToolResultBlock(is_error=True)` ngay, không execute tool.
5. **Tool metadata carryover across turns** — `engine/query.py:146-250`. Track recent goals (5), read files (6), active artifacts (8), async agent tasks (12), work log (10). Giúp compaction giữ context của "đã làm gì".

## B. Context & Memory (4)

6. **Multi-layer system prompt assembly (9 sections)** — `prompts/context.py:74-158`. Base + env + effort/passes + skills + delegation + CLAUDE.md + local rules + issue/PR context + relevant memories. Atomic rebuild every turn.
7. **CLAUDE.md cascading discovery upward** — `prompts/claudemd.py:8-48`. Từ cwd lên root, collect `CLAUDE.md`, `.claude/CLAUDE.md`, `.claude/rules/*.md`. Dedup by path. Truncate 12000 chars/file.
8. **Per-project memory isolation (SHA1 hash)** — `memory/paths.py:11-22`. `~/.openharness/memory/{project-name}-{sha1[:12]}/`. MEMORY.md (index) + topic *.md files.
9. **Token-based semantic memory search với CJK** — `memory/search.py:12-40`. Tokenize ASCII ≥3 chars + Han ideographs `[\u4e00-\u9fff]`. Metadata weighted 2x. Rank + recency.

## C. Tool Design (4)

10. **Pydantic tool base class + auto JSON schema** — `tools/base.py:30-52`. `BaseTool` abstract với `input_model: type[BaseModel]`, `execute(args, ctx) -> ToolResult`. Schema auto-sinh từ `input_model.model_json_schema()`.
11. **Per-tool output truncation + UTF-8 normalization** — `bash_tool.py:129`, `web_fetch_tool.py:61`, `file_read_tool.py:57`. Bash 12KB, web 50KB, file 200 lines default. Decode UTF-8 `errors="replace"`.
12. **Bash interactive preflight + PTY + graceful timeout** — `bash_tool.py:145-208`. `_preflight_interactive_command()` reject scaffold commands thiếu `--yes/--ci`. Timeout 600s. `terminate(2s) → kill`. PTY mode real-time output, stderr→stdout merge.
13. **Ripgrep-first Glob/Grep + Python fallback** — `glob_tool.py:65-122`, `grep_tool.py:37-83`. Prefer `rg --files --glob` (respect .gitignore). Include hidden khi detect git repo. Python fallback khi rg không có.

## D. Extension Ecosystem (4)

14. **Markdown-based skill system + frontmatter discovery** — `skills/loader.py:27-51`. Scan bundled + `~/.openharness/skills/<skill>/SKILL.md` + plugin skills. YAML frontmatter (`name`, `description`). Fallback heading + first paragraph.
15. **Hook lifecycle system (6 events, 4 types, hot reload)** — `hooks/events.py, executor.py`. Events: SESSION_START/END, PRE/POST_COMPACT, PRE/POST_TOOL_USE. Types: Command (shell), Prompt (LLM-based), HTTP (POST), Agent (deeper). `HookReloader` watch mtime.
16. **Plugin manifest-based loading** — `plugins/loader.py:104-157`. Paths: `~/.openharness/plugins/`, `.openharness/plugins/`. Manifest xác định `skills_dir`, `hooks_file`, `mcp_file`. Command namespace `plugin:dir:file`.
17. **MCP stdio + HTTP transport với dynamic adapter** — `mcp/client.py:29-95`. `McpClientManager` aggregate tools từ N servers. `AsyncExitStack` per server. Dynamic Pydantic model từ JSON schema.

## E. Permission & Safety (4)

18. **3-mode permission system (DEFAULT/PLAN/FULL_AUTO)** — `permissions/modes.py`. DEFAULT = read OK, write cần confirm. PLAN = block mutations. FULL_AUTO = everything OK. Mode tách riêng khỏi approval flow.
19. **Built-in sensitive path protection** — `permissions/checker.py:14-37`. Hardcoded 10+ glob patterns (`*/.ssh/*`, `*/.aws/credentials`, `*/.azure/*`, `*/.kube/config`, ...). Unconditional block kể cả trong FULL_AUTO.
20. **6-layer hierarchical permission evaluation + path normalization** — `permissions/checker.py:75-169`. (1) sensitive → (2) deny tool → (3) allow tool → (4) path rules → (5) command deny → (6) mode. Path normalize: `strip('/')` + variant với trailing slash để tránh bypass.
21. **Async interactive approval với UUID + 300s timeout + lock** — `ui/backend_host.py:684-706`. Per-request UUID, async `Future`, 300s timeout, `_permission_lock` tránh race.

## F. Multi-Agent Swarm (5) — UNIQUE vs opencode

22. **Subprocess-based subagent spawning** — `swarm/subprocess_backend.py:28-103`. Mỗi agent = 1 subprocess độc lập. `BackgroundTaskManager.create_agent_task()`. Inherit env + CLI flags. Fault-isolated.
23. **File-based async mailbox với atomic writes** — `swarm/mailbox.py:1-95`. Inbox = `~/.openharness/teams/<team>/agents/<id>/inbox/`. Write `.tmp` → rename. Messages: user_message, permission_request, shutdown, ...
24. **Dual-channel permission sync protocol** — `swarm/permission_sync.py`. File-based (`pending/` + `resolved/` JSON) + mailbox-based. Read-only heuristic auto-approve. Decouple worker block từ leader resolve.
25. **Git worktree isolation per agent** — `swarm/worktree.py:1-80`. Mỗi agent 1 worktree (fast, shallow). Slug validation (max 64, `[a-zA-Z0-9._-]`, reject `..`/absolute). Tránh race trên `src/`.
26. **YAML-based agent definitions + coordinator** — `coordinator/agent_definitions.py`. Declarative profile: `name, description, system_prompt, tools, disallowed_tools, model, effort, permission_mode, max_turns, color, isolation`. Coordinator spawn đúng agent cho task.

## G. External Integrations (4) — Phần lớn UNIQUE vs opencode

27. **Multi-channel bus (Slack/Feishu/Discord/Telegram/Matrix)** — `channels/bus/queue.py` + `channels/impl/*`. `MessageBus` với `inbound/outbound` asyncio.Queue. Single agent có thể lắng nghe N channels. Feishu 40KB WebSocket long-connection + interactive cards.
28. **LSP-based code intelligence via AST** — `services/lsp/__init__.py:1-100`. `list_document_symbols`, `workspace_symbol_search`, `go_to_definition`, `find_references`, `hover`. Python AST parse read-only, secure. Không phải full LSP server.
29. **Docker sandbox cho tool execution** — `sandbox/docker_backend.py`. Container isolated (`openharness-sandbox-<session>`). Check daemon/platform trước. Tool chạy trong container tránh host compromise.
30. **Cron scheduler + persistent background tasks** — `tasks/manager.py` + `services/cron_scheduler.py`. `BackgroundTaskManager` CRUD tasks. Cron registry JSON + `cron_history.jsonl`. Tick mỗi 30s. Per-job enable/disable.

---

## So sánh nhanh với opencode

| Aspect | OpenHarness | opencode (sst/anomalyco) |
|---|---|---|
| Language | Python 3.10+ | TypeScript + Bun |
| Foundation | Pydantic + asyncio + Typer | Effect-TS + Bun runtime |
| TUI | Rich/Textual + React Ink (dual) | React Ink |
| Multi-agent | **Subprocess + worktree + mailbox** | In-session Task tool |
| Channels | **Slack/Feishu/Discord/Telegram** | N/A (CLI only) |
| Autopilot | **Repo autopilot với CI integration** | N/A |
| Permission | 3-mode + sensitive path protection | Wildcard + arity + state |
| Compaction | Auto-compact before-turn + reactive | Tail-preserving + template |
| Sandbox | **Docker optional** | N/A |
| Memory | **Per-project dir (MEMORY.md)** | N/A (CLAUDE.md only) |
| LSP | **AST-based built-in** | N/A |
| Cron | **Persistent scheduler** | N/A |

OpenHarness khác biệt lớn nhất: **multi-agent swarm** (subprocess + worktree) + **external channels** + **autopilot** + **Docker sandbox**. Tạo ra "agent organization" thay vì "agent-in-terminal".
