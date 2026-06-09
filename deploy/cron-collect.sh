#!/usr/bin/env bash
# Triggered by cron every 30 min (see crontab). Collects card-shop prices
# by calling the app's cron endpoint with CRON_SECRET, logging the result.
set -uo pipefail
cd /var/www/PriceAIAly
CRON=$(grep '^CRON_SECRET=' .env | cut -d= -f2-)
LOG=/var/log/priceaialy/collect.log
TS=$(date '+%Y-%m-%d %H:%M:%S')
# keep log bounded
[ -f "$LOG" ] && tail -n 2000 "$LOG" > "$LOG.tmp" && mv "$LOG.tmp" "$LOG"
CODE=$(curl -sS -m 290 -o /tmp/collect-out.json -w '%{http_code}' \
  "http://127.0.0.1:3000/api/cron/collect-prices" -H "Authorization: Bearer $CRON" 2>>"$LOG")
echo "[$TS] collect-prices http=$CODE $(head -c 200 /tmp/collect-out.json)" >> "$LOG"
