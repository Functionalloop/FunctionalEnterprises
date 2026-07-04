"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "./login/actions";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "⬛" },
  { href: "/admin/projects", label: "Projects", icon: "🗂" },
  { href: "/admin/services", label: "Services", icon: "⚡" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "💬" },
  { href: "/admin/stats", label: "Stats", icon: "📊" },
  { href: "/admin/process", label: "Process", icon: "🔄" },
  { href: "/admin/blog", label: "Blog Posts", icon: "✍️" },
  { href: "/admin/submissions", label: "Submissions", icon: "📥" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 bg-foreground-dark border-r border-border-dark flex-col z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-6 border-b border-border-dark">
        <span className="w-5 h-5 bg-accent inline-block shrink-0" />
        <span className="font-display font-extrabold text-white text-xs tracking-widest uppercase">
          Functional
        </span>
        <span className="ml-auto font-body text-[9px] text-muted-darker uppercase tracking-wider bg-surface-dark px-2 py-0.5">
          Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-6 py-3 font-body text-xs tracking-wide transition-colors duration-150",
                isActive
                  ? "text-accent bg-accent/5 border-r-2 border-accent"
                  : "text-muted-dark hover:text-white hover:bg-white/5"
              )}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer: logout + link to site */}
      <div className="p-4 border-t border-border-dark flex flex-col gap-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 font-body text-xs text-muted-darker hover:text-muted-dark transition-colors"
        >
          <span>↗</span> View site
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="w-full text-left flex items-center gap-2 px-3 py-2 font-body text-xs text-muted-darker hover:text-red-400 transition-colors"
          >
            <span>→</span> Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}

