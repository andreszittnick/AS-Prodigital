import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Video, CheckCircle, Clock, Send, Play, Target, TrendingUp, Eye } from "lucide-react";
import andreImage from "@assets/Andre-Szittnick_Bild_1765840488630.webp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const videoAnalyseFormSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  phone: z.string().min(1, "Telefonnummer ist erforderlich"),
  website: z.string().min(1, "Website ist erforderlich"),
  message: z.string().optional(),
});

type VideoAnalyseFormData = z.infer<typeof videoAnalyseFormSchema>;

export default function VideoAnalyse() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const form = useForm<VideoAnalyseFormData>({
    resolver: zodResolver(videoAnalyseFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      message: ""
    }
  });

  const onSubmit = async (data: VideoAnalyseFormData) => {
    try {
      const nameParts = data.name.trim().split(' ');
      const firstName = nameParts[0] || data.name;
      const lastName = nameParts.slice(1).join(' ') || '-';
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email: data.email,
          phone: data.phone,
          service: 'Kostenlose Video-Analyse',
          message: `Website: ${data.website}${data.message ? `\n\nNachricht: ${data.message}` : ''}`,
        }),
      });
      if (!response.ok) throw new Error('Fehler beim Senden');
      setIsSubmitted(true);
      setSubmitError(null);
      form.reset();
    } catch (error: any) {
      setSubmitError("Bitte versuchen Sie es später erneut oder kontaktieren Sie mich direkt.");
    }
  };

  const benefits = [
    {
      icon: Eye,
      title: "Detaillierte Analyse",
      description: "Ich schaue mir Ihre Website genau an und identifiziere Optimierungspotenziale."
    },
    {
      icon: Target,
      title: "Konkrete Empfehlungen",
      description: "Sie erhalten klare, umsetzbare Tipps zur Verbesserung Ihrer Online-Präsenz."
    },
    {
      icon: TrendingUp,
      title: "Wachstumspotenzial",
      description: "Erfahren Sie, wie Sie mehr Besucher und Kunden gewinnen können."
    }
  ];

  const includes = [
    "Design & Benutzerfreundlichkeit Check",
    "Mobile-Optimierung Bewertung",
    "SEO-Grundlagen Analyse",
    "Ladezeit-Einschätzung",
    "Conversion-Potenzial Tipps",
    "Persönliche Handlungsempfehlungen"
  ];

  return (
    <>
      <Helmet>
        <title>Kostenfreie Video-Analyse Ihrer Website | AS-ProDigital</title>
        <meta name="description" content="Erhalten Sie eine kostenfreie Video-Analyse Ihrer Website. Ich zeige Ihnen persönlich, wie Sie Ihre Online-Präsenz verbessern können. ✓ Unverbindlich ✓ Individuell ✓ Innerhalb 48h" />
        <meta name="keywords" content="Website Analyse, Video Analyse, kostenlose Website Bewertung, Webdesign Check, SEO Analyse, AS-ProDigital" />
        <link rel="canonical" href="https://www.as-prodigital.de/video-analyse" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.as-prodigital.de/video-analyse" />
        <meta property="og:title" content="Kostenfreie Video-Analyse Ihrer Website | AS-ProDigital" />
        <meta property="og:description" content="Erhalten Sie eine persönliche Video-Analyse Ihrer Website - völlig kostenlos und unverbindlich." />
        <meta property="og:locale" content="de_DE" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Website-Analyse",
            "name": "Kostenfreie Video-Analyse Ihrer Website",
            "description": "André Szittnick erstellt eine persönliche Video-Analyse Ihrer Website und zeigt Ihnen konkrete Optimierungspotenziale für mehr Sichtbarkeit und mehr Kunden.",
            "provider": {
              "@type": "LocalBusiness",
              "@id": "https://www.as-prodigital.de/#organization",
              "name": "AS-ProDigital",
              "founder": { "@type": "Person", "name": "André Szittnick" },
              "telephone": "+49-6731-8789",
              "email": "info@as-prodigital.de",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Alzey",
                "postalCode": "55232",
                "addressRegion": "Rheinland-Pfalz",
                "addressCountry": "DE"
              },
              "url": "https://www.as-prodigital.de"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR",
              "description": "Kostenlose und unverbindliche Video-Analyse Ihrer Website"
            },
            "url": "https://www.as-prodigital.de/video-analyse",
            "areaServed": "Deutschland"
          })
        }} />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
      
        <section className="pt-20 md:pt-28 pb-6 md:pb-12 px-4 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-orange-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />
          </div>
          
          <div className="max-w-6xl mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
              
              <div className="order-1 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center lg:text-left mb-4 md:mb-6"
                >
                  <div className="inline-flex items-center gap-2 bg-[#fa5219]/10 text-[#fa5219] px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
                    <Video className="w-3 h-3 md:w-4 md:h-4" />
                    100% Kostenlos & Unverbindlich
                  </div>
                  
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
                    Ihre persönliche <span className="text-[#fa5219]">Video-Analyse</span>
                  </h1>
                  <p className="text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-3 md:mb-6">
                    Ich erstelle für Sie eine individuelle Video-Analyse Ihrer Website und zeige Ihnen, wie Sie mehr Besucher gewinnen.
                  </p>
                  
                  <div className="hidden md:flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#fa5219]" />
                      <span>Innerhalb 48h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4 text-[#fa5219]" />
                      <span>5-10 Min. Video</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#fa5219]" />
                      <span>Keine Verpflichtung</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-lg"
                >
                  {isSubmitted ? (
                    <div className="text-center py-6" data-testid="success-message">
                      <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-600 dark:text-green-400" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        Vielen Dank für Ihre Anfrage!
                      </h2>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4">
                        Ich erstelle Ihre persönliche Video-Analyse und melde mich innerhalb von 48 Stunden bei Ihnen.
                      </p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="border-[#fa5219] text-[#fa5219] hover:bg-[#fa5219] hover:text-white"
                        data-testid="button-new-request"
                      >
                        Neue Anfrage stellen
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center mb-4 md:mb-6">
                        <div className="bg-[#fa5219] p-2 md:p-3 rounded-lg md:rounded-xl mr-2 md:mr-3">
                          <Video className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                          Jetzt kostenlos anfordern
                        </h2>
                      </div>

                      {submitError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg mb-3 text-sm">
                          {submitError}
                        </div>
                      )}

                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm">Ihr Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Max Mustermann" className="h-10 md:h-11 text-base" {...field} data-testid="input-name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm">E-Mail *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="ihre@email.de" className="h-10 md:h-11 text-base" {...field} data-testid="input-email" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm">Telefonnummer *</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="06731 1234567" className="h-10 md:h-11 text-base" {...field} data-testid="input-phone" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm">Website *</FormLabel>
                                <FormControl>
                                  <Input type="text" placeholder="ihre-website.de" className="h-10 md:h-11 text-base" {...field} data-testid="input-website" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm">Worauf soll ich achten? (optional)</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="z.B. Ich möchte mehr Anfragen erhalten..."
                                    className="min-h-[70px] md:min-h-[80px] text-base resize-none"
                                    {...field}
                                    data-testid="textarea-message"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button 
                            type="submit" 
                            className="w-full bg-[#fa5219] hover:bg-orange-600 text-white h-11 md:h-12 text-sm md:text-base font-semibold"
                            disabled={form.formState.isSubmitting}
                            data-testid="button-submit"
                          >
                            {form.formState.isSubmitting ? (
                              "Wird gesendet..."
                            ) : (
                              <>
                                <Send className="w-4 h-4 mr-2" />
                                Video-Analyse anfordern
                              </>
                            )}
                          </Button>
                          
                          <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 text-center">
                            Mit dem Absenden stimmen Sie unserer{" "}
                            <a href="/datenschutz" className="text-[#fa5219] hover:underline">Datenschutzerklärung</a> zu.
                          </p>
                        </form>
                      </Form>
                    </>
                  )}
                </motion.div>
                
                <div className="flex md:hidden flex-wrap justify-center gap-3 mt-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1.5 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-[#fa5219]" />
                    <span>48h</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1.5 rounded-full">
                    <Play className="w-3.5 h-3.5 text-[#fa5219]" />
                    <span>5-10 Min.</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1.5 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5 text-[#fa5219]" />
                    <span>Unverbindlich</span>
                  </div>
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hidden lg:block order-2 lg:order-2"
              >
                <div className="flex justify-center lg:justify-end relative">
                  <motion.div
                    className="absolute inset-0 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  >
                    <div 
                      className="w-72 h-[350px] lg:w-80 lg:h-[400px] mx-auto rounded-3xl"
                      style={{
                        background: 'radial-gradient(ellipse at center, rgba(250, 82, 25, 0.25) 0%, rgba(250, 82, 25, 0.1) 40%, transparent 70%)',
                        filter: 'blur(40px)',
                        transform: 'scale(1.2)'
                      }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="w-72 h-[350px] lg:w-80 lg:h-[400px] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/50 backdrop-blur-sm relative z-10"
                    style={{
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={andreImage} 
                      alt="André Szittnick - Ihr persönlicher Ansprechpartner für die Video-Analyse"
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                  </motion.div>
                </div>
                
                <div className="mt-8 bg-gradient-to-br from-[#19243b] to-[#2a3a5c] p-6 rounded-2xl text-white">
                  <h3 className="text-lg font-bold mb-4">
                    Das erhalten Sie:
                  </h3>
                  <ul className="space-y-2">
                    {includes.slice(0, 4).map((item, index) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-[#fa5219] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="pb-8 md:pb-12 px-4 lg:hidden">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-[#19243b] to-[#2a3a5c] p-5 rounded-xl text-white">
              <h3 className="text-base font-bold mb-3">
                Das erhalten Sie in Ihrer Video-Analyse:
              </h3>
              <ul className="grid grid-cols-1 gap-2">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#fa5219] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="pb-10 md:pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-md text-center"
                >
                  <div className="bg-[#fa5219]/10 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <benefit.icon className="w-6 h-6 md:w-7 md:h-7 text-[#fa5219]" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1.5">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-12 md:pb-16 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white dark:bg-gray-800 p-5 md:p-8 rounded-xl shadow-md"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                  <img 
                    src={andreImage} 
                    alt="André Szittnick"
                    className="w-full h-full object-cover object-top rounded-2xl shadow-lg ring-2 ring-[#fa5219]/20"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Warum eine Video-Analyse?
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-3">
                    Im Gegensatz zu automatisierten Tools schaue ich mir Ihre Website persönlich an. 
                    Sie sehen genau, worauf ich achte und erhalten Tipps, die speziell auf Ihr Geschäft zugeschnitten sind.
                  </p>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    Das Video können Sie sich so oft anschauen wie Sie möchten und die Empfehlungen selbst umsetzen 
                    oder mich damit beauftragen - ganz wie Sie möchten.
                  </p>
                  <p className="text-[#fa5219] font-medium mt-3 text-sm md:text-base">
                    – André Szittnick
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
