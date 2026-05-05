import { renderToString } from "react-dom/server";
import { useSyncExternalStore } from "react";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Switch, Route } from "wouter";
import { CookieConsentProvider } from "@/hooks/use-cookie-consent";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/home";
import Services from "@/pages/services";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import WebdesignAlzey from "@/pages/webdesign-alzey";
import SeoAlzey from "@/pages/seo-alzey";
import RichCityWebdesignPage from "@/pages/rich-city-webdesign-page";
import RichCitySeoPage from "@/pages/rich-city-seo-page";
import SeoAlzeyLanding from "@/pages/seo-alzey-landing";
import Blog from "@/pages/blog";
import BlogDetail from "@/pages/blog-detail";
import Impressum from "@/pages/impressum";
import Datenschutz from "@/pages/datenschutz";
import AGB from "@/pages/agb";
import VideoAnalyse from "@/pages/video-analyse";
import NotFound from "@/pages/not-found";

import { blogPosts } from "@/data/blog-posts";
import { cities } from "@/data/cities";

const CITY_SLUGS = Object.keys(cities);

function staticLocationHook(path: string) {
  const getPath = () => path;
  const noopSubscribe = () => () => {};
  return () =>
    [
      useSyncExternalStore(noopSubscribe, getPath, getPath),
      () => {},
    ] as [string, (to: string) => void];
}

function setupPolyfills() {
  if (typeof (globalThis as any).window !== "undefined") return;

  (globalThis as any).window = {
    location: {
      pathname: "/",
      href: "https://www.as-prodigital.de/",
      search: "",
      hash: "",
    },
    scrollTo: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    matchMedia: () => ({
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
    }),
    innerWidth: 1200,
    innerHeight: 800,
    history: { pushState: () => {}, replaceState: () => {}, state: null, length: 1 },
    requestAnimationFrame: (cb: () => void) => setTimeout(cb, 0),
    cancelAnimationFrame: (id: ReturnType<typeof setTimeout>) => clearTimeout(id),
    performance: { now: () => Date.now() },
    self: globalThis,
  };

  (globalThis as any).document = {
    documentElement: {
      classList: {
        add: () => {},
        remove: () => {},
        toggle: () => {},
        contains: () => false,
      },
      style: {},
      lang: "de",
    },
    body: {
      style: {},
      classList: { add: () => {}, remove: () => {}, contains: () => false },
    },
    createElement: () => ({
      style: {},
      setAttribute: () => {},
      removeAttribute: () => {},
      className: "",
      innerHTML: "",
      appendChild: () => {},
      removeChild: () => {},
      children: [],
    }),
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    head: {
      appendChild: () => {},
      removeChild: () => {},
      querySelector: () => null,
      querySelectorAll: () => [],
    },
    createTextNode: (t: string) => ({ nodeValue: t }),
    createComment: (t: string) => ({ nodeValue: t }),
    createDocumentFragment: () => ({ appendChild: () => {} }),
    addEventListener: () => {},
    removeEventListener: () => {},
  };

  (globalThis as any).navigator = { userAgent: "node", language: "de", languages: ["de"] };

  const noopStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  };
  (globalThis as any).localStorage = noopStorage;
  (globalThis as any).sessionStorage = noopStorage;

  (globalThis as any).IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    constructor() {}
  };
  (globalThis as any).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    constructor() {}
  };
  (globalThis as any).MutationObserver = class {
    observe() {}
    disconnect() {}
    constructor(_cb: unknown) {}
  };

  (globalThis as any).requestAnimationFrame = (cb: () => void) => setTimeout(cb, 0);
  (globalThis as any).cancelAnimationFrame = (id: ReturnType<typeof setTimeout>) => clearTimeout(id);
  (globalThis as any).performance = { now: () => Date.now() };
  (globalThis as any).CustomEvent = class extends Event {};
  (globalThis as any).getComputedStyle = () => ({
    getPropertyValue: () => "",
    setProperty: () => {},
  });
}

export function getRoutes(): string[] {
  const staticRoutes = [
    "/",
    "/leistungen",
    "/ueber-mich",
    "/kontakt",
    "/webdesign",
    "/seo",
    "/blog",
    "/video-analyse",
    "/impressum",
    "/datenschutz",
    "/agb",
  ];

  const blogRoutes = blogPosts.map((p) => `/blog/${p.slug}`);

  const cityRoutes = CITY_SLUGS.flatMap((slug) => [
    `/webdesign-${slug}`,
    `/seo-${slug}`,
  ]);

  return [...staticRoutes, ...blogRoutes, ...cityRoutes];
}

export function render(url: string): { html: string; helmet: unknown } {
  setupPolyfills();

  const helmetContext: { helmet?: unknown } = {};

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, enabled: false, staleTime: Infinity },
    },
  });

  const hook = staticLocationHook(url);

  let html = "";
  try {
    html = renderToString(
      <HelmetProvider context={helmetContext}>
        <QueryClientProvider client={queryClient}>
          <CookieConsentProvider>
            <TooltipProvider>
              <Router hook={hook}>
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/leistungen" component={Services} />
                  <Route path="/ueber-mich" component={About} />
                  <Route path="/kontakt" component={Contact} />
                  <Route path="/webdesign" component={WebdesignAlzey} />
                  <Route path="/seo" component={SeoAlzey} />
                  <Route path="/webdesign-alzey" component={RichCityWebdesignPage} />
                  <Route path="/webdesign-worms" component={RichCityWebdesignPage} />
                  <Route path="/webdesign-kaiserslautern" component={RichCityWebdesignPage} />
                  <Route path="/webdesign-bingen" component={RichCityWebdesignPage} />
                  <Route path="/webdesign-bad-kreuznach" component={RichCityWebdesignPage} />
                  <Route path="/webdesign-ingelheim" component={RichCityWebdesignPage} />
                  <Route path="/webdesign-mannheim" component={RichCityWebdesignPage} />
                  <Route path="/seo-alzey" component={SeoAlzeyLanding} />
                  <Route path="/seo-worms" component={RichCitySeoPage} />
                  <Route path="/seo-kaiserslautern" component={RichCitySeoPage} />
                  <Route path="/seo-bingen" component={RichCitySeoPage} />
                  <Route path="/seo-bad-kreuznach" component={RichCitySeoPage} />
                  <Route path="/seo-ingelheim" component={RichCitySeoPage} />
                  <Route path="/seo-mannheim" component={RichCitySeoPage} />
                  <Route path="/blog" component={Blog} />
                  <Route path="/blog/:slug" component={BlogDetail} />
                  <Route path="/impressum" component={Impressum} />
                  <Route path="/datenschutz" component={Datenschutz} />
                  <Route path="/agb" component={AGB} />
                  <Route path="/video-analyse" component={VideoAnalyse} />
                  <Route component={NotFound} />
                </Switch>
              </Router>
            </TooltipProvider>
          </CookieConsentProvider>
        </QueryClientProvider>
      </HelmetProvider>
    );
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.warn(`[SSR] ${url}: ${msg}`);
  }

  return { html, helmet: helmetContext.helmet };
}
