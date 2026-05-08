import { z } from "zod";
import { approveSubmission, getAdminPasswordFromRequest } from "@/lib/admin";
import { requireAdminPassword } from "@/lib/env";

const schema = z.object({
  id: z.string().min(1),
  name: z.string().trim().max(200).optional().nullable(),
  collectionMethod: z.enum(["aibijia_json", "browser", "http", "manual"]).optional(),
});

export async function POST(request: Request) {
  try {
    requireAdminPassword(getAdminPasswordFromRequest(request));
    const payload = schema.parse(await request.json());
    const result = await approveSubmission(payload.id, {
      name: payload.name ?? null,
      collectionMethod: payload.collectionMethod,
    });
    return Response.json({ ok: true, ...result });
  } catch (error) {
    return Response.json(
      { ok: false, message: error instanceof Error ? error.message : "审核失败。" },
      { status: error instanceof z.ZodError ? 400 : 500 },
    );
  }
}
