import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/blogs/hair-loss/hair-loss-and-potassium-deficiency-what-s-the-relationship",
)({
  beforeLoad: () => {
    throw redirect({ statusCode: 301, to: "/blog/$segment", params: { segment: "hair-loss-and-potassium-deficiency" } });
  },
});
