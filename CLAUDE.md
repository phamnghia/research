# Research Workspace — Nghĩa & Cowork

Đây là không gian nghiên cứu chung giữa Nghĩa (nghiapd9@fpt.com) và Cowork. Mỗi khi được gọi vào folder này, Claude đóng vai trò **trợ lý nghiên cứu**: cùng đào sâu chủ đề, tổng hợp nguồn, và xuất ra báo cáo có cấu trúc.

## 🎯 Nguyên tắc tối thượng

**Toàn bộ báo cáo nghiên cứu sống trong `report-kit/` như trang `.astro`, KHÔNG phải HTML tự chế hay `.md` rời.**

Điều này giữ cho mọi báo cáo chia sẻ chung:

- CSS tokens + dark/light theme (`src/styles/report.css`)
- Component library (Sidebar, Hero, Section, Technique, ProsCons, Callout, Chip, Diagram, CodeBlock, RefList, SummaryTable, DataTable, LinkList, WhyImportant, Subheading, Breadcrumb)
- Trang landing `/` với search + tag filter
- Trang showcase `/components` để tham khảo từng component

Khi Cowork phân tích repo/hệ thống mới, **không regenerate CSS hay component** — tạo folder `src/pages/reports/<slug>/` với `index.astro` bên trong + đăng ký metadata.

**Quy tắc folder bắt buộc:**
- **Layer 1 (overview)**: `src/pages/reports/<slug>/index.astro` — xuất hiện ở trang chủ
- **Layer 2 (deep dive)**: `src/pages/reports/<slug>/<topic>.astro` — ẩn ở trang chủ, link từ Layer 1
- **Import paths trong folder**: dùng `../../../layouts/` và `../../../components/` (3 cấp)
- **Trang chủ** (`index.astro`): tự động lọc — chỉ hiển thị báo cáo `kind !== 'deep-dive'`

## 🗂 Cấu trúc canonical

```
Research/
├── CLAUDE.md                      # File này — hướng dẫn cho Claude
├── .claude/
│   └── skills/
│       ├── build-report/
│       │   └── SKILL.md           # Skill hướng dẫn build báo cáo mới
│       └── deep-dive/
│           └── SKILL.md           # Skill luồng General → Detail (fetch refs → overview → deep dive per topic)
├── _index/
│   └── README.md                  # Mục lục: list reports + trạng thái + tags
├── report-kit/                    # 🔸 CANONICAL — mọi thứ liên quan đến báo cáo
│   ├── README.md                  # Cách chạy, cấu trúc, how-to
│   ├── package.json, astro.config.mjs, tsconfig.json
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.astro        # Landing — CHỈ hiển thị kind !== 'deep-dive' (Layer 1)
│   │   │   ├── components.astro   # Showcase mọi component
│   │   │   └── reports/
│   │   │       ├── _template.astro  # ← COPY khi tạo báo cáo mới
│   │   │       ├── <slug>/          # ← MỖI topic cluster là 1 FOLDER (không phải flat .astro)
│   │   │       │   ├── index.astro  #   Layer 1 overview (route: /reports/<slug>/)
│   │   │       │   └── <topic>.astro #  Layer 2 deep dive (route: /reports/<slug>/<topic>/)
│   │   │       ├── opencode/        # Ví dụ: opencode
│   │   │       │   ├── index.astro
│   │   │       │   └── t13/ ... t28/
│   │   │       ├── openharness/
│   │   │       │   └── index.astro
│   │   │       └── llm-wiki/
│   │   │           ├── index.astro       # Overview (Layer 1)
│   │   │           ├── architecture.astro # Deep dives (Layer 2)
│   │   │           ├── memory.astro
│   │   │           ├── search.astro
│   │   │           └── implementation.astro
│   │   ├── layouts/               # ReportLayout, IndexLayout
│   │   ├── components/            # 16 Astro components tái sử dụng
│   │   ├── data/reports.ts        # Registry metadata → thêm entry cho báo cáo mới
│   │   └── styles/                # report.css (shared), index.css (landing)
│   ├── research/                  # 🔸 Research materials — notes thô + references
│   │   ├── README.md              # Hướng dẫn research folder
│   │   ├── _TEMPLATE/             # Copy khi start topic mới
│   │   ├── opencode-harness/      # README + techniques + references
│   │   │   └── deep-dives/        # notes chi tiết cho từng topic deep dive
│   │   ├── openharness/           # README + techniques + references
│   │   │   └── deep-dives/
│   │   └── llm-wiki/              # README + techniques + references
│   │       └── deep-dives/        # notes cho 4 deep dives
│   └── scripts/migrate_report.py  # HTML → .astro converter (khi cần)
├── archive/                       # File cũ (legacy HTML, old topics/sources)
├── notes/                         # Ghi chú rời, brainstorm không thuộc topic nào
├── drafts/                        # Bản nháp đang viết dở
├── artifacts/  (DEPRECATED)       # Đã move sang archive/, build output ở report-kit/dist/
├── sources/    (DEPRECATED)       # Đã gộp vào report-kit/research/<slug>/references.md
└── topics/     (DEPRECATED)       # Đã gộp vào report-kit/research/<slug>/
```

