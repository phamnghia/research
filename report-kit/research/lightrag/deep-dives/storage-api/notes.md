---
title: LightRAG Deep Dive — Storage API
created: 2026-04-22
updated: 2026-04-22
tags: [lightrag, storage, api, webui, deployment]
status: stable
---

# Deep Dive — Storage API

## Luồng chính
LightRAG tách storage thành bốn vai trò độc lập: KV, vector, graph, doc-status. `LightRAG.__post_init__` verify implementation, check env vars, bind storage classes, sau đó tạo namespace instances. `initialize_storages()` mới mở backend thật, từng storage một để tránh deadlock.

## Backend matrix
- Dev/local: JSON KV + NanoVectorDB + NetworkX + JSON doc status.
- Production graph: Neo4j, PostgreSQL AGE, Memgraph, OpenSearch graph.
- Production vector: PGVector, Milvus, Qdrant, MongoVector, OpenSearch vector, Faiss.
- Unified storage: MongoDB một phần; OpenSearch đầy đủ cho KV/vector/graph/doc-status từ news 2026.03.
- Workspace isolation khác nhau theo backend: subdirectory, table field, collection prefix, labels, payload partitioning.

## API/WebUI
- Server cài bằng `lightrag-hku[api]`.
- WebUI hỗ trợ document indexing, knowledge graph exploration và query interface.
- Server có Ollama-compatible interface để Open WebUI hoặc chatbot khác gọi như model chat.
- `.env` dùng binding cho LLM/embedding/reranker/storage/server/auth/SSL.
- Docker Compose là path triển khai nhanh; production có Gunicorn+Uvicorn trên non-Windows.

## Rủi ro triển khai
- Thay embedding model sau khi index sẽ sai vector dimension; phải recreate vector tables/collections.
- `.env` đặt sai directory khiến server đọc config khác dự kiến.
- MongoDB local Community Edition không thay thế MongoVectorDB Atlas Search/Vector Search.
- Reverse proxy cần tăng upload size và tắt gzip cho streaming endpoints.

