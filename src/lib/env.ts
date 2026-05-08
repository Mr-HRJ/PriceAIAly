import "server-only";

export function getAdminPassword(): string {
  const pwd = process.env.ADMIN_PASSWORD;
  if (!pwd) {
    throw new Error(
      "ADMIN_PASSWORD is not configured. Set it in .env.local for local dev or in your deployment environment.",
    );
  }
  return pwd;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export function requireAdminPassword(value: string | null): void {
  if (!value || value !== getAdminPassword()) {
    throw new Error("未授权，请检查后台密码。");
  }
}
