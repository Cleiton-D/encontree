import CreateMessageDTO from '../dtos/CreateMessageDTO';
import ListBetweenUsersDTO from '../dtos/ListBetweenUsersDTO';

import Message from '../infra/typeorm/schemas/Message';

export default interface IMessagesRepository {
  create: (data: CreateMessageDTO) => Promise<Message>;
  listBetweenUsers: (data: ListBetweenUsersDTO) => Promise<Message[]>;
}
