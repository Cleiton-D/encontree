import CreateConversationDTO from '../dtos/CreateConversationDTO';
import FindConversationByUsersDTO from '../dtos/FindConversationByUsersDTO';
import Conversation from '../infra/typeorm/schemas/Conversation';

export default interface IConversationsRepository {
  create: (data: CreateConversationDTO) => Promise<Conversation>;
  findByUsers: (
    data: FindConversationByUsersDTO,
  ) => Promise<Conversation | undefined>;
  listByUser: (user_id: string) => Promise<Conversation[]>;
}
