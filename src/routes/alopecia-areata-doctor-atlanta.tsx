import { createFileRoute } from "@tanstack/react-router";

/** Owned by Next.js — redirect only. */
export const Route = createFileRoute("/alopecia-areata-doctor-atlanta")({
  server: {
    handlers: {
      GET: () =>
        Response.redirect(
          (process.env.NEXT_ORIGIN || "http://localhost:3000").replace(/\/$/, "") +
            "/alopecia-areata-doctor-atlanta",
          307,
        ),
    },
  },
});
