import { C, icon, group, fx } from './_kit.js';

const HEART = 'M12 20s-8.25-4.67-8.25-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8.25 2.5C20.25 15.33 12 20 12 20z';

export default group('lifestyle', [
  icon({
    id: 'heart', name: ['하트', 'Heart'], color: C.red,
    keywords: '좋아요 하트 즐겨찾기 사랑 like heart favorite love',
    desc: ['누르면 움츠렸다 튀어 오르며 차오르고, 주변으로 작은 빛이 터집니다.', 'It crouches, springs, and fills, with a small burst around it.'],
    states: { off: ['꺼짐', 'Off'], on: ['좋아요', 'Liked'] },
    svg: `<g data-part="heart"><path data-part="fill" class="f" d="${HEART}"/><path class="s" d="${HEART}"/></g><path data-part="burst" class="a" d="M12 2.5v1.4M4.2 5.4l1 1M19.8 5.4l-1 1M1.9 12.2h1.4M20.7 12.2h1.4"/>`,
    origins: { heart: [12, 13], fill: [12, 13.5], burst: [12, 12] },
    poses: { '*': { fill: { scale: 0, opacity: 0 }, burst: { opacity: 0, scale: 0.7 } }, on: { fill: { scale: 1, opacity: 1 } } },
    transitions: {
      'off>on': {
        heart: fx.keys([{ scale: 1 }, { scale: 0.82, offset: 0.25, easing: 'out' }, { scale: 1.14, offset: 0.6, easing: 'inOut' }, { scale: 1 }], 560, 'linear'),
        fill: fx.keys([{ scale: 0, opacity: 0 }, { scale: 0.4, opacity: 1, offset: 0.25 }, { scale: 1, opacity: 1 }], 520, 'out'),
        burst: fx.keys([{ opacity: 0, scale: 0.7 }, { opacity: 0, scale: 0.7, offset: 0.35 }, { opacity: 1, scale: 1.05, offset: 0.55 }, { opacity: 0, scale: 1.3 }], 640, 'out')
      },
      'on>off': { heart: fx.keys([{ scale: 1 }, { scale: 0.9, offset: 0.4 }, { scale: 1 }], 380, 'out'), fill: { e: 'smooth', d: 260 } }
    },
    effect: { heart: fx.keys([{ scale: 1 }, { scale: 1.1, offset: 0.18 }, { scale: 0.98, offset: 0.36 }, { scale: 1.06, offset: 0.54 }, { scale: 1 }], 760, 'linear') }
  }),
  icon({
    id: 'calendar', name: ['달력', 'Calendar'], color: C.coral,
    keywords: '달력 일정 날짜 예약 calendar schedule date booking event',
    desc: ['선택된 날짜가 앞 칸에서 다음 칸으로 깡충 넘어가 자리 잡습니다.', 'The selected day hops from the previous slot to the next and settles in.'],
    svg: '<rect class="s" x="3.5" y="5" width="17" height="15.5" rx="2.25"/><path d="M3.5 10h17"/><path data-part="rings" d="M8 3v4M16 3v4"/><path d="M7.5 14h.01M10.75 14h.01M7.5 17.25h.01M10.75 17.25h.01"/><rect data-part="day" class="f" x="13.75" y="13.25" width="3.5" height="3.5" rx=".9"/>',
    origins: { day: [15.5, 15], rings: [12, 5] },
    effect: {
      day: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [0, 0], scale: 0.3, offset: 0.16 }, { translate: [-4.75, -1], scale: 0.3, offset: 0.17 }, { translate: [-4.75, -1], scale: 0.55, offset: 0.3 }, { translate: [0.3, -1.4], scale: 1.12, offset: 0.62, easing: 'out' }, { translate: [0, 0], scale: 1 }], 860),
      rings: fx.nudge([0, -0.8], 420)
    }
  }),
  icon({
    id: 'clock', name: ['시계', 'Clock'], color: C.blue,
    keywords: '시계 시간 기한 대기 clock time deadline hour',
    desc: ['분침이 한 바퀴 돌고 시침이 따라 움찔합니다.', 'The minute hand sweeps a full turn and the hour hand twitches along.'],
    svg: '<circle class="s" cx="12" cy="12" r="8.75"/><path data-part="h" d="M12 12V8"/><path data-part="m" class="a" d="m12 12 3.5 2"/>',
    origins: { h: [12, 12], m: [12, 12] },
    effect: { m: fx.spin(360, 900), h: fx.keys([{ rotate: 0 }, { rotate: 0, offset: 0.7 }, { rotate: 10, offset: 0.85 }, { rotate: 0 }], 900, 'inOut') }
  }),
  icon({
    id: 'stopwatch', name: ['스톱워치', 'Stopwatch'], color: C.orange,
    keywords: '스톱워치 타이머 측정 경과 stopwatch timer measure elapsed',
    desc: ['위쪽 버튼이 눌리면 바늘이 한 바퀴 돌고, 측정 중에는 계속 돕니다.', 'The top button clicks and the hand sweeps a full turn; while running it keeps going.'],
    states: { idle: ['대기', 'Idle'], running: ['측정 중', 'Running'] },
    svg: '<circle class="s" cx="12" cy="13.5" r="7.75"/><path data-part="btn" d="M12 5.75V3.5M9.75 2.75h4.5"/><path d="m18.25 7.25 1.5-1.5"/><path data-part="hand" class="a" d="M12 13.5V9"/><circle class="k" cx="12" cy="13.5" r="1.1"/>',
    origins: { hand: [12, 13.5], btn: [12, 4.5] },
    loops: { running: { hand: fx.keys([{ rotate: 0 }, { rotate: 360 }], 2000, 'linear') } },
    effect: { btn: fx.nudge([0, 1], 300), hand: fx.keys([{ rotate: 0 }, { rotate: 0, offset: 0.2 }, { rotate: 360 }], 1000, 'inOut') }
  }),
  icon({
    id: 'coffee', name: ['커피', 'Coffee'], color: C.amber,
    keywords: '커피 카페 휴식 음료 coffee cafe break drink',
    desc: ['김이 살짝 떠오르며 옅어져 사라지고, 잠시 뒤 제자리에 천천히 다시 피어납니다.', 'The steam lifts a little as it fades away, then slowly reappears in its place.'],
    // Only the two wisps: they drift up a touch and fade out like smoke, move back while invisible,
    // and fade in where they started.
    svg: '<path data-part="s1" class="a" d="M8.5 7c.8-.8.8-1.7 0-2.5s-.8-1.7 0-2.5"/><path data-part="s2" class="a" d="M12.5 7c.8-.8.8-1.7 0-2.5s-.8-1.7 0-2.5"/><path class="s" d="M4.5 9.5h12v5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z"/><path d="M16.5 10.5H18a2.5 2.5 0 0 1 0 5h-1.6"/>',
    origins: { s1: [8.5, 4.75], s2: [12.5, 4.75] },
    effect: Object.fromEntries([['s1', 0], ['s2', 260]].map(([p, delay]) => [p, fx.keys([
      { offset: 0, translate: [0, 0], scale: 1, opacity: 0, easing: 'out' },
      { offset: 0.5, translate: [0.2, -0.9], scale: [1.15, 1.05], opacity: -1 },
      { offset: 0.62, translate: [0, 0], scale: 1, opacity: -1, easing: 'inOut' },
      { offset: 1, translate: [0, 0], scale: 1, opacity: 0 }
    ], 2600, 'linear', delay)]))
  }),
  icon({
    id: 'trophy', name: ['트로피', 'Trophy'], color: C.yellow,
    keywords: '트로피 우승 성취 상 1위 trophy win award achievement',
    desc: ['트로피가 높이 들리고 가운데 별이 한 바퀴 돕니다.', 'The trophy lifts high and the star spins.'],
    svg: '<path d="M7 5.5H4.5a1 1 0 0 0-1 1A3.5 3.5 0 0 0 7 10m10-4.5h2.5a1 1 0 0 1 1 1A3.5 3.5 0 0 1 17 10M12 14.5v3"/><path class="s" d="M7 3.5h10v6a5 5 0 0 1-10 0z"/><path data-part="star" class="f" d="M12 5.9 12.8 7.7l1.95.15-1.5 1.25.47 1.9L12 10l-1.67 1 .47-1.9-1.5-1.25 1.95-.15z"/><path d="M8 20.5h8M9 20.5v-1A1.5 1.5 0 0 1 10.5 18h3a1.5 1.5 0 0 1 1.5 1.5v1"/>',
    origins: { star: [12, 8.4], '*': [12, 20.5] },
    effect: { '*': fx.hop(2, 620), star: fx.keys([{ rotate: 0, scale: 1 }, { rotate: 144, scale: 1.3, offset: 0.6 }, { rotate: 144, scale: 1 }], 720) }
  }),
  icon({
    id: 'utensils', name: ['식사', 'Dining'], color: C.coral,
    keywords: '식사 식당 맛집 음식 포크 나이프 dining restaurant food fork knife',
    desc: ['포크와 나이프가 서로를 향해 기울어 건배하듯 부딪혔다가 돌아옵니다.', 'The fork and knife lean in and clink together, then straighten.'],
    svg: '<path data-part="fork" d="M4.5 3v4.75a3 3 0 0 0 6 0V3M7.5 3v18"/><g data-part="knife"><path class="s" d="M19 14.5V3c-2.5.75-4 3.5-4 7.25v4.25z"/><path d="M19 14.5V21"/></g>',
    origins: { fork: [7.5, 21], knife: [19, 21] },
    effect: { fork: fx.keys([0, 9, -2, 0].map(r => ({ rotate: r })), 640), knife: fx.keys([0, -9, 2, 0].map(r => ({ rotate: r })), 640) }
  }),
  icon({
    id: 'cake', name: ['케이크', 'Cake'], color: C.pink,
    keywords: '케이크 생일 축하 기념일 디저트 cake birthday celebration anniversary',
    desc: ['촛불이 일렁이고 케이크가 살짝 들썩입니다.', 'The candle flame flickers and the cake gives a small hop.'],
    svg: '<path data-part="flame" class="f" d="M12 2.75c.9 1 1.4 1.8 1.4 2.6a1.4 1.4 0 0 1-2.8 0c0-.8.5-1.6 1.4-2.6z"/><path d="M12 12.5V8.5"/><path class="s" d="M4 20.5v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6"/><path class="a" d="M4 16c1.3 1 2.7 1 4 0s2.7-1 4 0 2.7 1 4 0 2.7-1 4 0"/><path d="M3 20.5h18"/>',
    origins: { flame: [12, 6.75], '*': [12, 20.5] },
    effect: { flame: fx.keys([{ scale: 1, skewX: 0 }, { scale: [0.85, 1.2], skewX: 8 }, { scale: [1.1, 0.9], skewX: -6 }, { scale: [0.9, 1.15], skewX: 4 }, { scale: 1, skewX: 0 }], 760, 'inOut'), '*': fx.hop(1, 520) }
  }),
  icon({
    id: 'pizza', name: ['피자', 'Pizza'], color: C.red,
    keywords: '피자 음식 배달 간식 pizza food delivery snack',
    desc: ['피자 조각이 들리며 페퍼로니가 차례로 튑니다.', 'The slice lifts as the pepperoni pop one by one.'],
    svg: '<path class="s" d="M12 21.5 3.5 6.5a17 17 0 0 1 17 0z"/><path d="M4.6 8.4a15 15 0 0 1 14.8 0"/><circle data-part="p1" class="f" cx="9.75" cy="11" r="1.35"/><circle data-part="p2" class="f" cx="14.25" cy="12" r="1.15"/><circle data-part="p3" class="f" cx="11.75" cy="15.75" r="1.05"/>',
    origins: { '*': [12, 21.5], p1: [9.75, 11], p2: [14.25, 12], p3: [11.75, 15.75] },
    effect: { '*': fx.keys([{ rotate: 0, translate: [0, 0] }, { rotate: -6, translate: [0, -1.2], offset: 0.4 }, { rotate: 2, translate: [0, 0], offset: 0.75 }, { rotate: 0, translate: [0, 0] }], 640), p1: fx.pop(1.4, 340, 120), p2: fx.pop(1.4, 340, 200), p3: fx.pop(1.4, 340, 280) }
  }),
  icon({
    id: 'bed', name: ['침대', 'Bed'], color: C.indigo,
    keywords: '침대 숙소 수면 호텔 휴식 bed sleep hotel stay rest',
    desc: ['이불이 숨 쉬듯 오르내리고 Z가 떠오릅니다.', 'The blanket rises and falls with breathing as a Z floats up.'],
    svg: '<path d="M2.5 5v15M2.5 16.5h19V20"/><rect class="s" x="4.5" y="10.5" width="4" height="3" rx="1.25"/><path data-part="blanket" class="s" d="M10 16.5v-6h8.5a3 3 0 0 1 3 3v3"/><path data-part="z" class="a" d="M15 3.5h3l-3 3h3"/>',
    origins: { blanket: [15, 16.5], z: [16.5, 5] },
    poses: { '*': { z: { opacity: 0 } } },
    effect: { blanket: fx.keys([{ scale: 1 }, { scale: [1, 1.12] }, { scale: 1 }], 900, 'inOut'), z: fx.keys([{ opacity: 0, translate: [0, 2], scale: 0.6 }, { opacity: 1, translate: [0, 0], scale: 1, offset: 0.4 }, { opacity: 0, translate: [1.5, -2], scale: 1.1 }], 900, 'out') }
  }),
  icon({
    id: 'lamp', name: ['스탠드', 'Lamp'], color: C.yellow,
    keywords: '스탠드 조명 램프 인테리어 lamp light interior desk',
    desc: ['줄을 당기면 갓이 깜빡이며 환해지고 양옆으로 빛줄기가 퍼집니다.', 'Pulling the cord flickers the shade bright and light spreads to both sides.'],
    states: { off: ['꺼짐', 'Off'], on: ['켜짐', 'On'] },
    svg: '<path data-part="glow" class="f" d="M8.6 3.5h6.8a1 1 0 0 1 .95.68l2.15 6.5a1 1 0 0 1-.95 1.32H6.45a1 1 0 0 1-.95-1.32l2.15-6.5a1 1 0 0 1 .95-.68z"/><path class="s" d="M8.6 3.5h6.8a1 1 0 0 1 .95.68l2.15 6.5a1 1 0 0 1-.95 1.32H6.45a1 1 0 0 1-.95-1.32l2.15-6.5a1 1 0 0 1 .95-.68z"/><path d="M12 12v8.5M8 20.5h8"/><path data-part="cord" class="a" d="M15 12v3"/><path data-part="rays" class="a" d="M6.25 13.75 4.75 15.5M17.75 13.75l1.5 1.75"/>',
    origins: { rays: [12, 12], cord: [15, 12] },
    poses: { '*': { glow: { opacity: 0 }, rays: { opacity: 0, scale: 0.6 } }, on: { glow: { opacity: 1 }, rays: { opacity: 1, scale: 1 } } },
    motion: { e: 'smooth' },
    transitions: {
      'off>on': { cord: fx.nudge([0, 1.2], 320), glow: fx.keys([{ opacity: 0 }, { opacity: 1, offset: 0.2 }, { opacity: 0.3, offset: 0.35 }, { opacity: 1, offset: 0.55 }, { opacity: 1 }], 560, 'linear', 120), rays: { e: 'bouncy', delay: 300 } },
      'on>off': { cord: fx.nudge([0, 1.2], 320), glow: { e: 'out', d: 200, delay: 120 }, rays: { e: 'out', d: 160, delay: 120 } }
    },
    effect: { cord: fx.nudge([0, 1.2], 380) }
  }),
  icon({
    id: 'dumbbell', name: ['덤벨', 'Dumbbell'], color: C.blue,
    keywords: '덤벨 운동 헬스 피트니스 dumbbell workout gym fitness',
    desc: ['덤벨을 두 번 번쩍 들어 올립니다.', 'The dumbbell is lifted twice.'],
    svg: '<path d="M7 12h10M2 9.5v5M22 9.5v5"/><rect class="s" x="3.5" y="7" width="3.5" height="10" rx="1.25"/><rect class="s" x="17" y="7" width="3.5" height="10" rx="1.25"/>',
    effect: { '*': fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [0, -2.5], rotate: -4, offset: 0.25 }, { translate: [0, 0], rotate: 0, offset: 0.5 }, { translate: [0, -2.5], rotate: 4, offset: 0.75 }, { translate: [0, 0], rotate: 0 }], 900, 'inOut') }
  }),
  icon({
    id: 'pill', name: ['약', 'Pill'], color: C.teal,
    keywords: '약 캡슐 건강 병원 처방 pill capsule health medicine pharmacy',
    desc: ['캡슐 두 반쪽이 축을 따라 벌어졌다가 딸깍 다시 끼워집니다.', 'The two halves of the capsule pull apart along its axis and click back together.'],
    svg: '<path data-part="h1" class="s" d="M9.7 9.7L14.3 14.3L10.76 17.83A3.25 3.25 45 0 1 6.17 13.24Z"/><g data-part="h2"><path class="f" d="M9.7 9.7L13.24 6.17A3.25 3.25 45 0 1 17.83 10.76L14.3 14.3Z"/><path d="M9.7 9.7L13.24 6.17A3.25 3.25 45 0 1 17.83 10.76L14.3 14.3Z"/></g>',
    effect: { h1: fx.nudge([-1.1, 1.1], 600), h2: fx.nudge([1.1, -1.1], 600) }
  }),
  icon({
    id: 'paw', name: ['반려동물', 'Pet paw'], color: C.amber,
    keywords: '반려동물 반려견 강아지 고양이 발자국 발바닥 펫 pet dog puppy cat paw animal',
    desc: ['발바닥이 꾹 눌렸다 올라오고, 발가락 젤리 네 개가 차례로 톡톡 튑니다.', 'The paw presses down and lifts, and the four toe beans pop one after another.'],
    svg: '<g data-part="paw"><path data-part="pad" class="f" d="M12 11.25c-2.7 0-5.75 3.4-5.75 6.1 0 1.65 1.25 2.65 2.85 2.65 1 0 1.85-.55 2.9-.55s1.9.55 2.9.55c1.6 0 2.85-1 2.85-2.65 0-2.7-3.05-6.1-5.75-6.1z"/><path data-part="t1" class="f" d="M4.24 10.72A1.55 2.1 -32 1 0 6.86 9.08A1.55 2.1 -32 1 0 4.24 10.72z"/><path data-part="t2" class="f" d="M7.63 6.55A1.7 2.25 -10 1 0 10.97 5.95A1.7 2.25 -10 1 0 7.63 6.55z"/><path data-part="t3" class="f" d="M13.03 5.95A1.7 2.25 10 1 0 16.37 6.55A1.7 2.25 10 1 0 13.03 5.95z"/><path data-part="t4" class="f" d="M17.14 9.08A1.55 2.1 32 1 0 19.76 10.72A1.55 2.1 32 1 0 17.14 9.08z"/></g>',
    origins: { paw: [12, 20], pad: [12, 16], t1: [5.55, 9.9], t2: [9.3, 6.25], t3: [14.7, 6.25], t4: [18.45, 9.9] },
    effect: {
      paw: fx.keys([{ scale: 1, translate: [0, 0] }, { scale: [1.04, 0.94], translate: [0, 0.3], offset: 0.25 }, { scale: [0.98, 1.03], translate: [0, -0.5], offset: 0.5 }, { scale: 1, translate: [0, 0], offset: 0.75 }, { scale: 1, translate: [0, 0] }], 800),
      t1: fx.pop(1.14, 360, 340), t2: fx.pop(1.14, 360, 420), t3: fx.pop(1.14, 360, 500), t4: fx.pop(1.14, 360, 580)
    }
  }),
  icon({
    id: 'dice', name: ['주사위', 'Dice'], color: C.violet,
    keywords: '주사위 게임 랜덤 운 확률 dice game random luck chance',
    desc: ['주사위가 튀어 오르며 구르고 다시 자리에 섭니다.', 'The die hops, rolls a quarter turn, and lands.'],
    svg: '<g data-part="die"><rect class="s" x="3.5" y="3.5" width="17" height="17" rx="3.5"/><circle class="k" cx="8" cy="8" r="1.3"/><circle class="k" cx="16" cy="8" r="1.3"/><circle class="f" cx="12" cy="12" r="1.5"/><circle class="k" cx="8" cy="16" r="1.3"/><circle class="k" cx="16" cy="16" r="1.3"/></g>',
    origins: { die: [12, 12] },
    effect: { die: fx.keys([{ rotate: 0, translate: [0, 0] }, { rotate: 0, translate: [0, 0.5], offset: 0.12 }, { rotate: 60, translate: [0, -2.5], offset: 0.5 }, { rotate: 96, translate: [0, 0], offset: 0.8 }, { rotate: 90, translate: [0, 0] }], 820, 'inOut') }
  })
]);
