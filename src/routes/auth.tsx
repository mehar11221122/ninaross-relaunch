import { createFileRoute } from "@tanstack/react-router";

/** Owned by Next.js — admin sign-in + image override dashboard. */
function nextRedirect(path: string) {
  return Response.redirect(
    (process.env.NEXT_ORIGIN || "http://localhost:3000").replace(/\/$/, "") + path,
    307,
  );
}

export const Route = createFileRoute("/auth")({
  server: { handlers: { GET: () => nextRedirect("/auth") } },
});
