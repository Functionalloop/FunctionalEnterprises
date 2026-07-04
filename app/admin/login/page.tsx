import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login — Functional Enterprises",
  robots: { index: false, follow: false },
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>;
}) {
  return (
    <main className="min-h-screen bg-foreground-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12">
          <span className="w-6 h-6 bg-accent inline-block" />
          <span className="font-display font-extrabold text-white text-sm tracking-widest uppercase">
            Functional
          </span>
        </div>

        <h1 className="font-display font-bold text-white text-3xl tracking-tight mb-2">
          Admin Access
        </h1>
        <p className="font-body text-muted-dark text-sm mb-10">
          Enter your admin password to continue.
        </p>

        <LoginForm />
      </div>
    </main>
  );
}

// ── Client form component (keeps page server-renderable) ──────────────────────
import LoginForm from "./LoginForm";

