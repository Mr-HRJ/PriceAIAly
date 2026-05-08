import { getAdminPasswordFromRequest } from "@/lib/admin";
import { importAibijiaProducts } from "@/lib/aibijia";
import { requireAdminPassword } from "@/lib/env";

export async function POST(request: Request) {
  try {
    requireAdminPassword(getAdminPasswordFromRequest(request));
    const result = await importAibijiaProducts();

    return Response.json({ ok: true, result });
  } catch (error) {
    console.error("Aibijia import failed:", error);
    return Response.json(
      { ok: false, message: errorMessage(error) },
      { status: 500 },
    );
  }
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message?: unknown }).message || "导入失败。");
  }

  return "导入失败。";
}
