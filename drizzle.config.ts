import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv'

dotenv.config()
export default defineConfig({
  schema: './src/server/db/model.ts',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,
    ssl: false
  },
  verbose: true,
  strict: true,
})