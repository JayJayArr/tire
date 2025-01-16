import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ConnectorService } from './connector.service';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../types';
import { AuthGuard } from '../auth/auth.guard';
import { Connector } from '../entities/connector.entity';

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
  updateConnector(@Body() body: Connector) {
    return this.connectorService.updateConnector(body);
  }
}
