import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Skip the reset on the first client render: on heavy pages it fires late,
    // after the reader has started scrolling, and yanks them back to the top.
    scrollRestoration: (() => {
      let first = true;
      return () => {
        if (typeof window !== "undefined" && first) {
          first = false;
          return false;
        }
        return true;
      };
    })(),
    defaultPreloadStaleTime: 0,
  });

  return router;
};
