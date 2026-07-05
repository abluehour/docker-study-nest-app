import { Inject, Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import * as path from 'path';
import { Pool } from 'pg';

import {
  DB_CONNECTION,
  DB_POOL,
  databasePoolProvider,
  databaseProvider,
  type DatabaseConnection,
} from './database.provider';

@Module({
  providers: [databasePoolProvider, databaseProvider],
  exports: [databaseProvider],
})
export class DbModule implements OnModuleInit, OnApplicationShutdown {
  constructor(
    @Inject(DB_CONNECTION) private readonly db: DatabaseConnection,
    @Inject(DB_POOL) private readonly pool: Pool,
  ) {}

  async onModuleInit() {
    console.log('Running database migrations...');
    await migrate(this.db, { migrationsFolder: path.join(process.cwd(), 'drizzle') });
    console.log('Database migrations completed successfully.');
  }

  async onApplicationShutdown() {
    await this.pool.end();
  }
}
