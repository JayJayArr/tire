import { Body, Controller, Get } from '@nestjs/common';
import { TimesService } from './times.service';

@Controller('times')
export class TimesController {
  constructor(private timesService: TimesService) { }
  @Get()
  gettimes(@Body() cardno: String) {
    return this.timesService.gettimes();
  }
}
