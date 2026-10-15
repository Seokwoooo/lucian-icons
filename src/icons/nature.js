import { C, icon, group, fx } from './_kit.js';

const fall = (delay = 0) => fx.keys([{ translate: [0, 0], opacity: 0 }, { translate: [-0.6, 1.6], opacity: -1, offset: 0.4 }, { translate: [0.6, -1.6], opacity: -1, offset: 0.41 }, { translate: [0, 0], opacity: 0 }], 700, 'linear', delay);

export default group('nature', [
  icon({
    id: 'sun', name: ['해', 'Sun'], color: C.amber,
    keywords: '해 햇빛 맑음 낮 밝은테마 sun sunny day light mode',
    desc: ['빛살이 반 칸 돌며 퍼지고 해가 숨 쉬듯 커집니다.', 'The rays turn a notch and spread while the sun swells.'],
    svg: '<circle data-part="core" class="s" cx="12" cy="12" r="4"/><path data-part="rays" class="a" d="M12 2.5v2M12 19.5v2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M2.5 12h2M19.5 12h2M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
    origins: { core: [12, 12], rays: [12, 12] },
    effect: { rays: fx.keys([{ rotate: 0, scale: 1 }, { rotate: 45, scale: 1.12, offset: 0.6 }, { rotate: 45, scale: 1 }], 820), core: fx.pop(1.15, 620) }
  }),
  icon({
    id: 'moon', name: ['달', 'Moon'], color: C.violet,
    keywords: '달 밤 야간 다크모드 수면 moon night dark mode sleep',
    desc: ['초승달이 고개를 기울이고 곁의 별이 반짝입니다.', 'The crescent tilts its head and the stars twinkle.'],
    svg: '<path data-part="moon" class="s" d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.75 6.75 0 0 0 10.5 10.5z"/><path data-part="s1" class="a" d="M17 3v2.5M15.75 4.25h2.5"/><path data-part="s2" class="a" d="M21 8.5h.01"/>',
    origins: { moon: [12, 12], s1: [17, 4.25], s2: [21, 8.5] },
    effect: { moon: fx.turn(-14, 760), s1: fx.keys([{ scale: 1, rotate: 0 }, { scale: 0.2, rotate: 45, offset: 0.4 }, { scale: 1.3, rotate: 90, offset: 0.75 }, { scale: 1, rotate: 90 }], 760), s2: fx.blink(420, 300) }
  }),
  icon({
    id: 'umbrella', name: ['우산', 'Umbrella'], color: C.purple,
    keywords: '우산 비 날씨 보호 보험 umbrella rain weather cover insurance',
    desc: ['접으면 우산살이 모이며 가늘어지고, 펴면 스프링처럼 활짝 펼쳐집니다.', 'Closing gathers the canopy thin; opening springs it wide.'],
    states: { open: ['펼침', 'Open'], closed: ['접힘', 'Closed'] },
    svg: '<path data-part="canopy" class="s" d="M3 12a9 9 0 0 1 18 0 3 2 0 0 0-6 0 3 2 0 0 0-6 0 3 2 0 0 0-6 0z"/><path d="M12 3V2M12 12v7.5a2 2 0 0 1-4 0"/><path data-part="drops" class="a" d="M5 16v1.5M18.5 15v1.5"/>',
    origins: { canopy: [12, 3] },
    poses: { closed: { canopy: { scale: [0.22, 1.12] }, drops: { opacity: 0 } } },
    motion: { e: 'bouncy' },
    effect: { canopy: fx.keys([{ scale: 1 }, { scale: [0.8, 1.04], offset: 0.35 }, { scale: [1.05, 0.97], offset: 0.7 }, { scale: 1 }], 620), drops: fall(0) }
  }),
  icon({
    id: 'rain', name: ['비', 'Rain'], color: C.indigo,
    keywords: '비 날씨 소나기 구름 rain weather shower cloud',
    desc: ['빗방울이 구름 아래로 사선을 그리며 떨어집니다.', 'Raindrops slant down from the cloud.'],
    svg: '<path class="s" d="M7 15A4 4 0 0 1 6.6 7.03a5.25 5.25 0 0 1 10.15-.82A4.4 4.4 0 0 1 17 15z"/><path data-part="d1" class="a" d="m8.5 18-1 2.5"/><path data-part="d2" class="a" d="m12.5 18-1 2.5"/><path data-part="d3" class="a" d="m16.5 18-1 2.5"/>',
    effect: { d1: fall(0), d2: fall(120), d3: fall(240) }
  }),
  icon({
    id: 'snow', name: ['눈', 'Snow'], color: C.cyan,
    keywords: '눈 겨울 추위 눈송이 냉동 snow winter cold snowflake freeze',
    desc: ['눈송이가 60도 돌며 반짝 커집니다.', 'The snowflake turns sixty degrees and sparkles.'],
    svg: '<circle class="t" cx="12" cy="12" r="3.5"/><g data-part="flake"><path d="M12 12V2.75M12 12l8.01-4.63M12 12l8.01 4.62M12 12v9.25M12 12l-8.01 4.63M12 12 3.99 7.37"/><path class="a" d="M9.75 4.5 12 6.75l2.25-2.25M17.37 6.3l-.82 3.08 3.07.82M19.62 13.8l-3.07.82.82 3.08M14.25 19.5 12 17.25 9.75 19.5M6.63 17.7l.82-3.07-3.07-.83M4.38 10.2l3.07-.82-.82-3.08"/></g>',
    origins: { flake: [12, 12] },
    effect: { flake: fx.keys([{ rotate: 0, scale: 1 }, { rotate: 70, scale: 1.12, offset: 0.65 }, { rotate: 60, scale: 1 }], 820) }
  }),
  icon({
    id: 'wind', name: ['바람', 'Wind'], color: C.teal,
    keywords: '바람 공기 환기 날씨 wind air breeze weather',
    desc: ['바람 줄기가 왼쪽부터 한 줄씩 불어와 끝에서 말립니다.', 'Gusts sweep in from the left one line at a time and curl at the ends.'],
    svg: '<path data-part="w1" d="M3 8.5h9A2.5 2.5 0 1 0 9.5 6"/><path data-part="w2" class="a" d="M3 12.5h14.5a2.75 2.75 0 1 1-2.75 2.75"/><path data-part="w3" d="M3 16.5h6"/>',
    effect: { w1: fx.redraw(560, 0), w2: fx.redraw(620, 140), w3: fx.redraw(420, 280) }
  }),
  icon({
    id: 'thermometer', name: ['온도계', 'Thermometer'], color: C.red,
    keywords: '온도 온도계 기온 열 temperature thermometer heat weather',
    desc: ['수은주가 내려갔다가 힘차게 올라갑니다.', 'The mercury dips, then climbs.'],
    svg: '<path class="s" d="M14 14.76V4.5a2 2 0 0 0-4 0v10.26a4 4 0 1 0 4 0z"/><path data-part="merc" class="a" d="M12 17.5V9"/><circle class="f" cx="12" cy="17.5" r="2"/><path d="M17 6h1.5M17 9h1.5M17 12h1.5"/>',
    origins: { merc: [12, 17.5] },
    effect: { merc: fx.keys([{ scale: 1 }, { scale: [1, 0.3], offset: 0.3 }, { scale: [1, 1.15], offset: 0.7 }, { scale: 1 }], 820) }
  }),
  icon({
    id: 'bolt', name: ['번개', 'Lightning'], color: C.yellow,
    keywords: '번개 전기 빠른 에너지 즉시 lightning bolt electric fast energy instant',
    desc: ['번개가 번쩍 깜빡이며 커집니다.', 'The bolt flashes and jolts bigger.'],
    svg: '<path data-part="fill" class="f" d="M13.5 2.5 4.5 13.5h7l-1 8 9-11h-7z"/><path d="M13.5 2.5 4.5 13.5h7l-1 8 9-11h-7z"/>',
    origins: { '*': [12, 12] },
    effect: { fill: fx.keys([{ opacity: 0 }, { opacity: -1, offset: 0.15 }, { opacity: 0, offset: 0.3 }, { opacity: -1, offset: 0.45 }, { opacity: 0, offset: 0.6 }], 640, 'linear'), '*': fx.pop(1.12, 640) }
  }),
  icon({
    id: 'flame', name: ['불꽃', 'Flame'], color: C.orange,
    keywords: '불 불꽃 인기 핫 트렌드 fire flame hot trending popular',
    desc: ['불꽃이 일렁이며 위로 솟고 안쪽 불씨가 커집니다.', 'The flame flickers upward and the inner ember grows.'],
    svg: '<path data-part="outer" class="s" d="M12 21.5c3.6 0 6.5-2.7 6.5-6.3 0-3.2-2-5.6-3.7-7.4-.4 1.7-1.4 3-2.8 3.6.3-3.4-1-6.4-3.8-8.4.3 2.6-.8 4.6-2.2 6.4-1.3 1.6-.5 3.2-.5 5.8 0 3.6 2.9 6.3 6.5 6.3z"/><path data-part="inner" class="f" d="M12 21.5c-1.6 0-3-1.3-3-3 0-1.9 1.6-3.1 2.5-4.5.6 1 1.4 1.7 2.4 2 .7.6 1.1 1.5 1.1 2.5 0 1.7-1.4 3-3 3z"/>',
    origins: { outer: [12, 21.5], inner: [12, 21.5] },
    effect: { outer: fx.keys([{ scale: 1, skewX: 0 }, { scale: [0.96, 1.08], skewX: 4 }, { scale: [1.03, 0.95], skewX: -3 }, { scale: [0.97, 1.06], skewX: 2 }, { scale: 1, skewX: 0 }], 820), inner: fx.keys([{ scale: 1 }, { scale: 1.25 }, { scale: 0.9 }, { scale: 1.15 }, { scale: 1 }], 820) }
  }),
  icon({
    id: 'droplet', name: ['물방울', 'Droplet'], color: C.blue,
    keywords: '물 물방울 습도 액체 water droplet humidity liquid',
    desc: ['물방울이 떨어지듯 튀어 오르며 납작해졌다 돌아옵니다.', 'The drop hops, flattens on landing, and recovers.'],
    svg: '<path class="s" d="M12 2.75s-6.5 7-6.5 11.5a6.5 6.5 0 0 0 13 0C18.5 9.75 12 2.75 12 2.75z"/><path class="a" d="M8.75 14.5a3.25 3.25 0 0 0 2.5 3"/>',
    origins: { '*': [12, 20.75] },
    effect: { '*': fx.hop(2.4, 680) }
  }),
  icon({
    id: 'leaf', name: ['나뭇잎', 'Leaf'], color: C.lime,
    keywords: '잎 친환경 자연 성장 식물 leaf eco nature green plant',
    desc: ['잎이 줄기를 축으로 바람에 흔들립니다.', 'The leaf sways on its stem in the breeze.'],
    svg: '<path class="s" d="M6 18C6 10 11 5 20 4c-.5 9-5.5 14-14 14z"/><path d="M3.5 20.5 6 18"/><path class="a" d="m6 18 7.5-7.5"/>',
    origins: { '*': [4, 20] },
    effect: { '*': fx.wiggle(10, 900) }
  }),
  icon({
    id: 'flower', name: ['꽃', 'Flower'], color: C.pink,
    keywords: '꽃 봄 정원 선물 아름다움 flower spring garden bloom',
    desc: ['꽃잎이 한 칸 돌며 피어나고 가운데 꽃술이 튑니다.', 'The petals turn and bloom while the center pops.'],
    svg: '<path d="M12 14.5v7M12 18.5c-1.2-1.6-2.8-2.2-4.5-2 .2 1.7 1.6 2.9 4.5 2z"/><g data-part="petals"><circle class="s" cx="12" cy="5.25" r="2.75"/><circle class="s" cx="16.3" cy="8.4" r="2.75"/><circle class="s" cx="14.65" cy="13.45" r="2.75"/><circle class="s" cx="9.35" cy="13.45" r="2.75"/><circle class="s" cx="7.7" cy="8.4" r="2.75"/></g><circle data-part="center" class="f" cx="12" cy="9.75" r="2"/>',
    origins: { petals: [12, 9.75], center: [12, 9.75] },
    effect: { petals: fx.keys([{ rotate: 0, scale: 1 }, { rotate: 36, scale: 0.85, offset: 0.4 }, { rotate: 72, scale: 1.06, offset: 0.8 }, { rotate: 72, scale: 1 }], 820), center: fx.pop(1.35, 520, 200) }
  }),
  icon({
    id: 'tree', name: ['나무', 'Tree'], color: C.green,
    keywords: '나무 숲 자연 환경 성장 tree forest nature environment growth',
    desc: ['나뭇가지가 바람에 휘었다가 돌아옵니다.', 'The canopy bends in the wind and springs back.'],
    svg: '<path d="M12 21.5v-6"/><g data-part="canopy"><path class="s" d="M12 2.75a5 5 0 0 0-4.9 6A4.5 4.5 0 0 0 8 17.5h8a4.5 4.5 0 0 0 .9-8.75A5 5 0 0 0 12 2.75z"/><path class="a" d="m12 15 2.25-2.25M12 12.75l-2-2"/></g>',
    origins: { canopy: [12, 21.5] },
    effect: { canopy: fx.keys([0, 7, -5, 3, 0].map(r => ({ rotate: r })), 900, 'inOut') }
  })
]);
