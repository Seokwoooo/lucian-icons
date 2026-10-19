#!/usr/bin/env node
// Lucian Icons v2.0.11 | MIT (c) 2026 Lucian
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const [command,...args]=process.argv.slice(2);
const read=p=>readFile(path.join(root,p),'utf8');
const norm=s=>String(s).toLowerCase().normalize('NFKC').trim();
// Gallery numbers: every icon shows its catalog order in the gallery ("197", "#197", "197번").
const galleryNumber=s=>{const m=norm(s).match(/^(?:#|no\.?)?0*(\d+)번?$/);return m?Number(m[1]):null};
// Best match of one search term against one icon: exact id, then exact name,
// then exact keyword (earlier keywords weigh more), then word prefix, then substring.
function termScore(icon,term){
 const n=galleryNumber(term);if(n!==null)return icon.order===n?100:0;
 const names=[icon.name.en,icon.name.ko].map(norm),keys=icon.keywords.map(norm);
 if(norm(icon.id)===term)return 100;
 if(names.includes(term))return 80;
 const k=keys.indexOf(term);if(k>=0)return 60-Math.min(k,9);
 const words=[icon.id,...names,...keys].flatMap(s=>norm(s).split(/[\s·/-]+/));
 if(words.some(w=>w.startsWith(term)))return 30;
 return words.some(w=>w.includes(term))?10:0;
}
try {
 const catalog=JSON.parse(await read('catalog.json'));
 if(command==='search'||command==='list'){
  const terms=norm(args.join(' ')).split(/\s+/).filter(Boolean);
  const results=catalog.icons.map((icon,idx)=>{const s=terms.map(t=>termScore(icon,t));return {icon,score:s.reduce((a,b)=>a+b,0),matched:s.filter(Boolean).length,idx}})
   .filter(x=>!terms.length||x.matched>0).sort((a,b)=>b.matched-a.matched||b.score-a.score||a.idx-b.idx).map(x=>({...x.icon,score:x.score}));
  console.log(JSON.stringify(results,null,2));
 }else if(command==='get'){
  const outIndex=args.indexOf('--out');const ids=outIndex<0?args:args.slice(0,outIndex);const out=outIndex<0?null:args[outIndex+1];
  if(!ids.length||(outIndex>=0&&!out))throw new Error('Usage: get <icon-id...> [--out <directory>]');
  const selected=[...new Set(ids.map(id=>{const n=galleryNumber(id),d=catalog.icons.find(x=>n===null?x.id===id:x.order===n);if(!d)throw new Error('Unknown icon: '+id+(n!==null?` (gallery numbers run from 1 to ${catalog.icons.length} in v${catalog.version})`:''));return d}))];
  const runtime=await read('code/runtime.js');
  const hash=s=>createHash('sha256').update(s).digest('hex');
  if(hash(runtime)!==catalog.runtimeSha256)throw new Error('Runtime integrity check failed');
  const icons=await Promise.all(selected.map(async d=>{const code=await read('code/'+d.id+'.js');if(hash(code)!==d.sha256)throw new Error('Icon integrity check failed: '+d.id);return {...d,code}}));
  if(out){
   const target=path.resolve(out);const files=[{name:'runtime.js',code:runtime},...icons.map(d=>({name:d.id+'.js',code:d.code})),{name:'LICENSE',code:await read('LICENSE')}];
   // Plan the complete set first so a conflict writes nothing. Files that are already
   // identical are kept, which lets a later run add icons to the same directory.
   const plan=[];
   for(const f of files){
    const file=path.join(target,f.name);let existing=null;
    try{existing=await readFile(file,'utf8')}catch(e){if(e.code!=='ENOENT')throw e}
    if(existing===null)plan.push({...f,file,write:true});
    else if(existing===f.code)plan.push({...f,file,write:false});
    else{const v=f.name==='runtime.js'&&(existing.match(/VERSION = '([^']+)'/)||[])[1];throw new Error(`Refusing to overwrite ${f.name}: it differs from v${catalog.version}${v?` (the existing runtime is v${v})`:''}. Nothing was written. Copy into a new directory to upgrade.`)}
   }
   await mkdir(target,{recursive:true});for(const f of plan)if(f.write)await writeFile(f.file,f.code,{flag:'wx'});
   console.log(JSON.stringify({version:catalog.version,files:plan.map(f=>f.file),written:plan.filter(f=>f.write).map(f=>f.file),unchanged:plan.filter(f=>!f.write).map(f=>f.file)},null,2));
  }else console.log(JSON.stringify({version:catalog.version,runtime,icons},null,2));
 }else if(command==='tokens') console.log(await read('tokens.css'));
 else if(command==='version')console.log(catalog.version);
 else {console.log('Lucian Icons v'+catalog.version+'\nsearch <English or Korean keywords, or a gallery number>\nlist\nget <id or gallery number...> [--out <directory>]\ntokens\nversion\n\nOffline, no dependencies. Only selected source is printed.\nget --out adds to an existing directory; identical files are kept, a differing file stops the command before anything is written.');if(command&&command!=='--help')process.exitCode=1}
}catch(error){console.error(error.message);process.exitCode=1}
