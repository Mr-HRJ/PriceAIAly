import type { EffectiveOfferStatus, FreshnessStatus, RawOffer } from "./types";

const MINUTE = 60_000;

type TrustProfile = {
  priority: number;
  confidence: number;
  freshMinutes: number;
  agingMinutes: number;
  staleMinutes: number;
};

export type OfferTrust = {
  sourceStatus: RawOffer["status"];
  effectiveStatus: EffectiveOfferStatus;
  freshnessStatus: FreshnessStatus;
  verifiedAt: string | null;
  expiresAt: string | null;
  sourcePriority: number;
  confidence: number;
  trustedForLowestPrice: boolean;
  label: string;
};

export function computeOfferTrust(offer: RawOffer, now = Date.now()): OfferTrust {
  const profile = getTrustProfile(offer);
  const verifiedAt = offer.verifiedAt || offer.lastSeenAt || offer.capturedAt || offer.sourceUpdatedAt || null;
  const verifiedTime = verifiedAt ? new Date(verifiedAt).getTime() : NaN;
  const fallbackExpiresAt = Number.isFinite(verifiedTime)
    ? new Date(verifiedTime + profile.staleMinutes * MINUTE).toISOString()
    : null;
  const expiresAt = offer.expiresAt || fallbackExpiresAt;
  const explicitEffective = offer.effectiveStatus || null;
  const storedFreshness = offer.freshnessStatus || null;

  if (storedFreshness === "failed" || isLatestFailure(offer, verifiedTime)) {
    return {
      sourceStatus: offer.status,
      effectiveStatus: "failed",
      freshnessStatus: "failed",
      verifiedAt,
      expiresAt,
      sourcePriority: profile.priority,
      confidence: profile.confidence,
      trustedForLowestPrice: false,
      label: "复核失败",
    };
  }

  if (offer.status === "out_of_stock") {
    return {
      sourceStatus: offer.status,
      effectiveStatus: "unavailable",
      freshnessStatus: freshnessFromAge(verifiedTime, now, profile),
      verifiedAt,
      expiresAt,
      sourcePriority: profile.priority,
      confidence: profile.confidence,
      trustedForLowestPrice: false,
      label: "缺货",
    };
  }

  const freshnessStatus = freshnessFromAge(verifiedTime, now, profile);
  const sourceCanConfirm = profile.priority >= 70;
  const sourceSaysAvailable = offer.status === "in_stock" || offer.status === "low_stock";
  let effectiveStatus: EffectiveOfferStatus = explicitEffective || "low_confidence";

  if (freshnessStatus === "expired" || freshnessStatus === "stale") {
    effectiveStatus = "stale";
  } else if (!sourceSaysAvailable) {
    effectiveStatus = "low_confidence";
  } else if (sourceCanConfirm && freshnessStatus === "fresh") {
    effectiveStatus = "available";
  } else {
    effectiveStatus = "low_confidence";
  }

  const trustedForLowestPrice =
    effectiveStatus === "available" &&
    sourceSaysAvailable &&
    sourceCanConfirm &&
    freshnessStatus === "fresh";

  return {
    sourceStatus: offer.status,
    effectiveStatus,
    freshnessStatus,
    verifiedAt,
    expiresAt,
    sourcePriority: profile.priority,
    confidence: profile.confidence,
    trustedForLowestPrice,
    label: labelForTrust(effectiveStatus, freshnessStatus, offer.status),
  };
}

export function isTrustedAvailable(offer: RawOffer): boolean {
  return computeOfferTrust(offer).trustedForLowestPrice;
}

export function freshnessFields(input: {
  method: "aibijia_json" | "browser" | "http" | "manual";
  status: RawOffer["status"];
  verifiedAt: string;
}) {
  const priorityByMethod = {
    manual: 95,
    browser: 90,
    http: 85,
    aibijia_json: 40,
  } satisfies Record<string, number>;
  const confidenceByMethod = {
    manual: 0.95,
    browser: 0.9,
    http: 0.85,
    aibijia_json: 0.55,
  } satisfies Record<string, number>;
  const staleMinutesByMethod = {
    manual: 240,
    browser: 240,
    http: 240,
    aibijia_json: 30,
  } satisfies Record<string, number>;

  const sourcePriority = priorityByMethod[input.method];
  const freshnessStatus: FreshnessStatus = "fresh";
  const effectiveStatus: EffectiveOfferStatus =
    input.status === "out_of_stock"
      ? "unavailable"
      : sourcePriority >= 70
        ? "available"
        : "low_confidence";

  return {
    source_status: input.status,
    effective_status: effectiveStatus,
    freshness_status: freshnessStatus,
    verified_at: input.verifiedAt,
    expires_at: new Date(
      new Date(input.verifiedAt).getTime() + staleMinutesByMethod[input.method] * MINUTE,
    ).toISOString(),
    source_priority: sourcePriority,
    confidence: confidenceByMethod[input.method],
  };
}

function getTrustProfile(offer: RawOffer): TrustProfile {
  const priority = offer.sourcePriority ?? inferPriority(offer);
  const isAggregate = priority < 70;

  return {
    priority,
    confidence: offer.confidence ?? (isAggregate ? 0.55 : 0.9),
    freshMinutes: isAggregate ? 10 : 90,
    agingMinutes: isAggregate ? 30 : 150,
    staleMinutes: isAggregate ? 120 : 240,
  };
}

function inferPriority(offer: RawOffer): number {
  const text = `${offer.sourceId || ""} ${offer.sourceName || ""}`.toLowerCase();
  if (text.includes("aibijia")) return 40;
  return 90;
}

function freshnessFromAge(
  verifiedTime: number,
  now: number,
  profile: TrustProfile,
): FreshnessStatus {
  if (!Number.isFinite(verifiedTime)) return "expired";

  const ageMinutes = (now - verifiedTime) / MINUTE;
  if (ageMinutes <= profile.freshMinutes) return "fresh";
  if (ageMinutes <= profile.agingMinutes) return "aging";
  if (ageMinutes <= profile.staleMinutes) return "stale";
  return "expired";
}

function isLatestFailure(offer: RawOffer, verifiedTime: number): boolean {
  if (!offer.lastFailedAt) return false;
  const failedTime = new Date(offer.lastFailedAt).getTime();
  return Number.isFinite(failedTime) && (!Number.isFinite(verifiedTime) || failedTime >= verifiedTime);
}

function labelForTrust(
  effectiveStatus: EffectiveOfferStatus,
  freshnessStatus: FreshnessStatus,
  sourceStatus: RawOffer["status"],
): string {
  if (effectiveStatus === "available") return sourceStatus === "low_stock" ? "少量有货" : "原站确认";
  if (effectiveStatus === "unavailable") return "缺货";
  if (effectiveStatus === "failed") return "复核失败";
  if (freshnessStatus === "aging") return "需复核";
  if (freshnessStatus === "stale" || freshnessStatus === "expired") return "已过期";
  return "参考价";
}
