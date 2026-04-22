# Index — Mục lục nghiên cứu

> Cập nhật lần cuối: 2026-04-22

File này là "bản đồ" của toàn bộ workspace. Mỗi khi thêm topic hoặc bài tổng hợp lớn, cập nhật ở đây.

## 🧰 Report Kit (canonical)

Mọi báo cáo đều nằm trong Astro project [`report-kit/`](../report-kit/):

- [`report-kit/src/pages/reports/`](../report-kit/src/pages/reports/) — các báo cáo `.astro` (canonical).
- [`report-kit/research/<slug>/`](../report-kit/research/) — notes thô + references của từng báo cáo.
- [`report-kit/src/data/reports.ts`](../report-kit/src/data/reports.ts) — registry metadata (card ở trang index).
- [`report-kit/src/pages/reports/_template.astro`](../report-kit/src/pages/reports/_template.astro) — mẫu để copy khi thêm báo cáo mới.
- [`report-kit/src/pages/components.astro`](../report-kit/src/pages/components.astro) — showcase mọi component.

Chạy dev server:

```bash
cd report-kit && npm install   # lần đầu
npm run dev                    # http://127.0.0.1:4321
```

- `/` — danh sách báo cáo, search + filter theo tag.
- `/components/` — showcase component.
- `/reports/<slug>/` — từng báo cáo.

Thêm báo cáo mới → xem [`../.claude/skills/build-report/SKILL.md`](../.claude/skills/build-report/SKILL.md) hoặc [`../CLAUDE.md`](../CLAUDE.md).

## Báo cáo hiện có

