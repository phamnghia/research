---
name: build-report
description: Build a new research report inside Research/report-kit using the Astro UI kit. Use whenever Nghĩa asks to "phân tích repo X", "nghiên cứu hệ thống Y", "tạo báo cáo mới", "build report cho Z", "viết harness report", or any analogous request that produces a long-form analysis deliverable. This skill keeps every new report inside report-kit's component system so styles, sidebar, search/filter, and tag filtering stay consistent.
---

# build-report — Skill để tạo báo cáo nghiên cứu mới

Tham chiếu: `Research/AGENTS.md`, `Research/report-kit/README.md`, `Research/report-kit/src/pages/reports/_template.astro`, `Research/report-kit/src/pages/components.astro`.

Mục tiêu: mỗi báo cáo mới **ĐỀU** được build inside `report-kit` như một trang `.astro`, không phải HTML self-contained hay `.md` rời. Điều này bảo đảm reuse được UI kit (Sidebar, Hero, Technique, ProsCons, Callout, Chip, Diagram, CodeBlock, RefList, SummaryTable, DataTable, LinkList, WhyImportant, Subheading, Breadcrumb).

## Khi nào kích hoạt skill này

- User nói "phân tích repo / hệ thống / sản phẩm X rồi viết báo cáo"
- User nói "build report mới cho Y"
- User nói "viết bài tổng hợp về Z"
- User nói "tạo harness report cho …"

Nếu user chỉ muốn hỏi / tìm kiếm / ghi chú ngắn — KHÔNG dùng skill này, chỉ ghi vào `research/<slug>/` hoặc trả lời conversational.

## Quy trình bắt buộc

### 1. Clarify (BẮT BUỘC, dùng AskUserQuestion)

Trước khi động vào file, hỏi rõ:

- **Slug** — tên kebab-case cho URL `/reports/<slug>/` và folder `research/<slug>/`. Đề xuất dựa theo tên repo.
- **Mục tiêu** — học / ra quyết định / so sánh / guide.
- **Phạm vi** — tập trung subsystem nào; có exclude gì không.
- **Độ sâu** — quick overview / medium / deep dive với code thật.
- **So sánh** — có cần so với sản phẩm nào không (vd với Codex / opencode).

### 2. Tạo folder research/<slug>/

```
Research/report-kit/research/<slug>/
├── README.md        # copy từ research/_TEMPLATE/README.md, fill mục tiêu/câu hỏi
├── references.md    # copy từ research/_TEMPLATE/references.md, collect link theo nhóm
└── techniques.md    # (optional) notes chi tiết từng kỹ thuật khi đào sâu
```

Viết tiếng Việt. Mỗi file bắt đầu bằng frontmatter `---` với `title`, `created`, `updated`, `tags`, `status`.

### 3. Thu thập nguồn & notes

- Research repo / docs / blog; ghi chú vào `techniques.md` + link vào `references.md` **trước** khi viết báo cáo canonical.
- Mỗi claim phi-hiển-nhiên phải có link trong references.
- Nếu có clone repo để đọc, lưu path trong `README.md` để người sau reproduce.
- **Tìm hình ảnh**: khi fetch từng ref, chủ động tìm diagram kiến trúc, flow chart, screenshot, benchmark chart. Ghi URL ảnh vào `techniques.md` (format: `- [Tên ảnh](URL) — mô tả, dùng ở đoạn nào`).

> 💡 Nếu topic phức tạp và cần nhiều lớp phân tích → chuyển sang skill `deep-dive` thay vì build-report thông thường.

### 4. Tạo báo cáo canonical trong folder riêng

**QUAN TRỌNG**: Mỗi báo cáo Layer 1 phải có **folder riêng** — không tạo flat file `<slug>.astro`.
Cấu trúc đúng: `src/pages/reports/<slug>/index.astro` (route: `/reports/<slug>/`).

```bash
mkdir -p Research/report-kit/src/pages/reports/<slug>
cp Research/report-kit/src/pages/reports/_template.astro \
   Research/report-kit/src/pages/reports/<slug>/index.astro
```

Sau đó Edit file `<slug>/index.astro`:

- **Import paths phải dùng `../../../`** (một cấp sâu hơn flat file):
  ```astro
  import ReportLayout from '../../../layouts/ReportLayout.astro';
  import Sidebar from '../../../components/Sidebar.astro';
  // ... tất cả imports đều dùng ../../../
  ```
- Set `title`, `description`, `subtitle`, `meta` trong Hero.
- Dựng `Sidebar groups` khớp với các `Section id` + `Technique id` trong body.
- Dùng thật sự các component — **KHÔNG paste raw HTML lớn** khi component làm được:
  - Mỗi kỹ thuật → `<Technique>` với `WhyImportant + CodeBlock + ProsCons + RefList` bên trong.
  - Bảng tóm tắt → `<SummaryTable>`.
  - Bảng so sánh → `<DataTable variant="compare" richCells>`.
  - Ưu/nhược → `<ProsCons>`.
  - Nhắn nhủ → `<Callout type="info|warn|unique|success">`.
  - Link đọc thêm cuối section → `<LinkList>` hoặc `<RefList>`.
  - Tag inline → `<Chip variant="...">`.
  - ASCII art → `<Diagram>`.
  - Hình ảnh từ refs → `<ReportImage src="..." alt="..." caption="..." source="..." />`.
- **Hình ảnh**: khi đã tìm được URL ảnh (diagram, flow, screenshot) trong bước thu thập nguồn → nhớ embed vào báo cáo bằng `<ReportImage>`. Đây là HTML, không phải Markdown — hình ảnh được style đẹp và có caption.

