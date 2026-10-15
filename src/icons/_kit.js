// Authoring kit for Lucian Icons. Every icon file imports from here.
// Definitions stay plain data: the build serializes them to JSON modules.

// One palette, tuned in OKLCH so every hue sits at a similar weight.
export const C = {
  red: '#F05465', coral: '#F0764F', orange: '#F48D2F', amber: '#F4AF2D', yellow: '#F2CF3B',
  lime: '#98CB46', green: '#43B966', teal: '#24B6A1', cyan: '#26B7D3', blue: '#3093EC',
  indigo: '#5D73EA', violet: '#8968F4', purple: '#AC5CD7', pink: '#E662A8', slate: '#7A8798'
};

export const CATEGORIES = {
  files: ['파일·문서', 'Files'], communication: ['소통', 'Communication'], security: ['보안', 'Security'],
  navigation: ['탐색·기본', 'Interface'], editing: ['편집·도구', 'Editing'], media: ['미디어', 'Media'],
  devices: ['기기', 'Devices'], data: ['데이터·개발', 'Data & Code'], commerce: ['쇼핑·금융', 'Commerce'],
  people: ['사람', 'People'], travel: ['이동·장소', 'Travel'], nature: ['날씨·자연', 'Nature'], lifestyle: ['생활', 'Lifestyle']
};

// Shorthand → runtime shape.
//   name: ['쓰레기통', 'Trash']           desc: ['…', '…']
//   states: { closed: ['닫힘', 'Closed'], open: ['열림', 'Open'] }  (first is default)
//   keywords: 'space separated words'
export function icon(d) {
  const out = { ...d };
  if (Array.isArray(d.name)) out.name = { ko: d.name[0], en: d.name[1] };
  if (d.desc) { out.description = { ko: d.desc[0], en: d.desc[1] }; delete out.desc; }
  if (typeof d.keywords === 'string') out.keywords = d.keywords.trim().split(/\s+/);
  if (d.states && !Array.isArray(d.states)) {
    out.stateLabels = { ko: {}, en: {} };
    for (const [k, [ko, en]] of Object.entries(d.states)) { out.stateLabels.ko[k] = ko; out.stateLabels.en[k] = en; }
    out.states = Object.keys(d.states);
    out.defaultState ??= out.states[0];
  }
  return out;
}
export const group = (category, icons) => icons.map(i => ({ ...i, category }));

// Motion vocabulary. Effects are composited on top of the current pose, so
// translate/rotate/opacity values are offsets and scale values are factors.
const at = (frames, offsets) => frames.map((f, i) => offsets?.[i] == null ? f : { ...f, offset: offsets[i] });
export const fx = {
  // pendulum swing that decays, for bells, tags, hanging things
  wiggle: (amp = 12, d = 720, delay = 0) => ({ k: [0, 1, -0.72, 0.42, -0.18, 0].map(f => ({ rotate: amp * f })), d, delay, e: 'swing' }),
  // horizontal refusal shake
  shake: (amp = 1.1, d = 460, delay = 0) => ({ k: [0, -1, 1, -0.6, 0.3, 0].map(f => ({ translate: [amp * f, 0] })), d, delay, e: 'linear' }),
  // move toward a direction and spring back
  nudge: ([x, y], d = 560, delay = 0) => ({ k: at([{ translate: [0, 0] }, { translate: [x, y] }, { translate: [-x * 0.18, -y * 0.18] }, { translate: [0, 0] }], [0, 0.38, 0.72, 1]), d, delay, e: 'inOut' }),
  // scale pulse with a small rebound
  pop: (s = 1.14, d = 520, delay = 0) => ({ k: at([{ scale: 1 }, { scale: s }, { scale: 1 - (s - 1) * 0.3 }, { scale: 1 }], [0, 0.34, 0.68, 1]), d, delay, e: 'inOut' }),
  // squash before springing up: anticipation then overshoot
  hop: (h = 2, d = 620, delay = 0) => ({ k: at([{ translate: [0, 0], scale: 1 }, { translate: [0, 0.4], scale: [1.06, 0.92] }, { translate: [0, -h], scale: [0.96, 1.05] }, { translate: [0, 0.2], scale: [1.03, 0.97] }, { translate: [0, 0], scale: 1 }], [0, 0.18, 0.5, 0.8, 1]), d, delay, e: 'inOut' }),
  // turn by an angle and come back with overshoot
  turn: (deg = 30, d = 640, delay = 0) => ({ k: at([{ rotate: 0 }, { rotate: deg }, { rotate: -deg * 0.12 }, { rotate: 0 }], [0, 0.42, 0.76, 1]), d, delay, e: 'inOut' }),
  // full revolution (ends where it began)
  spin: (deg = 360, d = 760, delay = 0, e = 'inOut') => ({ k: [{ rotate: 0 }, { rotate: deg }], d, delay, e }),
  // draw a stroke again from its start
  redraw: (d = 560, delay = 0) => ({ k: at([{ draw: 0, opacity: -1 }, { draw: 0.03, opacity: 0 }, { draw: 1, opacity: 0 }], [0, 0.06, 1]), d, delay, e: 'out' }),
  // brief disappearance, like a blink or a flicker
  blink: (d = 420, delay = 0) => ({ k: at([{ opacity: 0 }, { opacity: -1 }, { opacity: -1 }, { opacity: 0 }], [0, 0.3, 0.55, 1]), d, delay, e: 'linear' }),
  // squash vertically around the origin (blink of an eye, a press)
  squish: (sy = 0.15, d = 380, delay = 0) => ({ k: at([{ scale: 1 }, { scale: [1, sy] }, { scale: 1 }], [0, 0.45, 1]), d, delay, e: 'inOut' }),
  // appear from nothing (for parts hidden at rest: base opacity 0)
  flash: (d = 600, delay = 0, s = 0.6) => ({ k: at([{ opacity: 0, scale: s }, { opacity: 1, scale: 1.08 }, { opacity: 1, scale: 1 }, { opacity: 0, scale: 1 }], [0, 0.3, 0.7, 1]), d, delay, e: 'out' }),
  // backspace a stroke from its end, then type it back in: [erase start, erase end], [type start, type end] as 0..1 offsets
  retype: ([a, b], [c, e], d = 1000) => ({ k: [{ draw: 1 }, { draw: 1, offset: a }, { draw: 0, offset: b, easing: 'out' }, { draw: 0, offset: c, easing: 'inOut' }, { draw: 1, offset: e }, { draw: 1 }], d, delay: 0, e: 'linear' }),
  // custom keyframes
  keys: (k, d = 600, e = 'inOut', delay = 0) => ({ k, d, e, delay })
};
