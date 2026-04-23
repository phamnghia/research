/**
 * Client bootstrap for MermaidDiagram — bundle `mermaid` qua Vite (không phụ thuộc CDN).
 */
import mermaid from 'mermaid';

let initialized = false;

const LB_ZOOM_MIN = 0.25;
const LB_ZOOM_MAX = 4;
const LB_ZOOM_STEP = 1.2;

function readNaturalSvgSize(svg: SVGSVGElement): { w: number; h: number } {
  const vb = svg.viewBox?.baseVal;
  if (vb && vb.width > 0 && vb.height > 0) {
    return { w: vb.width, h: vb.height };
  }
  try {
    const bb = svg.getBBox();
    if (bb.width > 0 && bb.height > 0) {
      return { w: bb.width, h: bb.height };
    }
  } catch {
    /* SVG chưa layout */
  }
  const r = svg.getBoundingClientRect();
  return { w: Math.max(r.width, 1), h: Math.max(r.height, 1) };
}

function ensureMmdLightbox(): void {
  if (document.getElementById('mmd-lightbox')) {
    return;
  }

  let lbZoom = 1;
  let lbNatural: { w: number; h: number } | null = null;

  const overlay = document.createElement('div');
  overlay.id = 'mmd-lightbox';
  overlay.innerHTML = `
    <div class="mmd-lb-backdrop"></div>
    <div class="mmd-lb-content">
      <button type="button" class="mmd-lb-close" aria-label="Đóng">✕</button>
      <div class="mmd-lb-svg-wrap" title="Ctrl/⌘ + scroll to zoom"></div>
      <p class="mmd-lb-caption"></p>
    </div>
    <div class="mmd-lb-zoom-dock" role="toolbar" aria-label="Thu phóng sơ đồ">
      <button type="button" class="mmd-lb-zoom-out" aria-label="Thu nhỏ">−</button>
      <span class="mmd-lb-zoom-label" aria-live="polite">100%</span>
      <button type="button" class="mmd-lb-zoom-in" aria-label="Phóng to">+</button>
      <button type="button" class="mmd-lb-zoom-reset" aria-label="Đặt lại mức thu phóng">Reset</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const wrap = overlay.querySelector<HTMLDivElement>('.mmd-lb-svg-wrap')!;
  const lbCaption = overlay.querySelector<HTMLParagraphElement>('.mmd-lb-caption')!;
  const zoomLabel = overlay.querySelector<HTMLSpanElement>('.mmd-lb-zoom-label')!;

  function applyLbZoom(): void {
    const svg = wrap.querySelector<SVGSVGElement>('svg');
    if (!svg || !lbNatural) return;
    lbZoom = Math.min(LB_ZOOM_MAX, Math.max(LB_ZOOM_MIN, lbZoom));
    svg.style.setProperty('max-width', 'none');
    svg.setAttribute('width', String(Math.round(lbNatural.w * lbZoom)));
    svg.setAttribute('height', String(Math.round(lbNatural.h * lbZoom)));
    zoomLabel.textContent = `${Math.round(lbZoom * 100)}%`;
  }

  function zoomIn(): void {
    lbZoom *= LB_ZOOM_STEP;
    applyLbZoom();
  }

  function zoomOut(): void {
    lbZoom /= LB_ZOOM_STEP;
    applyLbZoom();
  }

  function zoomReset(): void {
    lbZoom = 1;
    applyLbZoom();
  }

  function close(): void {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    wrap.replaceChildren();
    lbCaption.textContent = '';
    lbCaption.hidden = true;
    lbZoom = 1;
    lbNatural = null;
    zoomLabel.textContent = '100%';
  }

  function openFromContainer(container: HTMLElement): void {
    const svg = container.querySelector('.mmd-svg svg');
    if (!(svg instanceof SVGSVGElement)) return;

    const encoded = container.dataset.mmdCaption?.trim();
    let cap = '';
    if (encoded) {
      try {
        cap = decodeURIComponent(encoded);
      } catch {
        cap = encoded;
      }
    }

    lbZoom = 1;
    lbNatural = null;
    zoomLabel.textContent = '100%';

    wrap.replaceChildren();
    wrap.appendChild(svg.cloneNode(true) as SVGSVGElement);

    const root = wrap.querySelector<SVGSVGElement>('svg');
    if (root) {
      const measure = (): void => {
        lbNatural = readNaturalSvgSize(root);
        if (lbNatural.w < 1) lbNatural.w = 400;
        if (lbNatural.h < 1) lbNatural.h = 300;
        applyLbZoom();
      };
      requestAnimationFrame(() => requestAnimationFrame(measure));
    }

    lbCaption.textContent = cap;
    lbCaption.hidden = !cap;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  overlay.querySelector('.mmd-lb-backdrop')!.addEventListener('click', close);
  overlay.querySelector('.mmd-lb-close')!.addEventListener('click', (e) => {
    e.stopPropagation();
    close();
  });
  overlay.querySelector('.mmd-lb-zoom-in')!.addEventListener('click', (e) => {
    e.stopPropagation();
    zoomIn();
  });
  overlay.querySelector('.mmd-lb-zoom-out')!.addEventListener('click', (e) => {
    e.stopPropagation();
    zoomOut();
  });
  overlay.querySelector('.mmd-lb-zoom-reset')!.addEventListener('click', (e) => {
    e.stopPropagation();
    zoomReset();
  });

  wrap.addEventListener(
    'wheel',
    (e) => {
      if (!overlay.classList.contains('open')) return;
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      if (e.deltaY < 0) zoomIn();
      else zoomOut();
    },
    { passive: false },
  );

  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') {
      close();
      return;
    }
    if (e.key === '+' || e.key === '=' || e.key === 'NumpadAdd') {
      e.preventDefault();
      zoomIn();
      return;
    }
    if (e.key === '-' || e.key === '_' || e.key === 'NumpadSubtract') {
      e.preventDefault();
      zoomOut();
      return;
    }
    if (e.key === '0') {
      e.preventDefault();
      zoomReset();
    }
  });

  document.addEventListener('click', (e) => {
    const t = e.target as HTMLElement | null;
    const btn = t?.closest('.mmd-view-full');
    if (!btn || !(btn instanceof HTMLElement)) return;
    const container = btn.closest('.mermaid-container');
    if (!(container instanceof HTMLElement)) return;
    e.preventDefault();
    openFromContainer(container);
  });
}

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

    const inner = document.createElement('div');
    inner.className = 'mmd-diagram-inner';
    inner.appendChild(svgEl);

    const toolbar = document.createElement('div');
    toolbar.className = 'mmd-toolbar';
    const viewBtn = document.createElement('button');
    viewBtn.type = 'button';
    viewBtn.className = 'mmd-view-full';
    viewBtn.setAttribute('aria-label', 'Xem sơ đồ phóng to');
    viewBtn.title = 'Xem sơ đồ phóng to';

    toolbar.appendChild(viewBtn);
    inner.appendChild(toolbar);

    const loading = container.querySelector('.mmd-loading');
    if (loading) loading.remove();
    pre.replaceWith(inner);
  } catch (err) {
    const loading = container.querySelector('.mmd-loading');
    if (loading) {
      loading.textContent = 'Diagram parse error — check chart syntax.';
    }
    console.error('[MermaidDiagram]', err);
  }
}

export function bootMermaidDiagrams(): void {
  ensureMmdLightbox();

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
