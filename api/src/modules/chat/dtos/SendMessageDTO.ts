import Message from '../infra/typeorm/schemas/Message';

type SendMessageDTO = {
  toUserId: string;
  message: Message;
};

export default SendMessageDTO;
