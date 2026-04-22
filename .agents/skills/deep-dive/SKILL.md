---
name: deep-dive
description: >
  Workflow General → Detail cho bất kỳ topic nào trong báo cáo nghiên cứu.
  Kích hoạt khi Nghĩa nói: "phân tích sâu hơn về X", "deep dive vào topic Y",
  "tôi muốn hiểu kỹ hơn phần Z", "viết bài chi tiết về W trong báo cáo abc",
  hoặc khi build-report xác định 1 topic cần >3 technique cards.
---

# deep-dive — Skill phân tích sâu General → Detail

Mục tiêu: từ tập hợp refs thô, tạo ra **hai lớp báo cáo**:

```
Lớp 1 — Overview report  (<slug>.astro)
  └─ Lớp 2 — Deep dive reports  (<slug>-<topic>.astro)  [1..N topics]
```

Mỗi lớp 2 được liên kết từ lớp 1 bằng `<DeepDiveLink>`. Người đọc có thể
đọc overview trước rồi chọn topic muốn đào sâu.

---

## Khi nào dùng skill này (thay vì build-report thông thường)

| Tình huống | Skill nên dùng |
|---|---|
| Phân tích repo mới, chưa có report | `build-report` (tạo overview chuẩn) |
| Overview đã có, muốn đào sâu 1 topic | `deep-dive` (chỉ làm lớp 2) |
| Bắt đầu từ đầu AND biết sẽ cần nhiều lớp | `deep-dive` (làm cả 2 lớp) |
| Ghi chú nhanh, chưa muốn ra báo cáo | Ghi thẳng vào `notes/` |

---

## Cấu trúc thư mục

**QUAN TRỌNG**: Mỗi topic cluster phải dùng **folder** — không dùng flat files.

```
report-kit/
  research/
    <slug>/
      README.md
      references.md          # refs tổng — fetch hết trong Phase 1
      techniques.md
      deep-dives/            # ← tạo khi bắt đầu Phase 2
        <topic-a>/
          notes.md           # phân tích chi tiết topic A
          references.md      # refs bổ sung chỉ cho topic A
          images.md          # danh sách URL ảnh hữu ích tìm được khi đọc refs
        <topic-b>/
          notes.md
          references.md
          images.md
  src/pages/reports/
    <slug>/                  # ← FOLDER cho topic cluster (không phải flat file!)
      index.astro            # Overview (Lớp 1), route: /reports/<slug>/
      <topic-a>.astro        # Deep dive topic A (Lớp 2), route: /reports/<slug>/<topic-a>/
      <topic-b>.astro        # Deep dive topic B (Lớp 2), route: /reports/<slug>/<topic-b>/
```

**Quy ước import paths:**
- File trong `<slug>/` → dùng `../../../layouts/` và `../../../components/` (3 cấp lên)
- File trong `<slug>/` KHÔNG dùng `../../` (sẽ trỏ sai thư mục)

---

## Phase 1 — Fetch All Refs & Viết Overview

### Bước 1.1 — Clarify (AskUserQuestion)

Hỏi trước khi làm:

- **Slug gốc** — báo cáo cha sẽ có slug gì?
- **Danh sách topic dự kiến** — có biết trước topic nào sẽ deep dive không?
- **Mức độ overview** — chỉ cần bản tóm tắt nhanh hay overview đầy đủ technique?
- **Ảnh** — có muốn tìm và embed hình ảnh từ refs không (mặc định: có)?

### Bước 1.2 — Setup research folder

```
report-kit/research/<slug>/
├── README.md        (copy _TEMPLATE/README.md, fill mục tiêu)
├── references.md    (copy _TEMPLATE/references.md)
└── techniques.md    (để trống, sẽ fill trong bước 1.3)
```

### Bước 1.3 — Fetch ALL refs đồng loạt

Đây là điểm khác biệt lớn nhất so với build-report thông thường:

