import { Controller, Get, UseGuards } from '@nestjs/common';
import { TimesService } from './times.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/types';

@Controller('times')
export class TimesController {
  constructor(private timesService: TimesService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @Get()
  gettimes() {
    return this.timesService.gettimes();
  }
}
