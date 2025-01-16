import { Test, TestingModule } from '@nestjs/testing';
import { ConnectorController } from './connector.controller';
import { CanActivate } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ConnectorService } from './connector.service';
import { Connector } from '../entities/connector.entity';

describe('ConnectorController', () => {
  let controller: ConnectorController;
  let mockAuthGuard: CanActivate = {
    canActivate() {
      return true;
    },
  };

  const mockConnectorService = {
    getConnectors: jest.fn(),
    updateConnector: jest.fn(),
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
      controllers: [ConnectorController],
      providers: [ConnectorService],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideProvider(ConnectorService)
      .useValue(mockConnectorService)
      .compile();

    controller = module.get<ConnectorController>(ConnectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getConnectors => should return all connectors', async () => {
    jest
      .spyOn(mockConnectorService, 'getConnectors')
      .mockReturnValue(connectors);

    const result = await controller.getConnectors();

    expect(result).toBe(connectors);
    expect(mockConnectorService.getConnectors).toHaveBeenCalledTimes(1);
    expect(mockConnectorService.getConnectors).toHaveBeenCalledWith();
  });
  it('updateConnector => should update one connector', async () => {
    jest
      .spyOn(mockConnectorService, 'updateConnector')
      .mockReturnValue(connectors);

    const result = await controller.updateConnector(connectors[0]);

    expect(result).toBe(connectors);
    expect(mockConnectorService.updateConnector).toHaveBeenCalledTimes(1);
    expect(mockConnectorService.updateConnector).toHaveBeenCalledWith(
      connectors[0],
    );
  });
});
