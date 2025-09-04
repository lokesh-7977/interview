import { z } from "zod";

export const envSchema = z.object({
  PORT: z.preprocess(
    (val) => Number(val),
    z.number().int().min(1).max(65535).default(4000)
  ),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  DATABASE_URL: z.string(),
  SNOWFLAKE_MACHINE_ID: z.preprocess(
    (val) => Number(val),
    z.number().int().min(0).default(1)
  ),
  SMTP_HOST: z.string().min(1, "SMTP HOST is required"),
  SMTP_PORT: z.preprocess(
    (val) => Number(val),
    z.number().int().min(1).max(65535)
  ),
  SMTP_USERNAME: z.string().min(1, "SMTP USERNAME is required"),
  SMTP_PASSWORD: z.string().min(1, "SMTP PASSWORD is required"),
  ACCESS_TOKEN_SECRET: z.string().min(1, "ACCESS TOKEN SECRET is required"),
  REFRESH_TOKEN_SECRET: z.string().min(1, "REFRESH TOKEN SECRET is required")
});
