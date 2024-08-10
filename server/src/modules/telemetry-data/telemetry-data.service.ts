import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import TelemetryDataCreateDto from './dtos/telemetry-data-create.dto';
import TelemetryData, { TelemetryDataI } from './telemetry-data.schema';

@Injectable()
export default class TelemetryDataService {
  constructor(
    @InjectModel(TelemetryData.name)
    private readonly telemetryDataModel: Model<TelemetryData>,
  ) {}

  normalize(
    data: Omit<TelemetryDataI, '_id'> & Pick<TelemetryData, '_id'>,
  ): TelemetryDataI {
    const { _id, humidity, temperature, timestamp } = data;

    return { _id: _id!, humidity, temperature, timestamp };
  }

  async save(data: TelemetryDataCreateDto): Promise<TelemetryData> {
    const createdData = await this.telemetryDataModel.create(data);

    return createdData;
  }

  async findAll(): Promise<TelemetryData[]> {
    return this.telemetryDataModel.find().exec();
  }

  async findOne(id: TelemetryDataI['_id']): Promise<TelemetryData | null> {
    return this.telemetryDataModel.findById(id).exec();
  }
}
