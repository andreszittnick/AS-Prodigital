// SSR setup must be the first import so browser-API stubs are in place
// before any React component module initialises.
import "./ssr-setup";

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

/** A static, never-navigating location hook for wouter SSR.
 *  Provides getServerSnapshot so React 18's useSyncExternalStore is satisfied. */
function staticLocationHook(path: string) {
  const getPath = () => path;
  const noopSubscribe = () => () => {};
  return () =>
    [
      useSyncExternalStore(noopSubscribe, getPath, getPath),
      () => {},
    ] as [string, (to: string) => void];
}

/** Returns every URL that needs a static HTML file. */
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

  // cities is Record<slug, CityData>; each slug gets a webdesign and seo page
  const cityRoutes = Object.keys(cities).flatMap((slug) => [
    `/webdesign-${slug}`,
    `/seo-${slug}`,
  ]);

  return [...staticRoutes, ...blogRoutes, ...cityRoutes];
}

/** Renders a single route to HTML. Throws on failure – callers decide recovery. */
export function render(url: string): { html: string; helmet: unknown } {
  const helmetContext: { helmet?: unknown } = {};

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, enabled: false, staleTime: Infinity },
    },
  });

  const hook = staticLocationHook(url);

  const html = renderToString(
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

  return { html, helmet: helmetContext.helmet };
}
