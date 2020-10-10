import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

type UpdateProfileRequest = {
  user_id: string;
  name: string;
  email: string;
  username: string;
  old_password: string;
  password: string;
};

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    username,
    old_password,
    password,
  }: UpdateProfileRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithEmail = await this.usersRepository.findByEmail(email);
    if (userWithEmail && userWithEmail.id !== user.id) {
      throw new AppError('E-mail already in use');
    }

    const userWithUsername = await this.usersRepository.findByUsername(
      username,
    );
    if (userWithUsername && userWithUsername.id !== user.id) {
      throw new AppError('Username already in use');
    }

    user.name = name;
    user.email = email;
    user.username = username;

    if (password && !old_password) {
      throw new AppError('Old password not informed');
    }

    if (password && old_password) {
      const passwordMatched = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!passwordMatched) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.update(user);
  }
}

export default UpdateProfileService;
