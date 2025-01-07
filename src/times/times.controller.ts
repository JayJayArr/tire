import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TimesService } from './times.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/types';
import { User } from 'src/users/users.decorator';
import { TimeEntry } from 'src/entities/timeentry.entity';

@Controller('times')
export class TimesController {
  constructor(private timesService: TimesService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @Post()
  getPersonalTimes(@User('cardno') cardno: string, @Body() body: any) {
    return this.timesService.gettimes(cardno, body.start, body.end);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.PowerUser)
  @Post(':cardno')
  getOverviewTimes(@Param() params: any, @Body() body: any) {
    return this.timesService.gettimes(params.cardno, body.start, body.end);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.PowerUser)
  @Put()
  updateTimeEntry(@Body() timeentry: TimeEntry) {
    return this.timesService.updatetime(timeentry);
  }
}
