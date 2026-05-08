import type { CanonicalProduct, ProductGroup, RawOffer } from "./types";
import { computeOfferTrust, isTrustedAvailable } from "./freshness";

export const platformOptions = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Grok",
  "Google",
  "API/CDK",
  "邮箱",
  "其他",
] as const;

export const productTypeOptions = [
  "会员充值",
  "成品号",
  "共享/镜像",
  "卡密/CDK",
  "邮箱/账号",
  "API额度",
  "其他",
] as const;

export const canonicalCatalog: CanonicalProduct[] = [
  {
    id: "chatgpt-plus-month",
    slug: "chatgpt-plus-month",
    displayName: "ChatGPT Plus 月卡",
    platform: "ChatGPT",
    productType: "会员充值",
    spec: "Plus / 1个月",
    summary: "Plus 订阅、直充、卡密或官方渠道月卡。",
    aliases: ["gpt plus", "chatgpt plus", "plus 月卡", "plus 一个月"],
  },
  {
    id: "chatgpt-plus-account",
    slug: "chatgpt-plus-account",
    displayName: "ChatGPT Plus 成品号",
    platform: "ChatGPT",
    productType: "成品号",
    spec: "Plus / 成品账号",
    summary: "已带 Plus 权益的直登账号或账号资料。",
    aliases: ["plus 成品号", "plus 独享账号", "plus 账号"],
  },
  {
    id: "chatgpt-pro-5x",
    slug: "chatgpt-pro-5x",
    displayName: "ChatGPT Pro 5x",
    platform: "ChatGPT",
    productType: "会员充值",
    spec: "Pro / 5x",
    summary: "ChatGPT Pro 5x 充值、代开或卡密。",
    aliases: ["pro 5x", "pro x5", "100刀"],
  },
  {
    id: "chatgpt-pro-20x",
    slug: "chatgpt-pro-20x",
    displayName: "ChatGPT Pro 20x",
    platform: "ChatGPT",
    productType: "会员充值",
    spec: "Pro / 20x",
    summary: "ChatGPT Pro 20x 充值、代开或卡密。",
    aliases: ["pro 20x", "pro x20", "200刀"],
  },
  {
    id: "chatgpt-team-business",
    slug: "chatgpt-team-business",
    displayName: "ChatGPT Team / Business",
    platform: "ChatGPT",
    productType: "会员充值",
    spec: "Team / Business",
    summary: "Team、Business、母号、邀请或自动拉。",
    aliases: ["team", "business", "母号", "自动拉"],
  },
  {
    id: "openai-api-cdk",
    slug: "openai-api-cdk",
    displayName: "OpenAI / Codex API CDK",
    platform: "API/CDK",
    productType: "API额度",
    spec: "API 额度 / CDK",
    summary: "OpenAI、Codex、Token 或 API 额度卡密。",
    aliases: ["api cdk", "codexapi", "codex api", "token"],
  },
  {
    id: "claude-pro-month",
    slug: "claude-pro-month",
    displayName: "Claude Pro 月卡",
    platform: "Claude",
    productType: "会员充值",
    spec: "Pro / 1个月",
    summary: "Claude Pro 订阅、直充或卡密。",
    aliases: ["claude pro", "pro 尼区", "claude 月卡"],
  },
  {
    id: "claude-max-5x",
    slug: "claude-max-5x",
    displayName: "Claude Max 5x",
    platform: "Claude",
    productType: "会员充值",
    spec: "Max / 5x",
    summary: "Claude Max 5x 官方套餐、账号或代开。",
    aliases: ["claude max x5", "max 5x"],
  },
  {
    id: "claude-max-20x",
    slug: "claude-max-20x",
    displayName: "Claude Max 20x",
    platform: "Claude",
    productType: "会员充值",
    spec: "Max / 20x",
    summary: "Claude Max 20x 官方套餐、账号或代开。",
    aliases: ["claude max x20", "max 20x"],
  },
  {
    id: "claude-account",
    slug: "claude-account",
    displayName: "Claude 普号 / 兑换号",
    platform: "Claude",
    productType: "成品号",
    spec: "普通账号",
    summary: "Claude 普号、free 号、礼品卡兑换专用号。",
    aliases: ["claude free", "claude 普通账号", "claude 普号"],
  },
  {
    id: "gemini-pro-year",
    slug: "gemini-pro-year",
    displayName: "Gemini Pro 年卡",
    platform: "Gemini",
    productType: "会员充值",
    spec: "Pro / 12个月",
    summary: "Gemini Pro 12 个月成品号、CDK 或充值。",
    aliases: ["gemini pro", "gemini 一年", "gemini 12个月"],
  },
  {
    id: "gemini-ultra",
    slug: "gemini-ultra",
    displayName: "Google AI Ultra / Gemini Ultra",
    platform: "Gemini",
    productType: "会员充值",
    spec: "Ultra",
    summary: "Google AI Ultra 或 Gemini Ultra 会员。",
    aliases: ["ai ultra", "gemini ultra", "250美元"],
  },
  {
    id: "super-grok",
    slug: "super-grok",
    displayName: "Super Grok",
    platform: "Grok",
    productType: "会员充值",
    spec: "Super / 月卡",
    summary: "Super Grok 月卡、激活码或成品号。",
    aliases: ["super grok", "supergrok", "grok super"],
  },
  {
    id: "grok-account",
    slug: "grok-account",
    displayName: "Grok 普号 / 体验号",
    platform: "Grok",
    productType: "成品号",
    spec: "普通账号 / 体验",
    summary: "Grok 普号、体验卡、短期成品号。",
    aliases: ["grok 普号", "grok 体验", "直登成品"],
  },
  {
    id: "google-account",
    slug: "google-account",
    displayName: "Google / Gmail 账号",
    platform: "Google",
    productType: "邮箱/账号",
    spec: "Google 账号",
    summary: "Google 普号、Gmail 老号、美区账号。",
    aliases: ["gmail", "google 普号", "google 老号", "美区老号"],
  },
  {
    id: "email-account",
    slug: "email-account",
    displayName: "邮箱账号",
    platform: "邮箱",
    productType: "邮箱/账号",
    spec: "邮箱",
    summary: "微软邮箱、域名邮箱、短效邮箱或日抛邮箱。",
    aliases: ["outlook", "微软邮箱", "域名邮箱", "短效邮箱", "日抛"],
  },
  {
    id: "other-product",
    slug: "other-product",
    displayName: "其他商品",
    platform: "其他",
    productType: "其他",
    spec: "未归类",
    summary: "暂未匹配到标准商品，可在后台人工修正。",
    aliases: ["other"],
  },
];

