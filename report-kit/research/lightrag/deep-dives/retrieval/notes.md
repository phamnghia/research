---
title: LightRAG Deep Dive — Retrieval
created: 2026-04-22
updated: 2026-04-22
tags: [lightrag, retrieval, query-mode, rerank]
status: stable
---

# Deep Dive — Retrieval

## Luồng chính
1. Query đi vào `query`/`aquery`/`aquery_llm` hoặc `query_data`/`aquery_data`.
2. Query mode quyết định branch: KG modes (`local`, `global`, `hybrid`, `mix`) dùng `kg_query`; `naive` dùng vector chunks; `bypass` bỏ retrieval.
3. Keyword extraction tạo low-level/high-level keywords nếu user chưa truyền sẵn.
4. `_perform_kg_search` batch embeddings cho query, ll_keywords, hl_keywords.
5. Local branch lấy entities và related relations/chunks; global branch lấy relationships và related entities/chunks.
6. `mix` thêm direct chunk vector search, rồi round-robin merge chunks từ vector/entity/relation.
7. Token truncation và context builder tạo prompt cuối cùng, kèm reference list nếu cần.

## Kỹ thuật cần phân tích
- `QueryParam.mode` default source là `mix`, không phải `global` như một số docs cũ.
- `ll_keywords` và `hl_keywords` là cách LightRAG map natural query sang hai tầng retrieval.
- Round-robin merge chống việc một source chiếm hết context.
- Dynamic token allocation tính system prompt, KG context, query, buffer rồi mới cấp token cho chunks.
- Rerank hỗ trợ chunk documents quá dài, aggregate score về original document.
- `only_need_context` và `only_need_prompt` hữu ích cho debug/evaluation.

## Trade-off
- Ưu: vừa dùng graph structure vừa giữ vector chunk fallback.
- Ưu: `mix` là default tốt khi corpus có cả relation-rich và fact-heavy documents.
- Nhược: keyword extraction thêm một LLM call trước retrieval.
- Nhược: local/global keywords sai sẽ kéo sai entities/relations.
- Nhược: reranker cải thiện precision nhưng thêm latency và dependency.

