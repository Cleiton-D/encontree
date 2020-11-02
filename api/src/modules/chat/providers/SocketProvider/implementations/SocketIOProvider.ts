import { Server } from 'socket.io';

import SendMessageDTO from '../../../dtos/SendMessageDTO';
import ISocketProvider from '../models/ISocketProvider';

export default class SocketIOProvider implements ISocketProvider {
  public async sendMessage(
    socketServer: Server,
    { toUserId, message }: SendMessageDTO,
  ): Promise<void> {
    console.log('to', toUserId);
    socketServer.emit(toUserId, message);
  }
}
