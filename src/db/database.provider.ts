import 'dotenv/config';

import { Provider } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';

export const DB_POOL = 'DB_POOL';
export const DB_CONNECTION = 'DB_CONNECTION';

export type DatabaseConnection = NodePgDatabase<typeof schema>;

export const databasePoolProvider: Provider = {
  provide: DB_POOL,
  useFactory: () =>
    new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
};

export const databaseProvider: Provider = {
  provide: DB_CONNECTION,
  useFactory: (pool: Pool) => drizzle(pool, { schema }),
  inject: [DB_POOL],
};
