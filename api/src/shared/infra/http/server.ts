import http from 'http';

import app from './app';
import socket from './socket';

const server = http.createServer(app);
socket(server);

server.listen(3333, () => {
  console.log('Server online in port 3333');
});
