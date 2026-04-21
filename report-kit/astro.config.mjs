import { defineConfig } from 'astro/config';
import { sseDemoMockPlugin } from './vite-plugins/sse-demo-mock.ts';

// https://astro.build/config
export default defineConfig({
  site: 'http://127.0.0.1:4321',
  server: {
    host: '127.0.0.1',
    port: 4321,
  },
  devToolbar: {
    enabled: false,
  },
  build: {
    format: 'directory',
  },
  // Đặt cache dir ra ngoài mount để tránh EPERM khi Vite re-optimize deps
  vite: {
    plugins: [sseDemoMockPlugin()],
    cacheDir: '/tmp/vite-cache-report-kit',
    server: {
      watch: {
        ignored: ['**/artifacts/**', '**/sources/**', '**/notes/**'],
      },
    },
  },
});
