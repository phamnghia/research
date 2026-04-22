---
title: LightRAG — references
created: 2026-04-22
updated: 2026-04-22
topic: lightrag
---

# References

## Repo / nguồn chính
- [HKUDS/LightRAG — GitHub](https://github.com/HKUDS/LightRAG) — repo chính; release mới nhất xác nhận khi nghiên cứu: `v1.4.15`.
- [Release v1.4.15](https://github.com/HKUDS/LightRAG/releases/tag/v1.4.15) — snapshot dùng để đọc source.
- [lightrag-hku — PyPI](https://pypi.org/project/lightrag-hku/) — package distribution; `1.4.15` uploaded 2026-04-19.
- [LightRAG: Simple and Fast Retrieval-Augmented Generation — ACL Anthology](https://aclanthology.org/2025.findings-emnlp.568/) — paper EMNLP Findings 2025.
- [Paper PDF](https://aclanthology.org/2025.findings-emnlp.568.pdf) — chi tiết architecture, evaluation, ablation, cost analysis.

## Docs chính thức
- [README](https://github.com/HKUDS/LightRAG/blob/v1.4.15/README.md) — install, quick start, news, model requirements, related projects.
- [Programming With LightRAG Core](https://github.com/HKUDS/LightRAG/blob/v1.4.15/docs/ProgramingWithCore.md) — core API, init params, query param, storage backends, model injection.
- [LightRAG Server and WebUI](https://github.com/HKUDS/LightRAG/blob/v1.4.15/docs/LightRAG-API-Server.md) — server install, `.env`, WebUI, Docker, reverse proxy.
- [Advanced Features](https://github.com/HKUDS/LightRAG/blob/v1.4.15/docs/AdvancedFeatures.md) — RAG-Anything, token tracking, export, cache, Langfuse, RAGAS.
- [Interactive Setup](https://github.com/HKUDS/LightRAG/blob/v1.4.15/docs/InteractiveSetup.md) — `make env-base`, `make env-storage`, `make env-server`, security check.
- [Concurrent Control Strategy](https://github.com/HKUDS/LightRAG/blob/v1.4.15/docs/LightRAG_concurrent_explain.md) — document/chunk/graph/LLM-level concurrency.
- [Algorithm flowcharts](https://github.com/HKUDS/LightRAG/blob/v1.4.15/docs/Algorithm.md) — indexing and retrieval flowcharts.

## Source files đọc chính
- [`lightrag/lightrag.py`](https://github.com/HKUDS/LightRAG/blob/v1.4.15/lightrag/lightrag.py) — dataclass config, storage initialization, insert/query/delete APIs.
- [`lightrag/operate.py`](https://github.com/HKUDS/LightRAG/blob/v1.4.15/lightrag/operate.py) — extraction, merge, query search, token truncation, context build.
- [`lightrag/base.py`](https://github.com/HKUDS/LightRAG/blob/v1.4.15/lightrag/base.py) — `QueryParam`, base storage interfaces, query result schema.
- [`lightrag/rerank.py`](https://github.com/HKUDS/LightRAG/blob/v1.4.15/lightrag/rerank.py) — generic rerank API, long-document chunking and score aggregation.
- [`lightrag/kg/__init__.py`](https://github.com/HKUDS/LightRAG/blob/v1.4.15/lightrag/kg/__init__.py) — storage registry and compatibility checks.

## Ảnh / diagram
- [LightRAG architecture diagram](https://raw.githubusercontent.com/HKUDS/LightRAG/v1.4.15/README.assets/b2aaf634151b4706892693ffb43d9093.png) — diagram tổng quan từ README.
- [LightRAG server screenshot](https://raw.githubusercontent.com/HKUDS/LightRAG/v1.4.15/README.assets/iShot_2025-03-23_12.40.08.png) — WebUI/API demo screenshot.
- [API server screenshot 1](https://raw.githubusercontent.com/HKUDS/LightRAG/v1.4.15/docs/LightRAG-API-Server.assets/image-20250323122538997.png) — WebUI document/KG view.
- [API server screenshot 2](https://raw.githubusercontent.com/HKUDS/LightRAG/v1.4.15/docs/LightRAG-API-Server.assets/image-20250323122754387.png) — graph/query interaction.
- [API server screenshot 3](https://raw.githubusercontent.com/HKUDS/LightRAG/v1.4.15/docs/LightRAG-API-Server.assets/image-20250323123011220.png) — additional WebUI panel.
- [API server screenshot 4](https://raw.githubusercontent.com/HKUDS/LightRAG/v1.4.15/docs/LightRAG-API-Server.assets/image-20250323194750379.png) — WebUI status/config panel.
- [Indexing flowchart — LearnOpenCV](https://learnopencv.com/wp-content/uploads/2024/11/LightRAG-VectorDB-Json-KV-Store-Indexing-Flowchart-scaled.jpg) — flowchart được docs chính thức trỏ tới.
- [Retrieval flowchart — LearnOpenCV](https://learnopencv.com/wp-content/uploads/2024/11/LightRAG-Querying-Flowchart-Dual-Level-Retrieval-Generation-Knowledge-Graphs-scaled.jpg) — flowchart được docs chính thức trỏ tới.
- [LearnOpenCV article](https://learnopencv.com/lightrag/) — nguồn gốc hai flowchart.