const catalogById = new Map(canonicalCatalog.map((item) => [item.id, item]));

export function getCanonicalProduct(id: string): CanonicalProduct {
  return catalogById.get(id) ?? catalogById.get("other-product")!;
}

export function classifyOffer(title: string): CanonicalProduct {
  const value = normalizeTitle(title);

  if (matches(value, ["codex", "api", "cdk", "token", "额度"])) {
    return getCanonicalProduct("openai-api-cdk");
  }

  if (matches(value, ["team", "business", "母号", "自动拉"])) {
    return getCanonicalProduct("chatgpt-team-business");
  }

  if (matches(value, ["chatgpt", "gpt", "openai", "plus", "pro"])) {
    if (matches(value, ["pro20", "pro 20", "20x", "x20", "200刀"])) {
      return getCanonicalProduct("chatgpt-pro-20x");
    }

    if (matches(value, ["pro5", "pro 5", "5x", "x5", "100刀"])) {
      return getCanonicalProduct("chatgpt-pro-5x");
    }

    if (matches(value, ["plus"])) {
      if (matches(value, ["成品", "账号", "独享", "普号", "直登"])) {
        return getCanonicalProduct("chatgpt-plus-account");
      }

      return getCanonicalProduct("chatgpt-plus-month");
    }
  }

  if (matches(value, ["claude"])) {
    if (matches(value, ["max x20", "max 20", "20x", "x20"])) {
      return getCanonicalProduct("claude-max-20x");
    }

    if (matches(value, ["max x5", "max 5", "5x", "x5"])) {
      return getCanonicalProduct("claude-max-5x");
    }

    if (matches(value, ["pro", "尼区", "月卡"])) {
      return getCanonicalProduct("claude-pro-month");
    }

    return getCanonicalProduct("claude-account");
  }

  if (matches(value, ["gemini", "google ai"])) {
    if (matches(value, ["ultra", "250美元"])) {
      return getCanonicalProduct("gemini-ultra");
    }

    return getCanonicalProduct("gemini-pro-year");
  }

  if (matches(value, ["grok"])) {
    if (matches(value, ["super", "heavy", "月卡", "年卡", "激活码"])) {
      return getCanonicalProduct("super-grok");
    }

    return getCanonicalProduct("grok-account");
  }

  if (matches(value, ["gmail", "google 普号", "google 老号", "美区老号", "gcp"])) {
    return getCanonicalProduct("google-account");
  }

  if (matches(value, ["outlook", "微软邮箱", "域名邮箱", "短效邮箱", "日抛", "邮箱"])) {
    return getCanonicalProduct("email-account");
  }

  return getCanonicalProduct("other-product");
}

