#!/usr/bin/env bash
# Daily official App Store subscription-price collection (all apps x regions).
# Uses storefront headers so it works from a China-hosted IP. Run via crontab.
set -uo pipefail
cd /var/www/PriceAIAly
LOG=/var/log/priceaialy/official.log
TS=$(date '+%Y-%m-%d %H:%M:%S')
[ -f "$LOG" ] && tail -n 1000 "$LOG" > "$LOG.tmp" && mv "$LOG.tmp" "$LOG"
set -a; . ./.env; set +a
node --import ./ws-polyfill.mjs scripts/collect-official-prices.mjs --all --post >> "$LOG" 2>&1
echo "[$TS] official collection exit=$?" >> "$LOG"
