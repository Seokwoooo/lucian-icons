import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import defs, { CATEGORIES } from '../src/icons/index.js';
import { statesOf } from '../src/runtime/icon.js';

const migration = await readFile(new URL('../skills/lucian-icons/references/migration.md', import.meta.url), 'utf8');
const legacy = [...migration.matchAll(/^\| ([a-z]+) \|/gm)].map(m => m[1]);

test('212 original definitions: 112 from 1.x plus 100 new, unique and bilingual', () => {
  assert.equal(defs.length, 212);
  assert.equal(legacy.length, 112);
  const ids = new Set(defs.map(d => d.id));
  assert.equal(ids.size, 212, 'unique ids');
  assert.equal(new Set(defs.map(d => d.svg)).size, 212, 'unique drawings');
  for (const id of legacy) assert.ok(ids.has(id), `1.x icon kept: ${id}`);
  for (const d of defs) {
    assert.match(d.id, /^[a-z]+$/);
    assert.ok(d.name.ko && d.name.en && d.description.ko && d.description.en, d.id);
    assert.ok(d.keywords.length >= 3, d.id);
    assert.ok(CATEGORIES[d.category], `${d.id}: category`);
    assert.match(d.color, /^#[\da-f]{6}$/i, d.id);
    assert.ok(d.effect && Object.keys(d.effect).length, `${d.id}: hover effect`);
  }
  assert.equal(Object.keys(CATEGORIES).length, 13);
  for (const c of Object.keys(CATEGORIES)) assert.ok(defs.some(d => d.category === c), `category ${c} used`);
});

test('drawings are safe and every animated part exists', () => {
  for (const d of defs) {
    assert.doesNotMatch(d.svg, /<script|\bid=|\bon\w+=|https?:|url\(/i, d.id);
    assert.ok(d.svg.length < 6000, `${d.id}: compact svg`);
    const parts = new Set([...d.svg.matchAll(/data-part="([\w-]+)"/g)].map(m => m[1]).concat('*'));
    const refs = [d.poses, d.transitions, d.loops].flatMap(g => Object.values(g || {}).flatMap(Object.keys)).concat(Object.keys(d.effect || {}), Object.keys(d.origins || {}));
    for (const r of refs) assert.ok(parts.has(r), `${d.id}: unknown part ${r}`);
  }
});

test('states are real app states with labels in both languages', () => {
  const stateful = defs.filter(d => statesOf(d).length);
  assert.equal(stateful.length, 53);
  for (const d of stateful) {
    const states = statesOf(d);
    assert.ok(states.length >= 2 && states.includes(d.defaultState), d.id);
    for (const s of Object.keys(d.poses || {})) assert.ok(s === '*' || states.includes(s), `${d.id}: pose ${s}`);
    for (const s of Object.keys(d.loops || {})) assert.ok(states.includes(s), `${d.id}: loop ${s}`);
    for (const l of ['ko', 'en']) for (const s of states) assert.ok(d.stateLabels?.[l]?.[s], `${d.id}: ${l} ${s}`);
  }
  for (const d of defs.filter(d => d.progress)) assert.ok(statesOf(d).includes(d.progress.state), `${d.id}: progress state`);
  assert.deepEqual(defs.filter(d => d.progress).map(d => d.id).sort(), ['battery', 'download', 'upload']);
  assert.deepEqual(statesOf(defs.find(d => d.id === 'bell')), ['idle', 'unread']);
});
