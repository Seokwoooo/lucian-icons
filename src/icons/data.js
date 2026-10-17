import { C, icon, group, fx, keycap } from './_kit.js';

const grow = (i, n = 3, d = 760) => fx.keys([{ scale: 1 }, { scale: [1, 0.02], offset: 0.01 }, { scale: [1, 0.02], offset: 0.05 + i * 0.12 }, { scale: [1, 1.08], offset: 0.45 + i * 0.12 }, { scale: 1, offset: Math.min(0.6 + i * 0.12, 1) }, { scale: 1 }], d, 'out');

export default group('data', [
  icon({
    id: 'database', name: ['데이터베이스', 'Database'], color: C.amber,
    keywords: '데이터베이스 저장소 DB 테이블 database storage db table',
    desc: ['맨 위 뚜껑이 떠올랐다 내려앉고 가운데 띠가 다시 그려집니다.', 'The top disc lifts and lands while the middle band redraws.'],
    svg: '<path class="s" d="M4.5 5.5v13c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75v-13"/><path data-part="band" class="a" d="M4.5 12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75"/><ellipse data-part="top" class="s" cx="12" cy="5.5" rx="7.5" ry="2.75"/>',
    effect: { top: fx.keys([{ translate: [0, 0] }, { translate: [0, -2], offset: 0.35 }, { translate: [0, 0.3], offset: 0.7 }, { translate: [0, 0] }], 620), band: fx.redraw(480, 160) }
  }),
  icon({
    id: 'server', name: ['서버', 'Server'], color: C.cyan,
    keywords: '서버 랙 호스팅 클라우드 server rack hosting infrastructure',
    desc: ['표시등이 번갈아 깜빡이고 아래 서랍이 살짝 밀려 나옵니다.', 'The status lights blink in turn and the lower unit slides out a little.'],
    svg: '<rect class="s" x="3" y="3.5" width="18" height="7.5" rx="2"/><path d="M11 7.25h6"/><path data-part="l1" class="a" d="M6.75 7.25h.01"/><g data-part="u2"><rect class="s" x="3" y="13" width="18" height="7.5" rx="2"/><path d="M11 16.75h6"/><path data-part="l2" class="a" d="M6.75 16.75h.01"/></g>',
    effect: { l1: fx.blink(420), l2: fx.blink(420, 200), u2: fx.nudge([1.4, 0], 560, 80) }
  }),
  icon({
    id: 'chart', name: ['막대 차트', 'Bar chart'], color: C.blue,
    keywords: '차트 그래프 통계 분석 막대 chart graph stats analytics bar',
    desc: ['막대가 왼쪽부터 차례로 바닥에서 솟아오릅니다.', 'The bars rise from the baseline one after another.'],
    svg: '<path d="M3 20.5h18"/><rect data-part="b1" class="s" x="4.5" y="12.5" width="4" height="6.5" rx="1"/><rect data-part="b2" class="s" x="10" y="8.5" width="4" height="10.5" rx="1"/><g data-part="b3"><rect class="f" x="15.5" y="4.5" width="4" height="14.5" rx="1"/><rect x="15.5" y="4.5" width="4" height="14.5" rx="1"/></g>',
    origins: { b1: [6.5, 19], b2: [12, 19], b3: [17.5, 19] },
    effect: { b1: grow(0), b2: grow(1), b3: grow(2) }
  }),
  icon({
    id: 'code', name: ['코드', 'Code'], color: C.violet,
    keywords: '코드 개발 프로그래밍 HTML code develop programming html',
    desc: ['괄호가 바깥으로 벌어지고 가운데 사선이 흔들립니다.', 'The brackets push outward and the slash rocks.'],
    svg: '<path data-part="l" d="m8 7.5-5 4.5 5 4.5"/><path data-part="r" d="m16 7.5 5 4.5-5 4.5"/><path data-part="slash" class="a" d="m14 4-4 16"/>',
    effect: { l: fx.nudge([-1.4, 0], 520), r: fx.nudge([1.4, 0], 520), slash: fx.wiggle(14, 620) }
  }),
  icon({
    id: 'terminal', name: ['터미널', 'Terminal'], color: C.green,
    keywords: '터미널 콘솔 명령어 셸 terminal console command shell cli',
    desc: ['프롬프트가 앞으로 밀리고 커서가 두 번 깜빡입니다.', 'The prompt nudges forward and the cursor blinks twice.'],
    svg: '<rect class="s" x="2.5" y="4" width="19" height="16" rx="2.5"/><path data-part="prompt" d="m6.5 9 3 3-3 3"/><path data-part="cursor" class="a" d="M12 15h5"/>',
    effect: { prompt: fx.nudge([1, 0], 440), cursor: fx.keys([{ opacity: 0 }, { opacity: -1, offset: 0.2 }, { opacity: 0, offset: 0.4 }, { opacity: -1, offset: 0.6 }, { opacity: 0, offset: 0.8 }], 900, 'linear') }
  }),
  icon({
    id: 'bug', name: ['버그', 'Bug'], color: C.red,
    keywords: '버그 오류 디버그 문제 bug error debug issue',
    desc: ['무당벌레가 다리 여섯 개를 번갈아 저으며 앞으로 기어가고, 더듬이가 까딱입니다.', 'The ladybug paddles its six legs in alternating steps as it crawls, and its feelers twitch.'],
    svg: '<g data-part="ant"><path d="M10.25 6.5 9 4.5M13.75 6.5 15 4.5"/></g><path data-part="l1" d="M7.45 12 5 10.25"/><path data-part="l2" d="M7 14.75H4.25"/><path data-part="l3" d="M7.8 17.75 5.5 19.5"/><path data-part="r1" d="M16.55 12 19 10.25"/><path data-part="r2" d="M17 14.75h2.75"/><path data-part="r3" d="M16.2 17.75l2.3 1.75"/><path class="s" d="M12 8.5c3 0 5 2.6 5 6s-2 6-5 6-5-2.6-5-6 2-6 5-6z"/><path d="M9.25 8.9a2.75 2.75 0 0 1 5.5 0M12 8.5v12"/><circle class="f" cx="9.75" cy="13.25" r="1"/><circle class="f" cx="14.25" cy="13.25" r="1"/><circle class="f" cx="9.9" cy="17" r=".9"/><circle class="f" cx="14.1" cy="17" r=".9"/>',
    origins: { ant: [12, 7], l1: [7.45, 12], l2: [7, 14.75], l3: [7.8, 17.75], r1: [16.55, 12], r2: [17, 14.75], r3: [16.2, 17.75], '*': [12, 14.5] },
    // Tripod gait: front-left, middle-right and back-left step together, then the other three.
    effect: {
      ...Object.fromEntries([['l1', -1, 1], ['r2', 1, 1], ['l3', -1, 1], ['r1', 1, -1], ['l2', -1, -1], ['r3', 1, -1]].map(([p, side, phase]) => [p, fx.keys([0, 1, -1, 1, -1, 0].map(v => ({ rotate: v * phase * side * 14 })), 760, 'inOut')])),
      ant: fx.keys([{ rotate: 0 }, { rotate: -6, offset: 0.3 }, { rotate: 5, offset: 0.65 }, { rotate: 0 }], 760),
      '*': fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [0, -0.5], rotate: -2.5, offset: 0.3 }, { translate: [0, -0.7], rotate: 2.5, offset: 0.65 }, { translate: [0, 0], rotate: 0 }], 760)
    }
  }),
  icon({
    id: 'branch', name: ['브랜치', 'Branch'], color: C.orange,
    keywords: '브랜치 깃 분기 버전 branch git fork version',
    desc: ['갈래 선이 다시 뻗어 나가고 끝의 점이 튀어 오릅니다.', 'The branch line grows out again and its node pops.'],
    svg: '<path d="M6 8.5v7"/><path data-part="curve" class="a" d="M18 10.5c0 3.3-2.7 6-6 6H8.4"/><circle class="s" cx="6" cy="6" r="2.5"/><circle class="s" cx="6" cy="18" r="2.5"/><g data-part="node"><circle class="f" cx="18" cy="8" r="2.5"/><circle cx="18" cy="8" r="2.5"/></g>',
    origins: { node: [18, 8] },
    effect: { curve: fx.keys([{ draw: 1, opacity: 0 }, { draw: 0, opacity: -1, offset: 0.01 }, { draw: 0, opacity: 0, offset: 0.1 }, { draw: 1, opacity: 0 }], 600, 'out'), node: fx.keys([{ scale: 1 }, { scale: 0.3, offset: 0.1 }, { scale: 0.3, offset: 0.55 }, { scale: 1.25, offset: 0.8 }, { scale: 1 }], 720) }
  }),
  icon({
    id: 'cpu', name: ['프로세서', 'Processor'], color: C.teal,
    keywords: '프로세서 칩 CPU 반도체 연산 cpu chip processor compute',
    desc: ['코어가 한 번 맥동하고, 신호가 네 변의 핀을 따라 한 바퀴 돕니다.', 'The core pulses once and a signal runs around the pins on all four sides.'],
    svg: '<path data-part="pt" d="M9.5 2.5V6M14.5 2.5V6"/><path data-part="pr" d="M18 9.5h3.5M18 14.5h3.5"/><path data-part="pb" d="M9.5 18v3.5M14.5 18v3.5"/><path data-part="pl" d="M2.5 9.5H6M2.5 14.5H6"/><rect class="s" x="6" y="6" width="12" height="12" rx="2"/><g data-part="core"><rect class="f" x="9.5" y="9.5" width="5" height="5" rx="1"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/></g>',
    origins: { core: [12, 12] },
    effect: {
      core: fx.keys([{ scale: 1 }, { scale: 0.78, offset: 0.2 }, { scale: 1.14, offset: 0.42 }, { scale: 1 }], 720),
      pt: fx.nudge([0, -1.2], 360, 200), pr: fx.nudge([1.2, 0], 360, 300), pb: fx.nudge([0, 1.2], 360, 400), pl: fx.nudge([-1.2, 0], 360, 500)
    }
  }),
  icon({
    id: 'linechart', name: ['선 그래프', 'Line chart'], color: C.pink,
    keywords: '선그래프 추세 성장 통계 line chart trend growth analytics',
    desc: ['추세선이 왼쪽부터 다시 그려지고 끝점이 튀어 오릅니다.', 'The trend line draws from the left and its end point pops.'],
    svg: '<path d="M3.5 3.5v15a2 2 0 0 0 2 2h15"/><path data-part="line" class="a" d="m7.5 15 4-4.5 3 3 5-6"/><circle data-part="dot" class="f" cx="19.5" cy="7.5" r="1.6"/>',
    origins: { dot: [19.5, 7.5] },
    effect: { line: fx.redraw(640), dot: fx.keys([{ scale: 1 }, { scale: 0, offset: 0.01 }, { scale: 0, offset: 0.65 }, { scale: 1.5, offset: 0.85 }, { scale: 1 }], 820) }
  }),
  icon({
    id: 'piechart', name: ['원 그래프', 'Pie chart'], color: C.yellow,
    keywords: '원그래프 파이 비율 점유율 pie chart share ratio',
    desc: ['조각 하나가 바깥으로 빠져나왔다가 다시 맞춰집니다.', 'One slice slides out of the pie and fits back in.'],
    svg: '<path class="s" d="M10.5 4.65A8 8 0 1 0 19.35 13.5H10.5z"/><g data-part="slice"><path class="f" d="M13.5 2.6a8 8 0 0 1 7.9 7.9h-7.9z"/><path d="M13.5 2.6a8 8 0 0 1 7.9 7.9h-7.9z"/></g>',
    effect: { slice: fx.nudge([1.4, -1.4], 620) }
  }),
  icon({
    id: 'calculator', name: ['계산기', 'Calculator'], color: C.coral,
    keywords: '계산기 계산 숫자 합계 calculator math numbers sum',
    desc: ['숫자 키가 하나씩 눌리고, 마지막에 등호 키를 누르면 화면이 톡 바뀝니다.', 'Number keys press one at a time, then the equals key goes down and the display pops.'],
    svg: `<rect class="s" x="5" y="2.5" width="14" height="19" rx="2.5"/><rect data-part="screen" class="f" x="7.75" y="5.25" width="8.5" height="3.75" rx="1"/><path d="M12 12.5h.01M8.75 15.5h.01M15.25 15.5h.01M8.75 18.5h.01M12 18.5h.01"/>${keycap('k1', 8.75, 12.5)}${keycap('k2', 15.25, 12.5)}${keycap('k3', 12, 15.5)}<path data-part="eq" class="a" d="M15.25 18.5h.01"/>`,
    origins: { k1: [8.75, 12.5], k2: [15.25, 12.5], k3: [12, 15.5], eq: [15.25, 18.5], screen: [12, 7.1] },
    poses: { '*': { k1a: { opacity: 0 }, k2a: { opacity: 0 }, k3a: { opacity: 0 } } },
    effect: {
      k1: fx.tap(0), k1a: fx.lit(0), k2: fx.tap(200), k2a: fx.lit(200), k3: fx.tap(400), k3a: fx.lit(400), eq: fx.tap(620, 260),
      screen: fx.keys([{ scale: 1 }, { scale: [1.08, 1.12], offset: 0.4 }, { scale: 1 }], 360, 'inOut', 760)
    }
  }),
  icon({
    id: 'percent', name: ['퍼센트', 'Percent'], color: C.purple,
    keywords: '퍼센트 할인 비율 세일 percent discount ratio sale',
    desc: ['사선이 다시 그어지고 두 원이 엇갈려 튑니다.', 'The slash redraws and the two circles bounce in turn.'],
    svg: '<path data-part="slash" d="M18.5 5.5 5.5 18.5"/><circle data-part="c1" class="s" cx="7" cy="7" r="2.5"/><g data-part="c2"><circle class="f" cx="17" cy="17" r="2.5"/><circle cx="17" cy="17" r="2.5"/></g>',
    origins: { c1: [7, 7], c2: [17, 17] },
    effect: { slash: fx.redraw(420), c1: fx.pop(1.25, 420, 120), c2: fx.pop(1.25, 420, 260) }
  })
]);
