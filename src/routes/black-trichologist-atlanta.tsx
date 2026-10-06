import { createFileRoute } from "@tanstack/react-router";

/**
 * `/black-trichologist-atlanta` is owned by the Next.js app.
 * This legacy route only redirects so there is a single implementation.
 */
export const Route = createFileRoute("/black-trichologist-atlanta")({
  server: {
    handlers: {
      GET: () =>
        Response.redirect(
          (process.env.NEXT_ORIGIN || "http://localhost:3000").replace(/\/$/, "") +
            "/black-trichologist-atlanta",
          307,
        ),
    },
  },
});
