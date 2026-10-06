import { createFileRoute } from "@tanstack/react-router";

function nextRedirect(path: string) {
  return Response.redirect(
    (process.env.NEXT_ORIGIN || "http://localhost:3000").replace(/\/$/, "") + path,
    307,
  );
}

export const Route = createFileRoute("/landing-2")({
  server: { handlers: { GET: () => nextRedirect("/landing-2") } },
});
