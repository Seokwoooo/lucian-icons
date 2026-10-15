import { C, icon, group, fx } from './_kit.js';

export default group('commerce', [
  icon({
    id: 'cart', name: ['장바구니', 'Cart'], color: C.green,
    keywords: '장바구니 쇼핑 카트 담기 구매 cart shopping basket add buy',
    desc: ['상품이 바구니에 쏙 떨어지고 카트가 앞으로 굴러갑니다.', 'An item drops into the basket and the cart rolls forward.'],
    states: { empty: ['비어 있음', 'Empty'], added: ['담김', 'Added'] },
    svg: '<g data-part="cart"><path class="s" d="M5.6 6.5h14.9l-1.5 7a1.5 1.5 0 0 1-1.47 1.2H7.3"/><path d="M2.5 3.5h1.6a1 1 0 0 1 .98.8L7.6 17.5h11.4"/><circle cx="9" cy="20.25" r="1.25"/><circle cx="17" cy="20.25" r="1.25"/></g><rect data-part="item" class="f" x="10" y="8" width="5.5" height="4" rx=".9"/>',
    origins: { item: [12.75, 12] },
    poses: { '*': { item: { opacity: 0, translate: [0, -7], scale: 0.7 } }, added: { item: { opacity: 1, translate: [0, 0], scale: 1 } } },
    transitions: {
      'empty>added': { item: { e: 'bouncy' }, cart: fx.keys([{ translate: [0, 0] }, { translate: [0, 0], offset: 0.35 }, { translate: [0, 0.8], offset: 0.5 }, { translate: [0, 0] }], 520, 'out') },
      'added>empty': { item: { e: 'in', d: 200 } }
    },
    effect: { cart: fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [1.6, 0], rotate: -3, offset: 0.4 }, { translate: [-0.3, 0], rotate: 1, offset: 0.75 }, { translate: [0, 0], rotate: 0 }], 620), item: fx.nudge([1.6, -0.6], 620) }
  }),
  icon({
    id: 'bag', name: ['쇼핑백', 'Shopping bag'], color: C.coral,
    keywords: '쇼핑백 가방 구매 주문 bag shopping purchase order',
    desc: ['쇼핑백이 들리며 손잡이가 늘어났다 줄어듭니다.', 'The bag lifts and its handle stretches and springs back.'],
    svg: '<path class="s" d="M5.5 8h13l-.9 11.2a1.5 1.5 0 0 1-1.5 1.3H7.9a1.5 1.5 0 0 1-1.5-1.3z"/><path data-part="handle" class="a" d="M9 10.5V7a3 3 0 0 1 6 0v3.5"/>',
    origins: { handle: [12, 10.5], '*': [12, 20.5] },
    effect: { '*': fx.hop(1.8, 580), handle: fx.keys([{ scale: 1 }, { scale: [1, 1.18], offset: 0.45 }, { scale: [1, 0.94], offset: 0.75 }, { scale: 1 }], 580) }
  }),
  icon({
    id: 'wallet', name: ['지갑', 'Wallet'], color: C.amber,
    keywords: '지갑 결제 돈 카드 보관 wallet money pay cards',
    desc: ['지갑에서 카드가 슬쩍 올라왔다 들어가고 잠금 탭이 움직입니다.', 'A card slips up out of the wallet and the clasp tab shifts.'],
    svg: '<path data-part="card" d="M5.5 6.5 15 3.75a1 1 0 0 1 1.25.7l.55 2.05"/><rect class="s" x="3" y="6.5" width="18" height="13.5" rx="2.5"/><g data-part="tab"><path d="M21 11h-4a2 2 0 0 0 0 4h4"/><path class="a" d="M17 13h.01"/></g>',
    origins: { card: [10, 6.5] },
    effect: { card: fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [0, -1.6], rotate: -5, offset: 0.4 }, { translate: [0, 0.2], rotate: 0, offset: 0.75 }, { translate: [0, 0], rotate: 0 }], 620), tab: fx.nudge([0.8, 0], 520, 80) }
  }),
  icon({
    id: 'card', name: ['결제 카드', 'Payment card'], color: C.indigo,
    keywords: '카드 결제 신용카드 체크카드 비접촉 card payment credit debit contactless',
    desc: ['카드를 단말기에 대듯 기울이자 비접촉 신호가 퍼집니다.', 'The card tilts as if tapped and a contactless signal spreads.'],
    svg: '<g data-part="card"><rect class="s" x="2.5" y="5.5" width="19" height="13" rx="2.25"/><path d="M2.5 9.5h19"/><path class="a" d="M6 14.5h4"/></g><path data-part="waves" class="a" d="M16 12.75a2 2 0 0 1 0 3M18.25 11.5a4.5 4.5 0 0 1 0 5.5"/>',
    origins: { card: [12, 18.5] },
    poses: { '*': { waves: { opacity: 0 } } },
    effect: { card: fx.keys([{ skewX: 0, rotate: 0 }, { skewX: -8, rotate: -6, offset: 0.35 }, { skewX: 0, rotate: 0, offset: 0.7 }, { skewX: 0, rotate: 0 }], 700), waves: fx.flash(560, 200, 0.8) }
  }),
  icon({
    id: 'gift', name: ['선물', 'Gift'], color: C.red,
    keywords: '선물 이벤트 리워드 포장 gift present reward surprise',
    desc: ['뚜껑이 튀어 오르며 열리고 리본이 흔들립니다.', 'The lid pops open and the bow wobbles.'],
    states: { closed: ['닫힘', 'Closed'], open: ['열림', 'Open'] },
    svg: '<rect class="s" x="4.5" y="11" width="15" height="9.5" rx="1.5"/><path class="a" d="M12 11v9.5"/><g data-part="lid"><rect class="s" x="3" y="7.5" width="18" height="3.5" rx="1"/><path class="a" d="M12 7.5V11"/><path data-part="bow" d="M12 7.5c-1.5-3.5-4.5-4-4.5-2 0 1.5 2.5 2 4.5 2zm0 0c1.5-3.5 4.5-4 4.5-2 0 1.5-2.5 2-4.5 2z"/></g>',
    origins: { lid: [3, 11], bow: [12, 7.5] },
    poses: { open: { lid: { translate: [0, -3], rotate: -14 } } },
    motion: { e: 'bouncy' },
    effect: { lid: fx.keys([{ translate: [0, 0] }, { translate: [0, -1.5], offset: 0.35 }, { translate: [0, 0.2], offset: 0.7 }, { translate: [0, 0] }], 560), bow: fx.wiggle(12, 680, 80) }
  }),
  icon({
    id: 'ticket', name: ['티켓', 'Ticket'], color: C.violet,
    keywords: '티켓 입장권 쿠폰 예매 ticket coupon pass admission',
    desc: ['절취선을 따라 끝 조각이 살짝 찢겼다가 붙습니다.', 'The stub tears slightly along the perforation and snaps back.'],
    svg: '<path class="s" d="M15 5.5H4.5a2 2 0 0 0-2 2v2a2.5 2.5 0 0 1 0 5v2a2 2 0 0 0 2 2H15"/><path data-part="stub" class="s" d="M15 5.5h4.5a2 2 0 0 1 2 2v2a2.5 2.5 0 0 0 0 5v2a2 2 0 0 1-2 2H15"/><path class="a" d="M15 8v1.5M15 11.25v1.5M15 14.5V16"/>',
    origins: { stub: [15, 18.5] },
    effect: { stub: fx.keys([{ rotate: 0, translate: [0, 0] }, { rotate: 12, translate: [0.8, 0], offset: 0.4 }, { rotate: -2, translate: [0, 0], offset: 0.75 }, { rotate: 0, translate: [0, 0] }], 640) }
  }),
  icon({
    id: 'coin', name: ['동전', 'Coin'], color: C.yellow,
    keywords: '동전 돈 포인트 화폐 coin money points currency',
    desc: ['동전이 공중으로 튀어 오르며 두 번 뒤집힙니다.', 'The coin flips twice as it jumps.'],
    svg: '<g data-part="coin"><circle class="s" cx="12" cy="12" r="8.75"/><path class="a" d="M14 9.25c-.4-.75-1.2-1.25-2.25-1.25-1.4 0-2.25.75-2.25 1.75 0 2.4 4.75 1.4 4.75 4 0 1.1-1 1.75-2.5 1.75-1.1 0-2-.5-2.4-1.25M12 6.5V8m0 8v1.5"/></g>',
    origins: { coin: [12, 12] },
    effect: { coin: fx.keys([{ scale: 1, translate: [0, 0] }, { scale: [0.05, 1], translate: [0, -2], offset: 0.25 }, { scale: [1, 1], translate: [0, -3], offset: 0.5 }, { scale: [0.05, 1], translate: [0, -2], offset: 0.75 }, { scale: 1, translate: [0, 0] }], 820, 'linear') }
  }),
  icon({
    id: 'store', name: ['상점', 'Store'], color: C.teal,
    keywords: '상점 가게 매장 쇼핑몰 store shop market retail',
    desc: ['차양이 바람에 펄럭이고 문이 열렸다 닫힙니다.', 'The awning flutters and the door opens and shuts.'],
    svg: '<path d="M5 11.5v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8"/><path data-part="door" class="a" d="M10 20.5V16a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4.5"/><path data-part="awning" class="s" d="M3.5 9V7.75L5 3.5h14l1.5 4.25V9a2.83 2.83 0 0 1-4.25 2.45A2.9 2.9 0 0 1 12 11.5a2.9 2.9 0 0 1-4.25-.05A2.83 2.83 0 0 1 3.5 9z"/>',
    origins: { awning: [12, 3.5], door: [10, 17.75] },
    effect: { awning: fx.keys([{ scale: 1 }, { scale: [1, 1.12], offset: 0.3 }, { scale: [1, 0.94], offset: 0.6 }, { scale: 1 }], 620), door: fx.keys([{ scale: 1 }, { scale: [0.3, 1], offset: 0.45 }, { scale: 1 }], 620, 'inOut', 100) }
  }),
  icon({
    id: 'bank', name: ['은행', 'Bank'], color: C.violet,
    keywords: '은행 금융 계좌 송금 bank finance account transfer',
    desc: ['기둥이 바닥에서 솟아오르고 박공의 동전이 반짝입니다.', 'The columns rise from the base and the coin in the gable pops.'],
    svg: '<path class="s" d="M3 9.5 12 4l9 5.5z"/><path class="a" d="M12 7.25h.01"/><path data-part="cols" d="M5.5 9.5v8M10 9.5v8M14 9.5v8M18.5 9.5v8"/><path d="M3.5 20.25h17"/>',
    origins: { cols: [12, 17.5] },
    effect: { cols: fx.keys([{ scale: 1 }, { scale: [1, 0.3], offset: 0.3 }, { scale: [1, 1.08], offset: 0.65 }, { scale: 1 }], 600), '*': fx.keys([{ translate: [0, 0] }, { translate: [0, 0], offset: 0.6 }, { translate: [0, -0.6], offset: 0.75 }, { translate: [0, 0] }], 600) }
  }),
  icon({
    id: 'piggybank', name: ['저금통', 'Piggy bank'], color: C.pink,
    keywords: '저금통 저축 적금 모으기 piggy bank savings save deposit',
    desc: ['동전이 위에서 떨어져 등의 구멍으로 쏙 들어갑니다.', 'A coin drops from above and slips into the slot.'],
    svg: '<ellipse class="s" cx="11.25" cy="13" rx="7" ry="5.5"/><rect x="18" y="11.25" width="3" height="3.5" rx="1.2"/><path d="M13.25 7.7 14.5 5l1.6 3.1M7.5 17.75v2.75M14.75 17.75v2.75M4.5 12.25c-1.5 0-2.1-1.5-1-2.25"/><path class="a" d="M9.5 8.25h3"/><path d="M15.5 11h.01"/><circle data-part="coin" class="f" cx="11" cy="2.75" r="1.9"/>',
    origins: { coin: [11, 2.75] },
    poses: { '*': { coin: { opacity: 0 } } },
    effect: { coin: fx.keys([{ translate: [0, -1.5], opacity: 0, scale: 1 }, { translate: [0, 0], opacity: 1, offset: 0.25 }, { translate: [0, 4], opacity: 1, scale: [1, 0.9], offset: 0.6, easing: 'in' }, { translate: [0, 5.5], opacity: 0, scale: [1, 0.2] }], 760, 'out'), '*': fx.keys([{ translate: [0, 0] }, { translate: [0, 0], offset: 0.65 }, { translate: [0, 0.6], offset: 0.8 }, { translate: [0, 0] }], 760) }
  }),
  icon({
    id: 'truck', name: ['배송', 'Delivery'], color: C.blue,
    keywords: '배송 트럭 택배 운송 delivery truck shipping parcel',
    desc: ['트럭이 앞으로 출발하며 차체가 출렁이고 속도선이 지나갑니다.', 'The truck pulls forward with a bounce as speed lines pass.'],
    svg: '<g data-part="truck"><rect class="s" x="2.5" y="5.5" width="11.5" height="10" rx="1.5"/><path d="M14 9h3.6a1.5 1.5 0 0 1 1.2.6l2 2.6a1.5 1.5 0 0 1 .3.9v2.4H14"/><circle class="f" cx="7" cy="17.5" r="2"/><circle cx="7" cy="17.5" r="2"/><circle class="f" cx="17" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/></g><path data-part="speed" class="a" d="M1.5 8.5H0M1.5 11.5H-1"/>',
    poses: { '*': { speed: { opacity: 0 } } },
    effect: { truck: fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [-0.6, 0], rotate: 2, offset: 0.2 }, { translate: [1.6, 0], rotate: -2, offset: 0.5 }, { translate: [0, 0], rotate: 0 }], 680), speed: fx.keys([{ translate: [3, 0], opacity: 0 }, { translate: [2, 0], opacity: 1, offset: 0.3 }, { translate: [-1, 0], opacity: 0 }], 680, 'out', 120) }
  }),
  icon({
    id: 'scale', name: ['저울', 'Scale'], color: C.purple,
    keywords: '저울 균형 비교 법률 scale balance compare law',
    desc: ['저울대가 한쪽으로 기울었다가 균형을 찾습니다.', 'The beam tips to one side and finds its balance.'],
    svg: '<path d="M12 5v15.5M8 20.5h8"/><g data-part="beam"><path d="M4.5 6.5h15"/><path class="s" d="M2.5 13.5 4.5 7l2 6.5a2 2 0 0 1-4 0z"/><path class="s" d="M17.5 13.5 19.5 7l2 6.5a2 2 0 0 1-4 0z"/></g><circle class="f" cx="12" cy="4" r="1.4"/>',
    origins: { beam: [12, 6.5] },
    effect: { beam: fx.wiggle(10, 900) }
  }),
  icon({
    id: 'diamond', name: ['다이아몬드', 'Diamond'], color: C.cyan,
    keywords: '다이아몬드 보석 프리미엄 VIP diamond gem premium vip',
    desc: ['보석이 반짝 커지며 모서리에서 빛이 튑니다.', 'The gem swells and a glint flashes at its corner.'],
    svg: '<path class="s" d="M6.5 4h11l4 5.5L12 20.5 2.5 9.5z"/><path d="M2.5 9.5h19M9.5 4 8 9.5l4 11 4-11L14.5 4"/><path data-part="sp" class="a" d="M20.5 1.5v3M19 3h3"/>',
    origins: { '*': [12, 12], sp: [20.5, 3] },
    poses: { '*': { sp: { opacity: 0 } } },
    effect: { '*': fx.pop(1.1, 520), sp: fx.keys([{ opacity: 0, scale: 0.3, rotate: 0 }, { opacity: 1, scale: 1.2, rotate: 45, offset: 0.5 }, { opacity: 0, scale: 0.6, rotate: 90 }], 640, 'out', 120) }
  }),
  icon({
    id: 'barcode', name: ['바코드', 'Barcode'], color: C.red,
    keywords: '바코드 상품 스캔 재고 barcode product scan inventory sku',
    desc: ['빨간 레이저처럼 빛줄기가 바코드를 가로질러 훑습니다.', 'A laser line sweeps across the bars.'],
    svg: '<path d="M4 5v14M6.75 5v10M9.5 5v14M12.25 5v10M15 5v14M17.75 5v10M20.5 5v14"/><path data-part="laser" class="a" d="M2 12h20"/>',
    poses: { '*': { laser: { opacity: 0 } } },
    effect: { laser: fx.keys([{ translate: [0, -7], opacity: 0 }, { translate: [0, -6], opacity: 1, offset: 0.1 }, { translate: [0, 6], opacity: 1, offset: 0.88 }, { translate: [0, 7], opacity: 0 }], 860, 'inOut') }
  }),
  icon({
    id: 'box', name: ['택배 상자', 'Package'], color: C.orange,
    keywords: '상자 택배 포장 배송 box package parcel shipping',
    desc: ['상자가 통 튀어 오르고 테이프가 다시 붙습니다.', 'The box hops and its tape is pressed on again.'],
    svg: '<path class="s" d="M3.5 8.5 12 4l8.5 4.5v9L12 22l-8.5-4.5z"/><path d="M3.5 8.5 12 13l8.5-4.5M12 13v9"/><path data-part="tape" class="a" d="m7.75 6.25 8.5 4.5"/>',
    origins: { '*': [12, 22] },
    effect: { '*': fx.hop(1.8, 600), tape: fx.redraw(420, 200) }
  })
]);
