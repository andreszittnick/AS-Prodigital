import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const distDir = resolve(rootDir, 'dist/public');
const BASE_URL = 'https://www.as-prodigital.de';

const routes = [
  {
    path: '/',
    title: 'Webdesign & SEO Alzey - AS-ProDigital André Szittnick',
    description: 'Professionelles Webdesign & SEO aus Alzey – individuelle Websites, die Kunden gewinnen. Persönliche Beratung von André Szittnick. Jetzt kostenlos anfragen!',
  },
  {
    path: '/leistungen',
    title: 'Webdesign & SEO Leistungen Alzey | AS-ProDigital',
    description: 'Professionelle Webdesign & SEO Dienstleistungen aus Alzey. ✓ Moderne Websites ✓ Suchmaschinenoptimierung ✓ Local SEO ✓ Responsive Design. Ihr digitaler Erfolg!',
  },
  {
    path: '/ueber-mich',
    title: 'André Szittnick – Webdesigner & SEO-Experte | AS-ProDigital',
    description: 'André Szittnick – Webdesigner & SEO-Experte aus Alzey. 5+ Jahre Erfahrung, 50+ Projekte, persönliche Betreuung. Ihr Partner für digitalen Erfolg.',
  },
  {
    path: '/kontakt',
    title: 'Kontakt | AS-ProDigital Alzey – Kostenlose Beratung',
    description: 'Kontaktieren Sie André Szittnick für professionelles Webdesign & SEO aus Alzey. ✓ Kostenlose Erstberatung ✓ Schnelle Antwort ✓ Persönliche Betreuung.',
  },
  {
    path: '/webdesign',
    title: 'Professionelles Webdesign | AS-ProDigital André Szittnick',
    description: 'Professionelles Webdesign – individuelle, responsive Websites, die Kunden gewinnen. ✓ Persönliche Beratung ✓ Fair & Transparent ✓ Schnelle Umsetzung.',
  },
  {
    path: '/seo',
    title: 'SEO & Suchmaschinenoptimierung | AS-ProDigital Alzey',
    description: 'Professionelle SEO-Optimierung: Bessere Google-Rankings, mehr Traffic, mehr Kunden. ✓ Local SEO ✓ On-Page SEO ✓ Technisches SEO. Persönliche Betreuung.',
  },
  {
    path: '/blog',
    title: 'Blog & Ratgeber – Webdesign & SEO Tipps | AS-ProDigital',
    description: 'Praktische Tipps & Anleitungen zu Webdesign und SEO von André Szittnick aus Alzey. Kostenlose Ratgeber für Ihren digitalen Erfolg.',
  },
  {
    path: '/video-analyse',
    title: 'Kostenfreie Video-Analyse Ihrer Website | AS-ProDigital',
    description: 'Erhalten Sie eine kostenfreie Video-Analyse Ihrer Website. Ich zeige Ihnen persönlich, wie Sie Ihre Online-Präsenz verbessern können. ✓ Unverbindlich ✓ Individuell ✓ Innerhalb 48h',
  },
  {
    path: '/impressum',
    title: 'Impressum – AS-ProDigital | André Szittnick',
    description: 'Impressum von AS-ProDigital – André Szittnick. Angaben gemäß § 5 TMG, Kontaktdaten und rechtliche Hinweise.',
  },
  {
    path: '/datenschutz',
    title: 'Datenschutzerklärung – AS-ProDigital | André Szittnick',
    description: 'Datenschutzerklärung von AS-ProDigital – André Szittnick. Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.',
  },
  {
    path: '/agb',
    title: 'AGB – Allgemeine Geschäftsbedingungen | AS-ProDigital',
    description: 'Allgemeine Geschäftsbedingungen (AGB) von AS-ProDigital – André Szittnick. Vertragsgrundlagen für Webdesign und SEO-Dienstleistungen.',
  },
  {
    path: '/webdesign-alzey',
    title: 'Webdesign Alzey | Website & SEO | AS-ProDigital',
    description: 'Professionelles Webdesign in Alzey: Individuelle Websites, die Kunden gewinnen. ✓ Persönlicher Service ✓ Faire Preise ✓ SEO-optimiert von Anfang an.',
  },
  {
    path: '/webdesign-worms',
    title: 'Webdesign Worms | Website & SEO | AS-ProDigital',
    description: 'Webdesign Worms: Individuelle Websites mit persönlichem Service & fairen Preisen. ✓ SEO-optimiert ✓ Responsive Design ✓ Schnelle Umsetzung.',
  },
  {
    path: '/webdesign-kaiserslautern',
    title: 'Webdesign Kaiserslautern | Website & SEO | AS-ProDigital',
    description: 'Webdesign Kaiserslautern: Moderne Websites mit persönlichem Service. ✓ Fair & transparent ✓ SEO-optimiert ✓ Responsive Design.',
  },
  {
    path: '/webdesign-bingen',
    title: 'Webdesign Bingen | Website & SEO | AS-ProDigital',
    description: 'Webdesign Bingen am Rhein: Individuelle Websites mit persönlichem Service. ✓ SEO-optimiert ✓ Faire Preise ✓ Responsive Design.',
  },
  {
    path: '/webdesign-bad-kreuznach',
    title: 'Webdesign Bad Kreuznach | Website & SEO | AS-ProDigital',
    description: 'Webdesign Bad Kreuznach: Individuelle Websites mit persönlichem Service & fairen Preisen. ✓ SEO-optimiert ✓ Responsive ✓ Schnelle Umsetzung.',
  },
  {
    path: '/webdesign-ingelheim',
    title: 'Webdesign Ingelheim | Website & SEO | AS-ProDigital',
    description: 'Webdesign Ingelheim am Rhein: Individuelle Websites mit persönlichem Service. ✓ SEO-optimiert ✓ Faire Preise ✓ Responsive Design.',
  },
  {
    path: '/webdesign-mannheim',
    title: 'Webdesign Mannheim | Website & SEO | AS-ProDigital',
    description: 'Webdesign Mannheim: Professionell & günstiger als lokale Anbieter, mit persönlichem Service. ✓ SEO-optimiert ✓ Faire Preise ✓ Responsive Design.',
  },
  {
    path: '/seo-alzey',
    title: 'SEO Alzey | Google-Optimierung | AS-ProDigital',
    description: 'SEO-Optimierung in Alzey: Mehr Sichtbarkeit bei Google für Ihr Unternehmen. ✓ Local SEO ✓ On-Page SEO ✓ Technisches SEO ✓ Persönliche Betreuung.',
  },
  {
    path: '/seo-worms',
    title: 'SEO Worms | Google-Optimierung | AS-ProDigital',
    description: 'SEO Worms: Mehr Sichtbarkeit bei Google für Ihr Unternehmen in Worms. ✓ Local SEO ✓ On-Page SEO ✓ Technisches SEO. Persönliche Betreuung, faire Preise.',
  },
  {
    path: '/seo-kaiserslautern',
    title: 'SEO Kaiserslautern | Google-Optimierung | AS-ProDigital',
    description: 'SEO Kaiserslautern: Bessere Google-Rankings für Ihr Unternehmen. ✓ Local SEO ✓ On-Page SEO ✓ Technisches SEO. Persönliche Betreuung ohne unnötigen Overhead.',
  },
  {
    path: '/seo-bingen',
    title: 'SEO Bingen | Google-Optimierung | AS-ProDigital',
    description: 'SEO Bingen am Rhein: Mehr Google-Sichtbarkeit für Ihr Unternehmen. ✓ Local SEO ✓ On-Page SEO ✓ Technisches SEO. Persönliche Betreuung, transparente Ergebnisse.',
  },
  {
    path: '/seo-bad-kreuznach',
    title: 'SEO Bad Kreuznach | Google-Optimierung | AS-ProDigital',
    description: 'SEO Bad Kreuznach: Mehr Sichtbarkeit bei Google für Ihr Unternehmen. ✓ Local SEO ✓ On-Page SEO ✓ Technisches SEO. Persönliche Betreuung, faire Preise.',
  },
  {
    path: '/seo-ingelheim',
    title: 'SEO Ingelheim | Google-Optimierung | AS-ProDigital',
    description: 'SEO Ingelheim am Rhein: Bessere Google-Rankings für Ihr Unternehmen. ✓ Local SEO ✓ On-Page SEO ✓ Technisches SEO. Persönliche Betreuung, transparente Methoden.',
  },
  {
    path: '/seo-mannheim',
    title: 'SEO Mannheim | Google-Optimierung | AS-ProDigital',
    description: 'SEO Mannheim: Mehr Google-Sichtbarkeit für Ihr Unternehmen – persönliche Betreuung, faire Preise. ✓ Local SEO ✓ On-Page SEO ✓ Technisches SEO.',
  },
  {
    path: '/blog/responsive-webdesign-2025',
    title: 'Responsive Webdesign 2025: Was Sie jetzt wissen müssen | AS-ProDigital Blog',
    description: 'Responsive Webdesign 2025: Erfahren Sie die wichtigsten Trends, Best Practices und warum Mobile-First unverzichtbar für Ihren Erfolg ist.',
  },
  {
    path: '/blog/website-ladezeit-optimieren',
    title: 'Website Ladezeit optimieren: 10 Profi-Tipps für schnellere Seiten | AS-ProDigital Blog',
    description: 'Website Ladezeit optimieren: 10 professionelle Tipps für schnellere Websites, bessere Rankings und zufriedenere Besucher.',
  },
  {
    path: '/blog/webdesign-kosten-2025',
    title: 'Webdesign Kosten 2025: Was kostet eine professionelle Website? | AS-ProDigital Blog',
    description: 'Was kostet eine Website 2025? Transparente Übersicht über Webdesign-Preise von einfachen Websites bis komplexen E-Commerce-Lösungen.',
  },
  {
    path: '/blog/ux-design-prinzipien',
    title: 'UX Design: 7 Prinzipien für benutzerfreundliche Websites | AS-ProDigital Blog',
    description: '7 bewährte UX Design Prinzipien für benutzerfreundliche Websites. Optimieren Sie die User Experience und steigern Sie Ihre Conversion-Rate.',
  },
  {
    path: '/blog/farbpsychologie-webdesign',
    title: 'Farbpsychologie im Webdesign: Welche Farben verkaufen? | AS-ProDigital Blog',
    description: 'Farbpsychologie im Webdesign: Erfahren Sie, welche Farben Emotionen wecken und Conversions steigern. Praktische Tipps für die richtige Farbwahl.',
  },
  {
    path: '/blog/wordpress-vs-custom-code',
    title: 'WordPress vs. Custom Code: Was ist besser für Ihre Website? | AS-ProDigital Blog',
    description: 'WordPress vs. Custom Code: Welche Lösung ist besser für Ihre Website? Vor- und Nachteile, Kosten und praktische Entscheidungshilfe.',
  },
  {
    path: '/blog/local-seo-2025',
    title: 'Local SEO 2025: So werden Sie in Ihrer Region gefunden | AS-ProDigital Blog',
    description: 'Local SEO 2025: Praktischer Guide für bessere lokale Rankings. Google Business Profile optimieren, Citations aufbauen und mehr Kunden gewinnen.',
  },
  {
    path: '/blog/on-page-seo-checkliste',
    title: 'On-Page SEO Checkliste: 15 Punkte für bessere Rankings | AS-ProDigital Blog',
    description: 'On-Page SEO Checkliste 2025: 15 essenzielle Optimierungen für bessere Google-Rankings. Praktische Tipps für Title, Meta, Content und mehr.',
  },
  {
    path: '/blog/backlinks-aufbauen-strategien',
    title: 'Backlinks aufbauen 2025: 10 Strategien, die wirklich funktionieren | AS-ProDigital Blog',
    description: 'Backlinks aufbauen 2025: 10 White-Hat-Strategien für nachhaltigen Linkaufbau. Von Guest Blogging bis Digital PR – so gewinnen Sie hochwertige Links.',
  },
  {
    path: '/blog/core-web-vitals-optimieren',
    title: 'Core Web Vitals optimieren: Der komplette Guide für 2025 | AS-ProDigital Blog',
    description: 'Core Web Vitals optimieren 2025: Kompletter Guide für LCP, FID und CLS. Praktische Tipps für bessere Rankings und optimale User Experience.',
  },
  {
    path: '/blog/keyword-recherche-anleitung',
    title: 'Keyword-Recherche 2025: So finden Sie profitable Keywords | AS-ProDigital Blog',
    description: 'Keyword-Recherche 2025: Schritt-für-Schritt Guide zum Finden profitabler Keywords. Tools, Strategien und Priorisierung für erfolgreiche SEO.',
  },
  {
    path: '/blog/google-analytics-4-einstieg',
    title: 'Google Analytics 4 (GA4) für Anfänger: Der komplette Einstieg | AS-ProDigital Blog',
    description: 'Google Analytics 4 für Anfänger: Kompletter Einstiegs-Guide mit Setup, wichtigsten Berichten und SEO-Nutzung. DSGVO-konform Analytics nutzen.',
  },
  {
    path: '/blog/landing-page-vs-website',
    title: 'Landing Page vs. Website: Was braucht Ihr Unternehmen wirklich? | AS-ProDigital Blog',
    description: 'Landing Page oder Website – was ist die richtige Wahl? Wir erklären Unterschiede, Vor- und Nachteile und wann welche Lösung sinnvoller ist.',
  },
  {
    path: '/blog/conversion-rate-optimieren',
    title: 'Conversion Rate optimieren: Wie Ihre Website mehr Anfragen generiert | AS-ProDigital Blog',
    description: 'Conversion Rate optimieren: So macht Ihre Website aus Besuchern echte Kunden. 7 konkrete Hebel für mehr Anfragen ohne mehr Werbebudget.',
  },
  {
    path: '/blog/website-relaunch-planung',
    title: 'Website Relaunch: Wann ist es Zeit für eine neue Website? | AS-ProDigital Blog',
    description: 'Website Relaunch: 7 klare Zeichen, dass Ihre Website eine Überarbeitung braucht – plus Tipps für eine erfolgreiche Umsetzung ohne SEO-Verluste.',
  },
  {
    path: '/blog/google-business-profil-optimieren',
    title: 'Google Business Profil optimieren: Mehr lokale Kunden gewinnen | AS-ProDigital Blog',
    description: 'Google Business Profil optimieren: Schritt-für-Schritt Anleitung für mehr lokale Sichtbarkeit, bessere Bewertungen und mehr Kunden aus Ihrer Region.',
  },
  {
    path: '/blog/seo-texte-schreiben',
    title: 'SEO-Texte schreiben: Anleitung für bessere Google-Rankings | AS-ProDigital Blog',
    description: 'SEO-Texte schreiben: So erstellen Sie Inhalte, die Google liebt und Leser begeistern. Praktische Tipps für Struktur, Keywords und Lesbarkeit.',
  },
  {
    path: '/blog/technisches-website-audit',
    title: 'Technisches Website-Audit: So prüfen Sie Ihre Website auf Fehler | AS-ProDigital Blog',
    description: 'Technisches Website-Audit: Schritt-für-Schritt Anleitung zur Prüfung Ihrer Website auf technische SEO-Fehler, die Rankings kosten.',
  },
];

