/**
 * Minimal browser-API stubs for react-dom/server renderToString in Node.js.
 *
 * IMPORTANT — canUseDOM in react-helmet-async v2:
 *   canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement)
 *
 * We must satisfy these constraints simultaneously:
 *   1. `typeof window !== "undefined"` → true   (some libraries access window.* at module init)
 *   2. `window.document.createElement` → falsy   (so canUseDOM = false → synchronous SSR path)
 *      This ensures react-helmet-async populates helmetContext.helmet synchronously after
 *      renderToString, rather than scheduling an async requestAnimationFrame update.
 *
 * All other DOM stubs (localStorage, matchMedia, observers, document body/head) are
 * still provided so rendering libraries can run without errors.
 */

if (typeof globalThis.window === "undefined") {
  const noop = (): void => {};

  const eventTargetMixin = {
    addEventListener: noop,
    removeEventListener: noop,
    dispatchEvent: () => true,
  };

  function makeEl(extra: Record<string, unknown> = {}) {
    return {
      ...eventTargetMixin,
      style: {},
      className: "",
      innerHTML: "",
      textContent: "",
      setAttribute: noop,
      removeAttribute: noop,
      getAttribute: () => null,
      hasAttribute: () => false,
      appendChild: noop,
      removeChild: noop,
      insertBefore: noop,
      contains: () => false,
      querySelector: () => null,
      querySelectorAll: () => [],
      getBoundingClientRect: () => ({
        top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0, x: 0, y: 0,
      }),
      classList: {
        add: noop, remove: noop, toggle: noop,
        contains: () => false, replace: noop,
      },
      ...extra,
    };
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const g = globalThis as any;

  // DOM element class stubs for instanceof checks (lucide-react, radix-ui, framer-motion)
  g.Element = class Element {
    constructor() { Object.assign(this, makeEl()); }
  };
  g.HTMLElement = class HTMLElement extends g.Element {};
  g.SVGElement = class SVGElement extends g.Element {};

  class NoopObserver {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }

  const noopStorage: Storage = {
    length: 0,
    clear: noop,
    getItem: () => null,
    key: () => null,
    removeItem: noop,
    setItem: noop,
  };

  g.localStorage = noopStorage;
  g.sessionStorage = noopStorage;

  g.IntersectionObserver = NoopObserver;
  g.ResizeObserver = NoopObserver;
  g.MutationObserver = class extends NoopObserver {
    constructor(_cb: unknown) { super(); }
  };

  g.matchMedia = () => ({
    matches: false,
    addEventListener: noop,
    removeEventListener: noop,
    addListener: noop,
    removeListener: noop,
  });

  g.requestAnimationFrame = (cb: () => void) => setTimeout(cb, 0);
  g.cancelAnimationFrame = clearTimeout;
  g.performance ??= { now: () => Date.now() };

  g.navigator = { userAgent: "node", language: "de", languages: ["de"] };
  g.history = { pushState: noop, replaceState: noop, state: null, length: 1 };
  g.scrollTo = noop;
  g.innerWidth = 1200;
  g.innerHeight = 800;

  g.addEventListener = noop;
  g.removeEventListener = noop;
  g.dispatchEvent = () => true;

  const head = makeEl();
  const body = makeEl();
  const docEl = makeEl();

  // document stub: intentionally omits createElement / createElementNS so that
  // react-helmet-async's canUseDOM check evaluates to false (SSR synchronous path).
  // During renderToString, no code path needs to create real DOM elements.
  g.document = {
    ...eventTargetMixin,
    documentElement: docEl,
    body,
    head,
    createTextNode: (data: string) => ({ nodeValue: data, textContent: data }),
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementsByTagName: () => [],
    getElementsByClassName: () => [],
    readyState: "complete",
    cookie: "",
  };

  // window = globalThis: required so libraries that access window.* at module
  // init don't throw "window is not defined". Because document.createElement is
  // absent, window.document.createElement is undefined → canUseDOM = false.
  g.window = g;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