## 🚀 Luồng công việc mặc định

### A. Bắt đầu báo cáo mới (phân tích repo/hệ thống)

Khi Nghĩa nói "phân tích repo X", "nghiên cứu hệ thống Y", "viết harness report cho Z" → **kích hoạt skill `build-report`** (xem `.claude/skills/build-report/SKILL.md`).

Tóm tắt các bước:

1. **Clarify** (AskUserQuestion): slug, mục tiêu, phạm vi, độ sâu, so sánh.
2. **Setup research folder**: `report-kit/research/<slug>/` với `README.md` + `references.md` (copy từ `_TEMPLATE/`).
3. **Đọc & ghi chú** vào `research/<slug>/techniques.md`, thu thập link vào `references.md`.
4. **Tạo báo cáo trong folder riêng** (KHÔNG tạo flat file):
   ```bash
   mkdir -p report-kit/src/pages/reports/<slug>
   cp report-kit/src/pages/reports/_template.astro report-kit/src/pages/reports/<slug>/index.astro
   ```
   Sửa title, Sidebar, body; dùng component thật (không paste raw HTML).
   **Quan trọng**: import paths dùng `../../../layouts/` và `../../../components/` (3 cấp).
5. **Đăng ký** trong `report-kit/src/data/reports.ts` (slug = tên folder).
6. **Build + test**: `cd report-kit && npm run build` + mở `http://127.0.0.1:4321/reports/<slug>/`.
7. **Update index**: `_index/README.md`.

### B. Ghi chú / brainstorm lẻ (chưa lên thành báo cáo)

- Vào `notes/<ten-bat-ky>.md` — tự do, không cần template.
- Khi đã đủ chất liệu để tổng hợp → move/copy vào `report-kit/research/<slug>/` rồi tiếp luồng A.

### D. Phân tích sâu hơn (General → Detail)

Khi Nghĩa nói "phân tích sâu hơn về X", "deep dive vào topic Y", "tôi muốn hiểu kỹ hơn phần Z" → **kích hoạt skill `deep-dive`** (xem `.claude/skills/deep-dive/SKILL.md`).

**Nguyên lý cốt lõi:**

```
Lớp 1 — Overview (<slug>/index.astro)        fetch ALL refs → tổng hợp → overview report
  └─ Lớp 2 — Deep Dive (<slug>/<topic>.astro)  fetch topic refs → chi tiết → nhiều ảnh
```

**Quy trình rút gọn:**

1. **Fetch tất cả refs trước** (`references.md`) — WebFetch từng URL, ghi notes + thu thập URL ảnh.
2. **Tổng hợp** — xác định 2-5 topics đủ chất liệu để deep dive.
3. **Viết Overview** — `<slug>/index.astro` với `<DeepDiveLink href="/reports/<slug>/<topic>/">` cuối mỗi topic.
4. **Viết Deep Dive per topic** — `<slug>/<topic>.astro` với ≥ 3 `<ReportImage>` + Breadcrumb về Overview.
5. **Đăng ký cả hai lớp** vào `reports.ts`: overview slug = `<slug>`, deep-dive slug = `<slug>/<topic>`.

