import { getMongoRepository, MongoRepository } from 'typeorm';

import IMessagesRepository from '@modules/chat/repositories/IMessagesRepository';
import CreateMessageDTO from '@modules/chat/dtos/CreateMessageDTO';

import ListBetweenUsersDTO from '@modules/chat/dtos/ListBetweenUsersDTO';
import Message from '../schemas/Message';

class MessagesRepository implements IMessagesRepository {
  private ormRepository: MongoRepository<Message>;

  constructor() {
    this.ormRepository = getMongoRepository(Message, 'mongo');
  }

  public async create({
    content,
    recipient_id,
    sender_id,
  }: CreateMessageDTO): Promise<Message> {
    const message = this.ormRepository.create({
      content,
      recipient_id,
      sender_id,
    });

    await this.ormRepository.save(message);

    return message;
  }

  public async listBetweenUsers({
    recipient_id,
    sender_id,
  }: ListBetweenUsersDTO): Promise<Message[]> {
    const messages = await this.ormRepository.find({
      where: {
        recipient_id: { $in: [recipient_id, sender_id] },
        sender_id: { $in: [recipient_id, sender_id] },
      },
      order: {
        created_at: 'ASC',
      },
    });

    return messages;
  }
}

export default MessagesRepository;
