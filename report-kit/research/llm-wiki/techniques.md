---
title: LLM Wiki — techniques notes
created: 2026-04-20
updated: 2026-04-20
topic: llm-wiki
status: in-progress
---

# Techniques Notes — LLM Wiki (Karpathy, April 2026)

## Tổng quan

LLM Wiki là một **pattern** (không phải sản phẩm) do Andrej Karpathy công bố dưới dạng GitHub Gist vào ngày 4 tháng 4 năm 2026. Gist này nhận hơn 16 triệu views, 5,000+ stars, 4,711 forks — trở thành một trong những ý tưởng viral nhất trong cộng đồng developer AI.

**Karpathy là ai:**
- Co-founder của OpenAI
- Cựu Director of AI tại Tesla
- Tác giả của Zero to Hero (neural networks course), nanoGPT, minBPE, micrograd, llm.c

## Ý tưởng cốt lõi: Compilation vs Retrieval

### Vấn đề với RAG
- RAG = re-derive knowledge từ đầu mỗi query
- Không có accumulation
- Câu hỏi cần tổng hợp 5 tài liệu → LLM phải tìm và ghép fragment mỗi lần
- NotebookLM, ChatGPT file uploads, hầu hết RAG systems đều có vấn đề này

### Giải pháp: LLM Wiki
- LLM **incrementally builds và maintains** một persistent wiki
- Wiki là structured, interlinked markdown files nằm giữa user và raw sources
- Khi thêm source mới → LLM đọc, extract key info, integrate vào wiki hiện có
- Update entity pages, revise topic summaries, flag contradictions
- **Wiki là persistent, compounding artifact** — cross-references đã có sẵn, contradictions đã được flag, synthesis đã reflect tất cả những gì đã đọc

### Metaphor: Compilation
- Source code → compiler → optimized binary
- Raw docs → LLM → structured wiki
- Compile một lần, query nhiều lần
- Compilation step tốn kém nhưng bù đắp qua mọi lần query tiếp theo

### Karpathy's workflow
- LLM agent mở bên trái, Obsidian mở bên phải
- LLM edit theo cuộc trò chuyện → browse real-time trong Obsidian (links, graph view)
- "Obsidian là IDE; LLM là programmer; wiki là codebase"

## Architecture: Ba lớp

### Layer 1: Raw Sources (immutable)
- Curated collection of source documents
- Articles, papers, images, data files
- LLM đọc từ đây nhưng **không bao giờ modify**
- Đây là source of truth

### Layer 2: The Wiki (LLM-owned)
- Directory of LLM-generated markdown files
- Summaries, entity pages, concept pages, comparisons, overview, synthesis
- LLM **hoàn toàn owns layer này**: create pages, update, maintain cross-references
- Bạn đọc; LLM viết

### Layer 3: The Schema (CLAUDE.md / AGENTS.md)
- Document cho LLM biết cách wiki được structured
- Conventions, workflows cho ingest/query/lint
- **Key configuration file** — biến LLM từ generic chatbot thành disciplined wiki maintainer
- Bạn và LLM co-evolve document này theo thời gian
- Karpathy: "The schema is the real product"

## Ba Operations

### Operation 1: Ingest
- Drop new source vào raw collection → tell LLM to process
- LLM flow:
  1. Đọc source
  2. Thảo luận key takeaways với bạn
  3. Viết summary page trong wiki
  4. Update index
  5. Update relevant entity + concept pages (1 source có thể touch 10-15 wiki pages)
  6. Append entry vào log
- Có thể ingest 1 lần hoặc batch nhiều sources

### Operation 2: Query
- Hỏi câu hỏi → LLM search relevant pages, đọc, synthesize answer với citations
- Answers có thể là: markdown page, comparison table, slide deck (Marp), chart (matplotlib)
- **Key insight**: Good answers có thể filed back vào wiki như new pages
- Explorations compound trong knowledge base như ingested sources

### Operation 3: Lint
- Health-check wiki định kỳ
- Tìm:
  - Contradictions giữa pages
  - Stale claims bị supersede bởi newer sources
  - Orphan pages (không có inbound links)
  - Concepts được mention nhưng thiếu page riêng
  - Missing cross-references
  - Data gaps có thể fill bằng web search
- LLM suggest new questions và new sources để investigate
- Chạy sau mỗi ~20 pages mới

## Indexing & Logging

### index.md (content-oriented)
- Catalog mọi thứ trong wiki
- Mỗi page: link + one-line summary + metadata (date, source count)
- Organized by category: entities, concepts, sources, etc.
- LLM update sau mỗi ingest
- Khi query → LLM đọc index trước để find relevant pages → drill into them
- Hoạt động tốt đến ~100 sources, ~hundreds of pages
- **Không cần embedding-based RAG infrastructure ở scale này**

### log.md (chronological)
- Append-only record: ingests, queries, lint passes
- Format: `## [2026-04-02] ingest | Article Title`
- Parseable bằng unix tools: `grep "^## \[" log.md | tail -5`
- Timeline của wiki's evolution

## Folder Structure

```
my-wiki/
├── raw/          ← immutable source documents (PDFs, articles, notes)
├── wiki/         ← LLM-generated entity pages (markdown)
│   ├── index.md  ← catalog of all pages
│   └── log.md    ← chronological log
└── CLAUDE.md     ← schema: conventions + workflows
```

## LLM Wiki vs RAG — Comparison

| Aspect | RAG | LLM Wiki |
|--------|-----|----------|
| Knowledge persistence | None — stateless | Full — builds over time |
| Multi-doc synthesis | Per query, from scratch | Pre-compiled into pages |
| Contradiction detection | No | Yes — during compilation |
| Source traceability | High | Moderate (page-level) |
| Setup complexity | Low | Low–Medium |
| Best for | Quick Q&A | Deep, growing research |
| Scale (index.md) | N/A | ~100-200 sources |
| Scale (hybrid search) | N/A | Unlimited |

