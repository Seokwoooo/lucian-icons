import { C, icon, group, fx } from './_kit.js';

export default group('devices', [
  icon({
    id: 'power', name: ['전원', 'Power'], color: C.green,
    keywords: '전원 켜기 끄기 시작 power on off start',
    desc: ['버튼이 눌리듯 막대가 내려갔다 올라오고 고리가 한 바퀴 그려집니다.', 'The stem presses in and the ring draws itself around.'],
    states: { off: ['꺼짐', 'Off'], on: ['켜짐', 'On'] },
    svg: '<path d="M7.05 6.4a8 8 0 1 0 9.9 0"/><path data-part="ring" class="a" d="M7.05 6.4a8 8 0 1 0 9.9 0"/><path data-part="stem" class="a" d="M12 3v8.25"/>',
    origins: { stem: [12, 3] },
    poses: { '*': { ring: { draw: 0, opacity: 0 } }, on: { ring: { draw: 1, opacity: 1 } } },
    transitions: {
      'off>on': {
        stem: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [0, 1.6], scale: [1, 0.82], offset: 0.35, easing: 'out' }, { translate: [0, 0], scale: 1 }], 520, 'linear'),
        ring: fx.keys([{ draw: 0, opacity: 0 }, { draw: 0.02, opacity: 1, offset: 0.08 }, { draw: 1, opacity: 1 }], 560, 'out', 150)
      },
      'on>off': { ring: { e: 'smooth', d: 300 } }
    },
    effect: { stem: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [0, 1.4], scale: [1, 0.85], offset: 0.35 }, { translate: [0, 0], scale: 1 }], 460) }
  }),
  icon({
    id: 'mouse', name: ['마우스', 'Mouse'], color: C.blue,
    keywords: '마우스 스크롤 클릭 입력 mouse scroll click input',
    desc: ['휠이 두 번 아래로 굴러갑니다.', 'The wheel rolls down twice.'],
    svg: '<rect class="s" x="5.75" y="3" width="12.5" height="18" rx="6.25"/><path data-part="wheel" class="a" d="M12 7v3"/>',
    origins: { wheel: [12, 8.5] },
    effect: { wheel: fx.keys([{ translate: [0, 0], opacity: 0 }, { translate: [0, 2], opacity: -1, offset: 0.3 }, { translate: [0, -1.5], opacity: -1, offset: 0.31 }, { translate: [0, 0], opacity: 0, offset: 0.55 }, { translate: [0, 2], opacity: -1, offset: 0.75 }, { translate: [0, -1.5], opacity: -1, offset: 0.76 }, { translate: [0, 0], opacity: 0 }], 1100, 'linear') }
  }),
  icon({
    id: 'monitor', name: ['모니터', 'Monitor'], color: C.indigo,
    keywords: '모니터 데스크톱 화면 컴퓨터 monitor desktop screen display',
    desc: ['화면이 살짝 튀고 내용이 다시 그려집니다.', 'The screen bounces and its content redraws.'],
    svg: '<rect data-part="screen" class="s" x="2.5" y="3.5" width="19" height="13" rx="2"/><path d="M8.5 20.5h7M12 16.5v4"/><path data-part="c1" class="a" d="M6 8h5"/><path data-part="c2" d="M6 11.5h8.5"/>',
    origins: { screen: [12, 16.5] },
    effect: { screen: fx.keys([{ scale: 1 }, { scale: [1.04, 0.95], offset: 0.25 }, { scale: 1 }], 420), c1: fx.redraw(360, 120), c2: fx.redraw(360, 220) }
  }),
  icon({
    id: 'laptop', name: ['노트북', 'Laptop'], color: C.blue,
    keywords: '노트북 랩톱 컴퓨터 화면 laptop computer notebook screen',
    desc: ['화면이 살짝 젖혀지며 깨어나고, 화면 속 글줄이 지워졌다가 다시 쓰입니다.', 'The screen tilts awake and its lines clear and type back in.'],
    svg: '<g data-part="lid"><path class="s" d="M5 15V5.5A1.5 1.5 0 0 1 6.5 4h11A1.5 1.5 0 0 1 19 5.5V15"/><path data-part="l1" class="a" d="M8 8h8"/><path data-part="l2" class="a" d="M8 11h5"/></g><path d="M3.25 15h17.5l1.15 2.85A1.2 1.2 0 0 1 20.8 19.5H3.2a1.2 1.2 0 0 1-1.1-1.65z"/>',
    origins: { lid: [12, 15] },
    effect: {
      lid: fx.keys([{ scale: 1 }, { scale: [1, 0.9], offset: 0.2 }, { scale: [1, 1.03], offset: 0.45 }, { scale: 1 }], 640),
      l1: fx.retype([0.1, 0.25], [0.3, 0.6], 1000),
      l2: fx.retype([0.05, 0.2], [0.55, 0.85], 1000)
    }
  }),
  icon({
    id: 'tablet', name: ['태블릿', 'Tablet'], color: C.teal,
    keywords: '태블릿 아이패드 화면 회전 tablet ipad screen rotate',
    desc: ['가로 모드로 바꾸면 스프링처럼 90도 돌아갑니다.', 'Landscape rotates it a quarter turn with a spring.'],
    states: { portrait: ['세로', 'Portrait'], landscape: ['가로', 'Landscape'] },
    svg: '<g data-part="device"><rect class="s" x="5" y="2.5" width="14" height="19" rx="2.25"/><path class="a" d="M11 18.5h2"/></g>',
    origins: { device: [12, 12] },
    poses: { landscape: { device: { rotate: -90 } } },
    motion: { e: 'bouncy' },
    effect: { device: fx.turn(-12, 560) }
  }),
  icon({
    id: 'smartphone', name: ['스마트폰', 'Smartphone'], color: C.violet,
    keywords: '스마트폰 휴대폰 모바일 알림 smartphone mobile phone notification',
    desc: ['알림이 오면 화면 위로 배너가 내려오고 폰이 진동합니다.', 'An alert slides a banner down and the phone buzzes.'],
    states: { idle: ['대기', 'Idle'], alert: ['알림', 'Alert'] },
    svg: '<g data-part="phone"><rect class="s" x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 5.25h3"/><rect data-part="note" class="f" x="8" y="7.5" width="8" height="3.25" rx="1"/></g>',
    origins: { phone: [12, 12], note: [12, 7.5] },
    poses: { '*': { note: { opacity: 0, translate: [0, -2], scale: [1, 0.4] } }, alert: { note: { opacity: 1, translate: [0, 0], scale: 1 } } },
    motion: { e: 'bouncy' },
    loops: { alert: { phone: fx.keys([0, -7, 7, -6, 6, -3, 0, 0].map((r, i) => ({ rotate: r, offset: [0, 0.06, 0.12, 0.18, 0.24, 0.3, 0.36, 1][i] })), 1800, 'linear') } },
    effect: { phone: fx.shake(0.9, 420) }
  }),
  icon({
    id: 'keyboard', name: ['키보드', 'Keyboard'], color: C.indigo,
    keywords: '키보드 입력 타자 단축키 keyboard typing input shortcut',
    desc: ['자판이 하나씩 눌리며 불이 들어오고, 마지막에 스페이스바가 눌립니다.', 'Keys light up one by one as they are typed, then the space bar goes down.'],
    svg: '<rect class="s" x="2.5" y="6" width="19" height="12" rx="2.5"/><path d="M6 9.75h.01M9 9.75h.01M12 9.75h.01M15 9.75h.01M18 9.75h.01M7.5 12.5h.01M10.5 12.5h.01M13.5 12.5h.01M16.5 12.5h.01"/><path data-part="space" class="a" d="M8.5 15.25h7"/><path data-part="k1" class="a" d="M6 9.75h.01"/><path data-part="k2" class="a" d="M13.5 12.5h.01"/><path data-part="k3" class="a" d="M12 9.75h.01"/><path data-part="k4" class="a" d="M7.5 12.5h.01"/>',
    origins: { space: [12, 15.25], k1: [6, 9.75], k2: [13.5, 12.5], k3: [12, 9.75], k4: [7.5, 12.5] },
    poses: { '*': { k1: { opacity: 0 }, k2: { opacity: 0 }, k3: { opacity: 0 }, k4: { opacity: 0 } } },
    effect: {
      k1: fx.keys([{ opacity: 0, scale: 1 }, { opacity: 1, scale: 1.7, offset: 0.3 }, { opacity: 1, scale: 1, offset: 0.6 }, { opacity: 0, scale: 1 }], 300, 'out', 0),
      k2: fx.keys([{ opacity: 0, scale: 1 }, { opacity: 1, scale: 1.7, offset: 0.3 }, { opacity: 1, scale: 1, offset: 0.6 }, { opacity: 0, scale: 1 }], 300, 'out', 150),
      k3: fx.keys([{ opacity: 0, scale: 1 }, { opacity: 1, scale: 1.7, offset: 0.3 }, { opacity: 1, scale: 1, offset: 0.6 }, { opacity: 0, scale: 1 }], 300, 'out', 300),
      k4: fx.keys([{ opacity: 0, scale: 1 }, { opacity: 1, scale: 1.7, offset: 0.3 }, { opacity: 1, scale: 1, offset: 0.6 }, { opacity: 0, scale: 1 }], 300, 'out', 450),
      space: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [0, 0.8], scale: [0.86, 1], offset: 0.4 }, { translate: [0, 0], scale: 1 }], 340, 'inOut', 640)
    }
  }),
  icon({
    id: 'battery', name: ['배터리', 'Battery'], color: C.green,
    keywords: '배터리 충전 전력 잔량 battery charge power level',
    desc: ['실제 잔량만큼 채워지고, 충전 중에는 번개와 함께 차오름이 반복됩니다.', 'Fills to the measured level; charging shows a bolt and a repeating fill.'],
    states: { level: ['잔량', 'Level'], charging: ['충전 중', 'Charging'] },
    progress: { state: 'level', part: 'fill', axis: 'x', value: 70 },
    svg: '<rect class="s" x="2.5" y="7" width="17" height="10" rx="2.25"/><path d="M21.5 10.5v3"/><rect data-part="fill" class="f" x="5" y="9.5" width="12" height="5" rx="1"/><path data-part="bolt" d="M11.5 8.25 9.25 12.25h3.5l-2.25 4"/>',
    origins: { fill: [5, 12], bolt: [11, 12.25] },
    poses: { '*': { bolt: { opacity: 0, scale: 0.4 } }, charging: { bolt: { opacity: 1, scale: 1 }, fill: { opacity: 0.45 } } },
    motion: { e: 'snappy' },
    loops: { charging: { fill: fx.keys([{ scale: [0.15, 1] }, { scale: [1, 1], offset: 0.8 }, { scale: [1, 1] }], 1600, 'inOut') } },
    effect: { fill: fx.keys([{ scale: 1 }, { scale: [0.2, 1], offset: 0.3 }, { scale: [1.05, 1], offset: 0.78 }, { scale: 1 }], 900) }
  }),
  icon({
    id: 'wifi', name: ['와이파이', 'Wi-Fi'], color: C.blue,
    keywords: '와이파이 무선 인터넷 연결 신호 wifi wireless internet signal',
    desc: ['점에서 시작해 물결 두 개가 차례로 켜지고, 연결 중에는 이 흐름이 반복됩니다.', 'The dot and then the two arcs light up in turn; connecting repeats the sweep.'],
    states: { connected: ['연결됨', 'Connected'], connecting: ['연결 중', 'Connecting'] },
    svg: '<circle data-part="w1" class="f" cx="12" cy="19.5" r="1.6"/><path data-part="w2" class="a" d="M6.96 14.64A7 7 0 0 1 17.04 14.64"/><path data-part="w3" d="M3.01 10.82A12.5 12.5 0 0 1 20.99 10.82"/>',
    origins: { w1: [12, 19.5] },
    loops: { connecting: Object.fromEntries(['w1', 'w2', 'w3'].map((p, i) => [p, fx.keys([{ opacity: -0.8 }, { opacity: 0, offset: 0.25 }, { opacity: -0.8, offset: 0.6 }, { opacity: -0.8 }], 1200, 'inOut', i * 200)])) },
    effect: Object.fromEntries(['w1', 'w2', 'w3'].map((p, i) => [p, fx.keys([{ opacity: 0 }, { opacity: -0.85, offset: 0.01 }, { opacity: -0.85, offset: 0.2 + i * 0.18 }, { opacity: 0, offset: 0.4 + i * 0.18 }, { opacity: 0 }], 900, 'linear')]))
  }),
  icon({
    id: 'bluetooth', name: ['블루투스', 'Bluetooth'], color: C.indigo,
    keywords: '블루투스 무선 연결 페어링 bluetooth wireless pair connect',
    desc: ['룬 모양 기호가 한 획으로 다시 그려집니다.', 'The rune redraws itself in a single stroke.'],
    svg: '<path class="t" d="M12 2.5 17.5 7.5 12 12l5.5 4.5-5.5 5z"/><path data-part="rune" class="a" d="m6.5 7.5 11 9-5.5 5v-19l5.5 5-11 9"/>',
    effect: { rune: fx.redraw(820) }
  }),
  icon({
    id: 'plug', name: ['플러그', 'Plug'], color: C.amber,
    keywords: '플러그 전원 연결 충전 plug power connect charge',
    desc: ['플러그가 위로 꽂히며 끝에서 작은 불꽃이 튑니다.', 'The plug pushes up and a small spark jumps from the prongs.'],
    svg: '<g data-part="plug"><path d="M9 3v4M15 3v4"/><path class="s" d="M6.5 7h11v4a5.5 5.5 0 0 1-11 0z"/></g><path d="M12 16.5v5"/><path data-part="spark" class="a" d="M5.25 3.25 6.5 4.5M18.75 3.25 17.5 4.5M12 .75v1.5"/>',
    poses: { '*': { spark: { opacity: 0 } } },
    effect: { plug: fx.keys([{ translate: [0, 0] }, { translate: [0, -1.6], offset: 0.35 }, { translate: [0, 0.2], offset: 0.7 }, { translate: [0, 0] }], 600), spark: fx.flash(520, 160) }
  }),
  icon({
    id: 'bulb', name: ['전구', 'Light bulb'], color: C.yellow,
    keywords: '전구 아이디어 빛 조명 bulb idea light lamp',
    desc: ['켜질 때 전구가 깜빡이며 차오르고, 고른 간격의 빛줄기 다섯 개가 퍼집니다.', 'Switching on flickers the bulb full and five evenly spaced rays spread out.'],
    states: { off: ['꺼짐', 'Off'], on: ['켜짐', 'On'] },
    svg: '<path data-part="glow" class="f" d="M9 17.5v-1.3c0-1-.45-1.9-1.15-2.6A6 6 0 1 1 16.15 13.6c-.7.7-1.15 1.6-1.15 2.6v1.3z"/><path class="s" d="M9 17.5v-1.3c0-1-.45-1.9-1.15-2.6A6 6 0 1 1 16.15 13.6c-.7.7-1.15 1.6-1.15 2.6v1.3z"/><path d="M9.5 20.75h5"/><path data-part="rays" class="a" d="M4.4 9.6L2.8 9.6M6.63 4.23L5.49 3.09M12 2L12 0.4M17.37 4.23L18.51 3.09M19.6 9.6L21.2 9.6"/>',
    origins: { rays: [12, 9.6] },
    poses: { '*': { glow: { opacity: 0 }, rays: { opacity: 0, scale: 0.8 } }, on: { glow: { opacity: 1 }, rays: { opacity: 1, scale: 1 } } },
    transitions: { 'off>on': { glow: fx.keys([{ opacity: 0 }, { opacity: 1, offset: 0.15 }, { opacity: 0.2, offset: 0.3 }, { opacity: 1, offset: 0.5 }, { opacity: 1 }], 560, 'linear'), rays: { e: 'bouncy', delay: 200 } } },
    effect: { rays: fx.flash(640, 0, 0.8), glow: fx.keys([{ opacity: 0 }, { opacity: 0.7, offset: 0.3 }, { opacity: 0 }], 640, 'inOut') }
  }),
  icon({
    id: 'gamepad', name: ['게임패드', 'Gamepad'], color: C.purple,
    keywords: '게임패드 게임 컨트롤러 놀이 gamepad game controller play',
    desc: ['패드가 기울어지며 버튼이 차례로 눌립니다.', 'The pad tilts while the buttons press in turn.'],
    svg: '<path class="s" d="M6.5 6.5h11a4.5 4.5 0 0 1 4.4 3.6l1 5.1a3 3 0 0 1-5.2 2.6l-1.6-1.8H7.9l-1.6 1.8a3 3 0 0 1-5.2-2.6l1-5.1A4.5 4.5 0 0 1 6.5 6.5z"/><path d="M7.5 9.75v3.5M5.75 11.5h3.5"/><circle data-part="b1" class="f" cx="15.75" cy="12.75" r="1.15"/><circle data-part="b2" class="f" cx="18" cy="10.25" r="1.15"/>',
    origins: { '*': [12, 12], b1: [15.75, 12.75], b2: [18, 10.25] },
    effect: { '*': fx.keys([{ rotate: 0 }, { rotate: -7 }, { rotate: 6 }, { rotate: 0 }], 640), b1: fx.keys([{ scale: 1 }, { scale: 0.4, offset: 0.4 }, { scale: 1 }], 300, 'inOut', 120), b2: fx.keys([{ scale: 1 }, { scale: 0.4, offset: 0.4 }, { scale: 1 }], 300, 'inOut', 300) }
  }),
  icon({
    id: 'printer', name: ['프린터', 'Printer'], color: C.cyan,
    keywords: '프린터 인쇄 출력 종이 printer print output paper',
    desc: ['프린터가 덜컥이며 아래로 종이 한 장을 밀어냅니다.', 'The printer rattles and pushes out a sheet.'],
    svg: '<path d="M7 8V4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v4"/><path class="s" d="M6.5 17H4.5A1.5 1.5 0 0 1 3 15.5v-6A1.5 1.5 0 0 1 4.5 8h15A1.5 1.5 0 0 1 21 9.5v6a1.5 1.5 0 0 1-1.5 1.5h-2"/><path class="a" d="M17.5 11h.01"/><g data-part="sheet"><rect x="7" y="13.5" width="10" height="7.5" rx=".75"/><path class="a" d="M9.5 16.5h5M9.5 18.5h3"/></g>',
    origins: { sheet: [12, 13.5] },
    effect: { '*': fx.shake(0.5, 360), sheet: fx.keys([{ translate: [0, -4.5], opacity: -1 }, { translate: [0, -4.5], opacity: -1, offset: 0.3 }, { translate: [0, 0.6], opacity: 0, offset: 0.75 }, { translate: [0, 0], opacity: 0 }], 820, 'out') }
  }),
  icon({
    id: 'scan', name: ['문서 스캔', 'Scan'], color: C.lime,
    keywords: '스캔 문서 인식 촬영 scan document capture ocr',
    desc: ['빛줄기가 문서 위를 위아래로 훑습니다.', 'A light bar sweeps down the document and back.'],
    svg: '<path d="M3.5 7.5V5A1.5 1.5 0 0 1 5 3.5h2.5M16.5 3.5H19A1.5 1.5 0 0 1 20.5 5v2.5M20.5 16.5V19a1.5 1.5 0 0 1-1.5 1.5h-2.5M7.5 20.5H5A1.5 1.5 0 0 1 3.5 19v-2.5"/><rect class="s" x="7.5" y="6.5" width="9" height="11" rx="1"/><path d="M10 10h4M10 13h2.5"/><path data-part="bar" class="a" d="M5 12h14"/>',
    poses: { '*': { bar: { opacity: 0 } } },
    effect: { bar: fx.keys([{ translate: [0, -6], opacity: 0 }, { translate: [0, -5.5], opacity: 1, offset: 0.08 }, { translate: [0, 5.5], opacity: 1, offset: 0.5 }, { translate: [0, -5.5], opacity: 1, offset: 0.92 }, { translate: [0, -6], opacity: 0 }], 1100, 'inOut') }
  }),
  icon({
    id: 'watch', name: ['스마트워치', 'Watch'], color: C.coral,
    keywords: '시계 스마트워치 손목 시간 watch smartwatch wrist time',
    desc: ['시곗바늘이 한 바퀴 빠르게 돌고 크라운이 눌립니다.', 'The hands sweep a full turn and the crown clicks.'],
    svg: '<path d="M8.5 6 9.25 2.5h5.5L15.5 6M8.5 18l.75 3.5h5.5l.75-3.5"/><rect class="s" x="6" y="6" width="12" height="12" rx="3"/><path data-part="hands" class="a" d="M12 9.25V12l1.75 1.25"/><path data-part="crown" d="M18 10.5h1"/>',
    origins: { hands: [12, 12], crown: [18, 10.5] },
    effect: { hands: fx.spin(360, 820), crown: fx.nudge([-0.6, 0], 320) }
  }),
  icon({
    id: 'signal', name: ['신호', 'Signal'], color: C.green,
    keywords: '신호 세기 셀룰러 안테나 signal strength cellular bars',
    desc: ['막대가 왼쪽부터 차례로 솟아오르고, 검색 중에는 반복해서 깜빡입니다.', 'The bars rise from the left; searching makes them blink in sequence.'],
    states: { full: ['강함', 'Full'], searching: ['검색 중', 'Searching'] },
    svg: '<path data-part="b1" d="M5 19.5v-2"/><path data-part="b2" d="M9.67 19.5v-5"/><path data-part="b3" d="M14.33 19.5v-8.5"/><path data-part="b4" class="a" d="M19 19.5v-15"/>',
    origins: { b1: [5, 19.5], b2: [9.67, 19.5], b3: [14.33, 19.5], b4: [19, 19.5] },
    loops: { searching: Object.fromEntries(['b1', 'b2', 'b3', 'b4'].map((p, i) => [p, fx.keys([{ opacity: -0.75 }, { opacity: 0, offset: 0.2 }, { opacity: -0.75, offset: 0.45 }, { opacity: -0.75 }], 1400, 'inOut', i * 160)])) },
    effect: Object.fromEntries(['b1', 'b2', 'b3', 'b4'].map((p, i) => [p, fx.keys([{ scale: 1 }, { scale: [1, 0.05], offset: 0.01 }, { scale: [1, 0.05], offset: 0.1 + i * 0.12 }, { scale: [1, 1.1], offset: 0.35 + i * 0.12 }, { scale: 1, offset: 0.5 + i * 0.12 }, { scale: 1 }], 900, 'out')]))
  }),
  icon({
    id: 'router', name: ['공유기', 'Router'], color: C.teal,
    keywords: '공유기 라우터 네트워크 인터넷 router network internet modem',
    desc: ['전파가 안쪽부터 퍼지고 표시등이 깜빡입니다.', 'Waves spread from the inside out and the lights blink.'],
    svg: '<rect class="s" x="2.5" y="13" width="19" height="7.5" rx="2"/><path d="M12 13v-2.5"/><path data-part="w1" class="a" d="M9.75 8.25a3.2 3.2 0 0 1 4.5 0"/><path data-part="w2" class="a" d="M7.5 5.75a6.4 6.4 0 0 1 9 0"/><path data-part="leds" class="a" d="M6.5 16.75h.01M9.5 16.75h.01"/>',
    effect: { w1: fx.flash(520, 0, 0.9), w2: fx.flash(520, 160, 0.9), leds: fx.blink(420, 200) }
  }),
  icon({
    id: 'usb', name: ['USB', 'USB drive'], color: C.indigo,
    keywords: 'USB 메모리 저장 연결 usb drive storage stick',
    desc: ['드라이브가 위쪽 포트로 꽂히듯 밀려 올라갔다 내려오고, 표시등이 두 번 깜빡입니다.', 'The drive pushes up as if into a port, comes back, and its light blinks twice.'],
    svg: '<g data-part="drive"><rect x="8.5" y="2.5" width="7" height="5" rx=".75"/><path class="a" d="M10.75 5h.01M13.25 5h.01"/><path class="s" d="M7 7.5h10v11a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3z"/><path d="M10 12h4"/><path data-part="led" class="a" d="M12 16.5h.01"/></g>',
    origins: { drive: [12, 21.5], led: [12, 16.5] },
    poses: { '*': { led: { opacity: 0 } } },
    effect: {
      drive: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [0, 0.8], scale: [1.03, 0.97], offset: 0.18 }, { translate: [0, -2.4], scale: [0.98, 1.03], offset: 0.42, easing: 'out' }, { translate: [0, -2.4], scale: 1, offset: 0.55 }, { translate: [0, 0], scale: 1, offset: 0.85 }, { translate: [0, 0], scale: 1 }], 900),
      led: fx.keys([{ opacity: 0, scale: 1 }, { opacity: 0, offset: 0.42 }, { opacity: 1, scale: 1.6, offset: 0.5 }, { opacity: 0, scale: 1, offset: 0.62 }, { opacity: 1, scale: 1.6, offset: 0.72 }, { opacity: 0, scale: 1 }], 900, 'linear')
    }
  }),
  icon({
    id: 'cast', name: ['화면 전송', 'Cast'], color: C.cyan,
    keywords: '캐스트 미러링 화면공유 TV전송 cast mirror screen share airplay',
    desc: ['모서리에서 전파가 차례로 퍼지고, 전송 중에는 계속 반복됩니다.', 'Waves spread from the corner in turn; casting keeps them pulsing.'],
    states: { idle: ['대기', 'Idle'], casting: ['전송 중', 'Casting'] },
    svg: '<rect class="t" x="3" y="4" width="18" height="16" rx="2"/><path d="M3 8.5V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5.5"/><path class="a" d="M3 20h.01"/><path data-part="a1" class="a" d="M3 16.5A3.5 3.5 0 0 1 6.5 20"/><path data-part="a2" class="a" d="M3 12.5a7.5 7.5 0 0 1 7.5 7.5"/>',
    loops: { casting: { a1: fx.keys([{ opacity: -0.8 }, { opacity: 0, offset: 0.3 }, { opacity: -0.8, offset: 0.65 }, { opacity: -0.8 }], 1200, 'inOut'), a2: fx.keys([{ opacity: -0.8 }, { opacity: 0, offset: 0.3 }, { opacity: -0.8, offset: 0.65 }, { opacity: -0.8 }], 1200, 'inOut', 200) } },
    effect: { a1: fx.redraw(320, 0), a2: fx.redraw(380, 140) }
  })
]);
