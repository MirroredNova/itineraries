import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// For Next.js edge runtime and serverless environments
let client: ReturnType<typeof postgres> | null = null;

const connectionString = process.env.DATABASE_URL;

// Singleton pattern to reuse the connection
export function getDbClient() {
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
  }

  if (!client) {
    client = postgres(connectionString, {
      prepare: false,
      max: 10, // Connection pool size
      idle_timeout: 20, // Idle connection timeout in seconds
    });
  }
  return client;
}

export const db = drizzle(getDbClient());
