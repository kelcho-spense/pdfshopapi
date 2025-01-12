
// NEON
import "dotenv/config";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

export const connection = neon(process.env.DATABASE_URL!);
const db = drizzle(connection,{ schema, logger: true });

export default db;