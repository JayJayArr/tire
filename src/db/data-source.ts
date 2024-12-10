import { TimeCheckpoint } from '../entities/timecheckpoint.entity';
import { TimeEntry } from '../entities/timeentry.entity';
import { User } from '../entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  synchronize: process.env.DEVELOPMENT == 'true',
  database: './tire.db',
  entities: [User, TimeEntry, TimeCheckpoint],
  // migrations: ['src/migrations/*.ts'],
  // migrationsRun: process.env.DEVELOPMENT == 'true',
  logging: process.env.DEVELOPMENT == 'true',
};

export const dataSource = new DataSource(dataSourceOptions);
