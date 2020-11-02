import { Socket, Server } from 'socket.io';

import MessagesController from '../controllers/MessagesController';

export default function messageEvents(
  socketServer: Server,
  socket: Socket,
): void {
  const messageController = new MessagesController();

  socket.on('message', data => {
    messageController.create(socketServer, socket, data);
  });
}