export function buildProductGroups(
  offers: RawOffer[],
  canonicalProducts: CanonicalProduct[] = canonicalCatalog,
): ProductGroup[] {
  const map = new Map<string, ProductGroup>();
  const canonicalMap = new Map(canonicalProducts.map((product) => [product.id, product]));

  for (const offer of offers.filter((item) => !item.hidden)) {
    const product =
      (offer.canonicalProductId && canonicalMap.get(offer.canonicalProductId)) ||
      classifyOffer(offer.sourceTitle);

    const current =
      map.get(product.id) ||
      ({
        ...product,
        offers: [],
        offerCount: 0,
        inStockCount: 0,
        lowStockCount: 0,
        outOfStockCount: 0,
        referenceCount: 0,
        staleCount: 0,
        lowestPrice: null,
        lowestPriceLabel: "暂无价格",
        lowestPriceTone: "muted",
        lowestOffer: null,
        trustedLowestPrice: null,
        trustedLowestOffer: null,
        latestSeenAt: null,
        anomalyFlags: [],
      } satisfies ProductGroup);

    current.offers.push(offer);
    map.set(product.id, current);
  }

  for (const product of map.values()) {
    product.offers.sort(compareOffers);
    product.offerCount = product.offers.length;
    product.inStockCount = product.offers.filter(
      (offer) => isTrustedAvailable(offer) && offer.status === "in_stock",
    ).length;
    product.lowStockCount = product.offers.filter(
      (offer) => isTrustedAvailable(offer) && offer.status === "low_stock",
    ).length;
    product.outOfStockCount = product.offers.filter((offer) => offer.status === "out_of_stock").length;
    product.referenceCount = product.offers.filter((offer) => {
      const trust = computeOfferTrust(offer);
      return trust.effectiveStatus === "low_confidence";
    }).length;
    product.staleCount = product.offers.filter((offer) => {
      const trust = computeOfferTrust(offer);
      return trust.effectiveStatus === "stale" || trust.freshnessStatus === "expired";
    }).length;
    const trustedLowestOffer = product.offers.find((offer) => isAvailable(offer) && hasUsablePrice(offer)) ?? null;
    const displayLowestOffer = getDisplayLowestOffer(product.offers);
    const priceMeta = getOfferPriceMeta(displayLowestOffer);

    product.trustedLowestOffer = trustedLowestOffer;
    product.trustedLowestPrice = trustedLowestOffer?.price ?? null;
    product.lowestOffer = displayLowestOffer;
    product.lowestPrice = displayLowestOffer?.price ?? null;
    product.lowestPriceLabel = priceMeta.label;
    product.lowestPriceTone = priceMeta.tone;
    product.latestSeenAt = latestDate(
      product.offers.map((offer) => offer.verifiedAt || offer.lastSeenAt || offer.capturedAt || offer.sourceUpdatedAt),
    );
    product.anomalyFlags = collectProductFlags(product);
  }

  return Array.from(map.values()).sort((a, b) => {
    const stockDelta = Number(b.inStockCount > 0) - Number(a.inStockCount > 0);
    if (stockDelta !== 0) return stockDelta;

    return (a.lowestPrice ?? Number.MAX_SAFE_INTEGER) - (b.lowestPrice ?? Number.MAX_SAFE_INTEGER);
  });
}

export function compareOffers(a: RawOffer, b: RawOffer): number {
  const trustA = computeOfferTrust(a);
  const trustB = computeOfferTrust(b);
  const availableDelta = Number(trustB.trustedForLowestPrice) - Number(trustA.trustedForLowestPrice);
  if (availableDelta !== 0) return availableDelta;

  const outOfStockDelta = Number(a.status === "out_of_stock") - Number(b.status === "out_of_stock");
  if (outOfStockDelta !== 0) return outOfStockDelta;

  const priorityDelta = trustB.sourcePriority - trustA.sourcePriority;
  if (priorityDelta !== 0) return priorityDelta;

  const priceDelta =
    (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER);
  if (priceDelta !== 0) return priceDelta;

  return (trustB.verifiedAt || "").localeCompare(trustA.verifiedAt || "");
}

