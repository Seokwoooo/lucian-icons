import { C, icon, group, fx } from './_kit.js';

export default group('editing', [
  icon({
    id: 'undo', name: ['실행 취소', 'Undo'], color: C.blue,
    keywords: '실행취소 되돌리기 이전 뒤로 undo revert back previous',
    desc: ['화살표가 왼쪽으로 감기듯 당겨졌다가 돌아옵니다.', 'The arrow pulls back to the left and springs into place.'],
    svg: '<path d="M4.5 9h10a5.25 5.25 0 0 1 0 10.5H11"/><path data-part="head" class="a" d="M8.5 5 4.5 9l4 4"/>',
    origins: { '*': [12, 12], head: [4.5, 9] },
    effect: { '*': fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [-1.5, 0], rotate: -8, offset: 0.4 }, { translate: [0.3, 0], rotate: 1, offset: 0.75 }, { translate: [0, 0], rotate: 0 }], 560), head: fx.pop(1.2, 420, 80) }
  }),
  icon({
    id: 'redo', name: ['다시 실행', 'Redo'], color: C.blue,
    keywords: '다시실행 앞으로 반복 다음 redo repeat forward next',
    desc: ['화살표가 오른쪽으로 감기듯 당겨졌다가 돌아옵니다.', 'The arrow pulls forward to the right and springs into place.'],
    svg: '<path d="M19.5 9h-10a5.25 5.25 0 0 0 0 10.5H13"/><path data-part="head" class="a" d="m15.5 5 4 4-4 4"/>',
    origins: { '*': [12, 12], head: [19.5, 9] },
    effect: { '*': fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [1.5, 0], rotate: 8, offset: 0.4 }, { translate: [-0.3, 0], rotate: -1, offset: 0.75 }, { translate: [0, 0], rotate: 0 }], 560), head: fx.pop(1.2, 420, 80) }
  }),
  icon({
    id: 'edit', name: ['편집', 'Edit'], color: C.yellow,
    keywords: '편집 연필 수정 쓰기 edit pencil write modify',
    desc: ['연필이 끄적이는 동안 아래 밑줄이 그어집니다.', 'The pencil scribbles while the underline draws in.'],
    svg: '<g data-part="pencil"><path class="s" d="M15.5 4.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4z"/><path d="m13.5 6.5 3 3"/></g><path data-part="line" class="a" d="M12.5 20h8"/>',
    origins: { pencil: [4.5, 18.5] },
    effect: { pencil: fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [0.8, -0.4], rotate: -4 }, { translate: [1.6, 0.2], rotate: 3 }, { translate: [2.4, -0.3], rotate: -3 }, { translate: [0, 0], rotate: 0 }], 720), line: fx.redraw(560, 80) }
  }),
  icon({
    id: 'brush', name: ['붓', 'Brush'], color: C.pink,
    keywords: '붓 칠하기 페인트 그리기 brush paint draw art',
    desc: ['붓이 좌우로 쓸리며 붓끝 아래에 물감 한 획이 칠해집니다.', 'The brush sweeps side to side and paints a stroke under its tip.'],
    svg: '<g data-part="brush"><path class="s" d="M17.75 3.52A1.25 1.25 40 0 1 19.66 5.13L15.16 10.49L13.25 8.88Z"/><path d="M12.29 8.08L16.12 11.29L13.87 13.97L10.04 10.76Z"/><path class="f" d="M9.85 10.6L14.06 14.13L11.17 17.58C10.01 18.96 8.16 19.3 6.81 18.49C5.79 17.31 5.8 15.42 6.96 14.05Z"/><path d="M9.85 10.6L14.06 14.13L11.17 17.58C10.01 18.96 8.16 19.3 6.81 18.49C5.79 17.31 5.8 15.42 6.96 14.05Z"/></g><path data-part="paint" class="a" d="M2.75 21.5c1.5-.1 2.9-.55 4.2-1.35"/>',
    origins: { brush: [18.71, 4.32] },
    poses: { '*': { paint: { opacity: 0 } } },
    effect: {
      brush: fx.keys([{ rotate: 0 }, { rotate: -8, offset: 0.3 }, { rotate: 7, offset: 0.62 }, { rotate: 0 }], 900),
      paint: fx.keys([{ draw: 0, opacity: 0 }, { draw: 0, opacity: 1, offset: 0.28 }, { draw: 1, opacity: 1, offset: 0.62 }, { draw: 1, opacity: 1, offset: 0.82 }, { draw: 1, opacity: 0 }], 900, 'linear')
    }
  }),
  icon({
    id: 'palette', name: ['팔레트', 'Palette'], color: C.orange,
    keywords: '팔레트 색상 물감 테마 palette color paint theme',
    desc: ['물감 방울이 차례로 톡톡 튀어 오릅니다.', 'The paint dabs pop one after another.'],
    svg: '<path class="s" d="M12 3.5a8.5 8.5 0 0 0 0 17c1.1 0 1.75-.8 1.75-1.75 0-.5-.2-.9-.5-1.25s-.5-.75-.5-1.25c0-.95.8-1.75 1.75-1.75h2a4 4 0 0 0 4-4c0-3.9-3.8-7-8.5-7z"/><circle data-part="p1" class="f" cx="7.5" cy="11" r="1.4"/><circle data-part="p2" class="k" cx="9.75" cy="7.25" r="1.4"/><circle data-part="p3" class="f" cx="14.25" cy="7.25" r="1.4"/><circle data-part="p4" class="k" cx="17" cy="10.75" r="1.4"/>',
    origins: { p1: [7.5, 11], p2: [9.75, 7.25], p3: [14.25, 7.25], p4: [17, 10.75] },
    effect: { p1: fx.pop(1.6, 420), p2: fx.pop(1.6, 420, 80), p3: fx.pop(1.6, 420, 160), p4: fx.pop(1.6, 420, 240) }
  }),
  icon({
    id: 'crop', name: ['자르기', 'Crop'], color: C.lime,
    keywords: '자르기 크롭 이미지 영역 crop trim image frame',
    desc: ['두 모서리가 안쪽으로 조여 들며 영역이 작아졌다가 돌아옵니다.', 'The two corners close in and the crop area shrinks, then springs back.'],
    svg: '<path data-part="area" class="t" d="M6.5 6.5h11v11h-11z"/><path data-part="c1" d="M6.5 2.5v13a2 2 0 0 0 2 2h13"/><path data-part="c2" class="a" d="M17.5 21.5v-13a2 2 0 0 0-2-2h-13"/>',
    origins: { area: [12, 12] },
    effect: { c1: fx.nudge([1.3, -1.3], 600), c2: fx.nudge([-1.3, 1.3], 600), area: fx.keys([{ scale: 1 }, { scale: 0.78, offset: 0.38 }, { scale: 1.04, offset: 0.72 }, { scale: 1 }], 600) }
  }),
  icon({
    id: 'layers', name: ['레이어', 'Layers'], color: C.indigo,
    keywords: '레이어 겹 쌓기 순서 layers stack order depth',
    desc: ['맨 위 레이어가 떠오르며 층 사이가 벌어집니다.', 'The top layer floats up and the stack spreads apart.'],
    svg: '<path data-part="l3" d="m3 16.25 9 4.75 9-4.75"/><path data-part="l2" class="a" d="m3 12 9 4.75L21 12"/><path data-part="l1" class="s" d="m12 3 9 4.75-9 4.75-9-4.75z"/>',
    effect: { l1: fx.nudge([0, -2.4], 640), l2: fx.nudge([0, -1], 640, 40), l3: fx.nudge([0, 0.6], 640, 80) }
  }),
  icon({
    id: 'ruler', name: ['자', 'Ruler'], color: C.amber,
    keywords: '자 측정 길이 치수 ruler measure length size',
    desc: ['자가 길이를 재듯 비스듬히 미끄러졌다가 제자리로 돌아옵니다.', 'The ruler slides along its length as if measuring, then returns.'],
    svg: '<g data-part="ruler"><path class="s" d="M3.16 15.18L15.18 3.16A1.5 1.5 -45 0 1 17.3 3.16L20.84 6.7A1.5 1.5 -45 0 1 20.84 8.82L8.82 20.84A1.5 1.5 -45 0 1 6.7 20.84L3.16 17.3A1.5 1.5 -45 0 1 3.16 15.18Z"/><path d="M4.58 13.77L6.87 16.07M6.7 11.65L7.93 12.88M8.82 9.53L11.12 11.82M10.94 7.4L12.18 8.64M13.06 5.28L15.36 7.58"/></g>',
    effect: { ruler: fx.keys([{ translate: [0, 0] }, { translate: [1.4, -1.4], offset: 0.36 }, { translate: [-0.4, 0.4], offset: 0.7 }, { translate: [0, 0] }], 700) }
  }),
  icon({
    id: 'scissors', name: ['가위', 'Scissors'], color: C.cyan,
    keywords: '가위 자르기 오리기 잘라내기 scissors cut snip clip',
    desc: ['두 날이 가운데 나사를 축으로 두 번 싹둑 오므렸다 벌어집니다.', 'The blades snip shut twice around the pivot screw.'],
    svg: '<g data-part="b1"><circle class="s" cx="6" cy="6.5" r="2.75"/><path d="M8.3 8 20.5 17.5"/></g><g data-part="b2"><circle class="s" cx="6" cy="17.5" r="2.75"/><path d="M8.3 16 20.5 6.5"/></g><circle class="f" cx="13.44" cy="12" r="1.1"/>',
    origins: { b1: [13.44, 12], b2: [13.44, 12] },
    effect: { b1: fx.keys([0, -14, 0, -14, 0].map(r => ({ rotate: r })), 680), b2: fx.keys([0, 14, 0, 14, 0].map(r => ({ rotate: r })), 680) }
  }),
  icon({
    id: 'pen', name: ['펜', 'Pen'], color: C.indigo,
    keywords: '펜 펜촉 벡터 디자인 도구 pen nib vector design tool',
    desc: ['펜촉이 짧은 획을 긋듯 미끄러졌다 돌아옵니다.', 'The nib glides as if drawing a short stroke.'],
    svg: '<path class="s" d="M12.5 6.5 17.5 11.5 15 17.5 4 20l2.5-11z"/><path d="m4 20 6.2-6.2"/><circle class="f" cx="11.25" cy="12.75" r="1.5"/><path d="m13.5 5.5 2.5-2.5 5 5-2.5 2.5"/>',
    origins: { '*': [4, 20] },
    effect: { '*': fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [-0.6, 0.6], rotate: -6, offset: 0.3 }, { translate: [1.2, -0.2], rotate: 4, offset: 0.65 }, { translate: [0, 0], rotate: 0 }], 640) }
  }),
  icon({
    id: 'eraser', name: ['지우개', 'Eraser'], color: C.pink,
    keywords: '지우개 지우기 삭제 정리 eraser erase clear remove',
    desc: ['지우개가 좌우로 문지르며 아래 선을 지웠다가 선이 다시 나타납니다.', 'The eraser rubs back and forth and wipes out the line, which then returns.'],
    svg: '<g data-part="eraser"><path class="s" d="M15.68 3.38A1.5 1.5 45 0 1 17.8 3.38L19.92 5.5A1.5 1.5 45 0 1 19.92 7.62L14.62 12.92L10.38 8.68Z"/><path class="f" d="M10.38 8.68L14.62 12.92L10.73 16.81A1.5 1.5 45 0 1 8.61 16.81L6.49 14.69A1.5 1.5 45 0 1 6.49 12.57Z"/><path d="M10.38 8.68L14.62 12.92L10.73 16.81A1.5 1.5 45 0 1 8.61 16.81L6.49 14.69A1.5 1.5 45 0 1 6.49 12.57Z"/></g><path data-part="trail" d="M13.5 21h7"/>',
    origins: { eraser: [12, 18] },
    effect: {
      eraser: fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [-1.3, 0], rotate: -4, offset: 0.2 }, { translate: [1.3, 0], rotate: 4, offset: 0.45 }, { translate: [-0.8, 0], rotate: -2, offset: 0.68 }, { translate: [0, 0], rotate: 0 }], 900),
      trail: fx.retype([0.1, 0.6], [0.72, 0.95], 900)
    }
  }),
  icon({
    id: 'text', name: ['텍스트', 'Text'], color: C.violet,
    keywords: '텍스트 글자 타이포 서체 text type font typography',
    desc: ['글자가 위에서 떨어지듯 내려앉고 커서가 깜빡입니다.', 'The letter drops into place and the caret blinks.'],
    svg: '<g data-part="t"><path d="M4.5 7V5h11v2"/><path d="M10 5v14"/><path d="M8 19h4"/></g><path data-part="caret" class="a" d="M18.5 10v9"/>',
    origins: { t: [10, 19] },
    effect: { t: fx.keys([{ translate: [0, 0], scale: 1 }, { translate: [0, -2.5], scale: 1, offset: 0.3 }, { translate: [0, 0], scale: [1.06, 0.92], offset: 0.55 }, { translate: [0, 0], scale: 1 }], 600), caret: fx.blink(560, 80) }
  }),
  icon({
    id: 'wand', name: ['요술봉', 'Magic wand'], color: C.purple,
    keywords: '요술봉 마법 자동 보정 AI wand magic auto enhance',
    desc: ['요술봉이 살짝 기울고, 끝의 반짝임이 하나씩 차례로 은은하게 깜빡입니다.', 'The wand tips slightly and the sparkles twinkle softly, one after another.'],
    svg: '<path data-part="wand" d="m3.5 20.5 11-11"/><path data-part="tip" class="a" d="m14.5 9.5 2.5-2.5"/><path data-part="sp1" class="a" d="M18.5 2.5v3M17 4h3"/><path data-part="sp2" class="a" d="M20.5 9.5v2M19.5 10.5h2"/><path data-part="sp3" class="a" d="M11.5 3v2M10.5 4h2"/>',
    origins: { wand: [3.5, 20.5], tip: [3.5, 20.5], sp1: [18.5, 4], sp2: [20.5, 10.5], sp3: [11.5, 4] },
    effect: {
      wand: fx.keys([{ rotate: 0 }, { rotate: -5, offset: 0.35 }, { rotate: 1, offset: 0.7 }, { rotate: 0 }], 760),
      tip: fx.keys([{ rotate: 0 }, { rotate: -5, offset: 0.35 }, { rotate: 1, offset: 0.7 }, { rotate: 0 }], 760),
      ...Object.fromEntries([['sp1', 160], ['sp2', 300], ['sp3', 440]].map(([p, delay]) => [p, fx.keys([{ scale: 1, opacity: 0 }, { scale: 0.55, opacity: -0.5, offset: 0.4 }, { scale: 1.1, opacity: 0, offset: 0.75 }, { scale: 1, opacity: 0 }], 520, 'inOut', delay)]))
    }
  }),
  icon({
    id: 'eyedropper', name: ['스포이트', 'Eyedropper'], color: C.teal,
    keywords: '스포이트 색추출 색상 선택 eyedropper color picker sample',
    desc: ['고무를 누르면 끝에서 색 방울이 한 방울 떨어집니다.', 'Squeezing the bulb releases a single drop of color.'],
    svg: '<path class="s" d="M14 7.5 6.2 15.3a2 2 0 0 0-.55 1L5 19l2.7-.65a2 2 0 0 0 1-.55L16.5 10"/><g data-part="bulb"><path d="M15.5 3.5a2.12 2.12 0 0 1 3 0l2 2a2.12 2.12 0 0 1 0 3L18 11l-5-5z"/></g><path d="m12.5 5.5 6 6"/><circle data-part="drop" class="f" cx="4.2" cy="20.8" r="1.2"/>',
    origins: { bulb: [17.5, 7.5], drop: [4.2, 20.8] },
    poses: { '*': { drop: { opacity: 0 } } },
    effect: { bulb: fx.keys([{ scale: 1 }, { scale: [0.82, 1.06], offset: 0.3 }, { scale: 1, offset: 0.6 }, { scale: 1 }], 760), drop: fx.keys([{ translate: [0, -1.5], opacity: 0, scale: 0.4 }, { translate: [0, -1], opacity: 0, scale: 0.4, offset: 0.3 }, { translate: [0, 0], opacity: 1, scale: 1, offset: 0.55 }, { translate: [-0.5, 2.5], opacity: 0, scale: 1 }], 760, 'in') }
  }),
  icon({
    id: 'wrench', name: ['렌치', 'Wrench'], color: C.blue,
    keywords: '렌치 도구 수리 설정 wrench tool fix repair settings',
    desc: ['렌치가 볼트를 조이듯 머리를 축으로 돌렸다가 돌아옵니다.', 'The wrench turns around its jaw as if tightening a bolt, then returns.'],
    // One outline: a round head with a square jaw cut along the handle's axis.
    svg: '<path class="s" d="M6.35 19.85L12.98 13.21A5 5 0 0 0 19.8 6.68L16.91 9.56L14.44 7.09L17.32 4.2A5 5 0 0 0 10.79 11.02L4.15 17.65A1.55 1.55 0 0 0 6.35 19.85z"/><circle class="f" cx="5.25" cy="18.75" r=".85"/>',
    origins: { '*': [15.25, 8.75] },
    effect: { '*': fx.keys([{ rotate: 0 }, { rotate: -28, offset: 0.45 }, { rotate: 4, offset: 0.8 }, { rotate: 0 }], 720) }
  }),
  icon({
    id: 'hammer', name: ['망치', 'Hammer'], color: C.orange,
    keywords: '망치 도구 만들기 빌드 hammer tool build make',
    desc: ['머리를 위로 들어 올렸다가 아래로 탕 내리치고, 맞는 순간 충격선이 퍼집니다.', 'It lifts its head, strikes downward, and impact lines flash on contact.'],
    svg: '<g data-part="hammer"><path class="f" d="M10.55 8.66L12.6 10.09L6.15 19.31A1.25 1.25 35 0 1 4.1 17.87Z"/><path d="M10.55 8.66L12.6 10.09L6.15 19.31A1.25 1.25 35 0 1 4.1 17.87Z"/><path class="s" d="M19.19 9.82A1.5 1.5 0 0 0 18.82 7.73L12.68 3.43C10.88 2.17 8.89 1.88 6.75 2.33C8.28 2.92 9.45 3.85 10.14 5.31L8.71 7.36L15.68 12.24A1.5 1.5 0 0 0 17.76 11.87Z"/></g><path data-part="hit" class="a" d="M19.98 14.55v1.2M20.83 14.21l.83.87M21.2 13.37h1.2"/>',
    origins: { hammer: [5.27, 18.38], hit: [20, 13.35] },
    poses: { '*': { hit: { opacity: 0 } } },
    // The face is the head's lower-right end, so it winds up counter-clockwise and strikes clockwise, downward.
    effect: {
      hammer: fx.keys([{ rotate: 0, easing: 'inOut' }, { rotate: -16, offset: 0.42, easing: 'in' }, { rotate: 8, offset: 0.53, easing: 'out' }, { rotate: 4, offset: 0.66, easing: 'inOut' }, { rotate: 0 }], 960, 'linear'),
      hit: fx.keys([{ opacity: 0, scale: 0.5 }, { opacity: 0, scale: 0.5, offset: 0.52 }, { opacity: 1, scale: 1.1, offset: 0.6 }, { opacity: 1, scale: 1, offset: 0.72 }, { opacity: 0, scale: 1 }], 960, 'linear')
    }
  })
]);
