#!/usr/bin/env bash
# One-time server bootstrap for PriceAIAly on a fresh Aliyun ECS (Ubuntu/Debian).
# Run as root:  bash server-bootstrap.sh
# Installs: Node 20 LTS, pm2, nginx, git. Idempotent — safe to re-run.
set -euo pipefail

APP_DIR="/var/www/PriceAIAly"
REPO="https://github.com/Mr-HRJ/PriceAIAly.git"
NODE_MAJOR=20

echo "==> Detecting package manager"
if command -v apt-get >/dev/null 2>&1; then
  PKG=apt
elif command -v yum >/dev/null 2>&1; then
  PKG=yum
else
  echo "Unsupported distro (need apt or yum)"; exit 1
fi

echo "==> Installing base packages (git, curl, nginx)"
if [ "$PKG" = apt ]; then
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -y
  apt-get install -y curl git nginx ca-certificates gnupg
else
  yum install -y curl git nginx
fi

echo "==> Installing Node ${NODE_MAJOR} LTS"
if ! command -v node >/dev/null 2>&1 || [ "$(node -v | sed 's/v\([0-9]*\).*/\1/')" -lt "$NODE_MAJOR" ]; then
  if [ "$PKG" = apt ]; then
    curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
    apt-get install -y nodejs
  else
    curl -fsSL "https://rpm.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
    yum install -y nodejs
  fi
fi
echo "    node $(node -v), npm $(npm -v)"

echo "==> Installing pm2 globally"
npm install -g pm2

echo "==> Cloning repo into ${APP_DIR}"
mkdir -p "$(dirname "$APP_DIR")"
if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO" "$APP_DIR"
else
  echo "    repo already present, skipping clone"
fi

mkdir -p /var/log/priceaialy

echo "==> Enabling nginx on boot"
systemctl enable nginx >/dev/null 2>&1 || true

cat <<'NEXT'

==> Bootstrap done. Next steps:
  1. Create the env file:
       cp /var/www/PriceAIAly/deploy/.env.production.template /var/www/PriceAIAly/.env
       nano /var/www/PriceAIAly/.env     # fill in real values
  2. Deploy (build + start):
       bash /var/www/PriceAIAly/deploy/deploy.sh
  3. Configure nginx:
       cp /var/www/PriceAIAly/deploy/nginx-priceaialy.conf /etc/nginx/conf.d/priceaialy.conf
       # edit server_name in that file, then:
       nginx -t && systemctl reload nginx
NEXT
