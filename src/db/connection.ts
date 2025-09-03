import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import type { Database } from './types';
import { config } from '../config';

const pool = new Pool({
  connectionString: config.DATABASE_URL,
  ssl: config.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({ pool }),
});
