#!/bin/bash
# build-ionos.sh
# Erstellt einen produktionsfertigen Static-Build für Ionos-Webhosting.
# Danach den Inhalt von dist/public/ hochladen.

set -e

echo "================================================"
echo "  AS-ProDigital – Ionos Static Build"
echo "================================================"

echo ""
echo "1/2  Client-Bundle bauen (Vite)..."
npm run build

echo ""
echo "2/2  Meta-Tags in alle Routen pre-rendern..."
node scripts/prerender.mjs

echo ""
echo "================================================"
echo "  Build fertig!  dist/public/ ist bereit."
echo "  Hochladen auf Ionos: alle Dateien aus"
echo "  dist/public/ in das Webroot-Verzeichnis."
echo "================================================"
