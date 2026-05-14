import { PriceExplorer } from "@/components/PriceExplorer";
import type { ExplorerInitialState } from "@/components/PriceExplorer";
import { SubmissionFloater } from "@/components/SubmissionFloater";
import { platformOptions, productTypeOptions } from "@/lib/catalog";
import { getDashboardData } from "@/lib/data";

export const dynamic = "force-dynamic";

type PageSearchParams = Record<string, string | string[] | undefined>;

const stockOptions = ["all", "available", "out_of_stock"];
const sortOptions = ["available_price", "price", "updated", "channels"];
const viewOptions = ["cards", "table"];
const scopeOptions = ["products", "offers"];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<PageSearchParams>;
}) {
  const initialState = parseExplorerInitialState(await searchParams);
  const data = await getDashboardData();

  return (
    <>
      <PriceExplorer data={data} initialState={initialState} />
      <SubmissionFloater />
    </>
  );
}

function parseExplorerInitialState(searchParams: PageSearchParams): ExplorerInitialState {
  return {
    query: firstParam(searchParams.q),
    platform: pickParam(firstParam(searchParams.platform), ["全部", ...platformOptions], "全部"),
    productType: pickParam(firstParam(searchParams.type), ["全部", ...productTypeOptions], "全部"),
    stock: pickParam(firstParam(searchParams.stock), stockOptions, "all"),
    sort: pickParam(firstParam(searchParams.sort), sortOptions, "available_price") as ExplorerInitialState["sort"],
    minPrice: numericParam(firstParam(searchParams.min)),
    maxPrice: numericParam(firstParam(searchParams.max)),
    viewMode: pickParam(firstParam(searchParams.view), viewOptions, "table") as ExplorerInitialState["viewMode"],
    scopeMode: pickParam(firstParam(searchParams.scope), scopeOptions, "products") as ExplorerInitialState["scopeMode"],
  };
}

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function pickParam<T extends string>(value: string | undefined, options: readonly T[], fallback: T): T {
  if (!value) return fallback;
  return options.includes(value as T) ? (value as T) : fallback;
}

function numericParam(value: string | undefined): string {
  if (!value) return "";
  const normalized = value.trim();
  if (!normalized || Number.isNaN(Number(normalized))) return "";
  return Number(normalized) >= 0 ? normalized : "";
}