function buildHeadTags(route) {
  const canonical = `${BASE_URL}${route.path}`;
  const title = route.title;
  const description = route.description;

  return [
    `  <title>${title}</title>`,
    `  <meta name="description" content="${description}" />`,
    `  <link rel="canonical" href="${canonical}" />`,
    `  <meta property="og:type" content="website" />`,
    `  <meta property="og:url" content="${canonical}" />`,
    `  <meta property="og:title" content="${title}" />`,
    `  <meta property="og:description" content="${description}" />`,
    `  <meta property="og:locale" content="de_DE" />`,
    `  <meta property="og:site_name" content="AS-ProDigital" />`,
  ].join('\n');
}

function injectMeta(template, route) {
  const headTags = buildHeadTags(route);
  return template.replace('</head>', `${headTags}\n</head>`);
}

function writeRouteHtml(html, routePath) {
  if (routePath === '/') {
    writeFileSync(resolve(distDir, 'index.html'), html, 'utf-8');
    return;
  }
  const dir = resolve(distDir, routePath.slice(1));
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'index.html'), html, 'utf-8');
}

function prerender() {
  const templatePath = resolve(distDir, 'index.html');

  if (!existsSync(templatePath)) {
    console.error(`ERROR: ${templatePath} not found. Run "npm run build" first.`);
    process.exit(1);
  }

  const template = readFileSync(templatePath, 'utf-8');
  let success = 0;
  let failed = 0;

  console.log(`\nPre-rendering ${routes.length} routes...\n`);

  for (const route of routes) {
    try {
      const html = injectMeta(template, route);
      writeRouteHtml(html, route.path);
      console.log(`  ✓  ${route.path}`);
      success++;
    } catch (err) {
      console.error(`  ✗  ${route.path} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\n─────────────────────────────────────`);
  console.log(`Pre-rendering abgeschlossen:`);
  console.log(`  ${success} Seiten erfolgreich`);
  if (failed > 0) console.log(`  ${failed} fehlgeschlagen`);
  console.log(`\nLaden Sie den Inhalt von dist/public/ auf Ionos hoch.`);
}

prerender();
