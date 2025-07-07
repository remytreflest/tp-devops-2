import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.js',
  webServer: {
    command: 'npm start',      // ou 'node index.js'
    port: 3000,
    timeout: 30 * 1000,        // max 30s pour démarrer
    reuseExistingServer: !process.env.CI, // en local, ne redémarre pas si déjà lancé
  },
});