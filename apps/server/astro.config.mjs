// @ts-check
import node from '@astrojs/node';
import { defineConfig } from 'astro/config';

const allowedHosts = (process.env.OUTFITTER_CONSOLE_ALLOWED_HOSTS ?? '')
  .split(',')
  .map((host) => host.trim())
  .filter(Boolean);

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  server: { port: 4322, host: true },
  vite: {
    server: {
      allowedHosts,
      strictPort: true,
    },
  },
});
