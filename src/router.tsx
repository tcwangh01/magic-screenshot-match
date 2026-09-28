import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  createBrowserRouter,
  isRouteErrorResponse,
  Link,
  Outlet,
  redirect,
  useRouteError,
} from "react-router";

import { Toaster } from "./components/ui/sonner";
import { supabase } from "./integrations/supabase/client";
import { reportLovableError } from "./lib/lovable-error-reporting";
import { AppDashboard } from "./pages/app";
import { Landing } from "./pages/landing";
import { SignIn } from "./pages/signin";
import { SignUp } from "./pages/signup";

const queryClient = new QueryClient();

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function RootError() {
  const error = useRouteError();
  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "react_router_root_error_element" });
  }, [error]);

  if (isRouteErrorResponse(error) && error.status === 404) return <NotFound />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

// Guard for authenticated routes: validates the session with Supabase before render.
async function requireUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw redirect("/signin");
  return { user: data.user };
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RootError />,
    hydrateFallbackElement: <></>,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      {
        loader: requireUser,
        children: [{ path: "/app", element: <AppDashboard /> }],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
