import { getMongoRepository, MongoRepository } from 'typeorm';

import IConversationsRepository from '@modules/chat/repositories/IConversationsRepository';
import CreateConversationDTO from '@modules/chat/dtos/CreateConversationDTO';
import FindConversationByUsersDTO from '@modules/chat/dtos/FindConversationByUsersDTO';
import Conversation from '../schemas/Conversation';

class ConversationsRepository implements IConversationsRepository {
  private ormRepository: MongoRepository<Conversation>;

  constructor() {
    this.ormRepository = getMongoRepository(Conversation, 'mongo');
  }

  public async create({
    users_ids,
  }: CreateConversationDTO): Promise<Conversation> {
    const conversation = this.ormRepository.create({
      users_ids,
    });

    await this.ormRepository.save(conversation);
    return conversation;
  }

  public async findByUsers({
    users_ids,
  }: FindConversationByUsersDTO): Promise<Conversation | undefined> {
    const conversation = await this.ormRepository.findOne({
      where: {
        $or: [{ users_ids }, { users_ids: Array.from(users_ids).reverse() }],
      },
    });
    return conversation;
  }

  public async listByUser(user_id: string): Promise<Conversation[]> {
    const conversations = await this.ormRepository.find({
      where: { users_ids: user_id },
    });

    return conversations;
  }
}

export default ConversationsRepository;
