import { getAdminPassword } from "@/lib/env";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { password?: string } | null;

  if (!body?.password || body.password !== getAdminPassword()) {
    return Response.json({ ok: false, message: "后台密码不正确。" }, { status: 401 });
  }

  return Response.json({ ok: true });
}
