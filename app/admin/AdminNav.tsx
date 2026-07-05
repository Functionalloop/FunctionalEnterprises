"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "./login/actions";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin",             label: "Dashboard",    icon: "⬛" },
  { href: "/admin/projects",    label: "Projects",     icon: "🗂" },
  { href: "/admin/services",    label: "Services",     icon: "⚡" },
  { href: "/admin/testimonials",label: "Testimonials", icon: "💬" },
  { href: "/admin/stats",       label: "Stats",        icon: "📊" },
  { href: "/admin/process",     label: "Process",      icon: "🔄" },
  { href: "/admin/blog",        label: "Blog Posts",   icon: "✍️" },
  { href: "/admin/submissions", label: "Submissions",  icon: "📥" },
];

function NavLinks({ onNavClick }: { onNavClick?: () => void }) {
  const pathname = usePathname();
  return (
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
            onClick={onNavClick}
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
  );
}

function SidebarFooter({ onNavClick }: { onNavClick?: () => void }) {
  return (
    <div className="p-4 border-t border-border-dark flex flex-col gap-2">
      <Link
        href="/"
        target="_blank"
        onClick={onNavClick}
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
  );
}

function SidebarLogo() {
  return (
    <div className="flex items-center gap-2 px-6 py-6 border-b border-border-dark">
      <span className="w-5 h-5 bg-accent inline-block shrink-0" />
      <span className="font-display font-extrabold text-white text-xs tracking-widest uppercase">
        Functional
      </span>
      <span className="ml-auto font-body text-[9px] text-muted-darker uppercase tracking-wider bg-surface-dark px-2 py-0.5">
        Admin
      </span>
    </div>
  );
}

export default function AdminNav() {
  // L-1: Mobile drawer state
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Desktop sidebar ──────────────────────────────────────────────── */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 bg-foreground-dark border-r border-border-dark flex-col z-50">
        <SidebarLogo />
        <NavLinks />
        <SidebarFooter />
      </aside>

      {/* ── Mobile top bar ───────────────────────────────────────────────── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 bg-foreground-dark border-b border-border-dark">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-accent inline-block" />
          <span className="font-display font-extrabold text-white text-xs tracking-widest uppercase">
            Functional
          </span>
          <span className="font-body text-[9px] text-muted-darker uppercase tracking-wider bg-surface-dark px-2 py-0.5">
            Admin
          </span>
        </div>
        {/* Hamburger button */}
        <button
          id="admin-mobile-menu-btn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex flex-col justify-center items-center gap-1.5 w-8 h-8 group"
        >
          <span
            className={cn(
              "block w-5 h-px bg-muted-dark transition-all duration-200",
              open && "translate-y-[7px] rotate-45 bg-white"
            )}
          />
          <span
            className={cn(
              "block w-5 h-px bg-muted-dark transition-all duration-200",
              open && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block w-5 h-px bg-muted-dark transition-all duration-200",
              open && "-translate-y-[7px] -rotate-45 bg-white"
            )}
          />
        </button>
      </div>

      {/* ── Mobile drawer overlay ────────────────────────────────────────── */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile drawer panel ──────────────────────────────────────────── */}
      <aside
        className={cn(
          "md:hidden fixed top-0 left-0 h-full w-72 bg-foreground-dark border-r border-border-dark flex flex-col z-50",
          "transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        aria-hidden={!open}
      >
        <SidebarLogo />
        <NavLinks onNavClick={() => setOpen(false)} />
        <SidebarFooter onNavClick={() => setOpen(false)} />
      </aside>

      {/* Push content down on mobile to clear the top bar */}
      <div className="md:hidden h-[60px]" />
    </>
  );
}
