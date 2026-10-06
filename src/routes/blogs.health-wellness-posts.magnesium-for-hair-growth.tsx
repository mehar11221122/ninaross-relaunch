import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/blogs/health-wellness-posts/magnesium-for-hair-growth")({
  beforeLoad: () => {
    throw redirect({ statusCode: 301, to: "/blog/$segment", params: { segment: "magnesium-for-hair-growth" } });
  },
});
