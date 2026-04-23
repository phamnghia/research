import type { PromptDeepDiveTopic } from '../../../components/PromptDeepDivePage.astro';

const parentHref = '/reports/prompt-engineering/';
const parentLabel = 'Prompt Engineering';

const sharedSidebarGroups: PromptDeepDiveTopic['sidebarGroups'] = [
  {
    title: 'Mở đầu',
    items: [
      { href: '#intro', label: 'Tổng quan', section: true },
    ],
  },
  {
    title: 'Phân tích',
    items: [
      { href: '#mechanics', label: 'Cơ chế' },
      { href: '#usage', label: 'Khi dùng' },
      { href: '#failure', label: 'Failure modes' },
      { href: '#compare', label: 'So sánh' },
    ],
  },
  {
    title: 'Kết luận',
    items: [
      { href: '#refs', label: 'Tham khảo', section: true },
    ],
  },
];

const makeMeta = (topicLabel: string): PromptDeepDiveTopic['meta'] => [
  { label: 'Báo cáo cha', value: `<a href="${parentHref}">← ${parentLabel}</a>` },
  { label: 'Topic', value: topicLabel },
  { label: 'Ngày', value: '2026-04-22' },
  { label: 'Cấp độ', value: 'Layer 2 / deep dive' },
];

function makeTopic(topic: Omit<PromptDeepDiveTopic, 'parentHref' | 'parentLabel' | 'meta' | 'sidebarGroups'>): PromptDeepDiveTopic {
  return {
    ...topic,
    parentHref,
    parentLabel,
    meta: makeMeta(topic.topicLabel),
    sidebarGroups: sharedSidebarGroups,
  };
}

const cot = makeTopic({
  slug: 'cot',
  title: 'Deep Dive: Chain-of-Thought / zero-shot CoT',
  subtitle:
    'Phân tích sâu từ báo cáo <a href="/reports/prompt-engineering/">Prompt Engineering</a> — CoT là lớp reasoning nền, nhưng trong 2026 nó phải được đọc cùng monitorability, controllability và safety, không còn chỉ là mẹo “think step by step”.',
  description:
    'Phân tích sâu chain-of-thought / zero-shot CoT: vai trò của reasoning scaffold, chi phí token, monitorability và cách dùng đúng trong 2026.',
  topicLabel: 'Chain-of-Thought / zero-shot CoT',
  sections: [
    {
      id: 'intro',
      title: 'Tổng quan',
      themeTag: 'Reasoning',
      whyImportant:
        '<strong>CoT quan trọng vì nó tạo ra không gian trung gian để model đi qua các bước suy luận.</strong> Khi task cần toán, logic, multi-hop synthesis hay kiểm tra giả định, việc buộc model “chỉ trả lời ngay” thường làm mất cấu trúc của lời giải.',
      paragraphs: [
        'Bản gốc của CoT là một kết luận rất đơn giản: nếu model được phép sinh các bước trung gian, nó thường giải tốt hơn bài toán nhiều bước. Điều này vẫn đúng, nhưng cách ta đọc CoT đã thay đổi: hiện tại CoT là một <em>reasoning scaffold</em>, không phải một câu thần chú.',
        'Điểm mới của giai đoạn 2024-2026 là CoT không chỉ được dùng để tăng accuracy mà còn để monitor behavior. OpenAI công khai nhiều nghiên cứu về monitorability và controllability, tức là ta bắt đầu xem CoT như một bề mặt để kiểm tra, không chỉ là một kênh để “nghĩ nhiều hơn”.',
      ],
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Angle', 'Tác dụng', 'Đổi lại'],
        rows: [
          ['Reasoning depth', 'Cho model đi qua các bước trung gian', 'Tăng token và latency'],
          ['Debuggability', 'Dễ nhìn chỗ sai trong lập luận', 'Không đảm bảo lập luận đúng'],
          ['Safety/monitoring', 'Tạo bề mặt theo dõi hành vi', 'Có thể trở thành tín hiệu nhiễu nếu prompt kém'],
        ],
      },
      callout: {
        type: 'info',
        html:
          '<strong>Lưu ý thực dụng:</strong> nếu task là extraction đơn giản hoặc classification rõ label, CoT thường không phải tối ưu đầu tiên. Dùng nó khi bài toán thực sự cần nhiều bước suy luận.',
      },
      keyTakeaway: [
        'CoT là lớp reasoning nền, không phải giải pháp mặc định cho mọi prompt.',
        'Trong model mới, CoT vừa là công cụ tăng chất lượng vừa là bề mặt giám sát.',
      ],
    },
    {
      id: 'mechanics',
      title: 'Cơ chế',
      themeTag: 'Mechanics',
      paragraphs: [
        'Zero-shot CoT thường là một chỉ dẫn ngắn như “solve step by step” hoặc “think through the problem carefully”. Với few-shot CoT, ta cung cấp thêm demonstration có bước trung gian rõ ràng để model học cách trình bày reasoning.',
        'Cái được không chỉ là số bước. CoT buộc model làm chậm lại, giữ trạng thái trung gian lâu hơn và giảm xác suất nhảy thẳng đến đáp án đầu tiên nghe có vẻ hợp lý.',
      ],
      codeBlocks: [
        {
          caption: 'Zero-shot CoT skeleton',
          lang: 'text',
          code: `Solve the problem step by step.
State the intermediate reasoning only if it helps the final answer.
Then give the final answer in one short paragraph.`,
        },
      ],
      mermaid:
        'flowchart LR\n  Q[Question] --> S[Reasoning scaffold]\n  S --> I[Intermediate steps]\n  I --> A[Final answer]',
      mermaidCaption: 'CoT biến một bước trả lời tuyến tính thành chuỗi suy luận có cấu trúc hơn.',
      refs: [
        '<a href="https://arxiv.org/abs/2201.11903">Chain-of-Thought Prompting Elicits Reasoning in Large Language Models</a>',
        '<a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/chain-of-thought">Claude: Let Claude think (chain of thought prompting)</a>',
        '<a href="https://openai.com/index/learning-to-reason-with-llms/">OpenAI: Learning to reason with LLMs</a>',
      ],
    },
    {
      id: 'usage',
      title: 'Khi dùng',
      themeTag: 'Fit',
      paragraphs: [
        'CoT hữu ích khi task có một đáp án cuối nhưng đường đi đến đáp án gồm nhiều ràng buộc: math word problems, planning, multi-document synthesis, code reasoning, logic checks và policy reasoning.',
        'Trong agentic systems, CoT cũng có thể làm “pre-action thinking”. Tuy nhiên, một khi tool use đã tham gia, CoT không còn đủ: bạn cần protocol rõ giữa nghĩ, hành động và quan sát.',
      ],
      prosCons: {
        pros: [
          'Tăng độ đúng trên task nhiều bước',
          'Dễ ghép với few-shot và self-consistency',
          'Giúp debug reasoning prompt',
        ],
        cons: [
          'Token overhead tăng nhanh',
          'Không bảo đảm output legible hay kiểm soát được',
          'Không giải quyết được bài toán thiếu dữ kiện',
        ],
      },
      accordion: {
        title: 'Khi CoT không nên là lựa chọn đầu tiên',
        items: [
          'Label space nhỏ, output gần như deterministic.',
          'Cần strict JSON / schema ngay từ đầu.',
          'Bài toán chỉ cần lookup hoặc routing đơn giản.',
        ],
      },
    },
    {
      id: 'failure',
      title: 'Failure modes',
      themeTag: 'Risk',
      paragraphs: [
        'CoT có thể tạo ra cảm giác “đúng vì dài”, nhưng độ dài không đồng nghĩa với correctness. Một chain dài vẫn có thể đi sai từ bước đầu tiên và kéo cả câu trả lời đi lệch.',
        'Với các model reasoning mới, một vấn đề khác xuất hiện: controllability của CoT không cao như người ta kỳ vọng. Nếu prompt cố bắt model viết CoT theo hình thức quá cụ thể, model vẫn có thể trượt khỏi yêu cầu đó.',
      ],
      accordion: {
        title: 'Các lỗi phổ biến',
        items: [
          'Rationale hợp lý nhưng answer sai.',
          'Bước trung gian lặp lại dữ kiện mà không thực sự suy luận.',
          'Prompt ép model “nghĩ nhiều” làm tăng verbosity nhưng không tăng correctness.',
          'CoT bị dùng như một pseudo-safety layer dù không có monitor phía sau.',
        ],
      },
      callout: {
        type: 'warn',
        html:
          'OpenAI gần đây nhấn mạnh rằng monitorability của CoT có thể hỗ trợ safety, nhưng điều đó chỉ có ý nghĩa khi ta thiết kế prompt và evaluator một cách kỷ luật. CoT tự nó không phải bảo đảm an toàn.',
      },
    },
    {
      id: 'compare',
      title: 'So sánh',
      themeTag: 'Compare',
      paragraphs: [
        'CoT nên được xem là baseline reasoning scaffold. So với prompt chaining, nó giữ mọi thứ trong một lần gọi; so với self-consistency, nó chỉ dùng một path; so với plan-first methods, nó đỡ cấu trúc hơn nhưng rẻ hơn.',
      ],
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Technique', 'Điểm mạnh', 'Khi nào thắng CoT'],
        rows: [
          ['Self-consistency', 'Sample nhiều path rồi vote', 'Khi answer ổn định hơn reasoning'],
          ['Plan-and-Solve', 'Lập kế hoạch trước rồi giải', 'Khi task có dependency rõ'],
          ['Prompt chaining', 'Mỗi bước là một call riêng', 'Khi cần quan sát intermediate output'],
        ],
      },
      refs: [
        '<a href="https://openai.com/index/evaluating-chain-of-thought-monitorability/">OpenAI: Evaluating chain-of-thought monitorability</a>',
        '<a href="https://openai.com/index/reasoning-models-chain-of-thought-controllability/">OpenAI: Reasoning models struggle to control their chains of thought</a>',
        '<a href="https://arxiv.org/abs/2406.06608">The Prompt Report</a>',
      ],
    },
    {
      id: 'refs',
      title: 'Tham khảo chính',
      themeTag: 'Sources',
      refs: [
        '<a href="https://arxiv.org/abs/2201.11903">Chain-of-Thought Prompting Elicits Reasoning in Large Language Models</a>',
        '<a href="https://arxiv.org/abs/2203.11171">Self-Consistency Improves Chain of Thought Reasoning in Language Models</a>',
        '<a href="https://openai.com/index/learning-to-reason-with-llms/">Learning to reason with LLMs | OpenAI</a>',
        '<a href="https://openai.com/index/evaluating-chain-of-thought-monitorability/">Evaluating chain-of-thought monitorability | OpenAI</a>',
        '<a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/chain-of-thought">Claude chain-of-thought prompting</a>',
      ],
    },
  ],
});

