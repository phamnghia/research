---
title: opencode — Harness Techniques Research
created: 2026-04-20
updated: 2026-04-20
tags: [opencode, agent-harness, llm, coding-agent, tool-use]
status: stable
---

# opencode — Kỹ thuật harness

## Mục tiêu
Phân tích sâu các kỹ thuật "harness" mà opencode (repo: [anomalyco/opencode](https://github.com/anomalyco/opencode), fork của sst/opencode) áp dụng để biến một model thành coding agent hoạt động được trong terminal. Mục đích: hiểu được các decision về context, tool use, orchestration để có thể tái dùng khi build agent riêng.

## Câu hỏi nghiên cứu
- opencode quản lý vòng lặp agent (agent loop) như thế nào?
- Các kỹ thuật gì được dùng để quản lý context window (compaction, overflow, caching)?
- Tool design: loại tool nào, schema ra sao, permission/approval flow thế nào?
- Provider abstraction: làm sao hỗ trợ nhiều model/provider?
- Sub-agent / task delegation được triển khai ra sao?
- System prompt engineering: cấu trúc, dynamic injection, layering?
- Điểm mạnh / điểm yếu của approach này so với các harness khác (Aider, Cursor, Cline, Claude Code)?

## Phạm vi
- Trong phạm vi: `packages/opencode/src/{session,agent,tool,provider,permission,prompt,plugin,mcp}`.
- Ngoài phạm vi: desktop app UI, web console, infrastructure deploy.

## Trạng thái hiện tại
- [x] Clone repo & reconnaissance
- [x] Tạo topic folder
- [x] Phân tích sâu các kỹ thuật (28 techniques, 6 themes)
- [x] Tìm bài viết tham khảo (70+ links trong `references.md`)
- [x] Viết báo cáo canonical — `src/pages/reports/opencode.astro`
- [x] Verify & update index

## Kết quả chính
- 28 kỹ thuật harness được phân tích sâu, nhóm thành 6 theme: Agent Loop (6), Context (6), Tool (8), Provider (3), Permission (3), System Prompt (2).
- Mỗi kỹ thuật có: code thực từ opencode, code example generic, bảng pros/cons, 2-3 bài tham khảo.
- So sánh với Claude Code / Aider / Cursor / Cline.
- Recommendation: 5 kỹ thuật nên copy đầu tiên (T15, T10, T7+T8, T16, T25).

## Liên kết
- Báo cáo canonical: [`../../src/pages/reports/opencode.astro`](../../src/pages/reports/opencode.astro)
- Notes chi tiết: [`techniques.md`](./techniques.md)
- References: [`references.md`](./references.md)
- HTML gốc (legacy): [`../../../archive/opencode-harness-report.html`](../../../archive/opencode-harness-report.html)
