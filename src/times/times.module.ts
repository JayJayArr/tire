import { Module } from '@nestjs/common';
import { TimesController } from './times.controller';
import { TimesService } from './times.service';

@Module({
  controllers: [TimesController],
  providers: [TimesService]
})
export class TimesModule {}