| Slug | Trạng thái | Mục tiêu | Canonical | Research notes | Bản gốc (archive) | Cập nhật |
|------|------------|----------|-----------|----------------|-------------------|----------|
| `lightrag` | `stable` | Overview LightRAG của HKUDS: cách tiếp cận, cài đặt, ứng dụng, graph-based indexing, dual-level retrieval, storage/API và vận hành production | [`reports/lightrag/index.astro`](../report-kit/src/pages/reports/lightrag/index.astro) | [`research/lightrag/`](../report-kit/research/lightrag/) | — | 2026-04-22 |
| `lightrag/indexing` | `stable` | Deep dive: chunking, entity/relation extraction, parser hardening, merge, source tracking, vector upsert và incremental update | [`reports/lightrag/indexing.astro`](../report-kit/src/pages/reports/lightrag/indexing.astro) | [`research/lightrag/deep-dives/indexing/`](../report-kit/research/lightrag/deep-dives/indexing/) | — | 2026-04-22 |
| `lightrag/retrieval` | `stable` | Deep dive: QueryParam modes, low/high keywords, local/global/hybrid/mix, vector chunks, token truncation, context build, rerank và references | [`reports/lightrag/retrieval.astro`](../report-kit/src/pages/reports/lightrag/retrieval.astro) | [`research/lightrag/deep-dives/retrieval/`](../report-kit/research/lightrag/deep-dives/retrieval/) | — | 2026-04-22 |
| `lightrag/storage-api` | `stable` | Deep dive: storage abstraction, Server/API/WebUI, setup wizard, Docker deployment và backend selection | [`reports/lightrag/storage-api.astro`](../report-kit/src/pages/reports/lightrag/storage-api.astro) | [`research/lightrag/deep-dives/storage-api/`](../report-kit/research/lightrag/deep-dives/storage-api/) | — | 2026-04-22 |
| `lightrag/operations` | `stable` | Deep dive: concurrency hierarchy, global LLM priority queue, deletion/rebuild, cache, token tracking, Langfuse, RAGAS và failure modes | [`reports/lightrag/operations.astro`](../report-kit/src/pages/reports/lightrag/operations.astro) | [`research/lightrag/deep-dives/operations/`](../report-kit/research/lightrag/deep-dives/operations/) | — | 2026-04-22 |
| `opencode` | `stable` | Hiểu sâu 28 kỹ thuật harness của sst/opencode; có code + pros/cons | [`reports/opencode/index.astro`](../report-kit/src/pages/reports/opencode/index.astro) | [`research/opencode-harness/`](../report-kit/research/opencode-harness/) | [`archive/opencode-harness-report.html`](../archive/opencode-harness-report.html) | 2026-04-20 |
| `opencode/t13` | `stable` | Deep dive: Tool description .txt pattern — tách description ra file .txt với template variable injection | [`reports/opencode/t13/index.astro`](../report-kit/src/pages/reports/opencode/t13/index.astro) | — | — | 2026-04-20 |
| `opencode/t14` | `stable` | Deep dive: Effect-based lazy tool init với service injection — Tool.define() + wrap() OTel | [`reports/opencode/t14/index.astro`](../report-kit/src/pages/reports/opencode/t14/index.astro) | — | — | 2026-04-20 |
| `opencode/t15` | `stable` | Deep dive: Output truncation tail-keep + file spill — "lossy on model, lossless on disk" | [`reports/opencode/t15/index.astro`](../report-kit/src/pages/reports/opencode/t15/index.astro) | — | — | 2026-04-20 |
| `opencode/t16` | `stable` | Deep dive: Zod schema validation với custom error format cho model self-correction | [`reports/opencode/t16/index.astro`](../report-kit/src/pages/reports/opencode/t16/index.astro) | — | — | 2026-04-20 |
| `opencode/t17` | `stable` | Deep dive: Fuzzy edit matching 3-tier (Simple → LineTrimmed → BlockAnchor) | [`reports/opencode/t17/index.astro`](../report-kit/src/pages/reports/opencode/t17/index.astro) | — | — | 2026-04-20 |
| `opencode/t18` | `stable` | Deep dive: Bash command parsing với tree-sitter WASM — full AST, extract paths | [`reports/opencode/t18/index.astro`](../report-kit/src/pages/reports/opencode/t18/index.astro) | — | — | 2026-04-20 |
| `opencode/t19` | `stable` | Deep dive: Sub-agent delegation via Task tool — createChildSession() + deniedTools | [`reports/opencode/t19/index.astro`](../report-kit/src/pages/reports/opencode/t19/index.astro) | — | — | 2026-04-20 |
| `opencode/t20` | `stable` | Deep dive: Plugin tool dynamic discovery — glob scan + dynamic import + fromPlugin wrap | [`reports/opencode/t20/index.astro`](../report-kit/src/pages/reports/opencode/t20/index.astro) | — | — | 2026-04-20 |
| `opencode/t21` | `stable` | Deep dive: Multi-provider SDK lazy loading — BUNDLED_PROVIDERS Record + lazy lambda | [`reports/opencode/t21/index.astro`](../report-kit/src/pages/reports/opencode/t21/index.astro) | — | — | 2026-04-20 |
| `opencode/t22` | `stable` | Deep dive: Provider-specific message transformation — TRANSFORMS dispatch table | [`reports/opencode/t22/index.astro`](../report-kit/src/pages/reports/opencode/t22/index.astro) | — | — | 2026-04-20 |
| `opencode/t23` | `stable` | Deep dive: Overflow pattern detection & retry với server headers — 25+ regex | [`reports/opencode/t23/index.astro`](../report-kit/src/pages/reports/opencode/t23/index.astro) | — | — | 2026-04-20 |
| `opencode/t24` | `stable` | Deep dive: Wildcard last-match-wins permission evaluation — findLast() + glob wildcard | [`reports/opencode/t24/index.astro`](../report-kit/src/pages/reports/opencode/t24/index.astro) | — | — | 2026-04-20 |
| `opencode/t25` | `stable` | Deep dive: Session-scoped permission state — once/always/reject + Deferred pattern | [`reports/opencode/t25/index.astro`](../report-kit/src/pages/reports/opencode/t25/index.astro) | — | — | 2026-04-20 |
| `opencode/t26` | `stable` | Deep dive: Arity-based command normalization — 450+ entries, longest-prefix match | [`reports/opencode/t26/index.astro`](../report-kit/src/pages/reports/opencode/t26/index.astro) | — | — | 2026-04-20 |
| `opencode/t27` | `stable` | Deep dive: Model-specific system prompt dispatch + dynamic env — regex dispatch + envBlock | [`reports/opencode/t27/index.astro`](../report-kit/src/pages/reports/opencode/t27/index.astro) | — | — | 2026-04-20 |
| `opencode/t28` | `stable` | Deep dive: AGENTS.md / CLAUDE.md cascading (findUp) — first-match-wins + attachedFiles Set | [`reports/opencode/t28/index.astro`](../report-kit/src/pages/reports/opencode/t28/index.astro) | — | — | 2026-04-20 |
| `openharness` | `stable` | Phân tích 30 kỹ thuật của HKUDS/OpenHarness ("Python port of Claude Code") + ohmo multi-channel agent; so sánh với opencode & Claude Code | [`reports/openharness.astro`](../report-kit/src/pages/reports/openharness.astro) | [`research/openharness/`](../report-kit/research/openharness/) | [`archive/openharness-harness-report.html`](../archive/openharness-harness-report.html) | 2026-04-20 |
| `llm-wiki` | `stable` | Overview 12 kỹ thuật của LLM Wiki pattern (Andrej Karpathy, April 2026) — thay RAG bằng wiki markdown persistent được LLM duy trì | [`reports/llm-wiki.astro`](../report-kit/src/pages/reports/llm-wiki.astro) | [`research/llm-wiki/`](../report-kit/research/llm-wiki/) | — | 2026-04-20 |
| `llm-wiki-architecture` | `stable` | Deep dive: Architecture & Operations — 3-layer folder, CLAUDE.md schema, Ingest/Query/Lint prompts, index.md + log.md design | [`reports/llm-wiki-architecture.astro`](../report-kit/src/pages/reports/llm-wiki-architecture.astro) | [`research/llm-wiki/deep-dives/architecture/`](../report-kit/research/llm-wiki/deep-dives/architecture/) | — | 2026-04-20 |
| `llm-wiki-memory` | `stable` | Deep dive: Knowledge Lifecycle & Memory — confidence scoring, supersession, Ebbinghaus forgetting curve, 4 consolidation tiers (LLM Wiki v2) | [`reports/llm-wiki-memory.astro`](../report-kit/src/pages/reports/llm-wiki-memory.astro) | [`research/llm-wiki/deep-dives/memory/`](../report-kit/research/llm-wiki/deep-dives/memory/) | — | 2026-04-20 |
| `llm-wiki-search` | `stable` | Deep dive: Knowledge Graph & Hybrid Search — typed entity relationships, BM25 + vector + graph traversal, RRF fusion (95.2% LongMemEval-S) | [`reports/llm-wiki-search.astro`](../report-kit/src/pages/reports/llm-wiki-search.astro) | [`research/llm-wiki/deep-dives/search/`](../report-kit/research/llm-wiki/deep-dives/search/) | — | 2026-04-20 |
| `llm-wiki-implementation` | `stable` | Deep dive: Implementation & Use Cases — 30-min setup guide, first ingest prompts, daily/research/team workflows, 5 use cases, 6 common mistakes | [`reports/llm-wiki-implementation.astro`](../report-kit/src/pages/reports/llm-wiki-implementation.astro) | [`research/llm-wiki/deep-dives/implementation/`](../report-kit/research/llm-wiki/deep-dives/implementation/) | — | 2026-04-20 |

