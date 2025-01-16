import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connector } from '../entities/connector.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConnectorService {
  constructor(
    @InjectRepository(Connector, 'TireConnection')
    private connectorRepository: Repository<Connector>,
  ) {}
  async getConnectors() {
    return await this.connectorRepository.find();
  }

  async updateConnector(connector: Connector) {
    return await this.connectorRepository.update(
      { name: connector.name },
      { active: connector?.active, timestamp: connector?.timestamp },
    );
  }
}
