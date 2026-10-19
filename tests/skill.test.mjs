import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

const cli = 'skills/lucian-icons/scripts/lucian-icons.mjs';
const run = (...args) => JSON.parse(execFileSync('node', [cli, ...args], { encoding: 'utf8' }));

test('skill searches in Korean and English', () => {
  assert.equal(run('search', '삭제')[0].id, 'trash');
  assert.equal(run('search', 'notification')[0].id, 'bell');
  const hit = run('search', '다운로드').find(x => x.id === 'download');
  assert.deepEqual(hit.states, ['idle', 'progress', 'success', 'error']);
  assert.ok(hit.color && hit.category);
  assert.equal(run('list').length, 211);
});

test('skill search ranks exact ids and names above partial matches', () => {
  const top = q => run('search', ...q.split(' '))[0].id;
  assert.equal(top('close'), 'close', 'not menu, which lists close as a keyword');
  assert.equal(top('arrow'), 'arrow', 'not filter (narrow)');
  assert.equal(top('bell'), 'bell', 'not dumbbell');
  assert.equal(top('lock'), 'lock', 'not clock');
  assert.equal(top('닫기'), 'close');
  assert.equal(top('자물쇠'), 'lock');
  assert.equal(top('bell notification'), 'bell');
  assert.equal(run('search', 'xyzzy').length, 0);
});

test('skill resolves gallery numbers', () => {
  const heart = run('search', 'heart')[0];
  for (const n of [String(heart.order), `#${heart.order}`, `${heart.order}번`, String(heart.order).padStart(3, '0')]) {
    assert.deepEqual(run('get', n).icons.map(i => i.id), ['heart'], n);
    assert.equal(run('search', n)[0].id, 'heart', n);
  }
  assert.equal(run('get', '1').icons[0].order, 1);
  assert.deepEqual(run('get', String(heart.order), 'heart').icons.map(i => i.id), ['heart'], 'a number and its id are one icon');
  assert.throws(() => execFileSync('node', [cli, 'get', '999'], { stdio: 'pipe' }), /gallery numbers run from 1 to 211/);
});

test('skill retrieves only the selected icons with version and integrity', () => {
  const out = run('get', 'download', 'heart');
  assert.equal(out.version, '2.0.12');
  assert.deepEqual(out.icons.map(i => i.id), ['download', 'heart']);
  assert.match(out.runtime, /export function defineIcon/);
  assert.ok(out.icons.every(i => !i.code.includes('lucian-folder')));
  assert.throws(() => execFileSync('node', [cli, 'get', 'nosuchicon'], { stdio: 'pipe' }));
});

test('skill copies just the needed files, adds to the same directory and never overwrites', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'lucian-skill-'));
  try {
    execFileSync('node', [cli, 'get', 'download', '--out', dir], { encoding: 'utf8' });
    assert.deepEqual((await readdir(dir)).sort(), ['LICENSE', 'download.js', 'runtime.js']);
    assert.match(await readFile(path.join(dir, 'download.js'), 'utf8'), /from '\.\/runtime\.js'/);
    await writeFile(path.join(dir, 'heart.js'), 'mine');
    assert.throws(() => execFileSync('node', [cli, 'get', 'heart', '--out', dir], { stdio: 'pipe' }));
    assert.equal(await readFile(path.join(dir, 'heart.js'), 'utf8'), 'mine', 'user file untouched');
    const added = run('get', 'bell', 'download', '--out', dir);
    assert.deepEqual(added.written.map(f => path.basename(f)), ['bell.js'], 'only the new icon is written');
    assert.deepEqual(added.unchanged.map(f => path.basename(f)).sort(), ['LICENSE', 'download.js', 'runtime.js']);
    assert.throws(() => execFileSync('node', [cli, 'get', 'star', 'heart', '--out', dir], { stdio: 'pipe' }));
    assert.ok(!(await readdir(dir)).includes('star.js'), 'a conflict writes nothing');
    await writeFile(path.join(dir, 'runtime.js'), "export const VERSION = '2.0.1';");
    assert.throws(() => execFileSync('node', [cli, 'get', 'lock', '--out', dir], { stdio: 'pipe' }), /existing runtime is v2\.0\.1/);
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test('skill docs describe the v2 API', async () => {
  const skill = await readFile('skills/lucian-icons/SKILL.md', 'utf8');
  const porting = await readFile('skills/lucian-icons/references/porting.md', 'utf8');
  const install = await readFile('skills/lucian-icons/INSTALL.md', 'utf8');
  assert.match(skill, /version 2\.0\.12/);
  assert.match(install, /lucian-icons-skill-2\.0\.12\.zip/);
  for (const word of ['tone', 'accent', 'weight', 'animate', 'play()', 'next()', '--li-accent']) assert.ok(porting.includes(word), word);
  assert.doesNotMatch(porting + skill, /\bink\b.*\bpaper\b.*six-digit/);
});
