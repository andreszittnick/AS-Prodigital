import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

export interface ContactEmailParams {
  from_name: string;
  from_email: string;
  phone?: string;
  company?: string;
  service: string;
  message?: string;
  website?: string;
}

export async function sendContactEmail(params: ContactEmailParams): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.error('EmailJS nicht konfiguriert. Bitte VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID und VITE_EMAILJS_PUBLIC_KEY setzen.');
    throw new Error('E-Mail-Dienst nicht konfiguriert. Bitte kontaktieren Sie uns direkt unter info@as-prodigital.de');
  }
  await emailjs.send(SERVICE_ID, TEMPLATE_ID, params as Record<string, unknown>, PUBLIC_KEY);
}
