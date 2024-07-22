import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from './model';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
const pool = new Pool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
})

export const db = drizzle(pool, { schema })
