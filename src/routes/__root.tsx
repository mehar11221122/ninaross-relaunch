import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";
import { BookingLightbox } from "@/components/site/BookingLightbox";
import { SocialProofBar } from "@/components/trust/SocialProofBar";
import { TrustFooter } from "@/components/trust/TrustFooter";
import { supabase } from "@/integrations/supabase/client";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nina Ross Hair Therapy | Atlanta Hair Restoration" },
      {
        name: "description",
        content:
          "Expert-led, whole-body hair restoration for textured hair in Atlanta. Double Board Certified trichology, scalp imaging, lab-guided care and personalized programs. Book the $99 Hair & Body Discovery.",
      },
      { name: "author", content: "Nina Ross Hair Therapy" },
      { property: "og:title", content: "Nina Ross Hair Therapy | Atlanta Hair Restoration" },
      {
        property: "og:description",
        content:
          "Expert-led, whole-body hair restoration for textured hair in Atlanta. Double Board Certified trichology, scalp imaging, lab-guided care and personalized programs. Book the $99 Hair & Body Discovery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Nina Ross Hair Therapy | Atlanta Hair Restoration" },
      { name: "twitter:description", content: "Expert-led, whole-body hair restoration for textured hair in Atlanta. Double Board Certified trichology, scalp imaging, lab-guided care and personalized programs. Book the $99 Hair & Body Discovery." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "stylesheet", href: "/shared/site-chrome.css?v=1" },
      { rel: "icon", href: "/favicon.svg?v=2", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/favicon.svg?v=2" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600&display=swap",
      },
    ],
    scripts: [{ src: "/shared/site-chrome.js?v=1", defer: true }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent as any,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const hasDedicatedPageChrome =
    pathname === "/about" ||
    pathname === "/about/" ||
    pathname === "/trichology" ||
    pathname === "/trichology/" ||
    pathname === "/videos" ||
    pathname === "/videos/" ||
    pathname === "/concerns" ||
    pathname === "/concerns/" ||
    pathname.startsWith("/concerns/") ||
    pathname === "/treatments" ||
    pathname === "/treatments/" ||
    pathname.startsWith("/treatments/") ||
    pathname === "/blog" ||
    pathname === "/blog/" ||
    /^\/blog\/[^/]+\/?$/.test(pathname);

  // Highlight the current page in the global header after client navigation.
  useEffect(() => {
    (window as unknown as { __gcMark?: () => void }).__gcMark?.();
  }, [pathname]);

  // Keep routes and cached data in sync with sign-in / sign-out transitions.
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => subscription.unsubscribe();
  }, [router, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      {hasDedicatedPageChrome ? null : <SocialProofBar />}
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      {hasDedicatedPageChrome ? null : <TrustFooter />}
      <BookingLightbox />
      <Toaster richColors position="bottom-right" />
    </QueryClientProvider>
  );
}
