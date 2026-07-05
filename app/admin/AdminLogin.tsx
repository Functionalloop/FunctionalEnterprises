"use client";

import { useState } from "react";
import { login } from "./actions";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login(password);
      if (res.success) {
        window.location.reload(); // Reload to hit the server component again
      } else {
        setError(res.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display font-bold text-3xl text-white mb-8 text-center">Admin Access</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="bg-surface-dark border border-border-dark text-white px-4 py-3 focus:outline-none focus:border-accent w-full"
            required
          />
          {error && <p className="text-red-400 text-sm font-body">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black font-display font-bold px-4 py-3 hover:bg-gray-200 transition-colors"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
