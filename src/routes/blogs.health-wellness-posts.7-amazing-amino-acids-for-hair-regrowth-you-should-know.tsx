import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/blogs/health-wellness-posts/7-amazing-amino-acids-for-hair-regrowth-you-should-know",
)({
  beforeLoad: () => {
    throw redirect({ statusCode: 301, to: "/blog/$segment", params: { segment: "amino-acids-for-hair-regrowth" } });
  },
});
