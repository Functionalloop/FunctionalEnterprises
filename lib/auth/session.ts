import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours

// ── L-4: Validate secret at module load time ──────────────────────────────────
// Throws loudly during startup if the secret is missing or too short.
function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "[Auth] ADMIN_SESSION_SECRET is not set. Add it to .env.local and restart."
    );
  }
  if (secret.length < 32) {
    throw new Error(
      "[Auth] ADMIN_SESSION_SECRET must be at least 32 characters. Regenerate with: openssl rand -hex 32"
    );
  }
  return secret;
}

async function signNonce(nonce: string): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBytes = await crypto.subtle.sign("HMAC", keyMaterial, enc.encode(nonce));
  const sig = Array.from(new Uint8Array(signatureBytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${nonce}.${sig}`;
}

export async function verifyToken(token: string): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || !token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [nonce, sig] = parts;

  try {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const sigBytes = new Uint8Array(sig.match(/.{2}/g)!.map((b) => parseInt(b, 16)));
    // H-5 (in session.ts): crypto.subtle.verify is constant-time
    return crypto.subtle.verify("HMAC", keyMaterial, sigBytes, enc.encode(nonce));
  } catch {
    return false;
  }
}

export async function setSession(): Promise<void> {
  const nonce = Array.from(crypto.getRandomValues(new Uint8Array(24)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const token = await signNonce(nonce);
  const store = await cookies();

  // H-4: secure, strict sameSite, scoped to /admin only
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export { COOKIE_NAME, MAX_AGE_SECONDS };
