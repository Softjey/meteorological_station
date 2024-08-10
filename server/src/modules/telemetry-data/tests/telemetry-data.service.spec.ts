import { Test, TestingModule } from '@nestjs/testing';
import TelemetryDataService from '../telemetry-data.service';
import { getModelToken } from '@nestjs/mongoose';
import TelemetryData from '../telemetry-data.schema';
import { Model } from 'mongoose';

describe.only('TelemetryDataService', () => {
  let service: TelemetryDataService;
  let model: Model<TelemetryData>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TelemetryDataService,
        {
          provide: getModelToken(TelemetryData.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TelemetryDataService>(TelemetryDataService);
    model = module.get<Model<TelemetryData>>(getModelToken(TelemetryData.name));
  });

  const telemetryData = {
    _id: '53b1c579bdf3de74f76bdac9',
    humidity: 50,
    temperature: 25,
    timestamp: new Date(),
    __v: 0,
  };

  describe('normalize', () => {
    it('should normalize telemetry data', async () => {
      const telemetryDataWithInvalidProperties = {
        ...telemetryData,
        asdasd: '12312',
        someMethod: () => {},
      };

      const normalizedTelemetry = service.normalize(
        telemetryDataWithInvalidProperties,
      );

      expect(normalizedTelemetry).toEqual({
        _id: '53b1c579bdf3de74f76bdac9',
        humidity: 50,
        temperature: 25,
        timestamp: telemetryData.timestamp,
      });
    });
  });

  describe('save', () => {
    it('should save telemetry data', async () => {
      const createSpy = jest
        .spyOn(model, 'create')
        .mockResolvedValueOnce(telemetryData as any);

      const result = await service.save(telemetryData);

      expect(createSpy).toHaveBeenCalledWith(telemetryData);
      expect(result).toEqual(telemetryData);
    });
  });

  describe('findAll', () => {
    it('should return an array of telemetry data', async () => {
      const telemetryDataArray = [telemetryData];
      const findSpy = jest.spyOn(model, 'find');

      findSpy.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(telemetryDataArray),
      } as any);

      const result = await service.findAll();

      expect(result).toEqual(telemetryDataArray);
      expect(findSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return one telemetry data by ID', async () => {
      const findByIdSpy = jest.spyOn(model, 'findById');

      findByIdSpy.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(telemetryData),
      } as any);

      const result = await service.findOne(telemetryData._id);

      expect(findByIdSpy).toHaveBeenCalledWith(telemetryData._id);
      expect(findByIdSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(telemetryData);
    });

    it('should return null if telemetry data not found', async () => {
      const findByIsSpy = jest.spyOn(model, 'findById');

      findByIsSpy.mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      const result = await service.findOne('nonexistentId');

      expect(findByIsSpy).toHaveBeenCalledWith('nonexistentId');
      expect(findByIsSpy).toHaveBeenCalledTimes(1);
      expect(result).toBeNull();
    });
  });
});
