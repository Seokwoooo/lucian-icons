import { C, icon, group, fx } from './_kit.js';

// A cover swinging round the spine at a steady angular speed: its width follows cos(angle).
// One continuous curve per swing, so it never slows to a stop halfway.
const coverSwing = (t0, t1, opening, steps = 8) => Array.from({ length: steps + 1 }, (_, i) => {
  const a = ((opening ? i : steps - i) / steps) * Math.PI / 2;
  return { offset: +(t0 + (t1 - t0) * i / steps).toFixed(3), scale: [Math.max(0.02, +Math.cos(a).toFixed(3)), 1] };
});
const DOC = 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z';
const FOLD = 'M14 3v4a1 1 0 0 0 1 1h4';
// Shared transfer behavior for download and upload: idle, measured progress, success, error.
const transfer = dir => ({
  states: { idle: ['대기', 'Idle'], progress: ['진행 중', 'In progress'], success: ['완료', 'Done'], error: ['실패', 'Failed'] },
  progress: { state: 'progress', part: 'bar' },
  poses: {
    '*': { track: { opacity: 0 }, bar: { draw: 0, opacity: 0 }, check: { draw: 0, opacity: 0 }, error: { opacity: 0, scale: 0.6 } },
    progress: { shaft: { opacity: 0 }, track: { opacity: 0.22 }, bar: { opacity: 1 } },
    success: { shaft: { opacity: 0, translate: [0, 4 * dir] }, head: { opacity: 0, translate: [0, 4 * dir] }, check: { draw: 1, opacity: 1 } },
    error: { shaft: { opacity: 0, translate: [0, 4 * dir] }, head: { opacity: 0, translate: [0, 4 * dir] }, error: { opacity: 1, scale: 1 } }
  },
  transitions: {
    '*>success': {
      shaft: { e: 'in', d: 180 }, head: { e: 'in', d: 200 }, bar: { e: 'out', d: 160 }, track: { e: 'out', d: 160 },
      check: { k: [{ draw: 0, opacity: 0 }, { draw: 0.05, opacity: 1, offset: 0.1 }, { draw: 1, opacity: 1 }], d: 380, delay: 170, e: 'out' },
      tray: { k: [{ translate: [0, 0] }, { translate: [0, 1], offset: 0.4 }, { translate: [0, 0] }], d: 360, delay: 120, e: 'out' }
    },
    '*>error': {
      shaft: { e: 'in', d: 180 }, head: { e: 'in', d: 200 }, bar: { e: 'out', d: 160 }, track: { e: 'out', d: 160 },
      error: { e: 'bouncy', delay: 150 },
      '*': { k: [{ translate: [0, 0] }, { translate: [0, 0], offset: 0.3 }, { translate: [-1.2, 0] }, { translate: [1.1, 0] }, { translate: [-0.7, 0] }, { translate: [0.3, 0] }, { translate: [0, 0] }], d: 620, e: 'linear' }
    }
  },
  loops: { progress: { head: { k: [{ translate: [0, 0] }, { translate: [0, 1.1 * dir] }, { translate: [0, 0] }], d: 1000, e: 'inOut' } } },
  effect: {
    shaft: fx.nudge([0, 2.2 * dir], 600), head: fx.nudge([0, 2.2 * dir], 600),
    tray: fx.keys([{ translate: [0, 0] }, { translate: [0, 0], offset: 0.32 }, { translate: [0, 0.8], offset: 0.5 }, { translate: [0, 0] }], 600)
  }
});
const TRAY = '<path data-part="tray" class="s" d="M3.75 14.5v3.25A2.25 2.25 0 0 0 6 20h12a2.25 2.25 0 0 0 2.25-2.25V14.5"/>';
const MARKS = '<path data-part="check" class="a" d="m8 10.25 2.75 2.75L16.5 7.25"/><g data-part="error" class="a"><path d="M12 4.5v5.25"/><path d="M12 13h.01"/></g>';

