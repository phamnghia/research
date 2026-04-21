/**
 * Drawer sidebar trên viewport hẹp — gắn với `.layout` + `#report-sidebar`.
 */
const MQ = '(min-width: 981px)';

function getLayout(): HTMLElement | null {
  return document.querySelector('.layout');
}

export function initReportSidebarToggle(): void {
  if (document.body.dataset.sidebarToggleInit === '1') return;
  document.body.dataset.sidebarToggleInit = '1';

  const layout = getLayout();
  const sidebar = document.getElementById('report-sidebar');
  const openBtn = document.querySelector<HTMLButtonElement>('.sidebar-menu-btn');
  const backdrop = document.querySelector<HTMLElement>('.sidebar-backdrop');
  if (!layout || !sidebar || !openBtn || !backdrop) return;

  const mq = window.matchMedia(MQ);

  function close(): void {
    layout.classList.remove('sidebar-open');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function open(): void {
    layout.classList.add('sidebar-open');
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function toggle(): void {
    if (layout.classList.contains('sidebar-open')) close();
    else open();
  }

  openBtn.addEventListener('click', () => toggle());
  backdrop.addEventListener('click', () => close());

  sidebar.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', () => {
      if (!mq.matches) close();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && layout.classList.contains('sidebar-open')) close();
  });

  mq.addEventListener('change', () => {
    if (mq.matches) close();
  });
}
