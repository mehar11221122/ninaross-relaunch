import { createFileRoute } from "@tanstack/react-router";

/**
 * Homepage `/` is owned by the Next.js app.
 * This legacy route only redirects so there is a single implementation.
 */
export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: () =>
        Response.redirect(
          (process.env.NEXT_ORIGIN || "http://localhost:3000").replace(/\/$/, "") + "/",
          307,
        ),
    },
  },
});
