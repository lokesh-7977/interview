import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  DATABASE_URL: z.string(),
  SNOWFLAKE_MACHINE_ID: z.coerce.number().default(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.issues);
  process.exit(1);
}

export const config = {
  PORT: parsedEnv.data.PORT,
  DATABASE_URL: parsedEnv.data.DATABASE_URL,
  NODE_ENV: parsedEnv.data.NODE_ENV,
  SNOWFLAKE_MACHINE_ID: parsedEnv.data.SNOWFLAKE_MACHINE_ID
};
