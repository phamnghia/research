// reports.ts — registry metadata cho tất cả báo cáo
// Mỗi khi thêm báo cáo mới, thêm 1 entry vào đây để trang index tự pick up.

export type ReportStatus = 'exploring' | 'in-progress' | 'stable' | 'archived';

/** Loại báo cáo trong hệ thống general→detail */
export type ReportKind = 'overview' | 'deep-dive';

export interface Report {
  /** slug dùng làm URL (match với tên file trong src/pages/reports/) */
  slug: string;
  title: string;
  /** mô tả ngắn hiển thị trên card */
  description: string;
  /** ngày tạo / cập nhật gần nhất (YYYY-MM-DD) */
  date: string;
  /** số kỹ thuật / size indicator */
  techniqueCount?: number;
  status: ReportStatus;
  /** repo / project được phân tích */
  repo?: string;
  /** tags dùng để filter */
  tags: string[];
  /**
   * Loại báo cáo trong luồng general→detail.
   * - 'overview'   : báo cáo tổng quan (default, không cần khai báo rõ)
   * - 'deep-dive'  : phân tích sâu 1 topic của báo cáo cha
   */
  kind?: ReportKind;
  /**
   * Slug của báo cáo cha (chỉ set khi kind === 'deep-dive').
   * Dùng để index hiển thị breadcrumb "← <parent title>".
   */
  parentSlug?: string;
  /**
   * Tên topic mà deep-dive này đi sâu vào (vd: 'ReAct Loop', 'Permission Engine').
   * Chỉ cần thiết khi kind === 'deep-dive'.
   */
  topicLabel?: string;
  /**
   * Ảnh đại diện trên trang chủ — đường dẫn tĩnh trong `public/`
   * (vd `/thumbnails/opencode.svg`).
   */
  thumbnail?: string;
}

/** Thumbnail hiển thị trên card landing (fallback nếu không khai báo). */
export function getReportThumbnail(r: Report): string {
  return r.thumbnail ?? '/thumbnails/default.svg';
}

