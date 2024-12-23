import { Module } from '@nestjs/common';
import { ProWatchService } from './pro-watch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { TimeEntry } from 'src/entities/timeentry.entity';
import { Connector } from 'src/entities/connector.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Connector, User, TimeEntry], 'TireConnection'),
    TypeOrmModule.forFeature([], 'ProWatchConnection'),
  ],
  providers: [ProWatchService],
})
export class ProWatchModule { }
