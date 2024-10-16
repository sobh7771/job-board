import type { Config } from 'drizzle-kit';
import { SECRETS } from './lib/secrets';

export default {
  schema: './lib/drizzle/schema.ts',
  out: './lib/drizzle/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: SECRETS.JOB_BOARD_DB_PATH,
  },
} satisfies Config;
