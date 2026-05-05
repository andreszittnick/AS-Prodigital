import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertContactInquirySchema, type InsertContactInquiry } from "@shared/schema";
import { sendContactEmail } from "@/lib/emailjs";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "Info@AS-ProDigital.de",
    colorClass: "brand-gradient"
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "06731 8789",
    colorClass: "brand-blue"
  },
  {
    icon: MapPin,
    label: "Standort",
    value: "Deutschland",
    colorClass: "brand-gradient"
  }
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<InsertContactInquiry>({
    resolver: zodResolver(insertContactInquirySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = async (data: InsertContactInquiry) => {
    try {
      await sendContactEmail({
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        phone: data.phone || "",
        company: data.companyName || "",
        service: data.service,
        message: data.message || "",
      });
      setIsSubmitted(true);
      setSubmitError(null);
      form.reset();
    } catch (error: any) {
      setSubmitError(error.message || "Bitte versuchen Sie es später erneut.");
    }
  };

  const handleNewInquiry = () => {
    setIsSubmitted(false);
    setSubmitError(null);
  };

  return (
    <section id="contact" className="py-20 bg-white overflow-x-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            Lassen Sie uns etwas <span className="gradient-text">Außergewöhnliches</span> schaffen
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto px-4 sm:px-0">
            Bereit, Ihre digitale Präsenz auf das nächste Level zu bringen? Melden Sie sich bei mir – gemeinsam lassen wir Ihre Ideen Wirklichkeit werden.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-slate-50 to-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg">
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Vielen Dank für Ihre Anfrage!
                  </h3>
                  <p className="text-gray-600 mb-6">
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
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Nachricht senden</h3>
              
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {submitError}
                </div>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vorname *</FormLabel>
                          <FormControl>
                            <Input placeholder="Max" {...field} data-testid="input-first-name" />
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
                            <Input placeholder="Mustermann" {...field} data-testid="input-last-name" />
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
                          <Input placeholder="Ihr Unternehmen" {...field} data-testid="input-company-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-Mail *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="max@beispiel.de" {...field} data-testid="input-email" />
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
                            <Input type="tel" placeholder="+49 ..." {...field} data-testid="input-phone" />
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-service">
                              <SelectValue placeholder="Service auswählen" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="web-design">Webdesign</SelectItem>
                            <SelectItem value="seo">SEO-Optimierung</SelectItem>
                            <SelectItem value="complete-package">Komplettes Digital-Paket</SelectItem>
                          </SelectContent>
                        </Select>
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
                          <Textarea rows={4} placeholder="Erzählen Sie mir von Ihrem Projekt..." {...field} data-testid="textarea-message" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full brand-gradient text-white py-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    disabled={form.formState.isSubmitting}
                    data-testid="button-submit-contact"
                  >
                    {form.formState.isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
                  </Button>
                </form>
              </Form>
              </>
              )}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Direkter Kontakt</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 sm:mb-8">
                  Jedes Projekt beginnt mit einem Gespräch. Erzählen Sie mir von Ihrer Idee, und gemeinsam finden wir den besten Weg, sie online erfolgreich umzusetzen.
                </p>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    className="flex items-center space-x-3 sm:space-x-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                    data-testid={`contact-info-${info.label.toLowerCase()}`}
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${info.colorClass} rounded-lg sm:rounded-xl flex items-center justify-center`}>
                      <info.icon className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm sm:text-base">{info.value}</div>
                      <div className="text-slate-600 text-xs sm:text-sm">{info.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
