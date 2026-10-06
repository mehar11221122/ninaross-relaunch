import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/blogs/hair-loss/how-to-stop-alopecia-areata-from-spreading")({
  beforeLoad: () => {
    throw redirect({ statusCode: 301, to: "/blog/$segment", params: { segment: "how-to-stop-alopecia-areata-from-spreading" } });
  },
});
