import "dotenv/config";
import { defineConfig } from 'drizzle-kit';

export default defineConfig ({
  schema: "./src/drizzle/schema.ts",   //schema file location
  out: "./src/drizzle/migrations",     // Output directory for the migrations files
  driver: "pg",  // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
  verbose: true,   // If true, the migration will log all SQL queries to the console
  strict: true,   // If true, if there is overlapping migration you will be alerted
});