const planSolve = makeTopic({
  slug: 'plan-solve',
  title: 'Deep Dive: Plan-and-Solve / Least-to-Most',
  subtitle:
    'Phân tích sâu từ báo cáo <a href="/reports/prompt-engineering/">Prompt Engineering</a> — decomposition-first prompting giải quyết missing-step errors bằng cách chia bài toán thành plan + subtasks, thay vì buộc model nhảy thẳng vào đáp án.',
  description:
    'Phân tích sâu Plan-and-Solve và Least-to-Most: decomposition, easy-to-hard generalization, và khi nào lập kế hoạch trước đáng giá hơn CoT tự do.',
  topicLabel: 'Plan-and-Solve / Least-to-Most',
  sections: [
    {
      id: 'intro',
      title: 'Tổng quan',
      themeTag: 'Planning',
      whyImportant:
        '<strong>Đây là kỹ thuật chuyển trọng tâm từ “nghĩ ra đáp án” sang “thiết kế một chuỗi subproblem có thể giải được”.</strong> Với bài khó, việc chia nhỏ thường quan trọng hơn việc làm cho câu trả lời nghe giống suy luận.',
      paragraphs: [
        'Least-to-Most Prompting giải bài toán bằng cách chia thành những câu hỏi dễ hơn theo thứ tự tăng dần độ khó. Plan-and-Solve thêm một bước lập kế hoạch rõ ràng trước khi giải từng subproblem.',
        'Điểm mạnh của nhóm này là nó giảm missing-step errors. Thay vì kỳ vọng model tự giữ toàn bộ dependency trong một chuỗi CoT, ta bắt nó tạo một kế hoạch sơ bộ rồi thực thi kế hoạch đó.',
      ],
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Signal', 'Ý nghĩa', 'Giá trị'],
        rows: [
          ['Plan first', 'Tách bài toán thành các bước nhỏ', 'Giảm rơi rụng bước quan trọng'],
          ['Subproblem sequence', 'Giải từ dễ đến khó', 'Tăng khả năng generalize sang bài khó hơn exemplar'],
          ['Explicit merge', 'Ghép kết quả trung gian ở cuối', 'Dễ debug pipeline'],
        ],
      },
    },
    {
      id: 'mechanics',
      title: 'Cơ chế',
      themeTag: 'Mechanics',
      paragraphs: [
        'Mẫu cơ bản là: 1) viết plan, 2) giải từng subtask, 3) ghép lại. Với Least-to-Most, subtask của bước sau được hỗ trợ bởi output của bước trước. Với Plan-and-Solve, phần “plan” có thể tồn tại như một artifact riêng.',
        'Vì phần planning được tách ra, model ít có xu hướng “điền vào chỗ trống” bằng suy đoán ở giữa chừng. Đây là khác biệt đáng kể so với CoT tự do.',
      ],
      codeBlocks: [
        {
          caption: 'Plan-and-Solve prompt skeleton',
          code: `Task: solve the problem.
Step 1: write a short plan with 3-5 substeps.
Step 2: solve each substep in order.
Step 3: merge the subanswers into the final answer.`,
          lang: 'text',
        },
      ],
      mermaid:
        'flowchart LR\n  Q[Question] --> P[Plan]\n  P --> S1[Subproblem 1]\n  S1 --> S2[Subproblem 2]\n  S2 --> M[Merge]\n  M --> A[Final answer]',
      mermaidCaption: 'Plan-and-Solve đặt kế hoạch ra trước để giảm missing-step errors.',
      refs: [
        '<a href="https://arxiv.org/abs/2205.10625">Least-to-Most Prompting Enables Complex Reasoning in Large Language Models</a>',
        '<a href="https://arxiv.org/abs/2305.04091">Plan-and-Solve Prompting</a>',
        '<a href="https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/break-down-prompts">Google: Break down complex tasks into simpler prompts</a>',
      ],
    },
    {
      id: 'usage',
      title: 'Khi dùng',
      themeTag: 'Fit',
      paragraphs: [
        'Kỹ thuật này hữu ích khi task có dependency rõ: chuyển đổi format nhiều bước, reasoning có thứ tự, synthesis từ nhiều nguồn, hay các bài toán có easy-to-hard progression tự nhiên.',
        'Nếu chỉ là Q&A ngắn hoặc classification đơn giản, plan-first thường thêm overhead mà không thêm giá trị.',
      ],
      prosCons: {
        pros: [
          'Giảm missing-step errors',
          'Dễ chia trách nhiệm giữa planner và solver',
          'Hợp với task có dependency rõ ràng',
        ],
        cons: [
          'Cần plan tốt, nếu không sai từ đầu',
          'Tăng số bước và token',
          'Có thể over-decompose những task vốn đơn giản',
        ],
      },
    },
    {
      id: 'failure',
      title: 'Failure modes',
      themeTag: 'Risk',
      accordion: {
        title: 'Rủi ro cần để ý',
        items: [
          'Plan nhìn có vẻ hợp lý nhưng bỏ sót constraint ngầm.',
          'Subproblem đầu ra phụ thuộc nhau quá chặt nhưng prompt không nói rõ.',
          'Task bị chia quá nhỏ làm mất global objective.',
          'Kế hoạch tốt nhưng solver tệ, hoặc ngược lại.',
        ],
      },
      callout: {
        type: 'warn',
        html:
          'Đừng nhầm Plan-and-Solve với “thêm một prompt nữa cho dài hơn”. Giá trị của nó nằm ở việc làm explicit dependency graph, không phải làm prompt nặng lên.',
      },
    },
    {
      id: 'compare',
      title: 'So sánh',
      themeTag: 'Compare',
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Technique', 'So với plan-first', 'Khi nào nên chọn'],
        rows: [
          ['CoT', 'Tự do hơn, ít cấu trúc hơn', 'Khi task nhỏ và ổn định'],
          ['Prompt chaining', 'Mỗi bước là call riêng', 'Khi muốn inspect intermediate outputs'],
          ['ReAct', 'Có action/observation', 'Khi cần tool use thực sự'],
        ],
      },
      refs: [
        '<a href="https://arxiv.org/abs/2205.10625">Least-to-Most Prompting Enables Complex Reasoning in Large Language Models</a>',
        '<a href="https://arxiv.org/abs/2305.04091">Plan-and-Solve Prompting</a>',
        '<a href="https://arxiv.org/abs/2406.06608">The Prompt Report</a>',
      ],
    },
    {
      id: 'refs',
      title: 'Tham khảo chính',
      themeTag: 'Sources',
      refs: [
        '<a href="https://arxiv.org/abs/2205.10625">Least-to-Most Prompting Enables Complex Reasoning in Large Language Models</a>',
        '<a href="https://arxiv.org/abs/2305.04091">Plan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning by Large Language Models</a>',
        '<a href="https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/break-down-prompts">Google Cloud: Break down complex tasks into simpler prompts</a>',
      ],
    },
  ],
});

