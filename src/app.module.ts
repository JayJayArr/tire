import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TimesModule } from './times/times.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { ProWatchModule } from './pro-watch/pro-watch.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConnectorModule } from './connector/connector.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TimesModule,
    ProWatchModule,
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.env'],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
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
    ConnectorModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
