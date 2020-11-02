import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';
import '@modules/chat/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';
import ProvidersRepository from '@modules/providers/infra/typeorm/repositories/ProvidersRepository';

import IWorkSchedulesRepository from '@modules/providers/repositories/IWorkSchedulesRepository';
import WorkSchedulesRepository from '@modules/providers/infra/typeorm/repositories/WorkSchedulesRepository';

import ICategoriesRepository from '@modules/providers/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/providers/infra/typeorm/repositories/CategoriesRepository';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import SchedulesRepository from '@modules/schedules/infra/typeorm/repositories/SchedulesRepositories';

import IMessagesRepository from '@modules/chat/repositories/IMessagesRepository';
import MessagesRepository from '@modules/chat/infra/typeorm/repositories/MessagesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IProvidersRepository>(
  'ProvidersRepository',
  ProvidersRepository,
);

container.registerSingleton<IWorkSchedulesRepository>(
  'WorkSchedulesRepository',
  WorkSchedulesRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISchedulesRepository>(
  'SchedulesRepository',
  SchedulesRepository,
);

container.registerSingleton<IMessagesRepository>(
  'MessagesRepository',
  MessagesRepository,
);
