import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const sqlite = new Database('sqlite.db');

export const db = drizzle(sqlite);
// // Add the role column manually using raw SQL
// db.run(sql`
//   ALTER TABLE users
//   ADD COLUMN role TEXT CHECK(role IN ('job-seeker', 'employer')) NOT NULL DEFAULT 'job-seeker'
// `);
