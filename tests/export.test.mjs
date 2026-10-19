import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import authored from '../src/icons/index.js';
import { staticSVG, normalize, poseOf } from '../src/runtime/icon.js';
import { usageHTML, usageReact, standaloneHTML, applicationPrompt } from '../src/export.js';

const { version } = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const get = id => ({ ...authored.find(d => d.id === id), version });
const trash = get('trash'), download = get('download'), sparkle = get('sparkle');

test('normalize clamps values and rejects unsafe colors', () => {
  const o = normalize(trash, { size: 'bad', accent: '"><script>', state: 'nope', weight: 9, tone: 'neon' });
  assert.deepEqual([o.size, o.accent, o.state, o.weight, o.tone], [24, null, 'closed', 3, 'color']);
  assert.equal(normalize(trash, { size: 4000 }).size, 512);
  assert.equal(normalize(trash, { accent: 'oklch(70% 0.1 200)' }).accent, 'oklch(70% 0.1 200)');
  assert.equal(normalize(download, { progress: 140 }).progress, 100);
  assert.equal(normalize(get('battery')).progress, 70, 'battery default level');
});

test('static SVG freezes the chosen state and color without CSS variables or IDs', () => {
  const svg = staticSVG(trash, { state: 'open', accent: '#123456', size: 32 });
  assert.match(svg, /width="32"/);
  assert.match(svg, /#123456/);
  assert.match(svg, /rotate\(18\)/, 'lid open');
  assert.doesNotMatch(svg, /var\(--|\bid=|<script/);
  assert.doesNotMatch(staticSVG(trash), /rotate\(/, 'closed lid has no rotation');
  const line = staticSVG(trash, { tone: 'line' });
  assert.doesNotMatch(line, new RegExp(trash.color, 'i'), 'line tone drops the icon color');
  assert.ok(Object.keys(poseOf(trash, 'open')).length > 0);
});

test('error marks stay red in color tone and follow the line color in line tone', () => {
  for (const [id, state] of [['download', 'error'], ['upload', 'error'], ['shield', 'alert']]) {
    const def = get(id);
    assert.match(def.svg, new RegExp(`data-part="${state}" class="e"`), `${id}: ${state} mark uses the error class`);
    assert.match(staticSVG(def, { state, accent: '#123456' }), /stroke="#F05465"/, `${id}: red even with an accent`);
    assert.doesNotMatch(staticSVG(def, { state, tone: 'line' }), /#F05465/, `${id}: line tone stays monochrome`);
    assert.doesNotMatch(staticSVG(def, { state }), /class="e"/, `${id}: class resolved in static SVG`);
  }
});

test('usage snippets write only non-default attributes and real-state wiring', () => {
  const html = usageHTML(download, { state: 'progress', progress: 40 }, 'en');
  assert.match(html, /modules\/download\.js/);
  assert.match(html, /<lucian-download state="progress" progress="40">/);
  assert.match(html, /setProgress/);
  assert.doesNotMatch(usageHTML(sparkle, {}, 'en'), /setState/, 'stateless icons get no state wiring');
  assert.match(usageReact(trash, {}, 'ko'), /<lucian-trash state=\{state\} \/>/);
});

test('standalone HTML is self-contained and labels demo wiring', async () => {
  const html = await standaloneHTML(trash, { size: 32, state: 'open', accent: '#445566' }, 'en');
  assert.match(html, /^<!doctype html>/);
  assert.match(html, /state="open"/);
  assert.match(html, /#445566/);
  assert.doesNotMatch(html, /\bimport\b[^(]/);
  assert.doesNotMatch(html, /src="http/);
  assert.match(html, /Demo wiring only/);
});

test('application prompt carries the module source and integration rules', async () => {
  const ko = await applicationPrompt(download, {}, 'ko');
  assert.match(ko, /--- runtime\.js ---/);
  assert.match(ko, /--- download\.js ---/);
  assert.match(ko, /클릭이 곧 성공은 아닙니다/);
  assert.match(ko, /setProgress/);
  const en = await applicationPrompt(sparkle, {}, 'en');
  assert.match(en, /No state wiring is needed/);
});
