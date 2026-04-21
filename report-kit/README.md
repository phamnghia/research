# Research Report Kit

Bộ UI kit + Astro site để host **tất cả báo cáo nghiên cứu của Nghĩa & Cowork** trong một nơi có component + styles tái sử dụng. Khi Cowork phân tích repo/hệ thống mới, không cần regenerate CSS hay component — chỉ thêm 1 file `.astro` + 1 entry trong `src/data/reports.ts`.

## Cách chạy

```bash
cd report-kit
npm install          # lần đầu tiên
npm run dev          # mở http://127.0.0.1:4321
```

Các lệnh khác:

- `npm run build` — build static HTML vào `dist/`
- `npm run preview` — preview bản build
- `npm run start` — alias của `dev`

## Các route

| URL | Nội dung |
|-----|----------|
| `/` | Landing: list báo cáo + search + filter theo tag |
| `/components/` | Showcase mọi component của kit (live render + snippet) |
| `/reports/<slug>/` | Một báo cáo cụ thể (`opencode`, `openharness`, …) |

## Cấu trúc thư mục

```
report-kit/
├── package.json
├── astro.config.mjs
├── tsconfig.json
├── src/
│   ├── data/
│   │   └── reports.ts           # Registry metadata cho mọi báo cáo
│   ├── layouts/
│   │   ├── IndexLayout.astro    # Layout trang landing + showcase
│   │   └── ReportLayout.astro   # Layout chung cho mỗi báo cáo
│   ├── components/              # UI kit tái sử dụng (16 component)
│   │   ├── Sidebar.astro
│   │   ├── Hero.astro
│   │   ├── Breadcrumb.astro
│   │   ├── Section.astro
│   │   ├── Subheading.astro
│   │   ├── Technique.astro
│   │   ├── WhyImportant.astro
│   │   ├── ProsCons.astro
│   │   ├── Callout.astro
│   │   ├── Chip.astro
│   │   ├── Diagram.astro
│   │   ├── CodeBlock.astro
│   │   ├── RefList.astro
│   │   ├── LinkList.astro
│   │   ├── SummaryTable.astro
│   │   └── DataTable.astro
│   ├── styles/
│   │   ├── report.css           # Tokens + layout + components
│   │   └── index.css            # Styles trang landing
│   └── pages/
│       ├── index.astro          # Landing: list reports + search + tag filter
│       ├── components.astro     # Showcase component
│       └── reports/
│           ├── _template.astro      # ← COPY khi bắt đầu báo cáo mới
│           ├── opencode.astro
│           └── openharness.astro
├── research/                    # 🔸 Research materials (notes thô, references)
│   ├── README.md                # Hướng dẫn research folder
│   ├── _TEMPLATE/               # Copy khi bắt đầu topic mới
│   ├── opencode-harness/
│   │   ├── README.md            # Mục tiêu, câu hỏi, phạm vi
│   │   ├── techniques.md        # Notes chi tiết 28 kỹ thuật
│   │   └── references.md        # Links, bài đọc
│   └── openharness/
│       ├── README.md
│       ├── techniques.md
│       └── references.md
├── scripts/
│   └── migrate_report.py        # HTML self-contained → .astro (khi cần)
└── dist/                        # Output của `npm run build`
```

## Thêm báo cáo mới

### Cách nhanh nhất

Kích hoạt skill `build-report` (xem `../.claude/skills/build-report/SKILL.md`) — skill sẽ đưa Claude qua đầy đủ 7 bước: clarify → research folder → đọc & ghi chú → `.astro` báo cáo → metadata → build → index.

### Tự làm tay

**1. Tạo research folder** (notes thô):

```bash
cp -r research/_TEMPLATE research/<slug>
```

Fill `research/<slug>/README.md` (mục tiêu, câu hỏi, phạm vi) + `references.md` (link thu thập được).

**2. Copy template báo cáo**:

```bash
cp src/pages/reports/_template.astro src/pages/reports/<slug>.astro
```

Sửa title, Sidebar groups, body. **Dùng component thật** (Section, Technique, ProsCons, Callout, …) thay vì raw HTML.

**3. Đăng ký metadata** trong `src/data/reports.ts`:

```ts
{
  slug: '<slug>',
  title: '<Tên báo cáo>',
  description: '<Mô tả ngắn hiển thị trên card>',
  date: '2026-MM-DD',
  techniqueCount: <n>,
  status: 'in-progress' | 'stable',
  repo: 'org/repo',
  tags: ['harness', 'rust', '...'],
}
```

**4. Build + test**:

```bash
npm run build
npm run dev  # mở /reports/<slug>/
```

