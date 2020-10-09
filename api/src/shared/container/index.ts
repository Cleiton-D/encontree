import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';
import ProvidersRepository from '@modules/providers/infra/typeorm/repositories/ProvidersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IProvidersRepository>(
  'ProvidersRepository',
  ProvidersRepository,
);
