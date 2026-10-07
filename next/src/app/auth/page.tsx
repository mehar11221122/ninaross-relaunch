import { AuthAdminClient } from "@/components/admin/AuthAdminClient";

export const dynamic = "force-dynamic";

/** Hidden admin sign-in + image override dashboard (noindex via layout). */
export default function AuthPage() {
  return <AuthAdminClient />;
}
