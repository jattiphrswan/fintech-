import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const b=await chromium.launch({channel:'msedge',headless:true});
const p=await b.newPage({colorScheme:'light',viewport:{width:1440,height:1000}});
const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto('http://127.0.0.1:5174');
const theme=()=>p.locator('html').getAttribute('data-theme');
assert.equal(await theme(),'light');
await p.getByRole('button',{name:'Switch to dark mode'}).click();assert.equal(await theme(),'dark');
assert.equal(await p.evaluate(()=>localStorage.getItem('payline-theme')),'dark');await p.reload();assert.equal(await theme(),'dark');
await p.getByRole('button',{name:'Switch to light mode'}).click();await p.reload();assert.equal(await theme(),'light');
await p.emulateMedia({colorScheme:'dark'});assert.equal(await theme(),'light');
for(const width of [1440,1024,768,390,360]){
 await p.setViewportSize({width,height:1000});await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(900);
 assert(await p.getByRole('button',{name:'Switch to dark mode'}).isVisible());
 assert(await p.locator('.site-nav').evaluate(e=>e.getBoundingClientRect().right<=innerWidth));
 if(width<=968){await p.getByRole('button',{name:'Open menu'}).click();assert(await p.locator('.nav-links').isVisible());await p.getByRole('button',{name:'Close menu'}).click();}
 console.log('Theme navbar passed '+width);
}
await p.setViewportSize({width:1440,height:1000});
for(const selector of ['.hero','#growth','footer']){await p.locator(selector).scrollIntoViewIfNeeded();await p.waitForTimeout(900);await p.locator(selector).screenshot({path:'light-'+selector.replace(/[.#]/g,'')+'.png'});}
await p.getByLabel('Initial Deposit',{exact:true}).fill('25000');assert(Number(await p.locator('[data-balance]').getAttribute('data-balance'))>55000);
await p.evaluate(()=>localStorage.clear());await p.reload();assert.equal(await theme(),'dark');await p.emulateMedia({colorScheme:'light'});await p.waitForTimeout(200);assert.equal(await theme(),'light');
const restricted=await b.newContext({colorScheme:'dark'});await restricted.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked')}})});const q=await restricted.newPage();await q.goto('http://127.0.0.1:5174');await q.getByRole('button',{name:'Switch to light mode'}).click();assert.equal(await q.locator('html').getAttribute('data-theme'),'light');
assert.deepEqual(errors,[]);console.log('Persistence, OS changes, storage unavailable and calculator passed');await b.close();
