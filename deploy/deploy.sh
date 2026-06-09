#!/usr/bin/env bash
# Build + (re)start PriceAIAly. Run on the server after bootstrap, and for every update.
# Usage:  bash /var/www/PriceAIAly/deploy/deploy.sh
set -euo pipefail

APP_DIR="/var/www/PriceAIAly"
cd "$APP_DIR"

if [ ! -f .env ]; then
  echo "ERROR: $APP_DIR/.env missing. Copy deploy/.env.production.template -> .env and fill it first."
  exit 1
fi

echo "==> Pulling latest code"
git pull --ff-only

echo "==> Installing dependencies (clean, production-safe)"
npm ci

echo "==> Building"
npm run build

echo "==> Starting / reloading via pm2"
if pm2 describe priceaialy >/dev/null 2>&1; then
  pm2 reload deploy/ecosystem.config.js --update-env
else
  pm2 start deploy/ecosystem.config.js
fi
pm2 save

echo "==> Done. Status:"
pm2 status priceaialy
echo "App is serving on 127.0.0.1:3000 — make sure nginx proxies to it."
