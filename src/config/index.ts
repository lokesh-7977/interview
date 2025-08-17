import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
	PORT: z.coerce.number().default(4000),
	DATABASE_URL: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error('Invalid environment variables:', parsedEnv.error.format());
	process.exit(1);
}

export const config = {
	PORT: parsedEnv.data.PORT,
	DATABASE_URL: parsedEnv.data.DATABASE_URL,
};
