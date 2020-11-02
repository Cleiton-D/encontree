import SendMessageDTO from '../../../dtos/SendMessageDTO';

export default interface ISocketProvider {
  sendMessage(socketServer: any, data: SendMessageDTO): Promise<void>;
}
