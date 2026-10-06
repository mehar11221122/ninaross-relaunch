import { createFileRoute } from "@tanstack/react-router";

/**
 * `/landing` was a noindex mirror of the homepage HTML.
 * Homepage content now lives in Next (`next/content/home`); redirect so
 * Vite no longer needs the removed `public/landing/index.html` import.
 */
export const Route = createFileRoute("/landing")({
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
