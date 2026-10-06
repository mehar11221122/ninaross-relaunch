import { createFileRoute } from "@tanstack/react-router";

/** Owned by Next.js — redirect only. */
export const Route = createFileRoute("/hair-restoration-sandy-springs")({
  server: {
    handlers: {
      GET: () =>
        Response.redirect(
          (process.env.NEXT_ORIGIN || "http://localhost:3000").replace(/\/$/, "") +
            "/hair-restoration-sandy-springs",
          307,
        ),
    },
  },
});