const totGot = makeTopic({
  slug: 'tot-got',
  title: 'Deep Dive: Tree-of-Thought / Graph-of-Thought',
  subtitle:
    'Phân tích sâu từ báo cáo <a href="/reports/prompt-engineering/">Prompt Engineering</a> — ToT và GoT biến reasoning thành search problem, nơi branching, scoring và backtracking quan trọng không kém lời nhắc ban đầu.',
  description:
    'Phân tích sâu Tree-of-Thought và Graph-of-Thought: search over thoughts, scoring, backtracking và trade-off giữa chất lượng với chi phí.',
  topicLabel: 'Tree-of-Thought / Graph-of-Thought',
  sections: [
    {
      id: 'intro',
      title: 'Tổng quan',
      themeTag: 'Search',
      whyImportant:
        '<strong>ToT/GoT là bước chuyển từ linear reasoning sang search-based reasoning.</strong> Khi không có một đường suy luận duy nhất đủ tốt, việc thử nhiều nhánh rồi prune/backtrack thường mạnh hơn CoT thuần.',
      paragraphs: [
        'Tree-of-Thought cho model đề xuất nhiều thought branches, đánh giá chúng, rồi mở rộng nhánh tiềm năng. Graph-of-Thought đi xa hơn: các thoughts trở thành vertex trong một graph, cho phép hợp nhất, chia tách và feedback loop phức tạp hơn.',
        'Điểm cốt lõi của cả hai là ta không còn coi reasoning là một dòng text đơn tuyến. Ta bắt đầu coi nó như một không gian tìm kiếm có scoring function.',
      ],
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Aspect', 'Ý nghĩa', 'Trade-off'],
        rows: [
          ['Branching', 'Sinh nhiều đường suy luận', 'Tốn token hơn'],
          ['Evaluation', 'Chấm thought trước khi đi tiếp', 'Cần scorer tốt'],
          ['Backtracking', 'Quay lại khi nhánh xấu', 'Controller phức tạp hơn'],
        ],
      },
    },
    {
      id: 'mechanics',
      title: 'Cơ chế',
      themeTag: 'Mechanics',
      paragraphs: [
        'Controller thường làm 3 việc: generate thoughts, evaluate thoughts, expand/prune thoughts. Với GoT, controller còn phải xử lý merge và cross-edge dependencies.',
        'Nếu scorer yếu, ToT biến thành random branching. Nếu scorer tốt, nó có thể tìm được phương án toàn cục mà CoT tuyến tính bỏ sót.',
      ],
      diagram: `Root
├─ Thought A
│  ├─ Evaluate
│  └─ Expand
└─ Thought B
   ├─ Evaluate
   └─ Prune / merge`,
      codeBlocks: [
        {
          caption: 'Search loop sketch',
          code: `generate_k_thoughts()
score_each_thought()
prune_low_scores()
expand_high_scores()
repeat_until_goal()`,
          lang: 'text',
        },
      ],
      refs: [
        '<a href="https://arxiv.org/abs/2305.10601">Tree of Thoughts: Deliberate Problem Solving with Large Language Models</a>',
        '<a href="https://arxiv.org/abs/2308.09687">Graph of Thoughts: Solving Elaborate Problems with Large Language Models</a>',
        '<a href="https://arxiv.org/abs/2406.06608">The Prompt Report</a>',
      ],
    },
    {
      id: 'usage',
      title: 'Khi dùng',
      themeTag: 'Fit',
      paragraphs: [
        'ToT/GoT hợp với planning, puzzle solving, creative search, combinatorial tasks và bất kỳ bài toán nào mà “đi theo câu đầu tiên” dễ bị kẹt.',
        'Nếu bạn đã có một evaluator mạnh, branching search có thể đáng giá rất nhanh. Nếu không, các nhánh chỉ làm tăng chi phí mà không tạo signal chất lượng.',
      ],
      prosCons: {
        pros: [
          'Tăng xác suất tìm được đường tốt hơn',
          'Hợp với search/planning khó',
          'Cho phép pruning và backtracking rõ ràng',
        ],
        cons: [
          'Controller và scorer phức tạp',
          'Token cost cao',
          'Overkill với task chỉ cần một câu trả lời ngắn',
        ],
      },
    },
    {
      id: 'failure',
      title: 'Failure modes',
      themeTag: 'Risk',
      accordion: {
        title: 'Rủi ro thực tế',
        items: [
          'Scoring function phản ánh sai objective thật.',
          'Branch explosion làm chi phí tăng phi lý.',
          'Graph merge logic làm mất tín hiệu quan trọng.',
          'Controller overfit vào benchmark cụ thể.',
        ],
      },
      callout: {
        type: 'warn',
        html:
          'ToT/GoT chỉ xứng đáng khi search space thực sự lớn và có evaluator đủ tốt. Nếu không, CoT + self-consistency thường rẻ hơn và dễ vận hành hơn.',
      },
    },
    {
      id: 'compare',
      title: 'So sánh',
      themeTag: 'Compare',
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Technique', 'Khác biệt chính', 'Chọn khi'],
        rows: [
          ['CoT', 'Một đường reasoning', 'Task nhỏ, cần rẻ và nhanh'],
          ['Self-consistency', 'Nhiều đường nhưng vote cuối', 'Answer ổn định hơn path'],
          ['Prompt chaining', 'Nhiều call tuần tự, ít search', 'Muốn inspect từng bước rõ'],
        ],
      },
      refs: [
        '<a href="https://arxiv.org/abs/2305.10601">Tree of Thoughts</a>',
        '<a href="https://arxiv.org/abs/2308.09687">Graph of Thoughts</a>',
        '<a href="https://arxiv.org/abs/2406.06608">The Prompt Report</a>',
      ],
    },
    {
      id: 'refs',
      title: 'Tham khảo chính',
      themeTag: 'Sources',
      refs: [
        '<a href="https://arxiv.org/abs/2305.10601">Tree of Thoughts: Deliberate Problem Solving with Large Language Models</a>',
        '<a href="https://arxiv.org/abs/2308.09687">Graph of Thoughts: Solving Elaborate Problems with Large Language Models</a>',
        '<a href="https://arxiv.org/abs/2406.06608">The Prompt Report</a>',
      ],
    },
  ],
});

const selfConsistency = makeTopic({
  slug: 'self-consistency',
  title: 'Deep Dive: Self-consistency',
  subtitle:
    'Phân tích sâu từ báo cáo <a href="/reports/prompt-engineering/">Prompt Engineering</a> — self-consistency biến một reasoning path đơn lẻ thành một ensemble ở inference-time, tức là tăng robustness bằng sampling và voting.',
  description:
    'Phân tích sâu self-consistency: sampling nhiều reasoning paths, voting trên final answer, và khi nào ensemble reasoning thắng một chain duy nhất.',
  topicLabel: 'Self-consistency',
  sections: [
    {
      id: 'intro',
      title: 'Tổng quan',
      themeTag: 'Reliability',
      whyImportant:
        '<strong>Self-consistency giải quyết một vấn đề rất thực: cùng một câu hỏi, model có thể đi qua nhiều reasoning path khác nhau nhưng chỉ một path là path tốt nhất.</strong> Thay vì tin vào path greedy đầu tiên, ta sample nhiều path rồi lấy đáp án đồng thuận cao nhất.',
      paragraphs: [
        'Đây là một dạng bagging inference-time cho reasoning. Nó không đổi model, không đổi dataset, không cần fine-tuning. Thứ thay đổi chỉ là chiến lược giải mã và cách tổng hợp answer.',
        'Điểm khiến self-consistency bền theo thời gian là nó tương thích với hầu hết chain-of-thought style prompts. Nếu bạn đã có một reasoning scaffold tốt, voting thường cho một cú đẩy chất lượng đáng kể.',
      ],
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Thành phần', 'Vai trò', 'Tại sao cần'],
        rows: [
          ['Sampling', 'Tạo nhiều reasoning paths', 'Tránh phụ thuộc vào một đường greedy'],
          ['Extraction', 'Lấy final answer từ mỗi path', 'Loại bỏ rationale noise'],
          ['Voting', 'Chọn answer đồng thuận', 'Tăng robustness'],
        ],
      },
    },
    {
      id: 'mechanics',
      title: 'Cơ chế',
      themeTag: 'Mechanics',
      paragraphs: [
        'Cách đơn giản nhất là: sample N chain-of-thought completions, trích final answer của mỗi completion, rồi majority vote. Với bài toán mở hơn, có thể dùng LLM hoặc verifier để quyết định đáp án hợp nhất.',
        'Khi các path đều share một lỗi hệ thống, voting không cứu được. Nhưng khi noise đến từ sampling, self-consistency làm rất tốt nhiệm vụ giảm variance.',
      ],
      codeBlocks: [
        {
          caption: 'Self-consistency sketch',
          code: `for each question:
  sample N reasoning paths
  extract final answers
  vote over normalized answers
  return the consensus answer`,
          lang: 'text',
        },
      ],
      mermaid:
        'flowchart LR\n  Q[Question] --> S1[Sample path 1]\n  Q --> S2[Sample path 2]\n  Q --> S3[Sample path 3]\n  S1 --> V[Vote]\n  S2 --> V\n  S3 --> V\n  V --> A[Answer]',
      mermaidCaption: 'Self-consistency lấy nhiều reasoning paths rồi hợp nhất kết quả cuối.',
      refs: [
        '<a href="https://arxiv.org/abs/2203.11171">Self-Consistency Improves Chain of Thought Reasoning in Language Models</a>',
        '<a href="https://arxiv.org/abs/2311.17311">Universal Self-Consistency for Large Language Model Generation</a>',
        '<a href="https://arxiv.org/abs/2406.06608">The Prompt Report</a>',
      ],
    },
    {
      id: 'usage',
      title: 'Khi dùng',
      themeTag: 'Fit',
      paragraphs: [
        'Self-consistency hợp với reasoning task có answer ngắn, rõ và có thể vote được: math, commonsense QA, label selection, structured reasoning.',
        'Nếu answer là free-form essay, voting trên exact string không còn đủ tốt. Khi đó cần verifier, reranker hoặc một lớp aggregation thông minh hơn.',
      ],
      prosCons: {
        pros: [
          'Tăng robustness mà không đổi model',
          'Rất tự nhiên để ghép với CoT',
          'Dễ hiểu, dễ giải thích',
        ],
        cons: [
          'Đắt hơn một sample đơn lẻ',
          'Cần trích answer cuối ổn định',
          'Không sửa được lỗi hệ thống của model',
        ],
      },
    },
    {
      id: 'failure',
      title: 'Failure modes',
      themeTag: 'Risk',
      accordion: {
        title: 'Khi self-consistency không đủ',
        items: [
          'Các sample đều bị cùng một bias.',
          'Answer extraction không chuẩn hóa tốt.',
          'Task có nhiều đáp án hợp lệ nhưng vote ép về một dạng.',
          'Cost tăng mà gain thực tế không đáng kể.',
        ],
      },
      callout: {
        type: 'warn',
        html:
          'Self-consistency là cách rẻ nhất để ensemble reasoning, nhưng nó vẫn là ensemble. Nếu objective thật của bạn là độ đúng tuyệt đối ở tác vụ rủi ro cao, hãy kết hợp thêm verifier hoặc external tools.',
      },
    },
    {
      id: 'compare',
      title: 'So sánh',
      themeTag: 'Compare',
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Technique', 'Cốt lõi', 'Điểm khác biệt'],
        rows: [
          ['Prompt ensembling', 'Nhiều prompt khác nhau', 'Không nhất thiết cùng một prompt path'],
          ['Universal self-consistency', 'LLM chọn answer nhất quán', 'Mở rộng self-consistency cho answer free-form'],
          ['CoT greedy', 'Một path duy nhất', 'Rẻ nhất nhưng variance cao'],
        ],
      },
      refs: [
        '<a href="https://arxiv.org/abs/2203.11171">Self-Consistency Improves Chain of Thought Reasoning in Language Models</a>',
        '<a href="https://arxiv.org/abs/2311.17311">Universal Self-Consistency for Large Language Model Generation</a>',
        '<a href="https://arxiv.org/abs/2406.06608">The Prompt Report</a>',
      ],
    },
    {
      id: 'refs',
      title: 'Tham khảo chính',
      themeTag: 'Sources',
      refs: [
        '<a href="https://arxiv.org/abs/2203.11171">Self-Consistency Improves Chain of Thought Reasoning in Language Models</a>',
        '<a href="https://arxiv.org/abs/2311.17311">Universal Self-Consistency for Large Language Model Generation</a>',
        '<a href="https://arxiv.org/abs/2406.06608">The Prompt Report</a>',
      ],
    },
  ],
});

