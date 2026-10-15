import { C, icon, group, fx } from './_kit.js';

const CHECK_IN = fx.keys([{ draw: 0, opacity: 0 }, { draw: 0.05, opacity: 1, offset: 0.1 }, { draw: 1, opacity: 1 }], 380, 'out', 120);

export default group('communication', [
  icon({
    id: 'envelope', name: ['봉투', 'Envelope'], color: C.blue,
    keywords: '메일 편지 이메일 메시지 받은편지 mail email letter message',
    desc: ['열면 봉인이 톡 떨어지고 덮개가 위로 젖혀집니다. 닫으면 덮개가 내려와 다시 봉인됩니다.', 'Opening pops the seal and folds the flap up; closing brings the flap down and seals it again.'],
    states: { closed: ['닫힘', 'Closed'], open: ['열림', 'Open'] },
    svg: '<path data-part="top" class="s" d="M3.6 6.6 12 2.9l8.4 3.7"/><rect class="s" x="3" y="5.5" width="18" height="13" rx="2"/><path data-part="folds" d="M3.6 17.9 9.75 12.75M20.4 17.9l-6.15-5.15"/><path data-part="flap" d="M3.6 6.6 12 12.5l8.4-5.9"/><circle data-part="seal" class="f" cx="12" cy="12.5" r="1.6"/>',
    origins: { flap: [12, 6.6], top: [12, 6.6], seal: [12, 12.5] },
    poses: {
      '*': { top: { opacity: 0, scale: [1, 0.1] }, folds: { opacity: 0 } },
      open: { flap: { opacity: 0, scale: [1, 0.1] }, seal: { opacity: 0, scale: 1.8 }, top: { opacity: 1, scale: 1 }, folds: { opacity: 1 } }
    },
    transitions: {
      'closed>open': { seal: { e: 'out', d: 220 }, flap: { e: 'in', d: 200, delay: 120 }, top: { e: 'bouncy', delay: 300 }, folds: { e: 'out', d: 240, delay: 320 } },
      'open>closed': { top: { e: 'in', d: 180 }, folds: { e: 'out', d: 140 }, flap: { e: 'out', d: 260, delay: 160 }, seal: { e: 'bouncy', delay: 380 } }
    },
    effect: {
      flap: fx.keys([{ scale: 1 }, { scale: [1, 0.55], offset: 0.35 }, { scale: [1, 1.05], offset: 0.7 }, { scale: 1 }], 640),
      seal: fx.pop(1.3, 420, 160),
      top: fx.keys([{ scale: 1 }, { scale: [1, 1.15], offset: 0.4 }, { scale: 1 }], 560)
    }
  }),
  icon({
    id: 'bell', name: ['알림', 'Bell'], color: C.orange,
    keywords: '알림 벨 종 새소식 notification bell alert unread',
    desc: ['새 알림이 오면 종이 흔들리고 추가 따라 움직인 뒤 점이 튀어나옵니다.', 'A new notification swings the bell, the clapper follows, and a dot pops in.'],
    states: { idle: ['대기', 'Idle'], unread: ['새 알림', 'Unread'] },
    svg: '<g data-part="bell"><path class="s" d="M5 17.5h14l-1.33-1.78a3 3 0 0 1-.6-1.8V10.5a5.07 5.07 0 0 0-10.14 0v3.42a3 3 0 0 1-.6 1.8z"/><path d="M12 3.25v2.2"/><path data-part="clapper" d="M10 20.25a2.1 2.1 0 0 0 4 0"/></g><circle data-part="badge" class="f" cx="18.6" cy="4.6" r="2.6"/>',
    origins: { bell: [12, 3.5], clapper: [12, 17.5], badge: [18.6, 4.6] },
    poses: { '*': { badge: { scale: 0, opacity: 0 } }, unread: { badge: { scale: 1, opacity: 1 } } },
    transitions: {
      'idle>unread': {
        bell: fx.keys([0, 16, -13, 9, -5, 2, 0].map(r => ({ rotate: r })), 900, 'swing'),
        clapper: fx.keys([[0, 0], [-14, -1], [12, 1], [-8, -0.6], [4, 0.3], [0, 0]].map(([r, x]) => ({ rotate: r, translate: [x, 0] })), 900, 'swing', 40),
        badge: fx.keys([{ scale: 0, opacity: 0 }, { scale: 1.25, opacity: 1, offset: 0.6 }, { scale: 1, opacity: 1 }], 420, 'out', 260)
      }
    },
    effect: { bell: fx.wiggle(11, 680), clapper: fx.keys([0, -0.8, 0.7, -0.3, 0].map(x => ({ translate: [x, 0] })), 680, 'swing', 50) }
  }),
  icon({
    id: 'chat', name: ['대화', 'Chat'], color: C.green,
    keywords: '대화 채팅 말풍선 입력중 chat message bubble typing',
    desc: ['입력 중에는 세 점이 차례로 통통 튀어 오릅니다.', 'While typing, three dots bounce one after another.'],
    states: { idle: ['대기', 'Idle'], typing: ['입력 중', 'Typing'] },
    svg: '<path data-part="bubble" class="s" d="M7.5 17.5 4 20.5V7a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 20 7v8a2.5 2.5 0 0 1-2.5 2.5z"/><circle data-part="d1" class="f" cx="8.5" cy="11" r="1.15"/><circle data-part="d2" class="f" cx="12" cy="11" r="1.15"/><circle data-part="d3" class="f" cx="15.5" cy="11" r="1.15"/>',
    origins: { bubble: [4, 20.5] },
    loops: { typing: Object.fromEntries(['d1', 'd2', 'd3'].map((p, i) => [p, fx.keys([{ translate: [0, 0] }, { translate: [0, -1.5], offset: 0.25 }, { translate: [0, 0], offset: 0.5 }, { translate: [0, 0] }], 1000, 'inOut', i * 140)])) },
    effect: { bubble: fx.pop(1.1, 480), d1: fx.nudge([0, -1.3], 420, 60), d2: fx.nudge([0, -1.3], 420, 130), d3: fx.nudge([0, -1.3], 420, 200) }
  }),
  icon({
    id: 'messages', name: ['메시지', 'Messages'], color: C.teal,
    keywords: '메시지 대화 답장 스레드 messages conversation reply thread',
    desc: ['앞 말풍선이 꼬리 쪽에서 톡 튀어나오고 뒤 말풍선이 살짝 물러납니다.', 'The front bubble pops from its tail while the back one steps away.'],
    svg: '<path data-part="back" d="M15.5 7V5.5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9l2.5-2.5h1"/><g data-part="front"><path class="s" d="M10.5 8.5H19a2 2 0 0 1 2 2V21l-3-3h-7.5a2 2 0 0 1-2-2v-5.5a2 2 0 0 1 2-2z"/><path class="a" d="M12 12.25h6M12 15h3.5"/></g>',
    origins: { front: [21, 21] },
    effect: { front: fx.keys([{ scale: 1 }, { scale: 0.86, offset: 0.25 }, { scale: 1.06, offset: 0.6 }, { scale: 1 }], 560), back: fx.nudge([-0.9, -0.9], 560, 40) }
  }),
  icon({
    id: 'send', name: ['보내기', 'Send'], color: C.blue,
    keywords: '보내기 전송 종이비행기 제출 send submit paper plane',
    desc: ['종이비행기가 오른쪽 위로 날아갔다가 반대편에서 다시 들어옵니다.', 'The paper plane flies off to the top right and glides back in from the other side.'],
    svg: '<path class="s" d="M20.5 3.5 3.5 10.4l7 2.9 2.9 7z"/><path class="a" d="m20.5 3.5-10 9.8"/>',
    effect: { '*': fx.keys([{ translate: [0, 0], opacity: 0 }, { translate: [-1, 1], opacity: 0, offset: 0.12, easing: 'in' }, { translate: [9, -9], opacity: -1, offset: 0.45 }, { translate: [-9, 9], opacity: -1, offset: 0.46, easing: 'out' }, { translate: [0, 0], opacity: 0 }], 1000, 'linear') }
  }),
  icon({
    id: 'phone', name: ['전화', 'Phone'], color: C.green,
    keywords: '전화 통화 수화기 연락 phone call handset ring',
    desc: ['전화가 오면 수화기가 떨리고 소리 물결이 퍼집니다.', 'When ringing the handset buzzes and sound waves pulse.'],
    states: { idle: ['대기', 'Idle'], ringing: ['수신 중', 'Ringing'] },
    svg: '<path data-part="handset" class="s" d="M8.2 3.5H5.6a2 2 0 0 0-2 2.1c.4 8 6.9 14.5 14.9 14.9a2 2 0 0 0 2.1-2v-2.6a1.5 1.5 0 0 0-1.1-1.45l-2.9-.8a1.5 1.5 0 0 0-1.47.4l-1.2 1.2a12 12 0 0 1-5.5-5.5l1.2-1.2a1.5 1.5 0 0 0 .4-1.47l-.8-2.9A1.5 1.5 0 0 0 8.2 3.5z"/><path data-part="w1" class="a" d="M14.25 6.75a3 3 0 0 1 3 3"/><path data-part="w2" class="a" d="M14.25 3a6.75 6.75 0 0 1 6.75 6.75"/>',
    origins: { handset: [10, 13] },
    poses: { '*': { w1: { opacity: 0 }, w2: { opacity: 0 } }, ringing: { w1: { opacity: 1 }, w2: { opacity: 1 } } },
    loops: {
      ringing: {
        handset: fx.keys([0, -9, 9, -8, 8, -5, 5, 0, 0].map((r, i) => ({ rotate: r, offset: [0, 0.06, 0.12, 0.18, 0.24, 0.3, 0.36, 0.42, 1][i] })), 1400, 'linear'),
        w1: fx.keys([{ opacity: 0 }, { opacity: -0.8, offset: 0.5 }, { opacity: 0 }], 1400, 'inOut'),
        w2: fx.keys([{ opacity: -0.8 }, { opacity: 0, offset: 0.5 }, { opacity: -0.8 }], 1400, 'inOut')
      }
    },
    effect: { handset: fx.wiggle(10, 640) }
  }),
  icon({
    id: 'videochat', name: ['영상 통화', 'Video call'], color: C.coral,
    keywords: '영상 통화 카메라 회의 화상 video call camera meeting',
    desc: ['렌즈가 줌인하듯 앞으로 늘어났다 돌아오고, 녹화 점이 깜빡입니다.', 'The lens zooms out and back and the recording dot blinks.'],
    states: { on: ['켜짐', 'On'], off: ['꺼짐', 'Off'] },
    svg: '<g data-part="cam"><rect class="s" x="2.5" y="6" width="13" height="12" rx="2.5"/><path data-part="lens" d="M15.5 10 20.2 7.3a.5.5 0 0 1 .8.4v8.6a.5.5 0 0 1-.8.4L15.5 14"/></g><circle data-part="rec" class="f" cx="6.25" cy="9.75" r="1.15"/><path data-part="slash" class="a" d="M3 3 21 21"/>',
    origins: { rec: [6.25, 9.75], cam: [9, 12], lens: [15.5, 12] },
    poses: { '*': { slash: { draw: 0, opacity: 0 } }, off: { slash: { draw: 1, opacity: 1 }, rec: { opacity: 0, scale: 0.4 } } },
    transitions: { 'on>off': { slash: fx.keys([{ draw: 0, opacity: 0 }, { draw: 0.04, opacity: 1, offset: 0.1 }, { draw: 1, opacity: 1 }], 420, 'out') } },
    loops: { on: { rec: fx.keys([{ opacity: 0 }, { opacity: -0.7, offset: 0.5 }, { opacity: 0 }], 1800, 'inOut') } },
    effect: {
      lens: fx.keys([{ scale: 1, translate: [0, 0] }, { scale: [1.15, 1.22], translate: [0.6, 0], offset: 0.36 }, { scale: [0.96, 0.96], translate: [0, 0], offset: 0.66 }, { scale: 1, translate: [0, 0] }], 640),
      rec: fx.pop(1.5, 480, 120)
    }
  }),
  icon({
    id: 'megaphone', name: ['확성기', 'Megaphone'], color: C.pink,
    keywords: '확성기 공지 발표 홍보 megaphone announce broadcast promote',
    desc: ['확성기가 한 번 들썩이고, 소리 물결 두 줄이 차례로 퍼져 나갑니다.', 'The megaphone jolts and two sound waves travel out one after the other.'],
    svg: '<g data-part="horn"><path class="s" d="M4 9.25h3.25L15.5 4.5v15l-8.25-4.75H4a1 1 0 0 1-1-1v-3.5a1 1 0 0 1 1-1z"/><ellipse class="s" cx="15.5" cy="12" rx="1.6" ry="7.5"/><path d="M7.25 14.75 8.4 19.2a1.2 1.2 0 0 0 2.3-.6l-.7-2.65"/></g><path data-part="w1" class="a" d="M19.25 9.75a3 3 0 0 1 0 4.5"/><path data-part="w2" class="a" d="M21 7.75a6.5 6.5 0 0 1 0 8.5"/>',
    origins: { horn: [5, 12], w1: [19.25, 12], w2: [21, 12] },
    effect: {
      horn: fx.keys([{ rotate: 0, scale: 1 }, { rotate: -5, scale: [0.97, 1.02], offset: 0.22 }, { rotate: 2, scale: 1, offset: 0.5 }, { rotate: 0, scale: 1 }], 760),
      w1: fx.keys([{ opacity: 0, translate: [0, 0], scale: 1 }, { opacity: -1, translate: [0, 0], scale: 1, offset: 0.15 }, { opacity: 0, translate: [0, 0], scale: 1, offset: 0.3 }, { opacity: 0, translate: [1.2, 0], scale: 1.15, offset: 0.6 }, { opacity: -1, translate: [1.8, 0], scale: 1.2, offset: 0.8 }, { opacity: 0, translate: [0, 0], scale: 1 }], 900, 'linear'),
      w2: fx.keys([{ opacity: 0, translate: [0, 0], scale: 1 }, { opacity: -1, translate: [0, 0], scale: 1, offset: 0.15 }, { opacity: 0, translate: [0, 0], scale: 1, offset: 0.3 }, { opacity: 0, translate: [1.2, 0], scale: 1.15, offset: 0.6 }, { opacity: -1, translate: [1.8, 0], scale: 1.2, offset: 0.8 }, { opacity: 0, translate: [0, 0], scale: 1 }], 900, 'linear', 120)
    }
  }),
  icon({
    id: 'at', name: ['멘션', 'Mention'], color: C.indigo,
    keywords: '골뱅이 멘션 이메일 주소 at mention email address',
    desc: ['바깥 고리가 한 바퀴 휘감기며 다시 그려집니다.', 'The outer loop sweeps around and redraws itself.'],
    svg: '<circle class="s" cx="12" cy="12" r="3.5"/><path data-part="ring" class="a" d="M15.5 8.5v4.75a2.25 2.25 0 0 0 4.5 0V12a8 8 0 1 0-3.13 6.35"/>',
    effect: { ring: fx.redraw(760) }
  }),
  icon({
    id: 'hashtag', name: ['해시태그', 'Hashtag'], color: C.purple,
    keywords: '해시태그 태그 채널 번호 hashtag tag channel number',
    desc: ['기울어진 두 기둥이 반동을 주며 한 번 더 기웁니다.', 'The slanted bars lean further and spring back.'],
    svg: '<path d="M4 9h16M4 15h16"/><path data-part="bars" class="a" d="M10 3.5 8 20.5M16 3.5l-2 17"/>',
    effect: { bars: fx.keys([{ skewX: 0 }, { skewX: -14, offset: 0.35 }, { skewX: 4, offset: 0.7 }, { skewX: 0 }], 600) }
  }),
  icon({
    id: 'rss', name: ['구독 피드', 'RSS feed'], color: C.orange,
    keywords: 'RSS 피드 구독 방송 rss feed subscribe broadcast',
    desc: ['점에서 시작해 두 물결이 차례로 퍼집니다.', 'Two arcs light up one after another from the dot.'],
    svg: '<circle class="f" cx="5.5" cy="18.5" r="1.9"/><path data-part="w1" d="M4 11a9 9 0 0 1 9 9"/><path data-part="w2" d="M4 4a16 16 0 0 1 16 16"/>',
    effect: { w1: fx.redraw(420, 60), w2: fx.redraw(480, 200) }
  }),
  icon({
    id: 'quote', name: ['인용', 'Quote'], color: C.amber,
    keywords: '인용 따옴표 후기 말 quote citation testimonial',
    desc: ['따옴표 두 개가 차례로 통통 튀어 오릅니다.', 'The two marks hop one after the other.'],
    svg: '<path data-part="q1" class="s" d="M5.5 6H8a2 2 0 0 1 2 2v3.25c0 3.7-2.1 6.2-5.25 7.25l-.5-1.5c1.6-.8 2.6-2.1 2.9-4H5.5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><path data-part="q2" class="f" d="M15.5 6H18a2 2 0 0 1 2 2v3.25c0 3.7-2.1 6.2-5.25 7.25l-.5-1.5c1.6-.8 2.6-2.1 2.9-4H15.5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><path data-part="q2o" d="M15.5 6H18a2 2 0 0 1 2 2v3.25c0 3.7-2.1 6.2-5.25 7.25l-.5-1.5c1.6-.8 2.6-2.1 2.9-4H15.5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>',
    origins: { q1: [6.5, 18.5], q2: [16.5, 18.5], q2o: [16.5, 18.5] },
    effect: { q1: fx.hop(2, 520), q2: fx.hop(2, 520, 120), q2o: fx.hop(2, 520, 120) }
  }),
  icon({
    id: 'translate', name: ['번역', 'Translate'], color: C.blue,
    keywords: '번역 언어 다국어 한영 translate language locale i18n',
    desc: ['A가 먼저 살짝 튀고, 화살표가 천천히 다시 그려진 뒤 가가 이어서 튀어 오릅니다.', 'The A bobs first, the arrow redraws slowly, then the 가 bobs in reply.'],
    svg: '<path data-part="latin" d="M3.5 12.5 7 3.75l3.5 8.75M4.9 9.25h4.2"/><path data-part="hangul" class="a" d="M12.75 13.25h4c0 3.4-1.4 5.9-4 7.25M20.25 12.25v8.5M20.25 16.25h1.5"/><path data-part="arrow" d="M14 4.25h3.5a2 2 0 0 1 2 2v2.5m-1.75-1.5 1.75 1.75 1.75-1.75"/>',
    origins: { latin: [7, 8], hangul: [17, 16.5] },
    effect: { latin: fx.pop(1.12, 560, 0), arrow: fx.retype([0.12, 0.28], [0.34, 0.72], 1300), hangul: fx.pop(1.15, 560, 860) }
  }),
  icon({
    id: 'smile', name: ['미소', 'Smile'], color: C.yellow,
    keywords: '미소 이모지 웃음 반응 기분 smile emoji happy reaction mood',
    desc: ['한쪽 눈을 찡긋하며 입꼬리가 올라갑니다.', 'A wink, and the smile widens.'],
    svg: '<circle class="s" cx="12" cy="12" r="8.75"/><path d="M9 9.5v1"/><path data-part="eye" d="M15 9.5v1"/><path data-part="mouth" d="M8.25 14.25a4.75 4.75 0 0 0 7.5 0"/>',
    origins: { eye: [15, 10], mouth: [12, 14.5] },
    effect: { eye: fx.squish(0.1, 460, 60), mouth: fx.keys([{ scale: 1 }, { scale: [1.18, 1.25], offset: 0.4 }, { scale: 1 }], 560), '*': fx.turn(-8, 560) }
  }),
  icon({
    id: 'thumbsup', name: ['좋아요', 'Thumbs up'], color: C.blue,
    keywords: '좋아요 추천 승인 엄지 like thumbs up approve upvote',
    desc: ['엄지가 들어 올려지며 손이 아래쪽부터 채워집니다.', 'The thumb lifts as the hand fills from the bottom.'],
    states: { off: ['꺼짐', 'Off'], on: ['눌림', 'On'] },
    svg: '<g data-part="hand"><path data-part="fill" class="f" d="M7.5 10.5 11.1 4.4a1.6 1.6 0 0 1 2.9 1.1l-.75 3.5h5.15a2 2 0 0 1 1.95 2.4l-1.4 7a2 2 0 0 1-1.95 1.6H7.5zM3.5 12a1.5 1.5 0 0 1 1.5-1.5h2.5v10H5A1.5 1.5 0 0 1 3.5 19z"/><path class="s" d="M7.5 10.5v10H5A1.5 1.5 0 0 1 3.5 19v-7A1.5 1.5 0 0 1 5 10.5zM7.5 10.5l3.6-6.1a1.6 1.6 0 0 1 2.9 1.1l-.75 3.5h5.15a2 2 0 0 1 1.95 2.4l-1.4 7a2 2 0 0 1-1.95 1.6H7.5"/></g>',
    origins: { hand: [7.5, 20.5], fill: [12, 20.5] },
    poses: { '*': { fill: { scale: [1, 0], opacity: 0 } }, on: { fill: { scale: 1, opacity: 1 } } },
    transitions: {
      'off>on': { hand: fx.keys([{ rotate: 0, translate: [0, 0] }, { rotate: 6, translate: [0, 0.4], offset: 0.2 }, { rotate: -14, translate: [0, -1], offset: 0.55 }, { rotate: 0, translate: [0, 0] }], 640, 'inOut'), fill: { e: 'bouncy', delay: 120 } },
      'on>off': { fill: { e: 'smooth', d: 240 } }
    },
    effect: { hand: fx.turn(-12, 560) }
  })
]);
