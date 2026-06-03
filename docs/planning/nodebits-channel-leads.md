# NodeBits 公开渠道候选清单

> 文档类型：候选渠道线索清单  
> 数据来源：NodeBits 公开接口 `/api/products`、`/api/shops`  
> 生成日期：2026-06-03  
> 使用边界：只把公开出现的原站入口作为候选渠道线索，不导入 NodeBits 报价、排序、收藏数、浏览量或描述作为 PriceAI 数据。

## 1. 提取结果

- 商品接口总数：1370 条。
- 可解析商品 `raw_text`：1324 条。
- 解析失败 `raw_text`：46 条。
- 去重后的明确原站店铺入口：58 个。
- 店铺描述中出现但未被商品 `raw_text` 确认的弱线索：1 条。

## 2. 明确候选渠道

| # | 原站入口 | NodeBits 店铺名 | 原站店铺名 | 平台/类目线索 | 报价数 | 有货数 | 最近出现 | 推荐采集器 | 样例商品 |
|---:|---|---|---|---|---:|---:|---|---|---|
| 1 | [https://pay.ldxp.cn/shop/SB9T68JP](https://pay.ldxp.cn/shop/SB9T68JP) | ai账号乐园 | AI账号乐园 | ChatGPT, Gemini, Apple Id, Claude, Cursor, 邮箱, Grok, 其他工具账号 | 208 | 126 | 2026-06-03 07:41:58 UTC | shopApi | 长效hotmail邮箱 OAuth2令牌号【已注册一年以上】 支持imap pop；微软邮箱长效-outlook 长效oauth2令牌 |
| 2 | [https://pay.ldxp.cn/shop/yuanAi](https://pay.ldxp.cn/shop/yuanAi) | 元Ai | 元Ai | ChatGPT, Google, Gmail, Gemini, Claude, Grok, 邮箱, 其他工具账号 | 131 | 114 | 2026-06-03 07:52:39 UTC | shopApi | grok普号(限时福利)；grok普号（free） |
| 3 | [https://pay.ldxp.cn/shop/Tora](https://pay.ldxp.cn/shop/Tora) | Tora-雪诺AI源头小铺 | Tora-雪诺AI源头分销小铺 | ChatGPT, Claude, Discord, Gemini, Grok, Telegram, Google Voice, 邮箱 | 90 | 75 | 2026-06-03 07:51:11 UTC | shopApi | 【点我点我，各种低价正规AI服务】免费GV接码网页号；Outlook-令牌长效-已绑辅邮(已授权oauth2，IMAP GRAPH) |
| 4 | [https://pay.ldxp.cn/shop/IK7OYLXZ](https://pay.ldxp.cn/shop/IK7OYLXZ) | 猫猫豆 | 猫猫豆 | ChatGPT, Grok, 邮箱, Gemini, Google, Apple Id, Claude, 其他工具账号 | 76 | 56 | 2026-06-03 07:49:40 UTC | shopApi | GROK【普号\|直登成品｜域名邮箱】只保首登【带帐密sso】；GROK【普号\|直登成品｜域名邮箱】只保首登【带帐密sso】 |
| 5 | [https://pay.ldxp.cn/shop/AEUQ8PP3](https://pay.ldxp.cn/shop/AEUQ8PP3) | ai教父 | ai教父 | ChatGPT, Gemini, Hotmail, Claude, 虚拟卡, 邮箱, Google, Apple Id | 54 | 45 | 2026-06-03 07:52:08 UTC | shopApi | outlook-令牌长效-邮件获取:imap,pop3,graph(双令牌通用)；hotmail-令牌长效-已绑辅邮-卡密带辅邮账密-(已授权oauth2，IMAP GRAPH) |
| 6 | [https://pay.ldxp.cn/shop/N5PXH3GX](https://pay.ldxp.cn/shop/N5PXH3GX) | AI List | Lvcortex | ChatGPT, Gmail, Gemini, Apple Id, Claude, 邮箱, Google, Telegram | 54 | 43 | 2026-06-03 07:48:16 UTC | shopApi | 微软长效-outlook-【gr/o2双令牌号】-【英文随机+数字】Graph令牌号和OAuth2-IMAP-POP3；微软长效-hotmail-【gr/o2双令牌号】-【英文随机+数字】Graph令牌号和OAuth2-IMAP-POP3 |
| 7 | [https://pay.ldxp.cn/shop/MEDDEX4V](https://pay.ldxp.cn/shop/MEDDEX4V) | AI HOME | AI HOME | ChatGPT, Claude, 邮箱, Gemini | 52 | 46 | 2026-05-03 16:46:20 UTC | shopApi | [普号] ChatGPT 长效微软邮箱；[普号] ChatGPT 长效微软邮箱 |
| 8 | [https://pay.ldxp.cn/shop/52ai](https://pay.ldxp.cn/shop/52ai) | 52AI店铺 | 52AI店铺 | ChatGPT, Gemini, Claude, Grok, 推特, 邮箱, 虚拟卡, Google | 50 | 40 | 2026-06-03 07:42:21 UTC | shopApi | 【每人限1个】Codex官方中转API 1美元0.1x 倍率=10美元额度；微软长效-outlook-【双令牌号】-【英文随机+数字】Graph令牌号和OAuth2-IMAP-POP3 |
| 9 | [https://pay.ldxp.cn/shop/ZM24RG4J](https://pay.ldxp.cn/shop/ZM24RG4J) | 伊莉雅ai会员店 | 【伊莉雅】Gemini gpt grok【招代理】 | ChatGPT, Gmail, Gemini, Telegram, Apple Id, Claude | 42 | 33 | 2026-06-03 07:50:04 UTC | shopApi | 微软邮箱长效-outlook  oauth2令牌 refresh_token号  imap pop3；coedx 接码 （一次码）【出现手机号已被使用这种情况，直接带着截图投诉退款】 |
| 10 | [https://pay.ldxp.cn/shop/one](https://pay.ldxp.cn/shop/one) | 云边小铺 | 云边小铺（招代理） | ChatGPT, Gemini, Apple Id, Claude, Grok, 邮箱, Google, 其他工具账号 | 41 | 36 | 2026-06-03 07:40:41 UTC | shopApi | 微软hotmail；GROK【普号\|直登成品｜域名邮箱】只保首登 |
| 11 | [https://pay.ldxp.cn/shop/Q0GWJ4YV](https://pay.ldxp.cn/shop/Q0GWJ4YV) | Ai小店 | Ai小店（小白勿拍、小白勿拍、小白勿拍） | ChatGPT, Gemini, Grok, 邮箱, 其他工具账号, Claude | 41 | 20 | 2026-05-11 11:24:23 UTC | shopApi | super grok3天试用 质保首登；20-24GMAIL邮箱/2FA/随机地区 |
| 12 | [https://pay.ldxp.cn/shop/YGOV1U2Q](https://pay.ldxp.cn/shop/YGOV1U2Q) | 虚拟产品批发 | 虚拟产品批发 | ChatGPT, Gemini, Outlook, Claude, 推特, 邮箱, 其他工具账号, 虚拟卡 | 38 | 30 | 2026-06-03 07:43:42 UTC | shopApi | 微软邮箱长效-outlook  oauth2令牌 refresh_token号  imap pop3；Cursor  美区 接码 业务自测 没问题在批量上（不售后） |
| 13 | [https://pay.ldxp.cn/shop/aishop1](https://pay.ldxp.cn/shop/aishop1) | GPT大玩家, GPT 大玩家 | 稳问AI  --GPT 大玩家 | ChatGPT, Claude, Outlook, 邮箱, Google, Gemini, Grok | 32 | 24 | 2026-06-03 07:48:37 UTC | shopApi | 长效注册邮箱注册万物 微软邮箱hotmail.com邮箱 带密码 直接网页登录；长效注册邮箱注册万物 微软邮箱hotmail.com邮箱 带密码 直接网页登录 |
| 14 | [https://pay.ldxp.cn/shop/1DM0L7CR](https://pay.ldxp.cn/shop/1DM0L7CR) | 源头GPT | 源头GPT | ChatGPT, Google, Gmail, Gemini, Google Voice, 邮箱, Grok, Claude | 31 | 19 | 2026-06-03 07:42:59 UTC | shopApi | 微软长效-outlook-API取件-Graph令牌号和OAuth2；微软长效-Hotmail-API取件-Graph令牌号和OAuth2 |
| 15 | [https://pay.ldxp.cn/shop/EXZMM8SQ](https://pay.ldxp.cn/shop/EXZMM8SQ) | GPTgemini都有 | team最后的余晖 | ChatGPT, Gemini, Claude, Grok, 邮箱, Telegram, 其他工具账号 | 28 | 20 | 2026-06-03 07:43:10 UTC | shopApi | CHATGPT FREE号 （已经接过码）；[普号\|白号]  Grok AI 长效微软邮箱 |
| 16 | [https://pay.ldxp.cn/shop/2W1EEK4J](https://pay.ldxp.cn/shop/2W1EEK4J) | AI主理人 | AI主理人 | ChatGPT, Google, Gemini, Claude, Telegram, 邮箱, Tiktok, Grok | 27 | 24 | 2026-06-03 07:42:33 UTC | shopApi | 验证码接码-可接google。；微软邮箱长效-outlook 满周长效oauth2令牌 |
| 17 | [https://pay.ldxp.cn/shop/gogo](https://pay.ldxp.cn/shop/gogo) | AI gogo渠道 | AI gogo渠道 （招代理） | ChatGPT, Gemini, Claude, 邮箱, Google, Apple Id, Grok | 25 | 23 | 2026-06-03 07:45:09 UTC | shopApi | Outlook.de微软德国邮箱（OAuth2令牌邮箱，已开通IMAP POP3）；【日区PP渠道】ChatGPT Plus 独享成品号（质保首登/拍下即发/注意账号格式） |
| 18 | [https://pay.ldxp.cn/shop/4YWWAAFM](https://pay.ldxp.cn/shop/4YWWAAFM) | 蜗的AI | 蜗的AI | Gmail, Hotmail, 短信服务, Claude, Grok, ChatGPT, 邮箱, Telegram | 22 | 18 | 2026-06-03 07:40:21 UTC | shopApi | OpenAI Codex 手机接码；ChatGPT 蜗的AI-中转-官方plus号池-100$ |
| 19 | [https://pay.ldxp.cn/shop/C7MLWX4N](https://pay.ldxp.cn/shop/C7MLWX4N) | MortyAi小铺 | mortyAI小铺 | ChatGPT, Claude, 邮箱, Telegram, Gemini | 17 | 12 | 2026-06-03 07:52:22 UTC | shopApi | Gopay GPT PLUS  CPA json格式卡密，带RT，已绑手机，outlook 邮箱。无质保；【美国+1 】高性价比新号 \| 基础权重 \| 必备小号备用号 |
| 20 | [https://pay.ldxp.cn/shop/SubAIP](https://pay.ldxp.cn/shop/SubAIP) | AI源头批发旗舰店 | AI源头批发旗舰店 | ChatGPT, Claude, Perplexity, Google, Gemini, Apple Id, Grok, 其他工具账号 | 17 | 14 | 2026-06-03 07:47:44 UTC | shopApi | ChatGPT - Plus 月卡 成品号质保首登；【包GCP】美区google邮箱Gmail【稳定老号】【20-24年】可做Pixel 家庭组 挖矿 |
| 21 | [https://pay.ldxp.cn/shop/echo_dream](https://pay.ldxp.cn/shop/echo_dream) | AI小铺 | AI小铺 | ChatGPT, Gemini, Grok, 邮箱, Claude | 16 | 13 | 2026-06-03 07:41:16 UTC | shopApi | 微软长效-outlook-【gr/o2双令牌号】-【英文随机+数字】Graph令牌号和OAuth2-IMAP-POP3；CHATGPT FREE号 （已经接过码） |
| 22 | [https://pay.ldxp.cn/shop/QLL06630](https://pay.ldxp.cn/shop/QLL06630) | Ai小店 | Ai小店1150 | ChatGPT, Gemini, Claude, Grok | 16 | 15 | 2026-06-03 07:47:30 UTC | shopApi | Cursor  美区 接码 业务自测 没问题在批量上（不售后） 代理对接：u0fffzj6；OpenAI Codex 手机接码 |
| 23 | [https://pay.ldxp.cn/shop/aiTeam](https://pay.ldxp.cn/shop/aiTeam) | Ai家族 | Ai家族 | ChatGPT, Gmail, Claude, Grok, Gemini, 邮箱 | 15 | 14 | 2026-06-03 07:42:47 UTC | shopApi | 三水｜普号；画风｜普号 |
| 24 | [https://pay.ldxp.cn/shop/1D0LD6BR](https://pay.ldxp.cn/shop/1D0LD6BR) | 小猫GPT源头 | 小猫GPT源头 | ChatGPT, Grok, 邮箱, Gemini, Claude | 13 | 7 | 2026-06-03 07:49:06 UTC | shopApi | GROK【普号\|直登成品｜域名邮箱】只保首登；微软长效邮箱Outlook Trusted 邮箱- OAuth2 + Graph 满周长期有效 |
| 25 | [https://pay.ldxp.cn/shop/ai.shop](https://pay.ldxp.cn/shop/ai.shop) | AI开发商 | AI开发商 | ChatGPT, Gemini, Grok, Gmail, Claude | 13 | 7 | 2026-06-03 07:44:25 UTC | shopApi | ChatGPT Team 成品母号（无质保）；提取12个月优惠链接 一次 gemin pro（懂的买 无教程）小白勿拍 |
| 26 | [https://pay.ldxp.cn/shop/5NVWW2PJ](https://pay.ldxp.cn/shop/5NVWW2PJ) | 元元低价ai店 | 元元低价ai店 | ChatGPT, Claude, Gemini, Gmail, Google, Grok | 12 | 7 | 2026-06-03 07:53:01 UTC | shopApi | ChatGPT Plus  在线代开Puls （冲自己号，新渠道稳定1）；【日抛2- team发货格式cpa，sub2】 team成品质保首登，带rt，只能反代codex ，15刀 左右 |
| 27 | [https://pay.ldxp.cn/shop/7HVUEC3Y](https://pay.ldxp.cn/shop/7HVUEC3Y) | 464 | 464 | ChatGPT, 邮箱, Grok, Gemini, Claude | 12 | 7 | 2026-06-03 07:51:33 UTC | shopApi | 微软长效-hotmail-【gr/o2双令牌号】-【英文随机+数字】Graph令牌号和OAuth2-IMAP-POP3；GROK【普号\|直登成品｜域名邮箱】只保首登 |
| 28 | [https://pay.ldxp.cn/shop/D92VW084](https://pay.ldxp.cn/shop/D92VW084) | 咔咔 | 咔咔 | ChatGPT, Gemini | 12 | 5 | 2026-06-03 07:50:24 UTC | shopApi | 新手尝鲜套餐｜¥5  ｜轻舟AI中转站 0.25倍率；10刀额度天卡｜¥9  ｜轻舟AI中转站 0.25倍率 |
| 29 | [https://pay.ldxp.cn/shop/GAXW96YR](https://pay.ldxp.cn/shop/GAXW96YR) | LynnZee | LynnZee | ChatGPT, 邮箱, Claude, Telegram | 9 | 3 | 2026-06-03 07:50:35 UTC | shopApi | 微软Outlook Trusted 邮箱- OAuth2 + Graph 长期有效；GPT plus 成品号日抛x1【质保首登】 |
| 30 | [https://pay.ldxp.cn/shop/VUOJQOHY](https://pay.ldxp.cn/shop/VUOJQOHY) | 小久会员店 | 小久 | ChatGPT, Claude, Grok, 邮箱, Google | 9 | 7 | 2026-06-03 07:42:09 UTC | shopApi | 🟨【19-24年老号】谷歌邮箱成品老号·Gmail带2fa链接·包登录【包GCP】🟡自动发货；Gmail邮箱  20-24年 Google老号 |
| 31 | [https://pay.ldxp.cn/shop/rgzn](https://pay.ldxp.cn/shop/rgzn) | AI小屋 | AI小屋 | ChatGPT, Google, Outlook, 邮箱, Gemini | 8 | 7 | 2026-06-03 07:43:20 UTC | shopApi | 微软邮箱长效-outlook 长效oauth2令牌；微软长效-outlook-【gr/o2双令牌号】-【英文随机+数字】Graph令牌号和OAuth2-IMAP-POP3 |
| 32 | [https://pay.ldxp.cn/shop/ycyapi](https://pay.ldxp.cn/shop/ycyapi) | YCYAI | YCYAPI | ChatGPT, Claude, Gemini, Grok | 8 | 5 | 2026-06-03 07:43:31 UTC | shopApi | Google验证 美国手机号（两个月内可重复接码）（购买前务必看介绍）；质保一天/  ChatGPT Plus 成品号｜自助发货｜24小时发货 |
| 33 | [https://pay.ldxp.cn/shop/ymymai](https://pay.ldxp.cn/shop/ymymai) | 亚米的整合服务供应商 | 亚米的整合服务供应商 | ChatGPT, Gmail, Gemini, Grok | 7 | 5 | 2026-06-03 07:40:08 UTC | shopApi | 提取12个月优惠链接 一次 gemin pro（不会用别买不退不换，小白别买）；GPT PLUS成品。质保首登 购买之前先看商品描述 |
| 34 | [https://pay.ldxp.cn/shop/YTR60TGVK](https://pay.ldxp.cn/shop/YTR60TGVK) | Ai小熊 | Ai小熊 | ChatGPT, Gmail, Gemini, Grok, 邮箱, Claude | 7 | 5 | 2026-06-03 07:51:55 UTC | shopApi | 22-24GMAIL邮箱/2FA/随机地区；Gemini3.1pro一年（直冲）到你自己的账号 |
| 35 | [https://pay.ldxp.cn/shop/22DHYNNV](https://pay.ldxp.cn/shop/22DHYNNV) | 哈哈的ai杂货铺 | 哈哈的ai杂货铺 | ChatGPT, Gemini, Grok, Claude | 6 | 6 | 2026-06-03 07:50:45 UTC | shopApi | GROK【普号\|直登成品｜域名邮箱】只保首登；Gemini pro一年CDK充值  包绑卡 1次  （充值无叠加 有会员不能充值） |
| 36 | [https://pay.ldxp.cn/shop/AWXK3UJY](https://pay.ldxp.cn/shop/AWXK3UJY) | 彩虹马的AI店 | 彩虹马的AI店 | ChatGPT, Gemini | 6 | 5 | 2026-06-03 07:44:04 UTC | shopApi | 提取12个月优惠链接 一次 gemin pro（不会用别买不退不换，小白别买）；Gemini pro一年CDK充值一年 （关闭付款资料） |
| 37 | [https://pay.ldxp.cn/shop/DJFT26BF](https://pay.ldxp.cn/shop/DJFT26BF) | 映核素材馆 | 映核资源站 | Gemini, 邮箱, ChatGPT | 6 | 1 | 2026-06-03 07:51:22 UTC | shopApi | Kiro Pro 1000积分 成品号 质保首登 gmail邮箱；【日区PP渠道】ChatGPT Plus 独享成品号（质保首登/拍下即发/注意账号格式） |
| 38 | [https://pay.ldxp.cn/shop/ji_su_ai](https://pay.ldxp.cn/shop/ji_su_ai) | 极速AI | 极速AI | ChatGPT, Claude, Grok, Gemini | 6 | 5 | 2026-05-21 12:43:18 UTC | shopApi | GPT账号（白号）普通号｜账号密码直登｜gpt专用｜高权重家宽｜独享号，长效【微软邮箱交付】；ChatGPT - Plus 月卡【只质保首登，到手即用！】 |
| 39 | [https://pay.ldxp.cn/shop/RXKT7LFX](https://pay.ldxp.cn/shop/RXKT7LFX) | 商家9237 | 商家9237 | ChatGPT, Gemini | 6 | 6 | 2026-06-01 00:49:22 UTC | shopApi | gemini pro一年  （绑定手机号就可以用）需要绑定手机号                   2-4年老邮箱；Gemini pro一年CDK充值一年（关闭支付资料） |
| 40 | [https://pay.ldxp.cn/shop/TSW7DIEI](https://pay.ldxp.cn/shop/TSW7DIEI) | ai主理人 | ai主理人 | Claude, ChatGPT, Gemini, 其他工具账号 | 6 | 4 | 2026-06-03 07:46:27 UTC | shopApi | claude max 中转满血api；claude max api10刀兑换码 |
| 41 | [https://pay.ldxp.cn/shop/2E2KPQD1](https://pay.ldxp.cn/shop/2E2KPQD1) | AI杂货 | AI杂货 | ChatGPT, Claude, 邮箱, Gemini | 5 | 5 | 2026-06-03 07:41:38 UTC | shopApi | Gpt Free（提供邮箱接码 已经接码）\| 注册地美国 \| outlook.com \| 家庭宽带注册；CHATGPT FREE号 （已经接过码） |
| 42 | [https://pay.ldxp.cn/shop/J6F0Z1MF](https://pay.ldxp.cn/shop/J6F0Z1MF) | 恶小梦API | 恶小梦API | ChatGPT, 短信服务, 邮箱 | 5 | 3 | 2026-06-03 07:45:35 UTC | shopApi | 微软邮箱长效-outlook 长效oauth2令牌；Gpt Free（提供邮箱接码 已经接码）\| 注册地美国 \| outlook.com \| 家庭宽带注册 |
| 43 | [https://pay.ldxp.cn/shop/qingqing](https://pay.ldxp.cn/shop/qingqing) | 青卿 | 青卿 | ChatGPT | 5 | 4 | 2026-06-03 07:50:57 UTC | shopApi | 【无质保】plus 1月直充卡【需新号】；Plus 土区自助卡密【秒充】【不用等凭证排队】【保证正规渠道土区】 |
| 44 | [https://pay.ldxp.cn/shop/UW94LBON](https://pay.ldxp.cn/shop/UW94LBON) | yemao-ai源头 | yemao-ai源头 | ChatGPT | 5 | 1 | 2026-06-03 07:45:58 UTC | shopApi | GPT free sub2格式json带rt不带账密质保首登；【日抛--发货格式cpa，sub2】plus成品质保首登，，只能反代codex。 |
| 45 | [https://pay.ldxp.cn/shop/4GG4E3MF](https://pay.ldxp.cn/shop/4GG4E3MF) | 元筑AI | 元筑AI | ChatGPT | 4 | 4 | 2026-05-13 14:38:24 UTC | shopApi | Plus 质保首登。提供账号密码、sub2api/cpa的json；GPT plus账号质保首登。提供账号密码、sub2api/cpa的json |
| 46 | [https://pay.ldxp.cn/shop/anon](https://pay.ldxp.cn/shop/anon) | 千早爱音的AI小铺 | ChihayaAI | ChatGPT, Gemini, Claude, Grok, Google | 4 | 3 | 2026-06-03 07:39:57 UTC | shopApi | 【包GCP】美区｜google邮箱【稳定老号】【22-24年】；【包GCP】Gemini Pro 1年订阅成品号【26年随机地区比老号稳】 |
| 47 | [https://pay.ldxp.cn/shop/gpt5.5](https://pay.ldxp.cn/shop/gpt5.5) | AI华强北 | AI华强北 | ChatGPT, 虚拟卡, Gemini | 4 | 3 | 2026-06-03 07:51:45 UTC | shopApi | CHATGPTPlus RT 成品号（带rt+已绑手机号验证）；chatgpt-cdk 直充 |
| 48 | [https://pay.ldxp.cn/shop/AG7CVCOD](https://pay.ldxp.cn/shop/AG7CVCOD) | 喵喵AI小铺 | 喵喵AI小铺2061 | Apple Id, ChatGPT, Gemini | 3 | 1 | 2026-06-03 07:52:50 UTC | shopApi | 【限时福利】ChatGPT plus成品号（质保首登）；Plus网页号，剩余15-25天（质保首登） |
| 49 | [https://pay.ldxp.cn/shop/chenxiaochun](https://pay.ldxp.cn/shop/chenxiaochun) | 高质稳定号 | 看公告找我 | ChatGPT | 3 | 0 | 2026-06-03 07:46:11 UTC | shopApi | Chatgpt plus 日抛；ChatGPT Pro 5X 无保 |
| 50 | [https://pay.ldxp.cn/shop/grokheavy](https://pay.ldxp.cn/shop/grokheavy) | Grok年卡专卖 | AI For Everyone | Grok | 3 | 3 | 2026-06-03 07:47:54 UTC | shopApi | SuperGrok 独享账号 三天升级试用号；SuperGrok 独享账号 一月会员 质保5天 新渠道 |
| 51 | [https://pay.ldxp.cn/shop/1I2Y9GEC](https://pay.ldxp.cn/shop/1I2Y9GEC) | 靠谱AI | 靠谱 AI | ChatGPT, 邮箱 | 2 | 1 | 2026-06-03 07:45:22 UTC | shopApi | 28天质保-Gmail/iCloud邮箱plus成品账号；【包过，不过不收费】Chatgpt-cyber认证 |
| 52 | [https://pay.ldxp.cn/shop/9P102ZA3](https://pay.ldxp.cn/shop/9P102ZA3) | aili的gpt | ali.shop | ChatGPT, Apple Id, Claude | 2 | 2 | 2026-06-03 07:45:47 UTC | shopApi | Claude普通账号（雅虎邮箱，imap登录，网易邮箱大师接码）；🟨Apple ID【土耳其·原生非改区】土区苹果id·免税【带消费记录·双重号·未激活ic】可做GPT业务🟡自动发货 |
| 53 | [https://pay.ldxp.cn/shop/F06LXGPS](https://pay.ldxp.cn/shop/F06LXGPS) | aikami | aikami | Claude, ChatGPT, Gemini | 2 | 0 | 2026-06-03 07:46:38 UTC | shopApi | gemini pro 一年 代订阅包含绑卡cdkey 无质保；Claude Pro 直充月卡 |
| 54 | [https://pay.ldxp.cn/shop/H2QPI3X2](https://pay.ldxp.cn/shop/H2QPI3X2) | 灵AI | 灵AI | ChatGPT, Google, Gemini | 2 | 2 | 2026-06-03 07:48:54 UTC | shopApi | 【包GCP】google邮箱Gmail【稳定老号】【20-24年随机地区】可做Pixel 家庭组 挖矿；Gemini Pro 充值自己账号 订阅12个月【无质保】 |
| 55 | [https://pay.ldxp.cn/shop/SQ5C82YG](https://pay.ldxp.cn/shop/SQ5C82YG) | 邻家数字铺 | 邻家数字铺 | ChatGPT, Gemini, Gmail, Grok, Telegram | 2 | 2 | 2026-06-03 07:48:26 UTC | shopApi | 【美国+1 】高性价比新号 \| 店主亲测手机稳定，不要电脑登录！！！大概率没了！！！ \| 必备小号备用号；｛冲自己号｝Gemini Pro一年会员自动开通CDK 包绑卡订阅 1次 低价不质保 |
| 56 | [https://pay.ldxp.cn/shop/UHZ7YO18](https://pay.ldxp.cn/shop/UHZ7YO18) | GPT源头店铺 | ai源头 | ChatGPT, 短信服务 | 2 | 1 | 2026-06-03 07:44:57 UTC | shopApi | CHATGPT FREE号 （已经接过码）；chatgpt-plus（超长存活） |
| 57 | [https://pay.ldxp.cn/shop/AZX4SPJ0](https://pay.ldxp.cn/shop/AZX4SPJ0) | Gemini批发 | Gemini批发 | ChatGPT, Gemini | 1 | 0 | 2026-06-03 07:44:14 UTC | shopApi | GPT Plus成品号（质保两周） |
| 58 | [https://pay.ldxp.cn/shop/X273D51R](https://pay.ldxp.cn/shop/X273D51R) | 南乔ai | 南乔ai | ChatGPT | 1 | 0 | 2026-06-03 07:41:26 UTC | shopApi | ChatGPT PLUS 一卡一绑 非常稳定 |

## 3. 弱线索：描述中出现的 URL

这些链接只是在 NodeBits 店铺描述中出现，没有在商品 `raw_text.shopUrl` 中确认为原站店铺入口。建议仅作为人工复核线索。

| # | NodeBits 店铺名 | URL | 标签 |
|---:|---|---|---|
| 1 | Gemini账号批发 | [https://douyiner.cn](https://douyiner.cn) | ChatGPT, Gemini, Google |

## 4. 后续处理建议

1. 先把“明确候选渠道”按 `baseUrl + entryPath` 去重后导入候选渠道池，不直接启用。
2. 对 `pay.ldxp.cn/shop/...` 来源优先使用现有 `shopApi` 做批量试采集。
3. 试采集成功后进入后台审核；失败则进入“待补采集器”，不要人工长期补录。
4. 对带有一次性参数的链接，已在本清单中移除 `u_atoken`、`u_asig` 等参数，后续仍需要以规范化后的店铺入口为准。
5. 单商品链接只能作为反查线索，不应直接成为渠道。
