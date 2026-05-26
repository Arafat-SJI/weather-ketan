import { Link, useLocation } from "@tanstack/react-router";
import { Wind, Activity, BarChart3, Bell, BookOpen, Users, Settings, Map } from "lucide-react";

const nav = [
  { to: "/", label: "Dashboard", icon: Activity },
  { to: "/map", label: "Map", icon: Map },
  { to: "/history", label: "History", icon: BarChart3 },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/learn", label: "Learn", icon: BookOpen },
  { to: "/community", label: "Community", icon: Users },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function SiteHeader() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
            <Wind className="h-5 w-5 text-primary" aria-hidden />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Atmos<span className="text-primary">.</span>
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map(({ to, label, icon: Icon }) => {
              const active = pathname === to;
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                      active
                        ? "bg-surface text-foreground"
                        : "text-muted-foreground hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="text-xs text-muted-foreground hidden sm:block">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[color:var(--aqi-good)] animate-pulse" />
            Live data
          </span>
        </div>
      </div>
      <nav aria-label="Mobile" className="md:hidden border-t border-border/60">
        <ul className="flex justify-around px-2 py-1">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <li key={to}>
                <Link to={to} className={`flex flex-col items-center gap-0.5 rounded-md px-2 py-1.5 text-[10px] ${active ? "text-primary" : "text-muted-foreground"}`}>
                  <Icon className="h-4 w-4" aria-hidden />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
