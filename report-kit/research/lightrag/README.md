---
title: LightRAG — nghiên cứu chuyên sâu
created: 2026-04-22
updated: 2026-04-22
tags: [lightrag, rag, graph-rag, knowledge-graph, retrieval]
status: stable
---

# LightRAG — nghiên cứu chuyên sâu

## Mục tiêu
Hiểu LightRAG ở mức có thể ra quyết định dùng/không dùng, triển khai thử, và học lại các kỹ thuật kiến trúc quan trọng: graph-based indexing, dual-level retrieval, storage abstraction, API/WebUI, reranking, document deletion, concurrency và observability.

## Câu hỏi nghiên cứu
- LightRAG khác gì NaiveRAG và GraphRAG ở indexing, retrieval, chi phí và khả năng incremental update?
- Cần cài đặt LightRAG thế nào để chạy server/API/WebUI hoặc embed core vào ứng dụng Python?
- Các query mode `local`, `global`, `hybrid`, `mix`, `naive`, `bypass` thực chất đi qua pipeline nào?
- Storage layer tách KV/vector/graph/doc-status ra sao, và nên chọn backend nào cho dev/production?
- Các điểm vận hành dễ lỗi là gì: embedding dimension, LLM context, rerank, concurrent insert, deletion, cache, observability?

## Phạm vi
- Trong phạm vi: `HKUDS/LightRAG` snapshot `v1.4.15`, paper EMNLP Findings 2025, docs chính thức, API server/WebUI, core Python source.
- Trong phạm vi: so sánh ý tưởng với NaiveRAG/GraphRAG để giải thích trade-off.
- Ngoài phạm vi: benchmark lại bằng dataset riêng, chạy ingestion thực tế với OpenAI/Ollama, hoặc đánh giá chất lượng bằng RAGAS trên corpus nội bộ.

## Snapshot nguồn
- Repo clone tạm thời: `/tmp/lightrag-research-src`
- Tag: `v1.4.15`
- Commit: `64d3326f858db300ec7699b2cb84e4edd5e5869e`
- Package PyPI: `lightrag-hku==1.4.15`, uploaded 2026-04-19.

## Deep Dive Topics
| Topic | Trạng thái | Nội dung |
|---|---|---|
| `indexing` | stable | Chunking, entity/relation extraction, gleaning, dedupe/merge, graph + vector write path, incremental update. |
| `retrieval` | stable | Keyword extraction, local/global/hybrid/mix, vector chunks, token allocation, context build, rerank. |
| `storage-api` | stable | KV/vector/graph/doc-status abstraction, server/API/WebUI, setup wizard, Docker, backend selection. |
| `operations` | stable | Concurrent insert, global priority queue, deletion/regeneration, cache, tracing/evaluation, failure modes. |

## Liên kết
- Báo cáo canonical: `../../src/pages/reports/lightrag/index.astro`
- Deep dives: `../../src/pages/reports/lightrag/indexing.astro`, `../../src/pages/reports/lightrag/retrieval.astro`, `../../src/pages/reports/lightrag/storage-api.astro`, `../../src/pages/reports/lightrag/operations.astro`
- `techniques.md` — notes chi tiết
- `references.md` — nguồn thô

