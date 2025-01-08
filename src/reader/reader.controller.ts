import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ReaderService } from './reader.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/types';
import { Roles } from 'src/roles/roles.decorator';
import { Reader } from 'src/entities/reader.entity';

@Controller('reader')
export class ReaderController {
  constructor(private readerService: ReaderService) { }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Get()
  getReaders() {
    return this.readerService.getReaders();
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Post()
  postReader(@Body() reader: Reader) {
    reader.id = Buffer.from(reader.id);
    return this.readerService.putReader(reader);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Patch()
  syncUsers() {
    return this.readerService.pullFromProWatch();
  }
}
