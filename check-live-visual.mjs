import { chromium } from 'playwright';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

console.log('Navigating to live GitHub Pages...');
await page.goto('https://jattiphrswan.github.io/fintech-/', { waitUntil: 'networkidle', timeout: 30000 });
await page.locator('.initial-loader').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});

// Scroll through the entire page slowly to trigger any lazy loading / animations
const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
console.log(`Page height: ${scrollHeight}px`);

for (let y = 0; y < scrollHeight; y += 400) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(150);
}

await page.waitForTimeout(1500);

// Check all images
const images = await page.locator('img').all();
console.log(`Found ${images.length} images:`);
for (const img of images) {
  const src = await img.getAttribute('src');
  const visible = await img.isVisible();
  const loaded = await img.evaluate(el => el.complete && el.naturalWidth > 0);
  const naturalWidth = await img.evaluate(el => el.naturalWidth);
  console.log(` - ${src}: visible=${visible}, loaded=${loaded}, width=${naturalWidth}`);
}

await page.screenshot({ path: 'live-github-pages-screenshot.png', fullPage: true });
console.log('Saved screenshot of live GitHub Pages to live-github-pages-screenshot.png');

await browser.close();
