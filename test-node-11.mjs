import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const baseUrl = 'http://127.0.0.1:4173';
console.log('Starting Node 11 route and feature test on ' + baseUrl + '...');

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [];
page.on('pageerror', (err) => errors.push(err.message));
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text());
});

const routes = [
  { path: '/', title: 'Payline - Revolutionizing Finance' },
  { path: '/login', title: 'Sign In | Payline' },
  { path: '/register', title: 'Create Account | Payline' },
  { path: '/signup', title: 'Create Account | Payline' },
  { path: '/create-account', title: 'Create Account | Payline' },
  { path: '/accounts', title: 'Personal Accounts (Coming Soon) | Payline' },
  { path: '/cards', title: 'Personal Cards (Coming Soon) | Payline' },
  { path: '/transfers', title: 'Transfers (Coming Soon) | Payline' },
  { path: '/payments', title: 'Payments (Coming Soon) | Payline' },
  { path: '/business', title: 'Business Accounts (Coming Soon) | Payline' },
  { path: '/business/cards', title: 'Corporate Cards (Coming Soon) | Payline' },
  { path: '/business/invoicing', title: 'Invoicing (Coming Soon) | Payline' },
  { path: '/business/payroll', title: 'Payroll (Coming Soon) | Payline' },
  { path: '/pricing', title: 'Pricing Plans | Payline' },
  { path: '/about', title: 'About Us (Coming Soon) | Payline' },
  { path: '/careers', title: 'Careers (Coming Soon) | Payline' },
  { path: '/security', title: 'Security & Trust (Coming Soon) | Payline' },
  { path: '/contact', title: 'Contact Us | Payline' },
  { path: '/404', title: '404 - Page Not Found | Payline' },
  { path: '/non-existent-random-route', title: '404 - Page Not Found | Payline' }
];

// Test 1: Verify all routes load with correct title, navbar, and footer
console.log('\n--- 1. Testing all routes & document titles ---');
for (const r of routes) {
  await page.goto(baseUrl + r.path);
  await page.locator('.initial-loader').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
  
  // Wait for route title
  await page.waitForFunction((expected) => document.title === expected, r.title, { timeout: 3000 });
  assert.equal(await page.title(), r.title, `Title mismatch on ${r.path}`);
  
  // Verify Navbar & Footer present
  assert.equal(await page.locator('.site-nav').count(), 1, `Navbar missing on ${r.path}`);
  assert.equal(await page.locator('footer').count(), 1, `Footer missing on ${r.path}`);
  console.log(`  ✓ Route ${r.path} -> Title: "${r.title}"`);
}

// Test 2: Login Page interactions & Screenshots
console.log('\n--- 2. Testing Login Page ---');
await page.goto(baseUrl + '/login');
await page.locator('.initial-loader').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});

// Test email and password inputs
await page.fill('#login-email', 'alex.fintech@example.com');
await page.fill('#login-password', 'SecurePass123!');

// Test password toggle
const passwordInput = page.locator('#login-password');
assert.equal(await passwordInput.getAttribute('type'), 'password');
await page.click('button[aria-label="Show password"]');
assert.equal(await passwordInput.getAttribute('type'), 'text');
await page.click('button[aria-label="Hide password"]');
assert.equal(await passwordInput.getAttribute('type'), 'password');

// Test remember me
await page.check('.remember-me input');

// Take Login screenshots
await page.screenshot({ path: 'login-dark.png' });
await page.evaluate(() => document.documentElement.dataset.theme = 'light');
await page.waitForTimeout(200);
await page.screenshot({ path: 'login-light.png' });
await page.evaluate(() => document.documentElement.dataset.theme = 'dark');

// Submit login form
await page.click('.auth-submit-btn');
await page.locator('.auth-status-msg').waitFor();
console.log('  ✓ Login form submitted with simulated authentication status');

// Test 3: Register Page interactions & Screenshots
console.log('\n--- 3. Testing Register Page ---');
await page.goto(baseUrl + '/register');
await page.locator('.initial-loader').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});

// Test account type switcher
await page.click('.auth-type-btn:has-text("Business")');
assert.equal(await page.locator('.auth-type-btn:has-text("Business")').getAttribute('aria-selected'), 'true');
await page.click('.auth-type-btn:has-text("Personal")');
assert.equal(await page.locator('.auth-type-btn:has-text("Personal")').getAttribute('aria-selected'), 'true');