**5. Cập nhật `../_index/README.md`** với entry mới.

## Components

| Component | Mục đích | Props chính |
|-----------|----------|-------------|
| `ReportLayout` | HTML skeleton + shared CSS | `title`, `description`, `lang` |
| `IndexLayout` | Layout trang landing/showcase | `title`, `description` |
| `Sidebar` | TOC cố định bên trái | `groups: SidebarGroup[]`, `intro?` |
| `Hero` | Title + sub + meta bar | `title`, `subtitle`, `meta: MetaItem[]` |
| `Breadcrumb` | Link "Tất cả báo cáo" | `href?`, `label?` |
| `Section` | `<h2>` section với theme tag | `id`, `title`, `themeTag?` |
| `Subheading` | h3/h4 phụ có anchor | `level`, `id?`, `text` |
| `Technique` | Card 1 kỹ thuật | `id`, `title`, `tid?`, `location?` |
| `WhyImportant` | Block "Tại sao quan trọng" | (slot) |
| `ProsCons` | 2 cột ưu/nhược | `pros: string[]`, `cons: string[]` |
| `Callout` | info/warn/unique/success | `type?` |
| `Chip` | Tag nhỏ inline | `variant?` |
| `Diagram` | ASCII art box | (slot) |
| `CodeBlock` | `<pre><code>` + caption | `code?`, `caption?` |
| `RefList` | "Tham khảo" list | `title?`, `items: string[]` |
| `LinkList` | h3 + list link | `title`, `items: string[]` |
| `SummaryTable` | Bảng tóm tắt kỹ thuật | `rows: SummaryRow[]`, `headers?` |
| `DataTable` | Bảng dữ liệu / so sánh | `headers`, `rows`, `variant?`, `richCells?` |

Live showcase: `npm run dev` → [http://127.0.0.1:4321/components/](http://127.0.0.1:4321/components/).

## Design tokens

CSS variables (light/dark tự động theo `prefers-color-scheme`):

- Background: `--bg`, `--bg-elev`, `--bg-code`
- Border: `--border`, `--border-soft`
- Text: `--text`, `--text-muted`, `--text-bright`
- Accent: `--accent`, `--accent-soft`
- Semantic: `--green`, `--red`, `--amber`, `--purple`, `--cyan`

## Syntax highlighting thủ công

Trong `<pre><code>`, dùng span class sẵn có:

```html
<span class="kw">const</span>  <!-- keyword (đỏ) -->
<span class="str">"..."</span> <!-- string (xanh) -->
<span class="com">// ...</span><!-- comment (xám italic) -->
<span class="fn">func</span>   <!-- function (tím) -->
<span class="num">42</span>    <!-- number (xanh) -->
<span class="type">Type</span> <!-- type (cam) -->
<span class="tag">tag</span>   <!-- tag (xanh lá) -->
```

## Migrate báo cáo HTML cũ (tự động)

Nếu nguồn là HTML self-contained (ví dụ từ subagent), dùng script `scripts/migrate_report.py`:

```bash
python3 scripts/migrate_report.py \
  path/to/source.html \
  src/pages/reports/<slug>.astro \
  "Tiêu đề" \
  "Mô tả ngắn"
```

Script parse:

- `<aside>` → `<Sidebar groups={...}>`
- `<header class="hero">` → `<Hero ...>`
- Mỗi `<section>` với `<h2>` → `<Section id title themeTag>`
- Mỗi `<div class="technique">` → `<Technique id title tid location>`
- `<div class="proscons">` → `<ProsCons pros={[...]} cons={[...]}>`
- `<div class="callout info|warn|unique">` → `<Callout type="...">`
- `<div class="diagram">` → `<Diagram>`
- `<div class="refs">` → `<RefList items={[...]}>`
- Table tóm tắt → `<SummaryTable rows={[...]}>`
- Các đoạn HTML thô (p, pre><code, h3/h4, bảng tech stack) → `<Fragment is:raw>` để Astro không parse `{}` trong code snippet

Xem `src/pages/reports/opencode.astro` và `openharness.astro` để làm tham chiếu.

## Notes

- Dev server bind ở `127.0.0.1:4321` (sửa trong `astro.config.mjs` nếu cần).
- Build output là static HTML → deploy tuỳ ý (Netlify, Vercel, S3, GitHub Pages).
- `dist/` và `node_modules/` đã được gitignore.
- Vite cache được redirect ra `/tmp/vite-cache-report-kit` để tránh EPERM trên mount.
- File `_template.astro` và `_TEMPLATE/` bắt đầu bằng `_` nên không xuất hiện dưới dạng route.
