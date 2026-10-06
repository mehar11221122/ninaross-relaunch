import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/blogs/hair-loss/things-to-do-before-you-google-trichologist-near-me",
)({
  beforeLoad: () => {
    throw redirect({ statusCode: 301, to: "/blog/$segment", params: { segment: "choosing-a-trichologist-near-me" } });
  },
});
