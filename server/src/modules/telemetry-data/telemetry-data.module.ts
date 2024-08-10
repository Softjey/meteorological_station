import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import TelemetryData, { TelemetryDataSchema } from './telemetry-data.schema';
import TelemetryDataService from './telemetry-data.service';
import TelemetryDataGateway from './telemetry-data.gataway';
import TelemetryDataController from './telemetry-data.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TelemetryData.name,
        schema: TelemetryDataSchema,
      },
    ]),
  ],
  providers: [TelemetryDataService, TelemetryDataGateway],
  controllers: [TelemetryDataController],
})
export default class TelemetryDataModule {}
