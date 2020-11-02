import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Socket } from 'socket.io';

import SendMessageToUserService from '@modules/chat/services/SendMessageToUserService';
import ListAllMessagesBetweenUsersService from '@modules/chat/services/ListAllMessagesBetweenUsersService';

export default class MessagesController {
  public async create(
    socketServer: any,
    socket: Socket,
    data: any,
  ): Promise<void> {
    const sender_id = socket.user.id;
    const { userId, message } = data;

    const sendMessageToUser = container.resolve(SendMessageToUserService);

    await sendMessageToUser.execute(socketServer, {
      sender_id,
      user_id: userId,
      content: message,
    });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const authUserId = request.user.id;
    const { recipient } = request.query;

    const listAllMessagesBetweenUsers = container.resolve(
      ListAllMessagesBetweenUsersService,
    );

    const messages = await listAllMessagesBetweenUsers.execute({
      recipient_id: recipient as string,
      sender_id: authUserId,
    });

    return response.json(messages);
  }
}
