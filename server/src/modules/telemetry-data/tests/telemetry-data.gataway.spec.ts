import { Test, TestingModule } from '@nestjs/testing';
import TelemetryDataGateway from '../telemetry-data.gataway';
import TelemetryDataService from '../telemetry-data.service';
import TelemetryDataCreateDto from '../dtos/telemetry-data-create.dto';

describe('TelemetryDataGateway', () => {
  let gateway: TelemetryDataGateway;
  let service: TelemetryDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TelemetryDataService,
          useValue: {
            save: jest.fn(),
          },
        },
        TelemetryDataGateway,
      ],
    }).compile();

    gateway = module.get<TelemetryDataGateway>(TelemetryDataGateway);
    service = module.get<TelemetryDataService>(TelemetryDataService);
  });

  describe('handleTelemetryData', () => {
    it('should call telemetryDataService.save with the correct parameters', async () => {
      const saveSpy = jest.spyOn(service, 'save');
      const createDto: TelemetryDataCreateDto = {
        humidity: 50,
        temperature: 25,
        timestamp: new Date(),
      };

      await gateway.handleTelemetryData(createDto);

      expect(saveSpy).toHaveBeenCalledWith(createDto);
    });
  });
});
