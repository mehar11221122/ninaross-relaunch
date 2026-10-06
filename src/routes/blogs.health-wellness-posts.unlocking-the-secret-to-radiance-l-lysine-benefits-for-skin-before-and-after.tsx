import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/blogs/health-wellness-posts/unlocking-the-secret-to-radiance-l-lysine-benefits-for-skin-before-and-after",
)({
  beforeLoad: () => {
    throw redirect({ statusCode: 301, to: "/blog/$segment", params: { segment: "l-lysine-benefits-for-skin" } });
  },
});
