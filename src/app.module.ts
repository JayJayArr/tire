import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TimesModule } from './times/times.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { dataSourceOptions } from './db/data-source';
import { ProWatchModule } from './pro-watch/pro-watch.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConnectorModule } from './connector/connector.module';
import { User } from './entities/user.entity';
import { TimeEntry } from './entities/timeentry.entity';
import { Connector } from './entities/connector.entity';
import { Reader } from './entities/reader.entity';
import { ReaderModule } from './reader/reader.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
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
    }),
    TypeOrmModule.forRoot({
      entities: [User, TimeEntry, Connector, Reader],
      // migrations: ['../migrations/*.ts'],
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
      options: {
        trustServerCertificate: true,
      },
      requestTimeout: 60000,
      pool: {
        max: 5,
        min: 0,
      },
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    AuthModule,
    UsersModule,
    TimesModule,
    ProWatchModule,
    ScheduleModule.forRoot(),
    ConnectorModule,
    ReaderModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule { }
