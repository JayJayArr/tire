import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { TimesService } from '../times/times.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeEntry } from 'src/entities/timeentry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeEntry], 'TireConnection')],
  controllers: [FileController],
  providers: [TimesService],
})
export class FileModule {}