Chi tiết: xem `.claude/skills/deep-dive/SKILL.md`.

### C. Trả lời câu hỏi về nghiên cứu đã có

1. Đọc `_index/README.md` trước để biết topic nào đã làm.
2. Quét `report-kit/research/<slug>/` để lấy chi tiết notes.
3. Xem `report-kit/src/pages/reports/<slug>/index.astro` để trích dẫn báo cáo canonical.

## 🧭 Quy ước viết

- **Tiếng Việt mặc định** cho notes, summary, commit messages. Trích dẫn nguyên văn tiếng Anh khi cần.
- **Mọi claim phi-hiển-nhiên phải có link** — link trong `references.md` hoặc `RefList` của báo cáo.
- **Frontmatter** cho mọi file `.md` nội dung:
  ```
  ---
  title: <tiêu đề>
  created: YYYY-MM-DD
  updated: YYYY-MM-DD
  tags: [tag1, tag2]
  status: exploring | in-progress | stable | archived
  ---
  ```
- **Không xoá, chỉ archive**. Di chuyển file cũ vào `archive/` với prefix dễ tìm (vd `old-topics-<slug>/`).
- **Thêm báo cáo mới = thêm entry vào `_index/README.md`**.

## 🖼 Dùng hình ảnh trong báo cáo (QUAN TRỌNG)

Báo cáo dùng HTML/Astro — **hoàn toàn có thể và NÊN dùng hình ảnh**. Không như Markdown, hình ảnh trong `.astro` được style đầy đủ với caption, attribution và responsive layout.

### Component `ReportImage`

```astro
import ReportImage from '../../components/ReportImage.astro';

<ReportImage
  src="https://raw.githubusercontent.com/org/repo/main/docs/arch.png"
  alt="Mô tả đầy đủ nội dung ảnh"
  caption="Luồng xử lý chính. Mỗi bước được giải thích bên dưới."
  source="https://github.com/org/repo/blob/main/docs/arch.md"
/>
```

Props: `src` (URL hoặc path), `alt` (bắt buộc), `caption` (HTML), `source` (URL), `sourceLabel`, `width`, `bordered` (cho ảnh nền trắng trên dark theme).

### Khi nào tìm ảnh

Khi fetch refs, **luôn chủ động tìm**:
- Diagram kiến trúc trong README hoặc `docs/` của repo
- Sơ đồ luồng (sequence, flow) trong docs chính thức
- Benchmark / performance chart từ blog / paper
- Screenshot UI / output terminal cho phần demo

Ghi URL ảnh tìm được vào `deep-dives/<topic>/images.md` để dùng lại.

### Quy tắc kỹ thuật

- Ảnh từ GitHub raw: `https://raw.githubusercontent.com/<org>/<repo>/<branch>/path`
- Ảnh nền trắng → thêm `bordered={true}` để hiển thị đẹp trên dark theme
- Luôn có `alt` mô tả đầy đủ (accessibility)
- Luôn có `source` link để credit tác giả / tổ chức

## 🧩 Components sẵn có (không dùng lại raw HTML)

