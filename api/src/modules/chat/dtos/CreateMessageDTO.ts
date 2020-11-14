import Conversation from '../infra/typeorm/schemas/Conversation';

type CreateMessageDTO = {
  content: string;
  conversation: Conversation;
  recipient_id: string;
  sender_id: string;
};

export default CreateMessageDTO;
