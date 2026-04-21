---
title: HKUDS/OpenHarness — Harness Techniques Research
created: 2026-04-20
updated: 2026-04-20
tags: [openharness, agent-harness, python, coding-agent, mcp, ohmo]
status: stable
---

# HKUDS/OpenHarness — Kỹ thuật harness

## Mục tiêu
Phân tích sâu các kỹ thuật "harness" mà HKUDS/OpenHarness áp dụng. Repo tự mô tả là
"Open-source Python port of Claude Code" + có thêm `ohmo` personal agent (Feishu/Slack/Telegram/Discord integration).
Mục đích: hiểu các lựa chọn thiết kế khi port Claude Code sang Python, so sánh với opencode (TypeScript fork của sst/opencode).

## Câu hỏi nghiên cứu
- OpenHarness port agent loop sang Python như thế nào (async/await, streaming)?
- Quản lý context & auto-compaction ở đâu, khác Claude Code / opencode ra sao?
- 42 tools được tổ chức thế nào? Plugin + skill system?
- Permission model: mode + hooks + checker — khác opencode ra sao?
- Swarm coordination: subprocess-based multi-agent, worktree, mailbox — unique?
- MCP integration (HTTP transport, subprocess, tool discovery)
- Channels (Feishu/Slack/Telegram/Discord) — pattern integrate bên ngoài
- Autopilot dashboard — giám sát / ra lệnh từ xa

## Phạm vi
- Trong phạm vi: `src/openharness/{engine,tools,permissions,hooks,swarm,skills,memory,services,mcp,prompts,channels,autopilot}`
- Ngoài phạm vi: React TUI frontend chi tiết, autopilot dashboard React code, ohmo packaging chi tiết

## Trạng thái
- [x] Clone & reconnaissance
- [x] Tạo topic folder
- [x] Phân tích sâu (30 kỹ thuật, 7 nhóm A–G)
- [x] Tìm bài viết tham khảo (17 nhóm references)
- [x] Viết báo cáo canonical — `src/pages/reports/openharness.astro`
- [x] Verify & cập nhật _index/README.md

## Liên kết
- Báo cáo canonical: [`../../src/pages/reports/openharness.astro`](../../src/pages/reports/openharness.astro)
- Notes chi tiết: [`techniques.md`](./techniques.md)
- References: [`references.md`](./references.md)
- HTML gốc (legacy): [`../../../archive/openharness-harness-report.html`](../../../archive/openharness-harness-report.html)
- Repo: https://github.com/HKUDS/OpenHarness
