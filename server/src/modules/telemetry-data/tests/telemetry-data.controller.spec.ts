import { Test, TestingModule } from '@nestjs/testing';
import TelemetryDataController from '../telemetry-data.controller';
import TelemetryDataService from '../telemetry-data.service';
import TelemetryData from '../telemetry-data.schema';
import { NotFoundException } from '@nestjs/common';

describe('TelemetryDataController', () => {
  let telemetryDataController: TelemetryDataController;
  let telemetryDataService: TelemetryDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelemetryDataController],
      providers: [
        {
          provide: TelemetryDataService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            normalize: jest.fn(),
          },
        },
      ],
    }).compile();

    telemetryDataController = module.get<TelemetryDataController>(
      TelemetryDataController,
    );
    telemetryDataService =
      module.get<TelemetryDataService>(TelemetryDataService);
  });

  it('should be defined', () => {
    expect(telemetryDataController).toBeDefined();
  });

  const mongoId = '53b1c579bdf3de74f76bdac9';
  const telemetryData = {
    _id: mongoId,
    humidity: 50,
    temperature: 25,
    timestamp: new Date(),
    __v: 0,
  } as any as TelemetryData;

  describe('getAll', () => {
    it('should invoke service.findAll', async () => {
      const findAllSpy = jest.spyOn(telemetryDataService, 'findAll');

      findAllSpy.mockResolvedValueOnce([]);

      await telemetryDataController.getAll();

      expect(findAllSpy).toHaveBeenCalledTimes(1);
    });

    it('should return normalized telemetry data', async () => {
      const normalizedTelemetry = telemetryDataService.normalize(telemetryData);
      const findAllSpy = jest.spyOn(telemetryDataService, 'findAll');
      const normalizeSpy = jest.spyOn(telemetryDataService, 'normalize');
      const telemetries = [telemetryData, telemetryData];
      const normalizedTelemetries = [normalizedTelemetry, normalizedTelemetry];

      findAllSpy.mockResolvedValueOnce(telemetries);
      normalizeSpy.mockClear();

      const result = await telemetryDataController.getAll();

      expect(result).toEqual(normalizedTelemetries);
      telemetries.forEach((telemetry, index) => {
        expect(normalizeSpy).toHaveBeenNthCalledWith(index + 1, telemetry);
      });
      expect(normalizeSpy).toHaveBeenCalledTimes(telemetries.length);
    });
  });

  describe('getOne', () => {
    it('should invoke service.findOne', async () => {
      const findOneSpy = jest.spyOn(telemetryDataService, 'findOne');

      findOneSpy.mockResolvedValueOnce(telemetryData);

      await telemetryDataController.getOne({ id: mongoId });

      expect(findOneSpy).toHaveBeenCalledWith(mongoId);
      expect(findOneSpy).toHaveBeenCalledTimes(1);
    });

    it('should return normalized telemetry data', async () => {
      const normalizedTelemetry = telemetryDataService.normalize(telemetryData);
      const findOneSpy = jest.spyOn(telemetryDataService, 'findOne');
      const normalizeSpy = jest.spyOn(telemetryDataService, 'normalize');

      findOneSpy.mockResolvedValueOnce(telemetryData);
      normalizeSpy.mockClear();

      const result = await telemetryDataController.getOne({ id: mongoId });

      expect(normalizeSpy).toHaveBeenCalledWith(telemetryData);
      expect(normalizeSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(normalizedTelemetry);
    });

    it('should throw NotFoundException if telemetry data not found', async () => {
      const findOneSpy = jest.spyOn(telemetryDataService, 'findOne');

      findOneSpy.mockResolvedValueOnce(null);

      const telemetryPromise = telemetryDataController.getOne({ id: mongoId });

      await expect(telemetryPromise).rejects.toThrow(NotFoundException);
    });
  });
});
