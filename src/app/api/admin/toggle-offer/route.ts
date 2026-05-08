import { getAdminPasswordFromRequest } from "@/lib/admin";
import { requireAdminPassword } from "@/lib/env";
import { getSupabaseServerClient } from "@/lib/supabase";
import { z } from "zod";

const schema = z.object({
  id: z.string().min(1),
  hidden: z.boolean(),
});

export async function POST(request: Request) {
  try {
    requireAdminPassword(getAdminPasswordFromRequest(request));

    const supabase = getSupabaseServerClient();
    if (!supabase) throw new Error("Supabase 尚未配置，无法更新报价。");

    const payload = schema.parse(await request.json());
    const { error } = await supabase
      .from("raw_offers")
      .update({ hidden: payload.hidden, updated_at: new Date().toISOString() })
      .eq("id", payload.id);

    if (error) throw error;

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { ok: false, message: error instanceof Error ? error.message : "更新失败。" },
      { status: error instanceof z.ZodError ? 400 : 500 },
    );
  }
}
