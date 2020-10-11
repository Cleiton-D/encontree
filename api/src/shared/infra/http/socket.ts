import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'ws';

export default function socket(server: HttpServer): void {
  const wss = new SocketServer({ server });

  wss.on('connection', ws => {
    console.log('É nois', ws);
  });
}
