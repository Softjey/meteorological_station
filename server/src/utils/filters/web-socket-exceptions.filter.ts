import { Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch()
export default class WebSocketExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();

    if (exception instanceof WsException) {
      return this.sendExceptionToClient(client, exception.message);
    }

    if (exception instanceof BadRequestException) {
      const response = exception.getResponse() as { message?: string[] };

      return this.sendExceptionToClient(
        client,
        response?.message ?? 'Bad request',
      );
    }

    this.sendExceptionToClient(client, exception.message);
  }

  private sendExceptionToClient(client: Socket, message: string | string[]) {
    client.emit('exception', { message });
  }
}