**Karpathy's own wiki**: ~100 articles, ~400,000 words — LLM vẫn navigate hiệu quả bằng index + summaries.

## Use Cases

1. **Personal research**: papers, articles, reports → comprehensive wiki với evolving thesis
2. **Reading books**: mỗi chapter → character pages, theme pages, plot threads → fan wiki cá nhân
3. **Business/team**: Slack threads, meeting transcripts, customer calls → internal wiki được LLM maintain
4. **Personal growth**: journal entries, articles, podcast notes → structured self-picture
5. **Competitive analysis, due diligence, trip planning, course notes**

## LLM Wiki v2 — Extended Patterns (rohitg00 / agentmemory)

### Memory Lifecycle (What the original missed)

**Confidence Scoring:**
- Mỗi fact trong wiki có confidence score: số sources support, lần xác nhận gần nhất, có contradictions không
- "Project X uses Redis for caching" → came from 2 sources, confirmed 3 weeks ago, confidence 0.85
- Confidence decays với time, strengthens với reinforcement
- Biến wiki từ flat → living model với uncertain vs certain claims

**Supersession:**
- Khi info mới contradicts/updates existing claim → old claim không chỉ có note
- New claim explicitly supersede old → linked, timestamped, old version preserved nhưng marked stale
- "Version control for knowledge"

**Forgetting:**
- Wiki không nên nhớ tất cả mãi mãi
- Retention curve (Ebbinghaus): facts quan trọng nhưng không được access/reinforce nhiều tháng → fade
- Không deleted, nhưng deprioritized
- Architecture decisions decay chậm; transient bugs decay nhanh

**Consolidation Tiers:**
- Working memory: recent observations, chưa processed
- Episodic memory: session summaries, compressed từ raw observations
- Semantic memory: cross-session facts, consolidated từ episodes
- Procedural memory: workflows + patterns, extracted từ repeated semantics

### Knowledge Graph Layer

**Entity Extraction:**
- Khi ingest source → extract structured entities: people, projects, libraries, concepts, files, decisions
- Mỗi entity có type, attributes, relationships

**Typed Relationships:**
- "uses", "depends on", "contradicts", "caused", "fixed", "supersedes"
- "A caused B, confirmed by 3 sources, confidence 0.9" vs "A relates to B"

**Graph Traversal:**
- "Impact of upgrading Redis?" → start at Redis node → walk "depends on" + "uses" edges → find everything downstream
- Catches connections keyword search misses

### Hybrid Search (Scale >200 pages)

**Three-stream approach:**
1. BM25 (keyword matching + stemming + synonym expansion)
2. Vector search (semantic similarity via embeddings)
3. Graph traversal (entity-aware relationship walking)

**Fusion:** Reciprocal Rank Fusion (RRF)
- BM25 catches exact terms
- Vectors catch semantic similarity
- Graph catches structural connections

**agentmemory benchmark**: 95.2% trên LongMemEval-S với hybrid search

### Automation (Event-driven Hooks)

- On new source: auto-ingest, extract entities, update graph, update index
- On session start: load relevant context từ wiki based on recent activity
- On session end: compress session thành observations, file insights
- On query: check if answer worth filing back (quality score > threshold)
- On memory write: check contradictions, trigger supersession
- On schedule: periodic lint, consolidation, retention decay

### Multi-agent Support
- Mesh sync: multiple agents merge observations vào shared wiki
- Shared vs private scoping
- Work coordination: lightweight

### Privacy & Governance
- Filter on ingest: strip API keys, credentials, PII
- Audit trail: mọi operation logged (timestamp, what changed, why)
- Bulk operations phải reversible

### Crystallization
- Completed chain of work → auto-distilled digest
- What was the question? What did we find? Files/entities involved? Lessons?
- Digest thành first-class wiki page
- Explorations ingested như articles/papers

## Implementation Tips

### Note Template (Obsidian)
```markdown
# Note Title
**Summary**: One sentence.
**Tags**: #topic1 #topic2
**Created**: 2026-XX-XX
---
## Content
## Related Notes
- [[Note Title]]
```

### Ingest Prompt (Claude)
Paste vào Claude với tất cả PDFs attached:
- Read all 5 papers
- Create 1 entity page per key concept in wiki/
- Each page: summary, explanation, wiki-links to related concepts, contradictions if any

### Common Mistakes
1. Quá nhiều thứ trong 1 page → split
2. Không chạy lint → errors propagate
3. Thêm nhiều unrelated topics cùng lúc → graph không dense

### Scaling Plan
1. **Minimal viable**: raw/ + wiki/ + index.md + CLAUDE.md (works to ~200 pages)
2. **Add lifecycle**: confidence scoring, supersession, retention decay
3. **Add structure**: entity extraction, typed relationships, knowledge graph
4. **Add automation**: event-driven hooks
5. **Add scale**: hybrid search, consolidation tiers, quality scoring
6. **Add collaboration**: mesh sync, shared/private scoping

## Images Found
- Datasciencedojo.com có diagrams nhưng lazy-loaded (không fetch được URLs)
- Obsidian graph view screenshot: https://datasciencedojo.com/wp-content/uploads/2026/04/Obsidian-Graph-View-for-LLM-Wiki.png
- Folder structure screenshot: https://datasciencedojo.com/wp-content/uploads/2026/04/my-wiki-Folder-structure.png
- Claude Code prompt screenshot: https://datasciencedojo.com/wp-content/uploads/2026/04/Claude-Code-Prompt.png
