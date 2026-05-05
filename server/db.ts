import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

let _db: ReturnType<typeof drizzle> | null = null;
let _pool: InstanceType<typeof Pool> | null = null;

export function getDb() {
  if (!_db) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set");
    }
    _pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    _db = drizzle(_pool, { schema });
  }
  return _db;
}

export function hasDatabaseUrl(): boolean {
  return !!process.env.DATABASE_URL;
}