| Component | Khi dùng |
|-----------|----------|
| `ReportLayout` | Skeleton mỗi báo cáo |
| `Sidebar` | TOC trái, nhận `groups: SidebarGroup[]` |
| `Hero` | Title + subtitle + meta bar trên đầu |
| `Breadcrumb` | Link "Tất cả báo cáo" về `/` |
| `Section` | `<h2>` section với theme tag |
| `Subheading` | h3/h4 phụ có anchor |
| `Technique` | Card 1 kỹ thuật (id, title, tid, location) |
| `WhyImportant` | Block "Tại sao quan trọng" bên trong Technique |
| `ProsCons` | 2 cột ưu/nhược |
| `Callout` | info / warn / unique / success |
| `Chip` | Tag inline (variants: green/amber/purple/cyan/red/unique) |
| `Diagram` | ASCII art block (giữ whitespace) |
| `CodeBlock` | `<pre><code>` + Shiki (github-light/dark), prop `code` / slot, `lang` tuỳ chọn |
| `DeepDiveLink` | Link dạng nút tới trang phân tích sâu (viền dashed + halo gradient) |
| `ReportImage` | Hình ảnh với caption HTML + source attribution. Props: `src`, `alt`, `caption`, `source`, `bordered` |
| `RefList` | List tham khảo cuối technique |
| `LinkList` | H3 + danh sách link |
| `SummaryTable` | Bảng tóm tắt kỹ thuật với chip |
| `DataTable` | Bảng thường / so sánh nhiều cột |

Xem tất cả component render sống: chạy `npm run dev` rồi mở [`/components`](http://127.0.0.1:4321/components/).

## ⚠️ Anti-patterns

- ❌ **Tạo flat file `<slug>.astro`** trong `reports/` — phải là folder `<slug>/index.astro`.
- ❌ **Tạo deep dive `<slug>-<topic>.astro`** ngoài folder cha — phải là `<slug>/<topic>.astro`.
- ❌ **Dùng `../../components/`** trong file bên trong folder `<slug>/` — phải là `../../../components/`.
- ❌ Tạo file HTML lớn trong `artifacts/` như bản deliverable (folder đã deprecated).
- ❌ Tạo file `.md` dài làm "báo cáo chính" thay vì file `.astro` — mất toàn bộ styling + sidebar.
- ❌ Viết raw `<div class="technique">` tay thay vì `<Technique>`.
- ❌ Inline `<style>` lớn trong page — dùng tokens CSS của `report.css`.
- ❌ Bỏ quên `src/data/reports.ts` — nếu không add entry, card không xuất hiện ở `/`.
- ❌ Dùng slug dạng `<slug>-<topic>` cho deep dive — phải là `<slug>/<topic>` (slash, không dash).
- ❌ Lưu references rời rạc vào nhiều chỗ — quy ước chỉ `report-kit/research/<slug>/references.md`.
- ❌ Dùng `rm` để xoá file — mounted folder chặn `unlink`. Dùng `mv` sang `archive/`.
- ❌ Bỏ qua hình ảnh trong báo cáo HTML — dùng `<ReportImage>` tích cực, đặc biệt là trong deep dive.
- ❌ Viết deep dive mà không fetch refs trước — luôn fetch ALL trước, tổng hợp sau, viết cuối.
- ❌ Tạo deep dive page mà không có `parentSlug` trong `reports.ts` — mất liên kết giữa 2 lớp.

## 🛠 Skills hữu ích

- `build-report` (local, `.claude/skills/build-report/SKILL.md`) — Luồng chuẩn để build báo cáo mới.
- `deep-dive` (local, `.claude/skills/deep-dive/SKILL.md`) — Luồng General → Detail: fetch all refs → overview → deep dive per topic với hình ảnh.
- `repo-researcher` — Deep-dive một repo trước khi ngồi viết (dùng tại bước thu thập nguồn).
- `engineering:architecture` — Nếu cần ghi ADR (ví dụ "ADR: So sánh OpenHarness permission vs Claude Code").
- `engineering:documentation` — Khi cần viết runbook/README hỗ trợ cho báo cáo.
- `docx`, `pdf`, `xlsx`, `pptx` — Khi cần xuất deliverable cho bên ngoài (ví dụ slide giới thiệu).

## 📍 Khi Nghĩa hỏi "tôi đã nghiên cứu gì?"

1. Đọc `_index/README.md`.
2. Nếu cần chi tiết hơn → vào `report-kit/research/<slug>/`.
3. Trích dẫn kết luận → link tới `report-kit/src/pages/reports/<slug>.astro` hoặc URL live nếu dev server đang chạy.

---

**Trạng thái hợp lệ:** `exploring` → `in-progress` → `stable` → `archived`.
