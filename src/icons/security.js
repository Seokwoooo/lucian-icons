import { C, icon, group, fx } from './_kit.js';

const DRAW_IN = (d = 380, delay = 120) => fx.keys([{ draw: 0, opacity: 0 }, { draw: 0.05, opacity: 1, offset: 0.1 }, { draw: 1, opacity: 1 }], d, 'out', delay);
const SEAL = 'M9.09 4.98Q12 1.74 14.91 4.98Q19.25 4.75 19.02 9.09Q22.26 12 19.02 14.91Q19.25 19.25 14.91 19.02Q12 22.26 9.09 19.02Q4.75 19.25 4.98 14.91Q1.74 12 4.98 9.09Q4.75 4.75 9.09 4.98z';

export default group('security', [
  icon({
    id: 'lock', name: ['자물쇠', 'Lock'], color: C.amber,
    keywords: '잠금 보안 비밀번호 해제 lock secure password unlock private',
    desc: ['고리가 들렸다가 옆으로 돌아 열리고, 잠글 때는 내려와 딸깍 걸립니다.', 'The shackle lifts and swings open; locking drops it back with a click.'],
    states: { locked: ['잠김', 'Locked'], unlocked: ['열림', 'Unlocked'] },
    svg: '<path data-part="shackle" d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/><rect class="s" x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path class="a" d="M12 14.6v2.3"/>',
    origins: { shackle: [8, 10.5] },
    poses: { unlocked: { shackle: { translate: [0, -2.4], rotate: -16 } } },
    transitions: {
      'locked>unlocked': { shackle: fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [0, -2.8], rotate: 0, offset: 0.35, easing: 'out' }, { translate: [0, -2.4], rotate: -16 }], 560, 'linear') },
      'unlocked>locked': {
        shackle: fx.keys([{ translate: [0, -2.4], rotate: -16 }, { translate: [0, -2.4], rotate: 0, offset: 0.45, easing: 'in' }, { translate: [0, 0.5], rotate: 0, offset: 0.75, easing: 'out' }, { translate: [0, 0], rotate: 0 }], 520, 'linear'),
        '*': fx.keys([{ translate: [0, 0] }, { translate: [0, 0], offset: 0.68 }, { translate: [0, 0.5], offset: 0.8 }, { translate: [0, 0] }], 520, 'linear')
      }
    },
    effect: { shackle: fx.keys([{ translate: [0, 0] }, { translate: [0, -1.1], offset: 0.3 }, { translate: [0, 0], offset: 0.55 }, { translate: [0, -0.45], offset: 0.75 }, { translate: [0, 0] }], 560) }
  }),
  icon({
    id: 'shield', name: ['방패', 'Shield'], color: C.green,
    keywords: '방패 보호 보안 안전 경고 shield protect security safe warning',
    desc: ['보호 상태에서는 체크가, 경고 상태에서는 흔들림과 함께 느낌표가 나타납니다.', 'Protected shows a check; the alert state shakes and shows an exclamation.'],
    states: { protected: ['보호됨', 'Protected'], alert: ['경고', 'Alert'] },
    svg: '<path class="s" d="M12 21s7.5-3.2 7.5-9.25V5.75L12 3 4.5 5.75v6C4.5 17.8 12 21 12 21z"/><path data-part="check" class="a" d="m8.75 11.75 2.25 2.25 4.25-4.5"/><g data-part="alert" class="a"><path d="M12 7.75v4.5"/><path d="M12 15.25h.01"/></g>',
    origins: { check: [12, 12], alert: [12, 12] },
    poses: { '*': { alert: { opacity: 0, scale: 0.5 } }, alert: { check: { draw: 0, opacity: 0 }, alert: { opacity: 1, scale: 1 } } },
    transitions: {
      'protected>alert': { check: { e: 'in', d: 140 }, alert: { e: 'bouncy', delay: 120 }, '*': fx.shake(1.2, 520, 100) },
      'alert>protected': { alert: { e: 'in', d: 140 }, check: DRAW_IN(), '*': fx.pop(1.08, 420, 80) }
    },
    effect: { '*': fx.pop(1.1, 520), check: fx.redraw(420, 120) }
  }),
  icon({
    id: 'key', name: ['열쇠', 'Key'], color: C.yellow,
    keywords: '열쇠 키 접근 권한 비밀번호 key access permission password',
    desc: ['열쇠가 천천히 꽂히듯 들어간 뒤 한 번 돌아가고, 잠시 머물렀다가 빠져나옵니다.', 'The key slides in slowly, turns once, holds a moment, and backs out.'],
    svg: '<circle class="s" cx="7.75" cy="16.25" r="4.25"/><circle class="f" cx="7.25" cy="16.75" r="1.2"/><path d="m10.75 13.25 9-9M16.75 7.25l2.5 2.5M14.25 9.75l2 2"/>',
    origins: { '*': [12, 12] },
    effect: { '*': fx.keys([{ translate: [0, 0], rotate: 0 }, { translate: [0.9, -0.9], rotate: 0, offset: 0.25 }, { translate: [0.9, -0.9], rotate: 22, offset: 0.52 }, { translate: [0.9, -0.9], rotate: 22, offset: 0.7 }, { translate: [0, 0], rotate: 0 }], 1300) }
  }),
  icon({
    id: 'fingerprint', name: ['지문', 'Fingerprint'], color: C.purple,
    keywords: '지문 생체 인증 로그인 fingerprint biometric auth touch id',
    desc: ['인식 중에는 빛줄기가 오르내리고, 마우스를 올리면 가운데부터 바깥으로 지문 결이 다시 그려집니다.', 'While scanning a light line sweeps; hovering redraws the ridges from the centre outward.'],
    states: { idle: ['대기', 'Idle'], scanning: ['인식 중', 'Scanning'] },
    svg: '<path data-part="r1" d="M3 13.5V12a9 9 0 0 1 16.2-5.4"/><path data-part="r2" d="M20.75 9.75c.17.73.25 1.48.25 2.25v1.75"/><path data-part="r3" d="M20.7 17.25c-.15.8-.38 1.6-.65 2.35"/><path data-part="mid" d="M7.1 19.5c.6-1.75.9-3.6.9-5.5V12a4 4 0 0 1 8 0v1.5c0 2.6-.4 5.1-1.15 7.5"/><path data-part="r6" d="M3.5 17.25c-.15.55-.35 1.1-.55 1.6"/><path data-part="r7" d="M18.5 12v1.75c0 1.75-.25 3.45-.75 5"/><path data-part="core" class="a" d="M12 11.75v2c0 3-.55 5.7-1.6 8"/><path data-part="scan" class="a" d="M4.5 12h15"/>',
    poses: { '*': { scan: { opacity: 0 } }, scanning: { scan: { opacity: 1 } } },
    loops: { scanning: { scan: fx.keys([{ translate: [0, 0] }, { translate: [0, -6.5] }, { translate: [0, 6.5] }, { translate: [0, 0] }], 1800, 'inOut') } },
    effect: { core: fx.redraw(380, 0), mid: fx.redraw(480, 100), r7: fx.redraw(260, 260), r1: fx.redraw(520, 300), r2: fx.redraw(240, 480), r3: fx.redraw(200, 560), r6: fx.redraw(200, 520) }
  }),
  icon({
    id: 'scanface', name: ['얼굴 인식', 'Face scan'], color: C.green,
    keywords: '얼굴 인식 페이스아이디 생체 인증 face id scan biometric unlock',
    desc: ['모서리 틀이 얼굴 쪽으로 좁혀졌다 벌어지고 빛줄기가 훑고 지나갑니다.', 'The corner frame closes in on the face as a scan line passes.'],
    svg: '<circle class="t" cx="12" cy="12" r="6"/><path data-part="frame" d="M3.5 8V6A2.5 2.5 0 0 1 6 3.5h2M16 3.5h2A2.5 2.5 0 0 1 20.5 6v2M20.5 16v2a2.5 2.5 0 0 1-2.5 2.5h-2M8 20.5H6A2.5 2.5 0 0 1 3.5 18v-2"/><path d="M9.5 10v1M14.5 10v1"/><path class="a" d="M9.25 15.25a4 4 0 0 0 5.5 0"/><path data-part="scan" class="a" d="M5 12h14"/>',
    poses: { '*': { scan: { opacity: 0 } } },
    effect: {
      frame: fx.keys([{ scale: 1 }, { scale: 0.86, offset: 0.4 }, { scale: 1.03, offset: 0.75 }, { scale: 1 }], 760),
      scan: fx.keys([{ translate: [0, -6], opacity: 0 }, { translate: [0, -5], opacity: 1, offset: 0.12 }, { translate: [0, 5], opacity: 1, offset: 0.85 }, { translate: [0, 6], opacity: 0 }], 760, 'inOut')
    }
  }),
  icon({
    id: 'password', name: ['비밀번호', 'Password'], color: C.violet,
    keywords: '비밀번호 암호 입력 로그인 password passcode pin login',
    desc: ['가려진 글자가 하나씩 입력되고 커서가 깜빡입니다.', 'Masked characters type in one by one while the caret blinks.'],
    svg: '<rect class="s" x="2.5" y="7" width="19" height="10" rx="2.5"/><circle data-part="c1" class="k" cx="6.75" cy="12" r="1.15"/><circle data-part="c2" class="k" cx="10.25" cy="12" r="1.15"/><circle data-part="c3" class="k" cx="13.75" cy="12" r="1.15"/><path data-part="caret" class="a" d="M17.5 9.75v4.5"/>',
    origins: { c1: [6.75, 12], c2: [10.25, 12], c3: [13.75, 12] },
    effect: {
      c1: fx.keys([{ scale: 1, opacity: 0 }, { scale: 0, opacity: -1, offset: 0.01 }, { scale: 0, opacity: -1, offset: 0.12 }, { scale: 1.3, opacity: 0, offset: 0.26 }, { scale: 1 }], 900, 'out'),
      c2: fx.keys([{ scale: 1, opacity: 0 }, { scale: 0, opacity: -1, offset: 0.01 }, { scale: 0, opacity: -1, offset: 0.3 }, { scale: 1.3, opacity: 0, offset: 0.44 }, { scale: 1 }], 900, 'out'),
      c3: fx.keys([{ scale: 1, opacity: 0 }, { scale: 0, opacity: -1, offset: 0.01 }, { scale: 0, opacity: -1, offset: 0.48 }, { scale: 1.3, opacity: 0, offset: 0.62 }, { scale: 1 }], 900, 'out'),
      caret: fx.keys([{ opacity: 0 }, { opacity: -1, offset: 0.7 }, { opacity: -1, offset: 0.85 }, { opacity: 0 }], 900, 'linear')
    }
  }),
  icon({
    id: 'verified', name: ['인증됨', 'Verified'], color: C.blue,
    keywords: '인증 공식 확인 배지 verified official badge check trust',
    desc: ['물결 배지가 살짝 돌고 체크가 다시 그려집니다.', 'The scalloped badge rotates a notch and the check redraws.'],
    svg: `<path data-part="seal" class="s" d="${SEAL}"/><path data-part="check" class="a" d="m8.75 12.25 2.25 2.25 4.25-4.5"/>`,
    origins: { seal: [12, 12] },
    effect: { seal: fx.keys([{ rotate: 0, scale: 1 }, { rotate: 45, scale: 1.08, offset: 0.55 }, { rotate: 45, scale: 1 }], 720, 'inOut'), check: fx.redraw(420, 260) }
  }),
  icon({
    id: 'siren', name: ['경광등', 'Siren'], color: C.red,
    keywords: '경광등 경보 비상 알람 siren alarm emergency alert',
    desc: ['켜져 있는 동안 빛살이 번갈아 깜빡입니다.', 'While on, the light rays flash in alternation.'],
    states: { off: ['꺼짐', 'Off'], on: ['켜짐', 'On'] },
    svg: '<path class="s" d="M6.5 17v-5a5.5 5.5 0 0 1 11 0v5"/><path class="a" d="M12 9.5v4"/><rect x="4.5" y="17" width="15" height="3.5" rx="1"/><path data-part="raysL" class="a" d="M4.2 5.2l1.1 1.1M2.5 12H4"/><path data-part="raysR" class="a" d="M19.8 5.2l-1.1 1.1M20 12h1.5"/><path data-part="rayT" class="a" d="M12 2.5V4"/>',
    poses: { '*': { raysL: { opacity: 0 }, raysR: { opacity: 0 }, rayT: { opacity: 0 } }, on: { raysL: { opacity: 1 }, raysR: { opacity: 1 }, rayT: { opacity: 1 } } },
    loops: { on: { raysL: fx.keys([{ opacity: 0 }, { opacity: -1, offset: 0.5 }, { opacity: 0 }], 700, 'linear'), raysR: fx.keys([{ opacity: -1 }, { opacity: 0, offset: 0.5 }, { opacity: -1 }], 700, 'linear') } },
    effect: { raysL: fx.flash(560, 0), raysR: fx.flash(560, 140), rayT: fx.flash(560, 70), '*': fx.shake(0.6, 420) }
  })
]);
