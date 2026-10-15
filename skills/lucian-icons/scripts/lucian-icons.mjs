#!/usr/bin/env node
// Lucian Icons v2.0.3 | MIT (c) 2026 Lucian
import {readFile,writeFile,mkdir,access} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const [command,...args]=process.argv.slice(2);
const read=p=>readFile(path.join(root,p),'utf8');
try {
 const catalog=JSON.parse(await read('catalog.json'));
 if(command==='search'||command==='list'){
  const query=args.join(' ').toLowerCase().normalize('NFKC').trim();
  const terms=query.split(/\s+/).filter(Boolean);
  const results=catalog.icons.map(icon=>{const hay=[icon.id,icon.name.ko,icon.name.en,...icon.keywords].join(' ').toLowerCase().normalize('NFKC');return {...icon,score:terms.reduce((n,t)=>n+(hay.includes(t)?1:0),0)}}).filter(x=>!terms.length||x.score>0).sort((a,b)=>b.score-a.score);
  console.log(JSON.stringify(results,null,2));
 }else if(command==='get'){
  const outIndex=args.indexOf('--out');const ids=outIndex<0?args:args.slice(0,outIndex);const out=outIndex<0?null:args[outIndex+1];
  if(!ids.length||(outIndex>=0&&!out))throw new Error('Usage: get <icon-id...> [--out <directory>]');
  const selected=[...new Set(ids)].map(id=>{const d=catalog.icons.find(x=>x.id===id);if(!d)throw new Error('Unknown icon: '+id);return d});
  const runtime=await read('code/runtime.js');
  const hash=s=>createHash('sha256').update(s).digest('hex');
  if(hash(runtime)!==catalog.runtimeSha256)throw new Error('Runtime integrity check failed');
  const icons=await Promise.all(selected.map(async d=>{const code=await read('code/'+d.id+'.js');if(hash(code)!==d.sha256)throw new Error('Icon integrity check failed: '+d.id);return {...d,code}}));
  if(out){
   const target=path.resolve(out);const files=[{name:'runtime.js',code:runtime},...icons.map(d=>({name:d.id+'.js',code:d.code})),{name:'LICENSE',code:await read('LICENSE')}];
   // Preflight the complete set so a normal collision produces no partial write.
   for(const f of files){try{await access(path.join(target,f.name));throw new Error('Refusing to overwrite: '+f.name)}catch(e){if(e.code!=='ENOENT')throw e}}
   await mkdir(target,{recursive:true});for(const f of files)await writeFile(path.join(target,f.name),f.code,{flag:'wx'});
   console.log(JSON.stringify({version:catalog.version,files:files.map(f=>path.join(target,f.name))},null,2));
  }else console.log(JSON.stringify({version:catalog.version,runtime,icons},null,2));
 }else if(command==='tokens') console.log(await read('tokens.css'));
 else if(command==='version')console.log(catalog.version);
 else {console.log('Lucian Icons v'+catalog.version+'\nsearch <English or Korean keywords>\nlist\nget <id...> [--out <new-directory>]\ntokens\nversion\n\nOffline, no dependencies. Only selected source is printed.');if(command&&command!=='--help')process.exitCode=1}
}catch(error){console.error(error.message);process.exitCode=1}
