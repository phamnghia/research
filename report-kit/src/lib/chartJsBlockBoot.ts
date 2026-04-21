/**
 * Client bootstrap for ChartJsBlock — phải là ES module riêng để Vite resolve `chart.js`.
 * Không dùng define:vars trong .astro (Astro bọc IIFE → import động không resolve được).
 */
import Chart from 'chart.js/auto';

interface ChartJsDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  fill?: boolean;
}

interface ParsedCfg {
  chartId: string;
  chartType: 'bar' | 'line' | 'doughnut' | 'radar' | 'polarArea';
  chartLabels: string[];
  chartDatasets: ChartJsDataset[];
}

function cssColorVar(name: string): string {
  const el = document.createElement('span');
  el.style.color = `var(${name})`;
  document.body.appendChild(el);
  const c = getComputedStyle(el).color;
  document.body.removeChild(el);
  return c;
}

function withAlpha(rgb: string, a: number): string {
  const m = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return rgb;
  return `rgba(${m[1]},${m[2]},${m[3]},${a})`;
}

function initBlock(root: HTMLElement): void {
  const raw = root.getAttribute('data-chart-cfg');
  if (!raw) return;

  let cfg: ParsedCfg;
  try {
    cfg = JSON.parse(raw) as ParsedCfg;
  } catch (e) {
    console.error('[ChartJsBlock] JSON parse', e);
    return;
  }

  const chartId = cfg.chartId;
  const chartType = cfg.chartType;
  const chartLabels = cfg.chartLabels;
  const chartDatasets = cfg.chartDatasets;

  const accent = cssColorVar('--accent');
  const green = cssColorVar('--green');
  const purple = cssColorVar('--purple');
  const amber = cssColorVar('--amber');
  const textBright = cssColorVar('--text-bright');
  const textMuted = cssColorVar('--text-muted');
  const borderSoft = cssColorVar('--border-soft');
  const palette = [accent, green, purple, amber];

  const el = document.getElementById(chartId);
  if (!el || !(el instanceof HTMLCanvasElement)) {
    console.warn('[ChartJsBlock] canvas missing', chartId);
    return;
  }

  const ds = chartDatasets.map((d, i) => {
    const c = palette[i % palette.length];
    const border = d.borderColor != null ? d.borderColor : c;
    let bg = d.backgroundColor;
    if (!bg && chartType === 'doughnut') {
      bg = chartLabels.map((_, j) => withAlpha(palette[j % palette.length], 0.58));
    } else if (!bg && chartType === 'polarArea') {
      bg = chartLabels.map((_, j) => withAlpha(palette[j % palette.length], 0.45));
    } else if (!bg) {
      bg =
        chartType === 'line'
          ? withAlpha(c, 0.22)
          : chartType === 'bar'
            ? withAlpha(c, 0.5)
            : withAlpha(c, 0.45);
    }
    return {
      label: d.label,
      data: d.data,
      borderColor: border,
      backgroundColor: bg,
      fill: d.fill != null ? d.fill : chartType === 'line',
    };
  });

  const cartesian = chartType === 'bar' || chartType === 'line';
  const radar = chartType === 'radar';
  const polar = chartType === 'polarArea';

  const options: Record<string, unknown> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: textBright } },
    },
  };

  if (cartesian) {
    options.scales = {
      x: { ticks: { color: textMuted }, grid: { color: borderSoft } },
      y: { ticks: { color: textMuted }, grid: { color: borderSoft } },
    };
  } else if (radar || polar) {
    options.scales = {
      r: {
        ticks: { color: textMuted, backdropColor: 'transparent' },
        grid: { color: borderSoft },
        ...(radar ? { angleLines: { color: borderSoft }, pointLabels: { color: textMuted } } : {}),
      },
    };
  }

  try {
    new Chart(el, {
      type: chartType,
      data: { labels: chartLabels, datasets: ds },
      options: options as never,
    });
  } catch (e) {
    console.error('[ChartJsBlock] Chart()', chartId, e);
  }
}

export function bootChartJsBlocks(): void {
  function run(): void {
    document.querySelectorAll('.chart-js-block[data-chart-cfg]').forEach((node) => {
      const root = node as HTMLElement;
      if (root.dataset.chartBoot === '1') return;
      root.dataset.chartBoot = '1';
      requestAnimationFrame(() => initBlock(root));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}
