import { Module } from '@nestjs/common';
import { ReaderController } from './reader.controller';
import { ReaderService } from './reader.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reader } from 'src/entities/reader.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reader], 'TireConnection')],
  controllers: [ReaderController],
  providers: [ReaderService],
})
export class ReaderModule { }
