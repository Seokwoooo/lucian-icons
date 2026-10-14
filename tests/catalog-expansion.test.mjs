import test from 'node:test';
import assert from 'node:assert/strict';
import {readdir,readFile} from 'node:fs/promises';
test('112 original icon definitions have unique geometry, bilingual metadata and valid state parts',async()=>{
 const files=(await readdir('src/icons')).filter(f=>f.endsWith('.json'));
 assert.equal(files.length,112,'12 existing icons plus 100 new icons');
 const defs=await Promise.all(files.map(async f=>JSON.parse(await readFile('src/icons/'+f,'utf8'))));
 for(const key of ['id','order','svg'])assert.equal(new Set(defs.map(d=>d[key])).size,112,'unique '+key);
 for(const d of defs){
  assert.match(d.id,/^[a-z]+$/);assert.ok(d.name.ko&&d.name.en&&d.description.ko&&d.description.en,d.id);
  assert.ok(d.keywords.length>=3&&d.category&&d.version==='1.2.0',d.id);
  assert.ok(Object.hasOwn(d.states,d.defaultState)&&Object.keys(d.states).length>=2,d.id);
  for(const locale of ['ko','en'])for(const state of Object.keys(d.states))assert.ok(d.stateLabels?.[locale]?.[state],d.id+': '+locale+' '+state);
  assert.ok(Object.keys(d.parts).length>0&&d.svg.length<10000,d.id);
  assert.doesNotMatch(d.svg,/<script|\bid=|\bon\w+=|https?:/i);
  for(const p of Object.keys(d.parts))assert.ok(d.svg.includes('data-part="'+p+'"'),d.id+': '+p);
  for(const state of Object.values(d.states))for(const p of Object.keys(state))assert.ok(Object.hasOwn(d.parts,p),d.id+': state '+p);
 }
});
