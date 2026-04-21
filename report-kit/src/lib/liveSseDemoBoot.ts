/**
 * LiveSseDemo client — ES module để Vite bundle chart.js (không dùng define:vars + import động trong IIFE).
 */
import Chart from 'chart.js/auto';

function cssColorVar(name: string): string {
  const el = document.createElement('span');
  el.style.color = `var(${name})`;
  document.body.appendChild(el);
  const c = getComputedStyle(el).color;
  document.body.removeChild(el);
  return c;
}

function startPanel(root: HTMLElement): void {
  if (root.dataset.sseStarted === '1') return;
  root.dataset.sseStarted = '1';

  const streamUrl = root.dataset.streamUrl;
  if (streamUrl === undefined) return;

  const maxPoints = parseInt(String(root.dataset.maxPoints || '32'), 10) || 32;

  const statusEl = root.querySelector('[data-sse-status]');
  const urlEl = root.querySelector('[data-sse-url]');
  const logEl = root.querySelector('[data-sse-log]');
  const canvas = root.querySelector('canvas');

  if (urlEl) urlEl.textContent = streamUrl;

  const textMuted = cssColorVar('--text-muted');
  const textBright = cssColorVar('--text-bright');
  const accent = cssColorVar('--accent');
  const borderSoft = cssColorVar('--border-soft');

  const labels: string[] = [];
  const latencies: number[] = [];

  let chart: InstanceType<typeof Chart> | null = null;
  if (canvas instanceof HTMLCanvasElement) {
    chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'latencyMs (mock)',
            data: latencies,
            borderColor: accent,
            backgroundColor: 'transparent',
            fill: false,
            tension: 0.25,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 0 },
        plugins: {
          legend: { labels: { color: textBright } },
        },
        scales: {
          x: { ticks: { color: textMuted, maxTicksLimit: 8 }, grid: { color: borderSoft } },
          y: {
            ticks: { color: textMuted },
            grid: { color: borderSoft },
            beginAtZero: true,
          },
        },
      },
    });
  }

  function pushPoint(seq: number, ms: number): void {
    labels.push(String(seq));
    latencies.push(ms);
    while (labels.length > maxPoints) {
      labels.shift();
      latencies.shift();
    }
    if (chart) chart.update();
  }

  function logLine(line: string): void {
    if (!logEl) return;
    const t = new Date().toISOString().slice(11, 23);
    logEl.textContent = `[${t}] ${line}\n` + logEl.textContent;
    const lines = logEl.textContent.split('\n');
    if (lines.length > 40) logEl.textContent = lines.slice(0, 40).join('\n');
  }

  function setStatus(text: string, ok: boolean | null): void {
    if (!statusEl || !(statusEl instanceof HTMLElement)) return;
    statusEl.textContent = text;
    statusEl.dataset.ok = ok === true ? 'true' : ok === false ? 'false' : '';
  }

  let es: EventSource | null = null;
  try {
    es = new EventSource(streamUrl);
  } catch (e) {
    setStatus('Không tạo được EventSource', false);
    logLine(String(e));
  }

  if (es) {
    es.onopen = () => {
      setStatus('Live (SSE)', true);
    };
    es.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data) as {
          seq?: number;
          latencyMs?: number;
          event?: string;
          queueDepth?: unknown;
        };
        const seq = data.seq != null ? data.seq : 0;
        const ms = data.latencyMs != null ? data.latencyMs : 0;
        pushPoint(seq, ms);
        logLine(
          `seq=${seq} latency=${ms}ms event=${data.event != null ? data.event : '?'} queue=${data.queueDepth != null ? String(data.queueDepth) : '?'}`,
        );
      } catch {
        logLine(ev.data);
      }
    };
    es.onerror = () => {
      setStatus('Lỗi / offline (thử npm run dev)', false);
    };
  }
}

export function bootLiveSseDemos(): void {
  function run(): void {
    document.querySelectorAll('[data-live-sse]').forEach((node) => {
      startPanel(node as HTMLElement);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}
