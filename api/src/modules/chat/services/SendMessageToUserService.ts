import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ISocketProvider from '../providers/SocketProvider/models/ISocketProvider';
import IMessagesRepository from '../repositories/IMessagesRepository';
import IConversationsRepository from '../repositories/IConversationsRepository';

type SendMessageToUserRequest = {
  sender_id: string;
  user_id: string;
  content: string;
};

@injectable()
export default class SendMessageToUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('ConversationsRepository')
    private conversationsRepository: IConversationsRepository,
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
    @inject('SocketProvider') private socketProvider: ISocketProvider,
  ) {}

  public async execute(
    socketServer: any,
    { user_id, content, sender_id }: SendMessageToUserRequest,
  ): Promise<void> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }

    let conversation = await this.conversationsRepository.findByUsers({
      users_ids: [user_id, sender_id],
    });

    if (!conversation) {
      conversation = await this.conversationsRepository.create({
        users_ids: [user_id, sender_id],
      });
    }

    const message = await this.messagesRepository.create({
      content,
      conversation,
      recipient_id: user_id,
      sender_id,
    });

    await this.socketProvider.sendMessage(socketServer, {
      toUserId: user_id,
      message,
    });
  }
}
