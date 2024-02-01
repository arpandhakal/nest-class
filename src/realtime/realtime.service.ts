import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: true,
})
@Injectable()
export class RealtimeService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log('connected');
  }

  handleDisconnect(client: any) {
    console.log('disconnected');
  }

  public emit(eventName: string, data: any) {
    const clients = this.server.sockets.sockets;

    clients.forEach((client: any) => {
      client.emit(eventName, data);
    });
  }
}
