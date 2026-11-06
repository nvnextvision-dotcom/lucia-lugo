#!/usr/bin/env bash
# Documents está en iCloud y evicta archivos de node_modules (los builds se cuelgan).
# Mueve node_modules, dist y .astro a carpetas *.nosync (iCloud las ignora) y deja un symlink.
# Ejecutar después de cada `npm install`:  npm run icloud
set -e
cd "$(dirname "$0")/.."
for d in node_modules dist .astro; do
  if [ -d "$d" ] && [ ! -L "$d" ]; then
    rm -rf "$d.nosync"
    mv "$d" "$d.nosync"
  fi
  mkdir -p "$d.nosync"
  [ -L "$d" ] || ln -s "$d.nosync" "$d"
done
echo "node_modules, dist y .astro excluidos de iCloud."
