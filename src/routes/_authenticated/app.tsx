import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

const TITLE = "Dashboard — Flight Price Notifier";
const DESCRIPTION = "你的航線追蹤儀表板 — Flight Price Notifier。";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AppDashboard,
});

function AppDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/signin", replace: true });
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-primary/15 text-primary">
              <Plane className="size-4" />
            </span>
            <span className="text-sm font-semibold tracking-tight">
              Flight Price Notifier
            </span>
          </Link>
          <Button variant="secondary" onClick={handleSignOut}>
            Sign out / 登出
          </Button>
        </div>
      </header>

      <main
        className="px-5 py-20"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-semibold tracking-tight">
            Hi {user?.email ?? "…"}
          </h1>
          <div className="surface-card mt-8 p-8">
            <p className="text-base">
              你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Your dashboard is coming soon. Route-subscription will be added in
              the next milestone.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
