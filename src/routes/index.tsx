import { createFileRoute, Link } from "@tanstack/react-router";
import { Plane, BellRing, CalendarX2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useReveal } from "@/hooks/use-reveal";

const TITLE = "Flight Price Notifier — 機票降價通知";
const DESCRIPTION =
  "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  {
    icon: Plane,
    title: "盯緊熱門航線",
    subtitle: "Always-on route watching",
    body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: BellRing,
    title: "達標自動通知",
    subtitle: "Target-price email alerts",
    body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: CalendarX2,
    title: "隨時取消",
    subtitle: "Cancel anytime",
    body: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

function Landing() {
  useReveal();
  const { session, loading } = useAuth();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-primary/15 text-primary">
              <Plane className="size-4" />
            </span>
            <span className="text-sm font-semibold tracking-tight">
              Flight Price Notifier
            </span>
          </Link>

          {loading ? (
            <div className="h-9 w-28 animate-pulse rounded-md bg-muted" />
          ) : session ? (
            <Button asChild>
              <Link to="/app">前往儀表板 / Dashboard</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link to="/signin">Sign in / 登入</Link>
            </Button>
          )}
        </div>
      </header>

      <main>
        <section
          className="relative overflow-hidden px-5 py-24 sm:py-32"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="reveal inline-flex items-center rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
              台北出發 · 東京 / 首爾 熱門航線
            </p>
            <h1 className="reveal mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
              <span className="text-gradient-brand">Flight Price Notifier</span>
            </h1>
            <p className="reveal mt-6 text-xl font-medium sm:text-2xl">
              設定航線與目標價，機票降價就通知你
            </p>
            <p className="reveal mt-3 text-base text-muted-foreground">
              Set a route and a target price — we email you when the fare drops.
            </p>
            <div className="reveal mt-10 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                style={{ boxShadow: "var(--shadow-glow)" }}
              >
                <Link to="/signup">免費開始 / Get started</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/signin">Sign in / 登入</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="px-5 pb-28">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <article
                key={feature.title}
                className="reveal surface-card p-7 transition-colors hover:border-primary/40"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-primary/15 text-primary">
                  <feature.icon className="size-5" />
                </span>
                <h2 className="mt-5 text-lg font-semibold tracking-tight">
                  {feature.title}
                </h2>
                <p className="text-sm text-primary/80">{feature.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {feature.body}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 px-5 py-10">
        <p className="mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          © 2026 Flight Price Notifier
        </p>
      </footer>
    </div>
  );
}
