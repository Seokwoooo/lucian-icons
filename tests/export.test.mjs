import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {staticSVG,normalize} from '../src/runtime/icon.js';
const trash=JSON.parse(await readFile(new URL('../src/icons/trash.json',import.meta.url),'utf8'));
test('static exports reflect selected state and palette without unsafe attributes',()=>{
 const svg=staticSVG(trash,{size:24,accent:'#123456',state:'open'});
 assert.match(svg,/width="24"/);assert.match(svg,/#123456/);assert.match(svg,/rotate\(32deg\)/);assert.doesNotMatch(svg,/var\(--/);assert.doesNotMatch(svg,/\bid=/);
 const o=normalize(trash,{size:'bad',accent:'"><script>',state:'success'});assert.equal(o.size,48);assert.equal(o.state,'closed');assert.equal(o.accent,trash.accent);
});
test('standalone HTML includes selected state, no imports and no auto success',async()=>{
 const {standaloneHTML}=await import('../src/export.js');
 const html=await standaloneHTML(trash,{size:32,state:'open',accent:'#445566',trigger:'hover'},'en');
 assert.match(html,/size="32"/);assert.match(html,/state="open"/);assert.match(html,/#445566/);assert.doesNotMatch(html,/import /);assert.match(html,/pointerenter/);
});
test('embeddable exports scope behavior to the nearest instance and include focus trigger',async()=>{
 const {embeddableCode}=await import('../src/export.js');const code=await embeddableCode(trash,{trigger:'hover'},'en');
 assert.doesNotMatch(code,/<!doctype/);assert.match(code,/document.currentScript.closest/);assert.match(code,/addEventListener\('focus'/);assert.match(code,/addEventListener\('blur'/);
});
test('localized demo state labels retain exact controlled API values',async()=>{
 const {embeddableCode}=await import('../src/export.js');const code=await embeddableCode(trash,{state:'open'},'ko');
 assert.match(code,/<option value="open" selected>열림<\/option>/);
 assert.match(code,/aria-label="쓰레기통: 열림"/);
});
