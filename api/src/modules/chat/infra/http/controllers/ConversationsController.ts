import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListUserConversationsService from '@modules/chat/services/ListUserConversationsService';

export default class ConversationsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUserConversations = container.resolve(
      ListUserConversationsService,
    );

    const conversations = await listUserConversations.execute({ user_id });
    return response.json(classToClass(conversations));
  }
}
