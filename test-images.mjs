import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 2800 } });
const baseUrl = 'http://127.0.0.1:4173/fintech-/';

const failedRequests = [];
page.on('response', (response) => {
  if (response.status() >= 400) {
    failedRequests.push(`${response.status()} ${response.url()}`);
  }
});

console.log('Testing image loads on ' + baseUrl + '...');
await page.goto(baseUrl);
await page.locator('.initial-loader').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
await page.waitForTimeout(1000);

// Check all images
const images = await page.locator('img').all();
console.log(`Found ${images.length} images on page:`);

for (const img of images) {
  const src = await img.getAttribute('src');
  await img.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const isLoaded = await img.evaluate((el) => el.complete && el.naturalWidth > 0);
  console.log(` - ${src}: loaded=${isLoaded}`);
  assert(isLoaded, `Image failed to load: ${src}`);
}

assert.deepEqual(failedRequests, [], `Some network requests failed: ${failedRequests.join(', ')}`);

await page.screenshot({ path: 'homepage-images-verified.png', fullPage: true });
console.log('✓ All images loaded successfully with naturalWidth > 0! Screenshot saved to homepage-images-verified.png');

await browser.close();
