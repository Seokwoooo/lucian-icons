/* Lucian Icons v1.2.0 | MIT (c) 2026 Lucian | https://lucianlabs.dev/icons/ */
export const VERSION = '1.2.0';
export const tokens = { accent: '#b7a4ff', ink: '#252b2a', paper: '#fffdf8' };
export function normalize(def, options = {}) {
  const color = (value, fallback) => /^#[\da-f]{6}$/i.test(value || '') ? value : fallback;
  const size = Number(options.size ?? 48);
  const progress = Number(options.progress ?? 0);
  return {
    state: Object.hasOwn(def.states, options.state) ? options.state : def.defaultState,
    size: Number.isFinite(size) ? Math.min(256, Math.max(16, size)) : 48,
    progress: Number.isFinite(progress) ? Math.min(100, Math.max(0, progress)) : 0,
    accent: color(options.accent, def.accent || tokens.accent),
    ink: color(options.ink, tokens.ink), paper: color(options.paper, tokens.paper)
  };
}
export function partStyles(def, options) {
  const result = {};
  for (const [name, base] of Object.entries(def.parts)) result[name] = { ...base, ...def.states[options.state][name] };
  if (def.id === 'download') result.progress = {...result.progress, strokeDashoffset: String(100 - options.progress)};
  return result;
}
export function staticSVG(def, options = {}) {
  const o = normalize(def, options);
  const kebab = name => name.replace(/[A-Z]/g, c => '-'+c.toLowerCase());
  const styles = partStyles(def,o);
  let drawing = def.svg.replace(/data-part="([\w-]+)"/g, (attr, part) => {
    const style = Object.entries({transformBox:'view-box',transformOrigin:'24px 24px',...styles[part]}).map(([k,v]) => `${kebab(k)}:${v}`).join(';');
    return `${attr} style="${style}"`;
  });
  drawing = drawing.replaceAll('var(--li-accent)',o.accent).replaceAll('var(--li-ink)',o.ink).replaceAll('var(--li-paper)',o.paper);
  return `<!-- Lucian Icons ${def.id} v${def.version} | MIT (c) 2026 Lucian -->\n<svg xmlns="http://www.w3.org/2000/svg" width="${o.size}" height="${o.size}" viewBox="0 0 48 48" fill="none" stroke="${o.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="${def.name.en} (${o.state})">${drawing}</svg>`;
}
export function defineIcon(def) {
  const tag = `lucian-${def.id}`;
  if (customElements.get(tag)) return customElements.get(tag);
  class LucianIcon extends HTMLElement {
    static observedAttributes = ['state','size','accent','ink','paper','progress','label'];
    constructor() {
      super();
      this.attachShadow({mode:'open'});
      this.shadowRoot.innerHTML = `<style>:host{display:inline-flex;vertical-align:middle;line-height:0;flex-shrink:0;contain:layout style}:host>svg{display:block;width:100%;height:100%;overflow:visible} [data-part]{transform-box:view-box;transition:transform ${def.duration || 320}ms ${def.easing || 'cubic-bezier(.2,.8,.2,1)'},fill 220ms ease,opacity 180ms ease,stroke-dashoffset 250ms ease;transform-origin:24px 24px}${def.css || ''}@media(prefers-reduced-motion:reduce){[data-part]{transition:none!important;animation:none!important}}</style><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="var(--li-ink)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${def.svg}</svg>`;
    }
    connectedCallback() { this._render(); }
    attributeChangedCallback() { this._render(); }
    setState(state) {
      if (!Object.hasOwn(def.states, state)) throw new RangeError(`Unsupported ${def.id} state: ${state}`);
      this.setAttribute('state',state);
    }
    setProgress(value) {
      if (def.id !== 'download') throw new TypeError('Only download supports progress');
      if (!Number.isFinite(Number(value))) throw new TypeError('Progress must be finite');
      this.setAttribute('progress',String(Math.max(0,Math.min(100,Number(value)))));
    }
    get state() { return normalize(def,{state:this.getAttribute('state')}).state; }
    _render() {
      if (!this.shadowRoot) return;
      const raw = Object.fromEntries(['state','size','accent','ink','paper','progress'].map(k=>[k,this.getAttribute(k)??undefined]));
      const o = normalize(def,raw);
      this.style.width = o.size+'px'; this.style.height = o.size+'px';
      this.style.setProperty('--li-accent',o.accent);this.style.setProperty('--li-ink',o.ink);this.style.setProperty('--li-paper',o.paper);
      const svg=this.shadowRoot.querySelector('svg');svg.dataset.state=o.state;
      const label=this.getAttribute('label');
      if (label) { svg.removeAttribute('aria-hidden');svg.setAttribute('role','img');svg.setAttribute('aria-label',label); }
      else { svg.setAttribute('aria-hidden','true');svg.removeAttribute('role');svg.removeAttribute('aria-label'); }
      for(const [part,styles] of Object.entries(partStyles(def,o))) {
        const node=this.shadowRoot.querySelector(`[data-part="${part}"]`);
        if(node) for(const [key,value] of Object.entries(styles)) node.style[key]=value;
      }
    }
  }
  customElements.define(tag,LucianIcon);
  return LucianIcon;
}
