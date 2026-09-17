import { chromium } from 'playwright';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage();

const requests = [];
page.on('requestfailed', req => {
  requests.push(`FAILED: ${req.url()}`);
});
page.on('response', res => {
  if (res.status() >= 400) {
    requests.push(`${res.status()}: ${res.url()}`);
  }
});

console.log('Navigating to live GitHub Pages URL...');
try {
  const response = await page.goto('https://jattiphrswan.github.io/fintech-/', { waitUntil: 'networkidle', timeout: 30000 });
  console.log(`HTTP Status: ${response.status()}`);
  console.log('Failed / 400+ requests:', requests);

  // Check what script/css is loaded
  const scripts = await page.locator('script[src]').all();
  for (const s of scripts) {
    console.log('Script:', await s.getAttribute('src'));
  }

  // Check what images are on the page
  const images = await page.locator('img').all();
  for (const img of images) {
    const src = await img.getAttribute('src');
    const complete = await img.evaluate(el => el.complete && el.naturalWidth > 0);
    console.log(`Image: ${src} -> loaded=${complete}`);
  }
} catch (e) {
  console.error('Error loading live site:', e);
}

await browser.close();
