/** Dữ liệu + meta dùng chung cho trang báo cáo OpenHarness (sidebar, SEO). */
export const title = 'HKUDS/OpenHarness — Kỹ thuật Harness · Nghiên cứu sâu';
export const description =
  '30 kỹ thuật harness trong HKUDS/OpenHarness + ohmo, so sánh với opencode và Claude Code.';

export const sidebarGroups = [
  {
    title: 'Mở đầu',
    items: [
      { href: '#intro', label: 'Tổng quan OpenHarness', section: true },
      { href: '#what-is-harness', label: 'Harness là gì?', section: false },
      { href: '#architecture', label: 'Kiến trúc tổng thể', section: false },
      { href: '#tech-stack', label: 'Tech stack', section: false },
      { href: '#summary-table', label: 'Bảng tóm tắt 30 kỹ thuật', section: false },
    ],
  },
  {
    title: 'A. Agent Loop & Streaming',
    items: [
      { href: '#t1', label: '1. Async ReAct + single/parallel branching', section: false },
      { href: '#t2', label: '2. Auto-compact before-turn + reactive on overflow', section: false },
      { href: '#t3', label: '3. Stream events + CompactProgressEvent 9-phase', section: false },
      { href: '#t4', label: '4. Pre/Post tool hook interception', section: false },
      { href: '#t5', label: '5. Tool metadata carryover across turns', section: false },
    ],
  },
  {
    title: 'B. Context & Memory',
    items: [
      { href: '#t6', label: '6. Multi-layer system prompt (9 sections)', section: false },
      { href: '#t7', label: '7. CLAUDE.md cascading discovery upward', section: false },
      { href: '#t8', label: '8. Per-project memory isolation (SHA1)', section: false },
      { href: '#t9', label: '9. Token memory search với CJK', section: false },
    ],
  },
  {
    title: 'C. Tool Design',
    items: [
      { href: '#t10', label: '10. Pydantic tool base + auto JSON schema', section: false },
      { href: '#t11', label: '11. Per-tool output truncation + UTF-8', section: false },
      { href: '#t12', label: '12. Bash preflight + PTY + graceful timeout', section: false },
      { href: '#t13', label: '13. Ripgrep-first Glob/Grep + Python fallback', section: false },
    ],
  },
  {
    title: 'D. Extension Ecosystem',
    items: [
      { href: '#t14', label: '14. Markdown skill + frontmatter', section: false },
      { href: '#t15', label: '15. Hook lifecycle (6 events, 4 types)', section: false },
      { href: '#t16', label: '16. Plugin manifest loading', section: false },
      { href: '#t17', label: '17. MCP stdio + HTTP + dynamic adapter', section: false },
    ],
  },
  {
    title: 'E. Permission & Safety',
    items: [
      { href: '#t18', label: '18. 3-mode permission (DEFAULT/PLAN/FULL_AUTO)', section: false },
      { href: '#t19', label: '19. Built-in sensitive path protection', section: false },
      { href: '#t20', label: '20. 6-layer hierarchical evaluation', section: false },
      { href: '#t21', label: '21. Async interactive approval + UUID', section: false },
    ],
  },
  {
    title: 'F. Multi-Agent Swarm',
    items: [
      { href: '#t22', label: '22. Subprocess-based subagent spawning', section: false },
      { href: '#t23', label: '23. File-based async mailbox', section: false },
      { href: '#t24', label: '24. Dual-channel permission sync', section: false },
      { href: '#t25', label: '25. Git worktree isolation per agent', section: false },
      { href: '#t26', label: '26. YAML agent definitions + coordinator', section: false },
    ],
  },
  {
    title: 'G. External Integrations',
    items: [
      { href: '#t27', label: '27. Multi-channel bus (Slack/Feishu/...)', section: false },
      { href: '#t28', label: '28. LSP-based code intelligence (AST)', section: false },
      { href: '#t29', label: '29. Docker sandbox cho tool execution', section: false },
      { href: '#t30', label: '30. Cron scheduler + background tasks', section: false },
    ],
  },
  {
    title: 'Kết luận',
    items: [
      { href: '#conclusion', label: 'So sánh OpenHarness · opencode · Claude Code', section: false },
      { href: '#sources', label: 'Nguồn tham khảo', section: false },
    ],
  },
];

export const heroMeta = [
  { label: 'Ngày', value: '2026-04-20' },
  { label: 'Tác giả', value: 'Nghĩa & Cowork' },
  { label: 'Repo', value: 'HKUDS/OpenHarness' },
  { label: 'Commit analyzed', value: 'main branch · v0.1.7 · ~30k LOC Python' },
];
