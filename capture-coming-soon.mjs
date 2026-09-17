import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const baseUrl = 'http://127.0.0.1:4173';

const errors = [];
page.on('pageerror', (err) => errors.push(err.message));
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text());
});

console.log('Testing updated ComingSoon component on /accounts...');
await page.goto(baseUrl + '/accounts');
await page.locator('.initial-loader').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});

// Verify elements
assert(await page.locator('.coming__brand').innerText().then(t => t.includes('Payline')));
assert.equal(await page.locator('.coming__eyebrow').innerText(), "WE'RE BUILDING");
assert(await page.locator('.coming__panel h1').innerText().then(t => t.includes('Accounts is coming soon.')));
assert(await page.locator('.coming__panel p').innerText().then(t => t.includes('A smarter way to manage everyday spending')));
assert.equal(await page.locator('.coming__button').innerText(), 'Back Home');
assert.equal(await page.locator('.coming__float').count(), 2);
assert.equal(await page.locator('.coming__watermark').innerText(), 'Payline');

// Capture Dark Theme Screenshot
await page.evaluate(() => {
  localStorage.setItem('payline-theme', 'dark');
  document.documentElement.dataset.theme = 'dark';
  document.documentElement.style.colorScheme = 'dark';
});
await page.reload();
await page.locator('.initial-loader').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
await page.waitForTimeout(400);
await page.screenshot({ path: 'coming-soon-redesign-dark.png' });
console.log('✓ Captured dark mode screenshot: coming-soon-redesign-dark.png');

// Capture Light Theme Screenshot
await page.evaluate(() => {
  localStorage.setItem('payline-theme', 'light');
  document.documentElement.dataset.theme = 'light';
  document.documentElement.style.colorScheme = 'light';
});
await page.reload();
await page.locator('.initial-loader').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
await page.waitForTimeout(400);
await page.screenshot({ path: 'coming-soon-redesign-light.png' });
console.log('✓ Captured light mode screenshot: coming-soon-redesign-light.png');

// Test mobile viewport (390px)
await page.setViewportSize({ width: 390, height: 844 });
await page.reload();
await page.locator('.initial-loader').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
await page.waitForTimeout(300);
await page.screenshot({ path: 'coming-soon-redesign-mobile.png' });
console.log('✓ Captured mobile screenshot: coming-soon-redesign-mobile.png');

// Test Back Home CTA click
await page.setViewportSize({ width: 1440, height: 900 });
await page.click('.coming__button');
await page.waitForURL('http://127.0.0.1:4173/');
assert.equal(page.url(), 'http://127.0.0.1:4173/');
console.log('✓ Back Home CTA successfully navigates to homepage');

// Test /business and /pricing
await page.goto(baseUrl + '/business');
await page.locator('.initial-loader').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
assert(await page.locator('.coming__panel h1').innerText().then(t => t.includes('Business Accounts is coming soon.')));

await page.goto(baseUrl + '/pricing');
await page.locator('.initial-loader').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
assert(await page.locator('.coming__panel h1').innerText().then(t => t.includes('Pricing is coming soon.')));

assert.deepEqual(errors, []);
console.log('All tests for Node 11.7 Coming Soon redesign passed with 0 errors!');
await browser.close();
