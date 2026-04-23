/** Dữ liệu + meta dùng chung cho trang báo cáo opencode (sidebar, bảng, SEO). */
export const title = "opencode — Kỹ thuật Harness · Nghiên cứu sâu";
export const description = "28 kỹ thuật harness trong sst/opencode, code thật + pros/cons + references.";

export const sidebarGroups = [
  {
    "title": "Mở đầu",
    "items": [
      {
        "href": "#intro",
        "label": "Tổng quan opencode",
        "section": true
      },
      {
        "href": "#what-is-harness",
        "label": "Harness là gì?",
        "section": false
      },
      {
        "href": "#architecture",
        "label": "Kiến trúc tổng thể",
        "section": false
      },
      {
        "href": "#tech-stack",
        "label": "Tech stack",
        "section": false
      },
      {
        "href": "#summary-table",
        "label": "Bảng tóm tắt 28 kỹ thuật",
        "section": false
      }
    ]
  },
  {
    "title": "A. Agent Loop & Streaming",
    "items": [
      {
        "href": "#t1",
        "label": "1. ReAct loop + finish-reason exit",
        "section": false
      },
      {
        "href": "#t2",
        "label": "2. Streaming event demultiplexer",
        "section": false
      },
      {
        "href": "#t3",
        "label": "3. Deferred tool-call coordination",
        "section": false
      },
      {
        "href": "#t4",
        "label": "4. Interruption-safe scope cleanup",
        "section": false
      },
      {
        "href": "#t5",
        "label": "5. Synthetic system reminder",
        "section": false
      },
      {
        "href": "#t6",
        "label": "6. Doom loop detection",
        "section": false
      }
    ]
  },
  {
    "title": "B. Context Management",
    "items": [
      {
        "href": "#t7",
        "label": "7. Token overflow + reserved buffer",
        "section": false
      },
      {
        "href": "#t8",
        "label": "8. Tail-turn-preserving compaction",
        "section": false
      },
      {
        "href": "#t9",
        "label": "9. Tool output pruning + protected tools",
        "section": false
      },
      {
        "href": "#t10",
        "label": "10. Cache-aware 2-part system prompt",
        "section": false
      },
      {
        "href": "#t11",
        "label": "11. Auto compaction continuation",
        "section": false
      },
      {
        "href": "#t12",
        "label": "12. Structured compaction template",
        "section": false
      }
    ]
  },
  {
    "title": "C. Tool Design",
    "items": [
      {
        "href": "#t13",
        "label": "13. Tool description .txt pattern",
        "section": false
      },
      {
        "href": "#t14",
        "label": "14. Effect-based lazy tool init",
        "section": false
      },
      {
        "href": "#t15",
        "label": "15. Output truncation + file spill",
        "section": false
      },
      {
        "href": "#t16",
        "label": "16. Zod validation + custom errors",
        "section": false
      },
      {
        "href": "#t17",
        "label": "17. Fuzzy edit matching 3-tier",
        "section": false
      },
      {
        "href": "#t18",
        "label": "18. Bash tree-sitter scan",
        "section": false
      },
      {
        "href": "#t19",
        "label": "19. Sub-agent via Task tool",
        "section": false
      },
      {
        "href": "#t20",
        "label": "20. Plugin tool discovery",
        "section": false
      }
    ]
  },
  {
    "title": "D. Provider Abstraction",
    "items": [
      {
        "href": "#t21",
        "label": "21. Multi-provider SDK lazy loading",
        "section": false
      },
      {
        "href": "#t22",
        "label": "22. Provider-specific transformation",
        "section": false
      },
      {
        "href": "#t23",
        "label": "23. Overflow detection + retry",
        "section": false
      }
    ]
  },
  {
    "title": "E. Permission Model",
    "items": [
      {
        "href": "#t24",
        "label": "24. Wildcard last-match-wins",
        "section": false
      },
      {
        "href": "#t25",
        "label": "25. Session-scoped permission state",
        "section": false
      },
      {
        "href": "#t26",
        "label": "26. Arity-based command normalization",
        "section": false
      }
    ]
  },
  {
    "title": "F. System Prompt",
    "items": [
      {
        "href": "#t27",
        "label": "27. Model-specific dispatch + env",
        "section": false
      },
      {
        "href": "#t28",
        "label": "28. AGENTS.md cascading",
        "section": false
      }
    ]
  },
  {
    "title": "Kết luận",
    "items": [
      {
        "href": "#conclusion",
        "label": "So sánh với các agent khác",
        "section": false
      },
      {
        "href": "#sources",
        "label": "Nguồn tham khảo",
        "section": false
      }
    ]
  }
];

