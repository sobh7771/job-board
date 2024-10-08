import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/drizzle/schema.ts',
  out: './lib/drizzle/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'sqlite.db',
  },
} satisfies Config;
