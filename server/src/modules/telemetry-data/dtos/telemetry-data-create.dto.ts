import { IsNumber, IsDate, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export default class TelemetryDataCreateDto {
  @ApiProperty({
    description: 'Temperature reading',
    example: 22.5,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  temperature!: number;

  @ApiProperty({
    description: 'Humidity level',
    example: 60,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  humidity!: number;

  @ApiProperty({
    description: 'Timestamp of the telemetry data',
    example: '2023-08-10T14:30:00Z',
    required: true,
  })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  timestamp!: Date;
}