export const heroMeta = [
  {
    "label": "Ngày",
    "value": "2026-04-20"
  },
  {
    "label": "Tác giả",
    "value": "Nghĩa &amp; Cowork"
  },
  {
    "label": "Repo",
    "value": "anomalyco/opencode"
  },
  {
    "label": "Commit analyzed",
    "value": "dev branch, ~15k LOC trong core harness"
  }
];

export const techStackHeaders = ["Layer", "Công nghệ", "Ghi chú"];
export const techStackRows = [
  ["Runtime", "Bun + Node", "Bun chính, Node compat"],
  ["Language", "TypeScript", "Monorepo TurboRepo"],
  ["Async/Effect", "Effect v4 (beta)", "Core pattern toàn bộ"],
  [
    "AI SDK",
    "Vercel AI SDK (<code>streamText</code>)",
    "Unified LLM interface",
  ],
  ["Validation", "Zod + Effect Schema", "Tool inputs + config"],
  ["DB", "Drizzle ORM + SQLite", "Session persistence"],
  ["Parsing", "tree-sitter WASM", "Bash + PowerShell for permission scan"],
  ["Observability", "OpenTelemetry", "Native span instrumentation"],
  ["MCP", "Model Context Protocol", "External tool servers"],
];

export const compareHeaders = [
  "Khía cạnh",
  "opencode",
  "Claude Code",
  "Aider",
  "Cursor",
  "Cline",
];
export const compareRows = [
  [
    "Language / Runtime",
    "TypeScript / Bun",
    "TypeScript / Node",
    "Python",
    "TypeScript (VSCode ext)",
    "TypeScript (VSCode ext)",
  ],
  [
    "Multi-provider",
    "20+ built-in, lazy",
    "Anthropic only",
    "Most via LiteLLM",
    "OpenAI + Anthropic",
    "OpenAI + Anthropic + few",
  ],
  [
    "Permission model",
    "Wildcard + arity + state",
    "Wildcard + state",
    "Minimal (yes/no prompt)",
    "IDE-level (user trust)",
    "UI approval prompt",
  ],
  [
    "Compaction",
    "Tail-preserve + template + protected tools",
    "Auto + manual /compact",
    "Sliding window",
    "N/A (short session)",
    "Basic summarization",
  ],
  [
    "Sub-agent",
    "Task tool (restricted perms)",
    "Task tool (very similar)",
    "N/A",
    "N/A",
    "N/A",
  ],
  [
    "Fuzzy edit",
    "3-tier (Simple/Line/Anchor)",
    "2-tier",
    "SEARCH/REPLACE blocks",
    "Model-dependent",
    "2-tier",
  ],
  [
    "Bash safety",
    "tree-sitter WASM parse",
    "Regex-based (has bypass vulns)",
    "User confirm",
    "N/A (no bash)",
    "User approval",
  ],
  [
    "Plugin system",
    "Glob discovery + SDK",
    "MCP + plugins + hooks",
    "N/A",
    "VSCode extensions",
    "MCP",
  ],
  [
    "Instructions file",
    "AGENTS.md / CLAUDE.md (findUp)",
    "CLAUDE.md (global + project)",
    ".aider.conf.yml",
    ".cursorrules",
    ".clinerules",
  ],
];
/** Hàng bảng tóm tắt 28 kỹ thuật (intro) */
export const opencodeSummaryRows = [
  {
    "id": "T1",
    "title": "ReAct loop với finish-reason-aware exit",
    "chipLabel": "Loop",
    "chipVariant": "purple"
  },
  {
    "id": "T2",
    "title": "Streaming event demultiplexer",
    "chipLabel": "Loop",
    "chipVariant": "purple"
  },
  {
    "id": "T3",
    "title": "Deferred tool-call coordination",
    "chipLabel": "Loop",
    "chipVariant": "purple"
  },
  {
    "id": "T4",
    "title": "Interruption-safe scope cleanup",
    "chipLabel": "Loop",
    "chipVariant": "purple"
  },
  {
    "id": "T5",
    "title": "Synthetic system reminder",
    "chipLabel": "Loop",
    "chipVariant": "purple"
  },
  {
    "id": "T6",
    "title": "Doom loop detection",
    "chipLabel": "Loop",
    "chipVariant": "purple"
  },
  {
    "id": "T7",
    "title": "Token overflow với reserved buffer (cache-aware)",
    "chipLabel": "Context",
    "chipVariant": "cyan"
  },
  {
    "id": "T8",
    "title": "Tail-turn-preserving compaction",
    "chipLabel": "Context",
    "chipVariant": "cyan"
  },
  {
    "id": "T9",
    "title": "Tool output pruning với protected tools",
    "chipLabel": "Context",
    "chipVariant": "cyan"
  },
  {
    "id": "T10",
    "title": "Cache-aware 2-part system prompt",
    "chipLabel": "Context",
    "chipVariant": "cyan"
  },
  {
    "id": "T11",
    "title": "Auto compaction continuation (replay/continue)",
    "chipLabel": "Context",
    "chipVariant": "cyan"
  },
  {
    "id": "T12",
    "title": "Structured compaction template",
    "chipLabel": "Context",
    "chipVariant": "cyan"
  },
  {
    "id": "T13",
    "title": ".txt tool description pattern",
    "chipLabel": "Tool",
    "chipVariant": "green"
  },
  {
    "id": "T14",
    "title": "Output truncation + file spill",
    "chipLabel": "Tool",
    "chipVariant": "green"
  },
  {
    "id": "T15",
    "title": "Zod schema validation + custom errors",
    "chipLabel": "Tool",
    "chipVariant": "green"
  },
  {
    "id": "T16",
    "title": "Fuzzy edit matching 3-tier",
    "chipLabel": "Tool",
    "chipVariant": "green"
  },
  {
    "id": "T17",
    "title": "Bash tree-sitter scan for permission",
    "chipLabel": "Tool",
    "chipVariant": "green"
  },
  {
    "id": "T18",
    "title": "Sub-agent via Task tool",
    "chipLabel": "Tool",
    "chipVariant": "green"
  },
  {
    "id": "T19",
    "title": "Plugin tool dynamic discovery",
    "chipLabel": "Tool",
    "chipVariant": "green"
  },
  {
    "id": "T20",
    "title": "OTel tracing + metadata pipeline",
    "chipLabel": "Tool",
    "chipVariant": "green"
  },
  {
    "id": "T21",
    "title": "Multi-provider SDK lazy loading",
    "chipLabel": "Provider",
    "chipVariant": "amber"
  },
  {
    "id": "T22",
    "title": "Provider-specific message transformation",
    "chipLabel": "Provider",
    "chipVariant": "amber"
  },
  {
    "id": "T23",
    "title": "Retry + overflow pattern detection",
    "chipLabel": "Provider",
    "chipVariant": "amber"
  },
  {
    "id": "T24",
    "title": "Wildcard + session permission state",
    "chipLabel": "Permission",
    "chipVariant": "default"
  },
  {
    "id": "T25",
    "title": "Arity-based command normalization",
    "chipLabel": "Permission",
    "chipVariant": "default"
  },
  {
    "id": "T26",
    "title": "Per-tool permission context extraction",
    "chipLabel": "Permission",
    "chipVariant": "default"
  },
  {
    "id": "T27",
    "title": "Dynamic env + skill injection",
    "chipLabel": "Prompt",
    "chipVariant": "purple"
  },
  {
    "id": "T28",
    "title": "AGENTS.md / CLAUDE.md cascading",
    "chipLabel": "Prompt",
    "chipVariant": "purple"
  }
];
