import { Module } from '@nestjs/common';
import { ProWatchService } from './pro-watch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { TimeEntry } from '../entities/timeentry.entity';
import { Connector } from '../entities/connector.entity';
import { Reader } from '../entities/reader.entity';
import { ProWatchWorker } from './pro-watch.worker';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Connector, User, TimeEntry, Reader],
      'TireConnection',
    ),
    TypeOrmModule.forFeature([], 'ProWatchConnection'),
  ],
  providers: [ProWatchService, ProWatchWorker],
})
export class ProWatchModule {}
