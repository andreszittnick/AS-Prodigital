import { useLocation, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Monitor, Smartphone, Zap, Search, Phone, Mail, MapPin, ArrowRight, Star, ChevronDown } from "lucide-react";
import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { getCityData } from "@/data/cities";
import NotFound from "@/pages/not-found";


export default function CityWebdesignPage() {
  const [location] = useLocation();
  const citySlug = location.replace("/webdesign-", "");
  const city = getCityData(citySlug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!city) return <NotFound />;

  const canonical = `https://www.as-prodigital.de/webdesign-${city.slug}`;

  const features = [
    {
      icon: Monitor,
      title: "Individuelles Design",
      desc: `Keine Templates, keine Baukastensysteme. Ihre Website in ${city.name} wird individuell für Ihr Unternehmen gestaltet – damit Sie sich von der Masse abheben.`,
    },
    {
      icon: Smartphone,
      title: "Responsive & Mobiloptimiert",
      desc: "Über 60% aller Suchanfragen kommen heute vom Smartphone. Ihre Website ist auf jedem Gerät perfekt – Smartphone, Tablet und Desktop.",
    },
    {
      icon: Zap,
      title: "Schnell & Performant",
      desc: "Schnelle Ladezeiten sind entscheidend: Google bevorzugt schnelle Websites – und Besucher verlassen langsame Seiten innerhalb von Sekunden.",
    },
    {
      icon: Search,
      title: "SEO von Anfang an",
      desc: `Jede Website wird von Grund auf für Suchmaschinen optimiert – mit sauberem Code, optimierten Texten und technischer Basis für gute Google-Rankings in ${city.name}.`,
    },
  ];

  const process = [
    { step: "01", title: "Kostenloses Erstgespräch", desc: "Wir besprechen Ihre Ziele, Zielgruppe und was Ihre Website leisten soll – unverbindlich und ohne Zeitdruck." },
    { step: "02", title: "Konzept & Design", desc: "Sie erhalten einen individuellen Entwurf – abgestimmt auf Ihr Unternehmen, Ihre Branche und Ihre Zielgruppe." },
    { step: "03", title: "Entwicklung & Umsetzung", desc: "Saubere, schnelle Entwicklung mit modernen Technologien – SEO-optimiert von der ersten Zeile Code." },
    { step: "04", title: "Launch & persönliche Betreuung", desc: "Ihre Website geht online – und ich stehe Ihnen auch danach als persönlicher Ansprechpartner zur Seite." },
  ];

  const usp = [
    "Persönlicher Ansprechpartner von Anfang bis Ende – kein Callcenter, kein Ticket-System",
    "Faire, transparente Preise ohne versteckte Kosten – günstiger als externe Anbieter",
    "SEO von Anfang an: Jede Website wird suchmaschinenoptimiert entwickelt",
    "Schnelle Umsetzung: Von der Idee zur fertigen Website in 2–6 Wochen",
    "Langfristige Partnerschaft: Ich bin auch nach dem Launch für Sie da",
    "Keine Bindung an teure Baukastensysteme – Ihre Website gehört Ihnen",
  ];

  return (
    <>
      <Helmet>
        <title>{`Webdesign ${city.name} | Website & SEO | AS-ProDigital`}</title>
        <meta name="description" content={city.webdesignDescription} />
        <meta name="keywords" content={city.webdesignKeywords.join(", ")} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={`Webdesign ${city.name} | AS-ProDigital`} />
        <meta property="og:description" content={city.webdesignDescription} />
        <meta property="og:locale" content="de_DE" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Webdesign",
            "name": `Webdesign ${city.name}`,
            "provider": {
              "@type": "LocalBusiness",
              "@id": "https://www.as-prodigital.de/#organization",
              "name": "AS-ProDigital",
              "founder": { "@type": "Person", "name": "André Szittnick" },
              "telephone": "+49-6731-8789",
              "email": "info@as-prodigital.de",
              "address": { "@type": "PostalAddress", "addressLocality": "Alzey", "postalCode": "55232", "addressRegion": "Rheinland-Pfalz", "addressCountry": "DE" },
              "url": "https://www.as-prodigital.de",
            },
            "areaServed": { "@type": "City", "name": city.nameFull },
            "description": city.webdesignDescription,
            "url": canonical,
          })
        }} />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navigation />

        {/* Hero */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden dynamic-background">
          <div className="absolute inset-0 bg-white/85 dark:bg-gray-900/90" />
          <div className="relative max-w-5xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block bg-[#fa5219]/10 text-[#fa5219] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Webdesign in {city.name}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-[#19243b] dark:text-white mb-5 leading-tight">
                Professionelles <span className="text-[#fa5219]">Webdesign</span> in {city.name}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                Individuelle Websites für Unternehmen in {city.nameFull} – mit persönlichem Service,
                fairen Preisen und SEO von Anfang an.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/kontakt">
                  <Button className="bg-[#fa5219] hover:bg-orange-600 text-white px-8 py-6 text-base font-semibold rounded-xl">
                    Kostenlos anfragen <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/video-analyse">
                  <Button variant="outline" className="border-[#19243b] text-[#19243b] dark:border-gray-400 dark:text-gray-300 px-8 py-6 text-base font-semibold rounded-xl">
                    Kostenlose Video-Analyse
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-gray-500 dark:text-gray-400">
                {["Responsives Design", "SEO-optimiert", "Faire Preise", "Persönlicher Service"].map(tag => (
                  <div key={tag} className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#fa5219]" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Intro Text – Local Context */}
        <section className="py-14 md:py-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none dark:prose-invert"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#19243b] dark:text-white mb-5">
                Webdesign in {city.name} – warum ein professioneller Auftritt entscheidend ist
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {city.localContext}
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {city.webdesignIntro}
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {city.webdesignLocalNeed}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#19243b] dark:text-white mb-4">
                Was Ihre Website in {city.name} leisten muss
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                Eine professionelle Website ist mehr als gutes Aussehen – sie muss gefunden werden, überzeugen und Kunden gewinnen.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="bg-[#fa5219]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-[#fa5219]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#19243b] dark:text-white mb-2">{f.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why AS-ProDigital */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl md:text-3xl font-bold text-[#19243b] dark:text-white mb-2">
                  Warum AS-ProDigital für Ihr Webdesign in {city.name}?
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                  Persönlicher Service, faire Preise und maximale Qualität – das ist das Versprechen von AS-ProDigital.
                </p>
                <div className="space-y-3.5">
                  {usp.map(item => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#fa5219] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}</div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Zufriedene Kunden aus der Region</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-[#19243b] rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-2">Jetzt kostenlos anfragen</h3>
                <p className="text-gray-300 text-sm mb-6">Kostenloses Erstgespräch, unverbindliches Angebot – ich melde mich innerhalb von 24 Stunden bei Ihnen.</p>
                <div className="space-y-4 mb-6">
                  <a href="tel:+4967318789" className="flex items-center gap-3 hover:text-[#fa5219] transition-colors">
                    <Phone className="w-5 h-5 text-[#fa5219]" /><span>06731 8789</span>
                  </a>
                  <a href="mailto:info@as-prodigital.de" className="flex items-center gap-3 hover:text-[#fa5219] transition-colors">
                    <Mail className="w-5 h-5 text-[#fa5219]" /><span>info@as-prodigital.de</span>
                  </a>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#fa5219]" />
                    <span>Alzey ({city.distanceFromAlzey} von {city.name})</span>
                  </div>
                </div>
                <Link href="/kontakt">
                  <Button className="w-full bg-[#fa5219] hover:bg-orange-600 text-white font-semibold py-5">
                    Zum Kontaktformular <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <p className="text-xs text-gray-400 mt-3 text-center">Kostenlos & unverbindlich</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#19243b] dark:text-white mb-4">
                So entsteht Ihre Website in {city.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">Einfacher Prozess, professionelles Ergebnis – in 4 klaren Schritten.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-6">
              {process.map((p, i) => (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-4xl font-black text-[#fa5219]/20 mb-2">{p.step}</div>
                  <h3 className="text-base font-bold text-[#19243b] dark:text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#19243b] dark:text-white mb-4">
                Häufige Fragen zum Webdesign in {city.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">Antworten auf die wichtigsten Fragen rund um Ihre neue Website.</p>
            </motion.div>
            <div className="space-y-3">
              {city.faqWebdesign.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="font-semibold text-[#19243b] dark:text-white text-sm md:text-base pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-[#fa5219] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Block */}
        <section className="py-14 bg-[#19243b]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Bereit für Ihre neue Website in {city.name}?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Starten Sie jetzt mit einem kostenlosen Erstgespräch. Ich zeige Ihnen, was eine professionelle Website für Ihr Unternehmen bewirken kann.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt">
                <Button className="bg-[#fa5219] hover:bg-orange-600 text-white px-8 py-5 font-semibold rounded-xl">
                  Jetzt kostenlos anfragen
                </Button>
              </Link>
              <Link href={`/seo-${city.slug}`}>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-5 font-semibold rounded-xl">
                  Auch SEO in {city.name} entdecken
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
