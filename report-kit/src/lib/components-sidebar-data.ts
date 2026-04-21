import type { SidebarGroup } from '../components/Sidebar.astro';

/** Mục lục trái cho trang /components/ */
export const componentsPageSidebar: SidebarGroup[] = [
  {
    title: 'Layout',
    items: [
      { href: '#group-layout', label: 'Layout &amp; khung trang', section: true },
      { href: '#layouts', label: 'Layouts' },
      { href: '#breadcrumb', label: 'Breadcrumb' },
      { href: '#sidebar', label: 'Sidebar' },
      { href: '#hero', label: 'Hero' },
      { href: '#section', label: 'Section' },
      { href: '#subheading', label: 'Subheading' },
    ],
  },
  {
    title: 'Nội dung',
    items: [
      { href: '#group-content', label: 'Nội dung &amp; nhấn mạnh', section: true },
      { href: '#technique', label: 'Technique' },
      { href: '#whyimportant', label: 'WhyImportant' },
      { href: '#proscons', label: 'ProsCons' },
      { href: '#callout', label: 'Callout' },
      { href: '#chip', label: 'Chip' },
      { href: '#accordion', label: 'Accordion' },
      { href: '#keytakeaway', label: 'KeyTakeaway' },
      { href: '#quoteblock', label: 'QuoteBlock' },
      { href: '#steplist', label: 'StepList' },
      { href: '#timeline', label: 'Timeline' },
    ],
  },
  {
    title: 'Diagram & code',
    items: [
      { href: '#group-diagrams', label: 'Diagram &amp; code', section: true },
      { href: '#diagram', label: 'Diagram' },
      { href: '#codeblock', label: 'CodeBlock' },
      { href: '#mermaiddiagram', label: 'MermaidDiagram' },
      { href: '#treeview', label: 'TreeView' },
    ],
  },
  {
    title: 'Liên kết',
    items: [
      { href: '#group-links', label: 'Liên kết', section: true },
      { href: '#deepdivelink', label: 'DeepDiveLink' },
      { href: '#reflist', label: 'RefList' },
      { href: '#linklist', label: 'LinkList' },
    ],
  },
  {
    title: 'Bảng',
    items: [
      { href: '#group-tables', label: 'Bảng &amp; số liệu', section: true },
      { href: '#summarytable', label: 'SummaryTable' },
      { href: '#datatable', label: 'DataTable' },
      { href: '#comparematrix', label: 'CompareMatrix' },
      { href: '#statgrid', label: 'StatGrid' },
    ],
  },
  {
    title: 'Charts',
    items: [
      { href: '#group-charts', label: 'Charts', section: true },
      { href: '#chartjs', label: 'Chart.js' },
      { href: '#simplebarchart', label: 'SimpleBarChart' },
      { href: '#sparklinechart', label: 'SparklineChart' },
    ],
  },
  {
    title: 'Media & live',
    items: [
      { href: '#group-media', label: 'Media nhúng', section: true },
      { href: '#mediaembed', label: 'MediaEmbed' },
      { href: '#group-livedata', label: 'Live data (SSE)', section: true },
      { href: '#livedata-sse', label: 'SSE demo' },
      { href: '#livedata-plan', label: 'Roadmap' },
    ],
  },
  {
    title: 'Khác',
    items: [
      { href: '#group-links-ui', label: 'Tabs &amp; related', section: true },
      { href: '#tabs', label: 'Tabs' },
      { href: '#relatedcards', label: 'RelatedCards' },
      { href: '#group-images', label: 'Hình ảnh', section: true },
      { href: '#reportimage', label: 'ReportImage' },
    ],
  },
];