```
CHO MỖI URL trong references.md:
  1. WebFetch URL đó
  2. Ghi chú vào techniques.md:
     - Khái niệm chính / key insight
     - Đoạn quote quan trọng (giữ nguyên tiếng Anh)
     - URL ảnh / diagram hữu ích → ghi vào images.md
     - Tags nội dung: [architecture | loop | permission | context | tool-use | ...]
  3. Nếu URL là repo GitHub:
     - Đọc README
     - Tìm file sơ đồ kiến trúc (thường trong docs/ hoặc .github/)
     - Grep các pattern chính (agent loop, tool dispatch, ...)
```

**Luôn fetch hết refs TRƯỚC khi viết báo cáo.** Không viết từng technique rồi mới fetch.

### Bước 1.4 — Tổng hợp & xác định topics cho deep dive

Sau khi fetch xong:

1. Đọc lại `techniques.md` — nhóm các notes theo chủ đề.
2. Xác định 2-5 **topic** có đủ chất liệu để deep dive:
   - ≥ 3 refs nói về topic đó
   - Có sơ đồ / ảnh / code examples liên quan
   - Có nhiều trade-off cần phân tích kỹ
3. Ghi danh sách topic vào `README.md` (section "Deep Dive Topics").

### Bước 1.5 — Viết Overview report

```bash
cp report-kit/src/pages/reports/_template.astro \
   report-kit/src/pages/reports/<slug>.astro
```

Overview report phải có:

- `<Hero>` với subtitle nêu rõ "Báo cáo tổng quan — xem deep dives bên dưới"
- `<SummaryTable>` liệt kê tất cả technique / topic (kể cả topics sẽ có deep dive)
- Mỗi Section/Technique của topic có deep dive: kết thúc bằng `<DeepDiveLink>`
  ```astro
  <DeepDiveLink href="/reports/<slug>/<topic-a>/">
    Phân tích sâu: <topic-a label> — architecture, trade-offs, code walkthrough
  </DeepDiveLink>
  ```
  **Lưu ý**: href dùng `/reports/<slug>/<topic-a>/` (nested, không phải `/reports/<slug>-<topic-a>/`)
- `<Callout type="info">` ở đầu giới thiệu cấu trúc 2 lớp
- **Có hình ảnh**: dùng `<ReportImage>` cho ít nhất 1 diagram kiến trúc tổng quan

Đăng ký trong `reports.ts`:
```ts
{
  slug: '<slug>',
  kind: 'overview',            // ← đánh dấu đây là overview (xuất hiện ở trang chủ)
  // ... các field còn lại
}
```

### Bước 1.6 — Build + test overview

```bash
cd report-kit && npm run build
```

---

## Phase 2 — Deep Dive per Topic

Làm tuần tự từng topic. Với mỗi topic:

### Bước 2.1 — Setup deep-dive folder

```bash
mkdir -p report-kit/research/<slug>/deep-dives/<topic>/
```

Tạo 3 file:
- `notes.md` — phân tích chi tiết (frontmatter + nội dung)
- `references.md` — refs bổ sung chỉ cho topic này (nếu có)
- `images.md` — danh sách URL ảnh + mô tả ngắn, format:
  ```
  ## Images cho topic <topic>
  - [Tên ảnh](URL) — mô tả ngắn, dùng ở đoạn nào
  - [Architecture diagram](https://raw.githubusercontent.com/...) — dùng ở intro
  ```

### Bước 2.2 — Fetch refs bổ sung (nếu cần)

Nếu overview chưa đủ sâu cho topic này:
- Tìm thêm refs (paper, blog, doc chính thức) liên quan trực tiếp
- Fetch và ghi vào `deep-dives/<topic>/references.md` + `notes.md`
- Tìm thêm hình ảnh (diagram, screenshot, benchmark) — ghi vào `images.md`

### Bước 2.3 — Viết deep-dive report

**Tạo file TRONG folder của topic cluster** — không phải ngoài reports/:

```bash
cp report-kit/src/pages/reports/_template.astro \
   report-kit/src/pages/reports/<slug>/<topic>.astro
```

