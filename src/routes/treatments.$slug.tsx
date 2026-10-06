import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/treatments/$slug")({
  server: {
    handlers: {
      GET: ({ params }) =>
        Response.redirect(
          (process.env.NEXT_ORIGIN || "http://localhost:3000").replace(/\/$/, "") +
            `/treatments/${params.slug}`,
          307,
        ),
    },
  },
});
