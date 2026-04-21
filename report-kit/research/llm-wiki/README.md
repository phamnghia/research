---
title: LLM Wiki — Andrej Karpathy
created: 2026-04-20
updated: 2026-04-20
tags: [llm, transformer, training, inference, finetuning, alignment, karpathy]
status: in-progress
---

# LLM Wiki — Andrej Karpathy

## Mục tiêu
Nghiên cứu toàn diện "LLM Wiki" của Andrej Karpathy — tổng hợp kiến thức về Large Language Models từ góc nhìn kỹ thuật sâu. Mục tiêu: hiểu rõ từng thành phần của LLM (tokenization → architecture → training → finetuning → inference → deployment), xây dựng mental model vững chắc.

## Câu hỏi nghiên cứu
- Tokenization hoạt động như thế nào ở mức byte/BPE?
- Transformer attention mechanism thực sự tính gì và tại sao hiệu quả?
- Scaling laws nói gì về quan hệ giữa compute, data, params?
- SFT → RLHF → DPO: trade-off của từng approach là gì?
- Inference optimization (quantization, speculative decoding) hoạt động ra sao?
- Karpathy dạy gì khác so với paper gốc?

## Phạm vi
- Trong phạm vi: Toàn bộ LLM Wiki + llm.c repo + blog posts + Zero to Hero YouTube series
- Ngoài phạm vi: Implementation chi tiết từng framework (PyTorch, JAX internals)

## Deep Dive Topics (dự kiến)
1. **tokenization** — BPE, vocab, embedding, positional encoding
2. **attention** — self-attention, MHA, GQA, FlashAttention, KV cache
3. **training** — pre-training, scaling laws, optimizers, mixed precision
4. **finetuning** — SFT, RLHF, DPO, GRPO, Constitutional AI
5. **inference** — quantization, speculative decoding, batching, serving

## Trạng thái hiện tại
Phase 1: Đang setup + fetch refs

## Liên kết
- Báo cáo canonical: `../../src/pages/reports/llm-wiki.astro`
- `techniques.md` — notes chi tiết
- `references.md` — nguồn thô
