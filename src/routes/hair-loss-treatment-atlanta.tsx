import { createFileRoute } from "@tanstack/react-router";

/**
 * `/hair-loss-treatment-atlanta` is owned by the Next.js app.
 * This legacy route only redirects so there is a single implementation.
 */
export const Route = createFileRoute("/hair-loss-treatment-atlanta")({
  server: {
    handlers: {
      GET: () =>
        Response.redirect(
          (process.env.NEXT_ORIGIN || "http://localhost:3000").replace(/\/$/, "") +
            "/hair-loss-treatment-atlanta",
          307,
        ),
    },
  },
});
