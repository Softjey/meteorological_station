import { Module } from '@nestjs/common';
import TelemetryDataModule from './modules/telemetry-data/telemetry-data.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config';

@Module({
  imports: [MongooseModule.forRoot(config().DATABASE_URL), TelemetryDataModule],
})
export class AppModule {}
