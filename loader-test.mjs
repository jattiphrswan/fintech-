import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const b=await chromium.launch({channel:'msedge',headless:true});
for(const theme of ['dark','light']){
 const p=await b.newPage({viewport:{width:390,height:850},reducedMotion:theme==='light'?'reduce':'no-preference'});
 await p.addInitScript(t=>localStorage.setItem('payline-theme',t),theme);
 await p.goto('http://127.0.0.1:5174',{waitUntil:'domcontentloaded'});
 const loader=p.getByRole('status',{name:'Loading Payline'});await loader.waitFor({state:'visible'});
 assert(await p.locator('[inert]').count());
 console.log(theme,await loader.evaluate(e=>getComputedStyle(e).backgroundColor));
 await loader.screenshot({path:'loader-'+theme+'.png'});
 await loader.waitFor({state:'detached',timeout:6000});assert.equal(await p.locator('[inert]').count(),0);
 await p.getByRole('button',{name:theme==='dark'?'Switch to light mode':'Switch to dark mode'}).click();
 assert.equal(await p.locator('.initial-loader').count(),0);
 await p.reload({waitUntil:'domcontentloaded'});await loader.waitFor({state:'visible'});await loader.waitFor({state:'detached',timeout:6000});
 console.log(theme+' loader, dismissal, reload, theme toggle passed');await p.close();
}
await b.close();
