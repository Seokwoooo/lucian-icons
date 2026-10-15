import { C, icon, group, fx } from './_kit.js';

export default group('travel', [
  icon({
    id: 'globe', name: ['지구', 'Globe'], color: C.blue,
    keywords: '지구 세계 글로벌 언어 웹 인터넷 globe world global language web internet',
    desc: ['경선이 바깥으로 돌아 나가고 새 경선이 가운데서 피어나며 지구가 돕니다. 점 하나가 적도를 따라 지나갑니다.', 'Meridians roll outward as a new one opens from the middle, and a dot travels along the equator as the globe turns.'],
    svg: '<circle class="s" cx="12" cy="12" r="9"/><path d="M3 12h18"/><path data-part="lens" class="a" d="M12 3c-2.6 2.5-3.9 5.5-3.9 9s1.3 6.5 3.9 9c2.6-2.5 3.9-5.5 3.9-9S14.6 5.5 12 3z"/><path data-part="wide" class="a" d="M12 3c-4.7 2.5-7 5.5-7 9s2.3 6.5 7 9c4.7-2.5 7-5.5 7-9S16.7 5.5 12 3z"/><path data-part="axis" class="a" d="M12 3v18"/><circle data-part="dot" class="f" cx="12" cy="12" r="1.4"/>',
    origins: { dot: [12, 12] },
    poses: { '*': { wide: { opacity: 0 }, axis: { opacity: 0 }, dot: { opacity: 0 } } },
    effect: {
      lens: fx.keys([{ opacity: 0 }, { opacity: 0, offset: 0.05 }, { opacity: -1, offset: 0.25 }, { opacity: -1, offset: 0.7 }, { opacity: 0, offset: 0.92 }, { opacity: 0 }], 1100, 'linear'),
      wide: fx.keys([{ opacity: 0 }, { opacity: 0, offset: 0.05 }, { opacity: 1, offset: 0.22 }, { opacity: 1, offset: 0.3 }, { opacity: 0, offset: 0.45 }, { opacity: 0 }], 1100, 'linear'),
      axis: fx.keys([{ opacity: 0 }, { opacity: 0, offset: 0.4 }, { opacity: 1, offset: 0.52 }, { opacity: 1, offset: 0.62 }, { opacity: 0, offset: 0.86 }, { opacity: 0 }], 1100, 'linear'),
      dot: fx.keys([{ translate: [-7.5, 0], scale: 0.4, opacity: 0 }, { translate: [-5.3, 0], scale: 0.7, opacity: 1, offset: 0.2 }, { translate: [0, 0], scale: 1, opacity: 1, offset: 0.5 }, { translate: [5.3, 0], scale: 0.7, opacity: 1, offset: 0.8 }, { translate: [7.5, 0], scale: 0.4, opacity: 0 }], 1100, 'linear')
    }
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
    desc: ['물결 모양 천이 깃대를 따라 부드럽게 나부낍니다.', 'The wavy cloth flutters gently along the pole.'],
    svg: '<path d="M5 21.5V3"/><g data-part="cloth"><path class="f" d="M5 4c1.6-.9 3.3-1 5-.4 1.9.7 3.4 1.6 5.4 1.4 1.1-.1 2.2-.5 3.1-1v8.5c-.9.5-2 .9-3.1 1-2 .2-3.5-.7-5.4-1.4-1.7-.6-3.4-.5-5 .4z"/><path d="M5 4c1.6-.9 3.3-1 5-.4 1.9.7 3.4 1.6 5.4 1.4 1.1-.1 2.2-.5 3.1-1v8.5c-.9.5-2 .9-3.1 1-2 .2-3.5-.7-5.4-1.4-1.7-.6-3.4-.5-5 .4"/></g>',
    origins: { cloth: [5, 8.25] },
    effect: { cloth: fx.keys([{ skewY: 0, scale: 1 }, { skewY: -4, scale: [0.95, 1], offset: 0.25 }, { skewY: 3, scale: [1.02, 1], offset: 0.5 }, { skewY: -2, scale: [0.98, 1], offset: 0.75 }, { skewY: 0, scale: 1 }], 1100) }
  }),
  icon({
    id: 'map', name: ['지도', 'Map'], color: C.green,
    keywords: '지도 길찾기 여행 경로 map route travel directions',
    desc: ['지도가 살짝 펼쳐지고, 위치 핀이 위로 떠올랐다가 톡 떨어져 꽂힙니다.', 'The map spreads a little and the location pin lifts, then drops into place.'],
    svg: '<g data-part="map"><path class="s" d="M9 5.5 3.5 7.5v12l5.5-2 6 2 5.5-2v-12l-5.5 2z"/><path d="M9 5.5v12M15 7.5v12"/></g><path data-part="pin" class="f" fill-rule="evenodd" d="M12 8.25a2.6 2.6 0 0 1 2.6 2.6c0 2-2.6 4.4-2.6 4.4s-2.6-2.4-2.6-4.4A2.6 2.6 0 0 1 12 8.25zm0 1.75a.85.85 0 1 0 0 1.7.85.85 0 0 0 0-1.7z"/>',
    origins: { map: [12, 12.5], pin: [12, 15.25] },
    effect: {
      map: fx.keys([{ scale: 1 }, { scale: [0.94, 1], offset: 0.3 }, { scale: [1.02, 1], offset: 0.62 }, { scale: 1 }], 680),
      pin: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [0, -4], scale: 1, offset: 0.34, easing: 'in' }, { translate: [0, 0.3], scale: [1.25, 0.8], offset: 0.58, easing: 'out' }, { translate: [0, 0], scale: 1.08, offset: 0.76 }, { translate: [0, 0], scale: 1 }], 820)
    }
  }),
  icon({
    id: 'car', name: ['자동차', 'Car'], color: C.red,
    keywords: '자동차 차량 운전 이동 car vehicle drive ride',
    desc: ['자동차가 살짝 뒤로 몸을 젖혔다가 앞으로 튀어 나가고, 뒤에 속도선이 스칩니다.', 'The car rocks back, lunges forward, and speed lines streak behind it.'],
    svg: '<g data-part="car"><path class="s" d="M5 16.5H4a1 1 0 0 1-1-1v-2.6a1.5 1.5 0 0 1 1.1-1.45l2.4-.65 2.3-3.4A1.5 1.5 0 0 1 10 6.75h5a1.5 1.5 0 0 1 1.15.55l2.9 3.5 1.9.4A1.5 1.5 0 0 1 22 12.65v2.85a1 1 0 0 1-1 1h-2M9 16.5h6"/><path class="a" d="M8.4 10.6 10.1 8.25h4.6l1.95 2.35z"/><circle cx="7" cy="16.5" r="2"/><circle cx="17" cy="16.5" r="2"/></g><path data-part="speed" class="a" d="M.75 10.5h2M.25 13.5h1.75"/>',
    origins: { car: [12, 18.5] },
    poses: { '*': { speed: { opacity: 0 } } },
    effect: {
      car: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [-0.6, 0], scale: [0.98, 1.02], offset: 0.18 }, { translate: [1.4, 0], scale: [1.02, 0.98], offset: 0.45 }, { translate: [-0.3, 0], scale: 1, offset: 0.75 }, { translate: [0, 0], scale: 1 }], 780),
      speed: fx.keys([{ opacity: 0, translate: [0, 0] }, { opacity: 0, translate: [0, 0], offset: 0.25 }, { opacity: 1, translate: [-0.4, 0], offset: 0.4 }, { opacity: 0, translate: [-1.5, 0], offset: 0.7 }, { opacity: 0, translate: [0, 0] }], 780, 'linear')
    }
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
    desc: ['기차가 선로 위에서 덜컹거리며 다가오고, 전조등이 깜빡입니다.', 'The train rattles toward you on its track and the headlights blink.'],
    svg: '<g data-part="body"><path class="s" d="M6 15.5V7.5a4.5 4.5 0 0 1 4.5-4.5h3A4.5 4.5 0 0 1 18 7.5v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"/><path d="M8.5 6.5h7a1 1 0 0 1 1 1V10a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7.5a1 1 0 0 1 1-1z"/><path data-part="lights" class="a" d="M9 14.25h.01M15 14.25h.01"/></g><path d="M8.5 17.5 6.5 21.5M15.5 17.5l2 4M7.6 19.5h8.8"/>',
    origins: { body: [12, 17.5], lights: [12, 14.25] },
    effect: {
      body: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [0, -1], scale: 1.03, offset: 0.25 }, { translate: [0, 0], scale: 1.05, offset: 0.5 }, { translate: [0, -1], scale: 1.03, offset: 0.75 }, { translate: [0, 0], scale: 1 }], 800),
      lights: fx.keys([{ opacity: 0, scale: 1 }, { opacity: -1, scale: 1, offset: 0.2 }, { opacity: 0, scale: 1.8, offset: 0.4 }, { opacity: -1, scale: 1, offset: 0.6 }, { opacity: 0, scale: 1.8, offset: 0.8 }, { opacity: 0, scale: 1 }], 800, 'linear')
    }
  }),
  icon({
    id: 'bus', name: ['버스', 'Bus'], color: C.yellow,
    keywords: '버스 대중교통 정류장 통학 bus transit public transport',
    desc: ['버스가 출발하며 앞으로 나가고, 차체가 뒤로 살짝 기울었다가 바로 섭니다.', 'The bus pulls away; the body tilts back a little and then rights itself.'],
    svg: '<g data-part="bus"><path class="t" d="M4 5h14.5a3 3 0 0 1 3 3v3h-19V6.5A1.5 1.5 0 0 1 4 5z"/><path class="s" d="M4.5 17H4a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 4 5h14.5a3 3 0 0 1 3 3v7.5A1.5 1.5 0 0 1 20 17h-1M8.5 17H15"/><path d="M2.5 11h19M7.5 5v6M12.5 5v6M17 5v6"/></g><circle cx="6.5" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
    origins: { bus: [6.5, 17] },
    effect: {
      '*': fx.keys([{ translate: [0, 0] }, { translate: [1.3, 0], offset: 0.35 }, { translate: [-0.3, 0], offset: 0.7 }, { translate: [0, 0] }], 760),
      bus: fx.keys([{ rotate: 0 }, { rotate: -2.5, offset: 0.3 }, { rotate: 1.2, offset: 0.6 }, { rotate: 0 }], 760)
    }
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
    svg: '<rect class="s" x="5" y="2.5" width="14" height="19" rx="1.5"/><path data-part="w1" class="a" d="M9 15h.01M15 15h.01"/><path data-part="w2" class="a" d="M9 11h.01M12 11h.01M15 11h.01"/><path data-part="w3" class="a" d="M9 7h.01M12 7h.01M15 7h.01"/><path class="f" d="M10 21.5V18a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3.5z"/><path d="M10 21.5V18a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3.5"/><circle class="k" cx="12.9" cy="19.4" r=".6"/>',
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
    desc: ['로켓이 살짝 웅크렸다가 꼬리 불꽃이 커지며 비스듬히 솟구치고 돌아옵니다.', 'The rocket crouches, its tail flame flares, and it shoots up diagonally before settling.'],
    svg: '<g data-part="ship"><path data-part="flame" class="f" d="M7.8 13.37L10.63 16.2C9.15 17.68 7.45 18.25 5.51 18.49C5.75 16.55 6.32 14.85 7.8 13.37Z"/><path class="s" d="M19.29 4.71C19.65 8.45 18.27 11.74 15.58 14.43L12.22 17.79L6.21 11.78L9.57 8.42C12.26 5.73 15.55 4.35 19.29 4.71Z"/><path d="M9.04 8.95L5.51 8.95L3.21 11.25L6.21 11.78M15.05 14.96L15.05 18.49L12.75 20.79L12.22 17.79"/><path class="f" d="M15.94 8.06A1.75 1.75 45 1 1 13.46 10.54A1.75 1.75 45 0 1 15.94 8.06Z"/><path d="M15.94 8.06A1.75 1.75 45 1 1 13.46 10.54A1.75 1.75 45 0 1 15.94 8.06Z"/></g>',
    origins: { flame: [9.22, 14.78], ship: [12, 12] },
    effect: {
      ship: fx.keys([{ translate: [0, 0] }, { translate: [-0.5, 0.5], offset: 0.16 }, { translate: [2, -2], offset: 0.5 }, { translate: [-0.3, 0.3], offset: 0.8 }, { translate: [0, 0] }], 900),
      flame: fx.keys([{ scale: 1 }, { scale: 0.7, offset: 0.16 }, { scale: 1.5, offset: 0.45 }, { scale: 1 }], 900)
    }
  })
]);
