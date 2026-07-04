"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/login/actions";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="font-body text-[10px] text-muted-darker tracking-[0.2em] uppercase"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="w-full bg-surface-dark border border-border-dark text-white font-body text-sm px-4 py-3.5 placeholder:text-muted-darker focus:outline-none focus:border-accent transition-colors duration-200"
          placeholder="Enter admin password"
        />
      </div>

      {state?.error && (
        <p className="font-body text-sm text-red-400 bg-red-900/20 border border-red-900/50 px-4 py-3">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-accent text-foreground-dark font-display font-semibold text-xs tracking-widest uppercase px-6 py-4 hover:bg-accent/90 disabled:opacity-50 transition-colors duration-200 mt-2"
      >
        {isPending ? "Signing in…" : "Sign in →"}
      </button>
    </form>
  );
}
