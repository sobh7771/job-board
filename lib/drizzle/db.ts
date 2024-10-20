import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

import { SECRETS } from '../secrets';

const sqlite = new Database(SECRETS.JOB_BOARD_DB_PATH);

export const db = drizzle(sqlite);
