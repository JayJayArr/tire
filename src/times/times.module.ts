import { Module } from '@nestjs/common';
import { TimesController } from './times.controller';
import { TimesService } from './times.service';
import { TimeEntry } from 'src/entities/timeentry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TimeEntry], 'TireConnection')],
  controllers: [TimesController],
  providers: [TimesService],
})
export class TimesModule { }