const react = makeTopic({
  slug: 'react',
  title: 'Deep Dive: ReAct / tool-augmented reasoning',
  subtitle:
    'Phân tích sâu từ báo cáo <a href="/reports/prompt-engineering/">Prompt Engineering</a> — ReAct ghép reasoning với hành động, tạo proto-pattern cho agent loops hiện đại: think, act, observe, update.',
  description:
    'Phân tích sâu ReAct: thought/action/observation loop, tool use protocol, và cách ghép reasoning với external systems an toàn hơn.',
  topicLabel: 'ReAct / tool-augmented reasoning',
  sections: [
    {
      id: 'intro',
      title: 'Tổng quan',
      themeTag: 'Agents',
      whyImportant:
        '<strong>ReAct là một trong những mẫu nền quan trọng nhất của agentic prompting.</strong> Nó cho model vừa reasoning vừa hành động, thay vì nhốt mọi thứ trong một đoạn CoT chỉ có text.',
      paragraphs: [
        'Ý tưởng cốt lõi rất thực dụng: nếu câu hỏi cần dữ kiện ngoài model, đừng bắt model tự đoán. Hãy cho nó hành động, quan sát kết quả, rồi cập nhật suy luận.',
        'ReAct mở ra một protocol rõ ràng giữa model và môi trường. Nhờ đó, tool use trở thành một phần của reasoning chứ không phải một add-on sau khi model đã nghĩ xong.',
      ],
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Tín hiệu', 'Giải thích', 'Ý nghĩa'],
        rows: [
          ['Thought', 'Model tóm tắt ý định', 'Tăng transparency'],
          ['Action', 'Model đề xuất tool call', 'Biến suy luận thành hành động'],
          ['Observation', 'Kết quả tool trả về', 'Cập nhật state'],
        ],
      },
    },
    {
      id: 'mechanics',
      title: 'Cơ chế',
      themeTag: 'Mechanics',
      paragraphs: [
        'Một ReAct loop chuẩn thường có ba block: Thought → Action → Observation. Điều quan trọng không phải là format đẹp, mà là format ổn định để controller của bạn parse được.',
        'Khi action trả về, model phải xử lý nó như untrusted input. Đây là điểm mà nhiều agent prototype thất bại: họ nghĩ tool output là “sự thật”, trong khi nó chỉ là một nguồn dữ liệu khác cần kiểm soát.',
      ],
      codeBlocks: [
        {
          caption: 'ReAct protocol',
          code: `Thought: I should verify the latest source.
Action: search_docs["prompt engineering taxonomy"]
Observation: retrieved the 2026 taxonomy paper
Thought: Now I can synthesize the result.`,
          lang: 'text',
        },
      ],
      mermaid:
        'flowchart TD\n  A[Thought] --> B[Action / tool call]\n  B --> C[Observation]\n  C --> D[Update state]\n  D --> A\n  D --> E[Final answer]\n  A -.->|if tool not needed| E',
      mermaidCaption: 'ReAct là reasoning loop có tool use và observation update.',
      refs: [
        '<a href="https://arxiv.org/abs/2210.03629">ReAct: Synergizing Reasoning and Acting in Language Models</a>',
        '<a href="https://platform.openai.com/docs/guides/function-calling/parallel-function-calling-and-structured-outputs">OpenAI function calling</a>',
        '<a href="https://platform.claude.com/docs/en/docs/build-with-claude/tool-use">Claude tool use</a>',
      ],
    },
    {
      id: 'usage',
      title: 'Khi dùng',
      themeTag: 'Fit',
      paragraphs: [
        'ReAct phù hợp khi câu trả lời phụ thuộc vào tài nguyên ngoài model: search, database lookup, code execution, browser, MCP tool hay internal API.',
        'Nó cũng phù hợp khi bạn muốn model tự quyết định lúc nào nên act và lúc nào nên suy luận tiếp, thay vì hard-code toàn bộ orchestration.',
      ],
      prosCons: {
        pros: [
          'Ghép reasoning với môi trường thật',
          'Hợp với agentic workflows',
          'Cho phép human/validator can thiệp giữa các bước',
        ],
        cons: [
          'Tool output là untrusted input',
          'Dễ sinh loop hoặc call tool thừa',
          'Cần protocol và guardrails chặt',
        ],
      },
    },
    {
      id: 'failure',
      title: 'Failure modes',
      themeTag: 'Risk',
      accordion: {
        title: 'Lỗi thường gặp trong ReAct',
        items: [
          'Model bịa action name hoặc action args.',
          'Observation bị trộn với instruction.',
          'Loop không có stop condition rõ.',
          'Tool call được phép nhưng output downstream không có schema.',
        ],
      },
      callout: {
        type: 'warn',
        html:
          'ReAct không tự động an toàn. Nếu không có structured outputs, approvals và input separation, bạn chỉ chuyển rủi ro từ “reasoning sai” sang “tool misuse”.',
      },
    },
    {
      id: 'compare',
      title: 'So sánh',
      themeTag: 'Compare',
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Technique', 'Khác biệt', 'Khi nào dùng hơn ReAct'],
        rows: [
          ['Prompt chaining', 'Mỗi bước là một call riêng', 'Khi muốn kiểm soát pipeline chặt'],
          ['Structured outputs', 'Schema hóa output', 'Khi action phải parse được ngay'],
          ['CoT', 'Chỉ reasoning, không hành động', 'Khi không cần tool use'],
        ],
      },
      refs: [
        '<a href="https://arxiv.org/abs/2210.03629">ReAct</a>',
        '<a href="https://platform.openai.com/docs/guides/function-calling/parallel-function-calling-and-structured-outputs">Function calling & structured outputs</a>',
        '<a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#chain-complex-prompts">Claude: chain complex prompts</a>',
      ],
    },
    {
      id: 'refs',
      title: 'Tham khảo chính',
      themeTag: 'Sources',
      refs: [
        '<a href="https://arxiv.org/abs/2210.03629">ReAct: Synergizing Reasoning and Acting in Language Models</a>',
        '<a href="https://platform.openai.com/docs/guides/function-calling/parallel-function-calling-and-structured-outputs">OpenAI function calling</a>',
        '<a href="https://platform.claude.com/docs/en/docs/build-with-claude/tool-use">Claude tool use</a>',
      ],
    },
  ],
});

const promptChaining = makeTopic({
  slug: 'prompt-chaining',
  title: 'Deep Dive: Prompt chaining',
  subtitle:
    'Phân tích sâu từ báo cáo <a href="/reports/prompt-engineering/">Prompt Engineering</a> — chaining biến một task lớn thành nhiều call nhỏ, có thể log, evaluate và branch tại từng ranh giới.',
  description:
    'Phân tích sâu prompt chaining: sequential calls, intermediate artifacts, branch points và trade-off giữa quan sát được với latency.',
  topicLabel: 'Prompt chaining',
  sections: [
    {
      id: 'intro',
      title: 'Tổng quan',
      themeTag: 'Orchestration',
      whyImportant:
        '<strong>Prompt chaining là cách đưa prompt engineering vào vùng workflow engineering.</strong> Thay vì tối ưu một prompt monolithic, ta chia bài toán thành nhiều call liên tiếp, mỗi call có mục tiêu và đầu ra riêng.',
      paragraphs: [
        'Điểm khác biệt lớn nhất so với CoT là ở chỗ intermediate outputs không nằm “trong đầu model” mà thành artifact thật. Nhờ vậy, con người và hệ thống downstream đều có thể inspect, log, test và branch.',
        'Anthropic gần đây nhấn mạnh rằng explicit prompt chaining vẫn hữu ích khi bạn muốn enforce pipeline structure hoặc quan sát intermediate outputs, dù nhiều model mới có thể tự làm nhiều bước bên trong một call.',
      ],
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Pipeline property', 'Ý nghĩa', 'Tác dụng'],
        rows: [
          ['Sequential call', 'Output bước trước là input bước sau', 'Kiểm soát tốt hơn'],
          ['Inspectability', 'Xem được từng artifact trung gian', 'Debug dễ'],
          ['Branch points', 'Rẽ nhánh theo output từng bước', 'Linh hoạt hơn prompt đơn'],
        ],
      },
    },
    {
      id: 'mechanics',
      title: 'Cơ chế',
      themeTag: 'Mechanics',
      paragraphs: [
        'Một chain tốt thường có format rõ: extract → normalize → judge → format. Càng nhiều bước có schema khác nhau thì chaining càng có lợi so với một prompt dài.',
        'Điểm cần lưu ý là chain không thay thế cho reasoning nội bộ của model; nó chỉ làm reasoning trở thành một chuỗi service call có thể quản lý.',
      ],
      codeBlocks: [
        {
          caption: 'Three-step prompt chain',
          code: `Step 1: extract facts from the document
Step 2: normalize and compare extracted facts
Step 3: synthesize a short memo with caveats`,
          lang: 'text',
        },
      ],
      diagram: `Prompt 1 → Prompt 2 → Prompt 3
   │         │         │
   └─ inspect └─ branch └─ final output`,
      refs: [
        '<a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#chain-complex-prompts">Claude: chain complex prompts</a>',
        '<a href="https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/break-down-prompts">Google: Break down complex tasks into simpler prompts</a>',
        '<a href="https://openai.com/index/learning-to-reason-with-llms/">OpenAI: Learning to reason with LLMs</a>',
      ],
    },
    {
      id: 'usage',
      title: 'Khi dùng',
      themeTag: 'Fit',
      paragraphs: [
        'Prompt chaining hợp cho research synthesis, document workflows, classification pipelines, format conversion và các tác vụ có rõ stage boundary.',
        'Nếu task cần user approval hoặc trace audit giữa các bước, chaining thường thắng một prompt monolithic vì artifact trung gian trở thành điểm kiểm tra tự nhiên.',
      ],
      prosCons: {
        pros: [
          'Debug từng bước được',
          'Có thể branch theo output thực tế',
          'Dễ đưa vào production pipeline',
        ],
        cons: [
          'Latency tăng theo số bước',
          'Một bước sai có thể lan sang bước sau',
          'Thiết kế pipeline mất công hơn prompt đơn',
        ],
      },
    },
    {
      id: 'failure',
      title: 'Failure modes',
      themeTag: 'Risk',
      accordion: {
        title: 'Lỗi pipeline thường gặp',
        items: [
          'Bước đầu extract sai nhưng downstream không phát hiện.',
          'Mỗi bước tối ưu local objective nhưng global objective tệ đi.',
          'Artifact trung gian không có schema nên khó validate.',
          'Pipeline quá dài mà không có checkpoint hay rollback.',
        ],
      },
      callout: {
        type: 'warn',
        html:
          'Prompt chaining chỉ tốt nếu bạn có kỷ luật về ranh giới giữa các bước. Không có checkpoint hoặc validator thì chain chỉ là một chuỗi lỗi được trang trí đẹp hơn.',
      },
    },
    {
      id: 'compare',
      title: 'So sánh',
      themeTag: 'Compare',
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Technique', 'Khác biệt', 'Khi nào thắng chaining'],
        rows: [
          ['ReAct', 'Model tự xen action/observation', 'Khi môi trường cần hành động online'],
          ['Self-refine', 'Lặp draft → critique → revise', 'Khi output chủ yếu là văn bản'],
          ['CoT', 'Một call duy nhất', 'Khi task nhỏ và latency quan trọng'],
        ],
      },
      refs: [
        '<a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#chain-complex-prompts">Claude chain complex prompts</a>',
        '<a href="https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/break-down-prompts">Google break down prompts</a>',
        '<a href="https://arxiv.org/abs/2406.06608">The Prompt Report</a>',
      ],
    },
    {
      id: 'refs',
      title: 'Tham khảo chính',
      themeTag: 'Sources',
      refs: [
        '<a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#chain-complex-prompts">Claude: chain complex prompts</a>',
        '<a href="https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/break-down-prompts">Google: Break down complex tasks into simpler prompts</a>',
        '<a href="https://arxiv.org/abs/2406.06608">The Prompt Report</a>',
      ],
    },
  ],
});

