import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import IConversationsRepository from '../repositories/IConversationsRepository';

type ListUserConversationsRequest = {
  user_id: string;
};

type ListUserConversationsResponse = {
  id: string;
  user: User;
};

@injectable()
class ListUserConversationsService {
  constructor(
    @inject('ConversationsRepository')
    private conversationsRepository: IConversationsRepository,
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
  }: ListUserConversationsRequest): Promise<ListUserConversationsResponse[]> {
    const conversations = await this.conversationsRepository.listByUser(
      user_id,
    );

    if (conversations.length === 0) {
      return [];
    }

    const users_ids = conversations.reduce<string[]>(
      (accumulator, conversation) => {
        const item = conversation.users_ids.find(user => user !== user_id);
        if (item) {
          accumulator.push(item);
        }
        return accumulator;
      },
      [],
    );
    const users = await this.usersRepository.listByIds(users_ids);

    return conversations.reduce<ListUserConversationsResponse[]>(
      (accumulator, conversation) => {
        const item = conversation.users_ids.find(user => user !== user_id);
        if (item) {
          const user = users.find(u => u.id === item);
          if (user) {
            accumulator.push({ id: conversation.id.toString(), user });
          }
        }
        return accumulator;
      },
      [],
    );
  }
}

export default ListUserConversationsService;
