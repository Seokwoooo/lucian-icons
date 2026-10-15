import { C, icon, group, fx } from './_kit.js';

const GEAR = 'M10.33 5.3 10.63 2.85h2.74l.3 2.45a6.9 6.9 0 0 1 1.88.79l1.95-1.53 1.94 1.94-1.53 1.95a6.9 6.9 0 0 1 .79 1.88l2.45.3v2.74l-2.45.3a6.9 6.9 0 0 1-.79 1.88l1.53 1.95-1.94 1.94-1.95-1.53a6.9 6.9 0 0 1-1.88.79l-.3 2.45h-2.74l-.3-2.45a6.9 6.9 0 0 1-1.88-.79L6.5 19.44 4.56 17.5l1.53-1.95a6.9 6.9 0 0 1-.79-1.88l-2.45-.3v-2.74l2.45-.3a6.9 6.9 0 0 1 .79-1.88L4.56 6.5 6.5 4.56l1.95 1.53a6.9 6.9 0 0 1 1.88-.79z';
const STAR = 'M12 3.3 14.41 9.28 20.84 9.73 15.9 13.87 17.47 20.12 12 16.7 6.53 20.12 8.1 13.87 3.16 9.73 9.59 9.28z';
const DRAW_IN = (d = 380, delay = 120) => fx.keys([{ draw: 0, opacity: 0 }, { draw: 0.05, opacity: 1, offset: 0.1 }, { draw: 1, opacity: 1 }], d, 'out', delay);