const palPot = makeTopic({
  slug: 'pal-pot',
  title: 'Deep Dive: PAL / Program-of-Thought',
  subtitle:
    'Phân tích sâu từ báo cáo <a href="/reports/prompt-engineering/">Prompt Engineering</a> — PAL và Program-of-Thought dùng code như intermediate representation, chuyển computation ra runtime để giảm sai số logic/arithmetic.',
  description:
    'Phân tích sâu PAL / Program-of-Thought: code as reasoning substrate, runtime execution và trade-off giữa chính xác tính toán với an toàn sandbox.',
  topicLabel: 'PAL / Program-of-Thought',
  sections: [
    {
      id: 'intro',
      title: 'Tổng quan',
      themeTag: 'Code reasoning',
      whyImportant:
        '<strong>PAL đổi câu hỏi từ “model có tự tính đúng không?” sang “model có thể viết chương trình đúng không?”.</strong> Với arithmetic, symbolic reasoning và table manipulation, đây thường là bước nhảy chất lượng đáng kể.',
      paragraphs: [
        'Program-aided / Program-of-Thought prompting tách việc hiểu bài toán khỏi việc tính toán. Model lo phần diễn giải và viết program; interpreter lo phần thực thi. Cách này đặc biệt mạnh khi computation chứ không phải language generation là bottleneck.',
        'Điểm quan trọng là PAL không chỉ là “bảo model viết code”. Nó là một giao kèo rõ giữa LLM và runtime: LLM sinh ra chương trình, runtime xác minh kết quả.',
      ],
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Thành phần', 'Vai trò', 'Lý do tồn tại'],
        rows: [
          ['LLM', 'Viết program / pseudo-code', 'Dùng language understanding'],
          ['Interpreter', 'Thực thi computation', 'Loại bỏ arithmetic noise'],
          ['Executor guardrails', 'Kiểm soát sandbox', 'Tránh chạy code nguy hiểm'],
        ],
      },
    },
    {
      id: 'mechanics',
      title: 'Cơ chế',
      themeTag: 'Mechanics',
      paragraphs: [
        'Cụm từ khóa ở đây là intermediate representation. Thay vì để model cố “tính trong đầu”, ta để nó build một artifact có thể chạy được. Điều này giúp output cuối dựa vào thực thi thật thay vì chỉ dựa vào một chain of words.',
        'Trong nhiều trường hợp, việc code hóa bài toán cũng làm ý định của model rõ hơn: biến nào là input, biến nào là state, và bước nào là compute step.',
      ],
      codeBlocks: [
        {
          caption: 'PAL-style prompt',
          code: `Write Python to solve the problem.
Use comments only for brief reasoning.
Execute the program and return the final numeric answer.`,
          lang: 'text',
        },
      ],
      mermaid:
        'flowchart LR\n  Q[Problem] --> C[Generate program]\n  C --> R[Runtime / interpreter]\n  R --> A[Final answer]',
      mermaidCaption: 'PAL chuyển reasoning thành code, rồi để runtime xử lý computation.',
      refs: [
        '<a href="https://arxiv.org/abs/2211.10435">PAL: Program-aided Language Models</a>',
        '<a href="https://arxiv.org/abs/2406.06608">The Prompt Report</a>',
        '<a href="https://arxiv.org/abs/2305.10601">Tree of Thoughts (as a comparison point)</a>',
      ],
    },
    {
      id: 'usage',
      title: 'Khi dùng',
      themeTag: 'Fit',
      paragraphs: [
        'PAL hợp với arithmetic, symbolic manipulation, data transformation, tabular reasoning và những bài mà code có thể đại diện cho lời giải một cách tự nhiên.',
        'Nếu bài toán là open-ended writing hoặc policy reasoning, code execution ít hữu ích hơn. Khi đó PAL thường chỉ làm prompt phức tạp thêm.',
      ],
      prosCons: {
        pros: [
          'Giảm arithmetic mistakes',
          'Tách reasoning khỏi computation',
          'Dễ kiểm tra và trace',
        ],
        cons: [
          'Phụ thuộc sandbox/runtime',
          'Có rủi ro an toàn nếu execute code bừa bãi',
          'Không hợp với mọi domain',
        ],
      },
    },
    {
      id: 'failure',
      title: 'Failure modes',
      themeTag: 'Risk',
      accordion: {
        title: 'Rủi ro khi dùng code làm reasoning',
        items: [
          'Code syntactically đúng nhưng semantic sai.',
          'Runtime không được sandbox chặt.',
          'LLM hallucinates API/library không tồn tại.',
          'Interpreter output bị hiểu nhầm như ground truth tuyệt đối.',
        ],
      },
      callout: {
        type: 'warn',
        html:
          'PAL mạnh ở tính toán, nhưng mạnh không đồng nghĩa an toàn. Nếu runtime có quyền hệ thống, bạn phải coi code generation như một mặt tấn công.',
      },
    },
    {
      id: 'compare',
      title: 'So sánh',
      themeTag: 'Compare',
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Technique', 'Khác biệt', 'Khi nào ưu tiên PAL'],
        rows: [
          ['CoT', 'Reasoning bằng text', 'Khi computation không phải bottleneck'],
          ['ReAct', 'Reasoning + action + observation', 'Khi cần tool use online'],
          ['Self-consistency', 'Vote nhiều reasoning paths', 'Khi answer final ổn định hơn path'],
        ],
      },
      refs: [
        '<a href="https://arxiv.org/abs/2211.10435">PAL</a>',
        '<a href="https://arxiv.org/abs/2406.06608">The Prompt Report</a>',
        '<a href="https://platform.openai.com/docs/guides/function-calling/parallel-function-calling-and-structured-outputs">OpenAI structured function calls</a>',
      ],
    },
    {
      id: 'refs',
      title: 'Tham khảo chính',
      themeTag: 'Sources',
      refs: [
        '<a href="https://arxiv.org/abs/2211.10435">PAL: Program-aided Language Models</a>',
        '<a href="https://arxiv.org/abs/2406.06608">The Prompt Report</a>',
        '<a href="https://platform.openai.com/docs/guides/function-calling/parallel-function-calling-and-structured-outputs">OpenAI function calling</a>',
      ],
    },
  ],
});

