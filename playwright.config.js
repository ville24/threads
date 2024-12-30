// @ts-check
const {defineConfig, devices} = require('@playwright/test')

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './e2e-tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI
    ? 2
    : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI
    ? 1
    : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']}
    },

    {
      name: 'firefox',
      use: {...devices['Desktop Firefox']}
    },

    {
      name: 'webkit',
      use: {...devices['Desktop Safari']}
    }
  ],

  webServer: [
    {
      command: 'npm run start',
      url: 'http://localhost:8081',
      timeout: 10 * 1000,
      reuseExistingServer: !process.env.CI,
      stdout: 'pipe'
    }

  /*
   *  ,
   *    {
   *      command: 'npm run dev',
   *      cwd: './threads-ui',
   *      port: 5173,
   *      timeout: 120 * 1000,
   *      reuseExistingServer: !process.env.CI
   *    }
   */
  ],

  use: {

    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:8081',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry'
  }
})
