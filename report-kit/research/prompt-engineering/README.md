---
title: Prompt Engineering
created: 2026-04-22
updated: 2026-04-22
tags: [prompt-engineering, llm, context-engineering, reasoning, evaluation]
status: stable
---

# Prompt Engineering

## Mục tiêu
Xây dựng report canonical cho prompt engineering với taxonomy hiện đại, trong đó các kỹ thuật được phân cụm thành các nhóm lớn và phân tích ngay trên layer 1.

## Câu hỏi nghiên cứu
- Những nhóm kỹ thuật cốt lõi nào còn hữu ích trong prompt engineering hiện đại?
- Những kỹ thuật nào là nền tảng lâu dài, kỹ thuật nào là tooling/optimization mới xuất hiện gần đây?
- Prompt engineering đã dịch chuyển sang context engineering, optimization và safety ở mức nào?
- Cách phân nhóm nào vừa hợp với survey mới, vừa dễ đọc trên report layer 1?

## Phạm vi
- Trong phạm vi: text-first prompting, context engineering, retrieval-augmented prompting, reasoning scaffolds, prompt optimization, structured outputs, safety/guardrails.
- Ngoài phạm vi: fine-tuning, soft prompt tuning, multimodal prompting chuyên sâu, benchmark paper lẻ không giúp taxonomy.

## Trạng thái hiện tại
- Đã tổng hợp nguồn chính thống từ OpenAI, Anthropic, Google, Microsoft và các survey/paper mới.
- Đã chốt khung 4 nhóm lớn: `Profile & instruction`, `Knowledge & context`, `Reasoning & planning`, `Reliability & optimization`.
- Inventory 24 kỹ thuật đã được đưa thẳng lên layer 1 của canonical report.
- Layer 1 hiện có thêm section `Ví dụ thực chiến` với 4 case: support triage, docs Q&A, research synthesis và extraction.
- Layer 2 đã tách riêng toàn bộ nhóm 3 và 4 thành 12 deep dive pages dưới `/reports/prompt-engineering/<topic>/`.

## Deep Dive Topics
- Chain-of-Thought / zero-shot CoT
- Plan-and-Solve / Least-to-Most
- Tree-of-Thought / Graph-of-Thought
- Self-consistency
- ReAct / tool-augmented reasoning
- Prompt chaining
- PAL / Program-of-Thought
- Self-refine + external verification
- Prompt ensembling / bagging / boosting
- Automatic prompt optimization
- Structured outputs / strict mode / allowed tools
- Safety and injection defenses

## Liên kết
- Báo cáo canonical: [`../../src/pages/reports/prompt-engineering/index.astro`](../../src/pages/reports/prompt-engineering/index.astro)
- [`techniques.md`](./techniques.md) — notes chi tiết theo nhóm và technique
- [`references.md`](./references.md) — nguồn thô
