import { C, icon, group, fx } from './_kit.js';

export default group('people', [
  icon({
    id: 'user', name: ['사용자', 'User'], color: C.blue,
    keywords: '사용자 프로필 계정 사람 user profile account person',
    desc: ['머리가 살짝 튀어 오르며 인사하듯 고개를 끄덕입니다.', 'The head bobs up like a friendly nod.'],
    svg: '<path data-part="body" class="s" d="M4.5 20.5c0-4 3.4-6.5 7.5-6.5s7.5 2.5 7.5 6.5"/><circle data-part="head" class="s" cx="12" cy="8" r="4"/>',
    origins: { body: [12, 20.5], head: [12, 12] },
    effect: { head: fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [0, -1.4], rotate: -6, offset: 0.35 }, { translate: [0, 0.2], rotate: 3, offset: 0.7 }, { translate: [0, 0], rotate: 0 }], 600), body: fx.keys([{ scale: 1 }, { scale: [1.04, 0.95], offset: 0.6 }, { scale: 1 }], 600) }
  }),
  icon({
    id: 'users', name: ['사용자 그룹', 'Users'], color: C.teal,
    keywords: '그룹 팀 멤버 사람들 users team group members',
    desc: ['뒤에 있던 사람이 옆으로 나왔다 들어가고 앞사람이 통 튑니다.', 'The person behind steps out and back while the front one hops.'],
    svg: '<g data-part="back" class="a"><path d="M15.5 4.6a3.5 3.5 0 0 1 0 6.8"/><path d="M17.5 14.6c2.4.6 4 2.6 4 5.9"/></g><g data-part="front"><path class="s" d="M2.5 20.5c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle class="s" cx="9" cy="8" r="3.5"/></g>',
    origins: { front: [9, 20.5] },
    effect: { back: fx.nudge([1.4, 0], 600), front: fx.hop(1.4, 560, 80) }
  }),
  icon({
    id: 'contact', name: ['연락처', 'Contacts'], color: C.orange,
    keywords: '연락처 주소록 전화번호부 명함 contacts address book directory',
    desc: ['주소록 탭이 차례로 튀어나오고 사람이 살짝 커집니다.', 'The index tabs pop out in turn and the person grows a little.'],
    svg: '<rect class="s" x="4.5" y="2.5" width="15" height="19" rx="2"/><path data-part="tabs" class="a" d="M2.5 7h3M2.5 12h3M2.5 17h3"/><g data-part="person"><circle cx="12" cy="10" r="2.75"/><path d="M7.75 17.5a4.25 4.25 0 0 1 8.5 0"/></g>',
    origins: { person: [12, 13], tabs: [5.5, 12] },
    effect: { tabs: fx.nudge([-1, 0], 480), person: fx.pop(1.12, 520, 100) }
  }),
  icon({
    id: 'handshake', name: ['악수', 'Handshake'], color: C.amber,
    keywords: '악수 협력 계약 파트너 동의 handshake deal partner agreement',
    desc: ['맞잡은 두 손이 위아래로 두 번 흔들립니다.', 'The clasped hands shake up and down twice.'],
    svg: '<path class="a" d="M2.5 6v8.5h2M21.5 6v8.5h-2"/><path d="M4.5 14.5l5 5a1.6 1.6 0 0 0 2.25-2.25M11.75 17.25l.75.75a1.6 1.6 0 0 0 2.25-2.25M14.75 15.75l.25.25a1.6 1.6 0 0 0 2.25-2.25L13 9.5"/><path d="M19.5 7.5h-3.25a3.5 3.5 0 0 0-2.47 1.02L9.9 12.4a1.6 1.6 0 0 0 2.26 2.26L15 12"/><path d="M4.5 7.5h3.75L10 8.25"/>',
    origins: { '*': [12, 12] },
    effect: { '*': fx.keys([[0, 0, 0], [0, -1.5, -3], [0, 1.3, 2.5], [0, -1, -2], [0, 0.5, 1], [0, 0, 0]].map(([x, y, r]) => ({ translate: [x, y], rotate: r })), 820) }
  }),
  icon({
    id: 'badge', name: ['메달', 'Medal'], color: C.orange,
    keywords: '메달 배지 수상 업적 badge medal award achievement',
    desc: ['리본에 매달린 메달이 시계추처럼 흔들리고, 가운데 별이 반짝 돕니다.', 'The medal swings from its ribbon like a pendulum and the star spins once.'],
    svg: '<path class="s" d="M7 2.5h3.5l2 4.5h-3.5zM17 2.5h-3.5l-2 4.5h3.5z"/><g data-part="medal"><circle class="s" cx="12" cy="14.5" r="6"/><path data-part="star" class="f" d="m12 11.1 1.05 2.13 2.35.34-1.7 1.66.4 2.34L12 16.46l-2.1 1.1.4-2.33-1.7-1.66 2.35-.34z"/></g>',
    origins: { medal: [12, 7], star: [12, 14.3] },
    effect: { medal: fx.wiggle(10, 950), star: fx.keys([{ rotate: 0, scale: 1 }, { rotate: 72, scale: 1.25, offset: 0.55 }, { rotate: 72, scale: 1 }], 700, 'inOut', 150) }
  }),
  icon({
    id: 'userplus', name: ['사용자 추가', 'Add user'], color: C.green,
    keywords: '초대 사용자추가 친구추가 가입 add user invite friend signup',
    desc: ['더하기 표시가 돌며 튀고 사람이 반깁니다.', 'The plus spins and pops while the person leans in.'],
    svg: '<path class="s" d="M2.5 20.5c0-3.8 3.1-6.5 7-6.5s7 2.7 7 6.5"/><circle data-part="head" class="s" cx="9.5" cy="8" r="3.75"/><path data-part="plus" class="a" d="M19 8v6M16 11h6"/>',
    origins: { plus: [19, 11], head: [9.5, 11.5] },
    effect: { plus: fx.keys([{ rotate: 0, scale: 1 }, { rotate: 100, scale: 1.25, offset: 0.55 }, { rotate: 90, scale: 1 }], 600), head: fx.turn(8, 560) }
  }),
  icon({
    id: 'crown', name: ['왕관', 'Crown'], color: C.yellow,
    keywords: '왕관 프리미엄 VIP 1등 crown premium vip king best',
    desc: ['왕관이 통 튀어 오르고 보석이 차례로 반짝입니다.', 'The crown hops and its jewels twinkle in turn.'],
    svg: '<path class="s" d="M3.5 8 7.5 12 12 5l4.5 7 4-4-1.75 10.5H5.25z"/><path d="M5.5 21h13"/><circle data-part="j1" class="f" cx="3.5" cy="8" r="1.3"/><circle data-part="j2" class="f" cx="12" cy="5" r="1.3"/><circle data-part="j3" class="f" cx="20.5" cy="8" r="1.3"/>',
    origins: { '*': [12, 21], j1: [3.5, 8], j2: [12, 5], j3: [20.5, 8] },
    effect: { '*': fx.hop(1.8, 600), j1: fx.pop(1.5, 360, 200), j2: fx.pop(1.5, 360, 280), j3: fx.pop(1.5, 360, 360) }
  }),
  icon({
    id: 'graduation', name: ['졸업', 'Graduation'], color: C.indigo,
    keywords: '졸업 학사모 교육 학습 강의 graduation education learn course',
    desc: ['학사모가 위로 던져졌다 내려오고, 끈에 달린 술이 흔들립니다.', 'The cap is tossed up and lands while its tassel swings on the cord.'],
    svg: '<path class="s" d="M12 4.5 22 9l-10 4.5L2 9z"/><path d="M6.5 11v4.25c0 1.5 2.5 2.75 5.5 2.75s5.5-1.25 5.5-2.75V11"/><path class="a" d="M12 9h8"/><g data-part="tassel"><path class="a" d="M20 9v5"/><path class="f" d="M19.15 14h1.7v2.5a.85.85 0 0 1-1.7 0z"/></g>',
    origins: { '*': [12, 18], tassel: [20, 9] },
    effect: { '*': fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [0, 0.5], rotate: 0, offset: 0.15 }, { translate: [0, -3], rotate: -10, offset: 0.5 }, { translate: [0, 0.3], rotate: 2, offset: 0.82 }, { translate: [0, 0], rotate: 0 }], 780), tassel: fx.wiggle(22, 900, 140) }
  }),
  icon({
    id: 'briefcase', name: ['서류 가방', 'Briefcase'], color: C.amber,
    keywords: '가방 업무 직장 비즈니스 포트폴리오 briefcase work job business',
    desc: ['가방을 손잡이로 들어 올리듯 흔들립니다.', 'It swings as if lifted by its handle.'],
    svg: '<path d="M8.5 7V5A1.5 1.5 0 0 1 10 3.5h4A1.5 1.5 0 0 1 15.5 5v2"/><rect class="s" x="2.5" y="7" width="19" height="13.5" rx="2"/><path d="M2.5 12.5h19"/><rect class="f" x="10.5" y="11" width="3" height="3" rx=".75"/>',
    origins: { '*': [12, 3.5] },
    effect: { '*': fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [0, -1.2], rotate: 6, offset: 0.3 }, { translate: [0, -0.6], rotate: -4, offset: 0.6 }, { translate: [0, 0], rotate: 0 }], 680) }
  }),
  icon({
    id: 'idcard', name: ['신분증', 'ID card'], color: C.cyan,
    keywords: '신분증 사원증 회원증 본인인증 id card identity membership',
    desc: ['사진이 튀어 오르고 정보 줄이 다시 쓰입니다.', 'The photo pops and the info lines rewrite.'],
    svg: '<rect class="s" x="2.5" y="5" width="19" height="14" rx="2"/><g data-part="photo"><circle cx="8" cy="10.5" r="2"/><path d="M5 16a3 3 0 0 1 6 0"/></g><path data-part="l1" class="a" d="M14 10h4"/><path data-part="l2" d="M14 13.5h4"/>',
    origins: { photo: [8, 13] },
    effect: { photo: fx.pop(1.15, 480), l1: fx.redraw(320, 140), l2: fx.redraw(320, 240) }
  }),
  icon({
    id: 'accessibility', name: ['접근성', 'Accessibility'], color: C.blue,
    keywords: '접근성 장애 포용 보조 accessibility a11y inclusive assist',
    desc: ['사람이 두 팔을 번쩍 들며 가볍게 뛰어오릅니다.', 'The figure raises both arms and gives a little jump.'],
    svg: '<circle class="s" cx="12" cy="12" r="9.25"/><circle class="f" cx="12" cy="7" r="1.5"/><path data-part="armL" d="M12 10.4c-1.6 0-3.15-.22-4.75-.65"/><path data-part="armR" d="M12 10.4c1.6 0 3.15-.22 4.75-.65"/><path d="M12 10.4v4.1M12 14.5l-2.6 4.25M12 14.5l2.6 4.25"/>',
    origins: { armL: [12, 10.4], armR: [12, 10.4], '*': [12, 21.25] },
    effect: { armL: fx.keys([{ rotate: 0 }, { rotate: 24, offset: 0.4 }, { rotate: 0 }], 660), armR: fx.keys([{ rotate: 0 }, { rotate: -24, offset: 0.4 }, { rotate: 0 }], 660), '*': fx.hop(1.4, 660) }
  })
]);
