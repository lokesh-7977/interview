import dotenv from "dotenv";
import { envSchema } from "../schemas/env.schema";

dotenv.config();

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.issues);
  process.exit(1);
}

export const config = {
  PORT: parsedEnv.data.PORT,
  DATABASE_URL: parsedEnv.data.DATABASE_URL,
  NODE_ENV: parsedEnv.data.NODE_ENV,
  SNOWFLAKE_MACHINE_ID: parsedEnv.data.SNOWFLAKE_MACHINE_ID,
  SMTP_HOST: parsedEnv.data.SMTP_HOST,
  SMTP_PORT: parsedEnv.data.SMTP_PORT,
  SMTP_USERNAME: parsedEnv.data.SMTP_USERNAME,
  SMTP_PASSWORD: parsedEnv.data.SMTP_PASSWORD

};
