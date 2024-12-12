import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TimesService } from './times.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/types';
import { User } from 'src/users/users.decorator';

@Controller('times')
export class TimesController {
  constructor(private timesService: TimesService) { }

  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @Get()
  getPersonalTimes(@User('cardno') cardno: string) {
    return this.timesService.gettimes(cardno);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.PowerUser)
  @Get(':cardno')
  getOverviewTimes(@Param() params: any) {
    console.log(params.cardno);
    return this.timesService.gettimes(params.cardno);
  }
}
