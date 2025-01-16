import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TimesService } from './times.service';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../types';
import { User } from '../users/users.decorator';
import { TimeEntry } from '../entities/timeentry.entity';

@Controller('times')
export class TimesController {
  constructor(private timesService: TimesService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @Post()
  getPersonalTimes(@User('cardno') cardno: string, @Body() body: any) {
    return this.timesService.getTimeEntries(cardno, body.start, body.end);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.PowerUser)
  @Post(':cardno')
  getOverviewTimes(@Param() params: any, @Body() body: any) {
    return this.timesService.getTimeEntries(
      params.cardno,
      body.start,
      body.end,
    );
  }

  @UseGuards(AuthGuard)
  @Roles(Role.PowerUser)
  @Put()
  createTimeEntry(@Body() timeentry: TimeEntry) {
    return this.timesService.createTimeEntry(timeentry);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.PowerUser)
  @Patch()
  updateTimeEntry(@Body() timeentry: TimeEntry) {
    return this.timesService.updateTimeEntry(timeentry);
  }
}