// Fill form and check strength indicator
await page.fill('#reg-name', 'Alex Mercer');
await page.fill('#reg-email', 'alex@mercerfin.io');
await page.fill('#reg-password', 'StrongP@ssw0rd!');
assert.equal(await page.locator('.strength-bar.is-active').count(), 4);
await page.fill('#reg-confirm', 'StrongP@ssw0rd!');
await page.check('.remember-me input');

// Take Register screenshots
await page.screenshot({ path: 'register-dark.png' });
await page.evaluate(() => document.documentElement.dataset.theme = 'light');
await page.waitForTimeout(200);
await page.screenshot({ path: 'register-light.png' });
await page.evaluate(() => document.documentElement.dataset.theme = 'dark');

await page.click('.auth-submit-btn');
await page.locator('.auth-status-msg').waitFor();
console.log('  ✓ Register form validated and submitted successfully');

// Test 4: 404 Page verification & Screenshots
console.log('\n--- 4. Testing 404 Page ---');
await page.goto(baseUrl + '/404');
await page.locator('.initial-loader').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});

assert.equal(await page.locator('.not-found-code').innerText(), '404');
assert.equal(await page.locator('h1').innerText(), "This balance doesn't exist.");

await page.screenshot({ path: '404-dark.png' });
await page.evaluate(() => document.documentElement.dataset.theme = 'light');
await page.waitForTimeout(200);
await page.screenshot({ path: '404-light.png' });
await page.evaluate(() => document.documentElement.dataset.theme = 'dark');

console.log('  ✓ 404 page verified and screenshots captured');

// Test 5: Reusable Coming Soon Page & Waitlist
console.log('\n--- 5. Testing Coming Soon Pages & Waitlist Form ---');
await page.goto(baseUrl + '/accounts');
await page.locator('.initial-loader').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});

assert.equal(await page.locator('h1').innerText(), 'Personal Accounts');
assert(await page.locator('.coming-soon-badge').innerText().then(t => t.includes('NODE 12')));

// Fill waitlist form
await page.fill('.waitlist-form input', 'priority@fintech.test');
await page.click('.waitlist-form button');
await page.locator('.waitlist-status').waitFor();
assert(await page.locator('.waitlist-status').innerText().then(t => t.includes('priority notification')));

await page.screenshot({ path: 'coming-soon-dark.png' });
await page.evaluate(() => document.documentElement.dataset.theme = 'light');
await page.waitForTimeout(200);
await page.screenshot({ path: 'coming-soon-light.png' });
await page.evaluate(() => document.documentElement.dataset.theme = 'dark');
console.log('  ✓ Coming Soon page and waitlist form verified');

// Test 6: Navbar Auth link navigation
console.log('\n--- 6. Testing Navbar Link Navigation ---');
await page.goto(baseUrl + '/');
await page.locator('.initial-loader').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});

await page.click('.nav-auth .signin-btn');
await page.waitForURL('**/login');
assert.equal(page.url(), baseUrl + '/login');

await page.click('.nav-auth .signup-btn');
await page.waitForURL('**/register');
assert.equal(page.url(), baseUrl + '/register');
console.log('  ✓ Navbar Sign In and Create Account buttons navigate correctly');

// Test 7: Mobile Responsiveness & Drawer
console.log('\n--- 7. Testing Mobile Responsiveness (390px) ---');
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(baseUrl + '/');
await page.locator('.initial-loader').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});

// Open mobile menu
await page.click('.mobile-menu-toggle');
await page.waitForTimeout(250);
assert.equal(await page.locator('.mobile-auth a').count(), 2);
await page.click('.mobile-auth a:has-text("Sign In")');
await page.waitForURL('**/login');
assert.equal(page.url(), baseUrl + '/login');

console.log('  ✓ Mobile menu navigation works seamlessly');

assert.deepEqual(errors, [], `Console or runtime errors detected: ${errors.join(', ')}`);

console.log('\n=================================================');
console.log('ALL NODE 11 TESTS PASSED SUCCESSFULLY with 0 ERRORS!');
console.log('=================================================\n');

await browser.close();
