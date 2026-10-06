import { createFileRoute } from "@tanstack/react-router";

/** Owned by Next.js — redirect only. */
export const Route = createFileRoute("/prp-hair-treatment-atlanta")({
  server: {
    handlers: {
      GET: () =>
        Response.redirect(
          (process.env.NEXT_ORIGIN || "http://localhost:3000").replace(/\/$/, "") +
            "/prp-hair-treatment-atlanta",
          307,
        ),
    },
  },
});