Deep-dive report phải có nhiều hơn overview:

**Cấu trúc mở rộng so với overview:**

| Element | Overview | Deep Dive |
|---|---|---|
| Technique cards | Tóm tắt ngắn | Đầy đủ: Why Important + cơ chế chi tiết + code thật |
| Code snippets | 1-2 ví dụ | Nhiều snippet, từ nhiều file trong repo |
| Diagrams | Tổng quan | Chi tiết từng bước (sequence diagram, state machine) |
| **Hình ảnh** | ≥ 1 `<ReportImage>` | ≥ 3 `<ReportImage>` — diagram, screenshot, benchmark |
| ProsCons | Optional | Bắt buộc cho mỗi technique |
| DataTable | Tổng quan | So sánh chi tiết alternatives |
| RefList | 2-4 refs | Đầy đủ refs chuyên sâu |

**Hero phải có breadcrumb ngữ cảnh:**
```astro
<Hero
  title="Deep Dive: <Topic>"
  subtitle="Phân tích chi tiết từ báo cáo <a href='/reports/<slug>/'>Tổng quan <slug></a>"
  meta={[
    { label: 'Báo cáo cha', value: '<a href="/reports/<slug>/">← Tổng quan</a>' },
    { label: 'Topic', value: '<topic-label>' },
    { label: 'Ngày', value: 'YYYY-MM-DD' },
  ]}
/>
```

**Import paths cho file trong `<slug>/`:**
```astro
import ReportLayout from '../../../layouts/ReportLayout.astro';
import Sidebar from '../../../components/Sidebar.astro';
// tất cả imports đều dùng ../../../  (3 cấp: file → <slug>/ → reports/ → src/)
```

**Sử dụng hình ảnh tích cực:**
```astro
import ReportImage from '../../../components/ReportImage.astro';

<!-- Diagram từ docs chính thức -->
<ReportImage
  src="https://raw.githubusercontent.com/org/repo/main/docs/architecture.png"
  alt="Kiến trúc tổng quan của <topic>"
  caption="Luồng xử lý chính trong <topic>. Mỗi bước được giải thích chi tiết bên dưới."
  source="https://github.com/org/repo/blob/main/docs/architecture.md"
/>

<!-- Screenshot từ blog / whitepaper -->
<ReportImage
  src="https://example.com/images/benchmark.png"
  alt="Benchmark so sánh các approach"
  caption="Kết quả benchmark: <topic-A> nhanh hơn <topic-B> 2.3× trong workload thực tế."
  source="https://example.com/blog/benchmark-post"
  bordered={true}
/>
```

**Đăng ký trong `reports.ts`:**
```ts
{
  slug: '<slug>/<topic>',      // ← dùng slash "/" không phải dấu gạch nối "-"
  kind: 'deep-dive',           // ← đánh dấu đây là deep dive (KHÔNG xuất hiện ở trang chủ)
  parentSlug: '<slug>',        // ← slug của báo cáo cha
  topicLabel: '<Topic Label>', // ← tên topic hiển thị
  title: 'Deep Dive: <Topic Label>',
  // ... các field còn lại
}
```

### Bước 2.4 — Build + test từng deep dive

```bash
cd report-kit && npm run build
# Kiểm tra: dist/reports/<slug>/<topic>/index.html tồn tại
# Kiểm tra trang chủ: deep dive KHÔNG xuất hiện ở / (chỉ overview mới hiện)
```

### Bước 2.5 — Update links trong overview

Sau khi deep dive page đã build thành công:
- Đảm bảo `<DeepDiveLink>` trong overview trỏ đúng URL
- Test thủ công: click DeepDiveLink từ overview → phải load đúng trang deep dive

---

## Phase 3 — Tổng kết & Index

