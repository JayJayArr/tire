import { Connector } from 'src/entities/connector.entity';
import { TimeEntry } from '../entities/timeentry.entity';
import { User } from '../entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  synchronize: true,
  database: './tire.db',
  entities: [User, TimeEntry, Connector],
  // migrations: ['../migrations/*.ts'],
  // migrationsRun: process.env.DEVELOPMENT == 'true',
  logging: process.env.DEVELOPMENT == 'true',
};

export const dataSource = new DataSource(dataSourceOptions);
