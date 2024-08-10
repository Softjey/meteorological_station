import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import TelemetryDataService from './telemetry-data.service';
import TelemetryDataCreateDto from './dtos/telemetry-data-create.dto';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import config from '../../config';
import WebSocketExceptionsFilter from '../../utils/filters/web-socket-exceptions.filter';

@WebSocketGateway()
@UsePipes(new ValidationPipe(config().VALIDATIONS_OPTIONS))
@UseFilters(new WebSocketExceptionsFilter())
export default class TelemetryDataGateway {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly telemetryDataService: TelemetryDataService) {}

  @SubscribeMessage('telemetry-data')
  async handleTelemetryData(
    @MessageBody() telemetryData: TelemetryDataCreateDto,
  ) {
    console.log('Received telemetry data:', telemetryData);
    await this.telemetryDataService.save(telemetryData);
  }
}
