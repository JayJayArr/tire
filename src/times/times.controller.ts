import { Controller, Get, UseGuards } from '@nestjs/common';
import { TimesService } from './times.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('times')
export class TimesController {
  constructor(private timesService: TimesService) {}
  @UseGuards(AuthGuard)
  @Get()
  gettimes() {
    return this.timesService.gettimes();
  }
}
