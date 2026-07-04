import { defineConfig } from "prisma/config";

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
});
