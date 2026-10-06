import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/blogs/hair-loss/traction-alopecia-when-is-it-too-late",
)({
  beforeLoad: () => {
    throw redirect({ statusCode: 301, to: "/blog/$segment", params: { segment: "traction-alopecia-reversibility" } });
  },
});
