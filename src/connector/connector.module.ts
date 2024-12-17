import { Module } from '@nestjs/common';
import { ConnectorService } from './connector.service';
import { ConnectorController } from './connector.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connector } from 'src/entities/connector.entity';

@Module({
  providers: [ConnectorService],
  controllers: [ConnectorController],
  imports: [TypeOrmModule.forFeature([Connector])],
})
export class ConnectorModule {}
