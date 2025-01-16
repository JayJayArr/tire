import { Test, TestingModule } from '@nestjs/testing';
import { ConnectorService } from './connector.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connector } from '../entities/connector.entity';

describe('ConnectorService', () => {
  let service: ConnectorService;

  let mockConnectorRepository = {
    find: jest.fn(),
    update: jest.fn(),
  };

  const connectors = [
    {
      id: 1,
      name: 'ProWatch',
      timestamp: new Date(),
      active: true,
    },
    {
      id: 1234,
      name: 'OnGuard',
      timestamp: new Date(),
      active: false,
    },
  ] as Connector[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConnectorService,
        {
          provide: getRepositoryToken(Connector, 'TireConnection'),
          useValue: mockConnectorRepository,
        },
      ],
    }).compile();

    service = module.get<ConnectorService>(ConnectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getConnectors => should get the Connectors', async () => {
    jest.spyOn(mockConnectorRepository, 'find').mockReturnValue(connectors);

    const result = await service.getConnectors();

    expect(result).toEqual(connectors);
    expect(mockConnectorRepository.find).toHaveBeenCalledTimes(1);
    expect(mockConnectorRepository.find).toHaveBeenCalledWith();
  });

  it('updateConnector => should update a connector', async () => {
    jest
      .spyOn(mockConnectorRepository, 'update')
      .mockReturnValue(connectors[0]);

    const result = await service.updateConnector(connectors[0]);

    expect(result).toEqual(connectors[0]);
    expect(mockConnectorRepository.update).toHaveBeenCalledTimes(1);
    expect(mockConnectorRepository.update).toHaveBeenCalledWith(
      { name: connectors[0].name },
      { active: connectors[0].active, timestamp: connectors[0].timestamp },
    );
  });
});
