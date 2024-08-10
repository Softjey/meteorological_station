import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import TelemetryDataService from './telemetry-data.service';
import MongoIdDTO from '../../utils/dtos/mongo-id.dto';
import { TelemetryDataI } from './telemetry-data.schema';

@ApiTags('Telemetry Data')
@Controller('telemetry-data')
export default class TelemetryDataController {
  constructor(private readonly telemetryDataService: TelemetryDataService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all telemetry data' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of telemetry data',
  })
  async getAll(): Promise<TelemetryDataI[]> {
    const telemetries = await this.telemetryDataService.findAll();

    return telemetries.map((telemetry) =>
      this.telemetryDataService.normalize(telemetry),
    );
  }

  @Get('/:id')
  @Get('/:id')
  @ApiOperation({ summary: 'Retrieve a single telemetry data record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a single telemetry data record',
  })
  @ApiResponse({
    status: 404,
    description: 'Telemetry data with the given ID not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Id 341232 is not a valid MongoId',
  })
  async getOne(@Param() { id }: MongoIdDTO): Promise<TelemetryDataI> {
    const telemetry = await this.telemetryDataService.findOne(id);

    if (!telemetry) {
      throw new NotFoundException(`Telemetry data with id ${id} not found`);
    }

    return this.telemetryDataService.normalize(telemetry);
  }
}
