import { C, icon, group, fx } from './_kit.js';

export default group('travel', [
  icon({
    id: 'globe', name: ['지구', 'Globe'], color: C.blue,
    keywords: '지구 세계 글로벌 언어 웹 globe world global language web',
    desc: ['경선이 좁아졌다 넓어지며 지구가 도는 것처럼 보입니다.', 'The meridian narrows and widens as if the globe were turning.'],
    svg: '<circle class="s" cx="12" cy="12" r="8.75"/><path d="M3.5 12h17"/><path data-part="mer" class="a" d="M12 3.25c-2.4 2.4-3.6 5.3-3.6 8.75s1.2 6.35 3.6 8.75c2.4-2.4 3.6-5.3 3.6-8.75S14.4 5.65 12 3.25z"/>',
    origins: { mer: [12, 12] },
    effect: { mer: fx.keys([{ scale: 1 }, { scale: [0.08, 1], offset: 0.25 }, { scale: [1.45, 1], offset: 0.5 }, { scale: [0.08, 1], offset: 0.75 }, { scale: 1 }], 1000, 'linear') }
  }),
  icon({
    id: 'compass', name: ['나침반', 'Compass'], color: C.coral,
    keywords: '나침반 방향 탐색 둘러보기 compass direction explore navigate',
    desc: ['바늘이 빙글 돌다가 흔들리며 북쪽을 찾습니다.', 'The needle spins, wavers, and settles on north.'],
    svg: '<circle class="s" cx="12" cy="12" r="8.75"/><g data-part="needle"><path class="f" d="M15.5 8.5 13.4 13.4 10.6 10.6z"/><path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9z"/></g>',
    origins: { needle: [12, 12] },
    effect: { needle: fx.keys([{ rotate: 0 }, { rotate: 410, offset: 0.45 }, { rotate: 330, offset: 0.65 }, { rotate: 375, offset: 0.82 }, { rotate: 360 }], 1100, 'inOut') }
  }),
  icon({
    id: 'pin', name: ['위치', 'Location'], color: C.red,
    keywords: '위치 핀 지도 장소 주소 location pin map place address',
    desc: ['핀이 위에서 떨어져 꽂히며 살짝 눌렸다 섭니다.', 'The pin drops in, squashes on landing, and stands up.'],
    svg: '<g data-part="pin"><path class="s" d="M12 21.5s6.5-5.6 6.5-11.25a6.5 6.5 0 0 0-13 0C5.5 15.9 12 21.5 12 21.5z"/><circle class="f" cx="12" cy="10.25" r="2.4"/></g>',
    origins: { pin: [12, 21.5] },
    effect: { pin: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [0, -3.5], scale: 1, offset: 0.3, easing: 'in' }, { translate: [0, 0], scale: [1.1, 0.88], offset: 0.55, easing: 'out' }, { translate: [0, 0], scale: [0.97, 1.03], offset: 0.75 }, { translate: [0, 0], scale: 1 }], 720, 'linear') }
  }),
  icon({
    id: 'flag', name: ['깃발', 'Flag'], color: C.coral,
    keywords: '깃발 목표 신고 표시 flag goal report mark',
    desc: ['깃발이 깃대에서 바람에 펄럭입니다.', 'The flag ripples in the wind from its pole.'],
    svg: '<path d="M5 21.5V3.5"/><g data-part="cloth"><path class="f" d="M5 4h12.5L15 8.25l2.5 4.25H5"/><path d="M5 4h12.5L15 8.25l2.5 4.25H5"/></g>',
    origins: { cloth: [5, 8.25] },
    effect: { cloth: fx.keys([{ scale: 1, skewX: 0 }, { scale: [0.9, 1.04], skewX: 6, offset: 0.25 }, { scale: [1.04, 0.97], skewX: -5, offset: 0.5 }, { scale: [0.96, 1.02], skewX: 3, offset: 0.75 }, { scale: 1, skewX: 0 }], 900, 'inOut') }
  }),
  icon({
    id: 'map', name: ['지도', 'Map'], color: C.green,
    keywords: '지도 길찾기 여행 경로 map route travel directions',
    desc: ['접힌 지도가 좁아졌다가 탁 펼쳐지고 위치 점이 튑니다.', 'The folded map squeezes and snaps open while its dot pops.'],
    svg: '<g data-part="map"><path class="s" d="M9 4.5 3.5 6.5v13l5.5-2 6 2 5.5-2v-13l-5.5 2z"/><path d="M9 4.5v13M15 6.5v13"/></g><circle data-part="dot" class="f" cx="12" cy="11" r="1.5"/>',
    origins: { map: [12, 12], dot: [12, 11] },
    effect: { map: fx.keys([{ scale: 1 }, { scale: [0.72, 1], offset: 0.35 }, { scale: [1.05, 1], offset: 0.7 }, { scale: 1 }], 640), dot: fx.pop(1.6, 420, 260) }
  }),
  icon({
    id: 'car', name: ['자동차', 'Car'], color: C.red,
    keywords: '자동차 차량 운전 이동 car vehicle drive ride',
    desc: ['차체가 서스펜션처럼 출렁이고 전조등이 깜빡입니다.', 'The body bounces on its suspension and the headlights flash.'],
    svg: '<g data-part="body"><path class="s" d="M5 11 6.6 6.2A1.75 1.75 0 0 1 8.25 5h7.5a1.75 1.75 0 0 1 1.65 1.2L19 11"/><rect class="s" x="3" y="11" width="18" height="6.5" rx="2"/><path data-part="lights" class="a" d="M6.5 14.25h1.5M16 14.25h1.5"/></g><path d="M5.5 17.5v2M18.5 17.5v2"/>',
    origins: { body: [12, 17.5] },
    effect: { body: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [0, 0.8], scale: [1.03, 0.96], offset: 0.25 }, { translate: [0, -0.5], scale: 1, offset: 0.55 }, { translate: [0, 0.2], offset: 0.8 }, { translate: [0, 0], scale: 1 }], 680), lights: fx.blink(380, 120) }
  }),
  icon({
    id: 'bike', name: ['자전거', 'Bicycle'], color: C.lime,
    keywords: '자전거 라이딩 운동 이동 bicycle bike ride cycling',
    desc: ['자전거가 앞바퀴를 살짝 들며 앞으로 나아갑니다.', 'The bike rolls forward with a small wheelie.'],
    svg: '<circle class="s" cx="5.5" cy="16" r="3.5"/><circle class="s" cx="18.5" cy="16" r="3.5"/><path d="M5.5 16 9.5 9h6.5l2.5 7M9.5 9l2.5 7 4-7"/><path class="a" d="M8 7h3M15 7.25l1-.75"/>',
    origins: { '*': [5.5, 19.5] },
    effect: { '*': fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [1, 0], rotate: -8, offset: 0.4 }, { translate: [1.5, 0], rotate: 0, offset: 0.7 }, { translate: [0, 0], rotate: 0 }], 760) }
  }),
  icon({
    id: 'plane', name: ['비행기', 'Plane'], color: C.cyan,
    keywords: '비행기 항공 여행 출발 plane flight travel departure',
    desc: ['비행기가 오른쪽 위로 치솟았다가 비행운을 남기고 돌아옵니다.', 'The plane climbs to the upper right and returns, leaving trails.'],
    svg: '<path data-part="trail" class="a" d="M5 15.5 2.5 18M8.5 19 6 21.5"/><g data-part="plane"><g transform="rotate(45 12 12)"><path class="s" d="M12 2.5c.9 0 1.5 1 1.5 2.5v4.75l7 4.25v2l-7-2.25V18l2 1.5V21L12 20l-3.5 1v-1.5l2-1.5v-4.25L3.5 16v-2l7-4.25V5c0-1.5.6-2.5 1.5-2.5z"/></g></g>',
    poses: { '*': { trail: { opacity: 0 } } },
    effect: { plane: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [-0.5, 0.5], scale: 0.95, offset: 0.2 }, { translate: [1.8, -1.8], scale: 1.05, offset: 0.55 }, { translate: [0, 0], scale: 1 }], 820), trail: fx.keys([{ opacity: 0, translate: [0, 0] }, { opacity: 1, translate: [0.6, -0.6], offset: 0.45 }, { opacity: 0, translate: [-1, 1] }], 820, 'out', 120) }
  }),
  icon({
    id: 'train', name: ['기차', 'Train'], color: C.indigo,
    keywords: '기차 지하철 열차 교통 train subway rail transit',
    desc: ['기차가 덜컹덜컹 두 번 흔들리고 전조등이 켜집니다.', 'The train clatters twice and its lights come on.'],
    svg: '<g data-part="body"><rect class="s" x="5" y="3" width="14" height="14.5" rx="3"/><rect x="7.5" y="5.5" width="9" height="4.5" rx="1"/><path data-part="lights" class="a" d="M8.5 14h.01M15.5 14h.01"/></g><path d="m8 17.5-2 3.5M16 17.5l2 3.5"/>',
    origins: { body: [12, 17.5] },
    effect: { body: fx.keys([[0, 0], [0, -0.8], [0, 0], [0, -0.8], [0, 0]].map(t => ({ translate: t })), 560, 'inOut'), lights: fx.blink(420, 200) }
  }),
  icon({
    id: 'bus', name: ['버스', 'Bus'], color: C.yellow,
    keywords: '버스 대중교통 정류장 통학 bus transit public transport',
    desc: ['버스가 정류장에 서듯 앞으로 쏠렸다가 돌아옵니다.', 'The bus pitches forward as if stopping, then settles.'],
    svg: '<g data-part="body"><rect class="s" x="4.5" y="3" width="15" height="15" rx="2.5"/><rect x="6.75" y="5.5" width="10.5" height="5.5" rx="1"/><path class="a" d="M7.75 14.5h.01M16.25 14.5h.01"/></g><path d="M4.5 7.5H3M19.5 7.5H21M7.5 18v2.5M16.5 18v2.5"/>',
    origins: { body: [12, 18] },
    effect: { body: fx.keys([{ rotate: 0, translate: [0, 0] }, { rotate: 0, translate: [1.2, 0], offset: 0.3 }, { rotate: 4, translate: [0.6, 0], offset: 0.55 }, { rotate: -1, translate: [0, 0], offset: 0.8 }, { rotate: 0, translate: [0, 0] }], 700) }
  }),
  icon({
    id: 'ship', name: ['배', 'Ship'], color: C.blue,
    keywords: '배 선박 항해 해운 크루즈 ship boat sail cruise',
    desc: ['배가 파도 위에서 좌우로 흔들립니다.', 'The ship rocks on the waves.'],
    svg: '<g data-part="boat"><path class="a" d="M10.5 8.5v-3h3v3"/><path d="M7 13.5V9.5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4"/><path class="s" d="M3 13.5h18l-2.2 4.4a2 2 0 0 1-1.8 1.1H7a2 2 0 0 1-1.8-1.1z"/></g><path data-part="waves" d="M3 21.75c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1"/>',
    origins: { boat: [12, 18] },
    effect: { boat: fx.keys([0, -6, 5, -3, 0].map(r => ({ rotate: r })), 900), waves: fx.keys([{ translate: [0, 0] }, { translate: [-1.5, 0] }, { translate: [0, 0] }], 900) }
  }),
  icon({
    id: 'anchor', name: ['닻', 'Anchor'], color: C.teal,
    keywords: '닻 정박 항구 바다 고정 anchor harbor sea pin',
    desc: ['닻이 고리를 축으로 시계추처럼 흔들립니다.', 'The anchor swings like a pendulum from its ring.'],
    svg: '<circle class="s" cx="12" cy="5" r="2"/><path d="M12 7v14M8.5 10.5h7"/><path class="a" d="M4.5 13.5a7.5 7.5 0 0 0 15 0M3 15l1.5-1.5L6 15m12 0 1.5-1.5L21 15"/>',
    origins: { '*': [12, 3] },
    effect: { '*': fx.wiggle(12, 900) }
  }),
  icon({
    id: 'building', name: ['건물', 'Building'], color: C.violet,
    keywords: '건물 회사 빌딩 사무실 building company office city',
    desc: ['창문 불이 아래층부터 차례로 켜집니다.', 'The windows light up floor by floor.'],
    svg: '<rect class="s" x="5" y="2.5" width="14" height="19" rx="1.5"/><path data-part="w1" class="a" d="M9 15h.01M15 15h.01"/><path data-part="w2" class="a" d="M9 11h.01M12 11h.01M15 11h.01"/><path data-part="w3" class="a" d="M9 7h.01M12 7h.01M15 7h.01"/><path d="M10 21.5V18h4v3.5"/>',
    effect: { w1: fx.blink(300, 0), w2: fx.blink(300, 120), w3: fx.blink(300, 240) }
  }),
  icon({
    id: 'mountain', name: ['산', 'Mountain'], color: C.orange,
    keywords: '산 등산 아웃도어 풍경 mountain hiking outdoor landscape',
    desc: ['산 뒤에서 해가 떠오르고 봉우리가 반짝입니다.', 'The sun rises behind the peaks.'],
    svg: '<circle data-part="sun" class="f" cx="17.25" cy="6" r="2"/><path class="s" d="m2.5 19.5 6.5-11 3.5 6 2.5-3.5 6.5 8.5z"/><path class="a" d="m7.25 11.5 1.75 1 1.5-1"/>',
    origins: { sun: [17.25, 6] },
    effect: { sun: fx.keys([{ translate: [0, 4], opacity: -1, scale: 0.6 }, { translate: [0, -0.6], opacity: 0, scale: 1.12, offset: 0.65 }, { translate: [0, 0], scale: 1 }], 780, 'out') }
  }),
  icon({
    id: 'rocket', name: ['로켓', 'Rocket'], color: C.violet,
    keywords: '로켓 출시 시작 성장 부스트 rocket launch start growth boost',
    desc: ['불꽃이 커지며 로켓이 떨리다가 앞으로 치고 나갑니다.', 'The flame flares, the rocket shudders, then surges forward.'],
    svg: '<path data-part="flame" class="a" d="M6.5 17.5c-1.3 1-2 2.6-2 4 1.4 0 3-.7 4-2"/><g data-part="rocket"><path d="M8 12 4.5 12.5 3 15l4.5.5M12 16l-.5 3.5L9 21l-.5-4.5"/><path class="s" d="M14.5 4.5c2.2-1.4 4.4-1.9 6.1-1.6.3 1.7-.2 3.9-1.6 6.1L12 16l-4-4z"/><circle class="f" cx="15.5" cy="8.5" r="1.5"/></g>',
    origins: { flame: [6.5, 17.5], rocket: [12, 12] },
    effect: {
      flame: fx.keys([{ scale: 1 }, { scale: 1.5, offset: 0.2 }, { scale: 1.1, offset: 0.35 }, { scale: 1.6, offset: 0.5 }, { scale: 1 }], 820, 'linear'),
      rocket: fx.keys([{ translate: [0, 0] }, { translate: [-0.3, 0.3] }, { translate: [0.3, -0.3] }, { translate: [-0.3, 0.3] }, { translate: [1.8, -1.8], offset: 0.65 }, { translate: [0, 0] }], 820)
    }
  })
]);
