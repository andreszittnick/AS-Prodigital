/**
 * Pre-render all routes to static HTML using the SSR bundle.
 *
 * Run AFTER the client build and SSR bundle build:
 *   bash build-ionos.sh
 *
 * Exit code 1 if any route fails to render.
 */

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
    throw new Error('dist/public/index.html not found — run "npm run build" first.');
  }
  if (!existsSync(ssrBundle)) {
    throw new Error(`SSR bundle not found at ${ssrBundle} — run the SSR build first.`);
  }

  const require = createRequire(import.meta.url);
  const { render, getRoutes } = require(ssrBundle);

  // Strip any title/link/meta tags injected by a previous prerender run so that
  // re-runs always start from a clean Vite-generated template.
  const rawTemplate = readFileSync(resolve(distPublic, 'index.html'), 'utf-8');
  const template = rawTemplate
    .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\s[^>]*data-rh="true"[^>]*\/?>/gi, '')
    .replace(/<link\s[^>]*data-rh="true"[^>]*\/?>/gi, '')
    .replace(/<script\s[^>]*data-rh="true"[\s\S]*?<\/script>/gi, '');

  const routes = getRoutes();
  console.log(`\nPre-rendering ${routes.length} routes...\n`);

  const failures = [];

  for (const route of routes) {
    let result;
    try {
      result = render(route);
    } catch (err) {
      failures.push({ route, error: err.message });
      console.error(`  ✗  ${route}  →  ${err.message}`);
      continue;
    }

    const { html, helmet } = result;

    if (!html) {
      failures.push({ route, error: 'renderToString returned empty string' });
      console.error(`  ✗  ${route}  →  renderToString returned empty string`);
      continue;
    }

    // Collect head tags from react-helmet-async server context
    const headTags = [
      helmet?.title?.toString() ?? '',
      helmet?.meta?.toString() ?? '',
      helmet?.link?.toString() ?? '',
      helmet?.script?.toString() ?? '',
    ].join('');

    let finalHtml = template
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

    if (headTags) {
      finalHtml = finalHtml.replace('</head>', `${headTags}\n</head>`);
    }

    writeRouteFile(finalHtml, route);
    console.log(`  ✓  ${route}`);
  }

  console.log('\n─────────────────────────────────────────────');
  console.log(`Pre-rendering: ${routes.length - failures.length}/${routes.length} succeeded.`);

  if (failures.length > 0) {
    console.error(`\nFailed routes (${failures.length}):`);
    for (const f of failures) console.error(`  ${f.route}: ${f.error}`);
    process.exit(1);
  }

  console.log('\nUpload dist/public/ to Ionos webhosting root.');
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
  console.error('\nFatal error:', err.message);
  process.exit(1);
});
