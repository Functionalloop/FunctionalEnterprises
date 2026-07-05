/**
 * lib/auth/rateLimit.ts
 *
 * In-memory rate limiter backed by a Map.
 * Works correctly for single-instance Node.js deployments (dev + VPS/container).
 * For serverless multi-instance deployments (Vercel/AWS Lambda), replace with
 * @upstash/ratelimit backed by Redis.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes to prevent memory leaks
setInterval(
  () => {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (entry.resetAt < now) store.delete(key);
    }
  },
  5 * 60 * 1000
);

/**
 * Check whether a keyed bucket is within its rate limit.
 *
 * @param key         - A unique string per rate-limited subject (e.g. "login:1.2.3.4")
 * @param maxRequests - Maximum allowed requests within the window
 * @param windowMs    - Window duration in milliseconds
 * @returns allowed:true if under limit; allowed:false + retryAfterMs if over limit
 */
export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = store.get(key);

  // No entry or expired → start a fresh window
  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterMs: 0 };
  }

  // Over the limit
  if (entry.count >= maxRequests) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  // Within limit — increment
  entry.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}
