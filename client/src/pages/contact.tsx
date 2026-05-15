import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const contactFormSchema = z.object({
  firstName: z.string().min(1, "Vorname ist erforderlich"),
  lastName: z.string().min(1, "Nachname ist erforderlich"),
  companyName: z.string().optional(),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  phone: z.string().optional(),
  service: z.string().min(1, "Bitte wählen Sie einen Service"),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      phone: "",
      service: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Fehler beim Senden');
      setIsSubmitted(true);
      setSubmitError(null);
      form.reset();
    } catch (error: any) {
      setSubmitError("Bitte versuchen Sie es später erneut oder kontaktieren Sie mich direkt.");
    }
  };

  const handleNewInquiry = () => {
    setIsSubmitted(false);
    setSubmitError(null);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "E-Mail",
      details: "Info@AS-ProDigital.de",
      action: "mailto:Info@AS-ProDigital.de"
    },
    {
      icon: Phone,
      title: "Telefon",
      details: "06731 8789",
      action: "tel:+4967318789"
    },
    {
      icon: MapPin,
      title: "Standort",
      details: "Alzey",
      action: null
    },
    {
      icon: Clock,
      title: "Öffnungszeiten",
      details: "Mo-Fr: 9:00 - 18:00 Uhr",
      action: null
    }
  ];

  const serviceTypes = [
    "Webdesign",
    "SEO-Optimierung", 
    "Webdesign & SEO",
    "Beratung",
    "Sonstiges"
  ];

  return (
    <>
      <Helmet>
        <title>Kontakt | AS-ProDigital Alzey – Kostenlose Beratung</title>
        <meta name="description" content="Kontaktieren Sie AS-ProDigital für Webdesign & SEO in Alzey. ✓ Kostenlose Beratung ✓ Schnelle Antwort ✓ Unverbindliches Angebot. Tel: 06731 8789" />
        <meta name="keywords" content="Kontakt AS-ProDigital, Webdesign Anfrage Alzey, SEO Beratung, André Szittnick Kontakt" />
        <link rel="canonical" href="https://www.as-prodigital.de/kontakt" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.as-prodigital.de/kontakt" />
        <meta property="og:title" content="Kontakt - AS-ProDigital Alzey" />
        <meta property="og:description" content="Jetzt unverbindlich anfragen! Professionelles Webdesign & SEO aus Alzey." />
        <meta property="og:locale" content="de_DE" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "AS-ProDigital",
            "founder": {
              "@type": "Person",
              "name": "André Szittnick"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Alzey",
              "addressCountry": "DE"
            },
            "telephone": "+4967318789",
            "email": "Info@AS-ProDigital.de"
          })
        }} />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
      
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
              Lassen Sie uns über Ihr <span className="text-[#fa5219]">Projekt</span> sprechen
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ich freue mich darauf, von Ihnen zu hören und gemeinsam Ihre digitale Vision zu verwirklichen. 
              Kontaktieren Sie mich für ein unverbindliches Beratungsgespräch.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 md:pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg"
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Vielen Dank für Ihre Anfrage!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Ich habe Ihre Nachricht erhalten und melde mich schnellstmöglich bei Ihnen.
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleNewInquiry}
                    className="border-[#fa5219] text-[#fa5219] hover:bg-[#fa5219] hover:text-white"
                  >
                    Neue Anfrage stellen
                  </Button>
                </motion.div>
              ) : (
              <>
              <div className="flex items-center mb-6 md:mb-8">
                <div className="bg-[#fa5219] p-3 rounded-xl mr-3 md:mr-4">
                  <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  Projekt anfragen
                </h2>
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {submitError}
                </div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
                  <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vorname *</FormLabel>
                          <FormControl>
                            <Input placeholder="Max" className="h-12 text-base" {...field} data-testid="input-first-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nachname *</FormLabel>
                          <FormControl>
                            <Input placeholder="Mustermann" className="h-12 text-base" {...field} data-testid="input-last-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unternehmensname (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Ihr Unternehmen" className="h-12 text-base" {...field} data-testid="input-company-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-Mail *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="ihre@email.de" className="h-12 text-base" {...field} data-testid="input-email" />
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
                          <FormLabel>Telefonnummer (optional)</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+49 ..." className="h-12 text-base" {...field} data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service-Interesse *</FormLabel>
                        <FormControl>
                          <select 
                            {...field}
                            className="w-full h-12 px-3 py-2 border border-input bg-background rounded-md text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            data-testid="select-service"
                          >
                            <option value="">Service auswählen</option>
                            {serviceTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
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
                        <FormLabel>Kommentar (optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Beschreiben Sie Ihr Projekt im Detail. Je mehr Informationen Sie mir geben, desto besser kann ich Ihnen helfen."
                            className="min-h-[140px] md:min-h-[160px] text-base"
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
                    className="w-full bg-[#fa5219] hover:bg-orange-600 text-white h-12 md:h-14 text-base md:text-lg"
                    disabled={form.formState.isSubmitting}
                    data-testid="button-submit"
                  >
                    {form.formState.isSubmitting ? (
                      "Wird gesendet..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Nachricht senden
                      </>
                    )}
                  </Button>
                </form>
              </Form>
              </>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                    Kontaktinformationen
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6 md:mb-8">
                    Ich bin gerne für Sie da! Nutzen Sie eine der folgenden Möglichkeiten, 
                    um mit mir in Kontakt zu treten.
                  </p>
                </div>

                <div className="space-y-4 md:space-y-6">
                  {contactInfo.map((info, index) => {
                    const Component = info.action ? motion.a : motion.div;
                    const props = info.action ? { href: info.action } : {};
                    
                    return (
                      <Component
                        key={info.title}
                        {...props}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                        className={`flex items-center p-5 md:p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-all duration-300 group ${info.action ? 'hover:shadow-xl cursor-pointer' : ''}`}
                        data-testid={`contact-info-${info.title.toLowerCase()}`}
                      >
                        <div className="bg-blue-600 p-3 md:p-4 rounded-xl mr-4 md:mr-6 group-hover:scale-110 transition-transform">
                          <info.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm md:text-base text-gray-900 dark:text-white mb-1">
                            {info.title}
                          </h3>
                          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                            {info.details}
                          </p>
                        </div>
                      </Component>
                    );
                  })}
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-blue-600 p-6 md:p-8 rounded-2xl text-white">
                  <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
                    Kostenloses Erstberatungsgespräch
                  </h3>
                  <p className="text-sm md:text-base mb-5 md:mb-6">
                    Lassen Sie uns gemeinsam über Ihr Projekt sprechen. 
                    Das erste Beratungsgespräch ist für Sie völlig kostenfrei 
                    und unverbindlich.
                  </p>
                  <div className="flex items-center text-sm md:text-base">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    <span>30 Minuten - Ohne Verpflichtung</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
}
