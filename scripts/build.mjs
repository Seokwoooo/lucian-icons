// Builds dist/icons/ (gallery, modules, API, downloads) and the skill's generated files
// from src/icons/*.js. Node 18+, no dependencies.
import { readdir, readFile, mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { staticSVG, statesOf } from '../src/runtime/icon.js';
import { standaloneHTML } from '../src/export.js';
import { zipDirectory } from './zip.mjs';
import authored, { CATEGORIES } from '../src/icons/index.js';

const root = new URL('../', import.meta.url), out = new URL('dist/icons/', root), skill = new URL('skills/lucian-icons/', root);
const { version } = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));
const hash = s => createHash('sha256').update(s).digest('hex');
const header = d => `/* Lucian Icons ${d.id} v${version} | MIT (c) 2026 Lucian | https://lucianlabs.dev/icons/ */`;

// Validate and freeze each definition into plain data.
const KEYS = ['id', 'name', 'keywords', 'category', 'description', 'color', 'states', 'defaultState', 'stateLabels', 'progress', 'svg', 'origins', 'poses', 'transitions', 'effect', 'loops', 'motion'];
const seen = new Set();
const defs = authored.map((src, i) => {
  const d = Object.fromEntries(KEYS.filter(k => src[k] !== undefined).map(k => [k, src[k]]));
  const fail = msg => { throw new Error(`${d.id || '#' + i}: ${msg}`); };
  if (!/^[a-z]+$/.test(d.id || '') || seen.has(d.id)) fail('id must be unique lowercase letters');
  seen.add(d.id);
  if (!d.name?.ko || !d.name?.en || !d.description?.ko || !d.description?.en) fail('bilingual name and description required');
  if (!CATEGORIES[d.category]) fail('unknown category ' + d.category);
  if (!/^#[\da-f]{6}$/i.test(d.color || '')) fail('color must be #rrggbb');
  if (!Array.isArray(d.keywords) || d.keywords.length < 3) fail('at least three keywords');
  if (/<script|\bid=|\bon\w+=|https?:|url\(/i.test(d.svg)) fail('unsafe svg');
  const parts = new Set([...d.svg.matchAll(/data-part="([\w-]+)"/g)].map(m => m[1]).concat('*'));
  const refs = [d.poses, d.transitions, d.loops].flatMap(g => Object.values(g || {}).flatMap(Object.keys)).concat(Object.keys(d.effect || {}), Object.keys(d.origins || {}));
  for (const r of refs) if (!parts.has(r)) fail('unknown part ' + r);
  const states = statesOf(d);
  if (d.states && (!states.includes(d.defaultState) || states.length < 2)) fail('states need a default and at least two entries');
  for (const s of Object.keys(d.poses || {})) if (s !== '*' && !states.includes(s)) fail('pose for unknown state ' + s);
  for (const s of Object.keys(d.loops || {})) if (!states.includes(s)) fail('loop for unknown state ' + s);
  for (const s of states) for (const l of ['ko', 'en']) if (!d.stateLabels?.[l]?.[s]) fail(`missing ${l} label for ${s}`);
  if (!d.effect) fail('every icon needs a hover effect');
  return { id: d.id, version, order: i + 1, ...d };
});

await rm(new URL('dist/', root), { recursive: true, force: true });
for (const dir of ['modules/', 'runtime/', 'api/v1/icons/', 'downloads/svg/', 'downloads/html/', 'examples/code/']) await mkdir(new URL(dir, out), { recursive: true });
await rm(new URL('code/', skill), { recursive: true, force: true });
await mkdir(new URL('code/', skill), { recursive: true });

const runtime = await readFile(new URL('src/runtime/icon.js', root), 'utf8');
for (const url of [new URL('modules/runtime.js', out), new URL('runtime/icon.js', out), new URL('code/runtime.js', skill)]) await writeFile(url, runtime);

const entries = [];
for (const d of defs) {
  const code = `${header(d)}\nimport { defineIcon } from './runtime.js';\nexport const definition = ${JSON.stringify(d)};\ndefineIcon(definition);\nexport default definition;\n`;
  for (const url of [new URL(`modules/${d.id}.js`, out), new URL(`code/${d.id}.js`, skill)]) await writeFile(url, code);
  await writeFile(new URL(`api/v1/icons/${d.id}.json`, out), JSON.stringify(d));
  await writeFile(new URL(`downloads/svg/${d.id}.svg`, out), staticSVG(d));
  await writeFile(new URL(`downloads/html/${d.id}.html`, out), await standaloneHTML(d, {}, 'en'));
  const { svg, origins, poses, transitions, effect, loops, motion, ...meta } = d;
  entries.push({ ...meta, states: statesOf(d), progress: Boolean(d.progress), sha256: hash(code), codePath: `modules/${d.id}.js` });
}

// One module with every icon, for quick prototypes and for the gallery itself.
const categories = Object.fromEntries(Object.entries(CATEGORIES).map(([id, [ko, en]]) => [id, { ko, en, count: defs.filter(d => d.category === id).length }]));
const all = `/* Lucian Icons v${version} (all ${defs.length}) | MIT (c) 2026 Lucian | https://lucianlabs.dev/icons/ */\nimport { defineIcon } from './runtime/icon.js';\nexport const categories = ${JSON.stringify(categories)};\nexport const definitions = ${JSON.stringify(defs)};\nfor (const d of definitions) defineIcon(d);\nexport default definitions;\n`;
await writeFile(new URL('all.js', out), all);

const catalog = JSON.stringify({ version, base: 'https://lucianlabs.dev/icons/', runtimeSha256: hash(runtime), categories, icons: entries }, null, 2);
for (const url of [new URL('catalog.json', out), new URL('api/v1/catalog.json', out), new URL('catalog.json', skill)]) await writeFile(url, catalog);
await cp(new URL('LICENSE', root), new URL('LICENSE', skill));

// Gallery
await cp(new URL('web/', root), out, { recursive: true });
const escHTML = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const stateRows = defs.filter(d => statesOf(d).length).map(d => `<tr><td><a href="./#${d.id}"><lucian-${d.id} size="20" animate="none"></lucian-${d.id}><span>${d.id}</span></a> <i lang="ko" class="ko">${escHTML(d.name.ko)}</i><i lang="en" class="en">${escHTML(d.name.en)}</i></td><td><span class="d-st">${statesOf(d).map(s => `<code>${s}</code>`).join('')}</span></td></tr>`).join('');
const counts = { '{{VERSION}}': version, '{{ICON_COUNT}}': String(defs.length), '{{CATEGORY_COUNT}}': String(Object.keys(CATEGORIES).length), '{{STATEFUL_COUNT}}': String(defs.filter(d => statesOf(d).length).length), '{{STATE_TABLE}}': stateRows };
for (const name of ['index.html', 'guide.html']) {
  const url = new URL(name, out);
  let html = await readFile(url, 'utf8');
  for (const [k, v] of Object.entries(counts)) html = html.replaceAll(k, v);
  await writeFile(url, html);
}
await cp(new URL('src/export.js', root), new URL('export.js', out));
await cp(new URL('LICENSE', root), new URL('LICENSE', out));

// Runnable skill example, published next to the modules it imports
await cp(new URL('examples/download.html', skill), new URL('examples/download.html', out));
for (const name of ['download.js', 'runtime.js']) await cp(new URL('modules/' + name, out), new URL('examples/code/' + name, out));
const example = await readFile(new URL('examples/download.html', out), 'utf8');
await writeFile(new URL('examples/download.html', out), example.replace("'../code/download.js'", "'./code/download.js'"));

// Packages
await zipDirectory(fileURLToPath(skill), fileURLToPath(new URL(`downloads/lucian-icons-skill-${version}.zip`, out)), 'lucian-icons/');
const stage = new URL('.artifacts/source-package/', root);
await rm(stage, { recursive: true, force: true });
await mkdir(stage, { recursive: true });
for (const item of ['src', 'web', 'scripts', 'skills', 'tests', 'docs', 'LICENSE', 'README.md', 'package.json', 'vercel.json']) await cp(new URL(item, root), new URL(item, stage), { recursive: true });
await rm(new URL('web/downloads/', stage), { recursive: true, force: true });
await zipDirectory(fileURLToPath(stage), fileURLToPath(new URL(`downloads/lucian-icons-source-${version}.zip`, out)), 'lucian-icons/');

// Visual check page: every icon, every state, three sizes
const sizes = [16, 24, 48];
await writeFile(new URL('test.html', out), `<!doctype html><meta charset="utf-8"><title>Lucian Icons ${version} check</title><style>body{margin:24px;font:12px ui-monospace,monospace;background:#f4f2ee;color:#16151b}section{display:flex;align-items:center;gap:18px;padding:8px 0;border-bottom:1px solid #0001}b{width:110px}span{display:inline-flex;gap:10px;align-items:center;padding-right:18px}</style><script type="module" src="./all.js"></script>${defs.map(d => `<section><b>${d.id}</b>${(statesOf(d).length ? statesOf(d) : [null]).map(s => `<span>${sizes.map(z => `<lucian-${d.id} size="${z}"${s ? ` state="${s}"` : ''} animate="none"></lucian-${d.id}>`).join('')}</span>`).join('')}</section>`).join('')}`);

const files = {};
async function manifest(dir, relative = '') {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const rel = relative + e.name;
    if (e.isDirectory()) await manifest(new URL(e.name + '/', dir), rel + '/');
    else { const b = await readFile(new URL(e.name, dir)); files[rel] = { bytes: b.length, sha256: hash(b) }; }
  }
}
await manifest(out);
await writeFile(new URL('manifest.json', out), JSON.stringify({ version, files }, null, 2));
console.log(`Built ${defs.length} icons in ${Object.keys(CATEGORIES).length} categories, ${Object.keys(files).length} files at dist/icons/`);
