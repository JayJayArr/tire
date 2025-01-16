import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ReaderService } from './reader.service';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../types';
import { Roles } from '../roles/roles.decorator';
import { Reader } from '../entities/reader.entity';

@Controller('reader')
export class ReaderController {
  constructor(private readerService: ReaderService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Get()
  getReaders() {
    return this.readerService.getReaders();
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Post()
  updateReader(@Body() reader: Reader) {
    reader.id = Buffer.from(reader.id);
    return this.readerService.updateReader(reader);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Patch()
  syncUsers() {
    return this.readerService.pullFromProWatch();
  }
}
