# 部署到阿里云 ECS（Node + PM2 + Nginx）

整套流程在服务器上跑。本目录已备好所有配置和脚本。

## 前提
- 一台阿里云 ECS，公网 IP，能 SSH 登录（Ubuntu/Debian 或 CentOS 均可）。
- 安全组放行 **80**（HTTPS 再放 **443**）和 **22**。
- 准备好 Supabase 凭据和管理后台密码。

## 步骤

### 1. 一次性初始化（装 Node20 / pm2 / nginx + 克隆代码）
```bash
# 先把脚本传上去，或登录后直接 curl 仓库里的脚本
curl -fsSL https://raw.githubusercontent.com/Mr-HRJ/PriceAIAly/main/deploy/server-bootstrap.sh -o /tmp/bootstrap.sh
sudo bash /tmp/bootstrap.sh
```

### 2. 填环境变量
```bash
cp /var/www/PriceAIAly/deploy/.env.production.template /var/www/PriceAIAly/.env
nano /var/www/PriceAIAly/.env   # 填入真实 Supabase / ADMIN_PASSWORD / CRON_SECRET
```
> `ADMIN_SESSION_SECRET` 和 `CRON_SECRET` 可用 `openssl rand -hex 32` 生成。

### 3. 构建并启动
```bash
sudo bash /var/www/PriceAIAly/deploy/deploy.sh
```

### 4. 配置 Nginx 反代
```bash
sudo cp /var/www/PriceAIAly/deploy/nginx-priceaialy.conf /etc/nginx/conf.d/priceaialy.conf
sudo nano /etc/nginx/conf.d/priceaialy.conf   # 把 server_name 改成你的域名或公网 IP
sudo nginx -t && sudo systemctl reload nginx
```
现在访问 `http://你的域名或IP` 即可。

### 5.（可选）HTTPS
```bash
sudo apt-get install -y certbot python3-certbot-nginx   # Debian/Ubuntu
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 日常更新
```bash
sudo bash /var/www/PriceAIAly/deploy/deploy.sh   # git pull + 重新构建 + pm2 reload
```

## 常用排查
```bash
pm2 status                       # 进程状态
pm2 logs priceaialy              # 应用日志
tail -f /var/log/priceaialy/*.log
sudo tail -f /var/log/nginx/error.log
curl -I http://127.0.0.1:3000    # 应用是否在跑
```