export const reports: Report[] = [
  // ── LightRAG — HKUDS ─────────────────────────────────────────────────────
  {
    slug: 'lightrag',
    title: 'LightRAG — Graph RAG nhẹ, nhanh và cập nhật tăng dần',
    description:
      'Nghiên cứu chuyên sâu LightRAG của HKUDS: cách tiếp cận, cài đặt, ứng dụng, graph-based indexing, dual-level retrieval, storage/API và vận hành production. Gồm 4 deep dive về indexing, retrieval, storage/API và operations.',
    date: '2026-04-22',
    techniqueCount: 10,
    status: 'stable',
    repo: 'HKUDS/LightRAG',
    kind: 'overview',
    tags: ['lightrag', 'rag', 'graph-rag', 'knowledge-graph', 'retrieval', 'python'],
    thumbnail: '/thumbnails/lightrag.jpg',
  },
  {
    slug: 'lightrag/indexing',
    title: 'Deep Dive: LightRAG Indexing Pipeline',
    description:
      'Phân tích chi tiết pipeline indexing của LightRAG: chunking, entity/relation extraction, parser hardening, merge, source tracking, vector upsert và incremental update.',
    date: '2026-04-22',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'lightrag',
    topicLabel: 'Indexing Pipeline',
    tags: ['lightrag', 'indexing', 'knowledge-graph', 'entity-extraction', 'python'],
  },
  {
    slug: 'lightrag/retrieval',
    title: 'Deep Dive: LightRAG Retrieval & Query Modes',
    description:
      'QueryParam modes, low/high keywords, local/global/hybrid/mix, vector chunks, token truncation, context build, rerank và references trong LightRAG.',
    date: '2026-04-22',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'lightrag',
    topicLabel: 'Retrieval & Query Modes',
    tags: ['lightrag', 'retrieval', 'query-mode', 'rerank', 'graph-rag'],
  },
  {
    slug: 'lightrag/storage-api',
    title: 'Deep Dive: LightRAG Storage, API & WebUI',
    description:
      'Storage abstraction, Server/API/WebUI, setup wizard, Docker deployment và backend selection của LightRAG v1.4.15.',
    date: '2026-04-22',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'lightrag',
    topicLabel: 'Storage, API & WebUI',
    tags: ['lightrag', 'storage', 'api', 'webui', 'deployment'],
  },
  {
    slug: 'lightrag/operations',
    title: 'Deep Dive: LightRAG Operations, Concurrency & Evaluation',
    description:
      'Vận hành LightRAG: concurrency hierarchy, global LLM priority queue, deletion/rebuild, cache, token tracking, Langfuse, RAGAS và failure modes.',
    date: '2026-04-22',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'lightrag',
    topicLabel: 'Operations, Concurrency & Evaluation',
    tags: ['lightrag', 'operations', 'concurrency', 'cache', 'observability'],
  },
  // ── LLM Wiki — Andrej Karpathy ────────────────────────────────────────────
  {
    slug: 'llm-wiki',
    title: 'LLM Wiki — Andrej Karpathy',
    description:
      'Phân tích đầy đủ pattern LLM Wiki của Andrej Karpathy (April 2026): thay thế RAG với wiki markdown compounding được LLM duy trì liên tục. Bao gồm architecture 3 lớp, 3 operations, knowledge lifecycle, hybrid search và implementation trong 30 phút.',
    date: '2026-04-20',
    techniqueCount: 12,
    status: 'stable',
    kind: 'overview',
    tags: ['llm-wiki', 'rag', 'knowledge-base', 'karpathy', 'markdown', 'obsidian', 'claude-code'],
    thumbnail: '/thumbnails/llm-wiki.jpg',
  },
  {
    slug: 'llm-wiki/architecture',
    title: 'Deep Dive: Architecture & Operations',
    description:
      'Phân tích chi tiết kiến trúc 3 lớp, ba operations (ingest/query/lint), schema CLAUDE.md đầy đủ, prompt templates, index.md design và schema co-evolution lifecycle.',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'llm-wiki',
    topicLabel: 'Architecture & Operations',
    tags: ['llm-wiki', 'architecture', 'schema', 'operations'],
  },
  {
    slug: 'llm-wiki/memory',
    title: 'Deep Dive: Knowledge Lifecycle & Memory',
    description:
      'LLM Wiki v2: confidence scoring, supersession (version control cho knowledge), Ebbinghaus forgetting curves, bốn tầng memory, automation hooks và multi-agent sync từ agentmemory project.',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'llm-wiki',
    topicLabel: 'Knowledge Lifecycle & Memory',
    tags: ['llm-wiki', 'memory', 'confidence', 'automation', 'agentmemory'],
  },
  {
    slug: 'llm-wiki/search',
    title: 'Deep Dive: Knowledge Graph & Hybrid Search',
    description:
      'Entity extraction, typed relationships, graph traversal queries, hybrid search (BM25 + vector + graph với RRF fusion) và scale breakpoints cho wiki >200 pages. Benchmark: 95.2% LongMemEval-S.',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'llm-wiki',
    topicLabel: 'Knowledge Graph & Hybrid Search',
    tags: ['llm-wiki', 'knowledge-graph', 'bm25', 'vector-search', 'hybrid-search'],
  },
  {
    slug: 'llm-wiki/implementation',
    title: 'Deep Dive: Implementation & Use Cases',
    description:
      'Hướng dẫn setup 30 phút, prompt templates đầy đủ, 5 use cases thực tế (research/book/personal/team), common mistakes và ecosystem tools (Obsidian, Claude Code, Web Clipper, Git).',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'llm-wiki',
    topicLabel: 'Implementation & Use Cases',
    tags: ['llm-wiki', 'obsidian', 'claude-code', 'tutorial', 'use-cases'],
  },
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'opencode',
    title: 'opencode — Harness Engineering',
    description:
      'Nghiên cứu sâu 28 kỹ thuật harness trong sst/opencode: ReAct loop, streaming demux, compaction, permission engine, multi-provider abstraction. Code thật từ repo + pros/cons + references.',
    date: '2026-04-20',
    techniqueCount: 28,
    status: 'stable',
    repo: 'anomalyco/opencode',
    tags: ['harness', 'typescript', 'effect-ts', 'bun', 'agent-loop', 'opencode'],
    thumbnail: '/thumbnails/opencode.jpg',
  },
  // ── opencode deep-dives: Theme C — Tool Design (t13–t20) ──────────────────
  {
    slug: 'opencode/t13',
    title: 'T13 — Tool description .txt pattern',
    description: 'Tách tool description thành file .txt riêng với template variable injection ({PLATFORM}, {SHELL}) — version control tốt, dễ A/B test prompt, non-dev có thể edit.',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'opencode',
    topicLabel: 'Tool description .txt pattern',
    tags: ['tool-design', 'typescript', 'opencode'],
  },
  {
    slug: 'opencode/t14',
    title: 'T14 — Effect-based lazy tool init với service injection',
    description: 'Tool.define() nhận Effect init để resolve Truncate/Agent services 1 lần tại define-time. wrap() tự động chèn truncation + OTel span cho mọi tool.',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'opencode',
    topicLabel: 'Effect-based lazy tool init',
    tags: ['tool-design', 'effect-ts', 'opentelemetry', 'opencode'],
  },
  {
    slug: 'opencode/t15',
    title: 'T15 — Output truncation với tail-keep + file spill',
    description: '"Lossy on model, lossless on disk" — giữ 2000 dòng cuối, spill full output ra /tmp để agent đọc lại bằng Read/Grep. Tránh context flood.',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'opencode',
    topicLabel: 'Output truncation tail-keep + file spill',
    tags: ['tool-design', 'context-management', 'opencode'],
  },
  {
    slug: 'opencode/t16',
    title: 'T16 — Zod schema validation với custom error format',
    description: 'safeParse() → "Please rewrite the input with valid arguments. Errors: field.path: message" — error message là instruction to retry, giúp model sửa đúng field.',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'opencode',
    topicLabel: 'Zod validation custom error format',
    tags: ['tool-design', 'zod', 'validation', 'opencode'],
  },
  {
    slug: 'opencode/t17',
    title: 'T17 — Fuzzy edit matching 3-tier (Simple → LineTrimmed → BlockAnchor)',
    description: 'SimpleReplacer → LineTrimmedReplacer → BlockAnchorReplacer (Levenshtein). Threshold 0.0 single candidate / 0.3 multiple. Giảm edit fail khi model nhớ code không chính xác.',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'opencode',
    topicLabel: 'Fuzzy edit matching 3-tier',
    tags: ['tool-design', 'edit', 'fuzzy-matching', 'opencode'],
  },
  {
    slug: 'opencode/t18',
    title: 'T18 — Bash command parsing với tree-sitter WASM',
    description: 'Lazy-load web-tree-sitter + tree-sitter-bash.wasm. Walk AST, detect DESTRUCTIVE_COMMANDS (rm/mv/cp...), extract paths. Portable across Bun/Node/browser.',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'opencode',
    topicLabel: 'Tree-sitter bash parsing',
    tags: ['tool-design', 'tree-sitter', 'bash', 'security', 'opencode'],
  },
  {
    slug: 'opencode/t19',
    title: 'T19 — Sub-agent delegation via Task tool',
    description: 'createChildSession() với deniedTools: ["task","todowrite"]. Recursive ops.prompt(). Parent nhận compact summary — context sạch, không bị ô nhiễm bởi sub-task output.',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'opencode',
    topicLabel: 'Sub-agent Task tool',
    tags: ['tool-design', 'multi-agent', 'sub-agent', 'opencode'],
  },
  {
    slug: 'opencode/t20',
    title: 'T20 — Plugin tool dynamic discovery',
    description: 'glob("{tool,tools}/*.{js,ts,mjs}") + dynamic import. Tool.fromPlugin() wraps với auto-truncate + permission sandboxing. Silent fail per plugin.',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'opencode',
    topicLabel: 'Plugin tool dynamic discovery',
    tags: ['tool-design', 'plugin', 'extensibility', 'opencode'],
  },
  // ── opencode deep-dives: Theme D — Provider Abstraction (t21–t23) ──────────
  {
    slug: 'opencode/t21',
    title: 'T21 — Multi-provider SDK lazy loading',
    description: 'BUNDLED_PROVIDERS: Record<string, () => Promise<Loader>>. Mỗi provider là lazy lambda. Chỉ import SDK khi user thật sự dùng provider đó. 20+ providers, startup fast.',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'opencode',
    topicLabel: 'Multi-provider lazy loading',
    tags: ['provider-abstraction', 'lazy-loading', 'typescript', 'opencode'],
  },
  {
    slug: 'opencode/t22',
    title: 'T22 — Provider-specific message transformation',
    description: 'TRANSFORMS dispatch table per provider: Anthropic tách tool_use, Mistral truncate toolCallId 9 chars, Gemini sanitize tool names. Core logic sạch, quirk ở transform layer.',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'opencode',
    topicLabel: 'Provider-specific message transform',
    tags: ['provider-abstraction', 'anthropic', 'openai', 'gemini', 'opencode'],
  },
  {
    slug: 'opencode/t23',
    title: 'T23 — Overflow pattern detection & retry với server headers',
    description: '25+ regex detect ContextOverflowError qua mọi provider. Skip retry khi overflow → trigger compaction. Exponential backoff tôn trọng retry-after-ms header.',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'opencode',
    topicLabel: 'Overflow detection + retry',
    tags: ['provider-abstraction', 'error-handling', 'retry', 'opencode'],
  },
  // ── opencode deep-dives: Theme E — Permission Model (t24–t26) ─────────────
  {
    slug: 'opencode/t24',
    title: 'T24 — Wildcard last-match-wins permission evaluation',
    description: 'rules.findLast() với shell glob wildcard. Rule sau override rule trước. Default "ask" khi không match. Allow bash:* → deny bash:rm -rf * works naturally.',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'opencode',
    topicLabel: 'Wildcard last-match-wins evaluation',
    tags: ['permission', 'security', 'wildcard', 'opencode'],
  },
  {
    slug: 'opencode/t25',
    title: 'T25 — Session-scoped permission state (once/always/reject)',
    description: 'ask() emits event → Deferred await. reply() với once/always/reject. "always" lưu vào alwaysAllow Set cho cả session. "reject" cancel TẤT CẢ pending requests cùng lúc.',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'opencode',
    topicLabel: 'Session-scoped permission state',
    tags: ['permission', 'security', 'session', 'opencode'],
  },
  {
    slug: 'opencode/t26',
    title: 'T26 — Arity-based command normalization',
    description: 'ARITY map 450+ entries: npm run → 3, git config → 3, touch → 1. Longest-prefix match. "npm run build --watch" → "npm run build". Suggest wildcard pattern cho user.',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'opencode',
    topicLabel: 'Arity-based command normalization',
    tags: ['permission', 'ux', 'bash', 'opencode'],
  },
  // ── opencode deep-dives: Theme F — System Prompt (t27–t28) ───────────────
  {
    slug: 'opencode/t27',
    title: 'T27 — Model-specific system prompt dispatch + dynamic env',
    description: 'pickTemplate() regex dispatch: /claude/i → PROMPT_ANTHROPIC, /gpt|o1/i → PROMPT_BEAST. buildSystem() returns [template, envBlock, skillsBlock, projectBlock] array.',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'opencode',
    topicLabel: 'Model-specific system prompt dispatch',
    tags: ['system-prompt', 'prompt-engineering', 'multi-model', 'opencode'],
  },
  {
    slug: 'opencode/t28',
    title: 'T28 — AGENTS.md / CLAUDE.md cascading (findUp)',
    description: 'Walk từ cwd lên worktree root tìm AGENTS.md → CLAUDE.md → CONTEXT.md. First-match-wins. attachedFiles Set ngăn re-attach cùng file trong session dài.',
    date: '2026-04-20',
    status: 'stable',
    kind: 'deep-dive',
    parentSlug: 'opencode',
    topicLabel: 'AGENTS.md cascading findUp',
    tags: ['system-prompt', 'instruction-files', 'monorepo', 'opencode'],
  },
  {
    slug: 'openharness',
    title: 'HKUDS/OpenHarness — Harness Engineering',
    description:
      'Phân tích 30 kỹ thuật harness của OpenHarness ("Python port of Claude Code") + ohmo multi-agent swarm. Đánh dấu UNIQUE vs opencode (subprocess swarm, mailbox IPC, worktree, Docker sandbox, cron). So sánh 3 chiều với Claude Code.',
    date: '2026-04-20',
    techniqueCount: 30,
    status: 'stable',
    repo: 'HKUDS/OpenHarness',
    tags: ['harness', 'python', 'asyncio', 'multi-agent', 'mcp', 'openharness', 'claude-code'],
    thumbnail: '/thumbnails/openharness.jpg',
  },
];

/** Tập hợp các tag xuất hiện, dùng cho filter */
export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const r of reports) for (const t of r.tags) set.add(t);
  return Array.from(set).sort();
}

/** Lấy tất cả deep-dive reports thuộc về 1 báo cáo cha */
export function getDeepDives(parentSlug: string): Report[] {
  return reports.filter(r => r.kind === 'deep-dive' && r.parentSlug === parentSlug);
}

/** Lấy báo cáo cha của 1 deep-dive */
export function getParentReport(slug: string): Report | undefined {
  const r = reports.find(r => r.slug === slug);
  if (!r?.parentSlug) return undefined;
  return reports.find(p => p.slug === r.parentSlug);
}
