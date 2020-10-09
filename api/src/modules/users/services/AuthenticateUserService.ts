import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';

type AuthenticateUserRequest = {
  email: string;
  password: string;
};

type AuthenticateUserResponse = {
  user: User;
  token: string;
};

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, { subject: user.id, expiresIn });

    return { user, token };
  }
}

export default AuthenticateUserService;