const selfRefine = makeTopic({
  slug: 'self-refine',
  title: 'Deep Dive: Self-refine',
  subtitle:
    'Phân tích sâu từ báo cáo <a href="/reports/prompt-engineering/">Prompt Engineering</a> — self-refine dùng chính model để draft, critique và revise; hiệu quả khi lỗi chủ yếu nằm ở polishing, không phải ở thiếu dữ kiện.',
  description:
    'Phân tích sâu self-refine và external verification: iterative feedback loop, draft/critique/revise và khi nào refinement thật sự cải thiện output.',
  topicLabel: 'Self-refine + external verification',
  sections: [
    {
      id: 'intro',
      title: 'Tổng quan',
      themeTag: 'Reliability',
      whyImportant:
        '<strong>Self-refine cho model một cơ chế tự kiểm tra bản nháp của chính nó.</strong> Với draft chất lượng trung bình nhưng có thể sửa, vòng critique/revise thường tạo ra output tốt hơn so với chỉ lấy lần sinh đầu tiên.',
      paragraphs: [
        'Đây là pattern rất gần với cách con người viết: viết nháp, đọc lại, chê chính mình, rồi sửa. Điểm khác là vòng lặp này được định nghĩa rõ trong prompt hoặc orchestration layer.',
        'Nếu muốn tăng độ đúng, self-refine thường đi cùng external verification: search, code execution, rule check, schema validation hoặc một model/critic khác.',
      ],
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Vòng lặp', 'Vai trò', 'Giá trị'],
        rows: [
          ['Draft', 'Sinh bản nháp đầu', 'Có điểm xuất phát'],
          ['Critique', 'Chỉ ra lỗi', 'Tạo feedback cụ thể'],
          ['Revise', 'Sửa bản nháp', 'Cải thiện output'],
        ],
      },
    },
    {
      id: 'mechanics',
      title: 'Cơ chế',
      themeTag: 'Mechanics',
      paragraphs: [
        'Self-refine thường không cần nhiều prompt phức tạp. Vòng cơ bản là: draft → critique → revise → verify. Điều quan trọng là critique phải cụ thể; critique chung chung thường chỉ làm câu trả lời dài hơn.',
        'Khi verify không xác nhận được rằng bản sửa tốt hơn, vòng lặp nên dừng. Nếu không, self-refine có thể trượt vào loop vô hạn hoặc over-refinement.',
      ],
      codeBlocks: [
        {
          caption: 'Self-refine loop',
          code: `Draft -> Critique -> Revise -> Verify -> Finalize`,
          lang: 'text',
        },
      ],
      mermaid:
        'flowchart LR\n  D[Draft] --> C[Critique]\n  C --> R[Revise]\n  R --> V[Verify]\n  V --> F[Finalize]',
      mermaidCaption: 'Self-refine là một vòng feedback nội bộ, thường kết hợp với external verification.',
      refs: [
        '<a href="https://arxiv.org/abs/2303.17651">Self-Refine: Iterative Refinement with Self-Feedback</a>',
        '<a href="https://arxiv.org/abs/2305.11738">CRITIC: Large Language Models Can Self-Correct with Tool-Interactive Critiquing</a>',
        '<a href="https://arxiv.org/abs/2305.14497">Self-Polish: Enhance Reasoning in Large Language Models via Problem Refinement</a>',
      ],
    },
    {
      id: 'usage',
      title: 'Khi dùng',
      themeTag: 'Fit',
      paragraphs: [
        'Self-refine hữu ích cho drafting, summarization, translation, code review, style polishing và những tác vụ mà bản nháp đầu tiên gần đúng nhưng chưa sắc.',
        'Trong production, nó đặc biệt hợp với workflow có approval step, vì critique và verify tự nhiên tạo chỗ cho người hoặc tool can thiệp.',
      ],
      prosCons: {
        pros: [
          'Cải thiện polish và clarity',
          'Có thể nhúng vào pipeline',
          'Giúp model tự chỉ ra lỗi của chính nó',
        ],
        cons: [
          'Có thể làm output dài hơn mà không đúng hơn',
          'Critique kém thì revise kém',
          'Tốn thêm latency',
        ],
      },
    },
    {
      id: 'failure',
      title: 'Failure modes',
      themeTag: 'Risk',
      accordion: {
        title: 'Các lỗi thường gặp',
        items: [
          'Model polish một lời giải sai thành một lời giải rất tự tin.',
          'Feedback quá chung chung nên revision không thay đổi gì.',
          'Verification không đủ mạnh để chặn regression.',
          'Prompt thiết kế vòng lặp nhưng không có stop condition rõ.',
        ],
      },
      callout: {
        type: 'warn',
        html:
          'Self-refine không phải thuốc chữa cho reasoning sai. Nếu lỗi gốc là thiếu dữ kiện hoặc hiểu sai bài toán, loop critique/revise có thể chỉ làm câu trả lời “đẹp hơn trong lúc vẫn sai”.',
      },
    },
    {
      id: 'compare',
      title: 'So sánh',
      themeTag: 'Compare',
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Technique', 'Khác biệt', 'Khi nào chọn'],
        rows: [
          ['CRITIC', 'Dùng tool để critique', 'Khi fact check hoặc code check cần external source'],
          ['Self-Polish', 'Refine từ phía problem statement', 'Khi vấn đề nằm ở cách mô tả bài toán'],
          ['Prompt chaining', 'Nhiều step riêng biệt', 'Khi muốn inspect từng artifact'],
        ],
      },
      refs: [
        '<a href="https://arxiv.org/abs/2303.17651">Self-Refine</a>',
        '<a href="https://arxiv.org/abs/2305.11738">CRITIC</a>',
        '<a href="https://arxiv.org/abs/2305.14497">Self-Polish</a>',
      ],
    },
    {
      id: 'refs',
      title: 'Tham khảo chính',
      themeTag: 'Sources',
      refs: [
        '<a href="https://arxiv.org/abs/2303.17651">Self-Refine: Iterative Refinement with Self-Feedback</a>',
        '<a href="https://arxiv.org/abs/2305.11738">CRITIC: Large Language Models Can Self-Correct with Tool-Interactive Critiquing</a>',
        '<a href="https://arxiv.org/abs/2305.14497">Self-Polish: Enhance Reasoning in Large Language Models via Problem Refinement</a>',
      ],
    },
  ],
});

const promptEnsembling = makeTopic({
  slug: 'prompt-ensembling',
  title: 'Deep Dive: Prompt ensembling',
  subtitle:
    'Phân tích sâu từ báo cáo <a href="/reports/prompt-engineering/">Prompt Engineering</a> — prompt ensembling dùng nhiều prompt khác nhau và hợp nhất kết quả để giảm variance và tăng reliability.',
  description:
    'Phân tích sâu prompt ensembling: bagging/boosting style prompting, vote/weight/verify và trade-off giữa robustness với chi phí.',
  topicLabel: 'Prompt ensembling / bagging / boosting',
  sections: [
    {
      id: 'intro',
      title: 'Tổng quan',
      themeTag: 'Reliability',
      whyImportant:
        '<strong>Nếu một prompt đơn lẻ không đủ ổn định, ensemble nhiều prompt là cách tăng độ tin cậy bằng redundancy.</strong> Đây là reliability bằng thống kê, không phải bằng lời hứa.',
      paragraphs: [
        'Prompt ensembling là họ kỹ thuật gắn kết nhiều prompt variants, nhiều reasoning paths hoặc nhiều grader để giảm rủi ro của một prompt duy nhất. Trong taxonomy mới, self-consistency chỉ là một biến thể đặc biệt của họ này.',
        'Cách nghĩ đúng là: một prompt tốt có thể chưa đủ; một ensemble đủ đa dạng thường ổn định hơn một prompt “thần kỳ”.',
      ],
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Chiến lược', 'Ý nghĩa', 'Tác dụng'],
        rows: [
          ['Bagging', 'Nhiều prompt/paths cùng vote', 'Giảm variance'],
          ['Boosting', 'Prompt sau sửa lỗi của prompt trước', 'Giảm bias cục bộ'],
          ['Weighted vote', 'Kết quả có trọng số', 'Khai thác confidence'],
        ],
      },
    },
    {
      id: 'mechanics',
      title: 'Cơ chế',
      themeTag: 'Mechanics',
      paragraphs: [
        'Trong thực tế, ensemble thường gồm các prompt variants có khác biệt nhỏ nhưng có chủ ý: khác role, khác ordering, khác example selection, hoặc khác evaluator. Sau đó ta dùng majority vote, weighted vote hoặc verifier để hợp nhất.',
        'Khi task khó nhưng label/answer space ổn định, ensembling rất hiệu quả. Khi output là free-form, ensemble vẫn hữu ích nhưng aggregator phải thông minh hơn string vote.',
      ],
      mermaid:
        'flowchart LR\n  Q[Question] --> P1[Prompt A]\n  Q --> P2[Prompt B]\n  Q --> P3[Prompt C]\n  P1 --> A[Aggregator]\n  P2 --> A\n  P3 --> A\n  A --> F[Final answer]',
      mermaidCaption: 'Prompt ensembling chạy nhiều prompt variants rồi tổng hợp.',
      refs: [
        '<a href="https://arxiv.org/abs/2406.06608">The Prompt Report</a>',
        '<a href="https://journal.hep.com.cn/fcs/EN/10.1007/s11704-025-50058-z">2026 taxonomy of prompt engineering</a>',
        '<a href="https://arxiv.org/abs/2203.11171">Self-Consistency Improves Chain of Thought Reasoning in Language Models</a>',
      ],
    },
    {
      id: 'usage',
      title: 'Khi dùng',
      themeTag: 'Fit',
      paragraphs: [
        'Prompt ensembling hợp với high-stakes classification, extraction, routing, answer selection và các workflow mà xác suất lỗi của một prompt đơn lẻ không thể chấp nhận được.',
        'Nó cũng hữu ích trong evaluation: nhiều prompt khác nhau cho ta một bức tranh tốt hơn về prompt brittleness.',
      ],
      prosCons: {
        pros: [
          'Giảm variance và tăng ổn định',
          'Có thể kết hợp vote/verify/weighting',
          'Tốt cho các workflow rủi ro cao',
        ],
        cons: [
          'Chi phí tăng tuyến tính theo số prompt',
          'Cần aggregator tốt',
          'Các prompt có thể fail cùng một kiểu',
        ],
      },
    },
    {
      id: 'failure',
      title: 'Failure modes',
      themeTag: 'Risk',
      accordion: {
        title: 'Rủi ro của ensemble',
        items: [
          'Các prompt share cùng một bias nên vote không cứu được.',
          'Aggregator tối ưu nhầm metric cục bộ.',
          'Tăng chi phí mà gain không đáng kể.',
          'Đa dạng prompt không đủ lớn để tạo khác biệt thực sự.',
        ],
      },
      callout: {
        type: 'warn',
        html:
          'Ensembling không thay thế cho prompt design tốt. Nếu tất cả members đều mơ hồ, ensemble chỉ làm cho sự mơ hồ đó trở nên đắt hơn.',
      },
    },
    {
      id: 'compare',
      title: 'So sánh',
      themeTag: 'Compare',
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Technique', 'Khác biệt', 'Chọn khi'],
        rows: [
          ['Self-consistency', 'Ensemble trên reasoning paths', 'Answer final ổn định hơn path'],
          ['Prompt optimization', 'Tự cải thiện một prompt', 'Muốn giảm số prompt cần chạy'],
          ['CRITIC/self-refine', 'Dựa vào critique loop', 'Muốn sửa lỗi bằng feedback có cấu trúc'],
        ],
      },
      refs: [
        '<a href="https://arxiv.org/abs/2203.11171">Self-Consistency Improves Chain of Thought Reasoning in Language Models</a>',
        '<a href="https://arxiv.org/abs/2406.06608">The Prompt Report</a>',
        '<a href="https://journal.hep.com.cn/fcs/EN/10.1007/s11704-025-50058-z">Prompt engineering taxonomy</a>',
      ],
    },
    {
      id: 'refs',
      title: 'Tham khảo chính',
      themeTag: 'Sources',
      refs: [
        '<a href="https://arxiv.org/abs/2406.06608">The Prompt Report</a>',
        '<a href="https://journal.hep.com.cn/fcs/EN/10.1007/s11704-025-50058-z">A comprehensive taxonomy of prompt engineering techniques for large language models</a>',
        '<a href="https://arxiv.org/abs/2203.11171">Self-Consistency Improves Chain of Thought Reasoning in Language Models</a>',
      ],
    },
  ],
});

