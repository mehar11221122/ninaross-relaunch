import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/blogs/hair-loss/hair-loss-epidemic-among-black-women")({
  beforeLoad: () => {
    throw redirect({ statusCode: 301, to: "/blog/$segment", params: { segment: "hair-loss-epidemic-among-black-women" } });
  },
});
