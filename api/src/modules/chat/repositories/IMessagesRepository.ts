import CreateMessageDTO from '../dtos/CreateMessageDTO';
import Conversation from '../infra/typeorm/schemas/Conversation';

import Message from '../infra/typeorm/schemas/Message';

export default interface IMessagesRepository {
  create: (data: CreateMessageDTO) => Promise<Message>;
  listAllByConversation: (conversation: Conversation) => Promise<Message[]>;
  // listBetweenUsers: (data: ListBetweenUsersDTO) => Promise<Message[]>;
}