const promptOptimization = makeTopic({
  slug: 'prompt-optimization',
  title: 'Deep Dive: Automatic prompt optimization',
  subtitle:
    'Phân tích sâu từ báo cáo <a href="/reports/prompt-engineering/">Prompt Engineering</a> — prompt engineering trưởng thành khi nó có optimizer, dataset và grader, chứ không chỉ là craft thủ công.',
  description:
    'Phân tích sâu automatic prompt optimization: dataset-driven iteration, graders, human review và các productized optimizer từ OpenAI, Anthropic, Google.',
  topicLabel: 'Automatic prompt optimization',
  sections: [
    {
      id: 'intro',
      title: 'Tổng quan',
      themeTag: 'Optimization',
      whyImportant:
        '<strong>Automatic prompt optimization biến prompt engineering từ craft sang flywheel.</strong> Khi bạn có dataset, graders và feedback, prompt có thể được cải thiện có hệ thống thay vì chỉ chỉnh tay theo cảm giác.',
      paragraphs: [
        'Điều đáng chú ý của giai đoạn mới là prompt optimizer không còn là một mẹo phòng lab. OpenAI, Anthropic và Google đều đã productize các công cụ tối ưu prompt dựa trên dữ liệu và evaluator.',
        'Điểm mấu chốt: optimizer không thay thế reviewer. Nó chỉ làm cho vòng lặp cải thiện prompt rẻ hơn, có cấu trúc hơn và dễ lặp lại hơn.',
      ],
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Input', 'Vai trò', 'Điều kiện cần'],
        rows: [
          ['Prompt hiện tại', 'Baseline để tối ưu', 'Phải chạy được'],
          ['Dataset', 'Cung cấp examples/edge cases', 'Đủ đa dạng'],
          ['Grader', 'Chấm kết quả', 'Phải narrow và rõ'],
        ],
      },
    },
    {
      id: 'mechanics',
      title: 'Cơ chế',
      themeTag: 'Mechanics',
      paragraphs: [
        'Cấu trúc chung của optimizer là: lấy prompt và dataset, chạy eval, đề xuất prompt mới, review và lặp lại. Nếu grader không đo đúng mục tiêu, optimization chỉ là overfitting có tổ chức.',
        'Trong thực tế, optimizer tốt nhất thường không phải optimizer hoàn toàn tự động. Nó là một công cụ tạo candidate prompts để human review và chọn lọc.',
      ],
      codeBlocks: [
        {
          caption: 'Optimization flywheel',
          code: `prompt -> dataset / eval -> optimizer -> manual review -> redeploy`,
          lang: 'text',
        },
      ],
      mermaid:
        'flowchart LR\n  P[Prompt] --> E[Eval / grader]\n  E --> O[Optimizer]\n  O --> R[Review]\n  R --> P',
      mermaidCaption: 'Prompt optimization là một flywheel có evaluator.',
      refs: [
        '<a href="https://platform.openai.com/docs/guides/prompt-optimizer/">OpenAI prompt optimizer</a>',
        '<a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-tools">Claude prompt improver</a>',
        '<a href="https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/data-driven-optimizer">Google Vertex AI data-driven prompt optimizer</a>',
      ],
    },
    {
      id: 'usage',
      title: 'Khi dùng',
      themeTag: 'Fit',
      paragraphs: [
        'Automatic optimization đặc biệt hợp với enterprise workflows có prompt dài, nhiều edge case và regression risk cao. Ở đó, mỗi thay đổi nhỏ đều nên được đo lại.',
        'Nó cũng hữu ích khi nhiều người trong team sửa prompt nhưng không muốn việc đó trở thành thảo luận cảm tính kéo dài.',
      ],
      prosCons: {
        pros: [
          'Giảm manual tuning',
          'Gắn prompt với evals và data',
          'Phù hợp với workflow sản phẩm',
        ],
        cons: [
          'Phụ thuộc mạnh vào grader',
          'Có thể overfit benchmark',
          'Cần human review để tránh regression',
        ],
      },
    },
    {
      id: 'failure',
      title: 'Failure modes',
      themeTag: 'Risk',
      accordion: {
        title: 'Khi optimizer gây hại',
        items: [
          'Grader đo sai thứ cần đo.',
          'Dataset quá nhỏ hoặc quá sạch, không có edge cases.',
          'Optimizer tối ưu theo benchmark mà bỏ qua production inputs.',
          'Người review tin optimizer hơn dữ liệu thực tế.',
        ],
      },
      callout: {
        type: 'warn',
        html:
          'Prompt optimization chỉ mạnh khi objective được đo đúng. Nếu bạn không mô tả được “tốt” là gì, optimizer chỉ tạo ra ảo giác tiến bộ.',
      },
    },
    {
      id: 'compare',
      title: 'So sánh',
      themeTag: 'Compare',
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Technique', 'Khác biệt', 'Lúc nào phù hợp'],
        rows: [
          ['Manual iteration', 'Chỉnh tay từng vòng', 'Khi prompt nhỏ và task đơn giản'],
          ['Prompt ensembling', 'Nhiều prompt cùng chạy', 'Khi cần robustness hơn tối ưu một prompt'],
          ['Structured outputs', 'Ràng output bằng schema', 'Khi downstream cần parseable results'],
        ],
      },
      refs: [
        '<a href="https://platform.openai.com/docs/guides/prompt-optimizer/">OpenAI prompt optimizer</a>',
        '<a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-tools">Claude prompt improver</a>',
        '<a href="https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/data-driven-optimizer">Vertex AI data-driven optimizer</a>',
      ],
    },
    {
      id: 'refs',
      title: 'Tham khảo chính',
      themeTag: 'Sources',
      refs: [
        '<a href="https://platform.openai.com/docs/guides/prompt-optimizer/">OpenAI prompt optimizer</a>',
        '<a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-tools">Claude prompt improver</a>',
        '<a href="https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/data-driven-optimizer">Google Vertex AI data-driven prompt optimizer</a>',
        '<a href="https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/compare-prompts">Google compare prompts</a>',
      ],
    },
  ],
});

