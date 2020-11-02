import { Server as HttpServer } from 'http';
import SocketIO from 'socket.io';

import messageEvents from '@modules/chat/infra/http/events/message.events';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

export default function socket(server: HttpServer): void {
  const socketServer = new SocketIO(server);
  socketServer.use(ensureAuthenticated.socket);
  socketServer.on('connection', sock => {
    console.log(`user connected: ${sock.id}`);

    messageEvents(socketServer, sock);

    sock.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}
