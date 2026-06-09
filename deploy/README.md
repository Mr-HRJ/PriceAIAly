# 部署到阿里云 ECS（Node + PM2 + Nginx）

整套流程在服务器上跑。本目录已备好所有配置和脚本。

## 现状速览（2026-06）

| 项 | 值 |
|----|----|
| 线上地址 | **https://price.bnoai.com**（DNS 直连 + Let's Encrypt；务必带 `https://`） |
| 服务器 | 阿里云 ECS `60.205.154.102`（cn-beijing），Node 20 + pm2(`priceaialy`) + nginx |
| 备案 | 走子域名 `price.bnoai.com`，继承 `bnoai.com` 的备案 `冀ICP备2025124877号`（`sentinel.wang` 因未备案不可用） |
| 数据库 | Supabase（前端实时读取；无 Supabase 时回退 `src/lib/sample-data.ts` 示例数据） |
| 数据量 | 卡网报价 ~1300 条 / 54 个源、API 模型 17 个、官方订阅价 658 条（4 app × 47 区） |

> ⚠️ 纯 `http://price.bnoai.com` 会被阿里云 80 端口备案拦截器挡成 403（阿里云无法 MITM 443，所以 HTTPS 正常）。已加 HSTS，访客用过一次 https 后浏览器会自动升级。

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

### 官方价为什么能从北京采到（非显然）
Apple 会把大陆 IP 的 App Store 请求 302 跳到 `/cn/` 区，采不到各区内购价。
`scripts/collect-official-prices.mjs` 的解法：请求时带 `X-Apple-Store-Front: <storefrontId>,26` 头**强制指定区域**（内置 47 区的 storefront ID 映射；`,26` 是 web 平台号，不带语言号才通用），并从返回 JSON 的 `pageData.addOns[].{name,price}` 解析内购价。

## 数据源管理（扩量）

卡网源存在 Supabase 的 `sources` 表（`enabled=true` 才采）。`config/collectors.json` 按域名把源识别成采集器类型（kami / 独角数卡 / shopApi / 各 HTML、API 类）。

- **查看可识别渠道**：`npm run collect:prices -- --list`
- **采集器健康报告**（慢源 / 失败源 / 失败原因分组）：`npm run collect:performance -- --hours 24`
- **加单个源**：往 `sources` 表插一行（`id`、`name`、`entry_url=https://域名/`、`collector_kind`（或 `auto`）、`enabled=true`）。系统按域名自动识别采集器；下次定时任务自动采。

### 想让数据更全 = 加更多源
当前已把 `collectors.json` 里**公开已知的 62 个店铺**基本全开（54 个在产出）。要进一步逼近对标站（它有上百个私有源），只能补**真实源 URL**：
1. **拿到店铺链接就加** —— 任意卡网/合租店铺网址。
2. **shopApi 是多租户**：`pay.ldxp.cn` / `pay.qxvx.cn` / `catfk.com` 一个主域挂很多店，每店是 `/shop/<店铺名>`。知道店铺名就能一次加一批（采集器不会自动枚举，必须显式给路径）。失败的 `ldxp-jinyao` / `qxvx-pay` 就是缺正确店铺路径。
3. **站点提交功能**：首页提交入口让用户帮忙报源，长期自然增长。

> shopApi 这类多租户渠道有渠道族保护（默认单轮最多 20 店、同族间隔 15s、命中风控熔断 30min），见 `docs/collectors.md`。

## 同步上游更新

本仓库 fork 自 `physics-dimension/PriceAI`。拉上游更新：
```bash
git remote add upstream https://github.com/physics-dimension/PriceAI.git   # 仅首次
git fetch upstream
git merge --no-commit --no-ff upstream/main   # 先试合并看冲突，OK 再正式 merge（或 --abort）
git push origin main
```
本地独有改动（`deploy/`、`ws-polyfill.mjs`、官方价 storefront 修复、去掉 GitHub 按钮）都在上游改动之外，迄今合并无冲突。

**把更新部署到服务器**（GitHub 在北京**时通时不通**）：
```bash
# GitHub 能连时（干净）：
cd /var/www/PriceAIAly && git fetch origin && git reset --hard origin/main && npm ci && npm run build && pm2 reload priceaialy
# 连不上时：本地 scp 改动文件到服务器，再 npm run build + pm2 reload
```
`reset --hard` 安全：`.env` 被 gitignore、node_modules 与数据库都保留。**reload 前先 `npm run build` 且 `npm run test:catalog`（121 用例）通过**，避免把坏代码放上线。

## 常用排查
```bash
pm2 status                       # 进程状态
pm2 logs priceaialy              # 应用日志
tail -f /var/log/priceaialy/*.log
sudo tail -f /var/log/nginx/error.log
curl -I http://127.0.0.1:3000    # 应用是否在跑
```

> 注意：本服务器在北京，**访问 GitHub 不稳定**，`deploy.sh` 的 `git pull` 可能失败。更新代码时改用「本地 push 到 GitHub + scp 改动文件到服务器 + 重新构建」。