const structuredOutputs = makeTopic({
  slug: 'structured-outputs',
  title: 'Deep Dive: Structured outputs',
  subtitle:
    'Phân tích sâu từ báo cáo <a href="/reports/prompt-engineering/">Prompt Engineering</a> — structured outputs biến prompt thành contract: schema, enums, required fields và tool calls parse được ngay.',
  description:
    'Phân tích sâu structured outputs: JSON schema, strict mode, function calling, CFG-style constraints và cách giảm freeform channels.',
  topicLabel: 'Structured outputs / strict mode / allowed tools',
  sections: [
    {
      id: 'intro',
      title: 'Tổng quan',
      themeTag: 'Reliability',
      whyImportant:
        '<strong>Structured outputs là kỹ thuật reliability quan trọng nhất trong agentic systems.</strong> Khi downstream cần dữ liệu machine-readable, ta không còn “nói chuyện” với model mà đang định nghĩa một giao thức.',
      paragraphs: [
        'Điểm mạnh của structured outputs không chỉ là parsing. Nó còn giảm bề mặt prompt injection vì model không được tự do bịa thêm command text ngoài schema.',
        'Trong thực hành hiện đại, structured outputs xuất hiện cùng function calling, tool choice và strict mode. Đây là lớp làm cho output không chỉ đúng mà còn có thể dùng ngay trong code.',
      ],
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Chế độ', 'Tác dụng', 'Điểm cần nhớ'],
        rows: [
          ['JSON Schema', 'Mô tả shape output', 'Phải rõ required và enum'],
          ['Strict mode', 'Ép adherence mạnh hơn', 'Một số schema feature không hỗ trợ'],
          ['Allowed tools', 'Giới hạn action space', 'Giảm tool misuse'],
        ],
      },
    },
    {
      id: 'mechanics',
      title: 'Cơ chế',
      themeTag: 'Mechanics',
      paragraphs: [
        'Với OpenAI, strict mode hiện dựa trên structured outputs và yêu cầu như `additionalProperties: false` cùng danh sách `required` đầy đủ. Với Gemini, structured output cũng dùng JSON Schema nhưng với một tập support khác.',
        'Ở mức thiết kế hệ thống, điểm quan trọng là output space hữu hạn. Khi model chỉ được phép trả về một schema rõ ràng, downstream code không còn phải đoán xem model “muốn nói gì”.',
      ],
      codeBlocks: [
        {
          caption: 'Strict schema sketch',
          lang: 'json',
          code: `{
  "type": "object",
  "properties": {
    "decision": { "type": "string", "enum": ["approve", "reject"] },
    "reason": { "type": "string" }
  },
  "required": ["decision", "reason"],
  "additionalProperties": false
}`,
        },
      ],
      refs: [
        '<a href="https://platform.openai.com/docs/guides/function-calling/parallel-function-calling-and-structured-outputs">OpenAI function calling & structured outputs</a>',
        '<a href="https://ai.google.dev/gemini-api/docs/structured-output">Gemini structured outputs</a>',
        '<a href="https://platform.openai.com/docs/guides/structured-outputs/avoid-json-schema-divergence%3F.zst">OpenAI structured outputs</a>',
      ],
    },
    {
      id: 'usage',
      title: 'Khi dùng',
      themeTag: 'Fit',
      paragraphs: [
        'Structured outputs là mặc định tốt cho extraction, classification, routing, audit logging, function calling và mọi workflow có action thật phía sau.',
        'Nếu task cần output sáng tạo, constrained output có thể bó model quá nhiều. Khi đó cần cân bằng giữa schema và không gian sáng tạo.',
      ],
      prosCons: {
        pros: [
          'Parseable và deterministic hơn',
          'Tốt cho tool calling và automation',
          'Giảm freeform channels cho injection',
        ],
        cons: [
          'Schema quá chặt có thể giảm linh hoạt',
          'Một số schema feature không được support',
          'Thiết kế schema cần kỷ luật',
        ],
      },
    },
    {
      id: 'failure',
      title: 'Failure modes',
      themeTag: 'Risk',
      accordion: {
        title: 'Các lỗi thường gặp',
        items: [
          'Schema drift giữa prompt và downstream parser.',
          'Model bị bó tay vì schema quá chặt.',
          'Output hợp schema nhưng sai business logic.',
          'Tool call vẫn cần approvals và validation phía sau.',
        ],
      },
      callout: {
        type: 'warn',
        html:
          'Structured outputs giúp giảm injection, nhưng không tự động giải quyết mọi rủi ro. Prompt injection vẫn có thể xảy ra nếu bạn để untrusted text chui vào developer context hoặc tool args mà không qua kiểm soát.',
      },
    },
    {
      id: 'compare',
      title: 'So sánh',
      themeTag: 'Compare',
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Technique', 'Khác biệt', 'Khi nào chọn'],
        rows: [
          ['Freeform prompting', 'Model tự do diễn đạt', 'Chỉ phù hợp khi downstream đọc tay'],
          ['JSON mode', 'Cố gắng ra JSON', 'Khi cần output máy đọc nhưng chưa cần schema chặt'],
          ['Function calling', 'Tool arguments theo schema', 'Khi output là action/tool use'],
        ],
      },
      refs: [
        '<a href="https://platform.openai.com/docs/guides/function-calling/parallel-function-calling-and-structured-outputs">OpenAI function calling</a>',
        '<a href="https://ai.google.dev/gemini-api/docs/structured-output">Gemini structured outputs</a>',
        '<a href="https://platform.openai.com/docs/guides/agent-builder-safety">OpenAI safety in building agents</a>',
      ],
    },
    {
      id: 'refs',
      title: 'Tham khảo chính',
      themeTag: 'Sources',
      refs: [
        '<a href="https://platform.openai.com/docs/guides/function-calling/parallel-function-calling-and-structured-outputs">OpenAI function calling & structured outputs</a>',
        '<a href="https://ai.google.dev/gemini-api/docs/structured-output">Gemini structured outputs</a>',
        '<a href="https://platform.openai.com/docs/guides/agent-builder-safety">OpenAI safety in building agents</a>',
        '<a href="https://platform.openai.com/docs/guides/structured-outputs/avoid-json-schema-divergence%3F.zst">OpenAI structured outputs</a>',
      ],
    },
  ],
});

const safetyGuardrails = makeTopic({
  slug: 'safety-guardrails',
  title: 'Deep Dive: Safety and injection defenses',
  subtitle:
    'Phân tích sâu từ báo cáo <a href="/reports/prompt-engineering/">Prompt Engineering</a> — safety là một phần của prompt design: untrusted text phải được cô lập, schema hóa và kiểm soát bằng approvals / guardrails.',
  description:
    'Phân tích sâu safety and injection defenses: prompt injection, data leakage, tool approvals, guardrails và cách harden agentic workflows.',
  topicLabel: 'Safety and injection defenses',
  sections: [
    {
      id: 'intro',
      title: 'Tổng quan',
      themeTag: 'Safety',
      whyImportant:
        '<strong>Prompt engineering hiện đại phải coi untrusted text là nguy cơ, không chỉ là input.</strong> Một khi model có thể gọi tool, đọc file hay truy cập MCP, prompt design và safety design là cùng một bài toán.',
      paragraphs: [
        'Bản chất của prompt injection là dữ liệu không tin cậy cố tình override instruction. Nó có thể khiến model exfiltrate data, gọi sai tool hoặc vi phạm policy mà không hề “tự nhận ra”.',
        'Các vendor lớn đang hội tụ quanh cùng một khung: tách data khỏi instruction, dùng structured outputs để giảm freeform channels, giữ approvals bật, và chạy eval/trace graders để theo dõi hành vi thực tế.',
      ],
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Lớp defense', 'Mục tiêu', 'Ví dụ'],
        rows: [
          ['Input separation', 'Tách untrusted text khỏi developer context', 'User message thay vì developer message'],
          ['Structured outputs', 'Giảm freeform channels', 'JSON schema, enums, required fields'],
          ['Approvals + guardrails', 'Chặn hành động nguy hiểm', 'Human approval node, PII redaction'],
        ],
      },
    },
    {
      id: 'mechanics',
      title: 'Cơ chế',
      themeTag: 'Mechanics',
      paragraphs: [
        'Một workflow an toàn thường có ít nhất bốn lớp: sanitize input, separate instructions from data, constrain output bằng schema, và chặn tool action bằng approvals hoặc policy checks.',
        'Càng nhiều tool và context sources, càng phải coi every boundary là untrusted. Model không nên được phép tự quyết định toàn bộ flow khi input chứa text lạ hoặc khi action có tác động thật.',
      ],
      mermaid:
        'flowchart LR\n  U[Untrusted input] --> S[Sanitize / separate]\n  S --> C[Constrained output]\n  C --> G[Guardrails / approvals]\n  G --> T[Tool / action]\n  T --> O[Observed result]',
      mermaidCaption: 'Defense-in-depth cho agentic prompts: cô lập, constraining và approvals.',
      refs: [
        '<a href="https://platform.openai.com/docs/guides/agent-builder-safety">OpenAI safety in building agents</a>',
        '<a href="https://platform.claude.com/docs/en/docs/mitigating-jailbreaks-prompt-injections">Claude: Mitigate jailbreaks and prompt injections</a>',
        '<a href="https://docs.aws.amazon.com/pdfs/prescriptive-guidance/latest/llm-prompt-engineering-best-practices/llm-prompt-engineering-best-practices.pdf">AWS: Prompt injection best practices</a>',
      ],
    },
    {
      id: 'usage',
      title: 'Khi dùng',
      themeTag: 'Fit',
      paragraphs: [
        'Bất kỳ workflow nào có RAG, browser, file access, MCP, email, ticket system hay database write đều phải coi safety là phần của prompt design.',
        'Ở mức vận hành, guardrails quan trọng không kém prompt wording. Một prompt rất đẹp nhưng cho phép tool calls quá tự do vẫn là một hệ thống dễ bị thao túng.',
      ],
      prosCons: {
        pros: [
          'Giảm prompt injection và data leakage',
          'Làm rõ boundary giữa instruction và data',
          'Có thể kết hợp evals, approvals và validators',
        ],
        cons: [
          'Tăng friction cho developer và user',
          'Có thể làm pipeline chậm hơn',
          'Không có defense nào là tuyệt đối',
        ],
      },
    },
    {
      id: 'failure',
      title: 'Failure modes',
      themeTag: 'Risk',
      accordion: {
        title: 'Anti-patterns cần tránh',
        items: [
          'Nhét raw user text vào developer messages.',
          'Cho tool args freeform text thay vì schema.',
          'Tắt approvals trong workflow rủi ro cao.',
          'Không chạy trace graders hoặc policy evals trên agent traces.',
        ],
      },
      callout: {
        type: 'warn',
        html:
          'Ở môi trường agentic, không có prompt nào đủ tốt nếu boundary management tệ. Safety là hệ thống, không phải một câu nhắc nhở trong prompt.',
      },
    },
    {
      id: 'compare',
      title: 'So sánh',
      themeTag: 'Compare',
      table: {
        variant: 'compare',
        richCells: true,
        headers: ['Defense', 'Giá trị', 'Khi nào cần'],
        rows: [
          ['Structured outputs', 'Giảm freeform channels', 'Khi tool calls / JSON output'],
          ['Tool approvals', 'Ngăn hành động nguy hiểm', 'Khi action có impact thật'],
          ['Guardrails / evals', 'Theo dõi và harden liên tục', 'Khi workflow production'],
        ],
      },
      refs: [
        '<a href="https://platform.openai.com/docs/guides/agent-builder-safety">OpenAI safety in building agents</a>',
        '<a href="https://platform.claude.com/docs/en/docs/mitigating-jailbreaks-prompt-injections">Claude mitigating jailbreaks and prompt injections</a>',
        '<a href="https://docs.aws.amazon.com/pdfs/prescriptive-guidance/latest/llm-prompt-engineering-best-practices/llm-prompt-engineering-best-practices.pdf">AWS prompt injection best practices</a>',
      ],
    },
    {
      id: 'refs',
      title: 'Tham khảo chính',
      themeTag: 'Sources',
      refs: [
        '<a href="https://platform.openai.com/docs/guides/agent-builder-safety">OpenAI safety in building agents</a>',
        '<a href="https://platform.claude.com/docs/en/docs/mitigating-jailbreaks-prompt-injections">Claude: Mitigate jailbreaks and prompt injections</a>',
        '<a href="https://docs.aws.amazon.com/pdfs/prescriptive-guidance/latest/llm-prompt-engineering-best-practices/llm-prompt-engineering-best-practices.pdf">AWS prompt engineering best practices against prompt injection</a>',
        '<a href="https://openai.com/index/chain-of-thought-monitoring/">OpenAI: Detecting misbehavior in frontier reasoning models</a>',
      ],
    },
  ],
});

export const promptEngineeringDeepDives = {
  cot,
  planSolve,
  totGot,
  selfConsistency,
  react,
  promptChaining,
  palPot,
  selfRefine,
  promptEnsembling,
  promptOptimization,
  structuredOutputs,
  safetyGuardrails,
};
