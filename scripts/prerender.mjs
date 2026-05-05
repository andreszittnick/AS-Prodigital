import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const distPublic = resolve(rootDir, 'dist/public');
const ssrBundle = resolve(rootDir, 'dist/server/entry-server.cjs');

async function main() {
  if (!existsSync(resolve(distPublic, 'index.html'))) {
    console.error('ERROR: dist/public/index.html not found. Run "npm run build" first.');
    process.exit(1);
  }

  if (!existsSync(ssrBundle)) {
    console.error(`ERROR: ${ssrBundle} not found. Run the SSR build first.`);
    process.exit(1);
  }

  const require = createRequire(import.meta.url);
  const { render, getRoutes } = require(ssrBundle);
  const rawTemplate = readFileSync(resolve(distPublic, 'index.html'), 'utf-8');
  // Strip any previously injected head tags to allow clean re-runs
  const template = rawTemplate
    .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\s[^>]*data-rh="true"[^>]*\/?>/gi, '')
    .replace(/<link\s[^>]*data-rh="true"[^>]*\/?>/gi, '')
    .replace(/<script\s[^>]*data-rh="true"[\s\S]*?<\/script>/gi, '');
  const routes = getRoutes();

  console.log(`\nPre-rendering ${routes.length} routes with SSR...\n`);

  let success = 0;
  let fallback = 0;

  for (const route of routes) {
    try {
      const { html, helmet } = render(route);

      let headTags = '';
      if (helmet) {
        headTags += (helmet.title?.toString() ?? '');
        headTags += (helmet.meta?.toString() ?? '');
        headTags += (helmet.link?.toString() ?? '');
        headTags += (helmet.script?.toString() ?? '');
      }

      let finalHtml = template;

      if (html) {
        finalHtml = finalHtml.replace(
          '<div id="root"></div>',
          `<div id="root">${html}</div>`
        );
      }

      if (headTags) {
        finalHtml = finalHtml.replace('</head>', `${headTags}\n</head>`);
      }

      writeRouteFile(finalHtml, route);

      const label = html ? '✓ SSR' : '~ meta';
      console.log(`  ${label}  ${route}`);
      success++;
    } catch (err) {
      console.warn(`  ✗ FAILED ${route}: ${err.message}`);
      fallback++;
    }
  }

  console.log('\n─────────────────────────────────────────────');
  console.log(`Pre-rendering abgeschlossen:`);
  console.log(`  ${success} Seiten erfolgreich`);
  if (fallback > 0) console.log(`  ${fallback} fehlgeschlagen (index.html als Fallback)`);
  console.log(`\nUpload: Inhalte von dist/public/ auf Ionos hochladen.`);
}

function writeRouteFile(html, routePath) {
  if (routePath === '/') {
    writeFileSync(resolve(distPublic, 'index.html'), html, 'utf-8');
    return;
  }
  const dir = resolve(distPublic, routePath.slice(1));
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'index.html'), html, 'utf-8');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
