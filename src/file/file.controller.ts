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
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { TimesService } from 'src/times/times.service';
import { Role } from 'src/types';
import { User } from 'src/users/users.decorator';

@Controller('file')
export class FileController {
  constructor(private timesService: TimesService) {}

  //For Testing purposes only:
  // @Get()
  // async getTimes() {
  //   console.log('got file request');
  //   let cardno = '10635';
  //   let data = await this.timesService.getTimeEntries(cardno);
  //   console.log(data);
  //   let buffer = Buffer.from(this.convertToCSV(data));
  //   return new StreamableFile(buffer, {
  //     type: 'text/plain',
  //     disposition: 'attachment; filename="' + cardno + '.csv"',
  //   });
  // }

  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @Post()
  async getPersonalTimes(@User('cardno') cardno: string, @Body() body: any) {
    console.log('got file request');
    const data = await this.timesService.getTimeEntries(
      cardno,
      body.start,
      body.end,
    );
    if (data.length) {
      data.forEach((row) => {
        delete row.faulty;
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
    let data = await this.timesService.getTimeEntries(
      params.cardno,
      body.start,
      body.end,
    );
    if (data.length) {
      data.forEach((row) => {
        delete row.faulty;
      });
      let buffer = Buffer.from(this.convertToCSV(data));
      console.log(buffer);
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
