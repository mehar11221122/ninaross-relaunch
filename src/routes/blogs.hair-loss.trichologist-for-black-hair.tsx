import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/blogs/hair-loss/trichologist-for-black-hair")({
  beforeLoad: () => {
    throw redirect({ statusCode: 301, to: "/blog/$segment", params: { segment: "trichologist-for-black-hair" } });
  },
});
