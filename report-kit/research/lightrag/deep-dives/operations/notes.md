---
title: LightRAG Deep Dive — Operations
created: 2026-04-22
updated: 2026-04-22
tags: [lightrag, operations, concurrency, deletion, observability]
status: stable
---

# Deep Dive — Operations

## Concurrency
- `max_parallel_insert` kiểm soát số document xử lý đồng thời; docs khuyến nghị 2-10, thường khoảng `llm_model_max_async / 3`.
- Mỗi document có chunk semaphore riêng, nên theoretical chunk concurrency = `max_parallel_insert * llm_model_max_async`.
- Graph merge/rebuild dùng concurrency khoảng `llm_model_max_async * 2` vì không phải operation nào cũng gọi LLM.
- LLM calls đi qua global priority queue; query user được ưu tiên hơn merge/extraction.

## Delete / rebuild
- Deleting document phải queue và acquire pipeline, không được chạy song song tùy tiện.
- Sau khi xóa chunks, related entities/relations phải rebuild từ cache/chunks còn lại.
- Source IDs và file paths được giới hạn để tránh metadata phình.
- Vector records cũ của relationships có thể bị xóa cả hai chiều rồi upsert lại canonical ID.

## Cache / evaluation / tracing
- `TokenTracker` hỗ trợ đo token usage.
- `export_data` xuất graph ra CSV/Excel/MD/TXT.
- `aclear_cache` xóa llm_response_cache; query cache selective dùng tool riêng.
- Langfuse tracing hiện tập trung vào OpenAI-compatible calls.
- RAGAS evaluation có script riêng cho context precision/quality metrics.

## Failure modes
- LLM extraction format lỗi: parser sửa được nhiều case nhưng không thay thế được model/prompt kém.
- High concurrency quá mức làm tăng conflict entity naming và kéo dài individual file processing.
- API provider rate limit sẽ khiến retry; cần quan sát backend logs.
- Embedding dimension mismatch là lỗi phá schema phổ biến khi đổi model sau indexing.

