import { chromium } from 'playwright';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// Start preview server check
const baseUrl = 'http://127.0.0.1:4173';

const captureBoth = async (path, name) => {
  // Dark mode
  await page.goto(baseUrl + path);
  await page.evaluate(() => {
    localStorage.setItem('payline-theme', 'dark');
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.style.colorScheme = 'dark';
  });
  await page.reload();
  await page.locator('.initial-loader').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${name}-dark.png` });

  // Light mode
  await page.evaluate(() => {
    localStorage.setItem('payline-theme', 'light');
    document.documentElement.dataset.theme = 'light';
    document.documentElement.style.colorScheme = 'light';
  });
  await page.reload();
  await page.locator('.initial-loader').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${name}-light.png` });
};

// Launch preview server inside if needed, or assume running
await captureBoth('/login', 'login');
await captureBoth('/register', 'register');
await captureBoth('/404', '404');
await captureBoth('/accounts', 'coming-soon');

console.log('Screenshots captured in both dark and light themes!');
await browser.close();
