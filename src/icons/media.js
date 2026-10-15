import { C, icon, group, fx } from './_kit.js';

const DRAW_IN = (d = 380, delay = 120) => fx.keys([{ draw: 0, opacity: 0 }, { draw: 0.05, opacity: 1, offset: 0.1 }, { draw: 1, opacity: 1 }], d, 'out', delay);
const SLASH = { k: [{ draw: 0, opacity: 0 }, { draw: 0.04, opacity: 1, offset: 0.1 }, { draw: 1, opacity: 1 }], d: 420, e: 'out' };

export default group('media', [
  icon({
    id: 'play', name: ['재생', 'Play'], color: C.green,
    keywords: '재생 시작 영상 음악 일시정지 play start video music pause toggle',
    desc: ['재생하면 삼각형이 돌아 사라지고 일시정지 막대가 돌아 나옵니다.', 'Playing spins the triangle out and the pause bars in.'],
    states: { paused: ['정지됨', 'Paused'], playing: ['재생 중', 'Playing'] },
    svg: '<path data-part="tri" class="s" d="M7 4.9v14.2a1 1 0 0 0 1.5.86l11.6-7.1a1 1 0 0 0 0-1.72L8.5 4.04A1 1 0 0 0 7 4.9z"/><g data-part="bars"><rect class="s" x="6" y="4.5" width="4" height="15" rx="1.5"/><rect class="s" x="14" y="4.5" width="4" height="15" rx="1.5"/></g>',
    origins: { tri: [12, 12], bars: [12, 12] },
    poses: { '*': { bars: { opacity: 0, scale: 0.4, rotate: -90 } }, playing: { tri: { opacity: 0, scale: 0.4, rotate: 90 }, bars: { opacity: 1, scale: 1, rotate: 0 } } },
    motion: { e: 'bouncy' },
    effect: { tri: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [-0.6, 0], scale: 0.9, offset: 0.25 }, { translate: [1.4, 0], scale: 1.06, offset: 0.6 }, { translate: [0, 0], scale: 1 }], 560), bars: fx.pop(1.1, 480) }
  }),
  icon({
    id: 'pause', name: ['일시정지', 'Pause'], color: C.amber,
    keywords: '일시정지 멈춤 대기 pause hold break',
    desc: ['두 막대가 번갈아 눌렸다 올라옵니다.', 'The two bars press down in turn.'],
    svg: '<rect data-part="b1" class="s" x="6" y="4.5" width="4" height="15" rx="1.5"/><rect data-part="b2" class="s" x="14" y="4.5" width="4" height="15" rx="1.5"/>',
    origins: { b1: [8, 19.5], b2: [16, 19.5] },
    effect: { b1: fx.keys([{ scale: 1 }, { scale: [1.1, 0.78], offset: 0.35 }, { scale: 1 }], 440), b2: fx.keys([{ scale: 1 }, { scale: [1.1, 0.78], offset: 0.35 }, { scale: 1 }], 440, 'inOut', 140) }
  }),
  icon({
    id: 'stop', name: ['정지', 'Stop'], color: C.red,
    keywords: '정지 중지 끝 멈춤 stop end halt',
    desc: ['사각형이 꾹 눌렸다가 단단하게 돌아옵니다.', 'The square squeezes in and firms back up.'],
    svg: '<rect data-part="sq" class="f" x="5" y="5" width="14" height="14" rx="3"/><rect data-part="sqo" x="5" y="5" width="14" height="14" rx="3"/>',
    effect: { sq: fx.keys([{ scale: 1 }, { scale: 0.82, offset: 0.35 }, { scale: 1.05, offset: 0.7 }, { scale: 1 }], 480), sqo: fx.keys([{ scale: 1 }, { scale: 0.82, offset: 0.35 }, { scale: 1.05, offset: 0.7 }, { scale: 1 }], 480) }
  }),
  icon({
    id: 'record', name: ['녹화', 'Record'], color: C.red,
    keywords: '녹화 녹음 기록 라이브 record recording live capture',
    desc: ['녹화 중에는 점이 숨 쉬고 바깥으로 파문이 퍼집니다.', 'While recording the dot breathes and a ripple spreads.'],
    states: { idle: ['대기', 'Idle'], recording: ['녹화 중', 'Recording'] },
    svg: '<circle class="s" cx="12" cy="12" r="8.5"/><circle data-part="dot" class="f" cx="12" cy="12" r="4"/><circle data-part="ripple" class="a" cx="12" cy="12" r="8.5"/>',
    poses: { '*': { ripple: { opacity: 0 } } },
    loops: { recording: { dot: fx.keys([{ scale: 1 }, { scale: 0.78 }, { scale: 1 }], 1200, 'inOut'), ripple: fx.keys([{ scale: 1, opacity: 0.9 }, { scale: 1.28, opacity: 0 }], 1200, 'out') } },
    effect: { dot: fx.pop(1.25, 480) }
  }),
  icon({
    id: 'music', name: ['음악', 'Music'], color: C.pink,
    keywords: '음악 음표 노래 오디오 music note song audio',
    desc: ['음표가 박자에 맞춰 통통 튀고, 재생 중에는 좌우로 흔들립니다.', 'The notes bounce on the beat and sway while playing.'],
    states: { idle: ['대기', 'Idle'], playing: ['재생 중', 'Playing'] },
    svg: '<path d="M9 18V5.5l11-2v12"/><path class="a" d="m9 9 11-2"/><circle data-part="h1" class="s" cx="6.5" cy="18" r="2.5"/><circle data-part="h2" class="s" cx="17.5" cy="15.5" r="2.5"/>',
    origins: { '*': [12, 20] },
    loops: { playing: { '*': fx.keys([{ rotate: 0 }, { rotate: -6 }, { rotate: 0 }, { rotate: 6 }, { rotate: 0 }], 1400, 'inOut') } },
    effect: { '*': fx.hop(1.6, 520), h1: fx.pop(1.15, 380, 120), h2: fx.pop(1.15, 380, 200) }
  }),
  icon({
    id: 'headphones', name: ['헤드폰', 'Headphones'], color: C.violet,
    keywords: '헤드폰 듣기 오디오 음악 headphones listen audio music',
    desc: ['헤드폰이 음악에 맞춰 고개를 까딱입니다.', 'The headphones nod along to the music.'],
    svg: '<path data-part="band" d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect class="f" x="3" y="14" width="4.5" height="7" rx="1.5"/><rect x="3" y="14" width="4.5" height="7" rx="1.5"/><rect class="f" x="16.5" y="14" width="4.5" height="7" rx="1.5"/><rect x="16.5" y="14" width="4.5" height="7" rx="1.5"/>',
    origins: { '*': [12, 21], band: [12, 15] },
    effect: { '*': fx.keys([{ rotate: 0, translate: [0, 0] }, { rotate: -5, translate: [0, 0.6] }, { rotate: 0, translate: [0, 0] }, { rotate: 5, translate: [0, 0.6] }, { rotate: 0, translate: [0, 0] }], 820), band: fx.keys([{ scale: 1 }, { scale: [1.05, 0.95] }, { scale: 1 }, { scale: [1.05, 0.95] }, { scale: 1 }], 820) }
  }),
  icon({
    id: 'camera', name: ['카메라', 'Camera'], color: C.blue,
    keywords: '카메라 사진 촬영 찰칵 camera photo shoot capture',
    desc: ['셔터를 누르면 렌즈가 조여지고 플래시가 번쩍입니다.', 'The shutter fires: the iris closes and the flash pops.'],
    svg: '<path data-part="body" class="s" d="M4.5 7.5h2.6l1.5-2.25A1.5 1.5 0 0 1 9.85 4.5h4.3a1.5 1.5 0 0 1 1.25.75l1.5 2.25h2.6a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2V9.5a2 2 0 0 1 2-2z"/><circle cx="12" cy="13.25" r="3.75"/><circle data-part="iris" class="f" cx="12" cy="13.25" r="1.6"/><path data-part="flash" class="a" d="M18.5.75v1.5M21.75 2.5l-1.1 1.1M15.25 2.5l1.1 1.1"/>',
    origins: { iris: [12, 13.25], body: [12, 20], flash: [18.5, 3.5] },
    poses: { '*': { flash: { opacity: 0 } } },
    effect: { body: fx.keys([{ scale: 1 }, { scale: [1.03, 0.94], offset: 0.25 }, { scale: 1 }], 420), iris: fx.keys([{ scale: 1 }, { scale: 2.1, offset: 0.25 }, { scale: 1 }], 520), flash: fx.flash(520, 60) }
  }),
  icon({
    id: 'image', name: ['이미지', 'Image'], color: C.teal,
    keywords: '이미지 사진 그림 갤러리 image photo picture gallery',
    desc: ['해가 떠오르고 산 능선이 다시 그려집니다.', 'The sun rises and the ridge line redraws.'],
    svg: '<rect class="s" x="3" y="4" width="18" height="16" rx="2.5"/><circle data-part="sun" class="f" cx="8.5" cy="9.25" r="1.85"/><path data-part="hills" d="m3.5 17.5 5-5 4 4 2.5-2.5 5.5 5.5"/>',
    origins: { sun: [8.5, 9.25] },
    effect: { sun: fx.keys([{ translate: [0, 3], opacity: -1, scale: 0.6 }, { translate: [0, -0.5], opacity: 0, scale: 1.1, offset: 0.6 }, { translate: [0, 0], scale: 1 }], 680, 'out', 120), hills: fx.redraw(520) }
  }),
  icon({
    id: 'film', name: ['영화', 'Film'], color: C.purple,
    keywords: '영화 영상 촬영 슬레이트 film movie video clapper',
    desc: ['슬레이트가 들렸다가 딱 소리 나게 내려칩니다.', 'The clapper lifts and snaps shut.'],
    svg: '<rect class="s" x="3" y="9" width="18" height="11.5" rx="2"/><g data-part="clap"><rect x="3" y="4.5" width="18" height="4.5" rx="1"/><path class="a" d="M8.5 4.5 7 9M14 4.5 12.5 9M19.5 4.5 18 9"/></g>',
    origins: { clap: [3, 9], '*': [12, 20.5] },
    effect: { clap: fx.keys([{ rotate: 0 }, { rotate: -20, offset: 0.4, easing: 'out' }, { rotate: 0, offset: 0.6, easing: 'in' }, { rotate: -3, offset: 0.75 }, { rotate: 0 }], 680, 'linear'), '*': fx.keys([{ scale: 1 }, { scale: 1, offset: 0.6 }, { scale: [1.03, 0.96], offset: 0.68 }, { scale: 1 }], 680, 'out') }
  }),
  icon({
    id: 'microphone', name: ['마이크', 'Microphone'], color: C.coral,
    keywords: '마이크 음성 녹음 말하기 음소거 microphone voice record speak mute',
    desc: ['말하듯 음량 막대가 오르내리고, 음소거하면 사선이 그어집니다.', 'The level bar bounces like speech; muting draws a slash.'],
    states: { on: ['켜짐', 'On'], muted: ['음소거', 'Muted'] },
    svg: '<rect class="s" x="9" y="3" width="6" height="11" rx="3"/><path data-part="level" class="a" d="M12 7v3.5"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/><path data-part="slash" class="a" d="M4 4l16 16"/>',
    origins: { level: [12, 10.5] },
    poses: { '*': { slash: { draw: 0, opacity: 0 } }, muted: { slash: { draw: 1, opacity: 1 }, level: { opacity: 0 } } },
    transitions: { 'on>muted': { slash: SLASH } },
    effect: { level: fx.keys([1, 0.4, 1.3, 0.6, 1.2, 1].map(y => ({ scale: [1, y] })), 760, 'inOut') }
  }),
  icon({
    id: 'speaker', name: ['스피커', 'Speaker'], color: C.blue,
    keywords: '스피커 소리 볼륨 음소거 speaker sound volume mute audio',
    desc: ['음파가 차례로 퍼지고, 음소거하면 음파 대신 X가 나타납니다.', 'Sound waves ripple out; muting swaps them for an X.'],
    states: { on: ['켜짐', 'On'], muted: ['음소거', 'Muted'] },
    svg: '<path data-part="cone" class="s" d="M4 9.5h3l4.5-4v13L7 14.5H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z"/><path data-part="w1" class="a" d="M15 9.5a3.5 3.5 0 0 1 0 5"/><path data-part="w2" class="a" d="M17.75 6.75a7.4 7.4 0 0 1 0 10.5"/><path data-part="x" class="a" d="m15.5 9.5 5 5m0-5-5 5"/>',
    origins: { cone: [7, 12], x: [18, 12], w1: [11.5, 12], w2: [11.5, 12] },
    poses: { '*': { x: { opacity: 0, scale: 0.4 } }, muted: { w1: { opacity: 0, scale: 0.6 }, w2: { opacity: 0, scale: 0.6 }, x: { opacity: 1, scale: 1 } } },
    motion: { e: 'bouncy' },
    effect: { cone: fx.pop(1.1, 420), w1: fx.keys([{ opacity: 0, translate: [0, 0] }, { opacity: -1, translate: [-1, 0], offset: 0.2 }, { opacity: 0, translate: [0.6, 0], offset: 0.55 }, { translate: [0, 0] }], 620, 'out'), w2: fx.keys([{ opacity: 0, translate: [0, 0] }, { opacity: -1, translate: [-1, 0], offset: 0.35 }, { opacity: 0, translate: [0.6, 0], offset: 0.7 }, { translate: [0, 0] }], 620, 'out') }
  }),
  icon({
    id: 'next', name: ['다음 곡', 'Next'], color: C.green,
    keywords: '다음 건너뛰기 다음곡 앞으로 next skip forward track',
    desc: ['삼각형이 뒤로 살짝 물러났다가 막대로 튀어 나가 부딪히고, 막대가 밀려납니다.', 'The triangle draws back, dashes into the bar, and the bar gets knocked forward.'],
    svg: '<path data-part="tri" class="s" d="M5 5.4v13.2a.9.9 0 0 0 1.4.75l9.6-6.6a.9.9 0 0 0 0-1.5L6.4 4.65A.9.9 0 0 0 5 5.4z"/><path data-part="bar" class="a" d="M19.5 5v14"/>',
    origins: { tri: [16.25, 12], bar: [19.5, 12] },
    effect: {
      tri: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [-1, 0], scale: 1, offset: 0.2 }, { translate: [2.4, 0], scale: [0.88, 1.05], offset: 0.42 }, { translate: [-0.4, 0], scale: 1, offset: 0.72 }, { translate: [0, 0], scale: 1 }], 680),
      bar: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [0, 0], scale: 1, offset: 0.38 }, { translate: [1.4, 0], scale: [1, 1.12], offset: 0.5 }, { translate: [0, 0], scale: 1 }], 680, 'out')
    }
  }),
  icon({
    id: 'shuffle', name: ['섞기', 'Shuffle'], color: C.purple,
    keywords: '섞기 랜덤 무작위 셔플 shuffle random mix',
    desc: ['교차한 두 화살표가 카드를 섞듯 서로 반대 방향으로 벌어졌다 모입니다.', 'The crossed arrows fan apart in opposite directions like shuffled cards, then rejoin.'],
    svg: '<g data-part="a1"><path d="M3.5 7.5H6c2.5 0 3.75 1.25 5 3.5l2 3.5c1.25 2.25 2.5 3.5 5 3.5h2.5"/><path d="M18 15.5l2.5 2.5-2.5 2.5"/></g><g data-part="a2" class="a"><path d="M3.5 18H6c2.5 0 3.75-1.25 5-3.5l2-3.5c1.25-2.25 2.5-3.5 5-3.5h2.5"/><path d="M18 5l2.5 2.5L18 10"/></g>',
    effect: {
      a1: fx.keys([{ translate: [0, 0] }, { translate: [1.3, 1.4], offset: 0.36 }, { translate: [-0.4, -0.4], offset: 0.7 }, { translate: [0, 0] }], 660),
      a2: fx.keys([{ translate: [0, 0] }, { translate: [1.3, -1.4], offset: 0.36 }, { translate: [-0.4, 0.4], offset: 0.7 }, { translate: [0, 0] }], 660, 'inOut', 70)
    }
  }),
  icon({
    id: 'repeat', name: ['반복', 'Repeat'], color: C.cyan,
    keywords: '반복 루프 다시 재생 repeat loop again cycle',
    desc: ['고리 전체가 한 바퀴 돌아 제자리로 돌아옵니다.', 'The loop makes one full turn and lands where it began.'],
    svg: '<g data-part="loop"><path d="M4 11.5V10a3 3 0 0 1 3-3h13"/><path d="m17 4 3 3-3 3"/><path class="a" d="M20 12.5V14a3 3 0 0 1-3 3H4"/><path class="a" d="m7 20-3-3 3-3"/></g>',
    origins: { loop: [12, 12] },
    effect: { loop: fx.keys([{ rotate: 0 }, { rotate: 375, offset: 0.75 }, { rotate: 360 }], 980, 'inOut') }
  }),
  icon({
    id: 'radio', name: ['라디오', 'Radio'], color: C.orange,
    keywords: '라디오 방송 팟캐스트 소리 radio broadcast podcast fm',
    desc: ['안테나가 흔들리고 스피커가 소리에 맞춰 두 번 울립니다.', 'The antenna sways and the speaker thumps twice with the sound.'],
    svg: '<path data-part="ant" d="M7 8 17 3.5"/><rect class="s" x="2.5" y="8" width="19" height="12.5" rx="2.5"/><circle data-part="spk" class="f" cx="8" cy="14.25" r="2.5"/><circle cx="8" cy="14.25" r="2.5"/><path data-part="dial" class="a" d="M14 12.5h4M14 16h4"/>',
    origins: { ant: [7, 8], spk: [8, 14.25], dial: [16, 14.25] },
    effect: {
      ant: fx.wiggle(16, 860),
      spk: fx.keys([1, 1.35, 0.92, 1.28, 0.96, 1].map(s => ({ scale: s })), 760),
      dial: fx.keys([{ translate: [0, 0] }, { translate: [0.9, 0], offset: 0.3 }, { translate: [-0.6, 0], offset: 0.65 }, { translate: [0, 0] }], 760)
    }
  }),
  icon({
    id: 'tv', name: ['TV', 'TV'], color: C.indigo,
    keywords: 'TV 텔레비전 화면 방송 tv television screen show',
    desc: ['켜면 화면 속 재생 표시가 퍼지고, 끄면 옛날 브라운관처럼 한 줄로 접힙니다.', 'Turning on blooms the picture; turning off folds it like an old CRT.'],
    states: { on: ['켜짐', 'On'], off: ['꺼짐', 'Off'] },
    svg: '<path data-part="ant" d="m8 3 4 4 4-4"/><rect class="s" x="2.5" y="7" width="19" height="13" rx="2.5"/><path data-part="pic" class="a" d="M10.25 11.25v5l4.25-2.5z"/>',
    origins: { pic: [12, 13.75], ant: [12, 7] },
    poses: { off: { pic: { scale: [0, 0.05], opacity: 0 } } },
    transitions: {
      'on>off': { pic: fx.keys([{ scale: 1, opacity: 1 }, { scale: [1.4, 0.08], opacity: 1, offset: 0.45 }, { scale: [0, 0.05], opacity: 0 }], 460, 'inOut') },
      'off>on': { pic: { e: 'bouncy' } }
    },
    effect: { ant: fx.wiggle(12, 700), pic: fx.pop(1.2, 460) }
  }),
  icon({
    id: 'aperture', name: ['조리개', 'Aperture'], color: C.amber,
    keywords: '조리개 렌즈 사진 셔터 aperture lens photo shutter',
    desc: ['휘어진 조리개 날이 돌며 가운데 구멍이 좁아졌다가 다시 열립니다.', 'The curved blades turn and narrow the opening, then open it again.'],
    svg: '<circle class="s" cx="12" cy="12" r="8.75"/><path data-part="hole" class="f" d="M12 8.6L14.94 10.3L14.94 13.7L12 15.4L9.06 13.7L9.06 10.3z"/><path data-part="blades" d="M12 8.6Q15.38 5.64 20.45 9.74M14.94 10.3Q19.2 11.75 18.19 18.19M14.94 13.7Q15.82 18.11 9.74 20.45M12 15.4Q8.62 18.36 3.55 14.26M9.06 13.7Q4.8 12.25 5.81 5.81M9.06 10.3Q8.18 5.89 14.26 3.55"/>',
    origins: { blades: [12, 12], hole: [12, 12] },
    effect: {
      blades: fx.keys([{ rotate: 0 }, { rotate: 60 }], 900, 'inOut'),
      hole: fx.keys([{ scale: 1, rotate: 0 }, { scale: 0.3, rotate: 30, offset: 0.5 }, { scale: 1, rotate: 60 }], 900)
    }
  }),
  icon({
    id: 'disc', name: ['음반', 'Disc'], color: C.pink,
    keywords: '음반 레코드 CD 앨범 disc record vinyl album',
    desc: ['음반이 한 바퀴 돌고, 재생 중에는 계속 돕니다.', 'The disc spins once; while playing it keeps spinning.'],
    states: { idle: ['대기', 'Idle'], playing: ['재생 중', 'Playing'] },
    svg: '<g data-part="disc"><circle class="s" cx="12" cy="12" r="8.75"/><path d="M12 6.25A5.75 5.75 0 0 1 17.75 12"/><circle class="f" cx="12" cy="12" r="2.5"/></g>',
    origins: { disc: [12, 12] },
    loops: { playing: { disc: fx.keys([{ rotate: 0 }, { rotate: 360 }], 2000, 'linear') } },
    effect: { disc: fx.keys([{ rotate: 0 }, { rotate: 380, offset: 0.75 }, { rotate: 360 }], 1000, 'inOut') }
  })
]);
