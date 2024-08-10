import { Test, TestingModule } from '@nestjs/testing';
import { ArgumentsHost, BadRequestException } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import WebSocketExceptionsFilter from './web-socket-exceptions.filter';

describe('WebSocketExceptionsFilter', () => {
  let filter: WebSocketExceptionsFilter;
  let clientMock: Partial<Socket>;
  let argumentsHostMock: Partial<ArgumentsHost>;

  beforeEach(async () => {
    clientMock = {
      emit: jest.fn(),
    };

    argumentsHostMock = {
      switchToWs: jest.fn().mockReturnValue({
        getClient: jest.fn().mockReturnValue(clientMock),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [WebSocketExceptionsFilter],
    }).compile();

    filter = module.get<WebSocketExceptionsFilter>(WebSocketExceptionsFilter);
  });

  it('should handle WsException and send the message to the client', () => {
    const exception = new WsException('WsException occurred');

    filter.catch(exception, argumentsHostMock as ArgumentsHost);

    expect(clientMock.emit).toHaveBeenCalledWith('exception', {
      message: 'WsException occurred',
    });
  });

  it('should handle BadRequestException and send the message array to the client', () => {
    const exception = new BadRequestException(['Invalid input data']);

    filter.catch(exception, argumentsHostMock as ArgumentsHost);

    expect(clientMock.emit).toHaveBeenCalledWith('exception', {
      message: ['Invalid input data'],
    });
  });

  it('should handle BadRequestException with no message and send default message to the client', () => {
    const exception = new BadRequestException();

    filter.catch(exception, argumentsHostMock as ArgumentsHost);

    expect(clientMock.emit).toHaveBeenCalledWith('exception', {
      message: 'Bad Request',
    });
  });

  it('should handle generic Error and send the error message to the client', () => {
    const exception = new Error('Generic error occurred');

    filter.catch(exception, argumentsHostMock as ArgumentsHost);

    expect(clientMock.emit).toHaveBeenCalledWith('exception', {
      message: 'Generic error occurred',
    });
  });
});
