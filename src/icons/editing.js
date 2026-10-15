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
    desc: ['붓이 손목을 털듯 한 번 휘두릅니다.', 'The brush makes one flick of the wrist.'],
    svg: '<path d="m11 13 7.6-7.6a1.9 1.9 0 0 1 2.7 2.7L13.7 15.7"/><path class="f" d="M8.25 14.25c-1.9 0-3.4 1.5-3.4 3.4 0 1.3-1.1 2.3-2.35 2.3 1 .95 2.6 1.55 4.05 1.55 2.4 0 4.4-2 4.4-4.4 0-1.6-1.2-2.85-2.7-2.85z"/><path d="M8.25 14.25c-1.9 0-3.4 1.5-3.4 3.4 0 1.3-1.1 2.3-2.35 2.3 1 .95 2.6 1.55 4.05 1.55 2.4 0 4.4-2 4.4-4.4 0-1.6-1.2-2.85-2.7-2.85z"/>',
    origins: { '*': [20, 6] },
    effect: { '*': fx.keys([{ rotate: 0 }, { rotate: -10, offset: 0.3 }, { rotate: 14, offset: 0.6 }, { rotate: -3, offset: 0.85 }, { rotate: 0 }], 700) }
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
    desc: ['두 모서리 틀이 안쪽으로 조여들었다가 벌어집니다.', 'The two corner brackets tighten inward, then relax.'],
    svg: '<rect class="t" x="6" y="6" width="12" height="12"/><path data-part="c1" d="M6 2.5V16a2 2 0 0 0 2 2h13.5"/><path data-part="c2" class="a" d="M2.5 6H16a2 2 0 0 1 2 2v13.5"/>',
    effect: { c1: fx.nudge([1.4, -1.4], 560), c2: fx.nudge([-1.4, 1.4], 560) }
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
    desc: ['자가 대각선 방향으로 미끄러지며 눈금을 맞춥니다.', 'The ruler slides along its axis to line up a tick.'],
    svg: '<path class="s" d="M3.6 16.4 16.4 3.6a1.5 1.5 0 0 1 2.1 0l1.9 1.9a1.5 1.5 0 0 1 0 2.1L7.6 20.4a1.5 1.5 0 0 1-2.1 0l-1.9-1.9a1.5 1.5 0 0 1 0-2.1z"/><path data-part="ticks" class="a" d="m7.5 12.5 2 2m1-5 1.5 1.5m1.5-4.5 2 2"/>',
    effect: { '*': fx.nudge([1.5, -1.5], 600), ticks: fx.redraw(420, 120) }
  }),
  icon({
    id: 'scissors', name: ['가위', 'Scissors'], color: C.cyan,
    keywords: '가위 자르기 오리기 잘라내기 scissors cut snip clip',
    desc: ['가위 날이 두 번 싹둑 벌어졌다 닫힙니다.', 'The blades snip open and shut twice.'],
    svg: '<g data-part="b1"><circle class="s" cx="6" cy="6" r="2.75"/><path d="M8.2 7.7 20 16.5"/></g><g data-part="b2"><circle class="s" cx="6" cy="18" r="2.75"/><path d="M8.2 16.3 20 7.5"/></g><circle class="f" cx="13.97" cy="12" r="1.05"/>',
    origins: { b1: [13.97, 12], b2: [13.97, 12] },
    effect: { b1: fx.keys([0, -13, 0, -13, 0].map(r => ({ rotate: r })), 680, 'inOut'), b2: fx.keys([0, 13, 0, 13, 0].map(r => ({ rotate: r })), 680, 'inOut') }
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
    desc: ['지우개가 좌우로 문질러 지웁니다.', 'The eraser rubs back and forth.'],
    svg: '<g data-part="eraser"><path class="s" d="M7.5 20.5 3.6 16.6a1.5 1.5 0 0 1 0-2.1L14 4.1a1.5 1.5 0 0 1 2.1 0l4.3 4.3a1.5 1.5 0 0 1 0 2.1L10.4 20.5z"/><path class="a" d="m8.75 9.25 6 6"/></g><path data-part="floor" d="M12.5 20.5h8"/>',
    origins: { floor: [20.5, 20.5] },
    effect: { eraser: fx.keys([0, -1.5, 1.4, -1.2, 1, 0].map(x => ({ translate: [x, 0] })), 760, 'inOut'), floor: fx.keys([{ scale: 1 }, { scale: [0.3, 1], offset: 0.5 }, { scale: [0.3, 1], offset: 0.7 }, { scale: 1 }], 760) }
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
    desc: ['요술봉이 한 번 휘둘리고 끝에서 반짝임이 터집니다.', 'The wand flicks and sparkles burst from its tip.'],
    svg: '<path data-part="wand" d="m3.5 20.5 11-11"/><path data-part="tip" class="a" d="m14.5 9.5 2.5-2.5"/><path data-part="sp" class="a" d="M18.5 2.5v3M17 4h3M20.5 9.5v2M19.5 10.5h2M11.5 3v2M10.5 4h2"/>',
    origins: { wand: [3.5, 20.5], tip: [3.5, 20.5], sp: [17, 7] },
    effect: { wand: fx.turn(-10, 600), tip: fx.turn(-10, 600), sp: fx.keys([{ scale: 1, opacity: 0, rotate: 0 }, { scale: 0.4, opacity: -1, offset: 0.25 }, { scale: 1.25, opacity: 0, rotate: 20, offset: 0.65 }, { scale: 1, rotate: 0 }], 700, 'out') }
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
    desc: ['렌치가 볼트를 조이듯 반 바퀴 돌렸다가 돌아옵니다.', 'The wrench turns as if tightening a bolt, then returns.'],
    svg: '<path class="s" d="M14.5 3.75a4.75 4.75 0 0 0-4.4 6.55L3.9 16.5a1.9 1.9 0 0 0 2.7 2.7l6.2-6.2a4.75 4.75 0 0 0 6.55-4.4l-2.6 2.6-2.95-.8-.8-2.95z"/><circle class="f" cx="5.25" cy="17.85" r=".9"/>',
    origins: { '*': [14.5, 8.5] },
    effect: { '*': fx.keys([{ rotate: 0 }, { rotate: -28, offset: 0.45 }, { rotate: 4, offset: 0.8 }, { rotate: 0 }], 680) }
  }),
  icon({
    id: 'hammer', name: ['망치', 'Hammer'], color: C.orange,
    keywords: '망치 도구 만들기 빌드 hammer tool build make',
    desc: ['망치를 뒤로 들었다가 내려치고 반동으로 튕깁니다.', 'The hammer winds up, strikes, and recoils.'],
    svg: '<path class="a" d="m14 10-9.25 9.25a1.5 1.5 0 0 1-2.12-2.12L11.9 7.9"/><path class="s" d="M10.6 6.4 13.4 3.6l7 7-2.8 2.8z"/>',
    origins: { '*': [4, 20] },
    effect: { '*': fx.keys([{ rotate: 0 }, { rotate: -22, offset: 0.35, easing: 'in' }, { rotate: 10, offset: 0.55, easing: 'out' }, { rotate: -3, offset: 0.78 }, { rotate: 0 }], 720, 'linear') }
  })
]);
