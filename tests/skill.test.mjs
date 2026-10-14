import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
const cli='skills/lucian-icons/scripts/lucian-icons.mjs';
test('skill searches Korean and retrieves only the selected icon with version',()=>{
 const results=JSON.parse(execFileSync('node',[cli,'search','삭제'],{encoding:'utf8'}));assert.equal(results[0].id,'trash');
 const selected=JSON.parse(execFileSync('node',[cli,'get','download'],{encoding:'utf8'}));assert.equal(selected.version,'1.1.0');assert.equal(selected.icons.length,1);assert.equal(selected.icons[0].id,'download');assert.ok(selected.runtime.includes('defineIcon'));assert.ok(selected.icons[0].code.includes('download'));assert.ok(!selected.icons[0].code.includes('lucian-folder'));
});
test('skill copies just the needed modules and will not overwrite user files',async()=>{
 const dir=await mkdtemp(path.join(tmpdir(),'lucian-skill-'));
 try{const result=execFileSync('node',[cli,'get','download','--out',dir],{encoding:'utf8'});assert.match(result,/download.js/);assert.match(await readFile(path.join(dir,'download.js'),'utf8'),/defineIcon/);assert.throws(()=>execFileSync('node',[cli,'get','download','--out',dir],{stdio:'pipe'}));}finally{await rm(dir,{recursive:true,force:true})}
});
