import { defineConfig } from "@prisma/config";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

/**
 * prisma.config.ts — Prisma 7 configuration
 *
 * Connection URLs are set via environment variables.
 * Fill in DATABASE_URL and DIRECT_URL in .env.local.
 *
 * Docs: https://pris.ly/d/config-datasource
 */
export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    seed: "npx tsx prisma/seed.ts",
  },
});
