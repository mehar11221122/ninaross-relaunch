import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/blogs/hair-loss/stop-hair-loss-with-dht-blockers")({
  beforeLoad: () => {
    throw redirect({ statusCode: 301, to: "/blog/$segment", params: { segment: "stop-hair-loss-with-dht-blockers" } });
  },
});
