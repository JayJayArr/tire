import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TimesService } from './times.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/types';
import { User } from 'src/users/users.decorator';

@Controller('times')
export class TimesController {
  constructor(private timesService: TimesService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @Post()
  getPersonalTimes(@User('cardno') cardno: string, @Body() body: any) {
    console.log(body);
    return this.timesService.gettimes(cardno, body.start, body.end);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.PowerUser)
  @Post(':cardno')
  getOverviewTimes(@Param() params: any, @Body() body: any) {
    return this.timesService.gettimes(params.cardno, body.start, body.end);
  }
}
