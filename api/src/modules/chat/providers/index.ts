import { container } from 'tsyringe';

import SocketIOProvider from './SocketProvider/implementations/SocketIOProvider';
import ISocketProvider from './SocketProvider/models/ISocketProvider';

container.registerSingleton<ISocketProvider>(
  'SocketProvider',
  SocketIOProvider,
);
