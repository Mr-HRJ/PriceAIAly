import { getAdminPasswordFromRequest, upsertSource } from "@/lib/admin";
import { requireAdminPassword } from "@/lib/env";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  entryUrl: z.string().url(),
  baseUrl: z.string().url().nullable().optional(),
  collectionMethod: z.enum(["aibijia_json", "browser", "http", "manual"]).default("manual"),
  enabled: z.boolean().default(true),
  notes: z.string().nullable().optional(),
});

export async function POST(request: Request) {
  try {
    requireAdminPassword(getAdminPasswordFromRequest(request));
    const payload = schema.parse(await request.json());
    const source = await upsertSource(payload);

    return Response.json({ ok: true, source });
  } catch (error) {
    return Response.json(
      { ok: false, message: error instanceof Error ? error.message : "保存来源失败。" },
      { status: error instanceof z.ZodError ? 400 : 500 },
    );
  }
}
