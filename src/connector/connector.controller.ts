import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ConnectorService } from './connector.service';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/types';
import { AuthGuard } from 'src/auth/auth.guard';
import { Connector } from 'src/entities/connector.entity';

@Controller('connector')
export class ConnectorController {
  constructor(private connectorService: ConnectorService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Get()
  getConnectors() {
    return this.connectorService.getConnectors();
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Put()
  putConnector(@Body() body: Connector) {
    return this.connectorService.updateConnector(body);
  }
}
