import { Connector } from '../entities/connector.entity';
import { TimeEntry } from '../entities/timeentry.entity';
import { User } from '../entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions[] = [
  {
    entities: [User, TimeEntry, Connector],
    migrations: ['../migrations/*.ts'],
    migrationsRun: process.env.DEVELOPMENT == 'true',
    type: 'mssql',
    name: 'TireConnection',
    port: parseInt(process.env.TIRE_PORT),
    host: process.env.TIRE_HOST,
    username: process.env.TIRE_USERNAME,
    password: process.env.TIRE_PASSWORD,
    database: process.env.TIRE_DATABASE,
    // logging: process.env.DEVELOPMENT == 'true',
    synchronize: true,
    requestTimeout: 60000,
    options: {
      trustServerCertificate: true,
    },

    pool: {
      max: 5,
      min: 0,
    },
  },
  {
    name: 'ProWatchConnection',
    type: 'mssql',
    port: parseInt(process.env.PROWATCH_PORT),
    host: process.env.PROWATCH_HOST,
    username: process.env.PROWATCH_USERNAME,
    password: process.env.PROWATCH_PASSWORD,
    database: process.env.PROWATCH_DATABASE,
    synchronize: false,
    entities: [],
    options: {
      trustServerCertificate: true,
    },
  },
];

export const dataSource = new DataSource(dataSourceOptions[0]);
