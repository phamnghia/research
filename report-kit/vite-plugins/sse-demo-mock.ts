import type { Plugin } from 'vite';

/**
 * Dev-only: SSE endpoint giả lập cho demo LiveSseDemo (`GET /api/demo-sse`).
 * Không chạy trong `astro preview` (static) — client hiển thị trạng thái lỗi / offline.
 */
export function sseDemoMockPlugin(): Plugin {
  return {
    name: 'report-kit-sse-demo-mock',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0] ?? '';
        if (path !== '/api/demo-sse') {
          next();
          return;
        }
        if (req.method !== 'GET') {
          res.statusCode = 405;
          res.end();
          return;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache, no-transform');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no');

        let seq = 0;
        const timer = setInterval(() => {
          seq += 1;
          const payload = JSON.stringify({
            t: Date.now(),
            seq,
            latencyMs: Math.round(35 + Math.random() * 140),
            queueDepth: Math.floor(Math.random() * 12),
            event: ['invoke', 'stream', 'tool_done', 'retry', 'heartbeat'][seq % 5],
          });
          res.write(`data: ${payload}\n\n`);
        }, 800);

        req.on('close', () => {
          clearInterval(timer);
        });
      });
    },
  };
}
