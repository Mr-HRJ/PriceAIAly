import { z } from "zod";
import { createSubmission } from "@/lib/admin";

const schema = z.object({
  url: z.string().url().max(2048),
  name: z.string().trim().max(200).optional().nullable(),
  contact: z.string().trim().max(200).optional().nullable(),
  notes: z.string().trim().max(500).optional().nullable(),
  website: z.string().max(200).optional().nullable(),
});

function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip");
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = schema.parse(json);

    if (payload.website) {
      return Response.json({ ok: true });
    }

    const result = await createSubmission({
      url: payload.url,
      name: payload.name ?? null,
      contact: payload.contact ?? null,
      notes: payload.notes ?? null,
      honeypot: null,
      submitterIp: getClientIp(request),
    });

    if ("ignored" in result) {
      return Response.json({ ok: true });
    }
    return Response.json({ ok: true, id: result.id });
  } catch (error) {
    return Response.json(
      { ok: false, message: error instanceof Error ? error.message : "提交失败。" },
      { status: error instanceof z.ZodError ? 400 : 500 },
    );
  }
}
