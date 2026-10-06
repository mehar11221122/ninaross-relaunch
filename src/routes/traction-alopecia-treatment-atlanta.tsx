import { createFileRoute } from "@tanstack/react-router";

/** Owned by Next.js — redirect only. */
export const Route = createFileRoute("/traction-alopecia-treatment-atlanta")({
  server: {
    handlers: {
      GET: () =>
        Response.redirect(
          (process.env.NEXT_ORIGIN || "http://localhost:3000").replace(/\/$/, "") +
            "/traction-alopecia-treatment-atlanta",
          307,
        ),
    },
  },
});