export default group('files', [
  icon({
    id: 'trash', name: ['쓰레기통', 'Trash'], color: C.red,
    keywords: '삭제 휴지통 지우기 버리기 delete remove bin discard',
    desc: ['오른쪽 경첩을 축으로 뚜껑이 튀어 오르고, 닫힐 때 통이 살짝 눌립니다.', 'The lid springs up on its right hinge and the can settles when it shuts.'],
    states: { closed: ['닫힘', 'Closed'], open: ['열림', 'Open'] },
    svg: '<g data-part="lid"><path d="M3.5 6.5h17"/><path d="M9 6.5V4.75c0-.69.56-1.25 1.25-1.25h3.5c.69 0 1.25.56 1.25 1.25V6.5"/></g><g data-part="can"><path class="s" d="m5.5 6.5 1.07 12.66A2 2 0 0 0 8.56 21h6.88a2 2 0 0 0 1.99-1.84L18.5 6.5"/><path class="a" d="M10 10.5v6M14 10.5v6"/></g>',
    origins: { lid: [20.5, 6.5], can: [12, 21] },
    poses: { open: { lid: { rotate: 18, translate: [0, -1.2] } } },
    motion: { e: 'bouncy' },
    transitions: { 'open>closed': { lid: { e: 'snappy' }, can: fx.keys([{ scale: 1 }, { scale: [1.04, 0.95], offset: 0.45 }, { scale: 1 }], 380, 'out', 90) } },
    effect: { lid: fx.keys([{ rotate: 0, translate: [0, 0] }, { rotate: 11, translate: [0, -0.9], offset: 0.35 }, { rotate: -1.5, translate: [0, 0], offset: 0.72 }, { rotate: 0, translate: [0, 0] }], 640) }
  }),
  icon({
    id: 'folder', name: ['폴더', 'Folder'], color: C.amber,
    keywords: '파일 디렉터리 열기 프로젝트 directory files project open',
    desc: ['열면 앞판이 앞으로 젖혀지고, 안에 든 문서 한 장이 살짝 올라옵니다.', 'Opening tips the front panel forward and the document inside rises a little.'],
    states: { closed: ['닫힘', 'Closed'], open: ['열림', 'Open'] },
    svg: '<path class="s" d="M3 18V6.5a2 2 0 0 1 2-2h3.17a2 2 0 0 1 1.42.59L11 6.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><g data-part="doc"><path class="t" d="M7 13.5V9.75a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3.75z"/><path d="M7 13.5V9.75a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3.75"/><path class="a" d="M9.5 11.25h5"/></g><path data-part="front" class="s" d="M3 10.5h18V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    origins: { front: [3, 20], doc: [12, 13.5] },
    poses: {
      '*': { doc: { opacity: 0, translate: [0, 3] } },
      open: { front: { skewX: -14, scale: [0.86, 0.68] }, doc: { opacity: 1, translate: [0, 0] } }
    },
    motion: { e: 'bouncy' },
    transitions: {
      'closed>open': { doc: fx.keys([{ translate: [0, 3], opacity: 0 }, { translate: [0, 1], opacity: 1, offset: 0.35 }, { translate: [0, -0.5], opacity: 1, offset: 0.72 }, { translate: [0, 0], opacity: 1 }], 520, 'out', 90) },
      'open>closed': { doc: { e: 'in', d: 170 }, front: { e: 'snappy', delay: 60 } }
    },
    effect: {
      front: fx.keys([{ skewX: 0, scale: 1 }, { skewX: -8, scale: [0.97, 0.86], offset: 0.4 }, { skewX: 1.5, scale: [1, 1.02], offset: 0.74 }, { skewX: 0, scale: 1 }], 640),
      doc: fx.keys([{ translate: [0, 0] }, { translate: [0, -1], offset: 0.42 }, { translate: [0, 0.25], offset: 0.74 }, { translate: [0, 0] }], 640, 'inOut', 60)
    }
  }),
  icon({
    id: 'download', name: ['다운로드', 'Download'], color: C.green,
    keywords: '내려받기 저장 진행 완료 실패 download save progress success error',
    desc: ['화살표 몸통이 실제 진행률만큼 차오르고, 완료되면 체크가 그려집니다.', 'The arrow shaft fills with measured progress, then a check draws in on success.'],
    svg: TRAY + '<path data-part="track" d="M12 3.5v10.5"/><path data-part="shaft" d="M12 3.5v10.5"/><path data-part="bar" class="a" d="M12 3.5v10.5"/><path data-part="head" d="m7.75 9.75 4.25 4.25 4.25-4.25"/>' + MARKS,
    origins: { head: [12, 14], check: [12, 10], error: [12, 9], tray: [12, 20] },
    ...transfer(1)
  }),
  icon({
    id: 'upload', name: ['업로드', 'Upload'], color: C.blue,
    keywords: '올리기 전송 진행 완료 실패 upload send progress success error',
    desc: ['화살표가 아래에서 위로 차오르며 올라가고, 끝나면 체크나 경고로 바뀝니다.', 'The arrow fills from the tray upward and resolves to a check or a warning.'],
    svg: TRAY + '<path data-part="track" d="M12 14V3.5"/><path data-part="shaft" d="M12 14V3.5"/><path data-part="bar" class="a" d="M12 14V3.5"/><path data-part="head" d="m7.75 7.75 4.25-4.25 4.25 4.25"/>' + MARKS,
    origins: { head: [12, 3.5], check: [12, 10], error: [12, 9], tray: [12, 20] },
    ...transfer(-1)
  }),
  icon({
    id: 'document', name: ['문서', 'Document'], color: C.blue,
    keywords: '문서 파일 페이지 글 document file page text',
    desc: ['종이가 살짝 들리고, 아래 줄부터 지워졌다가 위에서부터 다시 타이핑됩니다.', 'The page lifts; the lines backspace from the bottom and type back in from the top.'],
    svg: `<path class="s" d="${DOC}"/><path d="${FOLD}"/><path data-part="l1" class="a" d="M8.5 12.5h7"/><path data-part="l2" class="a" d="M8.5 16h4.5"/>`,
    origins: { '*': [12, 21] },
    effect: {
      '*': fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [0, -1.2], rotate: -3, offset: 0.25 }, { translate: [0, -0.7], rotate: 1.5, offset: 0.7 }, { translate: [0, 0], rotate: 0 }], 1000),
      l2: fx.retype([0, 0.2], [0.52, 0.8]),
      l1: fx.retype([0.14, 0.34], [0.38, 0.62])
    }
  }),
  icon({
    id: 'clipboard', name: ['클립보드', 'Clipboard'], color: C.teal,
    keywords: '클립보드 할일 체크 완료 붙여넣기 clipboard task checklist done paste',
    desc: ['집게가 한 번 눌리고, 완료 상태에서는 목록 대신 체크가 그려집니다.', 'The clip clamps down; in the done state a check replaces the list.'],
    states: { idle: ['목록', 'List'], done: ['완료', 'Done'] },
    svg: '<rect class="s" x="5" y="4.5" width="14" height="16.5" rx="2"/><g data-part="clip"><rect class="f" x="8.5" y="2.75" width="7" height="3.5" rx="1"/><rect x="8.5" y="2.75" width="7" height="3.5" rx="1"/></g><path data-part="lines" d="M8.5 11h7M8.5 14.5h7M8.5 18h4"/><path data-part="check" class="a" d="m8.75 14.25 2.25 2.25 4.5-4.75"/>',
    origins: { clip: [12, 4.5], lines: [8.5, 14.5], check: [12, 14] },
    poses: { '*': { check: { draw: 0, opacity: 0 } }, done: { lines: { opacity: 0, scale: [0.6, 1] }, check: { draw: 1, opacity: 1 } } },
    transitions: {
      'idle>done': { lines: { e: 'in', d: 160 }, check: fx.keys([{ draw: 0, opacity: 0 }, { draw: 0.05, opacity: 1, offset: 0.1 }, { draw: 1, opacity: 1 }], 380, 'out', 120), clip: fx.keys([{ translate: [0, 0] }, { translate: [0, 0.8], offset: 0.4 }, { translate: [0, 0] }], 340, 'out') },
      'done>idle': { check: { e: 'out', d: 160 }, lines: { e: 'bouncy', delay: 80 } }
    },
    effect: { clip: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [0, 0.9], scale: [1.08, 0.86], offset: 0.35 }, { translate: [0, 0], scale: 1 }], 460) }
  }),
  icon({
    id: 'archive', name: ['보관함', 'Archive'], color: C.orange,
    keywords: '보관 상자 저장 정리 archive storage box store',
    desc: ['뚜껑이 한쪽으로 들리며 열리고, 닫힐 때 상자가 받아냅니다.', 'The lid lifts on one side; the box catches it as it closes.'],
    states: { closed: ['닫힘', 'Closed'], open: ['열림', 'Open'] },
    svg: '<g data-part="box"><path class="s" d="M4.5 9.5V18a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V9.5"/><path class="a" d="M10 13.5h4"/></g><rect data-part="lid" class="s" x="3" y="4.5" width="18" height="5" rx="1.25"/>',
    origins: { lid: [3, 9.5], box: [12, 20] },
    poses: { open: { lid: { translate: [0, -2], rotate: -14 } } },
    motion: { e: 'bouncy' },
    transitions: { 'open>closed': { lid: { e: 'snappy' }, box: fx.keys([{ scale: 1 }, { scale: [1.04, 0.95], offset: 0.45 }, { scale: 1 }], 360, 'out', 100) } },
    effect: { lid: fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [0, -1.4], rotate: -6, offset: 0.38 }, { translate: [0, 0.2], rotate: 0, offset: 0.72 }, { translate: [0, 0], rotate: 0 }], 600) }
  }),
  icon({
    id: 'inbox', name: ['받은편지함', 'Inbox'], color: C.cyan,
    keywords: '수신함 트레이 받은편지 새메일 inbox tray received mail',
    desc: ['새 문서가 위에서 떨어져 트레이에 꽂히고, 트레이가 무게를 받아 살짝 내려앉습니다.', 'A new document drops in and tucks into the tray, which dips under its weight.'],
    states: { empty: ['비어 있음', 'Empty'], received: ['새 항목', 'New item'] },
    svg: '<path data-part="box" class="s" d="M3 13 5.6 5.9A1.5 1.5 0 0 1 7 5h10a1.5 1.5 0 0 1 1.4.9L21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><g data-part="item"><path class="s" d="M7 13V8.25a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1V13"/><path class="a" d="M9.5 10.25h5"/></g><g data-part="drop"><path class="s" d="M7 13V8.25a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1V13"/><path class="a" d="M9.5 10.25h5"/></g><path data-part="tray" d="M3 13h4.75l1.5 2.5h5.5l1.5-2.5H21"/>',
    origins: { item: [12, 13], drop: [12, 13], box: [12, 20], tray: [12, 13] },
    poses: { '*': { item: { opacity: 0, translate: [0, -9] }, drop: { opacity: 0 } }, received: { item: { opacity: 1, translate: [0, 0] } } },
    transitions: {
      'empty>received': {
        item: fx.keys([{ translate: [0, -9], opacity: 0, scale: 1 }, { translate: [0, -7.5], opacity: 1, scale: 1, offset: 0.14, easing: 'in' }, { translate: [0, 0.7], scale: [1.08, 0.86], offset: 0.56, easing: 'out' }, { translate: [0, -0.9], scale: [0.97, 1.04], offset: 0.76 }, { translate: [0, 0], opacity: 1, scale: 1 }], 700, 'linear'),
        box: fx.keys([{ translate: [0, 0] }, { translate: [0, 0], offset: 0.5 }, { translate: [0, 0.9], offset: 0.62 }, { translate: [0, 0] }], 700, 'out'),
        tray: fx.keys([{ translate: [0, 0] }, { translate: [0, 0], offset: 0.5 }, { translate: [0, 1.1], offset: 0.62 }, { translate: [0, 0] }], 700, 'out')
      },
      'received>empty': { item: fx.keys([{ translate: [0, 0], opacity: 1 }, { translate: [0, -6], opacity: 0 }], 260, 'in') }
    },
    effect: {
      drop: fx.keys([{ translate: [0, -9], opacity: 0, scale: 1 }, { translate: [0, -7.5], opacity: 1, scale: 1, offset: 0.12, easing: 'in' }, { translate: [0, 0.6], scale: [1.08, 0.88], offset: 0.48, easing: 'out' }, { translate: [0, -0.5], scale: 1, offset: 0.64, easing: 'inOut' }, { translate: [0, 2.2], opacity: 0, offset: 0.8, easing: 'in' }, { translate: [0, 2.2], opacity: 0, scale: 1 }], 950, 'linear'),
      item: fx.keys([{ scale: 1 }, { scale: 1, offset: 0.44 }, { scale: [1.05, 0.9], offset: 0.54 }, { scale: 1, offset: 0.72 }, { scale: 1 }], 950, 'inOut'),
      box: fx.keys([{ translate: [0, 0] }, { translate: [0, 0], offset: 0.44 }, { translate: [0, 0.8], offset: 0.55 }, { translate: [0, 0], offset: 0.74 }, { translate: [0, 0] }], 950, 'inOut'),
      tray: fx.keys([{ translate: [0, 0] }, { translate: [0, 0], offset: 0.44 }, { translate: [0, 1], offset: 0.55 }, { translate: [0, 0], offset: 0.74 }, { translate: [0, 0] }], 950, 'inOut')
    }
  }),
  icon({
    id: 'copy', name: ['복사', 'Copy'], color: C.indigo,
    keywords: '복사 사본 복제 붙여넣기 copy duplicate clone paste',
    desc: ['두 장이 벌어졌다 겹치고, 복사됨 상태에서는 앞장에 체크가 그려집니다.', 'The two sheets part and rejoin; the copied state draws a check on the front sheet.'],
    states: { idle: ['대기', 'Idle'], copied: ['복사됨', 'Copied'] },
    svg: '<path data-part="back" d="M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5"/><g data-part="front"><rect class="s" x="8.5" y="8.5" width="11.5" height="11.5" rx="2"/><path data-part="check" class="a" d="m11.5 14.5 2 2 3.5-4"/></g>',
    origins: { front: [14.25, 14.25], check: [14.25, 14.5] },
    poses: { '*': { check: { draw: 0, opacity: 0 } }, copied: { check: { draw: 1, opacity: 1 } } },
    transitions: {
      'idle>copied': { check: fx.keys([{ draw: 0, opacity: 0 }, { draw: 0.05, opacity: 1, offset: 0.1 }, { draw: 1, opacity: 1 }], 360, 'out', 100), front: fx.keys([{ scale: 1 }, { scale: 0.9, offset: 0.3 }, { scale: 1.04, offset: 0.65 }, { scale: 1 }], 460, 'out') },
      'copied>idle': { check: { e: 'out', d: 180 } }
    },
    effect: { front: fx.nudge([1, 1], 560), back: fx.nudge([-0.7, -0.7], 560) }
  }),
  icon({
    id: 'attachment', name: ['첨부', 'Attachment'], color: C.violet,
    keywords: '첨부 클립 파일 붙이기 attachment paperclip attach file',
    desc: ['클립이 위쪽 고리를 축으로 크게 흔들렸다가 제자리에 멈춥니다.', 'The paperclip swings from its top loop and settles back in place.'],
    svg: '<path d="M20 11.25 12.6 18.6a4.6 4.6 0 0 1-6.5-6.5l7.3-7.3a3.05 3.05 0 0 1 4.3 4.3"/><path class="a" d="m17.7 9.1-7.05 7.05a1.5 1.5 0 0 1-2.12-2.12l6.6-6.6"/>',
    origins: { '*': [17, 5.5] },
    effect: { '*': fx.wiggle(16, 900) }
  }),
  icon({
    id: 'link', name: ['링크', 'Link'], color: C.blue,
    keywords: '링크 연결 주소 고리 체인 link url chain connect',
    desc: ['두 고리가 살짝 벌어졌다가 딸깍 다시 맞물립니다. 끊김 상태에서는 고리가 조금 떨어지고 끊긴 자리에 표시가 생깁니다.', 'Two links pull apart a little and snap back; the broken state separates them slightly with break marks.'],
    states: { linked: ['연결됨', 'Linked'], broken: ['끊김', 'Broken'] },
    svg: '<path data-part="a1" d="M10.5 13.5a3.5 3.5 0 0 0 5 0l3-3a3.54 3.54 0 0 0-5-5l-1 1"/><path data-part="a2" class="a" d="M13.5 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.54 3.54 0 0 0 5 5l1-1"/><path data-part="sparks" class="a" d="M8.5 5.5v-2M5.5 8.5h-2M15.5 18.5v2M18.5 15.5h2"/>',
    origins: { a1: [15, 9], a2: [9, 15], sparks: [12, 12] },
    poses: { '*': { sparks: { opacity: 0, scale: 0.5 } }, broken: { a1: { translate: [1, -1] }, a2: { translate: [-1, 1] }, sparks: { opacity: 1, scale: 1 } } },
    motion: { e: 'bouncy' },
    transitions: { 'linked>broken': { sparks: { e: 'bouncy', delay: 120 } }, 'broken>linked': { sparks: { e: 'out', d: 160 } } },
    effect: {
      a1: fx.keys([{ translate: [0, 0] }, { translate: [1.1, -1.1], offset: 0.36 }, { translate: [-0.35, 0.35], offset: 0.62 }, { translate: [0, 0] }], 620),
      a2: fx.keys([{ translate: [0, 0] }, { translate: [-1.1, 1.1], offset: 0.36 }, { translate: [0.35, -0.35], offset: 0.62 }, { translate: [0, 0] }], 620)
    }
  }),
  icon({
    id: 'bookmark', name: ['북마크', 'Bookmark'], color: C.violet,
    keywords: '저장 책갈피 나중에 읽기 bookmark save saved later',
    desc: ['저장하면 리본이 위에서부터 채워지며 한 번 들썩입니다.', 'Saving fills the ribbon from the top with a small lift.'],
    states: { off: ['꺼짐', 'Off'], on: ['저장됨', 'Saved'] },
    svg: '<g data-part="mark"><path data-part="fill" class="f" d="M6 4.75C6 3.78 6.78 3 7.75 3h8.5c.97 0 1.75.78 1.75 1.75V21l-6-4-6 4z"/><path class="s" d="M6 4.75C6 3.78 6.78 3 7.75 3h8.5c.97 0 1.75.78 1.75 1.75V21l-6-4-6 4z"/></g>',
    origins: { fill: [12, 3], mark: [12, 3] },
    poses: { '*': { fill: { scale: [1, 0], opacity: 0 } }, on: { fill: { scale: 1, opacity: 1 } } },
    motion: { e: 'bouncy' },
    transitions: { 'off>on': { mark: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [0, -1.6], scale: [1, 1.05], offset: 0.4 }, { translate: [0, 0], scale: 1 }], 520, 'out') }, 'on>off': { fill: { e: 'smooth', d: 240 } } },
    effect: { mark: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [0, -2.2], scale: [0.95, 1.06], offset: 0.36 }, { translate: [0, 0.6], scale: [1.04, 0.96], offset: 0.64 }, { translate: [0, 0], scale: 1 }], 640) }
  }),
  icon({
    id: 'book', name: ['책', 'Book'], color: C.coral,
    keywords: '책 읽기 독서 페이지 가이드 book read reading pages guide',
    desc: ['오른쪽 페이지 두 장이 들리며 휘어지고, 등을 넘어 왼쪽으로 차례로 넘어갑니다.', 'Two pages lift and curl from the right, then turn over the spine one after another.'],
    svg: '<path class="s" d="M12 6.5C10.5 5.3 8.3 4.75 5.5 4.75H3.75v13h1.75c2.8 0 5 .55 6.5 1.75"/><path class="s" d="M12 6.5c1.5-1.2 3.7-1.75 6.5-1.75h1.75v13H18.5c-2.8 0-5 .55-6.5 1.75z"/><path d="M12 6.5v13"/><path data-part="p1" class="s" d="M12 6.5c1.5-1.2 3.7-1.75 6.5-1.75h1.75v13H18.5c-2.8 0-5 .55-6.5 1.75z"/><path data-part="p2" class="s" d="M12 6.5c1.5-1.2 3.7-1.75 6.5-1.75h1.75v13H18.5c-2.8 0-5 .55-6.5 1.75z"/>',
    origins: { p1: [12, 13], p2: [12, 13] },
    poses: { '*': { p1: { opacity: 0 }, p2: { opacity: 0 } } },
    effect: {
      p1: fx.keys([{ scale: 1, skewY: 0, translate: [0, 0], opacity: 0 }, { scale: [0.97, 1], skewY: -3, translate: [0, -0.2], opacity: 1, offset: 0.08, easing: 'in' }, { scale: [0.04, 1], skewY: -16, translate: [0, -0.8], opacity: 1, offset: 0.48, easing: 'out' }, { scale: [-1, 1], skewY: 0, translate: [0, 0], opacity: 1, offset: 0.84 }, { scale: [-1, 1], skewY: 0, translate: [0, 0], opacity: 0 }], 780, 'linear'),
      p2: fx.keys([{ scale: 1, skewY: 0, translate: [0, 0], opacity: 0 }, { scale: [0.97, 1], skewY: -3, translate: [0, -0.2], opacity: 1, offset: 0.08, easing: 'in' }, { scale: [0.04, 1], skewY: -16, translate: [0, -0.8], opacity: 1, offset: 0.48, easing: 'out' }, { scale: [-1, 1], skewY: 0, translate: [0, 0], opacity: 1, offset: 0.84 }, { scale: [-1, 1], skewY: 0, translate: [0, 0], opacity: 0 }], 780, 'linear', 170)
    }
  }),
  icon({
    id: 'notebook', name: ['노트', 'Notebook'], color: C.lime,
    keywords: '노트 공책 메모 기록 일지 notebook journal notes diary',
    desc: ['표지가 스프링을 축으로 넘어가 사라지면 줄 쳐진 속지에 글줄이 써지고, 잠시 뒤 표지가 같은 속도로 돌아와 덮입니다.', 'The cover swings round the spiral and out of sight, lines are written on the ruled page, then the cover swings back and closes at the same steady pace.'],
    svg: '<rect class="s" x="5.5" y="3" width="14" height="18" rx="2"/><path data-part="lines" class="a" d="M9.5 8.5h6.5M9.5 12h6.5M9.5 15.5h4"/><g data-part="cover"><g data-part="sheet"><rect class="s" x="5.5" y="3" width="14" height="18" rx="2"/><rect x="9.5" y="7" width="6" height="3.25" rx=".75"/></g></g><path class="a" d="M3.5 7.5h3.5M3.5 12h3.5M3.5 16.5h3.5"/>',
    origins: { cover: [5.5, 12] },
    poses: { '*': { lines: { opacity: 0 } } },
    // cover carries the swing, sheet only fades: the cover is gone before it narrows to a sliver, and
    // the ruled lines are drawn only once it is gone and fade before it comes back.
    effect: {
      cover: fx.keys([...coverSwing(0, 0.3, true), ...coverSwing(0.66, 0.94, false), { offset: 1, scale: 1 }], 1600, 'linear'),
      sheet: fx.keys([{ opacity: 0 }, { opacity: 0, offset: 0.22 }, { opacity: -1, offset: 0.26 }, { opacity: -1, offset: 0.69 }, { opacity: 0, offset: 0.735 }, { opacity: 0 }], 1600, 'linear'),
      lines: fx.keys([{ opacity: 0, draw: 1 }, { opacity: 0, draw: 0, offset: 0.3 }, { opacity: 1, draw: 0.02, offset: 0.33 }, { opacity: 1, draw: 1, offset: 0.56 }, { opacity: 1, draw: 1, offset: 0.6 }, { opacity: 0, draw: 1, offset: 0.66 }, { opacity: 0, draw: 1 }], 1600, 'linear')
    }
  }),
  icon({
    id: 'tag', name: ['태그', 'Tag'], color: C.orange,
    keywords: '태그 라벨 가격 분류 tag label price category',
    desc: ['못에 걸린 꼬리표가 줄을 축으로 시계추처럼 흔들리다 멈춥니다.', 'The tag hangs from its string and swings like a pendulum before settling.'],
    svg: '<circle class="k" cx="12" cy="2.5" r="1.2"/><g data-part="tag"><path d="M12 2.5v7.5"/><path class="s" d="M12 6.25 18 10.5v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-9z"/><circle class="f" cx="12" cy="10.25" r="1.35"/><path d="M9 15.25h6M9 18.25h3.5"/></g>',
    origins: { tag: [12, 2.5] },
    effect: { tag: fx.wiggle(14, 1100) }
  }),
  icon({
    id: 'filezip', name: ['압축 파일', 'ZIP file'], color: C.purple,
    keywords: '압축 지퍼 묶음 파일 zip archive compressed bundle',
    desc: ['지퍼 손잡이를 당기면 아래로 내려갔다가 대롱대롱 흔들리며 멈춥니다.', 'A tug pulls the zipper tab down, then it dangles and settles.'],
    svg: `<path class="s" d="${DOC}"/><path d="${FOLD}"/><path class="f" d="M9.6 3.9h1.5v1.2H9.6zM10.9 5.4h1.5v1.2h-1.5zM9.6 6.9h1.5v1.2H9.6zM10.9 8.4h1.5v1.2h-1.5zM9.6 9.9h1.5v1.2H9.6z"/><g data-part="pull"><path class="s" d="M9.5 11.75h3a.75.75 0 0 1 .75.75v4.25a2.25 2.25 0 0 1-4.5 0V12.5a.75.75 0 0 1 .75-.75z"/><path d="M11 14.25v2"/></g>`,
    origins: { pull: [11, 11.75] },
    effect: { pull: fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [0, 1.5], rotate: 0, offset: 0.2 }, { translate: [0, 0], rotate: 16, offset: 0.4 }, { rotate: -11, offset: 0.58 }, { rotate: 6, offset: 0.74 }, { rotate: -2, offset: 0.88 }, { translate: [0, 0], rotate: 0 }], 1050) }
  }),
  icon({
    id: 'receipt', name: ['영수증', 'Receipt'], color: C.teal,
    keywords: '영수증 결제 주문 내역 청구 receipt payment order bill',
    desc: ['영수증이 아래 줄부터 지워지며 내려갔다가, 다시 밀려 나오며 줄이 위에서부터 차례로 찍힙니다.', 'The lines clear from the bottom as the receipt dips, then it feeds out again and prints each line from the top.'],
    svg: '<g data-part="paper"><path class="s" d="M5.5 3h13v18l-2.17-1.5L14.17 21 12 19.5 9.83 21l-2.16-1.5L5.5 21z"/><path data-part="l1" class="a" d="M8.75 8h6.5"/><path data-part="l2" d="M8.75 11.5h6.5"/><path data-part="l3" d="M8.75 15h3.5"/></g>',
    origins: { paper: [12, 3] },
    effect: {
      paper: fx.keys([{ translate: [0, 0] }, { translate: [0, 1.4], offset: 0.24 }, { translate: [0, 1.4], offset: 0.32 }, { translate: [0, -0.8], offset: 0.8 }, { translate: [0, 0] }], 1100),
      l3: fx.retype([0, 0.12], [0.66, 0.82], 1100),
      l2: fx.retype([0.06, 0.18], [0.5, 0.66], 1100),
      l1: fx.retype([0.12, 0.24], [0.34, 0.5], 1100)
    }
  }),
  icon({
    id: 'cloud', name: ['클라우드', 'Cloud'], color: C.cyan,
    keywords: '클라우드 동기화 저장소 백업 cloud sync storage backup',
    desc: ['동기화 중에는 화살표가 계속 떠오르고, 끝나면 체크가 그려집니다.', 'While syncing an arrow keeps rising; a check draws in when finished.'],
    states: { idle: ['대기', 'Idle'], syncing: ['동기화 중', 'Syncing'], synced: ['완료', 'Synced'] },
    svg: '<path class="s" d="M6.5 19A4.5 4.5 0 0 1 6 10.03a6 6 0 0 1 11.6-.93A5 5 0 0 1 17.5 19z"/><path data-part="arrow" class="a" d="M12 17v-5m-2.25 2.25L12 12l2.25 2.25"/><path data-part="check" class="a" d="m9.75 14.6 1.6 1.6 3-3.1"/>',
    origins: { '*': [12, 14] },
    poses: { '*': { arrow: { opacity: 0, translate: [0, 1.5] }, check: { draw: 0, opacity: 0 } }, syncing: { arrow: { opacity: 1, translate: [0, 0] } }, synced: { check: { draw: 1, opacity: 1 } } },
    transitions: { '*>synced': { arrow: { e: 'in', d: 160 }, check: fx.keys([{ draw: 0, opacity: 0 }, { draw: 0.05, opacity: 1, offset: 0.1 }, { draw: 1, opacity: 1 }], 380, 'out', 120) } },
    loops: { syncing: { arrow: fx.keys([{ translate: [0, 0], opacity: 0 }, { translate: [0, -1.6], opacity: -1, offset: 0.55 }, { translate: [0, 1.6], opacity: -1, offset: 0.56 }, { translate: [0, 0], opacity: 0 }], 1200, 'inOut') } },
    effect: { '*': fx.keys([{ translate: [0, 0] }, { translate: [1, -0.4], offset: 0.4 }, { translate: [-0.4, 0.1], offset: 0.75 }, { translate: [0, 0] }], 820) }
  }),
  icon({
    id: 'save', name: ['저장', 'Save'], color: C.indigo,
    keywords: '저장 디스크 플로피 보관 save disk floppy store',
    desc: ['화살표가 디스크 라벨 안으로 쏙 들어가며 디스크가 살짝 눌리고, 저장됨 상태에서는 라벨에 체크가 그려집니다.', 'An arrow drops into the disk label as the disk dips; the saved state draws a check on the label.'],
    states: { idle: ['대기', 'Idle'], saved: ['저장됨', 'Saved'] },
    svg: '<path class="s" d="M5 3.5h11.5l4 4V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5z"/><path d="M7.5 3.5v4a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4"/><path class="a" d="M13 5.25v1.5"/><path d="M7 20.5V14a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6.5"/><path data-part="arrow" class="a" d="M12 14.75v3.75M10.25 16.75 12 18.5l1.75-1.75"/><path data-part="check" class="a" d="m9.75 16.75 1.5 1.5 3-3"/>',
    origins: { check: [12, 16.75], '*': [12, 20.5] },
    poses: { '*': { check: { draw: 0, opacity: 0 }, arrow: { opacity: 0 } }, saved: { check: { draw: 1, opacity: 1 } } },
    transitions: {
      'idle>saved': {
        arrow: fx.keys([{ opacity: 0, translate: [0, -2.5] }, { opacity: 1, translate: [0, -0.9], offset: 0.35 }, { opacity: 1, translate: [0, 0], offset: 0.6 }, { opacity: 0, translate: [0, 0.6] }], 520, 'inOut'),
        '*': fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [0, 0], scale: 1, offset: 0.45 }, { translate: [0, 0.35], scale: [1.02, 0.97], offset: 0.62 }, { translate: [0, 0], scale: 1 }], 640, 'inOut'),
        check: fx.keys([{ draw: 0, opacity: 0 }, { draw: 0.05, opacity: 1, offset: 0.1 }, { draw: 1, opacity: 1 }], 380, 'out', 460)
      },
      'saved>idle': { check: { e: 'out', d: 160 } }
    },
    effect: {
      arrow: fx.keys([{ opacity: 0, translate: [0, -2.5] }, { opacity: 1, translate: [0, -0.9], offset: 0.3 }, { opacity: 1, translate: [0, 0], offset: 0.55 }, { opacity: 0, translate: [0, 0.6], offset: 0.75 }, { opacity: 0, translate: [0, 0] }], 820, 'inOut'),
      check: fx.keys([{ opacity: 0 }, { opacity: -1, offset: 0.08 }, { opacity: -1, offset: 0.72 }, { opacity: 0 }], 820, 'linear'),
      '*': fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [0, 0], scale: 1, offset: 0.42 }, { translate: [0, 0.35], scale: [1.02, 0.97], offset: 0.56 }, { translate: [0, 0], scale: 1, offset: 0.78 }, { translate: [0, 0], scale: 1 }], 820, 'inOut')
    }
  }),
  icon({
    id: 'newspaper', name: ['뉴스', 'Newspaper'], color: C.coral,
    keywords: '뉴스 신문 기사 소식 news newspaper article press',
    desc: ['신문이 펄럭이며 들리고, 사진이 바뀌듯 튀고 기사 줄이 다시 쓰입니다.', 'The paper lifts with a flutter, the photo pops, and the article lines are rewritten.'],
    svg: '<path class="s" d="M7 5a1.5 1.5 0 0 1 1.5-1.5H19A1.5 1.5 0 0 1 20.5 5v13.5a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2V10A1.5 1.5 0 0 1 5 8.5h2z"/><path d="M7 8.5v10a2 2 0 0 1-2 2"/><rect data-part="photo" class="f" x="10" y="6.5" width="7.5" height="4" rx=".75"/><path data-part="l1" d="M10 14h7.5"/><path data-part="l2" d="M10 17h5"/>',
    origins: { '*': [12, 20.5], photo: [13.75, 8.5] },
    effect: {
      '*': fx.keys([{ rotate: 0, translate: [0, 0] }, { rotate: -5, translate: [0, -1], offset: 0.3 }, { rotate: 2, translate: [0, -0.4], offset: 0.62 }, { rotate: 0, translate: [0, 0] }], 1000),
      photo: fx.keys([{ scale: 1 }, { scale: 1, offset: 0.12 }, { scale: 0.6, offset: 0.3 }, { scale: 1.12, offset: 0.5 }, { scale: 1 }], 1000),
      l2: fx.retype([0.05, 0.22], [0.5, 0.78]),
      l1: fx.retype([0.15, 0.34], [0.36, 0.6])
    }
  }),
  icon({
    id: 'stickynote', name: ['메모지', 'Sticky note'], color: C.yellow,
    keywords: '메모 포스트잇 노트 기억 sticky note memo reminder',
    desc: ['메모지가 바람에 날리듯 한 번 흔들립니다.', 'The note flutters once as if caught by a breeze.'],
    svg: '<path class="s" d="M5 3.5h14A1.5 1.5 0 0 1 20.5 5v9.5l-6 6H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5z"/><path data-part="corner" class="s" d="M14.5 20.5V16a1.5 1.5 0 0 1 1.5-1.5h4.5"/><path class="a" d="M7.5 8.5h9M7.5 12h5.5"/>',
    origins: { '*': [12, 3.5], corner: [20.5, 20.5] },
    effect: { '*': fx.wiggle(6, 760), corner: fx.pop(1.18, 520, 60) }
  }),
  icon({
    id: 'history', name: ['기록', 'History'], color: C.violet,
    keywords: '기록 이력 최근 되돌아가기 history recent log timeline',
    desc: ['시곗바늘이 거꾸로 한 바퀴 돌며 지난 시간으로 감깁니다.', 'The hands rewind one full turn.'],
    svg: '<path class="t" d="M12 20.25a8.25 8.25 0 1 0 0-16.5 8.25 8.25 0 0 0 0 16.5z"/><path data-part="ring" d="M3.75 12a8.25 8.25 0 1 0 2.4-5.85L3.75 8.5"/><path data-part="head" d="M3.75 4.25V8.5H8"/><path data-part="hands" class="a" d="M12 7.5V12l3 2"/>',
    origins: { hands: [12, 12], ring: [12, 12] },
    effect: { hands: fx.spin(-360, 820), ring: fx.turn(-18, 820) }
  }),
  icon({
    id: 'qrcode', name: ['QR 코드', 'QR code'], color: C.green,
    keywords: 'QR 코드 스캔 링크 결제 qr code scan link pay',
    desc: ['빛줄기가 코드를 위에서 아래로 훑습니다.', 'A scan line sweeps the code from top to bottom.'],
    svg: '<rect class="s" x="3.5" y="3.5" width="6.5" height="6.5" rx="1.5"/><rect class="s" x="14" y="3.5" width="6.5" height="6.5" rx="1.5"/><rect class="s" x="3.5" y="14" width="6.5" height="6.5" rx="1.5"/><path class="a" d="M6.75 6.75h.01M17.25 6.75h.01M6.75 17.25h.01"/><path d="M14 14v2.5M14 20.5h2.5M17.5 14h3v3M20.5 20.5v.01M17.5 17.5v3"/><path data-part="scan" class="a" d="M1.5 12h21"/>',
    poses: { '*': { scan: { opacity: 0 } } },
    effect: { scan: fx.keys([{ translate: [0, -9.5], opacity: 0 }, { translate: [0, -8.5], opacity: 1, offset: 0.1 }, { translate: [0, 8.5], opacity: 1, offset: 0.88 }, { translate: [0, 9.5], opacity: 0 }], 980, 'inOut') }
  }),
  icon({
    id: 'signature', name: ['서명', 'Signature'], color: C.blue,
    keywords: '서명 사인 계약 승인 signature sign contract approve',
    desc: ['서명이 한 획으로 다시 써집니다.', 'The signature writes itself again in one stroke.'],
    svg: '<path d="M3.5 20.5h17"/><path data-part="sig" class="a" d="M6.5 16c1.4-2.6 2.4-8.5 4.3-8.5 1.7 0-.7 7 1.3 7 1.2 0 1.6-2.6 2.9-2.6.9 0 .7 1.9 1.6 1.9.6 0 1-.5 1.4-.9"/>',
    effect: { sig: fx.redraw(980, 0) }
  })
]);
