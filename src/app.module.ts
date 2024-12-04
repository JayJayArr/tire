import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TimesModule } from './times/times.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';

@Module({
  imports: [AuthModule, UsersModule, TimesModule],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
