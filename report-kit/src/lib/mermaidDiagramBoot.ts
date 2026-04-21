/**
 * Client bootstrap for MermaidDiagram — bundle `mermaid` qua Vite (không phụ thuộc CDN).
 */
import mermaid from 'mermaid';

let initialized = false;

function getThemeAndVariables(): { theme: 'dark' | 'neutral'; themeVariables: Record<string, string> } {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDark) {
    return {
      theme: 'dark',
      themeVariables: {
        background: '#161b22',
        primaryColor: '#1f6feb',
        primaryTextColor: '#c9d1d9',
        lineColor: '#8b949e',
        edgeLabelBackground: '#161b22',
      },
    };
  }
  return {
    theme: 'neutral',
    themeVariables: {
      background: '#ffffff',
      primaryColor: '#218bff',
      primaryTextColor: '#1f2328',
      lineColor: '#59636e',
    },
  };
}

function ensureInit(): void {
  if (initialized) return;
  initialized = true;
  const { theme, themeVariables } = getThemeAndVariables();
  mermaid.initialize({
    startOnLoad: false,
    theme,
    themeVariables,
    flowchart: { curve: 'basis', useMaxWidth: true },
    sequence: { useMaxWidth: true },
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  });
}

function uniqueId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `mmd-${crypto.randomUUID().replace(/-/g, '').slice(0, 12)}`;
  }
  return `mmd-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

async function renderContainer(container: HTMLElement): Promise<void> {
  if (container.dataset.mmdRendered === '1') return;
  const pre = container.querySelector('.mermaid-src');
  if (!(pre instanceof HTMLElement)) return;

  const chart = (pre.textContent ?? '').trim();
  if (!chart) {
    container.dataset.mmdRendered = '1';
    const loading = container.querySelector('.mmd-loading');
    if (loading) loading.textContent = 'Empty diagram.';
    return;
  }

  container.dataset.mmdRendered = '1';

  try {
    ensureInit();
    const id = uniqueId();
    const { svg } = await mermaid.render(id, chart);
    const svgEl = document.createElement('div');
    svgEl.className = 'mmd-svg';
    svgEl.innerHTML = svg;
    const loading = container.querySelector('.mmd-loading');
    if (loading) loading.remove();
    pre.replaceWith(svgEl);
  } catch (err) {
    const loading = container.querySelector('.mmd-loading');
    if (loading) {
      loading.textContent = 'Diagram parse error — check chart syntax.';
    }
    console.error('[MermaidDiagram]', err);
  }
}

export function bootMermaidDiagrams(): void {
  function run(): void {
    document.querySelectorAll('.mermaid-container').forEach((node) => {
      void renderContainer(node as HTMLElement);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(run), { once: true });
  } else {
    requestAnimationFrame(run);
  }
}
