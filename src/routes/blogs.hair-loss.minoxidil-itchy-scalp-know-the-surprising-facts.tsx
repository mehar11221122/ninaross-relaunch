import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/blogs/hair-loss/minoxidil-itchy-scalp-know-the-surprising-facts",
)({
  beforeLoad: () => {
    throw redirect({ statusCode: 301, to: "/blog/$segment", params: { segment: "minoxidil-itchy-scalp" } });
  },
});
