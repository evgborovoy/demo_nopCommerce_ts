import {defineConfig, devices} from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
const authFile = "./auth/user.json"
const isCI = !!process.env.CI;
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: isCI,
    retries: isCI ? 2 : 0,
    ...(isCI ? {workers: 1} : {}),
    reporter: 'html',
    use: {
        /* Base URL to use in actions like `await page.goto('')`. */
        baseURL: 'https://demo.nopcommerce.com/',


        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: "setup",
            testMatch: /auth\.setup\.ts/,
        },

        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
            testIgnore: "/auth\//",
        },

        {
            name: 'firefox',
            use: {...devices['Desktop Firefox']},
            testIgnore: "/auth\//",
        },

        {
            name: 'webkit',
            use: {...devices['Desktop Safari']},
            testIgnore: "/auth\//",
        },

        {
            name: 'chromium-auth',
            dependencies: ['setup'],
            testMatch: /auth\/.*\.spec\.ts/,
            use: {...devices['Desktop Chrome'], storageState: authFile},
        },
        {
            name: 'firefox-auth',
            dependencies: ['setup'],
            testMatch: /auth\/.*\.spec\.ts/,
            use: {...devices['Desktop Firefox'], storageState: authFile},
        },
        {
            name: 'webkit-auth',
            dependencies: ['setup'],
            testMatch: /auth\/.*\.spec\.ts/,
            use: {...devices['Desktop Safari'], storageState: authFile},
        },

        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://localhost:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