## Ghi chú lẻ đáng chú ý

- **LightRAG = graph artifact builder + query context compiler**. Điểm đáng học nhất không phải WebUI mà là pipeline: chunk → entity/relation extraction → graph/vector upsert → query modes (`local/global/hybrid/mix`) → token-budgeted context. Snapshot nghiên cứu: `HKUDS/LightRAG` `v1.4.15` (`64d3326`).
- **LightRAG phù hợp corpus động hơn GraphRAG-style community reports**. Paper nhấn mạnh incremental update bằng merge graph fragment thay vì rebuild toàn bộ index/community reports; code production bổ sung doc_status, pipeline lock, source_ids và rebuild logic khi delete.
- **Default query mode trong source hiện là `mix`**. `mix` kết hợp local/global graph retrieval với direct vector chunks; đây là mode nên bắt đầu khi prototype thay vì chọn `local`/`global` quá sớm.
- **opencode = fork of sst/opencode** — repo `anomalyco/opencode` là fork/mirror. Core stack: TypeScript + Bun + Effect-TS v4 beta + Drizzle + Vercel AI SDK + tree-sitter WASM + Zod.
- **Effect-TS** là điểm khác biệt lớn so với harness khác (Claude Code, Aider, Cline dùng Promise thuần). Trade-off: onboarding khó hơn nhưng interruption / retry / tracing composable.
- **HKUDS/OpenHarness = "Python port của Claude Code" + agent organization**. Tech stack: Python 3.10+ asyncio + Pydantic v2 + Typer + dual TUI (Rich/Textual + React Ink) + Anthropic SDK + OpenAI SDK + MCP. Khác biệt lớn nhất vs opencode: multi-agent swarm (subprocess + mailbox + worktree), multi-channel bus (Slack/Feishu/Discord/Telegram/Matrix), Docker sandbox, cron scheduler, AST-based LSP.
- **5 ý tưởng đáng copy từ OpenHarness**: (1) per-project memory hash (SHA1 12 chars), (2) CJK-aware tokenizer (Han ideographs), (3) sensitive path hardcoded block (`~/.ssh`, `~/.aws/credentials`, ...), (4) subprocess + mailbox cho subagent, (5) dual-channel permission sync (file + mailbox).

