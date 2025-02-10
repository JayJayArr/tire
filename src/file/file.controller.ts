import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../roles/roles.decorator';
import { TimesService } from '../times/times.service';
import { Role } from '../types';
import { User } from '../users/users.decorator';

@Controller('file')
export class FileController {
  constructor(private timesService: TimesService) { }

  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @Post()
  async getPersonalTimes(@User('cardno') cardno: string, @Body() body: any) {
    const data = (await this.timesService.getTimeEntries(
      cardno,
      body.start,
      body.end,
    )) as any;
    if (data.length) {
      data.forEach((row) => {
        delete row.faulty;
        if (row.outtime && row.intime) {
          row.diff = (row.outtime - row.intime) / 1000;
        }
      });
      let buffer = Buffer.from(this.convertToCSV(data));
      return new StreamableFile(buffer, {
        type: 'text/plain',
        disposition: 'attachment; filename="' + cardno + '.csv"',
      });
    } else {
      throw new NotFoundException('no data available');
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.PowerUser)
  @Post(':cardno')
  async getOverviewTimes(@Param() params: any, @Body() body: any) {
    let data = (await this.timesService.getTimeEntries(
      params.cardno,
      body.start,
      body.end,
    )) as any;
    if (data.length) {
      data.forEach((row) => {
        delete row.faulty;
        if (row.outtime && row.intime) {
          row.diff = (row.outtime - row.intime) / 1000;
        }
      });
      let buffer = Buffer.from(this.convertToCSV(data));
      return new StreamableFile(buffer, {
        type: 'text/plain',
        disposition: 'attachment; filename="' + params.cardno + '.csv"',
      });
    } else {
      throw new NotFoundException('no data available');
    }
  }

  convertToCSV(arr) {
    const array = [Object.keys(arr[0])].concat(arr);

    return array
      .map((it) => {
        return Object.values(it).toString();
      })
      .join('\n');
  }
}