1. `_index/README.md` — thêm tất cả entries (overview + deep dives):
   ```
   | <slug>           | overview   | stable | Tổng quan X                             |
   | <slug>/topic-a   | deep-dive  | stable | Deep Dive: Topic A (← <slug>)           |
   | <slug>/topic-b   | deep-dive  | stable | Deep Dive: Topic B (← <slug>)           |
   ```
   (Slug dùng "/" để phản ánh folder structure)

2. `research/<slug>/README.md` — update section "Deep Dive Topics" với status từng topic.

---

## Quy tắc hình ảnh (BẮT BUỘC từ deep-dive trở đi)

### Khi fetch refs, chủ động tìm ảnh

```
Với mỗi URL fetch được:
  - Tìm <img>, <figure> trong HTML → lấy URL ảnh kiến trúc / diagram / chart
  - Với GitHub repo: tìm file PNG/SVG trong docs/, .github/, hoặc README
  - Với blog/paper: tìm hình minh hoạ flow, sequence, benchmark
  - Ghi vào deep-dives/<topic>/images.md: URL + mô tả + vị trí dùng
```

### Tiêu chí chọn ảnh đưa vào báo cáo

| Ưu tiên | Loại ảnh | Ghi chú |
|---|---|---|
| ★★★ | Diagram kiến trúc tổng quan | Thường có trong README hoặc docs/ |
| ★★★ | Sơ đồ luồng (flow / sequence) | Minh hoạ cách hệ thống vận hành |
| ★★ | Benchmark / performance chart | Dẫn chứng số liệu |
| ★★ | Screenshot UI / output | Cho thấy kết quả thực tế |
| ★ | Ảnh decorative / marketing | Chỉ dùng nếu cần minh hoạ concept |

### Quy tắc kỹ thuật

- **Luôn điền `alt`** mô tả đầy đủ nội dung ảnh
- **Luôn có `source`** để credit tác giả / tổ chức
- Ảnh nền trắng trên dark theme → dùng `bordered={true}`
- Không dùng ảnh quá nhỏ (<400px wide) — sẽ trông vỡ trên màn hình rộng
- Ảnh từ GitHub: dùng `https://raw.githubusercontent.com/<org>/<repo>/<branch>/path`
- Ảnh từ GitHub release (không thay đổi): dùng URL release asset trực tiếp

---

## Checklist hoàn thành deep-dive

### Overview (Lớp 1)
- [ ] `<slug>/index.astro` tồn tại trong FOLDER riêng
- [ ] Tất cả imports dùng `../../../layouts/` và `../../../components/`
- [ ] Có `<Callout type="info">` giải thích cấu trúc 2 lớp
- [ ] Mỗi topic có `<DeepDiveLink>` trỏ tới `/reports/<slug>/<topic>/` (slash, không phải dash)
- [ ] Có ít nhất 1 `<ReportImage>` (diagram kiến trúc tổng quan)
- [ ] `reports.ts` có `kind: 'overview'` + slug khớp tên folder
- [ ] Build pass; trang chủ `/` hiển thị card báo cáo

### Deep Dive (Lớp 2) — mỗi topic
- [ ] File tại `<slug>/<topic>.astro` (trong cùng folder với index.astro)
- [ ] Tất cả imports dùng `../../../` (3 cấp)
- [ ] `<Breadcrumb href="/reports/<slug>/" label="← <Parent> Overview" />` link về cha
- [ ] Có ≥ 3 `<ReportImage>` với caption + source đầy đủ
- [ ] `research/<slug>/deep-dives/<topic>/images.md` ghi lại nguồn ảnh
- [ ] `reports.ts` slug là `<slug>/<topic>` + `kind: 'deep-dive'` + `parentSlug` + `topicLabel`
- [ ] Build pass; deep dive KHÔNG xuất hiện ở trang chủ

### Final
- [ ] `_index/README.md` update đủ mọi entries (slug dùng "/" cho deep dives)
- [ ] Click flow: Landing → Overview → DeepDiveLink → Deep Dive hoạt động
- [ ] Click flow: Deep Dive → Breadcrumb → Overview hoạt động
