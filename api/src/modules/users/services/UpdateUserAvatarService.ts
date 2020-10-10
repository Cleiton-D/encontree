import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

type UpdateUserAvatarRequest = {
  user_id: string;
  filename: string;
};

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('StorageProvider') private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    filename,
  }: UpdateUserAvatarRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const file = await this.storageProvider.saveFile(filename);
    user.avatar = file;

    await this.usersRepository.update(user);
    return user;
  }
}

export default UpdateUserAvatarService;
