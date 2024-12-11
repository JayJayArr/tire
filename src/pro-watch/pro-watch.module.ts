import { Module } from '@nestjs/common';
import { ProWatchService } from './pro-watch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeCheckpoint } from 'src/entities/timecheckpoint.entity';
import { User } from 'src/entities/user.entity';
import { TimeEntry } from 'src/entities/timeentry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimeCheckpoint, User, TimeEntry]),
    TypeOrmModule.forFeature([TimeEntry], 'ProWatchConnection'),
  ],
  providers: [ProWatchService],
})
export class ProWatchModule {}
