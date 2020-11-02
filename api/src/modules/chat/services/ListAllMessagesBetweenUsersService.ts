import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IMessagesRepository from '../repositories/IMessagesRepository';
import Message from '../infra/typeorm/schemas/Message';

type ListAllMessagesBetweenUsersRequest = {
  recipient_id: string;
  sender_id: string;
};

@injectable()
class ListAllMessagesBetweenUsersService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
  ) {}

  public async execute({
    recipient_id,
    sender_id,
  }: ListAllMessagesBetweenUsersRequest): Promise<Message[]> {
    const [receiver, sender] = await Promise.all([
      this.usersRepository.findById(recipient_id),
      this.usersRepository.findById(sender_id),
    ]);

    if (!receiver) {
      throw new AppError('Receiver not found');
    }

    if (!sender) {
      throw new AppError('Sender not found');
    }

    const messages = await this.messagesRepository.listBetweenUsers({
      recipient_id,
      sender_id,
    });

    return messages;
  }
}

export default ListAllMessagesBetweenUsersService;
