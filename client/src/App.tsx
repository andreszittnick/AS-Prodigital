import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { CookieConsentProvider } from "@/hooks/use-cookie-consent";
import FloatingContactButtons from "@/components/floating-contact-buttons";
import CookieBanner from "@/components/cookie-banner";
import CookieSettingsModal from "@/components/cookie-settings-modal";
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

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <FloatingContactButtons />
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
      <CookieBanner />
      <CookieSettingsModal />
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <CookieConsentProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </CookieConsentProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
