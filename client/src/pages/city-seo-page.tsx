import { useLocation, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, TrendingUp, Search, BarChart3, Globe, Phone, Mail, MapPin, ArrowRight, Star, Target, ChevronDown, ShieldCheck } from "lucide-react";
import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { getCityData } from "@/data/cities";
import NotFound from "@/pages/not-found";


export default function CitySeoPage() {
  const [location] = useLocation();
  const citySlug = location.replace("/seo-", "");
  const city = getCityData(citySlug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!city) return <NotFound />;

  const canonical = `https://www.as-prodigital.de/seo-${city.slug}`;

  const features = [
    {
      icon: Search,
      title: "Local SEO",
      desc: `Werden Sie bei Google-Suchen in ${city.name} gefunden – von Kunden, die aktiv nach Ihrem Angebot suchen. Lokale Sichtbarkeit ist der schnellste Weg zu neuen Kunden.`,
    },
    {
      icon: TrendingUp,
      title: "On-Page SEO",
      desc: "Technische und inhaltliche Optimierung Ihrer Website: Seitenstruktur, Texte, Überschriften, Meta-Tags und interne Verlinkung – alles, was Google für ein gutes Ranking braucht.",
    },
    {
      icon: Globe,
      title: "Technisches SEO",
      desc: "Ladezeiten, mobile Optimierung, strukturierte Daten (Schema.org), Crawlbarkeit und Core Web Vitals – die technische Basis für nachhaltige Rankings.",
    },
    {
      icon: BarChart3,
      title: "Transparente Ergebnisse",
      desc: "Regelmäßige, verständliche Reports über Keyword-Rankings, organischen Traffic und Sichtbarkeitsentwicklung. Keine Blackbox – Sie sehen genau, was passiert.",
    },
  ];

  const seoSteps = [
    { step: "01", title: "SEO-Analyse & Audit", desc: `Ich analysiere Ihre aktuelle Website und die Suchlandschaft in ${city.name} – technische Fehler, fehlende Optimierungen und konkrete Chancen werden identifiziert.` },
    { step: "02", title: "Keyword-Recherche & Strategie", desc: "Welche Suchbegriffe nutzen Ihre potenziellen Kunden in der Region? Wir entwickeln eine Keyword-Strategie, die wirklich funktioniert." },
    { step: "03", title: "Umsetzung der Optimierungen", desc: "On-Page SEO, technisches SEO, Optimierung des Google Unternehmensprofils und Inhaltspflege – strukturiert und nachhaltig umgesetzt." },
    { step: "04", title: "Monitoring & regelmäßige Reports", desc: "Regelmäßige Berichte und kontinuierliche Anpassung der Strategie – damit Ihr Ranking langfristig wächst und stabil bleibt." },
  ];

  const usp = [
    "Persönlicher Ansprechpartner von Anfang bis Ende – kein Ticket-System",
    "Faire, transparente Preise ohne versteckte Kosten",
    "Nur sichere, Google-konforme Methoden – kein Risiko einer Abstrafung",
    "Kein Linkaufbau – Fokus auf nachhaltiges On-Page SEO und Local SEO",
    "Verständliche Berichte in Deutsch – ohne Fachjargon",
    "Webdesign und SEO aus einer Hand – perfekt aufeinander abgestimmt",
  ];

  return (
    <>
      <Helmet>
        <title>{`SEO ${city.name} | Google-Optimierung | AS-ProDigital`}</title>
        <meta name="description" content={city.seoDescription} />
        <meta name="keywords" content={city.seoKeywords.join(", ")} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={`SEO ${city.name} | AS-ProDigital`} />
        <meta property="og:description" content={city.seoDescription} />
        <meta property="og:locale" content="de_DE" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Suchmaschinenoptimierung (SEO)",
            "name": `SEO ${city.name}`,
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
            "description": city.seoDescription,
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
                SEO in {city.name}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-[#19243b] dark:text-white mb-5 leading-tight">
                Mehr Kunden durch besseres{" "}
                <span className="text-[#fa5219]">Google-Ranking</span>{" "}
                in {city.name}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                Professionelle Suchmaschinenoptimierung für Unternehmen in {city.nameFull} –
                mit persönlichem Service, fairen Preisen und nachhaltigen Ergebnissen.
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
                {["Local SEO", "On-Page Optimierung", "Technisches SEO", "Transparente Reports"].map(tag => (
                  <div key={tag} className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#fa5219]" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Intro Text */}
        <section className="py-14 md:py-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-bold text-[#19243b] dark:text-white mb-5">
                SEO in {city.name} – warum Online-Sichtbarkeit entscheidend ist
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {city.localContext}
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {city.seoIntro}
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {city.seoLocalNeed}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#19243b] dark:text-white mb-4">
                SEO-Leistungen für Unternehmen in {city.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                Ganzheitliche Suchmaschinenoptimierung – von der technischen Basis bis zur lokalen Sichtbarkeit.
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

        {/* No Backlinks – Transparency Box */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#19243b]/5 dark:bg-white/5 border border-[#19243b]/10 dark:border-white/10 rounded-2xl p-6 md:p-8 flex gap-5 items-start"
            >
              <ShieldCheck className="w-10 h-10 text-[#fa5219] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-[#19243b] dark:text-white mb-2">
                  Meine SEO-Methoden: sicher, nachhaltig, transparent
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  Ich setze bewusst auf <strong>nachhaltiges On-Page SEO und Local SEO</strong> – ohne Linkaufbau (Backlinkbuilding).
                  Linkbuilding birgt erhebliche Risiken: Google kann Websites mit künstlichen Backlinks abstrafen, was zu einem
                  dramatischen Ranking-Einbruch führen kann. Meine Methoden folgen den offiziellen Google-Richtlinien und sorgen für
                  stabile, langfristige Ergebnisse – ohne das Risiko einer Abstrafung. Für die meisten kleinen und mittleren
                  Unternehmen in {city.name} ist gutes On-Page SEO ausreichend, um bei lokalen Suchanfragen top zu platzieren.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why AS-ProDigital + CTA */}
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl md:text-3xl font-bold text-[#19243b] dark:text-white mb-2">
                  Warum AS-ProDigital für SEO in {city.name}?
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                  Persönlicher Service, faire Preise und Methoden, denen Sie vertrauen können.
                </p>
                <div className="space-y-3.5 mb-6">
                  {usp.map(item => (
                    <div key={item} className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-[#fa5219] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3">
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
        <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#19243b] dark:text-white mb-4">
                So läuft Ihre SEO-Optimierung in {city.name} ab
              </h2>
              <p className="text-gray-600 dark:text-gray-300">Strukturiert, transparent und mit messbaren Ergebnissen.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-6">
              {seoSteps.map((p, i) => (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
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
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-3xl mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#19243b] dark:text-white mb-4">
                Häufige Fragen zur SEO-Optimierung in {city.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">Antworten auf die wichtigsten Fragen rund um SEO für Ihr Unternehmen.</p>
            </motion.div>
            <div className="space-y-3">
              {city.faqSeo.map((faq, i) => (
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
              Starten Sie jetzt mit SEO in {city.name}
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Jeder Tag ohne professionelle SEO-Optimierung ist ein Tag, an dem Ihre Konkurrenz bei Google weiter vorne ist. Lassen Sie uns das ändern.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt">
                <Button className="bg-[#fa5219] hover:bg-orange-600 text-white px-8 py-5 font-semibold rounded-xl">
                  Jetzt kostenlos anfragen
                </Button>
              </Link>
              <Link href={`/webdesign-${city.slug}`}>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-5 font-semibold rounded-xl">
                  Auch Webdesign in {city.name} entdecken
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