## Ý tưởng / backlog

- So sánh harness opencode vs Claude Code ở mức source code (permission, compaction diff chi tiết).
- Build 1 prototype harness tối giản áp dụng top-5 kỹ thuật (T7, T8, T10, T15/T16, T25) của opencode.
- Nghiên cứu Effect-TS v4 beta — patterns trong context coding agent.
- Viết bài tổng hợp "Harness engineering cho người Việt" — dùng OpenHarness làm case study chính (Python dễ đọc hơn TS Effect-TS).
- Prototype agent swarm đơn giản: leader + 2 worker dùng mailbox pattern + git worktree, viết bằng Python ~500 LOC.
- So sánh OpenHarness permission model vs Claude Code permission policy 2.0 — viết ADR.

## Thay đổi cấu trúc

- 2026-04-22 — **LightRAG**: Thêm 5 trang mới (1 overview + 4 deep dives) về HKUDS/LightRAG `v1.4.15`: overview có cách tiếp cận, cài đặt, ứng dụng ở đầu; deep dives phủ indexing, retrieval/query modes, storage/API/WebUI và operations/concurrency/evaluation.
- 2026-04-20 — **Deep dives t13–t28**: Thêm 16 trang phân tích sâu cho opencode — Theme C (Tool Design), D (Provider Abstraction), E (Permission Model), F (System Prompt). Mỗi trang có code anatomy, diagram, failure modes, comparison, implementation recipe.
- 2026-04-20 — **LLM Wiki**: Thêm 5 trang mới (1 overview + 4 deep dives) về LLM Wiki pattern của Andrej Karpathy (gist April 2026, 16M views). Khám phá: LLM Wiki KHÔNG phải wiki về kỹ thuật LLM mà là pattern xây dựng knowledge base persistent bằng LLM thay thế RAG. Deep dives phủ: architecture 3-layer, LLM Wiki v2 memory tiers (rohitg00/agentmemory), hybrid search BM25+vector+graph (95.2% LongMemEval-S), và implementation guide.
- 2026-04-20 — **Reorganize**: `topics/` + `sources/` đã gộp vào `report-kit/research/<slug>/`; `artifacts/*.html` đã move vào `archive/`. CLAUDE.md được rewrite để report-kit là canonical (xem [`../CLAUDE.md`](../CLAUDE.md)).

---

**Trạng thái hợp lệ:** `exploring` → `in-progress` → `stable` → `archived`
