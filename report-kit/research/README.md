# research/

Đây là nơi lưu **research materials** (notes, references, câu hỏi nghiên cứu, timeline) cho mỗi báo cáo trong report-kit. Ở project level, mỗi slug trong `src/pages/reports/<slug>.astro` có folder tương ứng ở `research/<slug>/`.

Quy tắc 1-1:

```
src/pages/reports/<slug>.astro   ← báo cáo hoàn chỉnh (tinh)
research/<slug>/                 ← quá trình nghiên cứu (thô)
```

## Cấu trúc một folder research

```
research/<slug>/
├── README.md        # Mục tiêu, câu hỏi nghiên cứu, phạm vi, trạng thái
├── techniques.md    # Notes chi tiết từng kỹ thuật/section (optional)
├── references.md    # Links + tác giả + ngày truy cập (luôn có)
└── timeline.md      # (optional) tiến trình theo thời gian
```

## Khi nào dùng folder nào

| Đang làm gì | Ghi vào đâu |
|-------------|-------------|
| Brainstorm / bóc tách câu hỏi | `research/<slug>/README.md` |
| Đọc code, paper, blog → ghi chú tự do | `research/<slug>/techniques.md` hoặc `notes.md` |
| Thu thập link | `research/<slug>/references.md` |
| Dựng báo cáo hoàn chỉnh cho người khác đọc | `src/pages/reports/<slug>.astro` |

## Template

Copy `research/_TEMPLATE/` khi bắt đầu topic mới.

## Slugs hiện có

| Slug | Trạng thái | Báo cáo |
|------|------------|---------|
| `opencode-harness` | stable | [`src/pages/reports/opencode.astro`](../src/pages/reports/opencode.astro) |
| `openharness` | stable | [`src/pages/reports/openharness.astro`](../src/pages/reports/openharness.astro) |