export default group('navigation', [
  icon({
    id: 'search', name: ['검색', 'Search'], color: C.violet,
    keywords: '검색 찾기 돋보기 조회 search find magnifier lookup query',
    desc: ['검색 중에는 돋보기가 주변을 훑듯 원을 그리며 움직입니다.', 'While searching, the lens circles as if scanning the page.'],
    states: { idle: ['대기', 'Idle'], searching: ['검색 중', 'Searching'] },
    svg: '<g data-part="lens"><circle class="s" cx="10.5" cy="10.5" r="6.75"/><path d="m15.4 15.4 5.1 5.1"/><path data-part="glint" class="a" d="M7.6 9.1a3.2 3.2 0 0 1 2-2"/></g>',
    origins: { lens: [10.5, 10.5] },
    poses: { '*': { glint: { opacity: 0, draw: 0 } }, searching: { glint: { opacity: 1, draw: 1 } } },
    loops: { searching: { lens: fx.keys([{ translate: [0, 0] }, { translate: [-1.4, -1] }, { translate: [0.2, -1.8] }, { translate: [1.4, -0.6] }, { translate: [0, 0] }], 1400, 'inOut') } },
    effect: { lens: fx.keys([{ rotate: 0, scale: 1 }, { rotate: -14, scale: 1.08, offset: 0.4 }, { rotate: 4, scale: 1, offset: 0.75 }, { rotate: 0, scale: 1 }], 640) }
  }),
  icon({
    id: 'cursor', name: ['커서', 'Cursor'], color: C.indigo,
    keywords: '커서 포인터 클릭 선택 cursor pointer click select',
    desc: ['화살표가 눌리며 끝에서 클릭 빛살이 튀어나옵니다.', 'The pointer presses and click rays burst from its tip.'],
    svg: '<path data-part="arrow" class="s" d="m9 9 11.5 4.6-5 1.9-1.9 5z"/><path data-part="rays" class="a" d="M9 3v2.4M3 9h2.4M4.75 4.75l1.7 1.7M13.25 4.75l-1.2 1.2"/>',
    origins: { arrow: [9, 9], rays: [9, 9] },
    effect: {
      arrow: fx.keys([{ scale: 1, translate: [0, 0] }, { scale: 0.86, translate: [-0.5, -0.5], offset: 0.25, easing: 'out' }, { scale: 1.04, translate: [0, 0], offset: 0.5 }, { scale: 1, translate: [0, 0] }], 640, 'linear'),
      rays: fx.keys([{ scale: 1, opacity: 0 }, { scale: 0.5, opacity: -1, offset: 0.22 }, { scale: 0.5, opacity: -1, offset: 0.3 }, { scale: 1.18, opacity: 0, offset: 0.58 }, { scale: 1, opacity: 0 }], 640, 'out')
    }
  }),
  icon({
    id: 'home', name: ['홈', 'Home'], color: C.orange,
    keywords: '홈 집 처음 메인 home house start main',
    desc: ['문이 경첩을 따라 열렸다 닫히고 지붕이 살짝 들썩입니다.', 'The door swings on its hinge and the roof gives a small hop.'],
    svg: '<path class="s" d="M4 10.25 12 3.75l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z"/><path data-part="door" class="a" d="M10 20.5V15a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5.5"/>',
    origins: { door: [10, 17], '*': [12, 20.5] },
    effect: { door: fx.keys([{ scale: 1 }, { scale: [0.25, 1], offset: 0.4 }, { scale: [0.25, 1], offset: 0.55 }, { scale: [1.06, 1], offset: 0.85 }, { scale: 1 }], 820), '*': fx.hop(1, 560) }
  }),
  icon({
    id: 'menu', name: ['메뉴', 'Menu'], color: C.violet,
    keywords: '메뉴 햄버거 열기 닫기 탐색 menu hamburger navigation open close',
    desc: ['세 줄이 가운데로 모였다가 X로 돌아갑니다.', 'Three lines gather in the middle, then rotate into an X.'],
    states: { closed: ['닫힘', 'Closed'], open: ['열림', 'Open'] },
    svg: '<path data-part="top" d="M4 6.5h16"/><path data-part="mid" class="a" d="M4 12h16"/><path data-part="bot" d="M4 17.5h16"/>',
    origins: { top: [12, 6.5], mid: [12, 12], bot: [12, 17.5] },
    poses: { open: { top: { translate: [0, 5.5], rotate: 45 }, mid: { scale: [0, 1], opacity: 0 }, bot: { translate: [0, -5.5], rotate: -45 } } },
    transitions: {
      'closed>open': {
        top: fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [0, 5.5], rotate: 0, offset: 0.4, easing: 'in' }, { translate: [0, 5.5], rotate: 45 }], 520, 'linear'),
        bot: fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [0, -5.5], rotate: 0, offset: 0.4, easing: 'in' }, { translate: [0, -5.5], rotate: -45 }], 520, 'linear'),
        mid: { e: 'in', d: 200 }
      },
      'open>closed': {
        top: fx.keys([{ translate: [0, 5.5], rotate: 45 }, { translate: [0, 5.5], rotate: 0, offset: 0.45, easing: 'inOut' }, { translate: [0, 0], rotate: 0 }], 520, 'linear'),
        bot: fx.keys([{ translate: [0, -5.5], rotate: -45 }, { translate: [0, -5.5], rotate: 0, offset: 0.45, easing: 'inOut' }, { translate: [0, 0], rotate: 0 }], 520, 'linear'),
        mid: { e: 'out', d: 220, delay: 220 }
      }
    },
    effect: { top: fx.nudge([2, 0], 460), mid: fx.nudge([2, 0], 460, 60), bot: fx.nudge([2, 0], 460, 120) }
  }),
  icon({
    id: 'settings', name: ['설정', 'Settings'], color: C.teal,
    keywords: '설정 톱니 환경설정 옵션 settings gear preferences options',
    desc: ['톱니바퀴가 두 칸만큼 돌고 살짝 되돌아오며 맞물립니다.', 'The gear turns two teeth and settles back into mesh.'],
    svg: `<path data-part="gear" class="s" d="${GEAR}"/><circle class="a" cx="12" cy="12" r="3"/>`,
    origins: { gear: [12, 12] },
    effect: { gear: fx.keys([{ rotate: 0 }, { rotate: 98, offset: 0.62 }, { rotate: 86, offset: 0.82 }, { rotate: 90 }], 900, 'inOut') }
  }),
  icon({
    id: 'sliders', name: ['조절', 'Sliders'], color: C.blue,
    keywords: '조절 슬라이더 옵션 필터 설정 sliders adjust controls tune',
    desc: ['세 손잡이가 엇갈리며 미끄러졌다가 제자리로 돌아옵니다.', 'Three knobs slide in different directions and return.'],
    svg: '<path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17"/><g data-part="k1"><circle class="f" cx="8" cy="6.5" r="2.25"/><circle cx="8" cy="6.5" r="2.25"/></g><g data-part="k2"><circle class="f" cx="16" cy="12" r="2.25"/><circle cx="16" cy="12" r="2.25"/></g><g data-part="k3"><circle class="f" cx="10" cy="17.5" r="2.25"/><circle cx="10" cy="17.5" r="2.25"/></g>',
    effect: { k1: fx.nudge([7, 0], 720), k2: fx.nudge([-7, 0], 720, 80), k3: fx.nudge([5, 0], 720, 160) }
  }),
  icon({
    id: 'filter', name: ['필터', 'Filter'], color: C.cyan,
    keywords: '필터 거르기 조건 깔때기 filter funnel refine narrow',
    desc: ['깔때기 끝에서 한 방울이 떨어지고, 적용 상태에서는 깔때기가 채워집니다.', 'A drop falls from the spout; the applied state fills the funnel.'],
    states: { off: ['꺼짐', 'Off'], on: ['적용됨', 'Applied'] },
    svg: '<path data-part="fill" class="f" d="M3.5 4.5h17l-6.75 8V19l-3.5 1.5v-8z"/><path class="s" d="M3.5 4.5h17l-6.75 8V19l-3.5 1.5v-8z"/><circle data-part="drop" class="f" cx="12" cy="21.5" r="1"/>',
    origins: { fill: [12, 4.5], drop: [12, 21.5] },
    poses: { '*': { fill: { scale: [1, 0], opacity: 0 }, drop: { opacity: 0 } }, on: { fill: { scale: 1, opacity: 1 } } },
    motion: { e: 'bouncy' },
    transitions: { 'on>off': { fill: { e: 'smooth', d: 240 } } },
    effect: { drop: fx.keys([{ translate: [0, -6], opacity: 0, scale: 0.4 }, { translate: [0, -4], opacity: 1, scale: 1, offset: 0.3 }, { translate: [0, 1.5], opacity: 1, offset: 0.8 }, { translate: [0, 2], opacity: 0 }], 700, 'in') }
  }),
  icon({
    id: 'sort', name: ['정렬', 'Sort'], color: C.indigo,
    keywords: '정렬 순서 오름차순 내림차순 sort order ascending descending',
    desc: ['화살표가 뒤집히고 막대 길이가 반대로 바뀝니다.', 'The arrow flips and the bar lengths reverse.'],
    states: { desc: ['내림차순', 'Descending'], asc: ['오름차순', 'Ascending'] },
    svg: '<path data-part="b1" d="M4 6.5h9"/><path data-part="b2" d="M4 12h6.5"/><path data-part="b3" d="M4 17.5h4"/><g data-part="arrow" class="a"><path d="M17.5 4.5v15"/><path d="m14.5 16.5 3 3 3-3"/></g>',
    origins: { b1: [4, 6.5], b2: [4, 12], b3: [4, 17.5], arrow: [17.5, 12] },
    poses: { asc: { b1: { scale: [0.44, 1] }, b3: { scale: [2.25, 1] }, arrow: { scale: [1, -1] } } },
    motion: { e: 'bouncy' },
    effect: { arrow: fx.nudge([0, 1.6], 520), b1: fx.keys([{ scale: 1 }, { scale: [0.7, 1], offset: 0.4 }, { scale: 1 }], 520) }
  }),
  icon({
    id: 'layout', name: ['레이아웃', 'Layout'], color: C.violet,
    keywords: '레이아웃 사이드바 패널 화면 layout sidebar panel window',
    desc: ['사이드바가 접히고 펼쳐지며 칸막이가 따라 움직입니다.', 'The sidebar folds and unfolds with the divider following.'],
    states: { open: ['펼침', 'Open'], collapsed: ['접힘', 'Collapsed'] },
    svg: '<rect class="s" x="3" y="4" width="18" height="16" rx="2.5"/><path data-part="panel" class="t" d="M5.5 4H9v16H5.5A2.5 2.5 0 0 1 3 17.5v-11A2.5 2.5 0 0 1 5.5 4z"/><path data-part="divider" d="M9 4v16"/><path data-part="items" class="a" d="M5.25 8h1.5M5.25 11h1.5"/>',
    origins: { panel: [3, 12] },
    poses: { collapsed: { panel: { scale: [0.45, 1] }, divider: { translate: [-3.3, 0] }, items: { opacity: 0, translate: [-1.5, 0] } } },
    motion: { e: 'snappy' },
    effect: { divider: fx.nudge([-2, 0], 520), panel: fx.keys([{ scale: 1 }, { scale: [0.67, 1], offset: 0.38 }, { scale: [1.05, 1], offset: 0.72 }, { scale: 1 }], 520), items: fx.nudge([-1, 0], 520) }
  }),
  icon({
    id: 'grid', name: ['그리드', 'Grid'], color: C.blue,
    keywords: '그리드 격자 바둑판 타일 보기 grid tiles view gallery',
    desc: ['네 칸이 물결처럼 차례로 톡톡 튀어 오릅니다.', 'The four tiles pop one after another like a ripple.'],
    svg: '<rect data-part="t1" class="s" x="3.5" y="3.5" width="7" height="7" rx="1.75"/><rect data-part="t2" class="f" x="13.5" y="3.5" width="7" height="7" rx="1.75"/><rect data-part="t2o" x="13.5" y="3.5" width="7" height="7" rx="1.75"/><rect data-part="t3" class="s" x="3.5" y="13.5" width="7" height="7" rx="1.75"/><rect data-part="t4" class="s" x="13.5" y="13.5" width="7" height="7" rx="1.75"/>',
    origins: { t1: [7, 7], t2: [17, 7], t2o: [17, 7], t3: [7, 17], t4: [17, 17] },
    effect: { t1: fx.pop(1.15, 420), t2: fx.pop(1.15, 420, 90), t2o: fx.pop(1.15, 420, 90), t3: fx.pop(1.15, 420, 90), t4: fx.pop(1.15, 420, 180) }
  }),
  icon({
    id: 'list', name: ['목록', 'List'], color: C.green,
    keywords: '목록 리스트 항목 글머리 list items bullets rows',
    desc: ['글머리 점이 튀고 각 줄이 차례로 다시 그려집니다.', 'The bullets pop and each row redraws in turn.'],
    svg: '<circle data-part="d1" class="f" cx="4.75" cy="6.5" r="1.3"/><circle data-part="d2" class="f" cx="4.75" cy="12" r="1.3"/><circle data-part="d3" class="f" cx="4.75" cy="17.5" r="1.3"/><path data-part="l1" d="M9 6.5h11"/><path data-part="l2" d="M9 12h11"/><path data-part="l3" d="M9 17.5h11"/>',
    origins: { d1: [4.75, 6.5], d2: [4.75, 12], d3: [4.75, 17.5] },
    effect: { d1: fx.pop(1.5, 380), d2: fx.pop(1.5, 380, 90), d3: fx.pop(1.5, 380, 180), l1: fx.redraw(360, 40), l2: fx.redraw(360, 130), l3: fx.redraw(360, 220) }
  }),
  icon({
    id: 'expand', name: ['확대', 'Expand'], color: C.teal,
    keywords: '확대 전체화면 펼치기 최대화 expand fullscreen maximize enlarge',
    desc: ['두 화살표가 바깥쪽으로 뻗었다가 돌아옵니다.', 'Both arrows reach outward and spring back.'],
    svg: '<g data-part="tr"><path d="M14.5 3.5h6v6"/><path class="a" d="m20.5 3.5-6.5 6.5"/></g><g data-part="bl"><path d="M9.5 20.5h-6v-6"/><path class="a" d="M3.5 20.5 10 14"/></g>',
    effect: { tr: fx.nudge([1.6, -1.6], 520), bl: fx.nudge([-1.6, 1.6], 520) }
  }),
  icon({
    id: 'collapse', name: ['축소', 'Collapse'], color: C.teal,
    keywords: '축소 접기 최소화 창모드 collapse minimize shrink exit fullscreen',
    desc: ['두 화살표가 가운데로 모였다가 돌아옵니다.', 'Both arrows draw toward the center and spring back.'],
    svg: '<g data-part="tr"><path d="M14 4v6h6"/><path class="a" d="M20.5 3.5 14 10"/></g><g data-part="bl"><path d="M10 20v-6H4"/><path class="a" d="M3.5 20.5 10 14"/></g>',
    effect: { tr: fx.nudge([-1.4, 1.4], 520), bl: fx.nudge([1.4, -1.4], 520) }
  }),
  icon({
    id: 'refresh', name: ['새로고침', 'Refresh'], color: C.green,
    keywords: '새로고침 다시 불러오기 동기화 회전 refresh reload sync rotate',
    desc: ['한 바퀴 돌며 새로고침하고, 불러오는 중에는 계속 돕니다.', 'One full turn on hover; it keeps turning while loading.'],
    states: { idle: ['대기', 'Idle'], loading: ['불러오는 중', 'Loading'] },
    svg: '<g data-part="arrows"><path d="M4 12a8 8 0 0 1 13.66-5.66L20 8.5"/><path d="M20 3.5v5h-5"/><path class="a" d="M20 12a8 8 0 0 1-13.66 5.66L4 15.5"/><path class="a" d="M4 20.5v-5h5"/></g>',
    origins: { arrows: [12, 12] },
    loops: { loading: { arrows: fx.keys([{ rotate: 0 }, { rotate: 360 }], 900, 'linear') } },
    effect: { arrows: fx.keys([{ rotate: 0 }, { rotate: 380, offset: 0.7 }, { rotate: 360 }], 860, 'inOut') }
  }),
  icon({
    id: 'plus', name: ['추가', 'Plus'], color: C.green,
    keywords: '추가 더하기 새로 만들기 plus add new create',
    desc: ['더하기 표시가 90도 돌며 튕깁니다.', 'The plus spins a quarter turn with a spring.'],
    svg: '<path data-part="mark" class="a" d="M12 5v14M5 12h14"/>',
    effect: { mark: fx.keys([{ rotate: 0, scale: 1 }, { rotate: 100, scale: 1.15, offset: 0.55 }, { rotate: 90, scale: 1 }], 600) }
  }),
  icon({
    id: 'minus', name: ['빼기', 'Minus'], color: C.coral,
    keywords: '빼기 제거 줄이기 축소 minus remove subtract less',
    desc: ['선이 양쪽에서 줄었다가 늘어나며 제자리를 찾습니다.', 'The bar shrinks from both ends, then stretches back.'],
    svg: '<path data-part="mark" class="a" d="M5 12h14"/>',
    effect: { mark: fx.keys([{ scale: 1 }, { scale: [0.55, 1], offset: 0.35 }, { scale: [1.12, 1], offset: 0.7 }, { scale: 1 }], 520) }
  }),
  icon({
    id: 'close', name: ['닫기', 'Close'], color: C.red,
    keywords: '닫기 취소 엑스 삭제 close cancel x dismiss',
    desc: ['X가 90도 돌며 작아졌다 커집니다.', 'The X turns a quarter and bounces back to size.'],
    svg: '<path data-part="mark" class="a" d="M6 6l12 12M18 6 6 18"/>',
    effect: { mark: fx.keys([{ rotate: 0, scale: 1 }, { rotate: 45, scale: 0.8, offset: 0.4 }, { rotate: 95, scale: 1.08, offset: 0.75 }, { rotate: 90, scale: 1 }], 620) }
  }),
  icon({
    id: 'check', name: ['확인', 'Check'], color: C.green,
    keywords: '확인 체크 완료 선택 check done confirm ok',
    desc: ['체크 표시가 한 번에 다시 그어집니다.', 'The check mark draws itself again in one stroke.'],
    svg: '<path data-part="mark" class="a" d="m4.75 12.5 4.5 4.5 10-10"/>',
    effect: { mark: fx.redraw(520), '*': fx.pop(1.08, 520, 200) }
  }),
  icon({
    id: 'arrow', name: ['화살표', 'Arrow'], color: C.blue,
    keywords: '화살표 다음 이동 오른쪽 arrow next forward right go',
    desc: ['화살표가 오른쪽으로 빠져나갔다가 왼쪽에서 다시 들어옵니다.', 'The arrow exits to the right and re-enters from the left.'],
    svg: '<g data-part="mark" class="a"><path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/></g>',
    effect: { mark: fx.keys([{ translate: [0, 0], opacity: 0 }, { translate: [9, 0], opacity: -1, offset: 0.42, easing: 'in' }, { translate: [-9, 0], opacity: -1, offset: 0.43, easing: 'out' }, { translate: [0, 0], opacity: 0 }], 760, 'linear') }
  }),
  icon({
    id: 'chevron', name: ['펼침 화살표', 'Chevron'], color: C.indigo,
    keywords: '펼치기 접기 드롭다운 아코디언 chevron dropdown expand collapse accordion',
    desc: ['펼치면 꺾쇠가 스프링처럼 반 바퀴 뒤집힙니다.', 'Expanding flips the chevron with a spring.'],
    states: { collapsed: ['접힘', 'Collapsed'], expanded: ['펼침', 'Expanded'] },
    svg: '<path data-part="mark" class="a" d="m6 9 6 6 6-6"/>',
    poses: { expanded: { mark: { rotate: 180 } } },
    motion: { e: 'bouncy' },
    effect: { mark: fx.nudge([0, 1.5], 440) }
  }),
  icon({
    id: 'share', name: ['공유', 'Share'], color: C.pink,
    keywords: '공유 보내기 연결 퍼뜨리기 share send network spread',
    desc: ['한 점에서 두 갈래로 연결선이 뻗고 점들이 차례로 튑니다.', 'Lines branch from one node and the nodes pop in turn.'],
    svg: '<path data-part="l1" d="M8.6 10.6 15.4 6.7"/><path data-part="l2" d="M8.6 13.4l6.8 3.9"/><circle data-part="n1" class="s" cx="6" cy="12" r="2.75"/><circle data-part="n2" class="f" cx="18" cy="5.5" r="2.75"/><circle data-part="n3" class="s" cx="18" cy="18.5" r="2.75"/>',
    origins: { n1: [6, 12], n2: [18, 5.5], n3: [18, 18.5] },
    effect: { n1: fx.pop(1.2, 380), l1: fx.redraw(300, 120), l2: fx.redraw(300, 120), n2: fx.pop(1.25, 380, 260), n3: fx.pop(1.25, 380, 320) }
  }),
  icon({
    id: 'more', name: ['더보기', 'More'], color: C.violet,
    keywords: '더보기 옵션 메뉴 점세개 more options ellipsis overflow',
    desc: ['세 점이 파도처럼 차례로 튀어 오릅니다.', 'Three dots bounce one after another like a wave.'],
    svg: '<circle data-part="d1" class="f" cx="5" cy="12" r="1.75"/><circle data-part="d2" class="f" cx="12" cy="12" r="1.75"/><circle data-part="d3" class="f" cx="19" cy="12" r="1.75"/>',
    effect: { d1: fx.nudge([0, -2.5], 420), d2: fx.nudge([0, -2.5], 420, 90), d3: fx.nudge([0, -2.5], 420, 180) }
  }),
  icon({
    id: 'info', name: ['정보', 'Info'], color: C.blue,
    keywords: '정보 안내 도움 설명 info information about details',
    desc: ['i의 점이 통 튀어 오르고 몸통이 받아냅니다.', 'The dot of the i hops and the stem catches it.'],
    svg: '<circle class="s" cx="12" cy="12" r="8.75"/><path data-part="stem" class="a" d="M12 11v5.5"/><path data-part="dot" class="a" d="M12 7.75h.01"/>',
    origins: { stem: [12, 16.5] },
    effect: { dot: fx.keys([{ translate: [0, 0] }, { translate: [0, -2.2], offset: 0.4 }, { translate: [0, 0.3], offset: 0.75 }, { translate: [0, 0] }], 560), stem: fx.keys([{ scale: 1 }, { scale: 1, offset: 0.68 }, { scale: [1, 0.86], offset: 0.8 }, { scale: 1 }], 560) }
  }),
  icon({
    id: 'alert', name: ['경고', 'Alert'], color: C.amber,
    keywords: '경고 주의 위험 오류 alert warning caution danger',
    desc: ['삼각형이 좌우로 흔들리며 주의를 끕니다.', 'The triangle shakes side to side to get attention.'],
    svg: '<path class="s" d="M10.3 4.2 2.9 17.2a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 4.2a1.95 1.95 0 0 0-3.4 0z"/><path class="a" d="M12 9.5v4.25"/><path class="a" d="M12 16.75h.01"/>',
    origins: { '*': [12, 20] },
    effect: { '*': fx.wiggle(7, 620) }
  }),
  icon({
    id: 'help', name: ['도움말', 'Help'], color: C.violet,
    keywords: '도움말 질문 물음표 지원 help question support faq',
    desc: ['물음표가 고개를 갸웃하듯 기울었다 돌아옵니다.', 'The question mark tilts its head and comes back.'],
    svg: '<circle class="s" cx="12" cy="12" r="8.75"/><g data-part="mark" class="a"><path d="M9.5 9.5a2.5 2.5 0 0 1 4.85.85c0 1.65-2.35 2.15-2.35 3.4"/><path d="M12 16.75h.01"/></g>',
    origins: { mark: [12, 16.75] },
    effect: { mark: fx.wiggle(16, 760) }
  }),
  icon({
    id: 'star', name: ['별', 'Star'], color: C.yellow,
    keywords: '별 즐겨찾기 평점 중요 star favorite rating important',
    desc: ['켜면 별이 한 바퀴 돌며 채워지고 반짝임이 퍼집니다.', 'Turning on spins the star as it fills, with a little sparkle.'],
    states: { off: ['꺼짐', 'Off'], on: ['켜짐', 'On'] },
    svg: `<g data-part="star"><path data-part="fill" class="f" d="${STAR}"/><path class="s" d="${STAR}"/></g><path data-part="burst" class="a" d="M12 .9v1M21.9 8.3l-.95.3M2.1 8.3l.95.3M18.4 21.2l-.6-.8M5.6 21.2l.6-.8"/>`,
    origins: { star: [12, 12.6], fill: [12, 12.6], burst: [12, 12.6] },
    poses: { '*': { fill: { scale: 0, opacity: 0 }, burst: { opacity: 0, scale: 0.7 } }, on: { fill: { scale: 1, opacity: 1 } } },
    transitions: {
      'off>on': {
        // starts at -72°, which looks identical to 0°, so the spin can end on the rest pose
        star: fx.keys([{ rotate: -72, scale: 1 }, { rotate: -84, scale: 0.85, offset: 0.25 }, { rotate: 0, scale: 1.12, offset: 0.7 }, { rotate: 0, scale: 1 }], 640, 'inOut'),
        fill: fx.keys([{ scale: 0, opacity: 0 }, { scale: 0.3, opacity: 1, offset: 0.3 }, { scale: 1, opacity: 1 }], 520, 'out', 80),
        burst: fx.keys([{ opacity: 0, scale: 0.7 }, { opacity: 0, scale: 0.7, offset: 0.4 }, { opacity: 1, scale: 1, offset: 0.6 }, { opacity: 0, scale: 1.25 }], 700, 'out')
      },
      'on>off': { fill: { e: 'smooth', d: 260 } }
    },
    effect: { star: fx.keys([{ rotate: 0, scale: 1 }, { rotate: 18, scale: 1.12, offset: 0.4 }, { rotate: -4, scale: 1, offset: 0.75 }, { rotate: 0, scale: 1 }], 620) }
  }),
  icon({
    id: 'sparkle', name: ['반짝임', 'Sparkle'], color: C.violet,
    keywords: '반짝 AI 마법 새로움 자동 sparkle ai magic new auto generate',
    desc: ['큰 별빛이 돌며 커지고, 작은 별빛이 뒤따라 반짝입니다.', 'The large sparkle twists and grows; a small one twinkles after.'],
    svg: '<path data-part="big" class="s" d="M10 4c.55 4.3 2.2 5.95 6.5 6.5-4.3.55-5.95 2.2-6.5 6.5-.55-4.3-2.2-5.95-6.5-6.5C7.8 9.95 9.45 8.3 10 4z"/><path data-part="small" class="f" d="M18 13.5c.3 2.1 1.1 2.9 3.2 3.2-2.1.3-2.9 1.1-3.2 3.2-.3-2.1-1.1-2.9-3.2-3.2 2.1-.3 2.9-1.1 3.2-3.2z"/><path data-part="dot" class="a" d="M18.5 4.5h.01"/>',
    origins: { big: [10, 10.5], small: [18, 16.7], dot: [18.5, 4.5] },
    effect: { big: fx.keys([{ rotate: 0, scale: 1 }, { rotate: 45, scale: 1.18, offset: 0.5 }, { rotate: 90, scale: 1 }], 760, 'inOut'), small: fx.keys([{ scale: 1 }, { scale: 0, offset: 0.3 }, { scale: 1.3, offset: 0.7 }, { scale: 1 }], 760, 'inOut'), dot: fx.blink(600, 200) }
  }),
  icon({
    id: 'toggle', name: ['스위치', 'Toggle'], color: C.green,
    keywords: '스위치 토글 켜기 끄기 설정 toggle switch on off',
    desc: ['손잡이가 늘어나며 반대편으로 미끄러지고 트랙이 채워집니다.', 'The knob stretches as it slides across and the track fills.'],
    states: { off: ['꺼짐', 'Off'], on: ['켜짐', 'On'] },
    svg: '<rect data-part="fill" class="f" x="2.5" y="6.5" width="19" height="11" rx="5.5"/><rect class="s" x="2.5" y="6.5" width="19" height="11" rx="5.5"/><circle data-part="knob" class="k" cx="8" cy="12" r="3"/>',
    origins: { knob: [8, 12], fill: [12, 12] },
    poses: { '*': { fill: { opacity: 0 } }, on: { knob: { translate: [8, 0] }, fill: { opacity: 1 } } },
    transitions: {
      'off>on': { knob: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [4, 0], scale: [1.4, 0.9], offset: 0.45 }, { translate: [8.4, 0], scale: [0.95, 1.05], offset: 0.8 }, { translate: [8, 0], scale: 1 }], 480, 'inOut'), fill: { e: 'out', d: 280, delay: 60 } },
      'on>off': { knob: fx.keys([{ translate: [8, 0], scale: 1 }, { translate: [4, 0], scale: [1.4, 0.9], offset: 0.45 }, { translate: [-0.4, 0], scale: [0.95, 1.05], offset: 0.8 }, { translate: [0, 0], scale: 1 }], 480, 'inOut'), fill: { e: 'out', d: 220 } }
    },
    effect: { knob: fx.keys([{ scale: 1 }, { scale: [1.3, 0.9], offset: 0.4 }, { scale: 1 }], 420) }
  }),
  icon({
    id: 'login', name: ['로그인', 'Log in'], color: C.blue,
    keywords: '로그인 들어가기 입장 계정 login sign in enter account',
    desc: ['화살표가 문 안으로 쑥 들어가 사라지고, 왼쪽에서 다시 나타나 제자리로 옵니다.', 'The arrow slides through the door and disappears, then comes back in from the left.'],
    svg: '<path data-part="door" class="s" d="M14 3.5h4a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-4"/><g data-part="arrow" class="a"><path d="M3.5 12h11"/><path d="m10.5 8 4 4-4 4"/></g>',
    origins: { door: [17, 12] },
    effect: {
      arrow: fx.keys([{ translate: [0, 0], opacity: 0 }, { translate: [-1, 0], opacity: 0, offset: 0.16, easing: 'in' }, { translate: [3.6, 0], opacity: -1, offset: 0.44 }, { translate: [-4, 0], opacity: -1, offset: 0.46, easing: 'out' }, { translate: [0, 0], opacity: 0, offset: 0.82 }, { translate: [0, 0], opacity: 0 }], 960, 'linear'),
      door: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [0, 0], scale: 1, offset: 0.34 }, { translate: [0.7, 0], scale: [1.05, 1], offset: 0.44 }, { translate: [0, 0], scale: 1, offset: 0.6 }, { translate: [0, 0], scale: 1 }], 960)
    }
  })
]);
