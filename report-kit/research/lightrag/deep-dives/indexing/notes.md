---
title: LightRAG Deep Dive — Indexing
created: 2026-04-22
updated: 2026-04-22
tags: [lightrag, indexing, knowledge-graph, entity-extraction]
status: stable
---

# Deep Dive — Indexing

## Luồng chính
1. Document đi vào `insert`/`ainsert`, được enqueue vào `full_docs` + `doc_status`.
2. Pipeline process lấy pending/failed/processing docs, giới hạn bằng `max_parallel_insert`.
3. Document được chunk theo token size/overlap hoặc custom split.
4. Chunks được upsert vào `chunks_vdb` và `text_chunks`.
5. Entity/relation extraction chạy trên từng chunk bằng LLM; output được parse thành `maybe_nodes`, `maybe_edges`.
6. Merge phase cập nhật graph storage, entity/relationship VDB, entity_chunks/relation_chunks và source/file metadata.
7. Incremental update chỉ merge phần mới vào graph hiện tại, không rebuild toàn bộ index.

## Kỹ thuật cần phân tích
- Chunking có guard với `ChunkTokenLimitExceededError` khi split-only vẫn vượt limit.
- Extraction output parser chủ động sửa delimiter corruption, relationship/entity marker lỗi, missing completion delimiter.
- Entity identifier bị truncate theo limit để tránh graph/vdb key quá dài.
- Entity/relation descriptions được summarize theo map-reduce khi description list quá dài.
- Source IDs có limit method `KEEP` hoặc `FIFO`; đây là kỹ thuật kiểm soát graph metadata không phình vô hạn.
- VDB upsert là critical path: wrapper `safe_vdb_operation_with_exception` retry và fail fast nếu vector write lỗi.

## Trade-off
- Ưu: graph là artifact bền vững, hỗ trợ query multi-hop tốt hơn flat chunks.
- Ưu: incremental update nhẹ hơn GraphRAG community report regeneration.
- Nhược: chất lượng graph phụ thuộc LLM extraction; model yếu tạo entity/relation sai hoặc noisy.
- Nhược: indexing đắt hơn NaiveRAG vì phải gọi LLM trên chunks.
- Nhược: schema entity types và delimiter prompt cần kiểm soát nếu dùng model open-source.

