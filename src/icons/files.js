import { C, icon, group, fx } from './_kit.js';

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
    desc: ['앞판이 앞으로 기울며 열리고, 스프링처럼 살짝 튕긴 뒤 멈춥니다.', 'The front panel tips forward with a small spring as the folder opens.'],
    states: { closed: ['닫힘', 'Closed'], open: ['열림', 'Open'] },
    svg: '<path class="t" d="M3 18V6.5a2 2 0 0 1 2-2h3.17a2 2 0 0 1 1.42.59L11 6.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 18V6.5a2 2 0 0 1 2-2h3.17a2 2 0 0 1 1.42.59L11 6.5h8a2 2 0 0 1 2 2v2"/><path data-part="front" class="s" d="M3 10.5h18V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    origins: { front: [3, 20] },
    poses: { open: { front: { skewX: -16, scale: [0.88, 0.84] } } },
    motion: { e: 'bouncy' },
    transitions: { 'open>closed': { front: { e: 'snappy' } } },
    effect: { front: fx.keys([{ skewX: 0, scale: 1 }, { skewX: -7, scale: [0.96, 0.93], offset: 0.4 }, { skewX: 0, scale: 1 }], 560) }
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
    desc: ['종이가 살짝 들리고 본문 줄이 차례로 다시 쓰입니다.', 'The page lifts slightly and its lines write themselves in again.'],
    svg: `<path class="s" d="${DOC}"/><path d="${FOLD}"/><path data-part="l1" class="a" d="M8.5 12.5h7"/><path data-part="l2" class="a" d="M8.5 16h4.5"/>`,
    effect: { '*': fx.nudge([0, -1], 560), l1: fx.redraw(420, 80), l2: fx.redraw(380, 220) }
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
    desc: ['새 항목이 위에서 떨어져 트레이에 담깁니다.', 'A new item drops in and lands in the tray.'],
    states: { empty: ['비어 있음', 'Empty'], received: ['새 항목', 'New item'] },
    svg: '<path class="s" d="M3 13 5.6 5.9A1.5 1.5 0 0 1 7 5h10a1.5 1.5 0 0 1 1.4.9L21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><rect data-part="item" class="f" x="8.5" y="7.5" width="7" height="4" rx="1"/><path data-part="tray" d="M3 13h4.75l1.5 2.5h5.5l1.5-2.5H21"/>',
    origins: { item: [12, 11.5], tray: [12, 15] },
    poses: { '*': { item: { opacity: 0, translate: [0, -6], scale: 0.7 } }, received: { item: { opacity: 1, translate: [0, 0], scale: 1 } } },
    transitions: {
      'empty>received': { item: { e: 'bouncy' }, tray: fx.keys([{ translate: [0, 0] }, { translate: [0, 0], offset: 0.35 }, { translate: [0, 0.9], offset: 0.55 }, { translate: [0, 0] }], 480, 'out') },
      'received>empty': { item: { e: 'in', d: 220 } }
    },
    effect: { tray: fx.nudge([0, 1], 480), item: fx.nudge([0, -1.2], 480) }
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
    desc: ['클립이 꽂힌 자리를 축으로 살짝 흔들립니다.', 'The paperclip rocks around the point where it grips.'],
    svg: '<path d="M20 11.25 12.6 18.6a4.6 4.6 0 0 1-6.5-6.5l7.3-7.3a3.05 3.05 0 0 1 4.3 4.3"/><path class="a" d="m17.7 9.1-7.05 7.05a1.5 1.5 0 0 1-2.12-2.12l6.6-6.6"/>',
    origins: { '*': [16, 6] },
    effect: { '*': fx.wiggle(9, 720) }
  }),
  icon({
    id: 'link', name: ['링크', 'Link'], color: C.blue,
    keywords: '링크 연결 주소 고리 체인 link url chain connect',
    desc: ['두 고리가 벌어졌다가 딸깍 다시 맞물립니다. 끊김 상태도 있습니다.', 'Two links pull apart and snap back together; a broken state is included.'],
    states: { linked: ['연결됨', 'Linked'], broken: ['끊김', 'Broken'] },
    svg: '<path data-part="a1" d="M10.5 13.5a3.5 3.5 0 0 0 5 0l3-3a3.54 3.54 0 0 0-5-5l-1 1"/><path data-part="a2" class="a" d="M13.5 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.54 3.54 0 0 0 5 5l1-1"/>',
    poses: { broken: { a1: { translate: [1.4, -1.4], rotate: 8 }, a2: { translate: [-1.4, 1.4], rotate: 8 } } },
    origins: { a1: [15, 9], a2: [9, 15] },
    motion: { e: 'bouncy' },
    effect: { a1: fx.nudge([0.9, -0.9], 520), a2: fx.nudge([-0.9, 0.9], 520) }
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
    transitions: { 'off>on': { mark: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [0, -1.2], scale: [1, 1.04], offset: 0.4 }, { translate: [0, 0], scale: 1 }], 520, 'out') }, 'on>off': { fill: { e: 'smooth', d: 240 } } },
    effect: { mark: fx.keys([{ scale: 1 }, { scale: [1, 1.07], offset: 0.35 }, { scale: [1, 0.97], offset: 0.7 }, { scale: 1 }], 560) }
  }),
  icon({
    id: 'book', name: ['책', 'Book'], color: C.coral,
    keywords: '책 읽기 독서 페이지 가이드 book read reading pages guide',
    desc: ['오른쪽 페이지 한 장이 등을 넘어 왼쪽으로 넘어갑니다.', 'A page lifts from the right and turns over the spine.'],
    svg: '<path class="s" d="M12 6.5C10.5 5.3 8.3 4.75 5.5 4.75H3.75v13h1.75c2.8 0 5 .55 6.5 1.75"/><path class="s" d="M12 6.5c1.5-1.2 3.7-1.75 6.5-1.75h1.75v13H18.5c-2.8 0-5 .55-6.5 1.75z"/><path d="M12 6.5v13"/><path data-part="page" class="a" d="M12 6.5c1.5-1.2 3.7-1.75 6.5-1.75h1.75v13H18.5c-2.8 0-5 .55-6.5 1.75"/>',
    origins: { page: [12, 12] },
    poses: { '*': { page: { opacity: 0 } } },
    effect: { page: fx.keys([{ scale: 1, opacity: 0 }, { scale: [0.98, 1], opacity: 1, offset: 0.08 }, { scale: [0.1, 1], opacity: 1, offset: 0.5, easing: 'in' }, { scale: [-1, 1], opacity: 1, offset: 0.9, easing: 'out' }, { scale: [-1, 1], opacity: 0 }], 820, 'linear') }
  }),
  icon({
    id: 'notebook', name: ['노트', 'Notebook'], color: C.lime,
    keywords: '노트 공책 메모 기록 일지 notebook journal notes diary',
    desc: ['표지가 스프링 쪽으로 살짝 접혔다 돌아옵니다.', 'The cover flexes toward the spiral and settles back.'],
    svg: '<g data-part="cover"><rect class="s" x="5.5" y="3" width="14" height="18" rx="2"/><rect x="9.5" y="7" width="6" height="3.25" rx=".75"/></g><path class="a" d="M3.5 7.5h3.5M3.5 12h3.5M3.5 16.5h3.5"/>',
    origins: { cover: [5.5, 12] },
    effect: { cover: fx.keys([{ scale: 1 }, { scale: [0.62, 1], offset: 0.42 }, { scale: [1.04, 1], offset: 0.78 }, { scale: 1 }], 640) }
  }),
  icon({
    id: 'tag', name: ['태그', 'Tag'], color: C.orange,
    keywords: '태그 라벨 가격 분류 tag label price category',
    desc: ['구멍을 축으로 꼬리표가 시계추처럼 흔들립니다.', 'The tag swings like a pendulum from its hole.'],
    svg: '<path class="s" d="M3.5 11.6V5A1.5 1.5 0 0 1 5 3.5h6.6a1.5 1.5 0 0 1 1.06.44l7.9 7.9a1.5 1.5 0 0 1 0 2.12l-6.6 6.6a1.5 1.5 0 0 1-2.12 0l-7.9-7.9a1.5 1.5 0 0 1-.44-1.06z"/><circle class="f" cx="8" cy="8" r="1.6"/>',
    origins: { '*': [8, 8] },
    effect: { '*': fx.wiggle(14, 820) }
  }),
  icon({
    id: 'filezip', name: ['압축 파일', 'ZIP file'], color: C.purple,
    keywords: '압축 지퍼 묶음 파일 zip archive compressed bundle',
    desc: ['지퍼 손잡이가 내려갔다가 다시 올라와 잠깁니다.', 'The zipper pull slides down and back up.'],
    svg: `<path class="s" d="${DOC}"/><path d="${FOLD}"/><path class="a" d="M10.5 4.5H12M12 7h1.5M10.5 9.5H12M12 12h1.5"/><rect data-part="pull" x="10" y="14" width="4" height="4.5" rx="1"/>`,
    origins: { pull: [12, 14] },
    effect: { pull: fx.keys([{ translate: [0, 0] }, { translate: [0, 1.6], offset: 0.4 }, { translate: [0, -0.3], offset: 0.75 }, { translate: [0, 0] }], 640) }
  }),
  icon({
    id: 'receipt', name: ['영수증', 'Receipt'], color: C.teal,
    keywords: '영수증 결제 주문 내역 청구 receipt payment order bill',
    desc: ['영수증이 한 번 출력되듯 튀어 오르고 항목이 다시 찍힙니다.', 'The receipt hops as if printed and its lines print again.'],
    svg: '<path class="s" d="M5.5 3h13v18l-2.17-1.5L14.17 21 12 19.5 9.83 21l-2.16-1.5L5.5 21z"/><path data-part="l1" class="a" d="M8.75 8h6.5"/><path data-part="l2" d="M8.75 11.5h6.5"/><path data-part="l3" d="M8.75 15h3.5"/>',
    effect: { '*': fx.hop(1.4, 560), l1: fx.redraw(320, 120), l2: fx.redraw(320, 200), l3: fx.redraw(280, 280) }
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
    desc: ['셔터가 옆으로 밀렸다 돌아오고, 저장됨 상태에서는 라벨에 체크가 그려집니다.', 'The shutter slides and returns; the saved state draws a check on the label.'],
    states: { idle: ['대기', 'Idle'], saved: ['저장됨', 'Saved'] },
    svg: '<path class="s" d="M5 3.5h11.5l4 4V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5z"/><g data-part="shutter"><path d="M7.5 3.5v4a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4"/><path class="a" d="M13 5.25v1.5"/></g><path d="M7 20.5V14a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6.5"/><path data-part="check" class="a" d="m9.75 16.75 1.5 1.5 3-3"/>',
    origins: { check: [12, 16.75] },
    poses: { '*': { check: { draw: 0, opacity: 0 } }, saved: { check: { draw: 1, opacity: 1 } } },
    transitions: { 'idle>saved': { check: fx.keys([{ draw: 0, opacity: 0 }, { draw: 0.05, opacity: 1, offset: 0.1 }, { draw: 1, opacity: 1 }], 380, 'out', 160), shutter: fx.nudge([2, 0], 420) }, 'saved>idle': { check: { e: 'out', d: 160 } } },
    effect: { shutter: fx.nudge([2, 0], 560) }
  }),
  icon({
    id: 'newspaper', name: ['뉴스', 'Newspaper'], color: C.coral,
    keywords: '뉴스 신문 기사 소식 news newspaper article press',
    desc: ['신문이 살짝 펄럭이고 기사 줄이 다시 채워집니다.', 'The paper flutters and the article lines fill back in.'],
    svg: '<path class="s" d="M7 5a1.5 1.5 0 0 1 1.5-1.5H19A1.5 1.5 0 0 1 20.5 5v13.5a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2V10A1.5 1.5 0 0 1 5 8.5h2z"/><path d="M7 8.5v10a2 2 0 0 1-2 2"/><rect class="f" x="10" y="6.5" width="7.5" height="4" rx=".75"/><path data-part="l1" d="M10 14h7.5"/><path data-part="l2" d="M10 17h5"/>',
    origins: { '*': [12, 20.5] },
    effect: { '*': fx.turn(-4, 520), l1: fx.redraw(320, 140), l2: fx.redraw(300, 230) }
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