export function isAvailable(offer: RawOffer): boolean {
  return isTrustedAvailable(offer);
}

export function getOfferPriceMeta(
  offer: RawOffer | null | undefined,
): { label: string; tone: ProductGroup["lowestPriceTone"] } {
  if (!offer || !hasUsablePrice(offer)) return { label: "暂无价格", tone: "muted" };

  const trust = computeOfferTrust(offer);

  if (offer.status === "out_of_stock" || trust.effectiveStatus === "unavailable") {
    return { label: "缺货价", tone: "danger" };
  }

  if (trust.trustedForLowestPrice) {
    return { label: trust.sourceStatus === "low_stock" ? "少量有货最低" : "原站确认最低", tone: "good" };
  }

  if (trust.effectiveStatus === "failed") return { label: "复核失败价", tone: "muted" };
  if (trust.effectiveStatus === "stale" || trust.freshnessStatus === "expired") {
    return { label: "历史最低", tone: "warn" };
  }
  if (trust.freshnessStatus === "aging") return { label: "需复核最低", tone: "warn" };

  return { label: "参考最低", tone: "info" };
}

function getDisplayLowestOffer(offers: RawOffer[]): RawOffer | null {
  const pricedOffers = offers.filter(hasUsablePrice);
  if (!pricedOffers.length) return null;

  return [...pricedOffers].sort((a, b) => {
    const priceDelta = (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER);
    if (priceDelta !== 0) return priceDelta;

    return compareOffers(a, b);
  })[0] ?? null;
}

function hasUsablePrice(offer: RawOffer): offer is RawOffer & { price: number } {
  return typeof offer.price === "number" && Number.isFinite(offer.price);
}

export function collectOfferFlags(offer: RawOffer): string[] {
  const flags = new Set<string>();
  const trust = computeOfferTrust(offer);

  if (offer.status === "out_of_stock") flags.add("缺货");
  if (trust.effectiveStatus === "low_confidence") flags.add("参考价");
  if (trust.effectiveStatus === "failed") flags.add("复核失败");
  if (trust.effectiveStatus === "stale" || trust.freshnessStatus === "expired") flags.add("已过期");
  if (trust.freshnessStatus === "aging") flags.add("需复核");
  if (offer.tags.some((tag) => tag.includes("无质保"))) flags.add("无质保");
  if (offer.price !== null && offer.price > 0 && offer.price < 1) flags.add("超低价");

  const seenAt = trust.verifiedAt || offer.capturedAt || offer.sourceUpdatedAt;
  if (seenAt) {
    const ageHours = (Date.now() - new Date(seenAt).getTime()) / 36e5;
    if (Number.isFinite(ageHours) && ageHours > 24) flags.add("超过24小时未更新");
  }

  return Array.from(flags);
}

function collectProductFlags(product: ProductGroup): string[] {
  const flags = new Set<string>();
  for (const offer of product.offers) {
    collectOfferFlags(offer).forEach((flag) => flags.add(flag));
  }

  if (product.lowestPrice !== null && product.lowestPrice < 1) flags.add("含异常低价");
  if (product.lowestOffer?.status === "out_of_stock") flags.add("当前最低价来自缺货报价");
  if (product.inStockCount === 0 && product.lowStockCount === 0) flags.add("暂无原站确认有货");
  if (product.referenceCount > 0) flags.add(`${product.referenceCount} 条参考价未原站确认`);
  if (product.staleCount > 0) flags.add(`${product.staleCount} 条报价已过期`);

  return Array.from(flags);
}

function latestDate(values: Array<string | null | undefined>): string | null {
  const timestamps = values
    .filter((value): value is string => Boolean(value))
    .map((value) => new Date(value).getTime())
    .filter(Number.isFinite);

  if (!timestamps.length) return null;
  return new Date(Math.max(...timestamps)).toISOString();
}

function matches(value: string, needles: string[]): boolean {
  return needles.some((needle) => value.includes(needle.toLowerCase()));
}

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[｜|/【】[\]()（）,，:：\-_/]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
