import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Sign In | Nina Ross",
  description: "Sign in to manage the site's images.",
  robots: { index: false, follow: false, nocache: true },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
