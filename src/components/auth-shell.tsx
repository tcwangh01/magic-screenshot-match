import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Plane } from "lucide-react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-5 py-16"
      style={{ backgroundImage: "var(--gradient-hero)" }}
    >
      <Link to="/" className="flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-lg bg-primary/15 text-primary">
          <Plane className="size-4" />
        </span>
        <span className="text-sm font-semibold tracking-tight">
          Flight Price Notifier
        </span>
      </Link>

      <div className="surface-card mt-8 w-full max-w-sm p-7">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </div>

      <div className="mt-6 text-sm text-muted-foreground">{footer}</div>
    </div>
  );
}
