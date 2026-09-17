import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage();
const errors = []; page.on('pageerror', error => errors.push(error.message));
await page.goto('http://127.0.0.1:5174');
const section = page.locator('#growth');
for (const width of [1440,1366,1200,1024,900,768,430,390,375,360]) {
  await page.setViewportSize({width,height:1100});
  await section.scrollIntoViewIfNeeded(); await page.waitForTimeout(900);
  const boxes = await section.locator('.growth-visual,.growth-chart,.growth-panel').evaluateAll(es => es.map(e => {const r=e.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,width:r.width,height:r.height};}));
  assert(boxes.every(b=>b.x>=0 && b.right<=width), `Overflow ${width}`);
  if(width>950) {assert(boxes[2].width>boxes[0].width);assert(Math.abs(boxes[2].y-boxes[0].y)<5);}
  else assert(boxes[2].y<boxes[0].y && boxes[0].y<boxes[1].y);
  if(width===1440||width===390) {await page.locator('nav').evaluate(e=>e.style.visibility='hidden');await section.screenshot({path:width===1440?'growth-preview.png':'growth-mobile-preview.png'});await page.locator('nav').evaluate(e=>e.style.visibility='');}
  console.log(`Layout passed: ${width}px`);
}
const balance = async()=>Number(await section.locator('[data-balance]').getAttribute('data-balance'));
const expected=(initial, monthly, years, annual)=>{let n=initial;for(let i=0;i<years*12;i++)n=n*(1+annual/1200)+monthly;return n;};
assert(Math.abs(await balance()-expected(20000,500,4,8))<.001);
await page.getByLabel('Initial Deposit',{exact:true}).fill('30000');assert(Math.abs(await balance()-expected(30000,500,4,8))<.001);
await page.getByLabel('Monthly Deposit',{exact:true}).fill('1000');assert(Math.abs(await balance()-expected(30000,1000,4,8))<.001);
await page.getByLabel('Investment Period',{exact:true}).fill('10');assert.equal(await section.locator('.growth-stack').count(),11);assert(Math.abs(await balance()-expected(30000,1000,10,8))<.001);
await page.getByLabel('Estimated Annual Return',{exact:true}).fill('0');assert.equal(await balance(),150000);
assert((await section.locator('.growth-stack').last().getAttribute('aria-label')).includes('estimated growth $0'));
await page.getByLabel('Estimated Annual Return',{exact:true}).fill('20');assert(Math.abs(await balance()-expected(30000,1000,10,20))<.001);
await page.getByLabel('Initial Deposit',{exact:true}).fill('-50');assert.equal(await page.getByLabel('Initial Deposit',{exact:true}).inputValue(),'0');
await page.getByLabel('Monthly Deposit',{exact:true}).fill('');assert.equal(await balance(),0);
await page.getByLabel('Initial Deposit',{exact:true}).fill('99999999999999');assert(Number.isFinite(await balance()));
await page.getByRole('button',{name:'Reset',exact:true}).click();assert.equal(await page.getByLabel('Initial Deposit',{exact:true}).inputValue(),'20000');assert.equal(await page.getByLabel('Monthly Deposit',{exact:true}).inputValue(),'500');assert.equal(await page.getByLabel('Investment Period',{exact:true}).inputValue(),'4');assert.equal(await page.getByLabel('Estimated Annual Return',{exact:true}).inputValue(),'8');
await page.getByRole('button',{name:'Calculate',exact:true}).click();assert(Math.abs(await balance()-expected(20000,500,4,8))<.001);
await page.waitForTimeout(1700);assert.equal(await section.locator('[data-balance]').innerText(),new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(await balance()));
await page.emulateMedia({reducedMotion:'reduce'});await page.reload();await section.scrollIntoViewIfNeeded();await page.getByLabel('Estimated Annual Return',{exact:true}).fill('0');assert.equal(await balance(),44000);assert.equal(await section.locator('[data-balance]').innerText(),'$44,000');
assert.deepEqual(errors,[]);console.log('Inputs, compounding, zero return, chart, limits, Calculate, Reset and reduced motion passed.');await browser.close();
