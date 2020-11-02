import { Server as HttpServer } from 'http';
import SocketIO from 'socket.io';

export default function socket(server: HttpServer): void {
  const socketServer = new SocketIO(server);
  socketServer.on('connection', sock => {
    console.log(`um carinha conectado ${sock.id}`);

    sock.on('disconnect', () => {
      console.log('user disconnected');
    });

    sock.on('message', message => {
      console.log(message);
    });
  });
}
