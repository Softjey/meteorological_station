import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface TelemetryDataI {
  _id: string;
  temperature: number;
  humidity: number;
  timestamp: Date;
}

@Schema()
export default class TelemetryData
  extends Document<string>
  implements Omit<TelemetryDataI, '_id'>
{
  @Prop({ required: true })
  temperature!: number;

  @Prop({ required: true })
  humidity!: number;

  @Prop({ required: true })
  timestamp!: Date;
}

export const TelemetryDataSchema = SchemaFactory.createForClass(TelemetryData);
