---
title: LightRAG — kỹ thuật chính
created: 2026-04-22
updated: 2026-04-22
tags: [lightrag, rag, graph-rag, indexing, retrieval, storage, operations]
status: stable
---

# LightRAG — notes kỹ thuật

## Tóm tắt điều hành
LightRAG là graph-based RAG framework nhẹ hơn GraphRAG ở retrieval/update vì không dựa vào community reports lớn. Nó xây dựng graph entity/relation từ chunks, lưu song song graph storage và vector storage cho entities/relations/chunks, rồi truy vấn bằng dual-level retrieval: low-level keywords cho entity search, high-level keywords cho relationship/theme search, và `mix` thêm vector chunk search.

## 1. Cách tiếp cận
- Vấn đề LightRAG nhắm tới: flat chunk retrieval khó tổng hợp multi-hop relation, còn GraphRAG community traversal/report có chi phí retrieval/update cao.
- Paper mô tả ba mục tiêu: comprehensive retrieval, efficient low-cost retrieval, fast adaptation to data changes.
- Indexing dùng LLM để extract entity/relation từ chunk; profiling biến entity/relation thành key-value text; dedupe/merge giảm graph size.
- Retrieval tách query thành low-level keywords và high-level keywords. Low-level đi vào entity VDB; high-level đi vào relationship VDB.
- `mix` là mode thực dụng nhất trong code mới: graph retrieval cộng thêm vector chunks, sau đó round-robin merge và token budget.

## 2. Cài đặt
- Server/API/WebUI: `uv tool install "lightrag-hku[api]"`, copy/generate `.env`, chạy `lightrag-server`.
- Core embedded: `uv pip install lightrag-hku`, tạo `LightRAG(...)`, gọi `await rag.initialize_storages()`, sau đó `ainsert`/`aquery`.
- Setup wizard: `make env-base`, `make env-storage`, `make env-server`, `make env-security-check`.
- Model requirement đáng chú ý: docs khuyến nghị LLM indexing ít nhất 32B params, context 32KB tối thiểu/64KB khuyến nghị, tránh reasoning models khi indexing.
- Embedding model phải cố định trước indexing vì vector dimension nằm ở schema/collection.
- Reranker nên bật cho `mix` khi có model phù hợp; package đã có `rerank.py` hỗ trợ chunking dài và score aggregation.

## 3. Ứng dụng phù hợp
- Corpus có nhiều entity/relation và câu hỏi cần reasoning qua nhiều tài liệu: pháp lý, kỹ thuật, nghiên cứu, vận hành hạ tầng, tài liệu sản phẩm.
- Knowledge base cần cập nhật tăng dần: tài liệu mới vào không muốn rebuild toàn bộ community reports như GraphRAG.
- App cần WebUI/API nhanh để upload, quan sát graph, query, tích hợp với Open WebUI qua Ollama-compatible endpoints.
- Không phù hợp nếu chỉ cần Q&A ngắn trên corpus nhỏ, cần exact citation chunk-level tuyệt đối, hoặc không có LLM đủ mạnh để extraction ổn định.

## 4. Indexing pipeline
- `chunking_by_token_size` chia document theo token size/overlap hoặc delimiter tùy chọn.
- `insert`/`ainsert` chỉ enqueue và process pipeline; track id giúp monitor status.
- Pipeline có `doc_status` với trạng thái pending/processing/preprocessed/processed/failed.
- Extraction output được parse bằng delimiter riêng; code có nhiều guard để sửa lỗi format LLM.
- Merge entity/relation dùng source_ids, file paths, description summarization và VDB upsert.
- Incremental update theo paper: document mới extract graph riêng rồi union/merge vào graph hiện tại, không rebuild toàn index.

## 5. Retrieval pipeline
- `QueryParam.mode` hiện default là `mix` trong source `base.py`.
- Modes: `local`, `global`, `hybrid`, `naive`, `mix`, `bypass`.
- `_build_query_context` là kiến trúc 4 stage: search, truncate, merge chunks, build LLM context.
- `_perform_kg_search` pre-compute embeddings cho query/low-level/high-level keywords trong một batch để giảm round-trip.
- Local search lấy entities từ `entities_vdb`; global search lấy relationships từ `relationships_vdb`.
- `mix` thêm `chunks_vdb` vector search rồi merge vector/entity/relation chunks theo round-robin dedupe.
- Token budget tách cho entities, relations, chunks và system prompt; references được tạo từ chunks đã truncate.

## 6. Storage / API
- Storage layer tách 4 nhóm: KV, vector, graph, doc-status.
- Default dev stack: `JsonKVStorage`, `NanoVectorDBStorage`, `NetworkXStorage`, `JsonDocStatusStorage`.
- Production backends gồm PostgreSQL/pgvector/AGE, Neo4j, Milvus, Qdrant, MongoDB, Redis, OpenSearch.
- OpenSearch từ 2026.03 có thể làm unified storage cho cả KV, vector, graph, doc-status.
- Server cung cấp WebUI, REST API và Ollama-compatible interface.
- `.env` nằm ở startup directory để chạy nhiều instance khác nhau; env vars hệ thống override `.env`.

## 7. Operations / observability
- Concurrency có 4 tầng: document-level (`max_parallel_insert`), chunk-level (`llm_model_max_async`), graph-level (`llm_model_max_async * 2`), LLM-level global priority queue.
- Global priority queue ưu tiên query của user hơn merge/extraction để giảm latency.
- Delete document không chỉ xóa chunks; hệ thống phải rebuild affected entities/relations để KG không giữ stale source.
- Cache gồm LLM response cache, extraction cache, query cache; có tool riêng để clean query cache theo mode.
- Advanced docs hỗ trợ TokenTracker, export graph CSV/Excel/MD/TXT, Langfuse tracing và RAGAS evaluation.

## 8. Kết quả paper cần nhớ
- Trên UltraDomain: Agriculture, CS, Legal, Mix; token count từ ~619K đến ~5.08M.
- LightRAG thắng NaiveRAG/RQ-RAG/HyDE rõ nhất ở dataset lớn, đặc biệt Legal.
- So với GraphRAG, LightRAG nổi bật ở Diversity và hiệu quả retrieval/update.
- Cost analysis trên Legal: GraphRAG phải tiêu thụ community reports lớn ở retrieval, còn LightRAG chỉ cần keyword generation + vector/graph lookup.
- Time/space appendix: average query time 11.2s vs GraphRAG 23.6s; storage 39.5MB vs 286.7MB trong thí nghiệm paper.

