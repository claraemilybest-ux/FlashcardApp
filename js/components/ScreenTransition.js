// Reusable cross-document transition for MPAs
// Usage:
// import ScreenTransition from './components/ScreenTransition.js'
// ScreenTransition.init();
// ScreenTransition.start('/other-page.html') // programmatic navigation with transition

const KEY = 'mpa:screen-transition';

function merge(a, b) {
  return Object.assign({}, a, b);
}

function injectStyles(duration) {
  if (document.getElementById('mpa-screen-transition-styles')) return;
  const style = document.createElement('style');
  style.id = 'mpa-screen-transition-styles';
  style.textContent = `
  .mpa-overlay{position:fixed;inset:0;background:var(--mpa-bg,#fff);transform:translateY(100%);transition:transform ${duration}ms cubic-bezier(.2,.9,.2,1);z-index:9999;pointer-events:none}
  .mpa-overlay.show{transform:translateY(0)}
  .mpa-overlay.hide{transform:translateY(-100%)}
  `;
  document.head.appendChild(style);
}

function createOverlay(bg, duration) {
  injectStyles(duration);
  const overlay = document.createElement('div');
  overlay.className = 'mpa-overlay';
  overlay.style.setProperty('--mpa-bg', bg || '#fff');
  overlay.style.setProperty('--mpa-duration', `${duration}ms`);
  return overlay;
}

function isLocalUrl(urlString) {
  try {
    const url = new URL(urlString, location.href);
    return url.origin === location.origin;
  } catch (e) {
    return false;
  }
}

function getHrefFromElement(el){
  // anchors use href, other elements can use data-href
  if (!el) return null;
  if (el.tagName === 'A' && el.hasAttribute('href')) return el.getAttribute('href');
  if (el.dataset && el.dataset.href) return el.dataset.href;
  if (el.hasAttribute && el.hasAttribute('data-href')) return el.getAttribute('data-href');
  return null;
}

const defaults = {
  duration: 500,
  bg: '#ffffff',
  selector: 'a', // by default attach to all links, filtered to same-origin
  includeHash: false
};

const ScreenTransition = {
  _opts: Object.assign({}, defaults),

  init(options = {}) {
    this._opts = merge(this._opts, options);
    // run enter animation if present
    this._runEnter();
    // attach to links
    this._attachLinks();
  },

  start(href, opts = {}) {
    const o = merge(this._opts, opts);
    // store options so next page can run enter
    try { sessionStorage.setItem(KEY, JSON.stringify({ bg: o.bg, duration: o.duration })); } catch (_) {}
    const overlay = createOverlay(o.bg, o.duration);
    document.body.appendChild(overlay);
    // force a frame so transition runs
    requestAnimationFrame(() => {
      overlay.classList.add('show');
      setTimeout(() => {
        // navigate after animation
        location.href = href;
      }, o.duration);
    });
  },

  _attachLinks() {
    // default to anchors and elements that carry a data-href (buttons, divs, etc.)
    const sel = this._opts.selector || 'a, [data-href]';
    const links = Array.from(document.querySelectorAll(sel));
    links.forEach(el => {
      const href = getHrefFromElement(el);
      if (!href) return;

      // For anchors, skip if target=_blank or download or rel=external
      if (el.tagName === 'A' && (el.target === '_blank' || el.hasAttribute('download') || el.getAttribute('rel') === 'external')) return;

      // ensure same-origin URL
      if (!isLocalUrl(href)) return;

      // optional: ignore same-page hash navigation for anchors
      if (!this._opts.includeHash && el.tagName === 'A'){
        try {
          const url = new URL(href, location.href);
          if (url.pathname === location.pathname && url.hash) return;
        } catch(e){}
      }

      // avoid double-binding
      if (el.__mpaBound) return;
      el.__mpaBound = true;

      el.addEventListener('click', (e) => {
        // allow modifier keys to open in new tab
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        // for anchors, prevent default; for other elements also prevent to avoid form submits etc
        e.preventDefault();
        this.start(href);
      });
    });
  },

  _runEnter() {
    let data = null;
    try { data = JSON.parse(sessionStorage.getItem(KEY)); } catch (e) { data = null; }
    if (!data) return;
    // create overlay already visible
    const duration = data.duration || this._opts.duration;
    const overlay = createOverlay(data.bg || this._opts.bg, duration);
    // append in 'shown' state
    overlay.classList.add('show');
    document.body.appendChild(overlay);
    // next frame, slide it away
    requestAnimationFrame(() => {
      // remove show / add hide to slide up
      overlay.classList.remove('show');
      overlay.classList.add('hide');
      setTimeout(() => {
        overlay.remove();
        try { sessionStorage.removeItem(KEY); } catch (_) {}
      }, duration);
    });
  }
};

export default ScreenTransition;
