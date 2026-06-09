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

## 数据采集与定时任务

数据全自动采集、写库、上页面，无需人工干预。整条数据流：

```
定时采集  →  写入 Supabase 数据库  →  页面 ISR 缓存 30 分钟内自动刷新  →  访客看到新价格
```

### 定时任务（crontab）
| 任务 | 频率 | 脚本 | 写入的表 |
|------|------|------|---------|
| 卡网报价 | 每小时 `0 * * * *` | `deploy/cron-collect.sh` | `raw_offers` / `crawl_runs` / `sources` |
| 官方订阅价 | 每天 `30 4 * * *`（北京 12:30） | `deploy/cron-official.sh` | `official_subscription_region_prices` 等 |

- 卡网脚本调用 HTTP 接口 `/api/cron/collect-prices`（`post:true` 写库），日志 `/var/log/priceaialy/collect.log`。
- 官方价脚本直接跑 `collect-official-prices.mjs --all --post`，日志 `/var/log/priceaialy/official.log`。
- 采集有 **25 分钟冷却**（`PRICEAI_COLLECTOR_COOLDOWN_MINUTES`）：同一源 25 分钟内不重复采。
- 采集并发 `PRICEAI_COLLECT_CONCURRENCY=4`，让全量在 HTTP 接口的 300 秒上限内跑完。

### 页面刷新
首页 / API 模型页用 ISR（`export const revalidate = 1800`），数据库更新后**最多 30 分钟自动刷新**，不需要重新构建或重启。

### 手动跑一轮 / 排查
```bash
cd /var/www/PriceAIAly
bash deploy/cron-collect.sh                  # 手动触发卡网采集
bash deploy/cron-official.sh                 # 手动触发官方价采集
crontab -l                                   # 查看定时任务
tail -f /var/log/priceaialy/collect.log      # 卡网采集日志
tail -f /var/log/priceaialy/official.log     # 官方价采集日志
```
> 注意：直接用 `node` 跑 `scripts/collect-*.mjs` 时，Node 20 需要 ws 垫片：
> `node --import ./ws-polyfill.mjs scripts/collect-prices.mjs --post`（脚本默认不写库，要加 `--post`）。
> HTTP cron 接口则无此问题（Next.js 运行时自带 WebSocket）。

## 常用排查
```bash
pm2 status                       # 进程状态
pm2 logs priceaialy              # 应用日志
tail -f /var/log/priceaialy/*.log
sudo tail -f /var/log/nginx/error.log
curl -I http://127.0.0.1:3000    # 应用是否在跑
```

> 注意：本服务器在北京，**访问 GitHub 不稳定**，`deploy.sh` 的 `git pull` 可能失败。更新代码时改用「本地 push 到 GitHub + scp 改动文件到服务器 + 重新构建」。