```astro
import ReportImage from '../../../components/ReportImage.astro';

<!-- Ví dụ embed diagram từ repo -->
<ReportImage
  src="https://raw.githubusercontent.com/org/repo/main/docs/arch.png"
  alt="Kiến trúc tổng quan của hệ thống"
  caption="Luồng xử lý từ input đến output. Mỗi bước được phân tích trong các technique bên dưới."
  source="https://github.com/org/repo/blob/main/docs/architecture.md"
/>
```

Tham khảo bản đã có: `src/pages/reports/opencode/index.astro`, `src/pages/reports/openharness/index.astro`.

### 5. Đăng ký metadata

Thêm entry vào `Research/report-kit/src/data/reports.ts`:

```ts
{
  slug: '<slug>',          // slug khớp với tên folder: src/pages/reports/<slug>/index.astro
  title: '<Tên hiển thị trên card>',
  description: '<Mô tả ngắn 2-3 câu>',
  date: 'YYYY-MM-DD',
  techniqueCount: <n>,
  status: 'in-progress' | 'stable',
  repo: 'org/repo',
  tags: ['harness', 'language', ...],
  // kind không cần set — undefined/missing = overview (xuất hiện ở trang chủ)
  // kind: 'deep-dive' → KHÔNG xuất hiện ở trang chủ (ẩn tự động)
}
```

Reuse tag có sẵn nếu được — hạn chế bùng nổ tag. Xem tag hiện có:

```bash
grep -h "tags:" Research/report-kit/src/data/reports.ts
```

### 6. Build + smoke test

```bash
cd Research/report-kit
npm run build
```

- Build phải pass.
- Kiểm tra `dist/reports/<slug>/index.html` tồn tại.
- Chạy `npm run dev`, mở `http://127.0.0.1:4321/reports/<slug>/`, xem sidebar anchor, code snippet, ProsCons, references render đúng.
- Kiểm tra trang chủ `http://127.0.0.1:4321/` — báo cáo Layer 1 phải xuất hiện; deep dives KHÔNG xuất hiện.

### 7. Cập nhật index

- `Research/_index/README.md` — thêm dòng trong bảng "Topics" với link tới `report-kit/src/pages/reports/<slug>/index.astro` + link tới `report-kit/research/<slug>/`.
- Nếu báo cáo rút ra ý tưởng / insight đáng nhớ → thêm bullet trong section "Ghi chú lẻ đáng chú ý" của `_index/README.md`.

## Anti-patterns (KHÔNG làm)

- ❌ Tạo flat file `<slug>.astro` trong `reports/` — phải dùng folder `<slug>/index.astro`.
- ❌ Tạo deep dive dưới dạng `<slug>-<topic>.astro` ngoài folder cha — phải là `<slug>/<topic>.astro`.
- ❌ Dùng `../../components/` trong file ở trong `<slug>/` — phải là `../../../components/`.
- ❌ Tạo file HTML self-contained trong `Research/artifacts/` — folder này đã deprecated.
- ❌ Tạo `.md` report trong `notes/` / `drafts/` như là deliverable chính — chỉ dùng cho nháp cá nhân.
- ❌ Duplicate CSS hoặc inline `<style>` lớn trong page — dùng `report.css` qua `ReportLayout`.
- ❌ Raw HTML khi đã có component tương đương (ví dụ viết `<div class="technique">` tay thay vì `<Technique>`).
- ❌ Bỏ qua `src/data/reports.ts` — nếu không đăng ký, card không xuất hiện ở `/`.
- ❌ Xoá file cũ — move vào `Research/archive/` thay vì delete.

## Checklist hoàn thành

Trước khi báo cáo "xong", verify:

- [ ] `src/pages/reports/<slug>/index.astro` tồn tại (folder structure, không phải flat file).
- [ ] Tất cả imports dùng `../../../layouts/` và `../../../components/` (3 cấp lên).
- [ ] Dùng ≥ 8 component khác nhau của kit.
- [ ] Có ít nhất 1 `<ReportImage>` với `alt` + `source` đầy đủ (nếu tìm được ảnh phù hợp từ refs).
- [ ] Không có inline `<style>` lớn hoặc `<link rel="stylesheet">` custom.
- [ ] `src/data/reports.ts` có entry mới (slug khớp với tên folder).
- [ ] `research/<slug>/` có ít nhất `README.md` + `references.md`.
- [ ] `npm run build` pass; `/reports/<slug>/index.html` sinh ra.
- [ ] Dev server render trang đúng (sidebar anchor, ProsCons, code highlight ok).
- [ ] Trang chủ `/` hiển thị card báo cáo mới.
- [ ] `_index/README.md` được update.

## Ví dụ reference

Xem cách các báo cáo hiện tại được build:

- `Research/report-kit/src/pages/reports/opencode/index.astro` — 28 kỹ thuật.
- `Research/report-kit/src/pages/reports/openharness/index.astro` — 30 kỹ thuật.
- `Research/report-kit/src/pages/reports/llm-wiki/index.astro` — 12 kỹ thuật + 4 deep dives trong cùng folder.

Notes thô của các báo cáo:

- `Research/report-kit/research/opencode-harness/`
- `Research/report-kit/research/openharness/`
- `Research/report-kit/research/llm-wiki/`

## Script hỗ trợ

Nếu nguồn đã là HTML self-contained (ví dụ output từ subagent), có thể dùng script migrate:

```bash
cd Research/report-kit
python3 scripts/migrate_report.py \
  path/to/source.html \
  src/pages/reports/<slug>.astro \
  "<Title hiển thị>" \
  "<Mô tả ngắn>"
```

Script parse `<aside>` → Sidebar, `<header class="hero">` → Hero, mỗi `<section>` → Section, mỗi `<div class="technique">` → Technique, proscons/callout/diagram/refs/summary-table được tự recognize.
