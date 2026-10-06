import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/concerns/$slug")({
  server: {
    handlers: {
      GET: ({ params }) =>
        Response.redirect(
          (process.env.NEXT_ORIGIN || "http://localhost:3000").replace(/\/$/, "") +
            `/concerns/${params.slug}`,
          307,
        ),
    },
  },
});
