#!/bin/bash
# build-ionos.sh
# Erstellt einen produktionsfertigen Static-Build für Ionos-Webhosting.
# Danach den Inhalt von dist/public/ hochladen.

set -e

echo "================================================"
echo "  AS-ProDigital – Ionos Static Build"
echo "================================================"

echo ""
echo "1/3  Client-Bundle bauen (Vite)..."
npm run build

echo ""
echo "2/3  SSR-Bundle bauen (für Pre-Rendering)..."
npx vite build --config vite.ssr.config.ts

echo ""
echo "3/3  Alle Routen per SSR vorrendern..."
node scripts/prerender.mjs

echo ""
echo "================================================"
echo "  Build fertig!  dist/public/ ist bereit."
echo "  Hochladen auf Ionos: alle Dateien aus"
echo "  dist/public/ in das Webroot-Verzeichnis."
echo "================================================"
