import {readdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
const table=Array.from({length:256},(_,n)=>{for(let k=0;k<8;k++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0});
const crc=b=>{let c=0xffffffff;for(const v of b)c=table[(c^v)&255]^(c>>>8);return (c^0xffffffff)>>>0};
export async function zipDirectory(root,destination,prefix=''){
 const entries=[];async function walk(dir,relative=''){for(const e of (await readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){const rel=path.posix.join(relative,e.name);if(e.isDirectory())await walk(path.join(dir,e.name),rel);else entries.push({name:prefix+rel,data:await readFile(path.join(dir,e.name))})}}await walk(root);
 const local=[],central=[];let offset=0;
 for(const e of entries){const name=Buffer.from(e.name),hash=crc(e.data),head=Buffer.alloc(30);head.writeUInt32LE(0x04034b50);head.writeUInt16LE(20,4);head.writeUInt16LE(0x0800,6);head.writeUInt16LE(0x5d4e,12);head.writeUInt32LE(hash,14);head.writeUInt32LE(e.data.length,18);head.writeUInt32LE(e.data.length,22);head.writeUInt16LE(name.length,26);
 const c=Buffer.alloc(46);c.writeUInt32LE(0x02014b50);c.writeUInt16LE(20,4);c.writeUInt16LE(20,6);c.writeUInt16LE(0x0800,8);c.writeUInt16LE(0x5d4e,14);c.writeUInt32LE(hash,16);c.writeUInt32LE(e.data.length,20);c.writeUInt32LE(e.data.length,24);c.writeUInt16LE(name.length,28);c.writeUInt32LE(offset,42);local.push(head,name,e.data);central.push(c,name);offset+=30+name.length+e.data.length;}
 const centralData=Buffer.concat(central),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(entries.length,8);end.writeUInt16LE(entries.length,10);end.writeUInt32LE(centralData.length,12);end.writeUInt32LE(offset,16);await writeFile(destination,Buffer.concat([...local,centralData,end]));
}
