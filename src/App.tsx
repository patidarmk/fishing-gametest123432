import * as React from "react";
import {
  createRouter,
  RouterProvider,
  createRootRoute,
  createRoute as createTanStackRoute,
  Outlet,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import LeaderboardDetail from "./pages/LeaderboardDetail";
import About from "./pages/About";
import Layout from "@/components/Layout";

const queryClient = new QueryClient();

// Create root route wrapped with Layout for consistent header/footer.
// IMPORTANT: render <Outlet /> inside Layout so child routes mount.
const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Layout>
          {/* Outlet renders the matched child page (Index, Game, Leaderboard, etc.) */}
          <Outlet />
        </Layout>
      </TooltipProvider>
    </QueryClientProvider>
  ),
});

// Create routes
const indexRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
});

const gameRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: "/game",
  component: Game,
});

const leaderboardRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: "/leaderboard",
  component: Leaderboard,
});

const leaderboardDetailRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: "/leaderboard/$id",
  component: LeaderboardDetail,
});

const aboutRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  gameRoute,
  leaderboardRoute,
  leaderboardDetailRoute,
  aboutRoute,
]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent" as const,
  defaultPreloadStaleTime: 0,
});

// Register router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => <RouterProvider router={router} />;

export default App;