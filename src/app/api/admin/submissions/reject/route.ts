import { z } from "zod";
import { getAdminPasswordFromRequest, rejectSubmission } from "@/lib/admin";
import { requireAdminPassword } from "@/lib/env";

const schema = z.object({
  id: z.string().min(1),
  reviewerNote: z.string().trim().max(500).optional().nullable(),
});

export async function POST(request: Request) {
  try {
    requireAdminPassword(getAdminPasswordFromRequest(request));
    const payload = schema.parse(await request.json());
    const submission = await rejectSubmission(payload.id, payload.reviewerNote ?? null);
    return Response.json({ ok: true, submission });
  } catch (error) {
    return Response.json(
      { ok: false, message: error instanceof Error ? error.message : "操作失败。" },
      { status: error instanceof z.ZodError ? 400 : 500 },
    );
  }
}
