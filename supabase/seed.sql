insert into sources (id, name, base_url, entry_url, collection_method, enabled, notes)
values
  ('aibijia', 'Aibijia 公共报价', 'https://aibijia.org', 'https://data.aibijia.org/products.json', 'aibijia_json', true, '公开 products.json，同步为首版参考渠道。'),
  ('aisou-pro', 'Aisou智充', 'https://aisou.pro', 'https://aisou.pro/', 'browser', true, '前端动态加载，适合半自动浏览器采集。'),
  ('auto-subscribe', 'Auto Subscribe', 'https://shop.auto-subscribe.com', 'https://shop.auto-subscribe.com/', 'browser', true, '首版使用本机浏览器采集。'),
  ('qxvx-pay', 'QXVX Pay', 'https://pay.qxvx.cn', 'https://pay.qxvx.cn/', 'browser', true, '待采集确认。'),
  ('ldxp-jinyao', 'LDXP 金钥', 'https://pay.ldxp.cn', 'https://pay.ldxp.cn/shop/jinyao', 'browser', true, '可能出现 WAF，无法公开读取时使用人工补录。'),
  ('opensora-aifk', 'AUTO FK', 'https://aifk.opensora.de', 'https://aifk.opensora.de/', 'http', true, '公开页面能读到部分商品、价格和库存。'),
  ('caowo-store', 'GPT专卖-cw', 'https://caowo.store', 'https://caowo.store/', 'browser', true, '页面动态加载。'),
  ('makerich-club', 'AI创富俱乐部', 'https://makerich.club', 'https://makerich.club/', 'http', true, '公开页面可读到推荐商品。'),
  ('ldxp-pixelshop', 'LDXP Pixelshop', 'https://pay.ldxp.cn', 'https://pay.ldxp.cn/shop/pixelshop', 'browser', true, '可能出现 WAF，无法公开读取时使用人工补录。')
on conflict (id) do update set
  name = excluded.name,
  base_url = excluded.base_url,
  entry_url = excluded.entry_url,
  collection_method = excluded.collection_method,
  enabled = excluded.enabled,
  notes = excluded.notes;
